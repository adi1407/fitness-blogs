"use client";

import { useEffect, useState } from "react";
import { CircularGallery } from "@/components/ui/circular-gallery";
import { FITNESS_GALLERY_ITEMS } from "@/components/circular-gallery-demo";

/** Sticky scroll-driven circular gallery for Indian foods hub. */
export function IndianFoodsCircularGallery() {
  const [radius, setRadius] = useState(420);

  useEffect(() => {
    const sync = () => {
      const w = window.innerWidth;
      if (w < 480) setRadius(280);
      else if (w < 768) setRadius(360);
      else setRadius(480);
    };
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  return (
    <section
      className="relative mt-14 w-full bg-brand-50/30"
      style={{ height: "280vh" }}
      aria-label="Indian foods circular gallery"
    >
      <div className="sticky top-[6.75rem] flex h-[calc(100svh-6.75rem)] w-full flex-col items-center justify-center overflow-hidden">
        <div className="absolute top-6 z-10 px-4 text-center">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Spin through staples
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Scroll to rotate — paneer, dal, eggs, and more.
          </p>
        </div>
        <div className="h-full w-full max-w-5xl">
          <CircularGallery
            items={FITNESS_GALLERY_ITEMS}
            radius={radius}
            autoRotateSpeed={0.02}
          />
        </div>
      </div>
    </section>
  );
}
