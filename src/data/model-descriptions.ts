export interface ModelDescription {
  heading: string;
  body: string;
  bullets: string[];
  sizesImage?: string;
  sizeGroups?: { label: string; sizes: string[] }[];
}

const THEME_BASE =
  "https://legacystructuresusa.com/wp-content/themes/barndealer/assets/images";

export const modelDescriptions: Record<string, ModelDescription> = {
  "Lofted Barn": {
    heading: "THE BASICS OF OUR LOFTED BARNS",
    body: "Our lofted barns are the ideal solution for those who want to store their stuff. Unlike our Utility Sheds that can have slightly taller side walls, our Lofted Barns come with overhead \"lofted\" storage built into the structure. These buildings are perfect for storing holiday decorations, gardening supplies, or anything that you'd like to keep up off the floor.",
    bullets: [
      "Classic barn-style roof",
      "6' 3\" standard interior wall height",
      "8' loft included FREE (no price credit for subtracting loft)",
      "8' wide buildings include single barn door (excluding packages)",
      "10' and wider include double barn doors (excluding packages)",
    ],
    sizesImage: "/images/optimized-assets/featured/lofted-barn-7.webp",
    sizeGroups: [
      { label: "8' WIDE", sizes: ["8x8", "8x10", "8x12", "8x16"] },
      { label: "10' WIDE", sizes: ["10x10", "10x12", "10x14", "10x16", "10x20"] },
      { label: "12' WIDE", sizes: ["12x16", "12x20", "12x24", "12x32", "12x36", "12x40"] },
      { label: "14' WIDE", sizes: ["14x24", "14x28", "14x32", "14x36", "14x40"] },
    ],
  },
  "Utility Shed": {
    heading: "THE BASICS OF OUR UTILITY SHEDS",
    body: "Our Utility Sheds are a great partner to our Lofted Barns. These two building styles are the two most popular storage buildings that we offer. The utility shed's distinct difference over the Lofted Barn is the ability to upgrade the side walls up to 8'. This makes this building ideal for a home office, man cave or she shed.",
    bullets: [
      "Classic gable-style roof",
      "Upgradeable sidewalls up to 8' tall",
      "T1-11 or LP Smart\u2122 Panel siding",
      "8' wide buildings include single barn door",
      "10' and wider include double barn doors",
    ],
    sizesImage: "/images/optimized-assets/featured/utility-shed-10.webp",
    sizeGroups: [
      { label: "8' WIDE", sizes: ["8x8", "8x10", "8x12", "8x16"] },
      { label: "10' WIDE", sizes: ["10x10", "10x12", "10x14", "10x16", "10x20"] },
      { label: "12' WIDE", sizes: ["12x16", "12x20", "12x24", "12x32", "12x36", "12x40"] },
      { label: "14' WIDE", sizes: ["14x24", "14x28", "14x32", "14x36", "14x40"] },
      { label: "16' WIDE", sizes: ["16x24", "16x28", "16x32", "16x36", "16x40"] },
    ],
  },
  "Mini Barn": {
    heading: "THE BASICS OF OUR MINI BARNS",
    body: "Our Mini Barns are perfect for homeowners who need basic, economical storage. These buildings maintain the iconic barn-style roof line in a smaller, more affordable package. Ideal for lawn equipment, tools, or seasonal storage.",
    bullets: [
      "Classic mini-barn roof style",
      "Economical storage solution",
      "Single-door entry",
      "T1-11 or LP Smart\u2122 Panel siding",
    ],
    sizesImage:
      "https://legacystructuresusa.com/wp-content/uploads/2025/10/IMG_0353-1760801572551-scaled.jpeg",
    sizeGroups: [
      { label: "8' WIDE", sizes: ["8x8", "8x10", "8x12"] },
      { label: "10' WIDE", sizes: ["10x10", "10x12", "10x16"] },
    ],
  },
  "Single Slope": {
    heading: "THE BASICS OF OUR SINGLE SLOPE SHEDS",
    body: "The Single Slope Shed boasts a lean-to-roof design that allows it to blend seamlessly into your outdoor surroundings. By positioning the shed with its back against a tree line or property boundary, it can become an organic part of your landscape. Single Slope Sheds are ENGINEER CERTIFIED for your peace of mind.",
    bullets: [
      "Lean-to roof design",
      "Optional horizontal windows",
      "Engineer-certified construction",
      "Blends into landscape",
    ],
    sizesImage: "/images/optimized-assets/featured/single-slope.webp",
    sizeGroups: [
      { label: "8' WIDE", sizes: ["8x12", "8x16"] },
      { label: "10' WIDE", sizes: ["10x10", "10x12", "10x14", "10x16", "10x20"] },
      { label: "12' WIDE", sizes: ["12x16", "12x20", "12x24", "12x32", "12x36", "12x40"] },
      { label: "14' WIDE", sizes: ["14x24", "14x28", "14x32", "14x36", "14x40"] },
    ],
  },
  "Utility Dormer": {
    heading: "THE BASICS OF OUR UTILITY DORMER SHEDS",
    body: "Our Utility Dormer is one of the newest additions to the Backyard Outfitter family of buildings. It is built on our Utility Shed style building and allows tons of extra natural light in. If you are looking for your next craft room or a place for all of your gardening supplies, the Utility Dormer might just be the perfect solution for you.",
    bullets: [
      "7/12 pitch roof",
      "Three 10in x 29in horizontal windows",
      "Treated buildings: 81in inside walls",
      "Painted/Urethane: 82.5in interior walls",
    ],
    sizesImage: "/images/optimized-assets/featured/utility-dormer.webp",
    sizeGroups: [
      { label: "8' WIDE", sizes: ["8x12", "8x16"] },
      { label: "10' WIDE", sizes: ["10x10", "10x12", "10x14", "10x16", "10x20"] },
      { label: "12' WIDE", sizes: ["12x16", "12x20", "12x24", "12x32", "12x36", "12x40"] },
    ],
  },
  "Utility Gable Dormer": {
    heading: "THE BASICS OF OUR GABLE DORMER SHEDS",
    body: "Our Gable Dormer is one of the newest additions to the Backyard Outfitter family of buildings. It is built on our Utility Shed style building and offers a touch of class on your building. If you are looking for your next craft room or spot to place all of your gardening supplies, the Gable Dormer might just be the perfect solution for you.",
    bullets: [
      "Gable dormer adds natural light",
      "Classic Utility Shed frame",
      "T1-11 or LP Smart\u2122 Panel siding",
      "Perfect for craft rooms and offices",
    ],
    sizesImage: `${THEME_BASE}/gable-dormer-product-sizes.png`,
    sizeGroups: [
      { label: "8' WIDE", sizes: ["8x12", "8x16"] },
      { label: "10' WIDE", sizes: ["10x12", "10x14", "10x16", "10x20"] },
      { label: "12' WIDE", sizes: ["12x16", "12x20", "12x24", "12x32", "12x36", "12x40"] },
    ],
  },
  "Chicken Coop": {
    heading: "THE BASICS OF OUR CHICKEN COOPS",
    body: "Our Chicken Coops are purpose-built to keep your flock safe, healthy, and productive. Each coop features nesting boxes, a run, and easy access for egg collection and cleaning.",
    bullets: [
      "Integrated nesting boxes",
      "Predator-resistant construction",
      "Easy-clean design",
      "Optional run extensions",
    ],
    sizesImage: `${THEME_BASE}/BYO-ChickenCoop.png`,
    sizeGroups: [
      { label: "STANDARD", sizes: ["6x8", "8x8", "8x10", "8x12"] },
    ],
  },
  "Animal Shelter": {
    heading: "THE BASICS OF OUR ANIMAL SHELTERS",
    body: "Our Animal Shelters are the perfect solution for livestock, horses, or other animals that need protection from the elements. Built with durability in mind to withstand daily use.",
    bullets: [
      "Open-front livestock design",
      "Heavy-duty construction",
      "Pressure-treated flooring option",
      "Multiple size options",
    ],
    sizesImage:
      "https://legacystructuresusa.com/wp-content/uploads/2025/03/IMG_8905-1741119267018-scaled.jpeg",
    sizeGroups: [
      { label: "10' WIDE", sizes: ["10x12", "10x16", "10x20", "10x24"] },
      { label: "12' WIDE", sizes: ["12x16", "12x20", "12x24", "12x32"] },
    ],
  },
  "Lofted Barn Playhouse": {
    heading: "THE BASICS OF OUR LOFTED BARN PLAYHOUSES",
    body: "Our Lofted Barn Playhouse brings all the charm of a classic lofted barn in a kid-friendly package. With a built-in loft, it becomes the perfect backyard retreat for children.",
    bullets: [
      "Classic lofted barn design",
      "Includes built-in loft",
      "Kid-friendly window placements",
      "Customizable door styles",
    ],
    sizesImage: "/images/optimized-assets/featured/lofted-barn-playhouse.webp",
    sizeGroups: [
      { label: "8' WIDE", sizes: ["8x10", "8x12"] },
      { label: "10' WIDE", sizes: ["10x12", "10x16", "10x20"] },
      { label: "12' WIDE", sizes: ["12x16", "12x20", "12x24"] },
    ],
  },
  "12x24 Garage": {
    heading: "THE BASICS OF OUR GARAGES",
    body: "Our Garages are built to protect your vehicles and provide extra storage space. With a 9' garage door and solid construction, these buildings deliver the durability you expect.",
    bullets: [
      "9' wide garage door included",
      "Engineered to handle a vehicle",
      "Service door standard",
      "Heavy-duty floor joists",
    ],
    sizesImage: "/images/optimized-assets/featured/garage.webp",
    sizeGroups: [
      { label: "12' WIDE", sizes: ["12x20", "12x24", "12x28", "12x32"] },
      { label: "14' WIDE", sizes: ["14x24", "14x28", "14x32", "14x40"] },
    ],
  },
  Garage: {
    heading: "THE BASICS OF OUR GARAGES",
    body: "Our Garages are built to protect your vehicles and provide extra storage space. With a 9' garage door and solid construction, these buildings deliver the durability you expect.",
    bullets: [
      "9' wide garage door included",
      "Engineered to handle a vehicle",
      "Service door standard",
      "Heavy-duty floor joists",
    ],
    sizesImage: "/images/optimized-assets/featured/garage.webp",
    sizeGroups: [
      { label: "12' WIDE", sizes: ["12x20", "12x24", "12x28", "12x32"] },
      { label: "14' WIDE", sizes: ["14x24", "14x28", "14x32", "14x40"] },
    ],
  },
  "Lofted Garage": {
    heading: "THE BASICS OF OUR LOFTED GARAGES",
    body: "Our Lofted Garage combines vehicle storage with the overhead \"lofted\" storage that makes our barns so popular. The perfect pairing for homeowners who want it all.",
    bullets: [
      "9' wide garage door",
      "Built-in loft storage",
      "Service door standard",
      "Multiple size options",
    ],
    sizesImage: "/images/optimized-assets/featured/garage.webp",
    sizeGroups: [
      { label: "12' WIDE", sizes: ["12x20", "12x24", "12x28", "12x32"] },
      { label: "14' WIDE", sizes: ["14x24", "14x28", "14x32", "14x40"] },
    ],
  },
  "Double Wide Garage": {
    heading: "THE BASICS OF OUR DOUBLE WIDE GARAGES",
    body: "Our Double Wide Garages offer twice the garage capacity in one easy package. With dual garage doors, these buildings easily accommodate two vehicles plus extra storage.",
    bullets: [
      "Two 9' wide garage doors",
      "Fits two vehicles",
      "Service door standard",
      "Heavy-duty construction",
    ],
    sizesImage: "/images/optimized-assets/featured/double-wide-garage.webp",
    sizeGroups: [
      { label: "24' WIDE", sizes: ["24x24", "24x28", "24x32", "24x40"] },
    ],
  },
  "A Frame": {
    heading: "THE BASICS OF OUR A FRAME BUILDINGS",
    body: "Our A Frame buildings are a modern take on classic cabin-style living. With a steep roof pitch and open interior, they make a great tiny home, office, or retreat.",
    bullets: [
      "Steep A-frame roof pitch",
      "Modern cabin look",
      "Great for offices or retreats",
      "Customizable interiors",
    ],
    sizesImage: "/images/optimized-assets/a-frames/12x12.webp",
    sizeGroups: [
      { label: "12' WIDE", sizes: ["12x16", "12x20", "12x24", "12x32"] },
      { label: "14' WIDE", sizes: ["14x24", "14x28", "14x32", "14x40"] },
    ],
  },
  "Reverse Gable A Frame": {
    heading: "THE BASICS OF OUR REVERSE GABLE A FRAME BUILDINGS",
    body: "Our Reverse Gable A Frame flips the orientation of the classic A-frame, placing the gable end on the long wall. This provides a dramatic entryway and more usable wall space inside.",
    bullets: [
      "Reverse-gable design",
      "Dramatic entryway",
      "More interior wall space",
      "Steep A-frame pitch",
    ],
    sizesImage: "/images/optimized-assets/a-frames/reverse-dormer.webp",
    sizeGroups: [
      { label: "12' WIDE", sizes: ["12x16", "12x20", "12x24", "12x32"] },
      { label: "14' WIDE", sizes: ["14x24", "14x28", "14x32", "14x40"] },
    ],
  },
  "Side Dormer A Frame": {
    heading: "THE BASICS OF OUR SIDE DORMER A FRAME BUILDINGS",
    body: "Our Side Dormer A Frame adds a side dormer to our iconic A-frame building, creating additional headroom and natural light. The perfect option for a full-featured cabin or home office.",
    bullets: [
      "A-frame roof with side dormer",
      "Extra headroom in key area",
      "Natural light from dormer",
      "Great for cabin use",
    ],
    sizesImage: "/images/optimized-assets/a-frames/12x20-side-dormer.webp",
    sizeGroups: [
      { label: "14' WIDE", sizes: ["14x24", "14x28", "14x32", "14x40"] },
    ],
  },
  "Utility Log Siding Cabin": {
    heading: "THE BASICS OF OUR UTILITY LOG SIDING CABINS",
    body: "Our Utility Log Siding Cabins bring rustic charm to your backyard. Real log siding gives your building the classic cabin look while our utility shed frame keeps it practical.",
    bullets: [
      "Authentic log siding",
      "Utility Shed base",
      "Rustic cabin look",
      "Multiple length options",
    ],
    sizesImage: "/images/optimized-assets/log-cabins/appalachian.webp",
    sizeGroups: [
      { label: "12' WIDE", sizes: ["12x20", "12x24", "12x32", "12x40"] },
      { label: "14' WIDE", sizes: ["14x24", "14x32", "14x40"] },
    ],
  },
  "Timber Trail Log Cabin": {
    heading: "THE BASICS OF OUR TIMBER TRAIL LOG CABINS",
    body: "Our Timber Trail Log Cabins are the flagship of our cabin line. Built with real log siding, a full-length porch, and a sprawling floor plan, they feel like home from day one.",
    bullets: [
      "Real log siding",
      "Full-length porch option",
      "Spacious floor plan",
      "Rustic cabin look",
    ],
    sizesImage: "/images/optimized-assets/log-cabins/timber-trail.webp",
    sizeGroups: [
      { label: "14' WIDE", sizes: ["14x32", "14x40", "14x48"] },
    ],
  },
  Greenhouse: {
    heading: "THE BASICS OF OUR GREENHOUSES",
    body: "Our Greenhouses are designed for year-round growing. With polycarbonate panels, solid framing, and optional ventilation, you'll be able to grow plants all season long.",
    bullets: [
      "Clear polycarbonate panels",
      "Strong framing",
      "Ventilation options",
      "Solid shelving options",
    ],
    sizesImage: "/images/optimized-assets/greenhouses.webp",
    sizeGroups: [
      { label: "8' WIDE", sizes: ["8x8", "8x10", "8x12"] },
      { label: "10' WIDE", sizes: ["10x12", "10x16"] },
    ],
  },
};

export function getModelDescription(modelType: string): ModelDescription {
  return (
    modelDescriptions[modelType] ?? {
      heading: `THE BASICS OF OUR ${modelType.toUpperCase()} BUILDINGS`,
      body: `Our ${modelType} buildings deliver quality construction, thoughtful design, and long-lasting materials. Whether you're adding storage or expanding your outdoor living space, our ${modelType} has you covered.`,
      bullets: [
        "Quality materials",
        "Built to last",
        "Customizable options",
        "Expert installation",
      ],
      sizesImage: "/images/optimized-assets/featured/utility-shed-10.webp",
      sizeGroups: [
        { label: "STANDARD", sizes: ["8x12", "10x16", "12x20", "12x24"] },
      ],
    }
  );
}
