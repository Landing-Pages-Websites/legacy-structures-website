import type { Metadata } from "next";
import { BRAND } from "@/lib/constants";

const SOCIAL_IMAGE = {
  url: "https://barndealer.com/assets/img/social-share-barn-icon-250c.png",
  width: 250,
  height: 250,
  alt: "Legacy Structures",
};

export function createPageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: path,
      siteName: BRAND.name,
      title: `${title} | ${BRAND.name}`,
      description,
      images: [SOCIAL_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${BRAND.name}`,
      description,
      images: [SOCIAL_IMAGE.url],
    },
  };
}
