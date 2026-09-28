"use client";

import Link from "next/link";
import ScrollMorphHero from "@/components/ui/scroll-morph-hero";

/** Interactive scroll morph — images resolve from a line into a circle/arc. */
export function TrainingScrollMorph() {
  return (
    <section className="mt-10">
      <h2 className="text-2xl font-semibold tracking-tight">
        Visual training arc
      </h2>
      <p className="mt-2 max-w-xl text-muted-foreground">
        Keep scrolling — the image cluster gathers into a circle, then opens
        into an arc.
      </p>
      <ScrollMorphHero className="mt-6" />
      <p className="mt-4 text-sm text-muted-foreground">
        Continue in the{" "}
        <Link href="/exercises" className="font-semibold text-primary hover:underline">
          exercise library
        </Link>{" "}
        or{" "}
        <Link href="/programs" className="font-semibold text-primary hover:underline">
          programs hub
        </Link>
        .
      </p>
    </section>
  );
}
