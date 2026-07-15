import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { validateInventoryPayload } from "@/lib/admin-inventory";

const TABLE = "inventory_items";

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
  const { data, error } = await supabase
    .from(TABLE)
    .insert([payload.data])
    .select()
    .single();
  if (error?.code === "23505") {
    return NextResponse.json(
      { error: "That inventory number or building already exists." },
      { status: 409 }
    );
  }
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  revalidatePath("/inventory");
  revalidatePath("/api/inventory");
  return NextResponse.json(data, { status: 201 });
}
