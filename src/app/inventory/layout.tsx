import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Building Inventory",
  description:
    "Browse our current inventory of storage sheds, lofted barns, utility sheds, garages, cabins, and chicken coops available for sale and rent-to-own in Hudson Falls, NY.",
  openGraph: {
    title: "Building Inventory | Legacy Structures",
    description:
      "Our sales lot in Hudson Falls, NY has a wide variety of buildings and sheds for sale, including lofted barns, utility sheds, and more.",
    type: "website",
  },
};

export default function InventoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
