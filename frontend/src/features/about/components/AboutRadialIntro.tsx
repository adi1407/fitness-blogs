"use client";

import { RadialIntro } from "@/components/animate-ui/components/community/radial-intro";
import { HUB } from "@/lib/hubImages";

const ORBIT = [
  {
    id: 1,
    name: "Nutrition",
    src: HUB.chickenBowl,
  },
  {
    id: 2,
    name: "Training",
    src: HUB.deadlift,
  },
  {
    id: 3,
    name: "Tools",
    src: HUB.healthConsult,
  },
  {
    id: 4,
    name: "Foods",
    src: HUB.indianThali,
  },
  {
    id: 5,
    name: "Recovery",
    src: HUB.meditation,
  },
  {
    id: 6,
    name: "Guides",
    src: HUB.gymInterior,
  },
];

export function AboutRadialIntro() {
  return (
    <div className="mt-10 flex min-h-[380px] w-full items-center justify-center overflow-visible py-10">
      <RadialIntro orbitItems={ORBIT} stageSize={280} imageSize={72} />
    </div>
  );
}
