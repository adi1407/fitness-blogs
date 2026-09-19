import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  ArticleShare,
  ArticleToc,
} from "@/features/blog/components/ArticleChrome";
import { ArticleActionsRow } from "@/features/blog/components/ArticleActionSlots";
import { ArticleMobileActionBar } from "@/features/blog/components/ArticleMobileActionBar";
import { ArticleOpenBeacon } from "@/features/blog/components/ArticleOpenBeacon";
import { ArticleReadingProgress } from "@/features/blog/components/ArticleReadingProgress";
import { ArticleRelatedGrid } from "@/features/blog/components/ArticleRelatedGrid";
import { BlogBreadcrumbs } from "@/features/blog/components/BlogBreadcrumbs";
import { enhanceArticleHtml } from "@/features/blog/utils/articleHtml";
import {
  calculatorCtaForCategory,
  fetchPublishedArticleBySlug,
} from "@/lib/api/blog";
import {
  KeepAtmosphere,
  KeepRelatedStack,
} from "@/features/keep";
import {
  findCategory,
  findSubcategory,
  isBlogCategorySlug,
} from "@/lib/blogTaxonomy";

export const dynamic = "force-dynamic";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

type PageProps = {
  params: Promise<{
    category: string;
    subcategory: string;
    slug: string;
  }>;
};

