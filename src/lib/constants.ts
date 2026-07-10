export const BRAND = {
  name: "Legacy Structures",
  siteUrl: "https://legacystructuresusa.com",
  phone: "518-544-2889",
  phoneTel: "5185442889",
  email: "stephen@legacystructuresusa.com",
  address: "3570 US 4, Hudson Falls, NY 12839",
  addressStreet: "3570 US 4",
  addressCity: "Hudson Falls",
  addressState: "NY",
  addressZip: "12839",
  craftsmanshipLocation: "Cobleskill, NY",
} as const;

export const MODEL_LINKS = [
  { label: "Backyard Barns", href: "/backyard-barns" },
  { label: "Storage Sheds", href: "/storage-sheds" },
  { label: "Portable Cabins", href: "/portable-cabins" },
  { label: "Portable Garages", href: "/portable-garages" },
  { label: "Double Wide Garages", href: "/double-wide-garages" },
  { label: "A-Frames", href: "/a-frames" },
  { label: "Log Cabins", href: "/log-cabins" },
  { label: "Chicken Coops", href: "/chicken-coops" },
  { label: "Greenhouses", href: "/greenhouses" },
  { label: "Side Gables", href: "/side-gables" },
] as const;

export const NAV_LINKS = [
  { label: "Home", href: "/", hasDropdown: false },
  { label: "Our Models", href: "/storage-sheds", hasDropdown: true },
  { label: "Inventory", href: "/inventory", hasDropdown: false },
  { label: "Rent To Own", href: "/rent-to-own", hasDropdown: false },
  { label: "About Us", href: "/about-us", hasDropdown: false },
  { label: "Blog", href: "/blog", hasDropdown: false },
] as const;

export const BUSINESS_HOURS = [
  ["Monday", "By Appointment"],
  ["Tuesday", "9:00 am - 5:00 pm"],
  ["Wednesday", "By Appointment"],
  ["Thursday", "By Appointment"],
  ["Friday", "By Appointment"],
  ["Saturday", "By Appointment"],
  ["Sunday", "Closed"],
] as const;

export const SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/BackyardOutfittersEnterprisesLLC/",
  instagram: "https://www.instagram.com/backyardoutfittersusa",
} as const;
