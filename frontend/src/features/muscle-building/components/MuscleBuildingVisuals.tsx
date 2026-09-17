"use client";

import Link from "next/link";
import BlurText from "@/components/ui/blur-text";
import { FocusCards } from "@/components/ui/focus-cards";

const CARDS = [
  {
    title: "Chest",
    src: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800&auto=format&fit=crop",
    href: "/exercises/chest",
  },
  {
    title: "Back",
    src: "https://images.unsplash.com/photo-1603287681836-b174ce5074c2?q=80&w=800&auto=format&fit=crop",
    href: "/exercises/back",
  },
  {
    title: "Legs",
    src: "https://images.unsplash.com/photo-1434682881908-b43d0467b798?q=80&w=800&auto=format&fit=crop",
    href: "/exercises/legs",
  },
  {
    title: "Protein",
    src: "https://images.unsplash.com/photo-1532550907401-a532f99ecef3?q=80&w=800&auto=format&fit=crop",
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
