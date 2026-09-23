"use client";

import Link from "next/link";
import type { PublicBlogArticle } from "@/lib/api/blog";
import {
  articleHref,
  articleImage,
} from "@/features/home/utils/articleMedia";
import { trackEvent } from "@/lib/analytics/openpanel";

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

  const tags = [
    article.categoryLabel,
    article.subcategoryLabel,
    ...(article.tags ?? []).slice(0, compact ? 0 : 1),
  ].filter(Boolean) as string[];

  return (
    <Link
      href={href}
      className="group block overflow-hidden rounded-xl border border-border bg-card transition duration-200 hover:border-accent hover:shadow-md"
      onClick={() =>
        trackEvent("hub_click", {
          href,
          label: trackLabel ?? article.title,
          position: index,
        })
      }
    >
      <div className="relative aspect-video w-full bg-muted">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={articleImage(article)}
          alt=""
          className="size-full object-contain object-center transition duration-500 group-hover:scale-[1.02]"
        />
      </div>
      <div className={`flex flex-col gap-1.5 ${compact ? "p-2.5" : "p-3"}`}>
        {tags.length > 0 ? (
          <ul className="flex flex-wrap gap-1">
            {tags.slice(0, compact ? 2 : 3).map((tag) => (
              <li key={tag} className="fk-chip normal-case tracking-normal">
                {tag}
              </li>
            ))}
          </ul>
        ) : null}
        <h3
          className={`line-clamp-2 font-semibold leading-snug tracking-tight text-foreground transition-colors group-hover:text-accent ${
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
        <p className="mt-auto truncate text-[11px] text-muted-foreground/80">
          {[article.categorySlug, article.subcategorySlug]
            .filter(Boolean)
            .join(" / ") || "fitlives"}
          {article.readingTime > 0 ? ` · ${article.readingTime} min` : ""}
        </p>
      </div>
    </Link>
  );
}
