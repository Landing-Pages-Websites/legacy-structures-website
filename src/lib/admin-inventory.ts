import { ALL_MODEL_TYPES } from "@/lib/model-routes";

const MATERIALS = new Set(["", "Metal", "Wood", "Vinyl"]);
const STRING_FIELDS = [
  "slug",
  "model_type",
  "inventory_number",
  "size",
  "wall_color",
  "trim_color",
  "roof_color",
  "image_url",
  "notes",
] as const;

const parseCurrency = (value: unknown): number =>
  Number.parseFloat(String(value ?? "").replace(/[^0-9.]/g, "")) || 0;

const formatCurrency = (amount: number): string =>
  `${amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} +tax`;

export function validateInventoryPayload(input: unknown):
  | { data: Record<string, string | number | boolean | null>; error?: never }
  | { data?: never; error: string } {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return { error: "Invalid inventory data." };
  }

  const body = input as Record<string, unknown>;
  const modelType = String(body.model_type ?? "").trim();
  const material = String(body.building_material ?? "").trim();
  const cashPrice = parseCurrency(body.cash_price);
  const salePrice = parseCurrency(body.sale_price);
  const isOnSale = body.is_on_sale === true;

  if (!ALL_MODEL_TYPES.includes(modelType)) {
    return { error: "Please choose a valid building type." };
  }
  if (!MATERIALS.has(material)) {
    return { error: "Please choose a valid building material." };
  }
  if (!String(body.slug ?? "").trim() || !String(body.size ?? "").trim() || cashPrice <= 0) {
    return { error: "Building type, size, and cash price are required." };
  }

  const data: Record<string, string | number | boolean | null> = {};
  for (const field of STRING_FIELDS) data[field] = String(body[field] ?? "").trim();

  data.width = Number(body.width) || 0;
  data.length = Number(body.length) || 0;
  data.designer_template = Number(body.designer_template) || 25;
  data.sort_order = Number(body.sort_order) || 0;
  data.building_material = material || null;
  data.cash_price = formatCurrency(cashPrice);
  data.is_on_sale = isOnSale;
  data.sale_price = isOnSale && salePrice > 0 ? formatCurrency(salePrice) : null;
  data.rto_36 = formatCurrency(cashPrice / 21.6);
  data.rto_48 = formatCurrency(cashPrice / 25.44);

  return { data };
}
