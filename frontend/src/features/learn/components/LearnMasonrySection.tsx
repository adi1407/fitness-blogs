"use client";

import { useMemo, useState } from "react";
import { MasonryGrid } from "@/components/ui/masonry-grid-with-scroll-animation";
import {
  LEARN_CATEGORIES,
  filterLearnArticles,
  type LearnCategory,
} from "@/features/learn/data/learnArticles";

export function LearnMasonrySection() {
  const [category, setCategory] = useState<LearnCategory>("all");

  const items = useMemo(
    () => filterLearnArticles(category),
    [category],
  );

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
        .
      </p>

      <div className="mt-6">
        <MasonryGrid items={items} size="large" className="px-0" />
      </div>
    </section>
  );
}
