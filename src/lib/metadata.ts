import type { Metadata } from "next";
import { BRAND } from "@/lib/constants";

const SOCIAL_IMAGE = {
  url: "https://barndealer.com/assets/img/social-share-barn-icon-250c.png",
  width: 250,
  height: 250,
  alt: "Legacy Structures",
};

export const absoluteUrl = (path = "/"): string => {
  if (path.startsWith("http")) return path;
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${BRAND.siteUrl}${normalizedPath === "/" ? "" : normalizedPath}`;
};

const withBrand = (title: string): string =>
  title.includes(BRAND.name) ? title : `${title} | ${BRAND.name}`;

export function createPageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = absoluteUrl(path);
  const fullTitle = withBrand(title);

  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      siteName: BRAND.name,
      title: fullTitle,
      description,
      images: [SOCIAL_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [SOCIAL_IMAGE.url],
    },
  };
}
