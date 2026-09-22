"use client";

import Link from "next/link";
import ScrollMorphHero from "@/components/ui/scroll-morph-hero";

/** Scroll-to-resolve image morph — hover the frame and scroll to fan images out. */
export function HomeScrollMorphBand() {
  return (
    <section className="border-b border-border bg-white py-12 sm:py-16">
      <div className="fk-page">
        <p className="fk-meta text-muted-foreground">Scroll to explore</p>
        <h2 className="mt-2 max-w-2xl text-2xl font-semibold tracking-tight sm:text-3xl">
          Watch the cluster resolve
        </h2>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground sm:text-base">
          Images start in a line, then resolve into a circle. Scroll inside the
          frame to open the arc — same interaction as the training hub.
        </p>
        <div className="relative mx-auto mt-8 h-[min(70dvh,460px)] min-h-[360px] w-full overflow-hidden rounded-2xl border border-border bg-muted/30 sm:h-[500px] md:h-[560px] lg:h-[620px]">
          <ScrollMorphHero />
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          Prefer the full training context?{" "}
          <Link
            href="/training"
            className="font-semibold text-primary hover:underline"
          >
            Open training guides
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
