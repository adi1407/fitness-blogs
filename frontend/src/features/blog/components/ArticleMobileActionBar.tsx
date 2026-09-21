"use client";

import {
  ArticleBookmarkSlot,
  ArticleReactSlot,
} from "@/features/blog/components/ArticleActionSlots";

/** Sticky bottom engagement bar — mobile / tablet only (share is the FAB). */
export function ArticleMobileActionBar({
  title: _title,
  url: _url,
}: {
  title: string;
  url: string;
}) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-white/95 px-3 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] backdrop-blur-md lg:hidden">
      <div className="mx-auto flex max-w-3xl items-center justify-end gap-2">
        <ArticleBookmarkSlot />
        <ArticleReactSlot />
      </div>
    </div>
  );
}
