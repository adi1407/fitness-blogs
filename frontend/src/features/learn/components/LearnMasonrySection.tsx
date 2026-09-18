"use client";

import { useMemo, useState } from "react";
import { MasonryGrid } from "@/components/ui/masonry-grid-with-scroll-animation";
import {
  LEARN_ARTICLES,
  LEARN_CATEGORIES,
  type LearnArticle,
  type LearnCategory,
} from "@/features/learn/data/learnArticles";

type Props = {
  /** CMS-published articles merged ahead of curated static teasers. */
  cmsArticles?: LearnArticle[];
};

export function LearnMasonrySection({ cmsArticles = [] }: Props) {
  const [category, setCategory] = useState<LearnCategory>("all");

  const items = useMemo(() => {
    const merged = [...cmsArticles, ...LEARN_ARTICLES];
    if (category === "all") return merged;
    return merged.filter((a) => a.category === category);
  }, [category, cmsArticles]);

  return (
    <section className="mt-10">
      <div
        className="flex flex-wrap gap-2"
        role="tablist"
        aria-label="Filter guides by category"
      >
        {LEARN_CATEGORIES.map((cat) => {
          const active = category === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setCategory(cat.id)}
              className={
                active
                  ? "rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white"
                  : "rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground hover:border-primary hover:bg-brand-50"
              }
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      <p className="mt-4 text-sm text-muted-foreground">
        Showing {items.length} guide{items.length === 1 ? "" : "s"}
        {category !== "all"
          ? ` in ${LEARN_CATEGORIES.find((c) => c.id === category)?.label}`
          : ""}
        {cmsArticles.length > 0
          ? ` · ${cmsArticles.length} from CMS`
          : ""}
        .
      </p>

      <div className="mt-6">
        <MasonryGrid items={items} size="large" className="px-0" />
      </div>
    </section>
  );
}
