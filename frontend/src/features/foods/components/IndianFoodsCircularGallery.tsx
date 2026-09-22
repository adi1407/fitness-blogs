"use client";

import { CircularGallery } from "@/components/ui/circular-gallery";
import { FITNESS_GALLERY_ITEMS } from "@/features/foods/data/galleryItems";

/** Sticky scroll-driven circular gallery for Indian foods hub (full-bleed). */
export function IndianFoodsCircularGallery() {
  return (
    <section
      className="relative mt-14 w-screen max-w-[100vw] bg-brand-50/30"
      style={{
        height: "min(170svh, 1100px)",
        marginLeft: "calc(50% - 50vw)",
        marginRight: "calc(50% - 50vw)",
      }}
      aria-label="Indian foods circular gallery"
    >
      <div className="sticky top-[var(--site-header-height,6.75rem)] mx-auto flex h-[min(72svh,560px)] w-full max-w-[1100px] flex-col">
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
            autoRotateSpeed={0.08}
          />
        </div>
      </div>
    </section>
  );
}
