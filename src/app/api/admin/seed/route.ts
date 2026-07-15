import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { buildings } from "@/data/buildings";

const LEGACY_MODEL_TYPES: Record<string, string> = {
  "Metal Lofted Barn": "Lofted Barn",
  "Utility Dormer": "Shed Dormer",
  "Utility Gable Dormer": "Gable Dormer",
  "Side Dormer A Frame": "Side Gable A Frame",
  "Lofted Barn Playhouse": "Lofted Playhouse Cabin",
};

const parseCurrency = (value: string): number =>
  Number.parseFloat(value.replace(/[^0-9.]/g, "")) || 0;

const formatCurrency = (amount: number): string =>
  `${amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} +tax`;

export async function POST() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const items = buildings
    .filter((b) => !b.inventoryNumber.includes("DEMO"))
    .map((b, i) => {
      const cashPrice = parseCurrency(b.cashPrice);
      return {
        slug: b.slug,
        model_type: LEGACY_MODEL_TYPES[b.modelType] ?? b.modelType,
        inventory_number: b.inventoryNumber,
        size: b.size,
        width: b.width,
        length: b.length,
        wall_color: b.wallColor,
        trim_color: b.trimColor,
        roof_color: b.roofColor,
        cash_price: formatCurrency(cashPrice),
        sale_price: b.salePrice ?? null,
        is_on_sale: Boolean(b.salePrice),
        rto_36: formatCurrency(cashPrice / 21.6),
        rto_48: formatCurrency(cashPrice / 25.44),
        image_url: b.image,
        designer_template: b.designerTemplate,
        sort_order: i,
        notes: "",
        building_material: b.modelType === "Metal Lofted Barn" ? "Metal" : null,
      };
    });

  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  // Import only inventory numbers that are not already present. Existing admin
  // edits are intentionally preserved.
  const { data, error } = await supabase
    .from("inventory_items")
    .upsert(items, { onConflict: "inventory_number", ignoreDuplicates: true })
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  revalidatePath("/inventory");
  revalidatePath("/api/inventory");
  return NextResponse.json({
    success: true,
    seeded: data?.length ?? items.length,
  });
}
