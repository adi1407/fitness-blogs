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

/** Scroll-driven circular gallery of recent articles (below category sections). */
export function HomeCircularGalleryBand({
  articles,
}: HomeCircularGalleryBandProps) {
  const items = useMemo(() => toGalleryItems(articles), [articles]);
  const [radius, setRadius] = useState(420);

  useEffect(() => {
    const sync = () => {
      const w = window.innerWidth;
      if (w < 480) setRadius(260);
      else if (w < 768) setRadius(340);
      else setRadius(460);
    };
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  if (items.length < 4) return null;

  return (
    <section
      className="relative w-full border-t border-border bg-brand-50/20"
      style={{ height: "240vh" }}
      aria-label="Circular article gallery"
    >
      <div className="sticky top-[6.75rem] flex h-[calc(100svh-6.75rem)] w-full flex-col items-center justify-center overflow-hidden">
        <div className="absolute top-6 z-10 px-4 text-center">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Rotate through the library
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Scroll to spin — then browse full stories in Latest.
          </p>
          <Link
            href="/blog"
            className="mt-3 inline-flex text-sm font-semibold text-primary hover:underline"
          >
            View all articles →
          </Link>
        </div>
        <div className="h-full w-full max-w-5xl">
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
