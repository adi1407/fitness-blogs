"use client";

import type { PublicBlogArticle } from "@/lib/api/blog";
import { KeepArticleCard } from "@/features/keep/components/KeepArticleCard";

/** Compact related stack for article aside / mid strip. */
export function KeepRelatedStack({
  articles,
  title = "Related",
  limit = 4,
  compact = true,
}: {
  articles: PublicBlogArticle[];
  title?: string;
  limit?: number;
  compact?: boolean;
}) {
  const items = articles.slice(0, limit);
  if (items.length === 0) return null;

  return (
    <div>
      <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {title}
      </h2>
      <ul className="mt-3 space-y-3">
        {items.map((a, i) => (
          <li key={a.id}>
            <KeepArticleCard article={a} index={i} compact={compact} />
          </li>
        ))}
      </ul>
    </div>
  );
}
