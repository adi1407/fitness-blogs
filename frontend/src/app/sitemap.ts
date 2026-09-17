import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  // Index only hubs with intentional SEO value / navigation importance.
  // Thin calculator stubs stay out until they have real interactive content.
  const paths = [
    "",
    "/nutrition",
    "/nutrition/protein",
    "/weight-loss",
    "/muscle-building",
    "/training",
    "/tools",
    "/tools/protein-calculator",
    "/exercises",
    "/foods",
    "/foods/indian",
    "/about",
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
