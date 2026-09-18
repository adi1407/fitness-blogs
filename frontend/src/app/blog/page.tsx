import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { ArticleCard } from "@/features/blog/components/ArticleCard";
import { BlogBreadcrumbs } from "@/features/blog/components/BlogBreadcrumbs";
import { fetchPublishedArticles } from "@/lib/api/blog";
import { getApiBase } from "@/lib/api/client";
import { BLOG_TAXONOMY } from "@/lib/blogTaxonomy";

export const dynamic = "force-dynamic";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  title: "Fitness Blog — Muscle Building, Weight Loss & Nutrition",
  description:
    "Browse FitKnowledge articles across muscle building, weight loss, and nutrition. Educational guides with clear answers — not medical advice.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog | FitKnowledge",
    description:
      "Recent fitness articles across three pillars: muscle building, weight loss, and nutrition.",
    url: "/blog",
  },
};

export default async function BlogIndexPage() {
  const articles = await fetchPublishedArticles({ limit: 24 });

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

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-12 sm:px-6 lg:px-8">
      <JsonLd data={breadcrumbLd} />
      <BlogBreadcrumbs items={[{ label: "Home", href: "/" }, { label: "Blog" }]} />

      <header className="mt-6 max-w-3xl">
        <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Fitness knowledge blog
        </h1>
        <p className="mt-4 text-base text-muted-foreground sm:text-lg">
          Intent-complete articles organized into three pillars — muscle
          building, weight loss, and nutrition. Educational content only;
          consult a qualified professional for personal advice.
        </p>
      </header>

      <section className="mt-10">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-primary">
          Browse by category
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {BLOG_TAXONOMY.map((cat) => (
            <Link
              key={cat.slug}
              href={`/blog/${cat.slug}`}
              className="rounded-2xl border border-border bg-brand-50/50 p-5 transition hover:border-primary hover:bg-brand-50"
            >
              <h3 className="text-lg font-semibold text-foreground">
                {cat.label}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {cat.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl font-semibold tracking-tight">
            Recent articles
          </h2>
          <Link
            href="/tools"
            className="text-sm font-semibold text-primary hover:underline"
          >
            Try a calculator →
          </Link>
        </div>

        {articles.length === 0 ? (
          <p className="mt-6 rounded-xl border border-dashed border-border bg-white px-5 py-8 text-sm text-muted-foreground">
            No published articles yet. Explore the category hubs above while we
            grow the library.
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
          <div className="mt-4 divide-y divide-border border-t border-border">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
