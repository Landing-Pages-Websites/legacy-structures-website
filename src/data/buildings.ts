export interface Building {
  slug: string;
  modelType: string;
  inventoryNumber: string;
  size: string;
  width: number;
  length: number;
  wallColor: string;
  trimColor: string;
  roofColor: string;
  cashPrice: string;
  salePrice?: string;
  rto36: string;
  rto48: string;
  image: string;
  designerTemplate: number;
}

const LS_BASE = "https://legacystructuresusa.com";

const withBase = (path: string): string =>
  path.startsWith("/wp-content") ? `${LS_BASE}${path}` : path;

const GENERIC_PRODUCT_IMAGE_NAMES = [
  "lofted-barn-product.png",
  "lofted-barn-product-pg.png",
  "utility-shed.png",
  "utility-dormer.png",
  "BYO-Greenhouses.png",
];

export const isGenericProductImage = (imageUrl?: string | null): boolean => {
  if (!imageUrl) return false;
  return GENERIC_PRODUCT_IMAGE_NAMES.some((name) => imageUrl.includes(name));
};

export const resolveBuildingImage = (
  candidateImage: string | null | undefined,
  fallbackImage: string
): string => {
  if (!candidateImage || isGenericProductImage(candidateImage)) {
    return fallbackImage;
  }

  return candidateImage;
};

