"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";

export interface SlideData {
  title: string;
  button: string;
  src: string;
  /** Optional destination — used by home news hero. */
  href?: string;
}

interface CarouselProps {
  slides: SlideData[];
}

export default function Carousel({ slides }: CarouselProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const id = useId();

  const scrollToIndex = useCallback(
    (index: number, behavior: ScrollBehavior = "smooth") => {
      const el = scrollerRef.current;
      if (!el || slides.length === 0) return;
      const next = ((index % slides.length) + slides.length) % slides.length;
      el.scrollTo({ left: next * el.clientWidth, behavior });
      setCurrent(next);
    },
    [slides.length],
  );

  const syncFromScroll = useCallback(() => {
    const el = scrollerRef.current;
    if (!el || el.clientWidth === 0) return;
    const index = Math.round(el.scrollLeft / el.clientWidth);
    const clamped = Math.min(Math.max(index, 0), slides.length - 1);
    setCurrent(clamped);
  }, [slides.length]);

  useEffect(() => {
    const onResize = () => scrollToIndex(current, "auto");
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [current, scrollToIndex]);

  if (slides.length === 0) return null;

  return (
    <div
      className="relative w-full"
      aria-labelledby={`carousel-heading-${id}`}
      aria-roledescription="carousel"
    >
      <div className="relative">
        <div
          ref={scrollerRef}
          onScroll={syncFromScroll}
          className="flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain scroll-smooth rounded-2xl border border-border bg-muted scrollbar-none"
          style={{ WebkitOverflowScrolling: "touch" }}
          tabIndex={0}
          role="region"
          aria-label="Staples carousel"
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") {
              e.preventDefault();
              scrollToIndex(current - 1);
            } else if (e.key === "ArrowRight") {
              e.preventDefault();
              scrollToIndex(current + 1);
            }
          }}
        >
          {slides.map((slide, index) => (
            <article
              key={`${slide.title}-${index}`}
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${slides.length}: ${slide.title}`}
              aria-hidden={index !== current}
              className="relative h-[min(58dvh,400px)] min-h-[260px] w-full shrink-0 grow-0 basis-full snap-center sm:h-[min(52dvh,460px)] md:h-[480px] lg:h-[520px]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={slide.src}
                alt=""
                draggable={false}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/35" />
              <div className="relative z-10 flex h-full flex-col items-center justify-center px-12 text-center text-white sm:px-16">
                <h3 className="max-w-lg text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
                  {slide.title}
                </h3>
                {slide.href ? (
                  <Link
                    href={slide.href}
                    className="mt-5 inline-flex min-h-11 items-center justify-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-foreground shadow-sm transition hover:bg-[#FF9800] hover:text-foreground"
                  >
                    {slide.button}
                  </Link>
                ) : (
                  <span className="mt-5 inline-flex min-h-11 items-center justify-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-foreground shadow-sm">
                    {slide.button}
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>

        {slides.length > 1 ? (
          <>
            <button
              type="button"
              title="Previous slide"
              aria-label="Previous slide"
              onClick={() => scrollToIndex(current - 1)}
              className="absolute top-1/2 left-2 z-20 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-white/95 text-foreground shadow-sm transition hover:bg-white sm:left-3"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              title="Next slide"
              aria-label="Next slide"
              onClick={() => scrollToIndex(current + 1)}
              className="absolute top-1/2 right-2 z-20 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-white/95 text-foreground shadow-sm transition hover:bg-white sm:right-3"
            >
              <ChevronRight className="size-5" />
            </button>
          </>
        ) : null}
      </div>

      {slides.length > 1 ? (
        <div className="mt-4 flex justify-center gap-2" role="tablist" aria-label="Slides">
          {slides.map((slide, index) => (
            <button
              key={`${slide.title}-dot-${index}`}
              type="button"
              role="tab"
              aria-selected={index === current}
              aria-label={`Go to ${slide.title}`}
              onClick={() => scrollToIndex(index)}
              className={`h-2 rounded-full transition-all ${
                index === current
                  ? "w-8 bg-foreground"
                  : "w-2 bg-foreground/25 hover:bg-foreground/50"
              }`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
