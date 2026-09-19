"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import type { PublicBlogArticle } from "@/lib/api/blog";
import { articleHref, articleImage } from "@/features/home/utils/articleMedia";
import { trackEvent } from "@/lib/analytics/openpanel";
import { BLOG_TAXONOMY } from "@/lib/blogTaxonomy";
import { getApiBase } from "@/lib/api/client";

type Props = {
  articles: PublicBlogArticle[];
};

type FilterId = "all" | string;

const IMAGE_HEIGHTS = ["h-32", "h-44", "h-36", "h-52", "h-40", "h-48"] as const;

const FILTERS: { id: FilterId; label: string }[] = [
  { id: "all", label: "All" },
  ...BLOG_TAXONOMY.map((c) => ({ id: c.slug, label: c.label })),
];

/**
 * Primary home: Karakeep-inspired bookmark masonry (original FitKnowledge UI).
 */
export function HomeKnowledgeKeepBand({ articles }: Props) {
  const reduceMotion = useReducedMotion();
  const apiIsLocalhost = getApiBase().includes("localhost");
  const [filter, setFilter] = useState<FilterId>("all");

  const linkable = useMemo(
    () => articles.filter((a) => Boolean(articleHref(a))),
    [articles],
  );

  const items = useMemo(() => {
    if (filter === "all") return linkable;
    return linkable.filter((a) => a.categorySlug === filter);
  }, [linkable, filter]);

  return (
    <section className="relative min-h-[calc(100svh-var(--site-header-height))] overflow-hidden bg-linear-to-b from-[#F7FBFE] via-white to-[#FFF8F0]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 10% 0%, #E1F5FE 0%, transparent 45%), radial-gradient(circle at 92% 18%, #FFE0B2 0%, transparent 40%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 pb-16 pt-10 sm:px-6 sm:pt-12 lg:px-8">
        <header className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sky-600/90">
            Your fitness keep
          </p>
          <h1 className="mt-3 font-sans text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-[3.25rem]">
            FitKnowledge
          </h1>
          <p className="mt-3 max-w-lg text-base text-muted-foreground sm:text-lg">
            Evidence-informed guides — open what you need, save the rest for
            later.
          </p>
        </header>

        <div className="mt-8 flex flex-wrap items-center gap-2">
          {FILTERS.map((f) => {
            const active = filter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                className={
                  active
                    ? "rounded-lg bg-sky-500 px-3 py-1.5 text-xs font-semibold text-white shadow-sm"
                    : "rounded-lg border border-border/80 bg-white/80 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-sky-200 hover:text-sky-700"
                }
              >
                {f.label}
              </button>
            );
          })}
          <Link
            href="/blog"
            className="ml-auto text-xs font-semibold text-sky-700 hover:underline sm:text-sm"
            onClick={() =>
              trackEvent("hub_click", {
                href: "/blog",
                label: "Keep view all",
              })
            }
          >
            Full library →
          </Link>
        </div>

        {linkable.length === 0 ? (
          <div className="mt-14 rounded-2xl border border-dashed border-border bg-white/70 px-6 py-16 text-center">
            <p className="text-lg font-semibold text-foreground">
              Nothing in the keep yet
            </p>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
              Published guides will show up here as bookmark cards. Meanwhile,
              try a calculator or browse tools.
            </p>
            {apiIsLocalhost ? (
              <p className="mt-4 text-sm text-red-600">
                API is pointed at localhost. Set{" "}
                <code className="font-mono text-xs">API_URL</code> to your
                Render API and redeploy.
              </p>
            ) : null}
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                href="/tools"
                className="rounded-lg bg-sky-500 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-600"
              >
                Open tools
              </Link>
              <Link
                href="/blog"
                className="rounded-lg border border-border bg-white px-4 py-2 text-sm font-semibold text-foreground hover:border-sky-200"
              >
                Browse blog
              </Link>
            </div>
          </div>
        ) : items.length === 0 ? (
          <p className="mt-14 text-center text-sm text-muted-foreground">
            No guides in this category yet. Try another filter.
          </p>
        ) : (
          <div className="mt-8 columns-1 gap-3 sm:columns-2 lg:columns-3 xl:columns-4">
            {items.map((article, i) => {
              const href = articleHref(article)!;
              const imgH = IMAGE_HEIGHTS[i % IMAGE_HEIGHTS.length];
              const tags = [
                article.categoryLabel,
                article.subcategoryLabel,
                ...(article.tags ?? []).slice(0, 1),
              ].filter(Boolean) as string[];

              return (
                <motion.article
                  key={article.id}
                  initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                  whileInView={
                    reduceMotion ? undefined : { opacity: 1, y: 0 }
                  }
                  viewport={{ once: true, margin: "-24px" }}
                  transition={{
                    duration: 0.4,
                    delay: reduceMotion ? 0 : Math.min(i * 0.03, 0.24),
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="mb-3 break-inside-avoid"
                >
                  <Link
                    href={href}
                    className="group block overflow-hidden rounded-xl border border-border bg-card transition duration-200 hover:shadow-lg hover:transition-shadow"
                    onClick={() =>
                      trackEvent("hub_click", {
                        href,
                        label: article.title,
                      })
                    }
                  >
                    <div
                      className={`relative overflow-hidden ${imgH} bg-brand-50`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={articleImage(article)}
                        alt=""
                        className="size-full object-cover transition duration-500 group-hover:scale-[1.02]"
                      />
                    </div>

                    <div className="flex flex-col gap-2 p-3">
                      {tags.length > 0 ? (
                        <ul className="flex flex-wrap gap-1">
                          {tags.slice(0, 3).map((tag) => (
                            <li
                              key={tag}
                              className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-600"
                            >
                              {tag}
                            </li>
                          ))}
                        </ul>
                      ) : null}

                      <h2 className="line-clamp-2 text-sm font-semibold leading-snug tracking-tight text-foreground group-hover:text-sky-700">
                        {article.title}
                      </h2>

                      {article.excerpt ? (
                        <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                          {article.excerpt}
                        </p>
                      ) : null}

                      <p className="mt-auto truncate text-[11px] text-slate-400">
                        {[article.categorySlug, article.subcategorySlug]
                          .filter(Boolean)
                          .join(" / ") || "fitknowledge"}
                        {article.readingTime > 0
                          ? ` · ${article.readingTime} min`
                          : ""}
                      </p>
                    </div>
                  </Link>
                </motion.article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
