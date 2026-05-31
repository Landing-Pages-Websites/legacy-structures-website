import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { modelDescriptions } from "@/data/model-descriptions";

export async function POST() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const rows = Object.entries(modelDescriptions).map(([model_type, desc]) => ({
    model_type,
    heading: desc.heading,
    body: desc.body,
    bullets: desc.bullets.join("\n"),
    sizes_image_url: desc.sizesImage ?? "",
    updated_at: new Date().toISOString(),
  }));

  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase
    .from("model_descriptions")
    .upsert(rows, { onConflict: "model_type" });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  revalidatePath("/building/[slug]", "page");
  return NextResponse.json({ success: true, seeded: rows.length });
}
