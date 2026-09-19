"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { PublicBlogArticle } from "@/lib/api/blog";
import { articleHref } from "@/features/home/utils/articleMedia";
import { KeepAtmosphere } from "@/features/keep/components/KeepAtmosphere";
import { KeepMasonry } from "@/features/keep/components/KeepMasonry";
import { trackEvent } from "@/lib/analytics/openpanel";
import { BLOG_TAXONOMY } from "@/lib/blogTaxonomy";
import { getApiBase } from "@/lib/api/client";

type Props = {
  articles: PublicBlogArticle[];
};

type FilterId = "all" | string;

const FILTERS: { id: FilterId; label: string }[] = [
  { id: "all", label: "All" },
  ...BLOG_TAXONOMY.map((c) => ({ id: c.slug, label: c.label })),
];

/** Primary home: Karakeep-inspired bookmark masonry. */
export function HomeKnowledgeKeepBand({ articles }: Props) {
  const apiIsLocalhost = getApiBase().includes("localhost");
  const [filter, setFilter] = useState<FilterId>("all");

  const linkable = useMemo(
    () => articles.filter((a) => Boolean(articleHref(a))),
    [articles],
  );

  const items = useMemo(() => {
    if (filter === "all") return linkable;
    return linkable.filter((a) => a.categorySlug === filter);
  }, [linkable, filter]);

  return (
    <KeepAtmosphere className="min-h-[calc(100svh-var(--site-header-height))]">
      <div className="fk-page pb-16 pt-8 sm:pt-10">
        <header className="max-w-xl">
          <h1 className="font-sans text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            FitKnowledge
          </h1>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            Guides worth opening — browse like a keep.
          </p>
        </header>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          {FILTERS.map((f) => {
            const active = filter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                className={active ? "fk-filter-active" : "fk-filter"}
              >
                {f.label}
              </button>
            );
          })}
          <Link
            href="/blog"
            className="fk-link ml-auto text-xs sm:text-sm"
            onClick={() =>
              trackEvent("hub_click", {
                href: "/blog",
                label: "Keep view all",
              })
            }
          >
            Full library →
          </Link>
        </div>

        {linkable.length === 0 ? (
          <div className="mt-12 rounded-2xl border border-dashed border-border bg-muted/40 px-6 py-16 text-center">
            <p className="text-lg font-semibold text-foreground">
              Nothing in the keep yet
            </p>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
              Published guides will show up here as bookmark cards. Meanwhile,
              try a calculator or browse tools.
            </p>
            {apiIsLocalhost ? (
              <p className="mt-4 text-sm text-destructive">
                API is pointed at localhost. Set{" "}
                <code className="font-mono text-xs">API_URL</code> to your
                Render API and redeploy.
              </p>
            ) : null}
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link href="/tools" className="fk-btn-primary">
                Open tools
              </Link>
              <Link href="/blog" className="fk-btn-ghost">
                Browse blog
              </Link>
            </div>
          </div>
        ) : items.length === 0 ? (
          <p className="mt-12 text-center text-sm text-muted-foreground">
            No guides in this category yet. Try another filter.
          </p>
        ) : (
          <KeepMasonry articles={items} className="mt-6" />
        )}
      </div>
    </KeepAtmosphere>
  );
}
