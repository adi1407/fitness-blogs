"use client";

import Link from "next/link";
import BlurText from "@/components/ui/blur-text";
import { FocusCards } from "@/components/ui/focus-cards";
import { HUB } from "@/lib/hubImages";

const CARDS = [
  {
    title: "Chest",
    src: HUB.bicepCurlWide,
    href: "/exercises/chest",
  },
  {
    title: "Back",
    src: HUB.dumbbellRow,
    href: "/exercises/back",
  },
  {
    title: "Legs",
    src: HUB.barbellSquat,
    href: "/exercises/legs",
  },
  {
    title: "Protein",
    src: HUB.chickenBowl,
    href: "/nutrition/protein",
  },
];

export function MuscleBuildingVisuals() {
  return (
    <section className="mt-12">
      <BlurText
        text="Progressive overload · Protein · Recovery"
        delay={60}
        animateBy="words"
        direction="top"
        className="mb-8 justify-start text-lg text-muted-foreground"
      />
      <FocusCards cards={CARDS} />
      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {CARDS.map((card) => (
          <li key={card.href}>
            <Link
              href={card.href}
              className="block rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium hover:border-primary hover:bg-brand-50"
            >
              {card.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
