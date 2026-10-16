import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { validateInventoryPayload } from "@/lib/admin-inventory";
import {
  inventoryConflictKind,
  inventoryConflictMessage,
  inventorySlugCandidates,
  normalizeInventorySlug,
  resolveAvailableInventorySlug,
} from "@/lib/inventory-slug";

const TABLE = "inventory_items";

type InventoryWrite = Record<string, string | number | boolean | null>;

async function loadTakenSlugs(
  supabase: ReturnType<typeof createClient>,
  candidates: string[],
): Promise<{ slugs: Set<string> } | { error: string; status: number }> {
  if (candidates.length === 0) return { slugs: new Set() };

  const { data: existing, error } = await supabase
    .from(TABLE)
    .select("slug")
    .in("slug", candidates);
  if (error) return { error: error.message, status: 500 };

  return {
    slugs: new Set(
      (existing ?? []).flatMap((row) => (typeof row.slug === "string" ? [row.slug] : [])),
    ),
  };
}

async function withAvailableSlug(
  supabase: ReturnType<typeof createClient>,
  data: InventoryWrite,
): Promise<{ data: InventoryWrite } | { error: string; status: number }> {
  const requestedSlug = String(data.slug ?? "");
  const inventoryNumber = String(data.inventory_number ?? "");
  const candidates = inventorySlugCandidates(requestedSlug, inventoryNumber);
  const taken = await loadTakenSlugs(supabase, candidates);
  if ("error" in taken) return taken;

  // The first listing keeps its current URL. Another building of the same
  // type and size gets its inventory number appended.
  const resolved = resolveAvailableInventorySlug(requestedSlug, inventoryNumber, taken.slugs);
  if ("error" in resolved) {
    return { error: resolved.error, status: candidates.length === 0 ? 400 : 409 };
  }
  return { data: { ...data, slug: resolved.slug } };
}

async function insertInventory(
  supabase: ReturnType<typeof createClient>,
  requested: InventoryWrite,
  assigned: InventoryWrite,
) {
  const first = await supabase.from(TABLE).insert([assigned]).select().single();
  const base = normalizeInventorySlug(String(requested.slug ?? ""));
  const suffixed = inventorySlugCandidates(
    String(requested.slug ?? ""),
    String(requested.inventory_number ?? ""),
  )[1];
  const slugTaken =
    first.error?.code === "23505" && inventoryConflictKind(first.error) === "slug";
  if (!slugTaken || !suffixed || assigned.slug !== base) return first;

  return supabase.from(TABLE).insert([{ ...assigned, slug: suffixed }]).select().single();
}

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const payload = validateInventoryPayload(await request.json());
  if (!payload.data) {
    return NextResponse.json({ error: payload.error }, { status: 400 });
  }
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const assigned = await withAvailableSlug(supabase, payload.data);
  if ("error" in assigned) {
    return NextResponse.json({ error: assigned.error }, { status: assigned.status });
  }
  const { data, error } = await insertInventory(supabase, payload.data, assigned.data);
  if (error?.code === "23505") {
    return NextResponse.json({ error: inventoryConflictMessage(error) }, { status: 409 });
  }
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  revalidatePath("/inventory");
  revalidatePath("/api/inventory");
  if (data?.slug) revalidatePath(`/building/${data.slug}`);
  return NextResponse.json(data, { status: 201 });
}
