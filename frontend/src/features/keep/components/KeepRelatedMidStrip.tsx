"use client";

import type { PublicBlogArticle } from "@/lib/api/blog";
import { KeepArticleCard } from "@/features/keep/components/KeepArticleCard";

/** Horizontal mid-article strip of 2 related keep cards. */
export function KeepRelatedMidStrip({
  articles,
}: {
  articles: PublicBlogArticle[];
}) {
  const items = articles.slice(0, 2);
  if (items.length === 0) return null;

  return (
    <aside className="my-10 rounded-2xl border border-border border-l-4 border-l-orange-400 bg-orange-50/40 px-4 py-5 sm:px-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-orange-400">
        More in this cluster
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {items.map((a, i) => (
          <KeepArticleCard key={a.id} article={a} index={i} compact />
        ))}
      </div>
    </aside>
  );
}
