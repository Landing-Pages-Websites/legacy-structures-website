import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

const TABLE = "model_descriptions";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase.from(TABLE).select("*");
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data ?? []);
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase
    .from(TABLE)
    .upsert({ ...body, updated_at: new Date().toISOString() }, { onConflict: "model_type" })
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  // Revalidate all building pages for this model type
  revalidatePath("/building/[slug]", "page");
  return NextResponse.json(data);
}
