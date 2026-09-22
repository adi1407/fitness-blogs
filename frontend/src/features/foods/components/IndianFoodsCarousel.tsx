"use client";

import Carousel from "@/components/ui/carousel";
import { HUB } from "@/lib/hubImages";

const SLIDES = [
  {
    title: "Paneer",
    button: "High protein staple",
    src: HUB.indianThali,
  },
  {
    title: "Dal",
    button: "Plant protein + fiber",
    src: HUB.indianThaliWide,
  },
  {
    title: "Eggs",
    button: "Complete protein",
    src: HUB.healthyBreakfast,
  },
  {
    title: "Curd",
    button: "Versatile dairy protein",
    src: HUB.powerBowl,
  },
];

export function IndianFoodsCarousel() {
  return (
    <section className="mt-12 py-4">
      <h2 className="mb-6 text-2xl font-semibold tracking-tight">
        Staples in focus
      </h2>
      <Carousel slides={SLIDES} />
    </section>
  );
}