const rawBuildings: Building[] = [
  // Page 1
  {
    slug: "chicken-coop",
    modelType: "Chicken Coop",
    inventoryNumber: "PCC-72288-86-121824-C",
    size: "8 x 8",
    width: 8,
    length: 8,
    wallColor: "Navajo",
    trimColor: "Black",
    roofColor: "Black Metal",
    cashPrice: "$3,120.00",
    salePrice: "$2,964.00 +tax",
    rto36: "$137.22 +tax",
    rto48: "$123.50 +tax",
    image: withBase(
      "/wp-content/uploads/2025/07/IMG_0156-1753236054332-scaled.jpeg"
    ),
    designerTemplate: 25,
  },
  {
    slug: "mini-barn",
    modelType: "Mini Barn",
    inventoryNumber: "PBN-73051-1012-080825-C",
    size: "10 x 12",
    width: 10,
    length: 12,
    wallColor: "Red",
    trimColor: "Barn White",
    roofColor: "Black Metal",
    cashPrice: "$3,445.00 +tax",
    rto36: "$159.49 +tax",
    rto48: "$143.54 +tax",
    image: withBase(
      "/wp-content/uploads/2025/10/IMG_0353-1760801572551-scaled.jpeg"
    ),
    designerTemplate: 22,
  },
  {
    slug: "utility-shed-3",
    modelType: "Utility Shed",
    inventoryNumber: "YUT-C10181-1012-011226-SP",
    size: "10 x 12",
    width: 10,
    length: 12,
    wallColor: "Clay",
    trimColor: "Black",
    roofColor: "Black Metal",
    cashPrice: "$3,775.00 +tax",
    rto36: "$174.77 +tax",
    rto48: "$157.29 +tax",
    image: withBase(
      "/wp-content/uploads/2026/03/IMG_3336-1773796375925-scaled.jpeg"
    ),
    designerTemplate: 25,
  },
  {
    slug: "utility-shed-2",
    modelType: "Utility Shed",
    inventoryNumber: "YUT-c10185-1012-010926-SP",
    size: "10 x 12",
    width: 10,
    length: 12,
    wallColor: "Red",
    trimColor: "Barn White",
    roofColor: "Black Metal",
    cashPrice: "$3,845.00 +tax",
    rto36: "$178.01 +tax",
    rto48: "$160.21 +tax",
    image: withBase(
      "/wp-content/uploads/2026/03/IMG_3330-1773795752495-scaled.jpeg"
    ),
    designerTemplate: 25,
  },
  {
    slug: "lofted-barn-8",
    modelType: "Lofted Barn",
    inventoryNumber: "WLB-72180-812-110824-C",
    size: "8 x 12",
    width: 8,
    length: 12,
    wallColor: "Urethane Chestnut",
    trimColor: "Black",
    roofColor: "Black Metal",
    cashPrice: "$4,231.00",
    salePrice: "$4,019.45 +tax",
    rto36: "$186.09 +tax",
    rto48: "$167.48 +tax",
    image: withBase(
      "/wp-content/uploads/2025/07/IMG_0201-1753236247376-scaled.jpeg"
    ),
    designerTemplate: 23,
  },
  {
    slug: "single-slope",
    modelType: "Single Slope",
    inventoryNumber: "WSS-70467-1012-072623-C",
    size: "10 x 12",
    width: 10,
    length: 12,
    wallColor: "Urethane Driftwood",
    trimColor: "Black",
    roofColor: "Black Metal",
    cashPrice: "$4,635.00",
    salePrice: "$4,403.00 +tax",
    rto36: "$203.84 +tax",
    rto48: "$183.46 +tax",
    image: withBase(
      "/wp-content/uploads/2025/03/IMG_8877-1741119643511-scaled.jpeg"
    ),
    designerTemplate: 3,
  },
  {
    slug: "lofted-barn-11",
    modelType: "Lofted Barn",
    inventoryNumber: "WLB-72669-1012-042825-C",
    size: "10 x 14",
    width: 10,
    length: 14,
    wallColor: "Urethane Driftwood",
    trimColor: "Navajo",
    roofColor: "Black Metal",
    cashPrice: "$4,495.00 +tax",
    rto36: "$208.10 +tax",
    rto48: "$187.29 +tax",
    image: withBase(
      "/wp-content/uploads/2025/10/IMG_0359-1760801846846-scaled.jpeg"
    ),
    designerTemplate: 23,
  },
  {
    slug: "utility-shed-8",
    modelType: "Utility Shed",
    inventoryNumber: "WSUT-72175-816-110824-C",
    size: "8 x 16",
    width: 8,
    length: 16,
    wallColor: "Urethane Driftwood",
    trimColor: "Black",
    roofColor: "Black Metal",
    cashPrice: "$4,585.00 +tax",
    rto36: "$212.27 +tax",
    rto48: "$191.04 +tax",
    image: withBase(
      "/wp-content/uploads/2025/03/IMG_9653-1741118822925-scaled.jpeg"
    ),
    designerTemplate: 25,
  },
  {
    slug: "lofted-barn-6",
    modelType: "Lofted Barn",
    inventoryNumber: "PLB-86736-1014-050925-H",
    size: "10 x 14",
    width: 10,
    length: 14,
    wallColor: "Evergreen",
    trimColor: "Evergreen",
    roofColor: "Black Metal",
    cashPrice: "$4,950.00 +tax",
    rto36: "$229.17 +tax",
    rto48: "$206.25 +tax",
    image: withBase(
      "/wp-content/uploads/2025/07/IMG_0123-1753211311664-scaled.jpeg"
    ),
    designerTemplate: 23,
  },
  // Page 2
  {
    slug: "lofted-barn-5",
    modelType: "Lofted Barn",
    inventoryNumber: "PSLB-70831-1016-100223-C",
    size: "10 x 16",
    width: 10,
    length: 16,
    wallColor: "Gibraltar",
    trimColor: "Barn White",
    roofColor: "Black Metal",
    cashPrice: "$5,305.00",
    salePrice: "$5,000.00 +tax",
    rto36: "$231.48 +tax",
    rto48: "$208.33 +tax",
    image: "/images/optimized-assets/featured/lofted-barn-3.webp",
    designerTemplate: 23,
  },
  {
    slug: "lofted-barn",
    modelType: "Lofted Barn",
    inventoryNumber: "PLB-70309-1016-070524-C",
    size: "10 x 16",
    width: 10,
    length: 16,
    wallColor: "Gibraltar",
    trimColor: "Gibraltar",
    roofColor: "Charcoal Metal",
    cashPrice: "$5,075.00 +tax",
    rto36: "$234.95 +tax",
    rto48: "$211.46 +tax",
    image: "/images/optimized-assets/featured/lofted-barn-7.webp",
    designerTemplate: 23,
  },
  {
    slug: "animal-shelter",
    modelType: "Animal Shelter",
    inventoryNumber: "PRUTX-68894-1020-062222-C",
    size: "10 x 20",
    width: 10,
    length: 20,
    wallColor: "Buckskin",
    trimColor: "Brown",
    roofColor: "Brown Metal",
    cashPrice: "$6,770.00",
    salePrice: "$5,077.50 +tax",
    rto36: "$235.07 +tax",
    rto48: "$211.56 +tax",
    image: withBase(
      "/wp-content/uploads/2025/03/IMG_8905-1741119267018-scaled.jpeg"
    ),
    designerTemplate: 33,
  },
  {
    slug: "lofted-barn-3",
    modelType: "Lofted Barn",
    inventoryNumber: "PLB-71295-1016-031524-C",
    size: "10 x 16",
    width: 10,
    length: 16,
    wallColor: "Black",
    trimColor: "Barn White",
    roofColor: "Black Metal",
    cashPrice: "$5,095.00 +tax",
    rto36: "$235.88 +tax",
    rto48: "$212.29 +tax",
    image: withBase(
      "/wp-content/uploads/2025/03/IMG_8862-1741119998306-scaled.jpeg"
    ),
    designerTemplate: 23,
  },
  {
    slug: "lofted-barn-4",
    modelType: "Lofted Barn",
    inventoryNumber: "WLB-86733-1014-050925-H",
    size: "10 x 14",
    width: 10,
    length: 14,
    wallColor: "Urethane Chestnut",
    trimColor: "Urethane Chestnut",
    roofColor: "Black Metal",
    cashPrice: "$5,145.00 +tax",
    rto36: "$238.19 +tax",
    rto48: "$214.38 +tax",
    image: "/images/optimized-assets/lofted-barn-1.webp",
    designerTemplate: 23,
  },
  {
    slug: "utility-shed-10",
    modelType: "Utility Shed",
    inventoryNumber: "PUT-72177-1212-110824-C",
    size: "12 x 12",
    width: 12,
    length: 12,
    wallColor: "Clay",
    trimColor: "Barn White",
    roofColor: "Hunter Green Metal",
    cashPrice: "$6,196.00",
    salePrice: "$5,576.00 +tax",
    rto36: "$258.15 +tax",
    rto48: "$232.33 +tax",
    image: withBase(
      "/wp-content/uploads/2025/03/IMG_9707-1741118469914-scaled.jpeg"
    ),
    designerTemplate: 25,
  },
  {
    slug: "utility-shed-4",
    modelType: "Utility Shed",
    inventoryNumber: "PUT-71396-1016-041224-C",
    size: "10 x 16",
    width: 10,
    length: 16,
    wallColor: "Black",
    trimColor: "Black",
    roofColor: "Black Metal",
    cashPrice: "$5,652.00 +tax",
    rto36: "$261.67 +tax",
    rto48: "$235.50 +tax",
    image: withBase(
      "/wp-content/uploads/2025/03/IMG_8856-1741114718259-scaled.jpeg"
    ),
    designerTemplate: 25,
  },
  {
    slug: "lofted-barn-9",
    modelType: "Lofted Barn",
    inventoryNumber: "WLB-72033-1020-100124-C",
    size: "10 x 20",
    width: 10,
    length: 20,
    wallColor: "Urethane Cedar",
    trimColor: "Barn White",
    roofColor: "Charcoal Metal",
    cashPrice: "$6,265.00",
    salePrice: "$5,952.00 +tax",
    rto36: "$275.56 +tax",
    rto48: "$248.00 +tax",
    image: withBase(
      "/wp-content/uploads/2025/07/IMG_0214-1753236385941-scaled.jpeg"
    ),
    designerTemplate: 23,
  },
  {
    slug: "lofted-barn-7",
    modelType: "Lofted Barn",
    inventoryNumber: "PLB-72178-1216-110824-C",
    size: "12 x 16",
    width: 12,
    length: 16,
    wallColor: "Red",
    trimColor: "Gap Gray",
    roofColor: "Charcoal Metal",
    cashPrice: "$6,815.00",
    salePrice: "$6,133.00 +tax",
    rto36: "$283.94 +tax",
    rto48: "$255.54 +tax",
    image: withBase(
      "/wp-content/uploads/2025/03/IMG_9767-1741118736711-scaled.jpeg"
    ),
    designerTemplate: 23,
  },
  {
    slug: "utility-dormer",
    modelType: "Utility Dormer",
    inventoryNumber: "WSUTD-69475-1216-101922-C",
    size: "12 x 16",
    width: 12,
    length: 16,
    wallColor: "Urethane Mahogany",
    trimColor: "Barn White",
    roofColor: "Black Metal",
    cashPrice: "$7,785.00",
    salePrice: "$6,277.00 +tax",
    rto36: "$290.60 +tax",
    rto48: "$261.54 +tax",
    image: withBase(
      "/wp-content/uploads/2025/03/IMG_8890-1741119409701-scaled.jpeg"
    ),
    designerTemplate: 27,
  },
  // Page 3
  {
    slug: "lofted-barn-10",
    modelType: "Lofted Barn",
    inventoryNumber: "YLB-C10180-1020-010826-SP",
    size: "10 x 20",
    width: 10,
    length: 20,
    wallColor: "Rosemary Green",
    trimColor: "Clay",
    roofColor: "Charcoal Metal",
    cashPrice: "$6,335.00 +tax",
    rto36: "$293.29 +tax",
    rto48: "$263.96 +tax",
    image: withBase(
      "/wp-content/uploads/2026/03/IMG_3333-1773795992010-scaled.jpeg"
    ),
    designerTemplate: 23,
  },
  {
    slug: "utility-shed-7",
    modelType: "Utility Shed",
    inventoryNumber: "PUTX-72176-1220-110824-C",
    size: "12 x 20",
    width: 12,
    length: 20,
    wallColor: "Evergreen",
    trimColor: "Barn White",
    roofColor: "Black Metal",
    cashPrice: "$7,469.89",
    salePrice: "$7,096.40 +tax",
    rto36: "$328.54 +tax",
    rto48: "$295.68 +tax",
    image: withBase(
      "/wp-content/uploads/2025/07/IMG_0132-1753235605494-scaled.jpeg"
    ),
    designerTemplate: 25,
  },
  {
    slug: "utility-gable-dormer",
    modelType: "Utility Gable Dormer",
    inventoryNumber: "PSUTG-71087-1020-120723-C",
    size: "10 x 20",
    width: 10,
    length: 20,
    wallColor: "Beige",
    trimColor: "Beige",
    roofColor: "Brown Metal",
    cashPrice: "$8,035.00",
    salePrice: "$7,231.00 +tax",
    rto36: "$334.77 +tax",
    rto48: "$301.29 +tax",
    image: withBase(
      "/wp-content/uploads/2025/03/IMG_8819-1741047721560-scaled.jpeg"
    ),
    designerTemplate: 39,
  },
  {
    slug: "lofted-barn-playhouse",
    modelType: "Lofted Barn Playhouse",
    inventoryNumber: "WLBC-86759-1220-050925-H",
    size: "12 x 20",
    width: 12,
    length: 20,
    wallColor: "Urethane Driftwood",
    trimColor: "Urethane Driftwood",
    roofColor: "Black Metal",
    cashPrice: "$8,230.00",
    salePrice: "$7,818.50 +tax",
    rto36: "$361.97 +tax",
    rto48: "$325.77 +tax",
    image: withBase(
      "/wp-content/uploads/2025/07/IMG_0101-1753234196232-scaled.jpeg"
    ),
    designerTemplate: 35,
  },
  {
    slug: "utility-dormer-3",
    modelType: "Utility Dormer",
    inventoryNumber: "PLCPH-72948-1020-071025-C",
    size: "10 x 20",
    width: 10,
    length: 20,
    wallColor: "Clay",
    trimColor: "Clay",
    roofColor: "Black Metal",
    cashPrice: "$9,185.00",
    salePrice: "$8,266.00 +tax",
    rto36: "$382.69 +tax",
    rto48: "$344.42 +tax",
    image: withBase(
      "/wp-content/uploads/2025/10/IMG_0291-1759631629537-scaled.jpeg"
    ),
    designerTemplate: 34,
  },
  {
    slug: "12x24-garage",
    modelType: "12x24 Garage",
    inventoryNumber: "YG-C10395-1224-032426-SU",
    size: "12 x 24",
    width: 12,
    length: 24,
    wallColor: "Urethane Cedar",
    trimColor: "Black",
    roofColor: "Black Metal",
    cashPrice: "$9,107.80 +tax",
    rto36: "$421.66 +tax",
    rto48: "$379.49 +tax",
    image: withBase(
      "/wp-content/uploads/2026/03/IMG_3318-1773795264294-scaled.jpeg"
    ),
    designerTemplate: 31,
  },
  {
    slug: "a-frame",
    modelType: "A Frame",
    inventoryNumber: "AFP-100-1216-041624-C",
    size: "12 x 16",
    width: 12,
    length: 16,
    wallColor: "Urethane Chestnut",
    trimColor: "Urethane Chestnut",
    roofColor: "Black Metal",
    cashPrice: "$9,305.00 +tax",
    rto36: "$430.79 +tax",
    rto48: "$387.71 +tax",
    image: withBase(
      "/wp-content/uploads/2025/10/IMG_0277-1759631573150-scaled.jpeg"
    ),
    designerTemplate: 27,
  },
  {
    slug: "lofted-barn-playhouse-2",
    modelType: "Lofted Barn Playhouse",
    inventoryNumber: "PLBC-71394-1224-041224-C",
    size: "12 x 24",
    width: 12,
    length: 24,
    wallColor: "Clay",
    trimColor: "Clay",
    roofColor: "Black Metal",
    cashPrice: "$9,904.89",
    salePrice: "$9,409.65 +tax",
    rto36: "$435.63 +tax",
    rto48: "$392.07 +tax",
    image: withBase(
      "/wp-content/uploads/2025/03/IMG_8800-1741046752851-scaled.jpeg"
    ),
    designerTemplate: 35,
  },
  {
    slug: "lofted-garage",
    modelType: "Lofted Garage",
    inventoryNumber: "YLG-C10090-1224-011426-SP",
    size: "12 x 24",
    width: 12,
    length: 24,
    wallColor: "Clay",
    trimColor: "Evergreen",
    roofColor: "Hunter Green Metal",
    cashPrice: "$10,587.89 +tax",
    rto36: "$490.18 +tax",
    rto48: "$441.16 +tax",
    image: "/images/optimized-assets/featured/garage.webp",
    designerTemplate: 32,
  },
  // Page 4
  {
    slug: "garage",
    modelType: "Garage",
    inventoryNumber: "PG-72170-1424-110724-C",
    size: "14 x 24",
    width: 14,
    length: 24,
    wallColor: "Clay",
    trimColor: "Black",
    roofColor: "Black Metal",
    cashPrice: "$12,225.00",
    salePrice: "$11,002.00 +tax",
    rto36: "$509.35 +tax",
    rto48: "$458.42 +tax",
    image: withBase(
      "/wp-content/uploads/2025/03/IMG_9649-1741118897376-scaled.jpeg"
    ),
    designerTemplate: 31,
  },
  {
    slug: "reverse-gable-a-frame",
    modelType: "Reverse Gable A Frame",
    inventoryNumber: "AFRD-124-1220-020325-C",
    size: "12 x 20",
    width: 12,
    length: 20,
    wallColor: "Urethane Chestnut",
    trimColor: "Urethane Chestnut",
    roofColor: "Black Metal",
    cashPrice: "$12,259.00 +tax",
    rto36: "$567.55 +tax",
    rto48: "$510.79 +tax",
    image: withBase(
      "/wp-content/uploads/2025/10/IMG_0283-1759631513036-scaled.jpeg"
    ),
    designerTemplate: 27,
  },
  {
    slug: "utility-log-siding-cabin",
    modelType: "Utility Log Siding Cabin",
    inventoryNumber: "WDL-72319-1232-010225-C",
    size: "12 x 32",
    width: 12,
    length: 32,
    wallColor: "Urethane Cedar",
    trimColor: "Urethane Cedar",
    roofColor: "Brown Metal",
    cashPrice: "$18,408.00 +tax",
    rto36: "$852.22 +tax",
    rto48: "$767.00 +tax",
    image: withBase(
      "/wp-content/uploads/2025/07/IMG_0098-1753234269505-scaled.jpeg"
    ),
    designerTemplate: 34,
  },
  {
    slug: "double-wide-garage",
    modelType: "Double Wide Garage",
    inventoryNumber: "PDWG-71393-2424-041224-C",
    size: "24 x 24",
    width: 24,
    length: 24,
    wallColor: "Gap Gray",
    trimColor: "Gap Gray",
    roofColor: "Black Metal",
    cashPrice: "$19,565.00",
    salePrice: "$18,567.00 +tax",
    rto36: "$859.58 +tax",
    rto48: "$773.63 +tax",
    image: withBase(
      "/wp-content/uploads/2025/03/IMG_8847-1741114633956-scaled.jpeg"
    ),
    designerTemplate: 31,
  },
  {
    slug: "timber-trail-log-cabin",
    modelType: "Timber Trail Log Cabin",
    inventoryNumber: "WTT-71852-1442-080725-C",
    size: "14 x 40",
    width: 14,
    length: 40,
    wallColor: "Urethane Chestnut",
    trimColor: "Urethane Chestnut",
    roofColor: "Hunter Green Metal",
    cashPrice: "$34,770.00",
    salePrice: "$33,032.00 +tax",
    rto36: "$1.00 +tax",
    rto48: "$1.00 +tax",
    image: "/images/optimized-assets/log-cabins/timber-trail.webp",
    designerTemplate: 25,
  },
  {
    slug: "side-dormer-a-frame",
    modelType: "Side Dormer A Frame",
    inventoryNumber: "AFSD-142-1432-061725-C",
    size: "14 x 32",
    width: 14,
    length: 32,
    wallColor: "Black",
    trimColor: "Black",
    roofColor: "Black Metal",
    cashPrice: "$67,435.54",
    salePrice: "$59,990.00 +tax",
    rto36: "$2.00 +tax",
    rto48: "$2.00 +tax",
    image: withBase(
      "/wp-content/uploads/2025/10/IMG_0302-1759631379796-scaled.jpeg"
    ),
    designerTemplate: 27,
  },
  // Extras (linked from nav but not in inventory)
  {
    slug: "greenhouse",
    modelType: "Greenhouse",
    inventoryNumber: "GH-DEMO-001",
    size: "8 x 12",
    width: 8,
    length: 12,
    wallColor: "LP Smart Panel",
    trimColor: "Barn White",
    roofColor: "Clear Polycarbonate",
    cashPrice: "$8,500.00 +tax",
    rto36: "$393.51 +tax",
    rto48: "$354.17 +tax",
    image: "/images/optimized-assets/greenhouses.webp",
    designerTemplate: 53,
  },
  {
    slug: "utility-shed",
    modelType: "Utility Shed",
    inventoryNumber: "UT-DEMO-001",
    size: "10 x 16",
    width: 10,
    length: 16,
    wallColor: "Barn White",
    trimColor: "Black",
    roofColor: "Black Metal",
    cashPrice: "$5,500.00 +tax",
    rto36: "$254.63 +tax",
    rto48: "$229.17 +tax",
    image: "/images/optimized-assets/featured/utility-shed-10.webp",
    designerTemplate: 25,
  },
  {
    slug: "lofted-barn-2",
    modelType: "Lofted Barn",
    inventoryNumber: "PLB-DEMO-002",
    size: "12 x 20",
    width: 12,
    length: 20,
    wallColor: "Clay",
    trimColor: "Barn White",
    roofColor: "Black Metal",
    cashPrice: "$5,895.00 +tax",
    rto36: "$272.92 +tax",
    rto48: "$245.63 +tax",
    image: "/images/optimized-assets/featured/lofted-barn-7.webp",
    designerTemplate: 23,
  },
];

export const buildings: Building[] = rawBuildings;
