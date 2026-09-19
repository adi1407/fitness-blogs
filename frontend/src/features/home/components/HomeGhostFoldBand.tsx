"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import FoldText from "@/components/ui/fold-text";
import GhostFibers from "@/components/ui/ghost-fibers";

export function HomeGhostFoldBand() {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return (
    <section className="relative overflow-hidden bg-foreground py-24 text-center">
      {!reduceMotion ? (
        <div className="pointer-events-none absolute inset-0 opacity-40" aria-hidden>
          <GhostFibers
            className="h-full w-full"
            lineColor="#E5E5E5"
            glowColor="#FF9800"
            lightMode={false}
            speed={0.15}
            brightness={0.7}
            blueBoost={0}
            vignette={0.5}
          />
        </div>
      ) : (
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-foreground via-neutral-900 to-foreground"
          aria-hidden
        />
      )}

      <div className="relative z-10 fk-page">
        <h2 className="sr-only">Train with clarity</h2>
        <FoldText
          text="Train with clarity"
          splitBy="char"
          hinge="top"
          trigger="mount"
          duration={0.65}
          stagger={0.04}
          ease="power3.out"
          perspective={700}
          creaseShading={0.55}
          fontSize="clamp(2.4rem, 8vw, 5.5rem)"
          fontWeight={700}
          color="#FFFFFF"
        />
        <p className="mx-auto mt-6 max-w-xl text-sm text-white/70 sm:text-base">
          From protein questions to exercise technique — every page should push
          you toward the next useful action.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/muscle-building"
            className="fk-btn-accent rounded-full px-6 py-3"
          >
            Muscle building guides
          </Link>
          <Link
            href="/foods/indian"
            className="inline-flex rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:border-accent hover:text-accent"
          >
            Indian high-protein foods
          </Link>
          <Link
            href="/exercises"
            className="inline-flex rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:border-accent hover:text-accent"
          >
            Exercise library
          </Link>
        </div>
      </div>
    </section>
  );
}
