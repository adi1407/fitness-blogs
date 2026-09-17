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
    <section className="relative overflow-hidden bg-[#0b2533] py-24 text-center">
      {!reduceMotion ? (
        <div className="pointer-events-none absolute inset-0 opacity-55" aria-hidden>
          <GhostFibers
            className="h-full w-full"
            lineColor="#E1F5FE"
            glowColor="#29B6F6"
            lightMode={false}
            speed={0.15}
            brightness={0.85}
            blueBoost={1.2}
            vignette={0.45}
          />
        </div>
      ) : (
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0b2533] via-[#12344a] to-[#0b2533]"
          aria-hidden
        />
      )}

      <div className="relative z-10">
        <FoldText
          text="Train with clarity"
          splitBy="char"
          hinge="top"
          trigger="scroll"
          duration={0.65}
          stagger={0.04}
          ease="power3.out"
          perspective={700}
          creaseShading={0.55}
          fontSize="clamp(2.4rem, 8vw, 5.5rem)"
          fontWeight={700}
          color="#E1F5FE"
        />
        <p className="mx-auto mt-6 max-w-xl px-4 text-brand-100">
          From protein questions to exercise technique — every page should push
          you toward the next useful action.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/muscle-building"
            className="inline-flex rounded-full bg-orange-400 px-6 py-3 text-sm font-semibold text-white hover:bg-orange-300"
          >
            Muscle building guides
          </Link>
          <Link
            href="/foods/indian"
            className="inline-flex rounded-full border border-brand-100/40 px-6 py-3 text-sm font-semibold text-brand-50 hover:bg-white/10"
          >
            Indian high-protein foods
          </Link>
          <Link
            href="/exercises"
            className="inline-flex rounded-full border border-brand-100/40 px-6 py-3 text-sm font-semibold text-brand-50 hover:bg-white/10"
          >
            Exercise library
          </Link>
        </div>
      </div>
    </section>
  );
}
