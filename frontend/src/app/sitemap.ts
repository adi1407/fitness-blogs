import type { MetadataRoute } from "next";
import { BLOG_TAXONOMY } from "@/lib/blogTaxonomy";
import { fetchPublishedArticles } from "@/lib/api/blog";
import {
  fetchExercises,
  fetchKnowledgeSection,
  fetchRecipes,
  MUSCLE_GROUPS,
} from "@/lib/api/knowledge";

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
    "/recipes",
    "/programs",
    "/reviews",
    "/about",
    "/editorial-policy",
    "/medical-disclaimer",
    "/nutrition-disclaimer",
    "/terms",
    "/privacy",
    "/cookie-policy",
    "/affiliate-disclosure",
    "/corrections",
    "/contact",
  ];

  const blogCategoryPaths = BLOG_TAXONOMY.map((c) => `/blog/${c.slug}`);
  const exerciseGroupPaths = MUSCLE_GROUPS.map((g) => `/exercises/${g}`);

  const staticEntries = [...paths, ...exerciseGroupPaths].map((path, index) => ({
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
  let exerciseEntries: MetadataRoute.Sitemap = [];
  let recipeEntries: MetadataRoute.Sitemap = [];
  let knowledgeEntries: MetadataRoute.Sitemap = [];

  try {
    const articles = await fetchPublishedArticles({ limit: 500 });
    const subcatsWithContent = new Set<string>();

    articleEntries = articles
      .filter((a) => a.path || (a.categorySlug && a.subcategorySlug && a.slug))
      .map((a) => {
        const path =
          a.path ??
          (a.categorySlug && a.subcategorySlug && a.slug && a.articleNumber
            ? `/blog/${a.categorySlug}/${a.subcategorySlug}/${a.slug}/${a.articleNumber}`
            : a.categorySlug && a.subcategorySlug && a.slug
              ? `/blog/${a.categorySlug}/${a.subcategorySlug}/${a.slug}`
              : null);
        if (!path) return null;
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
      })
      .filter((e): e is NonNullable<typeof e> => e != null);

    subcategoryEntries = [...subcatsWithContent].map((key) => ({
      url: `${siteUrl}/blog/${key}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.75,
    }));
  } catch {
    /* API unavailable */
  }

  try {
    const exercises = await fetchExercises();
    exerciseEntries = exercises
      .filter((e) => e.robotsIndex !== false && e.path)
      .map((e) => ({
        url: `${siteUrl}${e.path}`,
        lastModified: e.updatedAt ? new Date(e.updatedAt) : new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.75,
      }));
  } catch {
    /* ignore */
  }

  try {
    const recipes = await fetchRecipes();
    recipeEntries = recipes
      .filter((r) => r.robotsIndex !== false && r.path)
      .map((r) => ({
        url: `${siteUrl}${r.path}`,
        lastModified: r.updatedAt ? new Date(r.updatedAt) : new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      }));
  } catch {
    /* ignore */
  }

  try {
    for (const section of ["programs", "reviews"] as const) {
      const { pages } = await fetchKnowledgeSection(section);
      for (const p of pages) {
        if (p.robotsIndex === false || !p.path) continue;
        knowledgeEntries.push({
          url: `${siteUrl}${p.path}`,
          lastModified: p.updatedAt ? new Date(p.updatedAt) : new Date(),
          changeFrequency: "weekly",
          priority: 0.7,
        });
      }
    }
  } catch {
    /* ignore */
  }

  return [
    ...staticEntries,
    ...blogCategoryEntries,
    ...subcategoryEntries,
    ...articleEntries,
    ...exerciseEntries,
    ...recipeEntries,
    ...knowledgeEntries,
  ];
}
