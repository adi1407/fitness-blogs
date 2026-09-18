import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  ArticleShare,
  ArticleToc,
} from "@/features/blog/components/ArticleChrome";
import { BlogBreadcrumbs } from "@/features/blog/components/BlogBreadcrumbs";
import { enhanceArticleHtml } from "@/features/blog/utils/articleHtml";
import {
  calculatorCtaForCategory,
  fetchPublishedArticleBySlug,
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
      name: article.authorName || "FitKnowledge Editorial",
    },
    mainEntityOfPage: absoluteUrl,
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

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
      <JsonLd data={breadcrumbLd} />
      <JsonLd data={articleLd} />
      {faqLd ? <JsonLd data={faqLd} /> : null}

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

      <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
        <div>
          <header>
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <span className="rounded-full bg-brand-50 px-2.5 py-0.5 font-medium text-foreground ring-1 ring-brand-100">
                {category.label}
              </span>
              <Link
                href={`/blog/${category.slug}/${subcategory.slug}`}
                className="hover:text-primary"
              >
                {subcategory.label}
              </Link>
              {article.readingTime > 0 && (
                <span>· {article.readingTime} min read</span>
              )}
              {article.views > 0 && <span>· {article.views.toLocaleString()} views</span>}
            </div>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              {article.title}
            </h1>
            {article.excerpt ? (
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                {article.excerpt}
              </p>
            ) : null}

            <div className="mt-6 flex flex-wrap items-start justify-between gap-4 border-y border-border py-4">
              <div className="text-sm text-muted-foreground">
                <p>
                  <span className="font-medium text-foreground">Written by</span>{" "}
                  {article.authorName || "FitKnowledge Editorial"}
                </p>
                {article.reviewerName ? (
                  <p className="mt-1">
                    <span className="font-medium text-foreground">
                      Reviewed by
                    </span>{" "}
                    {article.reviewerName}
                  </p>
                ) : null}
                <p className="mt-1 flex flex-wrap gap-x-3 gap-y-1">
                  {publishedLabel && <span>Published {publishedLabel}</span>}
                  {updatedLabel && <span>Updated {updatedLabel}</span>}
                  {article.articleNumber != null && (
                    <span className="font-mono text-xs text-slate-500">
                      ID {article.articleNumber}
                    </span>
                  )}
                </p>
              </div>
              <ArticleShare title={article.title} url={absoluteUrl} />
            </div>
          </header>

          {article.featuredImage ? (
            <figure className="mt-8 overflow-hidden rounded-2xl border border-border bg-muted">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={article.featuredImage}
                alt={
                  article.featuredImageAlt ||
                  article.title ||
                  "Article cover image"
                }
                className="aspect-[16/9] w-full object-cover"
              />
              {article.featuredImageCaption ? (
                <figcaption className="px-4 py-2 text-center text-xs text-muted-foreground">
                  {article.featuredImageCaption}
                </figcaption>
              ) : null}
            </figure>
          ) : null}

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

          <div className="mt-8 lg:hidden">
            <ArticleToc items={toc} />
          </div>

          {bodyHtml ? (
            <article
              className="article-body mt-10 space-y-4 text-base leading-relaxed text-foreground [&_.read-also]:my-6 [&_.read-also]:rounded-xl [&_.read-also]:border [&_.read-also]:border-sky-100 [&_.read-also]:bg-sky-50/70 [&_.read-also]:px-4 [&_.read-also]:py-3 [&_.read-also]:text-sm [&_a]:font-medium [&_a]:text-primary [&_a]:underline-offset-2 hover:[&_a]:underline [&_h2]:scroll-mt-28 [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h3]:scroll-mt-28 [&_h3]:mt-6 [&_h3]:text-xl [&_h3]:font-semibold [&_img]:rounded-xl [&_li]:ml-5 [&_li]:list-disc [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:text-muted-foreground [&_table]:w-full [&_table]:border-collapse [&_td]:border [&_td]:border-border [&_td]:px-3 [&_td]:py-2 [&_th]:border [&_th]:border-border [&_th]:bg-muted/50 [&_th]:px-3 [&_th]:py-2 [&_ul]:pl-5"
              dangerouslySetInnerHTML={{ __html: bodyHtml }}
            />
          ) : null}

          {article.faq.length > 0 ? (
            <section className="mt-12 border-t border-border pt-10">
              <h2 className="text-2xl font-semibold tracking-tight">
                Frequently asked questions
              </h2>
              <div className="mt-6 space-y-4">
                {article.faq.map((item, i) => (
                  <details
                    key={`${item.question}-${i}`}
                    className="group rounded-xl border border-border bg-white px-4 py-3"
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
            <section className="mt-12 border-t border-border pt-10">
              <h2 className="text-xl font-semibold tracking-tight">Sources</h2>
              <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-muted-foreground">
                {article.sources.map((s, i) => (
                  <li key={`${s.title}-${i}`}>
                    {s.url ? (
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-primary hover:underline"
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

          <p className="mt-10 rounded-xl border border-orange-100 bg-orange-50/50 px-4 py-3 text-sm text-muted-foreground">
            Educational information only — not medical advice. Consult a
            qualified professional for personal health decisions.
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
            <h2 className="text-xl font-semibold tracking-tight">
              Related reading
            </h2>
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
              </ul>
            ) : (
              <ul className="mt-4 divide-y divide-border rounded-2xl border border-border bg-white">
                {related.map((a) => {
                  const href =
                    a.path ??
                    `/blog/${a.categorySlug}/${a.subcategorySlug}/${a.slug}`;
                  return (
                    <li key={a.id} className="px-4 py-3">
                      <Link
                        href={href}
                        className="font-medium text-foreground hover:text-primary"
                      >
                        {a.title}
                      </Link>
                      {a.articleNumber != null ? (
                        <span className="ml-2 font-mono text-xs text-muted-foreground">
                          #{a.articleNumber}
                        </span>
                      ) : null}
                      {a.excerpt ? (
                        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                          {a.excerpt}
                        </p>
                      ) : null}
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        </div>

        <aside className="hidden space-y-6 lg:sticky lg:top-24 lg:block">
          <ArticleToc items={toc} />
          {calc ? (
            <div className="rounded-2xl border border-orange-100 bg-orange-50/60 p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-orange-800">
                Related tool
              </p>
              <h3 className="mt-2 text-lg font-semibold text-foreground">
                {calc.label}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{calc.blurb}</p>
              <Link
                href={calc.href}
                className="mt-4 inline-flex rounded-lg bg-sky-600 px-3 py-2 text-sm font-semibold text-white hover:bg-sky-700"
              >
                Open calculator
              </Link>
            </div>
          ) : null}
          <div className="rounded-2xl border border-border bg-white p-5 text-sm text-muted-foreground">
            <p className="font-semibold text-foreground">Article ID</p>
            <p className="mt-1 font-mono text-base text-sky-800">
              {article.articleNumber ?? "—"}
            </p>
            <p className="mt-2 text-xs">
              Short link:{" "}
              <Link
                href={`/blog/${article.articleNumber}`}
                className="text-primary hover:underline"
              >
                /blog/{article.articleNumber}
              </Link>
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}
