"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { PublicBlogArticle } from "@/lib/api/blog";
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
        article: a,
        href,
        src: articleImage(a),
      };
    })
    .filter((s): s is NonNullable<typeof s> => Boolean(s))
    .slice(0, 5);

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (slides.length <= 1 || paused) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 5500);
    return () => window.clearInterval(id);
  }, [slides.length, paused]);

  if (slides.length === 0) return null;

  const current = slides[index] ?? slides[0];
  const { article, href, src } = current;

  function go(delta: number) {
    setIndex((i) => (i + delta + slides.length) % slides.length);
  }

  return (
    <section
      className="relative overflow-hidden bg-[#0B2533]"
      aria-label="Featured stories"
      aria-roledescription="carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative aspect-[16/10] w-full sm:aspect-[21/9] lg:aspect-[2.4/1]">
        {slides.map((slide, i) => (
          <div
            key={slide.article.id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              i === index ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
            aria-hidden={i !== index}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={slide.src}
              alt=""
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/15" />
          </div>
        ))}

        <div className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-8 lg:p-10">
          <div className="mx-auto max-w-7xl">
            {article.categoryLabel ? (
              <span className="inline-flex rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">
                {article.categoryLabel}
              </span>
            ) : null}
            <h2 className="mt-3 max-w-3xl text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-4xl">
              <Link href={href} className="hover:underline">
                {article.title}
              </Link>
            </h2>
            {article.excerpt ? (
              <p className="mt-2 max-w-2xl text-sm text-white/85 line-clamp-2 sm:text-base">
                {article.excerpt}
              </p>
            ) : null}
            <Link
              href={href}
              className="mt-4 inline-flex rounded-full bg-[#FF9800] px-4 py-2 text-sm font-semibold text-white hover:bg-[#FFA726]"
            >
              Read article →
            </Link>
          </div>
        </div>

        {slides.length > 1 ? (
          <>
            <button
              type="button"
              aria-label="Previous story"
              onClick={() => go(-1)}
              className="absolute left-3 top-1/2 z-20 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm hover:bg-black/60 sm:left-5"
            >
              ‹
            </button>
            <button
              type="button"
              aria-label="Next story"
              onClick={() => go(1)}
              className="absolute right-3 top-1/2 z-20 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm hover:bg-black/60 sm:right-5"
            >
              ›
            </button>
            <div className="absolute bottom-4 right-4 z-20 flex gap-2 sm:bottom-6 sm:right-8">
              {slides.map((slide, i) => (
                <button
                  key={slide.article.id}
                  type="button"
                  aria-label={`Show story ${i + 1}`}
                  aria-current={i === index}
                  onClick={() => setIndex(i)}
                  className={`h-2.5 w-2.5 rounded-full transition ${
                    i === index
                      ? "scale-110 bg-[#FF9800]"
                      : "bg-white/50 hover:bg-white/80"
                  }`}
                />
              ))}
            </div>
          </>
        ) : null}
      </div>
    </section>
  );
}
