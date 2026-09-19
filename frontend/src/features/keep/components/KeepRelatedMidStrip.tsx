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
    <aside className="my-10 rounded-2xl border border-sky-100 bg-sky-50/50 px-4 py-5 sm:px-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-sky-800">
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
