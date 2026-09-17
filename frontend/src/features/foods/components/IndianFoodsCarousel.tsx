"use client";

import Carousel from "@/components/ui/carousel";

const SLIDES = [
  {
    title: "Paneer",
    button: "High protein staple",
    src: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Dal",
    button: "Plant protein + fiber",
    src: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Eggs",
    button: "Complete protein",
    src: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Curd",
    button: "Versatile dairy protein",
    src: "https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=1200&auto=format&fit=crop",
  },
];

export function IndianFoodsCarousel() {
  return (
    <section className="mt-12 overflow-hidden py-4">
      <h2 className="mb-6 text-2xl font-semibold">Staples in focus</h2>
      <Carousel slides={SLIDES} />
    </section>
  );
}
