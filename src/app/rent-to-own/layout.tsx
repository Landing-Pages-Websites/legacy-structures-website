import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Rent-to-Own Sheds, No Credit Check",
  description:
    "Rent-to-own sheds, barns & garages in Hudson Falls, NY. No credit check, instant approval, month-to-month agreements. Buildings from just $103/mo.",
  path: "/rent-to-own",
});

export default function RentToOwnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
