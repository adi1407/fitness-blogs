"use client";

import { useCallback, useEffect, useId, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type SlideshowSlide = {
  img: string;
  text: string[];
};

const DEFAULT_SLIDES: SlideshowSlide[] = [
  {
    img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1600&auto=format&fit=crop",
    text: ["BETWEEN SHADOW", "AND LIGHT"],
  },
  {
    img: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1600&auto=format&fit=crop",
    text: ["SILENCE SPEAKS", "THROUGH FORM"],
  },
  {
    img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1600&auto=format&fit=crop",
    text: ["ESSENCE BEYOND", "PERCEPTION"],
  },
  {
    img: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1600&auto=format&fit=crop",
    text: ["TRUTH IN", "EMPTINESS"],
  },
  {
    img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1600&auto=format&fit=crop",
    text: ["SURRENDER TO", "THE VOID"],
  },
];

export type SlideshowProps = {
  slides?: SlideshowSlide[];
  className?: string;
  /** Accessible name for the carousel region. */
  label?: string;
};

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

export default function Slideshow({
  slides = DEFAULT_SLIDES,
  className,
  label = "Editorial slideshow",
}: SlideshowProps) {
  const [current, setCurrent] = useState(0);
  const id = useId();
  const total = slides.length;

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prevSlide();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        nextSlide();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [nextSlide, prevSlide]);

  if (total === 0) return null;

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      aria-labelledby={`slideshow-heading-${id}`}
      tabIndex={0}
      className={cn(
        "relative w-full overflow-hidden rounded-2xl border border-border bg-[#0A0A0A] outline-none focus-visible:ring-2 focus-visible:ring-[#FF9800] focus-visible:ring-offset-2",
        "h-[min(70dvh,560px)] min-h-[280px] sm:h-[min(68dvh,620px)] md:h-[640px]",
        className,
      )}
    >
      <span id={`slideshow-heading-${id}`} className="sr-only">
        {label}
      </span>

      {slides.map((slide, i) => {
        const active = i === current;
        return (
          <div
            key={`${slide.img}-${i}`}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${total}`}
            aria-hidden={!active}
            className={cn(
              "absolute inset-0 transition-opacity duration-700 ease-out",
              active ? "z-10 opacity-100" : "z-0 opacity-0 pointer-events-none",
            )}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={slide.img}
              alt=""
              draggable={false}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/45" />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
            <div className="relative z-10 flex h-full flex-col items-center justify-center px-14 text-center sm:px-20">
              <p className="space-y-1 font-semibold tracking-[0.12em] text-white uppercase sm:tracking-[0.16em]">
                {slide.text.map((line) => (
                  <span
                    key={line}
                    className="block text-xl leading-tight sm:text-3xl md:text-4xl lg:text-5xl"
                  >
                    {line}
                  </span>
                ))}
              </p>
            </div>
          </div>
        );
      })}

      <button
        type="button"
        aria-label="Previous slide"
        onClick={prevSlide}
        className="absolute top-1/2 left-2 z-20 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/60 sm:left-4 sm:size-12"
      >
        <ChevronLeft className="size-5" />
      </button>
      <button
        type="button"
        aria-label="Next slide"
        onClick={nextSlide}
        className="absolute top-1/2 right-2 z-20 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/60 sm:right-4 sm:size-12"
      >
        <ChevronRight className="size-5" />
      </button>

      <div
        className="absolute right-4 bottom-4 z-20 rounded-full bg-black/50 px-3 py-1.5 font-mono text-xs tracking-wide text-white/90 backdrop-blur-sm sm:right-6 sm:bottom-6 sm:text-sm"
        aria-live="polite"
      >
        {pad2(current + 1)} / {pad2(total)}
      </div>
    </div>
  );
}
