"use client";

import type { ReactNode } from "react";
import { ArticleEngagement } from "@/features/blog/components/ArticleEngagement";

export function ArticleBookmarkSlot({
  articleId,
  className = "",
}: {
  articleId?: string;
  className?: string;
}) {
  if (!articleId) return null;
  return (
    <ArticleEngagement
      articleId={articleId}
      className={className}
      compact
    />
  );
}

/** @deprecated Use ArticleEngagement — kept for compatibility. */
export function ArticleReactSlot({
  articleId,
  className = "",
}: {
  articleId?: string;
  className?: string;
}) {
  if (!articleId) return null;
  return (
    <ArticleEngagement
      articleId={articleId}
      className={className}
      compact
    />
  );
}

export function ArticleActionsRow({
  share,
  articleId,
  className = "",
}: {
  share: ReactNode;
  articleId: string;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-wrap items-center gap-2 ${className}`}
      data-slot="article-actions"
    >
      {share}
      <ArticleEngagement articleId={articleId} />
    </div>
  );
}
