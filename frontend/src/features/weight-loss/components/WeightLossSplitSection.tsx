"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import SplitAxisConvergence, {
  type StackSpreadCard,
} from "@/components/ui/split-axis-convergence";

const FITNESS_IMGS = [
  "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1000&auto=format&fit=crop",
];

const ALTS = [
  "Strength training",
  "Meal planning",
  "Gym workout",
  "Fresh vegetables",
  "Running outdoors",
  "Balanced plate",
  "Weight room",
  "Core training",
];

function buildCards(): StackSpreadCard[] {
  const layout: Omit<StackSpreadCard, "item">[] = [
    {
      portalOffset: { x: -48, y: -30 },
      portalRotate: -15,
      target: { x: -22, y: -36, rotate: -4, scale: 0.65, w: 16, h: 21 },
      targetSm: { x: -22, y: -40 },
      z: 2,
    },
    {
      portalOffset: { x: 48, y: -20 },
      portalRotate: 15,
      target: { x: 34, y: -32, rotate: 6, scale: 0.85, w: 17, h: 30 },
      targetSm: { x: 22, y: -40 },
      z: 3,
    },
    {
      portalOffset: { x: -45, y: -10 },
      portalRotate: -10,
      target: { x: -38, y: -4, rotate: -2, scale: 0.85, w: 14, h: 30 },
      targetSm: { x: -22, y: -19 },
      z: 4,
    },
    {
      portalOffset: { x: 45, y: 0 },
      portalRotate: 10,
      target: { x: 4, y: -34, rotate: 3, scale: 0.75, w: 24, h: 28 },
      targetSm: { x: 22, y: -19 },
      z: 5,
    },
    {
      portalOffset: { x: -42, y: 10 },
      portalRotate: -5,
      target: { x: 38, y: 8, rotate: -3, scale: 0.75, w: 17, h: 30 },
      targetSm: { x: -22, y: 20 },
      z: 6,
    },
    {
      portalOffset: { x: 42, y: 20 },
      portalRotate: 5,
      target: { x: -26, y: 36, rotate: 5, scale: 0.85, w: 21, h: 24 },
      targetSm: { x: 22, y: 20 },
      z: 7,
    },
    {
      portalOffset: { x: -40, y: 30 },
      portalRotate: -8,
      target: { x: 2, y: 38, rotate: -2, scale: 0.75, w: 19, h: 25 },
      targetSm: { x: -22, y: 40 },
      z: 8,
    },
    {
      portalOffset: { x: 40, y: 35 },
      portalRotate: 8,
      target: { x: 32, y: 36, rotate: 4, scale: 1, w: 15, h: 19 },
      targetSm: { x: 22, y: 40 },
      z: 9,
    },
  ];

  return layout.map((geo, i) => ({
    ...geo,
    item: { src: FITNESS_IMGS[i], alt: ALTS[i] },
  }));
}

function StaticFallback() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h2 className="text-center text-3xl font-semibold tracking-tight">
        Deficit plus habits → sustainable fat loss
      </h2>
      <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">
        Calories, protein, training, and daily movement come together as one
        plan.
      </p>
      <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {FITNESS_IMGS.map((src, i) => (
          <li key={src} className="overflow-hidden rounded-xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={ALTS[i]}
              className="aspect-[3/4] h-full w-full object-cover"
              loading="lazy"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Full-bleed SplitAxis — must NOT sit inside overflow-hidden / max-width shells. */
export function WeightLossSplitSection() {
  const reduce = useReducedMotion();
  const [scrollLength, setScrollLength] = useState(200);

  useEffect(() => {
    const sync = () => {
      setScrollLength(window.innerWidth < 768 ? 180 : 260);
    };
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  if (reduce) {
    return (
      <section className="mt-12 border-y border-border bg-brand-50/50">
        <StaticFallback />
      </section>
    );
  }

  return (
    <section
      className="relative mt-12 w-full border-y border-border bg-[#faf9f6]"
      aria-label="Weight loss visual story"
    >
      <SplitAxisConvergence
        cards={buildCards()}
        scrollLength={scrollLength}
        showScrollHint
        titleBefore={
          <>
            Deficit{" "}
            <span className="font-normal opacity-40">plus</span> habits.
          </>
        }
        titleAfter={
          <>
            Sustainable{" "}
            <span className="font-normal text-foreground">fat loss</span>.
          </>
        }
        subtitleBefore="Calories, protein, training, and daily movement come together as one plan."
        subtitleAfter="Then use calculators to set your starting numbers and build meals."
      />
    </section>
  );
}
