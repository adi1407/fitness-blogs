"use client";

import { ArticleEngagement } from "@/features/blog/components/ArticleEngagement";

/** Sticky bottom engagement bar — mobile / tablet only (share is the FAB). */
export function ArticleMobileActionBar({
  articleId,
}: {
  title?: string;
  url?: string;
  articleId: string;
}) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-white/95 px-3 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] backdrop-blur-md lg:hidden">
      <div className="mx-auto flex max-w-3xl items-center justify-center sm:justify-end">
        <ArticleEngagement articleId={articleId} compact />
      </div>
    </div>
  );
}
