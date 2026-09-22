"use client";

import Link from "next/link";
import { FocusCards } from "@/components/ui/focus-cards";
import { HUB } from "@/lib/hubImages";

const PILLAR_CARDS = [
  {
    title: "Protein",
    src: HUB.chickenBowl,
    href: "/nutrition/protein",
  },
  {
    title: "Calories & macros",
    src: HUB.powerBowl,
    href: "/tools/macro-calculator",
  },
  {
    title: "Indian foods",
    src: HUB.indianThali,
    href: "/foods/indian",
  },
];

export function NutritionFocusCards() {
  return (
    <section className="mt-12">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            Explore nutrition pathways
          </h2>
          <p className="mt-2 max-w-xl text-muted-foreground">
            Focus a card — then open the hub, calculator, or food database.
          </p>
        </div>
        <Link href="/blog/nutrition" className="fk-link text-sm font-semibold">
          Nutrition articles →
        </Link>
      </div>
      <div className="mt-8">
        <FocusCards cards={PILLAR_CARDS} />
      </div>
    </section>
  );
}
