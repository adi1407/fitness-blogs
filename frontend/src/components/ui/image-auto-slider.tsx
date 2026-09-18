"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const DEFAULT_IMAGES = [
  "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?q=80&w=800&auto=format&fit=crop",
];

export type ImageAutoSliderItem = {
  src: string;
  alt?: string;
  href?: string;
};

export type ImageAutoSliderProps = {
  /** Simple image URL list (duplicated for seamless loop). */
  images?: string[];
  /** Richer items with optional link targets. */
  items?: ImageAutoSliderItem[];
  className?: string;
  /** Animation duration in seconds (default 20). */
  durationSec?: number;
};

/**
 * Infinite horizontal image marquee for hero / gallery bands.
 */
export function ImageAutoSlider({
  images,
  items,
  className,
  durationSec = 20,
}: ImageAutoSliderProps) {
  const resolved: ImageAutoSliderItem[] =
    items && items.length > 0
      ? items
      : (images?.length ? images : DEFAULT_IMAGES).map((src, i) => ({
          src,
          alt: `Gallery image ${i + 1}`,
        }));

  const duplicated = [...resolved, ...resolved];
  const style = {
    "--ias-duration": `${durationSec}s`,
  } as CSSProperties;

  return (
    <div
      className={cn(
        "relative flex w-full items-center justify-center overflow-hidden bg-[#0B2533]",
        className,
      )}
      style={style}
    >
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-[#0B2533] via-[#0B2533]/90 to-[#0B2533]" />

      <div className="relative z-10 flex w-full items-center justify-center py-8 sm:py-10">
        <div
          className="w-full max-w-6xl"
          style={{
            maskImage:
              "linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%)",
          }}
        >
          <div className="ias-infinite-scroll flex w-max gap-6">
            {duplicated.map((item, index) => {
              const media = (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.src}
                  alt={
                    item.alt ??
                    `Gallery image ${(index % resolved.length) + 1}`
                  }
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              );

              const shellClass =
                "flex-shrink-0 h-48 w-48 overflow-hidden rounded-xl shadow-2xl transition duration-300 ease-out hover:scale-105 hover:brightness-110 md:h-64 md:w-64 lg:h-72 lg:w-72";

              if (item.href) {
                return (
                  <Link
                    key={`${item.src}-${index}`}
                    href={item.href}
                    className={shellClass}
                  >
                    {media}
                  </Link>
                );
              }

              return (
                <div key={`${item.src}-${index}`} className={shellClass}>
                  {media}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 h-20 bg-gradient-to-t from-[#0B2533] to-transparent" />
    </div>
  );
}

/** Alias matching the 21st.dev export name. */
export const Component = ImageAutoSlider;
