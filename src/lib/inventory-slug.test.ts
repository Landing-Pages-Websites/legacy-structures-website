import assert from "node:assert/strict";
import test from "node:test";
import {
  inventoryConflictMessage,
  resolveAvailableInventorySlug,
} from "./inventory-slug.ts";

const TAKEN_UTILITY = new Set(["utility-shed-10x14"]);

test("keeps the first building of a type and size on its short slug", () => {
  const result = resolveAvailableInventorySlug(
    "Utility Shed-10x14",
    "YSUT-C10872-1014-073026-SP",
    new Set(),
  );
  assert.deepEqual(result, { slug: "utility-shed-10x14" });
});

test("gives a second building a slug that includes its inventory number", () => {
  const result = resolveAvailableInventorySlug(
    "utility-shed-10x14",
    "YSUT-C10872-1014-073026-SP",
    TAKEN_UTILITY,
  );
  assert.deepEqual(result, {
    slug: "utility-shed-10x14-ysut-c10872-1014-073026-sp",
  });
});

test("does not treat a longer nearby slug as the same listing", () => {
  const result = resolveAvailableInventorySlug(
    "utility-shed-10x14",
    "YSUT-C10872-1014-073026-SP",
    new Set(["utility-shed-10x140", "utility-shed-10x14-extra"]),
  );
  assert.deepEqual(result, { slug: "utility-shed-10x14" });
});

test("keeps a distinct size spelling even when a similar slug exists", () => {
  const result = resolveAvailableInventorySlug(
    "greenhouse-08x12",
    "YGH-C10374-0812-030326-SP",
    new Set(["greenhouse-8x12"]),
  );
  assert.deepEqual(result, { slug: "greenhouse-08x12" });
});

test("rejects a taken slug when the inventory number cannot make a suffix", () => {
  for (const inventoryNumber of ["", "   ", "---", "!!!"]) {
    const result = resolveAvailableInventorySlug(
      "utility-shed-8x8",
      inventoryNumber,
      new Set(["utility-shed-8x8"]),
    );
    assert.equal("slug" in result, false);
    assert.match(
      "error" in result ? result.error : "",
      /inventory number/i,
    );
  }
});

test("rejects when the inventory-number slug is already taken", () => {
  const result = resolveAvailableInventorySlug(
    "utility-shed-10x14",
    "YSUT-C10872-1014-073026-SP",
    new Set([
      "utility-shed-10x14",
      "utility-shed-10x14-ysut-c10872-1014-073026-sp",
    ]),
  );
  assert.equal("slug" in result, false);
});

test("uses the short slug when only the suffixed form is taken", () => {
  const result = resolveAvailableInventorySlug(
    "lofted-barn-10x12",
    "WLB-72669-1012-042825-C",
    new Set(["lofted-barn-10x12-wlb-72669-1012-042825-c"]),
  );
  assert.deepEqual(result, { slug: "lofted-barn-10x12" });
});

test("rejects an empty requested slug", () => {
  const result = resolveAvailableInventorySlug("  ", "YSUT-1", new Set());
  assert.equal("slug" in result, false);
});

test("names a slug collision without claiming the inventory number exists", () => {
  const message = inventoryConflictMessage({
    message:
      'duplicate key value violates unique constraint "inventory_items_slug_key"',
    details: "Key (slug)=(utility-shed-10x14) already exists.",
  });
  assert.match(message, /listing address/i);
  assert.doesNotMatch(message, /inventory number already exists/i);
});

test("names an inventory-number collision from the constraint details", () => {
  const message = inventoryConflictMessage({
    message:
      'duplicate key value violates unique constraint "inventory_items_inventory_number_unique"',
    details: null,
  });
  assert.match(message, /inventory number already exists/i);
});

test("does not guess which field collided when the database error is unrecognized", () => {
  const message = inventoryConflictMessage({
    message: "duplicate key value violates unique constraint \"something_else\"",
    details: "",
  });
  assert.match(message, /conflicts with an existing listing/i);
  assert.doesNotMatch(message, /inventory number already exists/i);
});
