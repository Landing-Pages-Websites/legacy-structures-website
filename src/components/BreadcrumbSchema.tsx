"use client";

import { usePathname } from "next/navigation";
import { BRAND } from "@/lib/constants";

const labelFromSegment = (segment: string) =>
  segment
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const WWW_CANONICAL_HOST = "https://www.legacystructuresusa.com";
const WWW_CANONICAL_PATHS = new Set([
  "/blog",
  "/privacy-policy",
  "/building/chicken-coop",
  "/building/mini-barn",
  "/building/utility-shed-3",
]);

export default function BreadcrumbSchema() {
  const pathname = usePathname();
  if (!pathname || pathname === "/") return null;

  const segments = pathname.split("/").filter(Boolean);
  const breadcrumbHost = WWW_CANONICAL_PATHS.has(pathname)
    ? WWW_CANONICAL_HOST
    : BRAND.siteUrl;
  const items = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: breadcrumbHost,
    },
    ...segments.map((segment, index) => {
      const path = `/${segments.slice(0, index + 1).join("/")}`;
      return {
        "@type": "ListItem",
        position: index + 2,
        name: labelFromSegment(segment),
        item: `${breadcrumbHost}${path}`,
      };
    }),
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
