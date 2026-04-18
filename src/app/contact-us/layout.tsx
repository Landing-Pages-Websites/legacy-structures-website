import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Legacy Structures",
  description:
    "We want to hear from you! If you're in the market for a shed and have questions, we are ready to help you out. Visit us in Hudson Falls, NY or call 518-544-2889.",
  openGraph: {
    title: "Contact Us | Legacy Structures",
    description:
      "Get in touch with Legacy Structures in Hudson Falls, NY. Questions about storage sheds, rent-to-own, or custom builds — we're here to help.",
    type: "website",
  },
};

export default function ContactUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
