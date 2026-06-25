import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Building Inventory",
  description:
    "Browse in-stock storage sheds, lofted barns, utility sheds, portable garages, cabins, and more at Legacy Structures in Hudson Falls, NY. Cash price and rent-to-own options listed.",
  path: "/inventory",
});

export default function InventoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
