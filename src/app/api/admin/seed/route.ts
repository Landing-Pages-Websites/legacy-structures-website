import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { buildings } from "@/data/buildings";

export async function POST() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const items = buildings
    .filter((b) => !b.inventoryNumber.includes("DEMO"))
    .map((b, i) => ({
      slug: b.slug,
      model_type: b.modelType,
      inventory_number: b.inventoryNumber,
      size: b.size,
      width: b.width,
      length: b.length,
      wall_color: b.wallColor,
      trim_color: b.trimColor,
      roof_color: b.roofColor,
      cash_price: b.cashPrice,
      sale_price: b.salePrice ?? null,
      is_on_sale: Boolean(b.salePrice),
      rto_36: b.rto36,
      rto_48: b.rto48,
      image_url: b.image,
      designer_template: b.designerTemplate,
      sort_order: i,
    }));

  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  // Upsert: insert new rows, update existing ones by slug
  const { data, error } = await supabase
    .from("inventory_items")
    .upsert(items, { onConflict: "slug" })
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    success: true,
    seeded: data?.length ?? items.length,
  });
}
