import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { SocialLinks } from "@/components/ui/social-links";
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
  type PublicBlogArticle,
} from "@/lib/api/blog";
import { KeepAtmosphere, KeepRelatedStack } from "@/features/keep";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

type Props = {
  article: PublicBlogArticle;
  related: PublicBlogArticle[];
  /** Category / subcategory labels for crumbs when taxonomy is known. */
  categoryLabel?: string | null;
  subcategoryLabel?: string | null;
  categorySlug?: string | null;
  subcategorySlug?: string | null;
  /** Staff preview: noindex chrome, banner, no analytics beacon. */
  preview?: boolean;
  previewStatus?: string;
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

/** Shared public article layout used by live blog URLs and CMS preview. */
export function BlogArticleView({
  article,
  related,
  categoryLabel,
  subcategoryLabel,
  categorySlug,
  subcategorySlug,
  preview = false,
  previewStatus,
}: Props) {
  const catSlug = categorySlug ?? article.categorySlug;
  const subSlug = subcategorySlug ?? article.subcategorySlug;
  const catLabel = categoryLabel ?? article.categoryLabel ?? "Blog";
  const subLabel = subcategoryLabel ?? article.subcategoryLabel ?? "Draft";

  const { html: bodyHtml, toc } = enhanceArticleHtml(article.body || "");
  const canonicalPath =
    article.path ??
    (catSlug && subSlug && article.slug
      ? `/blog/${catSlug}/${subSlug}/${article.slug}`
      : `/preview`);
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

  const authorName = article.authorName || "fitlives Editorial";

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
      ...(catSlug
        ? [
            {
              "@type": "ListItem",
              position: 3,
              name: catLabel,
              item: `${siteUrl}/blog/${catSlug}`,
            },
          ]
        : []),
      ...(catSlug && subSlug
        ? [
            {
              "@type": "ListItem",
              position: 4,
              name: subLabel,
              item: `${siteUrl}/blog/${catSlug}/${subSlug}`,
            },
          ]
        : []),
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
    articleSection: catLabel,
    keywords: [...article.tags, ...article.topics].join(", ") || undefined,
    image: article.featuredImage || article.ogImage || undefined,
    author: {
      "@type": "Person",
      name: authorName,
      url: `${siteUrl}/authors`,
    },
    publisher: {
      "@type": "Organization",
      name: "fitlives",
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
    catLabel,
    subLabel,
    ...article.topics.slice(0, 2),
    ...article.tags.slice(0, 3),
  ].filter(Boolean);

  const crumbItems = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    ...(catSlug
      ? [{ label: catLabel, href: `/blog/${catSlug}` }]
      : [{ label: catLabel }]),
    ...(catSlug && subSlug
      ? [{ label: subLabel, href: `/blog/${catSlug}/${subSlug}` }]
      : catSlug
        ? []
        : [{ label: subLabel }]),
    { label: article.title || "Untitled" },
  ];

  return (
    <KeepAtmosphere className="flex-1">
      {!preview ? <ArticleReadingProgress /> : null}
      <main className="fk-page fk-page--content pb-24 pt-8 lg:pb-10 lg:py-10">
        {preview ? (
          <div className="mb-6 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-950">
            <p className="font-semibold">Staff preview — not indexed</p>
            <p className="mt-1 text-amber-900/80">
              Status: {previewStatus ?? article.status ?? "draft"}. This URL
              expires with the preview token and will not appear in search.
            </p>
          </div>
        ) : null}

        {!preview ? (
          <>
            <JsonLd data={breadcrumbLd} />
            <JsonLd data={articleLd} />
            {faqLd ? <JsonLd data={faqLd} /> : null}
          </>
        ) : null}

        {!preview && article.slug && catSlug && subSlug ? (
          <ArticleOpenBeacon
            slug={article.slug}
            category={catSlug}
            subcategory={subSlug}
          />
        ) : null}

        <BlogBreadcrumbs items={crumbItems} />

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
                  {article.title || "Untitled"}
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
                      {!preview && article.views > 0 && (
                        <span>{article.views.toLocaleString()} views</span>
                      )}
                    </p>
                  </div>
                  {!preview ? (
                    <ArticleActionsRow
                      className="hidden sm:flex"
                      articleId={article.id}
                      share={
                        <ArticleShare title={article.title} url={absoluteUrl} />
                      }
                    />
                  ) : null}
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
              ) : (
                <p className="mt-8 text-sm text-muted-foreground">
                  No body content yet.
                </p>
              )}

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
              {article.articleNumber ? (
                <p className="mt-2 text-xs">
                  Short link:{" "}
                  <Link
                    href={`/blog/${article.articleNumber}`}
                    className="fk-link"
                  >
                    /blog/{article.articleNumber}
                  </Link>
                </p>
              ) : null}
            </div>
          </aside>
        </div>

        <section className="mt-12 border-t border-border/60 pt-10">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 className="text-xl font-semibold tracking-tight text-foreground">
              Keep reading
            </h2>
            {catSlug && subSlug ? (
              <Link
                href={`/blog/${catSlug}/${subSlug}`}
                className="fk-link text-sm font-semibold"
              >
                More in {subLabel} →
              </Link>
            ) : null}
          </div>
          {belowRelated.length > 0 ? (
            <ArticleRelatedGrid
              articles={belowRelated}
              className="mt-6"
              compact={false}
            />
          ) : related.length === 0 && catSlug && subSlug ? (
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link
                  href={`/blog/${catSlug}/${subSlug}`}
                  className="fk-link"
                >
                  More in {subLabel}
                </Link>
              </li>
              <li>
                <Link href={`/blog/${catSlug}`} className="fk-link">
                  All {catLabel} articles
                </Link>
              </li>
            </ul>
          ) : related.length === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">
              Related guides appear after publish.
            </p>
          ) : (
            <p className="mt-4 text-sm text-muted-foreground">
              More guides in{" "}
              {catSlug && subSlug ? (
                <Link
                  href={`/blog/${catSlug}/${subSlug}`}
                  className="fk-link"
                >
                  {subLabel}
                </Link>
              ) : (
                subLabel
              )}{" "}
              as we publish.
            </p>
          )}
        </section>
      </main>

      {!preview ? (
        <>
          <SocialLinks
            url={absoluteUrl}
            title={article.title}
            floatingButtonColor="bg-[#0A0A0A]"
            requireAuth
          />
          <ArticleMobileActionBar articleId={article.id} />
        </>
      ) : null}
    </KeepAtmosphere>
  );
}
