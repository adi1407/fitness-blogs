"use client";

import { ImageAutoSlider } from "@/components/ui/image-auto-slider";
import { FOODS_STRIP_IMAGES } from "@/lib/hubImages";

const FOOD_IMAGES = FOODS_STRIP_IMAGES;

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
