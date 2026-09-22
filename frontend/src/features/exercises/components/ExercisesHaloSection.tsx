"use client";

import { useEffect, useState } from "react";
import { HaloReel, type HaloReelItem } from "@/components/ui/halo-reel";
import { HUB } from "@/lib/hubImages";

const ITEMS: HaloReelItem[] = [
  {
    src: HUB.bicepCurlWide,
    alt: "Chest and upper-body training",
    title: "Chest",
    subtitle: "Presses & flyes",
  },
  {
    src: HUB.dumbbellRow,
    alt: "Back training",
    title: "Back",
    subtitle: "Rows & pulls",
  },
  {
    src: HUB.deadlift,
    alt: "Shoulder and full-body training",
    title: "Shoulders",
    subtitle: "Presses & raises",
  },
  {
    src: HUB.bicepFocus,
    alt: "Arm training",
    title: "Arms",
    subtitle: "Biceps & triceps",
  },
  {
    src: HUB.barbellSquat,
    alt: "Leg training",
    title: "Legs",
    subtitle: "Squats & hinges",
  },
  {
    src: HUB.mobilityStretch,
    alt: "Core and mobility",
    title: "Core",
    subtitle: "Stability work",
  },
  {
    src: HUB.outdoorRun,
    alt: "Cardio training",
    title: "Cardio",
    subtitle: "Conditioning",
  },
];

export function ExercisesHaloSection() {
  const [layout, setLayout] = useState({
    height: 360,
    cardWidth: 100,
    cardHeight: 140,
  });

  useEffect(() => {
    const sync = () => {
      const w = window.innerWidth;
      const vh = window.innerHeight;
      if (w < 480) {
        setLayout({
          height: Math.min(360, Math.round(vh * 0.55)),
          cardWidth: 96,
          cardHeight: 130,
        });
      } else if (w < 768) {
        setLayout({
          height: Math.min(420, Math.round(vh * 0.6)),
          cardWidth: 120,
          cardHeight: 160,
        });
      } else {
        setLayout({ height: 520, cardWidth: 140, cardHeight: 190 });
      }
    };
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  return (
    <section className="mt-12 overflow-hidden rounded-2xl border border-border bg-brand-50/60">
      <HaloReel
        items={ITEMS}
        aria-label="Exercise muscle groups"
        centerLabel={
          <span className="text-center text-base font-semibold tracking-tight text-foreground sm:text-2xl">
            Muscle
            <br />
            groups
          </span>
        }
        cardWidth={layout.cardWidth}
        cardHeight={layout.cardHeight}
        minScale={0.42}
        radiusYRatio={0.34}
        holdDuration={1200}
        stepDuration={700}
        className="bg-transparent"
        style={{ height: layout.height }}
      />
    </section>
  );
}
