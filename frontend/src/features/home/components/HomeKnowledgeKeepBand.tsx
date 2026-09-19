"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import type { PublicBlogArticle } from "@/lib/api/blog";
import { articleHref, articleImage } from "@/features/home/utils/articleMedia";
import { trackEvent } from "@/lib/analytics/openpanel";

type Props = {
  articles: PublicBlogArticle[];
};

const IMAGE_HEIGHTS = ["h-36", "h-48", "h-40", "h-56", "h-44", "h-52"] as const;

/**
 * Masonry “knowledge keep” band — bookmark-card feel inspired by
 * Karakeep’s grid (AGPL sibling at karakeep/; not copied).
 */
export function HomeKnowledgeKeepBand({ articles }: Props) {
  const reduceMotion = useReducedMotion();
  const items = articles.filter((a) => articleHref(a)).slice(0, 12);

  if (items.length < 3) return null;

  return (
    <section className="relative overflow-hidden border-y border-border/60 bg-linear-to-b from-[#F7FBFE] via-white to-[#FFF8F0]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 12% 20%, #E1F5FE 0%, transparent 42%), radial-gradient(circle at 88% 70%, #FFE0B2 0%, transparent 38%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-600/80">
              Kept for later
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Guides worth saving
            </h2>
            <p className="mt-2 text-sm text-muted-foreground sm:text-base">
              Browse the library like a personal keep — preview, skim the
              tags, open what you need.
            </p>
          </div>
          <Link
            href="/blog"
            className="text-sm font-semibold text-primary hover:underline"
            onClick={() =>
              trackEvent("hub_click", {
                href: "/blog",
                label: "Knowledge keep view all",
              })
            }
          >
            Open library →
          </Link>
        </div>

        <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {items.map((article, i) => {
            const href = articleHref(article)!;
            const imgH = IMAGE_HEIGHTS[i % IMAGE_HEIGHTS.length];
            const tags = [
              article.categoryLabel,
              article.subcategoryLabel,
              ...(article.tags ?? []).slice(0, 2),
            ].filter(Boolean) as string[];

            return (
              <motion.article
                key={article.id}
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.45,
                  delay: reduceMotion ? 0 : Math.min(i * 0.04, 0.28),
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mb-4 break-inside-avoid"
              >
                <Link
                  href={href}
                  className="group block overflow-hidden rounded-2xl border border-border/80 bg-white shadow-[0_1px_0_rgba(15,23,42,0.04)] transition duration-300 hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-[0_12px_28px_-12px_rgba(14,165,233,0.35)]"
                  onClick={() =>
                    trackEvent("hub_click", {
                      href,
                      label: article.title,
                    })
                  }
                >
                  <div className={`relative overflow-hidden ${imgH} bg-brand-50`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={articleImage(article)}
                      alt=""
                      className="size-full object-cover transition duration-500 group-hover:scale-[1.03]"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/25 via-transparent to-transparent opacity-60" />
                  </div>

                  <div className="p-4">
                    {tags.length > 0 ? (
                      <ul className="flex flex-wrap gap-1.5">
                        {tags.slice(0, 3).map((tag) => (
                          <li
                            key={tag}
                            className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-600"
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>
                    ) : null}

                    <h3 className="mt-2 line-clamp-2 text-[15px] font-semibold leading-snug tracking-tight text-foreground group-hover:text-sky-700">
                      {article.title}
                    </h3>

                    {article.excerpt ? (
                      <p className="mt-1.5 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                        {article.excerpt}
                      </p>
                    ) : null}

                    <p className="mt-3 truncate text-xs text-slate-400">
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
      </div>
    </section>
  );
}
