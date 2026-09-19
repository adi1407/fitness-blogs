import type { MetadataRoute } from "next";
import { BLOG_TAXONOMY } from "@/lib/blogTaxonomy";
import { fetchPublishedArticles } from "@/lib/api/blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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

  const blogCategoryEntries = blogCategoryPaths.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  let articleEntries: MetadataRoute.Sitemap = [];
  let subcategoryEntries: MetadataRoute.Sitemap = [];

  try {
    const articles = await fetchPublishedArticles({ limit: 500 });
    const subcatsWithContent = new Set<string>();

    articleEntries = articles
      .filter((a) => a.path || (a.categorySlug && a.subcategorySlug && a.slug))
      .map((a) => {
        const path =
          a.path ??
          `/blog/${a.categorySlug}/${a.subcategorySlug}/${a.slug}`;
        if (a.categorySlug && a.subcategorySlug) {
          subcatsWithContent.add(`${a.categorySlug}/${a.subcategorySlug}`);
        }
        return {
          url: `${siteUrl}${path}`,
          lastModified: a.updatedAt
            ? new Date(a.updatedAt)
            : a.publishedAt
              ? new Date(a.publishedAt)
              : new Date(),
          changeFrequency: "weekly" as const,
          priority: 0.8,
        };
      });

    subcategoryEntries = [...subcatsWithContent].map((key) => ({
      url: `${siteUrl}/blog/${key}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.75,
    }));
  } catch {
    /* API unavailable — static + category entries still ship */
  }

  return [
    ...staticEntries,
    ...blogCategoryEntries,
    ...subcategoryEntries,
    ...articleEntries,
  ];
}
