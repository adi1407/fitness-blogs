"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  CircularGallery,
  type GalleryItem,
} from "@/components/ui/circular-gallery";
import type { PublicBlogArticle } from "@/lib/api/blog";
import { articleHref, articleImage } from "@/features/home/utils/articleMedia";

type HomeCircularGalleryBandProps = {
  articles: PublicBlogArticle[];
};

function toGalleryItems(articles: PublicBlogArticle[]): GalleryItem[] {
  const items: GalleryItem[] = [];
  for (const a of articles) {
    if (!articleHref(a)) continue;
    items.push({
      common: a.title,
      binomial: a.categoryLabel ?? "FitKnowledge",
      photo: {
        url: articleImage(a),
        text: a.featuredImageAlt || a.title,
        by: a.authorName ?? "FitKnowledge",
      },
    });
    if (items.length >= 10) break;
  }
  return items;
}

function mobileScrollHeight(): string {
  if (typeof window === "undefined") return "180svh";
  return window.innerWidth < 768 ? "170svh" : "220svh";
}

/** Scroll-driven circular gallery of recent articles (below category sections). */
export function HomeCircularGalleryBand({
  articles,
}: HomeCircularGalleryBandProps) {
  const items = useMemo(() => toGalleryItems(articles), [articles]);
  const [radius, setRadius] = useState(240);
  const [scrollH, setScrollH] = useState("180svh");

  useEffect(() => {
    const sync = () => {
      const w = window.innerWidth;
      if (w < 480) setRadius(200);
      else if (w < 768) setRadius(260);
      else if (w < 1024) setRadius(360);
      else setRadius(440);
      setScrollH(mobileScrollHeight());
    };
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  if (items.length < 4) return null;

  return (
    <section
      className="relative w-full border-t border-border bg-brand-50/20"
      style={{ height: scrollH }}
      aria-label="Circular article gallery"
    >
      <div className="sticky top-[var(--site-header-height)] flex h-[calc(100svh-var(--site-header-height))] w-full flex-col overflow-hidden">
        <div className="z-10 shrink-0 px-4 pb-2 pt-4 text-center sm:pt-6">
          <h2 className="text-xl font-semibold tracking-tight sm:text-3xl">
            Rotate through the library
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Scroll to spin — then browse full stories in Latest.
          </p>
          <Link
            href="/blog"
            className="mt-2 inline-flex text-sm font-semibold text-primary hover:underline"
          >
            View all articles →
          </Link>
        </div>
        <div className="min-h-0 w-full flex-1">
          <CircularGallery
            items={items}
            radius={radius}
            autoRotateSpeed={0.025}
          />
        </div>
      </div>
    </section>
  );
}
