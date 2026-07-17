import type { MetadataRoute } from "next";
import { buildings } from "@/data/buildings";
import { BRAND, MODEL_LINKS } from "@/lib/constants";
import blogPosts from "@/data/blog-posts";

const LAST_MODIFIED = new Date("2026-07-17");

const STATIC_ROUTES: {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/inventory", changeFrequency: "daily", priority: 0.9 },
  ...MODEL_LINKS.map(({ href }) => ({
    path: href,
    changeFrequency: "monthly" as const,
    priority: href === "/storage-sheds" ? 0.8 : 0.75,
  })),
  { path: "/rent-to-own", changeFrequency: "monthly", priority: 0.7 },
  { path: "/about-us", changeFrequency: "monthly", priority: 0.7 },
  { path: "/contact-us", changeFrequency: "monthly", priority: 0.7 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.7 },
  { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const publicPages = STATIC_ROUTES.map(({ path, changeFrequency, priority }) => ({
    url: `${BRAND.siteUrl}${path === "/" ? "" : path}`,
    lastModified: LAST_MODIFIED,
    changeFrequency,
    priority,
  }));

  const inventoryPages = buildings.map(({ slug }) => ({
    url: `${BRAND.siteUrl}/building/${slug}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const blogPages = blogPosts.map(({ slug }) => ({
    url: `${BRAND.siteUrl}/blog/${slug}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...publicPages, ...inventoryPages, ...blogPages];
}
