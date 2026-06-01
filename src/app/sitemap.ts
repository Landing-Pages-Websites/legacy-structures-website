import type { MetadataRoute } from "next";
import { buildings } from "@/data/buildings";
import { BRAND, MODEL_LINKS } from "@/lib/constants";

const STATIC_ROUTES = [
  "/",
  ...MODEL_LINKS.map(({ href }) => href),
  "/inventory",
  "/rent-to-own",
  "/about-us",
  "/contact-us",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const publicPages = STATIC_ROUTES.map((path) => ({
    url: `${BRAND.siteUrl}${path}`,
    changeFrequency: path === "/inventory" ? "daily" as const : "monthly" as const,
    priority: path === "/" ? 1 : path === "/inventory" ? 0.9 : 0.7,
  }));

  const inventoryPages = buildings.map(({ slug }) => ({
    url: `${BRAND.siteUrl}/building/${slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...publicPages, ...inventoryPages];
}
