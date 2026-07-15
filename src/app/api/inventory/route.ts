import { NextResponse } from "next/server";
import { createAnonClient } from "@/utils/supabase/server";
import { buildings, resolveBuildingImage } from "@/data/buildings";

export const revalidate = 30; // ISR: refresh every 30 seconds

export async function GET() {
  try {
    const supabase = createAnonClient();
    const { data, error } = await supabase
      .from("inventory_items")
      .select("*")
      .order("sort_order", { ascending: true });

    if (!error && data && data.length > 0) {
      const items = data.map((item) => {
        const staticBuilding = buildings.find(
          (building) =>
            building.slug === item.slug ||
            building.inventoryNumber === item.inventory_number
        );

        return {
          ...item,
          image_url: staticBuilding
            ? resolveBuildingImage(item.image_url, staticBuilding.image)
            : item.image_url,
        };
      });

      return NextResponse.json(items);
    }
  } catch {
    // Fall through to static fallback
  }

  // Fallback: static buildings.ts data (active until Supabase is seeded)
  const staticItems = buildings
    .filter((b) => !b.inventoryNumber.includes("DEMO"))
    .map((b) => ({
      id: b.slug,
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
      sort_order: 0,
      building_material: "",
    }));

  return NextResponse.json(staticItems);
}
