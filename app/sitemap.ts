import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { cases } from "@/content/cases";

const pages = ["", "/work", "/services", "/awards", "/about", "/contact", "/ai-lab", "/journal"];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...pages.map((p) => ({ url: `${siteConfig.url}${p}`, changeFrequency: "monthly" as const, priority: p ? 0.7 : 1 })),
    ...cases.map((c) => ({ url: `${siteConfig.url}/work/${c.slug}`, changeFrequency: "monthly" as const, priority: 0.8 })),
  ];
}
