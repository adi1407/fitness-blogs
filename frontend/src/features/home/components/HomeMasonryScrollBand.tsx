"use client";

import Link from "next/link";
import { MasonryGrid } from "@/components/ui/masonry-grid-with-scroll-animation";
import { LEARN_ARTICLES } from "@/features/learn/data/learnArticles";

/** Masonry cards that fly in from away as you scroll (view-timeline when supported). */
export function HomeMasonryScrollBand() {
  const items = LEARN_ARTICLES.slice(0, 9);

  return (
    <section className="border-b border-border bg-white py-12 sm:py-16">
      <div className="fk-page">
        <p className="fk-meta text-muted-foreground">On scroll</p>
        <h2 className="mt-2 max-w-2xl text-2xl font-semibold tracking-tight sm:text-3xl">
          Guides that slide into view
        </h2>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground sm:text-base">
          Scroll the page — cards ease in from the sides. Open any card for the
          full guide cluster.
        </p>
        <div className="mt-8">
          <MasonryGrid items={items} size="large" className="px-0" />
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          See the full filterable grid on{" "}
          <Link href="/blog" className="font-semibold text-primary hover:underline">
            Blog
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
