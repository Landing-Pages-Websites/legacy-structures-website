import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Rent-to-Own Sheds Near Me, Upstate NY",
  description:
    "Rent-to-own sheds in Upstate NY with no credit check. Explore sheds, barns, and garages with affordable monthly payments, then request a quote today.",
  path: "/rent-to-own",
});

export default function RentToOwnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
