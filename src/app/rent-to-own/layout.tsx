import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Rent to Own Sheds, Barns & Garages | No Credit Check | Hudson Falls, NY",
  description:
    "Rent-to-own sheds, barns, garages, and cabins in Hudson Falls, NY. No credit check required, instant approval, month-to-month agreement. Buildings as low as $103/mo.",
  path: "/rent-to-own",
});

export default function RentToOwnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
