const NON_SLUG_CHARACTERS = /[^a-z0-9]+/g;
const SLUG_CONSTRAINT = "inventory_items_slug_key";
const INVENTORY_NUMBER_CONSTRAINT = "inventory_items_inventory_number_unique";

const EMPTY_SLUG_ERROR = "Building type and size are required.";
const MISSING_NUMBER_ERROR =
  "Another building already uses this type and size. Enter an inventory number to add another.";
const TAKEN_ADDRESS_ERROR = "Another listing already uses this building address.";
const SLUG_CONFLICT_ERROR = "Another building already uses this listing address.";
const NUMBER_CONFLICT_ERROR = "That inventory number already exists.";
const UNKNOWN_CONFLICT_ERROR = "This building conflicts with an existing listing.";

export function normalizeInventorySlug(value: string): string {
  return value.toLowerCase().replace(NON_SLUG_CHARACTERS, "-").replace(/^-|-$/g, "");
}

export function inventorySlugCandidates(
  requestedSlug: string,
  inventoryNumber: string,
): string[] {
  const base = normalizeInventorySlug(requestedSlug);
  if (!base) return [];
  const suffix = normalizeInventorySlug(inventoryNumber);
  return suffix ? [base, `${base}-${suffix}`] : [base];
}

export function resolveAvailableInventorySlug(
  requestedSlug: string,
  inventoryNumber: string,
  takenSlugs: ReadonlySet<string>,
): { slug: string } | { error: string } {
  const base = normalizeInventorySlug(requestedSlug);
  if (!base) return { error: EMPTY_SLUG_ERROR };
  if (!takenSlugs.has(base)) return { slug: base };

  const suffix = normalizeInventorySlug(inventoryNumber);
  if (!suffix) return { error: MISSING_NUMBER_ERROR };

  const next = `${base}-${suffix}`;
  if (takenSlugs.has(next)) return { error: TAKEN_ADDRESS_ERROR };
  return { slug: next };
}

export function inventoryConflictKind(error: {
  message?: string | null;
  details?: string | null;
}): "slug" | "inventory-number" | "unknown" {
  const text = `${error.message ?? ""} ${error.details ?? ""}`.toLowerCase();
  if (text.includes(SLUG_CONSTRAINT) || text.includes("key (slug)=")) return "slug";
  if (
    text.includes(INVENTORY_NUMBER_CONSTRAINT) ||
    text.includes("key (inventory_number)=")
  ) {
    return "inventory-number";
  }
  return "unknown";
}

export function inventoryConflictMessage(error: {
  message?: string | null;
  details?: string | null;
}): string {
  const kind = inventoryConflictKind(error);
  if (kind === "slug") return SLUG_CONFLICT_ERROR;
  if (kind === "inventory-number") return NUMBER_CONFLICT_ERROR;
  return UNKNOWN_CONFLICT_ERROR;
}
