"use client";

import Link from "next/link";
import ScrollMorphHero from "@/components/ui/scroll-morph-hero";

/** Scroll-linked image morph — the frame pins while the page scrolls past. */
export function HomeScrollMorphBand() {
  return (
    <section className="border-b border-border bg-white py-12 sm:py-16">
      <div className="fk-page">
        <p className="fk-meta text-muted-foreground">Scroll to explore</p>
        <h2 className="mt-2 max-w-2xl text-2xl font-semibold tracking-tight sm:text-3xl">
          Watch the cluster resolve
        </h2>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground sm:text-base">
          Keep scrolling — the images gather into a circle, then open into an
          arc across our nutrition, training, and food guides.
        </p>
        <ScrollMorphHero className="mt-8" />
        <p className="mt-6 text-sm text-muted-foreground">
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
