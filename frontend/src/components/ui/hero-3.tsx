import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

export type MarqueeImage = { src: string; alt: string };

export interface AnimatedMarqueeHeroProps {
  tagline: string;
  title: ReactNode;
  description: string;
  cta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  links?: { label: string; href: string }[];
  images: MarqueeImage[];
  className?: string;
}

// CSS-only entrance so the headline is visible in the server HTML (LCP/SEO)
// and needs no client JS; `motion-reduce` disables it.
const fadeUp = "motion-safe:animate-[fadeInUp_0.7s_cubic-bezier(0.22,1,0.36,1)_both]";
const delay = (ms: number): CSSProperties => ({ animationDelay: `${ms}ms` });

/**
 * Hero with staggered headline and an endlessly drifting photo strip.
 * The strip renders the image set twice and slides by exactly half its width,
 * so every card carries its own trailing space (no flex `gap`) to keep the
 * loop seamless.
 */
export function AnimatedMarqueeHero({
  tagline,
  title,
  description,
  cta,
  secondaryCta,
  links,
  images,
  className,
}: AnimatedMarqueeHeroProps) {
  const words = typeof title === "string" ? title.split(" ") : null;
  const afterTitle = 120 + (words?.length ?? 1) * 70;

  return (
    <section
      className={cn(
        "relative flex min-h-[calc(100svh-var(--site-header-height))] w-full flex-col overflow-hidden bg-background",
        className,
      )}
    >
      <div className="fk-page flex flex-1 flex-col items-center justify-center py-[clamp(1.25rem,4svh,3.5rem)] text-center">
        <p
          className={cn(
            "mb-[clamp(0.75rem,2.5svh,1.25rem)] inline-flex items-center rounded-full border border-border bg-white/70 px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-sm sm:text-sm",
            fadeUp,
          )}
        >
          {tagline}
        </p>

        <h1 className="max-w-5xl text-[clamp(2.125rem,min(10.5vw,7.5svh),4.75rem)] leading-[1.05] font-bold tracking-tighter text-balance text-foreground">
          {words
            ? words.map((word, i) => (
                <span
                  key={`${word}-${i}`}
                  className={cn("inline-block", fadeUp)}
                  style={delay(80 + i * 70)}
                >
                  {word}
                  {i < words.length - 1 ? "\u00A0" : null}
                </span>
              ))
            : <span className={cn("inline-block", fadeUp)} style={delay(80)}>{title}</span>}
        </h1>

        <p
          className={cn(
            "mt-[clamp(0.75rem,2.5svh,1.5rem)] max-w-xl text-[15px] leading-relaxed text-muted-foreground sm:text-lg",
            fadeUp,
          )}
          style={delay(afterTitle)}
        >
          {description}
        </p>

        <div
          className={cn(
            "mt-[clamp(1rem,3.5svh,2rem)] flex w-full max-w-sm items-center justify-center gap-2.5 sm:w-auto sm:max-w-none sm:gap-3",
            fadeUp,
          )}
          style={delay(afterTitle + 100)}
        >
          <Link
            href={cta.href}
            className="group inline-flex h-11 flex-1 items-center justify-center gap-1.5 rounded-full bg-[#0A0A0A] px-4 text-sm font-semibold whitespace-nowrap text-white shadow-lg shadow-black/10 transition-transform duration-200 hover:scale-[1.03] focus-visible:ring-2 focus-visible:ring-[#FF9800] focus-visible:ring-offset-2 focus-visible:outline-none active:scale-[0.98] sm:h-12 sm:flex-none sm:gap-2 sm:px-7 sm:text-base"
          >
            {cta.label}
            <ArrowRight
              className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
              aria-hidden
            />
          </Link>
          {secondaryCta ? (
            <Link
              href={secondaryCta.href}
              className="inline-flex h-11 flex-1 items-center justify-center rounded-full border border-border bg-white px-4 text-sm font-semibold whitespace-nowrap text-foreground transition-colors duration-200 hover:border-[#FF9800] focus-visible:ring-2 focus-visible:ring-[#FF9800] focus-visible:ring-offset-2 focus-visible:outline-none sm:h-12 sm:flex-none sm:px-7 sm:text-base"
            >
              {secondaryCta.label}
            </Link>
          ) : null}
        </div>

        {links?.length ? (
          <nav
            aria-label="Main topics"
            className={cn("mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2", fadeUp)}
            style={delay(afterTitle + 200)}
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        ) : null}
      </div>

      <div
        className="relative w-full shrink-0 overflow-hidden pb-[clamp(0.75rem,3svh,2.5rem)] [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
      >
        <div
          className="animate-scroll-horizontal-reverse flex w-max py-4"
          style={{ "--scroll-duration": "70s" } as CSSProperties}
        >
          {[0, 1].map((copy) =>
            images.map((image, i) => (
              <div
                key={`${copy}-${image.src}`}
                className="shrink-0 pr-3 sm:pr-4"
                aria-hidden={copy === 1 || undefined}
              >
                <div
                  className="relative aspect-[3/4] h-[clamp(7.5rem,22svh,16rem)] overflow-hidden rounded-2xl bg-neutral-200 shadow-md ring-1 ring-black/5"
                  style={{ rotate: i % 2 === 0 ? "-2deg" : "4deg" }}
                >
                  <Image
                    src={image.src}
                    alt={copy === 0 ? image.alt : ""}
                    fill
                    sizes="192px"
                    className="object-cover"
                    draggable={false}
                  />
                </div>
              </div>
            )),
          )}
        </div>
      </div>
    </section>
  );
}
