"use client";

import Link from "next/link";
import { FocusCards } from "@/components/ui/focus-cards";

const PILLAR_CARDS = [
  {
    title: "Protein",
    src: "https://images.unsplash.com/photo-1532550907401-a532f99ecef3?q=80&w=1200&auto=format&fit=crop",
    href: "/nutrition/protein",
  },
  {
    title: "Calories & macros",
    src: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1200&auto=format&fit=crop",
    href: "/tools/macro-calculator",
  },
  {
    title: "Indian foods",
    src: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=1200&auto=format&fit=crop",
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
