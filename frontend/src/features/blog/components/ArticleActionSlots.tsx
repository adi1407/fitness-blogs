"use client";

import type { ReactNode } from "react";

/**
 * Reserved engagement mounts for Medium-like bookmark / react.
 * Real components drop in later without layout shift.
 */
export function ArticleBookmarkSlot({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      data-slot="article-bookmark"
      className={`inline-flex h-9 min-w-9 items-center justify-center rounded-full border border-dashed border-border bg-muted/40 px-3 text-[11px] font-medium text-muted-foreground ${className}`}
      aria-hidden
      title="Bookmark coming soon"
    >
      Save
    </div>
  );
}

export function ArticleReactSlot({ className = "" }: { className?: string }) {
  return (
    <div
      data-slot="article-react"
      className={`inline-flex h-9 min-w-9 items-center justify-center rounded-full border border-dashed border-border bg-muted/40 px-3 text-[11px] font-medium text-muted-foreground ${className}`}
      aria-hidden
      title="Reactions coming soon"
    >
      Like
    </div>
  );
}

export function ArticleActionsRow({
  share,
  className = "",
}: {
  share: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-wrap items-center gap-2 ${className}`}
      data-slot="article-actions"
    >
      {share}
      <ArticleBookmarkSlot />
      <ArticleReactSlot />
    </div>
  );
}
