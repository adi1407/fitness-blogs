"use client";

import type { PublicBlogArticle } from "@/lib/api/blog";
import { KeepArticleCard } from "@/features/keep/components/KeepArticleCard";

/** NewsKothari-style related grid (no masonry). */
export function ArticleRelatedGrid({
  articles,
  title,
  className = "",
  accentRail = false,
  compact = true,
}: {
  articles: PublicBlogArticle[];
  title?: string;
  className?: string;
  /** Soft accent left rail (used mid-article on <lg). */
  accentRail?: boolean;
  compact?: boolean;
}) {
  if (articles.length === 0) return null;

  const body = (
    <>
      {title ? (
        <p className={accentRail ? "fk-meta-accent" : "fk-meta text-foreground"}>
          {title}
        </p>
      ) : null}
      <div
        className={`grid gap-3 sm:grid-cols-2 ${title ? "mt-4" : ""} ${
          articles.length === 5 ? "lg:grid-cols-5 sm:[&>*:last-child]:col-span-2 lg:[&>*:last-child]:col-span-1" : ""
        }`}
      >
        {articles.map((a, i) => (
          <KeepArticleCard
            key={a.id}
            article={a}
            index={i}
            compact={compact}
          />
        ))}
      </div>
    </>
  );

  if (accentRail) {
    return (
      <aside className={`fk-accent-rail my-10 px-4 py-5 sm:px-5 ${className}`}>
        {body}
      </aside>
    );
  }

  return <div className={className}>{body}</div>;
}
