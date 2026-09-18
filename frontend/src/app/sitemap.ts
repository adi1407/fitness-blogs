import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const paths = [
    "",
    "/learn",
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

  return paths.map((path, index) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "daily" : "weekly",
    priority: path === "" ? 1 : index < 6 ? 0.9 : 0.7,
  }));
}
