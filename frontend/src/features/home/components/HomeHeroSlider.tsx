"use client";

import Link from "next/link";
import type { PublicBlogArticle } from "@/lib/api/blog";
import { ImageAutoSlider } from "@/components/ui/image-auto-slider";
import { articleHref, articleImage } from "@/features/home/utils/articleMedia";

type HomeHeroSliderProps = {
  articles: PublicBlogArticle[];
};

export function HomeHeroSlider({ articles }: HomeHeroSliderProps) {
  const slides = articles
    .map((a) => {
      const href = articleHref(a);
      if (!href) return null;
      return {
        src: articleImage(a),
        alt: a.title,
        href,
        title: a.title,
        categoryLabel: a.categoryLabel,
        excerpt: a.excerpt,
      };
    })
    .filter((s): s is NonNullable<typeof s> => Boolean(s))
    .slice(0, 5);

  // Ensure a full marquee even with few articles
  const items =
    slides.length > 0
      ? slides.length >= 4
        ? slides
        : [...slides, ...slides, ...slides].slice(0, 8)
      : undefined;

  const featured = slides[0];

  return (
    <section
      className="relative overflow-hidden"
      aria-label="Featured stories"
    >
      <ImageAutoSlider
        items={items}
        durationSec={22}
        className="min-h-[280px] sm:min-h-[340px] lg:min-h-[400px]"
      />

      {featured ? (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 bg-gradient-to-t from-[#0B2533] via-[#0B2533]/70 to-transparent px-4 pb-8 pt-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            {featured.categoryLabel ? (
              <span className="inline-flex rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">
                {featured.categoryLabel}
              </span>
            ) : null}
            <h2 className="mt-3 max-w-3xl text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-4xl">
              <Link
                href={featured.href}
                className="pointer-events-auto hover:underline"
              >
                {featured.title}
              </Link>
            </h2>
            {featured.excerpt ? (
              <p className="mt-2 max-w-2xl text-sm text-white/85 line-clamp-2 sm:text-base">
                {featured.excerpt}
              </p>
            ) : null}
          </div>
        </div>
      ) : null}
    </section>
  );
}
