import type { MetadataRoute } from "next";
import { BLOG_TAXONOMY } from "@/lib/blogTaxonomy";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const paths = [
    "",
    "/blog",
    "/nutrition",
    "/nutrition/protein",
    "/weight-loss",
    "/muscle-building",
    "/training",
    "/tools",
    "/tools/protein-calculator",
    "/tools/tdee-calculator",
    "/tools/calorie-calculator",
    "/tools/macro-calculator",
    "/tools/bmr-calculator",
    "/tools/bmi-calculator",
    "/exercises",
    "/foods",
    "/foods/indian",
    "/about",
    "/authors",
    "/editorial-policy",
    "/medical-disclaimer",
    "/contact",
  ];

  const blogCategoryPaths = BLOG_TAXONOMY.map((c) => `/blog/${c.slug}`);

  const staticEntries = paths.map((path, index) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: (path === "" || path === "/blog"
      ? "daily"
      : "weekly") as "daily" | "weekly",
    priority: path === "" ? 1 : path === "/blog" ? 0.95 : index < 6 ? 0.9 : 0.7,
  }));

  const blogEntries = blogCategoryPaths.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  return [...staticEntries, ...blogEntries];
}
