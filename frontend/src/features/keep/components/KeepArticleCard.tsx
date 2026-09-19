"use client";

import Link from "next/link";
import type { PublicBlogArticle } from "@/lib/api/blog";
import {
  articleHref,
  articleImage,
} from "@/features/home/utils/articleMedia";
import { trackEvent } from "@/lib/analytics/openpanel";

const IMAGE_HEIGHTS = ["h-28", "h-40", "h-32", "h-48", "h-36", "h-44"] as const;

type Props = {
  article: PublicBlogArticle;
  index?: number;
  /** Compact for sidebar / mid strip */
  compact?: boolean;
  trackLabel?: string;
};

export function KeepArticleCard({
  article,
  index = 0,
  compact = false,
  trackLabel,
}: Props) {
  const href = articleHref(article);
  if (!href) return null;

  const imgH = compact
    ? "h-28"
    : IMAGE_HEIGHTS[index % IMAGE_HEIGHTS.length];
  const tags = [
    article.categoryLabel,
    article.subcategoryLabel,
    ...(article.tags ?? []).slice(0, compact ? 0 : 1),
  ].filter(Boolean) as string[];

  return (
    <Link
      href={href}
      className="group block overflow-hidden rounded-xl border border-border bg-card transition duration-200 hover:shadow-lg hover:transition-shadow"
      onClick={() =>
        trackEvent("hub_click", {
          href,
          label: trackLabel ?? article.title,
        })
      }
    >
      <div className={`relative overflow-hidden ${imgH} bg-brand-50`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={articleImage(article)}
          alt=""
          className="size-full object-cover transition duration-500 group-hover:scale-[1.02]"
        />
      </div>
      <div className={`flex flex-col gap-1.5 ${compact ? "p-2.5" : "p-3"}`}>
        {tags.length > 0 ? (
          <ul className="flex flex-wrap gap-1">
            {tags.slice(0, compact ? 2 : 3).map((tag) => (
              <li
                key={tag}
                className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-600"
              >
                {tag}
              </li>
            ))}
          </ul>
        ) : null}
        <h3
          className={`line-clamp-2 font-semibold leading-snug tracking-tight text-foreground group-hover:text-sky-700 ${
            compact ? "text-xs" : "text-sm"
          }`}
        >
          {article.title}
        </h3>
        {!compact && article.excerpt ? (
          <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
            {article.excerpt}
          </p>
        ) : null}
        <p className="mt-auto truncate text-[11px] text-slate-400">
          {[article.categorySlug, article.subcategorySlug]
            .filter(Boolean)
            .join(" / ") || "fitknowledge"}
          {article.readingTime > 0 ? ` · ${article.readingTime} min` : ""}
        </p>
      </div>
    </Link>
  );
}
