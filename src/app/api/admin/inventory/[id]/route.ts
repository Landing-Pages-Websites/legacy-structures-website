import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

const TABLE = "inventory_items";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const body = await request.json();
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase
    .from(TABLE)
    .update({ ...body, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  revalidatePath("/inventory");
  revalidatePath("/api/inventory");
  return NextResponse.json(data);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { error } = await supabase.from(TABLE).delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  revalidatePath("/inventory");
  revalidatePath("/api/inventory");
  return NextResponse.json({ success: true });
}
