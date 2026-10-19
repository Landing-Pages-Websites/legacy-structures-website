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
  "/storage-sheds",
  "/building/chicken-coop",
  "/building/mini-barn",
  "/building/utility-shed-3",
  "/building/lofted-barn-6",
  "/building/lofted-barn-5",
  "/building/lofted-barn",
  "/building/animal-shelter",
  "/building/lofted-barn-3",
  "/building/lofted-barn-4",
  "/building/utility-shed-10",
  "/building/utility-shed-4",
  "/building/lofted-barn-9",
  "/building/lofted-barn-7",
  "/building/utility-dormer",
  "/building/lofted-barn-10",
  "/building/utility-shed-7",
  "/building/utility-gable-dormer",
  "/building/lofted-barn-playhouse",
  "/building/garage",
  "/building/reverse-gable-a-frame",
  "/building/utility-log-siding-cabin",
  "/building/double-wide-garage",
  "/building/timber-trail-log-cabin",
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
