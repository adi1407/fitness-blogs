"use client";

import Link from "next/link";
import { CalendlyCarousel } from "@/components/ui/connected-carousel";
import type { CarouselItem } from "@/components/ui/connected-carousel";
import { FocusCards } from "@/components/ui/focus-cards";

const TOOL_STORIES: CarouselItem[] = [
  {
    id: "protein",
    stat: "Protein needs, clarified",
    quote:
      "Estimate daily protein targets by body weight and goal — then jump into foods and guides.",
    author: "Protein Calculator",
    role: "Tools · Nutrition",
    defaultImage:
      "https://images.unsplash.com/photo-1532550907401-a532f99ecef3?q=80&w=1200&auto=format&fit=crop",
    selectedImage:
      "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?q=80&w=1200&auto=format&fit=crop",
    alt: "Protein and training",
  },
  {
    id: "tdee",
    stat: "Know your calories",
    quote:
      "Maintenance, fat loss, and surplus ranges with educational next steps — not a dead-end number.",
    author: "TDEE Calculator",
    role: "Tools · Weight Loss",
    defaultImage:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1200&auto=format&fit=crop",
    selectedImage:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1200&auto=format&fit=crop",
    alt: "Healthy meal planning",
  },
  {
    id: "macros",
    stat: "Macros that match goals",
    quote:
      "Turn calorie targets into protein, carbs, and fat — then explore Indian meal ideas.",
    author: "Macro Calculator",
    role: "Tools · Performance",
    defaultImage:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1200&auto=format&fit=crop",
    selectedImage:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop",
    alt: "Macros and training",
  },
];

const PILLAR_CARDS = [
  {
    title: "Muscle Building",
    src: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop",
    href: "/blog/muscle-building",
  },
  {
    title: "Weight Loss",
    src: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1200&auto=format&fit=crop",
    href: "/blog/weight-loss",
  },
  {
    title: "Nutrition",
    src: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1200&auto=format&fit=crop",
    href: "/blog/nutrition",
  },
];

/** Slim home bands — FocusCards + tools carousel only. */
export function HomeMagazineBands() {
  return (
    <>
      <section className="border-t border-border bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">
                Explore by pillar
              </h2>
              <p className="mt-2 max-w-xl text-muted-foreground">
                Hover to focus a cluster — then dive into the full category
                archive.
              </p>
            </div>
            <Link
              href="/blog"
              className="text-sm font-semibold text-primary hover:underline"
            >
              Latest →
            </Link>
          </div>
          <div className="mt-8">
            <FocusCards cards={PILLAR_CARDS} />
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-brand-50/30 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight">
            Featured calculators
          </h2>
          <p className="mt-2 max-w-xl text-muted-foreground">
            Tools that answer calculation intent and route you into guides and
            foods.
          </p>
          <div className="mt-8">
            <CalendlyCarousel items={TOOL_STORIES} autoPlayInterval={7000} />
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            {[
              ["/tools/protein-calculator", "Protein"],
              ["/tools/tdee-calculator", "TDEE"],
              ["/tools/macro-calculator", "Macros"],
              ["/tools/bmi-calculator", "BMI"],
            ].map(([href, label]) => (
              <Link
                key={href}
                href={href}
                className="rounded-full bg-white px-4 py-2 text-sm font-medium text-foreground ring-1 ring-brand-100 hover:bg-primary hover:text-white"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
