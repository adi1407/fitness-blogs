import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { BlogBreadcrumbs } from "@/features/blog/components/BlogBreadcrumbs";
import {
  fetchPublishedArticleBySlug,
  fetchPublishedArticles,
} from "@/lib/api/blog";
import {
  findCategory,
  findSubcategory,
  isBlogCategorySlug,
} from "@/lib/blogTaxonomy";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

type PageProps = {
  params: Promise<{
    category: string;
    subcategory: string;
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await fetchPublishedArticleBySlug(slug);
  if (!article) {
    return { title: "Article not found", robots: { index: false } };
  }

  const title = article.metaTitle || article.title;
  const description =
    article.metaDescription ||
    article.excerpt ||
    article.quickAnswer ||
    "Educational fitness article from FitKnowledge.";

  return {
    title,
    description,
    alternates: {
      canonical: article.path ?? undefined,
    },
    openGraph: {
      title,
      description,
      url: article.path ?? undefined,
      type: "article",
      images: article.ogImage || article.featuredImage
        ? [article.ogImage || article.featuredImage!]
        : undefined,
    },
  };
}

export default async function BlogArticlePage({ params }: PageProps) {
  const {
    category: categorySlug,
    subcategory: subcategorySlug,
    slug,
  } = await params;

  if (!isBlogCategorySlug(categorySlug)) notFound();

  const category = findCategory(categorySlug);
  const subcategory = findSubcategory(categorySlug, subcategorySlug);
  if (!category || !subcategory) notFound();

  const article = await fetchPublishedArticleBySlug(slug);
  if (!article || !article.slug) notFound();

  // Canonical path mismatch → redirect to the article's real path
  if (
    article.categorySlug &&
    article.subcategorySlug &&
    (article.categorySlug !== categorySlug ||
      article.subcategorySlug !== subcategorySlug)
  ) {
    redirect(
      `/blog/${article.categorySlug}/${article.subcategorySlug}/${article.slug}`,
    );
  }

  const related = (
    await fetchPublishedArticles({
      category: category.slug,
      subcategory: subcategory.slug,
      limit: 6,
    })
  ).filter((a) => a.id !== article.id).slice(0, 4);

  const publishedLabel = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

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
      {
        "@type": "ListItem",
        position: 4,
        name: subcategory.label,
        item: `${siteUrl}/blog/${category.slug}/${subcategory.slug}`,
      },
      {
        "@type": "ListItem",
        position: 5,
        name: article.title,
        item: `${siteUrl}${article.path ?? `/blog/${category.slug}/${subcategory.slug}/${article.slug}`}`,
      },
    ],
  };

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.metaDescription || article.excerpt,
    datePublished: article.publishedAt ?? undefined,
    articleSection: category.label,
    keywords: [...article.tags, ...article.topics].join(", ") || undefined,
  };

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-12 sm:px-6 lg:px-8">
      <JsonLd data={breadcrumbLd} />
      <JsonLd data={articleLd} />

      <BlogBreadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: category.label, href: `/blog/${category.slug}` },
          {
            label: subcategory.label,
            href: `/blog/${category.slug}/${subcategory.slug}`,
          },
          { label: article.title },
        ]}
      />

      <header className="mt-6">
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <span className="rounded-full bg-brand-50 px-2.5 py-0.5 font-medium text-foreground ring-1 ring-brand-100">
            {category.label}
          </span>
          <span>{subcategory.label}</span>
          {article.readingTime > 0 && (
            <span>· {article.readingTime} min read</span>
          )}
          {article.views > 0 && <span>· {article.views} views</span>}
        </div>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          {article.title}
        </h1>
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
          <span>Written by FitKnowledge Editorial</span>
          {publishedLabel && <span>Published {publishedLabel}</span>}
          {article.articleNumber != null && (
            <span className="font-mono text-xs">#{article.articleNumber}</span>
          )}
        </div>
      </header>

      {article.quickAnswer ? (
        <aside className="mt-8 rounded-2xl border border-brand-100 bg-brand-50/60 p-5 sm:p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-primary">
            Quick Answer
          </h2>
          <p className="mt-2 text-base leading-relaxed text-foreground">
            {article.quickAnswer}
          </p>
        </aside>
      ) : null}

      {article.body ? (
        <article
          className="article-body mt-10 space-y-4 text-base leading-relaxed text-foreground [&_a]:font-medium [&_a]:text-primary [&_a]:underline-offset-2 hover:[&_a]:underline [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h3]:mt-6 [&_h3]:text-xl [&_h3]:font-semibold [&_img]:rounded-xl [&_li]:ml-5 [&_li]:list-disc [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:text-muted-foreground [&_ul]:pl-5"
          dangerouslySetInnerHTML={{ __html: article.body }}
        />
      ) : article.excerpt ? (
        <p className="mt-10 text-base leading-relaxed text-muted-foreground">
          {article.excerpt}
        </p>
      ) : null}

      <p className="mt-10 rounded-xl border border-orange-100 bg-orange-50/50 px-4 py-3 text-sm text-muted-foreground">
        Educational information only — not medical advice. Consult a qualified
        professional for personal health decisions.
      </p>

      {(article.tags.length > 0 || article.topics.length > 0) && (
        <div className="mt-8 flex flex-wrap gap-2">
          {[...article.topics, ...article.tags].map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-white px-3 py-1 text-xs font-medium text-foreground ring-1 ring-border"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <section className="mt-14 border-t border-border pt-10">
        <h2 className="text-xl font-semibold tracking-tight">Related reading</h2>
        {related.length === 0 ? (
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link
                href={`/blog/${category.slug}/${subcategory.slug}`}
                className="font-medium text-primary hover:underline"
              >
                More in {subcategory.label}
              </Link>
            </li>
            <li>
              <Link
                href={`/blog/${category.slug}`}
                className="font-medium text-primary hover:underline"
              >
                All {category.label} articles
              </Link>
            </li>
            <li>
              <Link
                href="/tools"
                className="font-medium text-primary hover:underline"
              >
                Fitness calculators
              </Link>
            </li>
          </ul>
        ) : (
          <ul className="mt-4 space-y-3">
            {related.map((a) => {
              const href =
                a.path ??
                `/blog/${a.categorySlug}/${a.subcategorySlug}/${a.slug}`;
              return (
                <li key={a.id}>
                  <Link
                    href={href}
                    className="text-base font-medium text-foreground hover:text-primary"
                  >
                    {a.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </main>
  );
}
