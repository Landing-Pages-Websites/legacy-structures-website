import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";

const baseMetadata = createPageMetadata({
  title: "Portable Buildings & Sheds for Sale",
  description:
    "Shop portable buildings, storage sheds, barns & garages from Legacy Structures in Hudson Falls, NY. Cash pricing and rent-to-own options with free delivery.",
  path: "/inventory",
});

export const metadata: Metadata = {
  ...baseMetadata,
  alternates: {
    ...(baseMetadata.alternates ?? {}),
    canonical: "https://www.legacystructuresusa.com/inventory",
  },
  openGraph: {
    ...(baseMetadata.openGraph ?? {}),
    url: "https://www.legacystructuresusa.com/inventory",
  },
};

export default function InventoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
