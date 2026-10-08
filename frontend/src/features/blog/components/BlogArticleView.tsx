import Link from "next/link";
import { TrackedHubLink } from "@/components/analytics/TrackedHubLink";
import { JsonLd } from "@/components/seo/JsonLd";
import { CoverImage } from "@/components/shared/CoverImage";
import { SocialFollow } from "@/components/shared/SocialFollow";
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
import { FaqAccordion } from "@/features/shared/components/FaqAccordion";
import {
  calculatorCtaFor,
  type PublicBlogArticle,
} from "@/lib/api/blog";
import { articleHref } from "@/features/home/utils/articleMedia";
import { ORG_REF, pageTitle } from "@/lib/seo";
import { getPublicSiteUrl } from "@/lib/siteUrl";
import { KeepAtmosphere, KeepRelatedStack } from "@/features/keep";

const siteUrl = getPublicSiteUrl();

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
  placement,
}: {
  calc: { href: string; label: string; blurb: string };
  placement: string;
}) {
  return (
    <div className="fk-tool-card">
      <p className="fk-meta-accent">Related tool</p>
      <h3 className="mt-2 text-base font-semibold text-foreground">
        {calc.label}
      </h3>
      <p className="mt-1.5 text-sm text-muted-foreground">{calc.blurb}</p>
      <TrackedHubLink
        href={calc.href}
        label={calc.label}
        event="cta_click"
        placement={placement}
        className="fk-btn-primary mt-3 px-3"
      >
        Open calculator
      </TrackedHubLink>
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
    articleHref(article) ??
    (catSlug && subSlug && article.slug
      ? `/blog/${catSlug}/${subSlug}/${article.slug}`
      : `/preview`);
  const absoluteUrl = `${siteUrl}${canonicalPath.startsWith("/") ? canonicalPath : `/${canonicalPath}`}`;
  const calc = calculatorCtaFor(catSlug, subSlug);

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

  const authorName = article.authorName?.trim() || null;
  const reviewerName = article.reviewerName?.trim() || null;
  const authorPath = article.authorSlug ? `/authors/${article.authorSlug}` : null;
  const reviewerPath = article.reviewerSlug
    ? `/authors/${article.reviewerSlug}`
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
      ...(catSlug
        ? [
            {
              "@type": "ListItem",
              position: 3,
              name: catLabel,
              item: `${siteUrl}/${catSlug}`,
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
    headline: article.metaTitle ? pageTitle(article.metaTitle) : article.title,
    name: article.title,
    description: article.metaDescription || article.excerpt,
    datePublished: article.publishedAt ?? undefined,
    dateModified: article.updatedAt ?? article.publishedAt ?? undefined,
    articleSection: catLabel,
    keywords:
      [...new Set([article.primaryKeyword, ...article.tags, ...article.topics].filter(Boolean))].join(", ") ||
      undefined,
    image: article.featuredImage || article.ogImage || undefined,
    ...(authorName
      ? {
          author: {
            "@type": "Person",
            name: authorName,
            ...(authorPath ? { url: `${siteUrl}${authorPath}` } : {}),
          },
        }
      : { author: ORG_REF }),
    publisher: ORG_REF,
    inLanguage: "en-IN",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl,
      ...(reviewerName
        ? {
            reviewedBy: {
              "@type": "Person",
              name: reviewerName,
              ...(reviewerPath ? { url: `${siteUrl}${reviewerPath}` } : {}),
            },
            ...(article.lastReviewedAt
              ? { lastReviewed: article.lastReviewedAt }
              : {}),
          }
        : {}),
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

  const seenChips = new Set<string>();
  const tagChips = [
    catLabel,
    subLabel,
    ...article.topics.slice(0, 2),
    ...article.tags.slice(0, 3),
  ].filter((label) => {
    const key = label?.trim().toLowerCase();
    if (!key || seenChips.has(key)) return false;
    seenChips.add(key);
    return true;
  });

  const crumbItems = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    ...(catSlug
      ? [{ label: catLabel, href: `/${catSlug}` }]
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
            articleId={article.id}
            slug={article.slug}
            category={catSlug}
            subcategory={subSlug}
          />
        ) : null}

        <BlogBreadcrumbs items={crumbItems} />

        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start">
          <div className="fk-panel min-w-0">
            {article.featuredImage ? (
              <figure className="border-b border-border bg-muted">
                <CoverImage
                  src={article.featuredImage}
                  alt={
                    article.featuredImageAlt ||
                    article.title ||
                    "Article cover image"
                  }
                  sizes="(min-width: 1280px) 860px, (min-width: 1024px) 66vw, 100vw"
                  priority
                  className="mx-auto h-auto max-h-[min(70vh,640px)] w-full object-contain"
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

                <h1 className="mt-3 text-2xl font-semibold tracking-tight break-words text-foreground sm:text-3xl lg:text-4xl">
                  {article.title || "Untitled"}
                </h1>
                {article.excerpt ? (
                  <p className="mt-3 text-base leading-relaxed text-muted-foreground sm:text-lg">
                    {article.excerpt}
                  </p>
                ) : null}

                <div className="mt-5 flex flex-wrap items-start justify-between gap-4 border-y border-border py-4">
                  <div className="text-sm text-muted-foreground">
                    {authorName ? (
                      <p>
                        <span className="font-medium text-foreground">
                          Written by
                        </span>{" "}
                        <Link href={authorPath ?? "/authors"} className="fk-link">
                          {authorName}
                        </Link>
                      </p>
                    ) : null}
                    {reviewerName ? (
                      <p className={authorName ? "mt-1" : undefined}>
                        <span className="font-medium text-foreground">
                          Reviewed by
                        </span>{" "}
                        <Link href={reviewerPath ?? "/authors"} className="fk-link">
                          {reviewerName}
                        </Link>
                      </p>
                    ) : null}
                    <p
                      className={`flex flex-wrap gap-x-3 gap-y-1 text-xs ${authorName || reviewerName ? "mt-1" : ""}`}
                    >
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
                  <CalculatorCtaCard calc={calc} placement="article_top" />
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

              <FaqAccordion
                className="mt-10 border-t border-border pt-8"
                variant="stacked"
                items={article.faq}
                subtitle=""
              />

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

              <SocialFollow
                variant="card"
                placement="article_end"
                className="mt-10"
                description="Liked this guide? Get short, evidence-based fitness and nutrition tips for India every week. Reels on Instagram, guides on Facebook."
              />
              <p className="mt-3 text-sm text-muted-foreground">
                Questions about this article?{" "}
                <Link href="/contact" className="fk-link-muted underline underline-offset-2">
                  Contact the editorial team
                </Link>
                .
              </p>

              <p className="fk-disclaimer mt-8">
                Educational information only — not medical advice. Consult a
                qualified professional for personal health decisions.
              </p>
            </div>
          </div>

          <aside className="hidden min-w-0 space-y-6 lg:sticky lg:top-24 lg:block">
            <ArticleToc items={toc} />
            <KeepRelatedStack
              articles={railRelated}
              title="Related reading"
              limit={5}
            />
            {calc ? <CalculatorCtaCard calc={calc} placement="article_sidebar" /> : null}
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
                <Link href={`/${catSlug}`} className="fk-link">
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
