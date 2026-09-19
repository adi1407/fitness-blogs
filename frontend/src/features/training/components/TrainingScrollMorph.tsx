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
        Scroll inside the frame to morph the image cluster from a circle into an
        open arc.
      </p>
      <div className="mx-auto mt-6 h-[480px] w-full overflow-hidden rounded-2xl border border-border bg-muted/40 sm:h-[640px]">
        <ScrollMorphHero />
      </div>
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
