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
    .map((a) => ({ article: a, href: articleHref(a) }))
    .filter((s): s is { article: PublicBlogArticle; href: string } =>
      Boolean(s.href),
    )
    .slice(0, 5);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 5500);
    return () => window.clearInterval(id);
  }, [slides.length]);

  if (slides.length === 0) return null;

  const current = slides[index] ?? slides[0];
  const { article, href } = current;

  return (
    <section className="relative overflow-hidden bg-foreground" aria-label="Featured stories">
      <div className="relative aspect-[16/10] w-full sm:aspect-[21/9] lg:aspect-[2.4/1]">
        {slides.map((slide, i) => (
          <Link
            key={slide.article.id}
            href={slide.href}
            className={`absolute inset-0 transition-opacity duration-700 ${
              i === index ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
            aria-hidden={i !== index}
            tabIndex={i === index ? 0 : -1}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={articleImage(slide.article)}
              alt=""
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/10" />
          </Link>
        ))}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 p-5 sm:p-8 lg:p-10">
          <div className="mx-auto max-w-7xl">
            {article.categoryLabel ? (
              <span className="inline-flex rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">
                {article.categoryLabel}
              </span>
            ) : null}
            <h2 className="mt-3 max-w-3xl text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-4xl">
              <Link href={href} className="pointer-events-auto hover:underline">
                {article.title}
              </Link>
            </h2>
            {article.excerpt ? (
              <p className="mt-2 max-w-2xl text-sm text-white/85 line-clamp-2 sm:text-base">
                {article.excerpt}
              </p>
            ) : null}
          </div>
        </div>
      </div>

      {slides.length > 1 ? (
        <div className="absolute bottom-4 right-4 z-20 flex gap-2 sm:bottom-6 sm:right-8">
          {slides.map((slide, i) => (
            <button
              key={slide.article.id}
              type="button"
              aria-label={`Show slide ${i + 1}`}
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
      ) : null}
    </section>
  );
}
