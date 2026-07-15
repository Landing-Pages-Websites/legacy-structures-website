/** Maps a building model type to its category page slug. */
export const MODEL_ROUTE_MAP: Record<string, string> = {
  "Utility Shed": "/storage-sheds",
  "Lofted Barn": "/backyard-barns",
  "Mini Barn": "/backyard-barns",
  "Greenhouse": "/greenhouses",
  "Shed Dormer": "/storage-sheds",
  "Gable Dormer": "/storage-sheds",
  "Single Slope": "/storage-sheds",
  "Side Gable": "/side-gables",
  "Garage": "/portable-garages",
  "Lofted Garage": "/portable-garages",
  "Double Wide Garage": "/double-wide-garages",
  "Chicken Coop": "/chicken-coops",
  "Animal Shelter": "/chicken-coops",
  "Timber Trail Log Cabin": "/log-cabins",
  "Pikes Peak Log Cabin": "/log-cabins",
  "Lofted Playhouse Cabin": "/portable-cabins",
  "Lofted Side Porch Cabin": "/portable-cabins",
  "Lofted Deluxe Cabin": "/portable-cabins",
  "Utility Playhouse Cabin": "/portable-cabins",
  "Utility Side Porch Cabin": "/portable-cabins",
  "Utility Deluxe Cabin": "/portable-cabins",
  "A Frame": "/a-frames",
  "Reverse Gable A Frame": "/a-frames",
  "Side Gable A Frame": "/a-frames",
  "Modern A Frame": "/a-frames",
};

export function getModelRoute(modelType: string): string {
  return MODEL_ROUTE_MAP[modelType] ?? "/inventory";
}

export const ALL_MODEL_TYPES = Object.keys(MODEL_ROUTE_MAP);
