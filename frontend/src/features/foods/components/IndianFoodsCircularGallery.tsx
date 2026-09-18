"use client";

import { useEffect, useState } from "react";
import { CircularGallery } from "@/components/ui/circular-gallery";
import { FITNESS_GALLERY_ITEMS } from "@/components/circular-gallery-demo";

/** Sticky scroll-driven circular gallery for Indian foods hub (full-bleed). */
export function IndianFoodsCircularGallery() {
  const [radius, setRadius] = useState(240);
  const [scrollH, setScrollH] = useState("180svh");

  useEffect(() => {
    const sync = () => {
      const w = window.innerWidth;
      if (w < 480) {
        setRadius(200);
        setScrollH("170svh");
      } else if (w < 768) {
        setRadius(280);
        setScrollH("180svh");
      } else {
        setRadius(440);
        setScrollH("220svh");
      }
    };
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  return (
    <section
      className="relative mt-14 w-screen max-w-[100vw] bg-brand-50/30"
      style={{
        height: scrollH,
        marginLeft: "calc(50% - 50vw)",
        marginRight: "calc(50% - 50vw)",
      }}
      aria-label="Indian foods circular gallery"
    >
      <div className="sticky top-[var(--site-header-height)] flex h-[calc(100svh-var(--site-header-height))] w-full flex-col overflow-hidden">
        <div className="z-10 shrink-0 px-4 pb-2 pt-4 text-center sm:pt-6">
          <h2 className="text-xl font-semibold tracking-tight sm:text-3xl">
            Spin through staples
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Scroll to rotate — paneer, dal, eggs, and more.
          </p>
        </div>
        <div className="min-h-0 w-full flex-1">
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
