"use client";

import type { PublicBlogArticle } from "@/lib/api/blog";
import { ArticleRelatedGrid } from "@/features/blog/components/ArticleRelatedGrid";

/** @deprecated Prefer ArticleRelatedGrid — kept for keep barrel exports. */
export function KeepRelatedMidStrip({
  articles,
}: {
  articles: PublicBlogArticle[];
}) {
  return (
    <ArticleRelatedGrid
      articles={articles.slice(0, 5)}
      title="More in this cluster"
      accentRail
    />
  );
}
