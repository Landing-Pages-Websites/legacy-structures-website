import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rent to Own Storage Sheds | Legacy Structures",
  description:
    "Get your building today with our convenient rent-to-own program. Instant approval with no credit checks. No strings, month-to-month agreement.",
  openGraph: {
    title: "Rent to Own Storage Sheds | Legacy Structures",
    description:
      "No credit check, instant approval, no strings. Pay monthly and own your shed. Hudson Falls, NY.",
    type: "website",
  },
};

export default function RentToOwnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