function CalculatorCtaCard({
  calc,
}: {
  calc: { href: string; label: string; blurb: string };
}) {
  return (
    <div className="fk-tool-card">
      <p className="fk-meta-accent">Related tool</p>
      <h3 className="mt-2 text-base font-semibold text-foreground">
        {calc.label}
      </h3>
      <p className="mt-1.5 text-sm text-muted-foreground">{calc.blurb}</p>
      <Link href={calc.href} className="fk-btn-primary mt-3 px-3">
        Open calculator
      </Link>
    </div>
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const payload = await fetchPublishedArticleBySlug(slug);
  if (!payload) {
    return { title: "Article not found", robots: { index: false } };
  }
  const { article } = payload;

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

  const payload = await fetchPublishedArticleBySlug(slug);
  if (!payload?.article?.slug) notFound();
  const { article, related } = payload;

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

  const { html: bodyHtml, toc } = enhanceArticleHtml(article.body || "");
  const canonicalPath =
    article.path ??
    `/blog/${category.slug}/${subcategory.slug}/${article.slug}`;
  const absoluteUrl = `${siteUrl}${canonicalPath}`;
  const calc = calculatorCtaForCategory(article.categorySlug);

  const railRelated = related.slice(0, 5);
  const belowRelated = related.slice(5, 10);

  const publishedLabel = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;
  const updatedLabel =
    article.updatedAt &&
    article.publishedAt &&
    new Date(article.updatedAt).getTime() >
      new Date(article.publishedAt).getTime() + 86_400_000
      ? new Date(article.updatedAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : null;

  const authorName = article.authorName || "FitKnowledge Editorial";

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
        item: absoluteUrl,
      },
    ],
  };

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.metaDescription || article.excerpt,
    datePublished: article.publishedAt ?? undefined,
    dateModified: article.updatedAt ?? article.publishedAt ?? undefined,
    articleSection: category.label,
    keywords: [...article.tags, ...article.topics].join(", ") || undefined,
    image: article.featuredImage || article.ogImage || undefined,
    author: {
      "@type": "Person",
      name: authorName,
      url: `${siteUrl}/authors`,
    },
    publisher: {
      "@type": "Organization",
      name: "FitKnowledge",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo.svg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl,
    },
  };

  const faqLd =
    article.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: article.faq.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: f.answer,
            },
          })),
        }
      : null;

  const tagChips = [
    category.label,
    subcategory.label,
    ...article.topics.slice(0, 2),
    ...article.tags.slice(0, 3),
  ].filter(Boolean);

  return (
    <KeepAtmosphere className="flex-1">
      <ArticleReadingProgress />
      <main className="fk-page fk-page--content pb-24 pt-8 lg:pb-10 lg:py-10">
        <JsonLd data={breadcrumbLd} />
        <JsonLd data={articleLd} />
        {faqLd ? <JsonLd data={faqLd} /> : null}

        <ArticleOpenBeacon
          slug={article.slug ?? slug}
          category={category.slug}
          subcategory={subcategory.slug}
        />

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

        <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start">
          <div className="fk-panel">
            {article.featuredImage ? (
              <figure className="overflow-hidden border-b border-border bg-muted">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={article.featuredImage}
                  alt={
                    article.featuredImageAlt ||
                    article.title ||
                    "Article cover image"
                  }
                  className="aspect-video w-full object-cover"
                />
                {article.featuredImageCaption ? (
                  <figcaption className="px-4 py-2 text-center text-xs text-muted-foreground">
                    {article.featuredImageCaption}
                  </figcaption>
                ) : null}
              </figure>
            ) : null}

            <div className="p-5 sm:p-7 lg:p-8">
              <header>
                <ul className="flex flex-wrap gap-1.5">
                  {tagChips.map((tag) => (
                    <li key={tag} className="fk-chip">
                      {tag}
                    </li>
                  ))}
                </ul>

                <h1 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
                  {article.title}
                </h1>
                {article.excerpt ? (
                  <p className="mt-3 text-base leading-relaxed text-muted-foreground sm:text-lg">
                    {article.excerpt}
                  </p>
                ) : null}

                <div className="mt-5 flex flex-wrap items-start justify-between gap-4 border-y border-border py-4">
                  <div className="text-sm text-muted-foreground">
                    <p>
                      <span className="font-medium text-foreground">
                        Written by
                      </span>{" "}
                      <Link href="/authors" className="fk-link">
                        {authorName}
                      </Link>
                    </p>
                    {article.reviewerName ? (
                      <p className="mt-1">
                        <span className="font-medium text-foreground">
                          Reviewed by
                        </span>{" "}
                        <Link href="/authors" className="fk-link">
                          {article.reviewerName}
                        </Link>
                      </p>
                    ) : null}
                    <p className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs">
                      {publishedLabel && (
                        <span>Published {publishedLabel}</span>
                      )}
                      {updatedLabel && <span>Updated {updatedLabel}</span>}
                      {article.readingTime > 0 && (
                        <span>{article.readingTime} min read</span>
                      )}
                      {article.views > 0 && (
                        <span>{article.views.toLocaleString()} views</span>
                      )}
                    </p>
                  </div>
                  <ArticleActionsRow
                    className="hidden sm:flex"
                    share={
                      <ArticleShare title={article.title} url={absoluteUrl} />
                    }
                  />
                </div>
              </header>

              {article.quickAnswer ? (
                <aside className="fk-callout mt-6">
                  <h2 className="fk-meta text-foreground">Quick Answer</h2>
                  <p className="mt-2 text-base leading-relaxed text-foreground">
                    {article.quickAnswer}
                  </p>
                </aside>
              ) : null}

              {calc ? (
                <div className="mt-6 lg:hidden">
                  <CalculatorCtaCard calc={calc} />
                </div>
              ) : null}

              <div className="mt-6 lg:hidden">
                <ArticleToc items={toc} />
              </div>

              {bodyHtml ? (
                <article
                  className="article-body mt-8"
                  dangerouslySetInnerHTML={{ __html: bodyHtml }}
                />
              ) : null}

              {/* Recs 1–5 inline on <lg (desktop uses sticky rail) */}
              {railRelated.length > 0 ? (
                <div className="lg:hidden">
                  <ArticleRelatedGrid
                    articles={railRelated}
                    title="More in this cluster"
                    accentRail
                  />
                </div>
              ) : null}

              {article.faq.length > 0 ? (
                <section className="mt-10 border-t border-border pt-8">
                  <h2 className="text-xl font-semibold tracking-tight">
                    Frequently asked questions
                  </h2>
                  <div className="mt-5 space-y-3">
                    {article.faq.map((item, i) => (
                      <details
                        key={`${item.question}-${i}`}
                        className="fk-faq-item group"
                        open={i === 0}
                      >
                        <summary className="cursor-pointer list-none font-medium text-foreground marker:content-none">
                          {item.question}
                        </summary>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          {item.answer}
                        </p>
                      </details>
                    ))}
                  </div>
                </section>
              ) : null}

              {article.sources.length > 0 ? (
                <section className="mt-10 border-t border-border pt-8">
                  <h2 className="text-lg font-semibold tracking-tight">
                    Sources
                  </h2>
                  <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-muted-foreground">
                    {article.sources.map((s, i) => (
                      <li key={`${s.title}-${i}`}>
                        {s.url ? (
                          <a
                            href={s.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="fk-link"
                          >
                            {s.title}
                          </a>
                        ) : (
                          <span className="font-medium text-foreground">
                            {s.title}
                          </span>
                        )}
                        {s.note ? ` — ${s.note}` : null}
                      </li>
                    ))}
                  </ol>
                </section>
              ) : null}

              <aside className="fk-callout mt-10">
                <p className="fk-meta text-foreground">Stay in the loop</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  New guides and calculators as we publish — educational only,
                  never spam.
                </p>
                <Link href="/contact" className="fk-btn-ghost mt-3">
                  Get in touch
                </Link>
              </aside>

              <p className="fk-disclaimer mt-8">
                Educational information only — not medical advice. Consult a
                qualified professional for personal health decisions.
              </p>
            </div>
          </div>

          <aside className="hidden space-y-6 lg:sticky lg:top-24 lg:block">
            <ArticleToc items={toc} />
            <KeepRelatedStack
              articles={railRelated}
              title="Related reading"
              limit={5}
            />
            {calc ? <CalculatorCtaCard calc={calc} /> : null}
            <div className="rounded-xl border border-border bg-white p-4 text-sm text-muted-foreground">
              <p className="font-semibold text-foreground">Article ID</p>
              <p className="mt-1 font-mono text-base text-foreground">
                {article.articleNumber ?? "—"}
              </p>
              <p className="mt-2 text-xs">
                Short link:{" "}
                <Link
                  href={`/blog/${article.articleNumber}`}
                  className="fk-link"
                >
                  /blog/{article.articleNumber}
                </Link>
              </p>
            </div>
          </aside>
        </div>

        {/* Recs 6–10 (or leftover if fewer than 10) — never overlap with rail */}
        <section className="mt-12 border-t border-border/60 pt-10">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 className="text-xl font-semibold tracking-tight text-foreground">
              Keep reading
            </h2>
            <Link
              href={`/blog/${category.slug}/${subcategory.slug}`}
              className="fk-link text-sm font-semibold"
            >
              More in {subcategory.label} →
            </Link>
          </div>
          {belowRelated.length > 0 ? (
            <ArticleRelatedGrid
              articles={belowRelated}
              className="mt-6"
              compact={false}
            />
          ) : related.length === 0 ? (
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link
                  href={`/blog/${category.slug}/${subcategory.slug}`}
                  className="fk-link"
                >
                  More in {subcategory.label}
                </Link>
              </li>
              <li>
                <Link href={`/blog/${category.slug}`} className="fk-link">
                  All {category.label} articles
                </Link>
              </li>
            </ul>
          ) : (
            <p className="mt-4 text-sm text-muted-foreground">
              More guides in{" "}
              <Link
                href={`/blog/${category.slug}/${subcategory.slug}`}
                className="fk-link"
              >
                {subcategory.label}
              </Link>{" "}
              as we publish.
            </p>
          )}
        </section>
      </main>

      <ArticleMobileActionBar title={article.title} url={absoluteUrl} />
    </KeepAtmosphere>
  );
}
