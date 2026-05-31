/** Maps a building model type to its category page slug. */
export const MODEL_ROUTE_MAP: Record<string, string> = {
  "Lofted Barn": "/backyard-barns",
  "Mini Barn": "/backyard-barns",
  "Metal Lofted Barn": "/backyard-barns",
  "Utility Shed": "/storage-sheds",
  "Single Slope": "/storage-sheds",
  "Utility Dormer": "/storage-sheds",
  "Utility Gable Dormer": "/storage-sheds",
  "Portable Cabin": "/portable-cabins",
  "Utility Log Siding Cabin": "/portable-cabins",
  "Garage": "/portable-garages",
  "12x24 Garage": "/portable-garages",
  "Lofted Garage": "/portable-garages",
  "Double Wide Garage": "/double-wide-garages",
  "A Frame": "/a-frames",
  "Reverse Gable A Frame": "/a-frames",
  "Side Dormer A Frame": "/a-frames",
  "Log Cabin": "/log-cabins",
  "Timber Trail Log Cabin": "/log-cabins",
  "Redwood Log Cabin": "/log-cabins",
  "Bear Lake Log Cabin": "/log-cabins",
  "Appalachian Log Cabin": "/log-cabins",
  "Doublewide Cabin": "/log-cabins",
  "Chicken Coop": "/chicken-coops",
  "Animal Shelter": "/chicken-coops",
  "Greenhouse": "/greenhouses",
  "Side Gable": "/side-gables",
};

export function getModelRoute(modelType: string): string {
  return MODEL_ROUTE_MAP[modelType] ?? "/inventory";
}

export const ALL_MODEL_TYPES = Object.keys(MODEL_ROUTE_MAP);
