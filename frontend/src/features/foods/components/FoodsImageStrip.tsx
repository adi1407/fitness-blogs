"use client";

import { ImageAutoSlider } from "@/components/ui/image-auto-slider";

const FOOD_IMAGES = [
  "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=800&auto=format&fit=crop",
];

/** Food photo marquee for the /foods hub. */
export function FoodsImageStrip() {
  return (
    <section className="mt-10 overflow-hidden rounded-2xl border border-border">
      <ImageAutoSlider
        images={FOOD_IMAGES}
        durationSec={22}
        className="min-h-[220px] sm:min-h-[260px]"
      />
    </section>
  );
}
