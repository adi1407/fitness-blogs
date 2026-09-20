import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { ArticleCard } from "@/features/blog/components/ArticleCard";
import { BlogBreadcrumbs } from "@/features/blog/components/BlogBreadcrumbs";
import { BlogFeaturedLead } from "@/features/blog/components/BlogFeaturedLead";
import { BlogPillNav } from "@/features/blog/components/BlogPillNav";
import { BlogTopicRail } from "@/features/blog/components/BlogTopicRail";
import { fetchPublishedArticles } from "@/lib/api/blog";
import type { PublicBlogArticle } from "@/lib/api/blog";
import { getApiBase } from "@/lib/api/client";
import { BLOG_TAXONOMY } from "@/lib/blogTaxonomy";
import { articleHref } from "@/features/home/utils/articleMedia";

export const dynamic = "force-dynamic";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const RAIL_SIZE = 4;

export const metadata: Metadata = {
  title: "Latest — Muscle Building, Weight Loss & Nutrition Guides",
  description:
    "Latest FitKnowledge articles across muscle building, weight loss, and nutrition. Educational guides with clear answers — not medical advice.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Latest | FitKnowledge",
    description:
      "Recent fitness articles across three pillars: muscle building, weight loss, and nutrition.",
    url: "/blog",
  },
};

function pickFeatured(articles: PublicBlogArticle[]): PublicBlogArticle | null {
  const linkable = articles.filter((a) => articleHref(a));
  if (linkable.length === 0) return null;
  const withImage = linkable.find(
    (a) => Boolean(a.featuredImage?.trim() || a.ogImage?.trim()),
  );
  return withImage ?? linkable[0];
}

function articlesForCategory(
  articles: PublicBlogArticle[],
  categorySlug: string,
  excludeIds: Set<string>,
  limit: number,
): PublicBlogArticle[] {
  return articles
    .filter(
      (a) =>
        a.categorySlug === categorySlug &&
        articleHref(a) &&
        !excludeIds.has(a.id),
    )
    .slice(0, limit);
}

export default async function BlogIndexPage() {
  const articles = await fetchPublishedArticles({ limit: 36 });

  const featured = pickFeatured(articles);
  const usedIds = new Set<string>();
  if (featured) usedIds.add(featured.id);

  const rails = BLOG_TAXONOMY.map((cat) => {
    const railArticles = articlesForCategory(
      articles,
      cat.slug,
      usedIds,
      RAIL_SIZE,
    );
    for (const a of railArticles) usedIds.add(a.id);
    return { category: cat, articles: railArticles };
  });

  const latest = articles.filter(
    (a) => articleHref(a) && !usedIds.has(a.id),
  );

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${siteUrl}/blog`,
      },
    ],
  };

  const hasAny = articles.some((a) => articleHref(a));

  return (
    <main className="fk-page flex-1 py-10 sm:py-12">
      <JsonLd data={breadcrumbLd} />
      <BlogBreadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "Blog" }]}
      />

      <header className="mt-6 max-w-3xl">
        <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Latest
        </h1>
        <p className="mt-4 text-base text-muted-foreground sm:text-lg">
          Evidence-informed guides across muscle building, weight loss, and
          nutrition — written to answer real questions and link into tools and
          databases.
        </p>
        <p className="mt-3 text-sm text-muted-foreground">
          Educational content only. Consult a qualified professional for
          personal medical or diet advice.{" "}
          <Link href="/medical-disclaimer" className="fk-link font-medium">
            Medical disclaimer
          </Link>
        </p>
      </header>

      <div className="mt-8">
        <BlogPillNav />
      </div>

      {!hasAny ? (
        <p className="mt-10 rounded-xl border border-dashed border-border bg-white px-5 py-8 text-sm text-muted-foreground">
          No published articles yet. Explore the{" "}
          <Link href="/muscle-building" className="fk-link font-medium">
            muscle building
          </Link>
          ,{" "}
          <Link href="/weight-loss" className="fk-link font-medium">
            weight loss
          </Link>
          , and{" "}
          <Link href="/nutrition" className="fk-link font-medium">
            nutrition
          </Link>{" "}
          hubs while the library grows.
          {process.env.NODE_ENV === "production" &&
          getApiBase().includes("localhost") ? (
            <span className="mt-2 block text-red-600">
              Site API is still pointed at localhost. Set{" "}
              <code className="font-mono">API_URL</code> (or{" "}
              <code className="font-mono">NEXT_PUBLIC_API_URL</code>) to your
              Render API and redeploy.
            </span>
          ) : null}
        </p>
      ) : (
        <>
          {featured ? (
            <div className="mt-10">
              <BlogFeaturedLead article={featured} />
            </div>
          ) : null}

          <div className="mt-2">
            {rails.map(({ category, articles: railArticles }) => (
              <BlogTopicRail
                key={category.slug}
                category={category}
                articles={railArticles}
              />
            ))}
          </div>

          <section className="my-10 rounded-xl border border-border bg-brand-50/50 px-5 py-8 sm:px-8">
            <p className="fk-meta text-foreground">Tools</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">
              Prefer a number first?
            </h2>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground sm:text-base">
              Free calculators for protein, TDEE, macros, and more — each one
              teaches and links back into guides.
            </p>
            <Link href="/tools" className="fk-btn-primary mt-5 px-5 py-2.5">
              Open calculators
            </Link>
          </section>

          {latest.length > 0 ? (
            <section className="pb-6">
              <div className="flex items-end justify-between gap-4">
                <h2 className="text-2xl font-semibold tracking-tight">
                  More guides
                </h2>
              </div>
              <div className="mt-4 divide-y divide-border border-t border-border">
                {latest.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            </section>
          ) : null}
        </>
      )}
    </main>
  );
}
