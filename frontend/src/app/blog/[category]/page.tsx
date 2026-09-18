import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { ArticleCard } from "@/features/blog/components/ArticleCard";
import { BlogBreadcrumbs } from "@/features/blog/components/BlogBreadcrumbs";
import {
  fetchPublishedArticleByNumber,
  fetchPublishedArticles,
} from "@/lib/api/blog";
import {
  findCategory,
  isBlogCategorySlug,
} from "@/lib/blogTaxonomy";

export const dynamic = "force-dynamic";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

type PageProps = {
  params: Promise<{ category: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { category: categorySlug } = await params;
  if (/^\d{9}$/.test(categorySlug)) {
    return { title: "Article", robots: { index: false } };
  }
  const category = findCategory(categorySlug);
  if (!category) {
    return { title: "Category not found", robots: { index: false } };
  }

  return {
    title: `${category.label} Guides & Articles`,
    description: category.description,
    alternates: { canonical: `/blog/${category.slug}` },
    openGraph: {
      title: `${category.label} | FitKnowledge Blog`,
      description: category.description,
      url: `/blog/${category.slug}`,
    },
  };
}

export default async function BlogCategoryPage({ params }: PageProps) {
  const { category: categorySlug } = await params;

  if (/^\d{9}$/.test(categorySlug)) {
    const article = await fetchPublishedArticleByNumber(Number(categorySlug));
    if (article?.path) redirect(article.path);
    notFound();
  }

  if (!isBlogCategorySlug(categorySlug)) notFound();

  const category = findCategory(categorySlug);
  if (!category) notFound();

  const articles = await fetchPublishedArticles({
    category: category.slug,
    limit: 48,
  });

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
      {
        "@type": "ListItem",
        position: 3,
        name: category.label,
        item: `${siteUrl}/blog/${category.slug}`,
      },
    ],
  };

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-12 sm:px-6 lg:px-8">
      <JsonLd data={breadcrumbLd} />
      <BlogBreadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: category.label },
        ]}
      />

      <header className="mt-6 max-w-3xl">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          {category.label}
        </h1>
        <p className="mt-4 text-base text-muted-foreground sm:text-lg">
          {category.description} Educational only — not a substitute for
          professional medical or coaching advice.
        </p>
      </header>

      <section className="mt-10">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-primary">
          Subcategories
        </h2>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {category.subcategories.map((sub) => (
            <li key={sub.slug}>
              <Link
                href={`/blog/${category.slug}/${sub.slug}`}
                className="block rounded-xl border border-border bg-white px-4 py-3 text-sm font-medium text-foreground transition hover:border-primary hover:bg-brand-50"
              >
                {sub.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14">
        <h2 className="text-2xl font-semibold tracking-tight">
          Articles in {category.label}
        </h2>
        {articles.length === 0 ? (
          <p className="mt-6 rounded-xl border border-dashed border-border px-5 py-8 text-sm text-muted-foreground">
            No published articles in this category yet. Browse subcategories
            above or check back soon.
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
