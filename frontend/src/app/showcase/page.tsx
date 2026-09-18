import type { Metadata } from "next";
import AuroraBackgroundDemo from "@/components/aurora-background-demo";
import { BaseAlertDialogDemo } from "@/components/base-alert-dialog-demo";
import BentoDemo from "@/components/bento-demo";
import { BlurTextDemo } from "@/components/blur-text-demo";
import { BubbleBackgroundDemo } from "@/components/bubble-background-demo";
import CarouselDemo from "@/components/carousel-demo";
import ConnectedCarouselDemo from "@/components/connected-carousel-demo";
import ContainerTextFlipDemo from "@/components/container-text-flip-demo";
import { FlipCardDemo } from "@/components/flip-card-demo";
import FocusCardsDemo from "@/components/focus-cards-demo";
import { FoldTextDemo } from "@/components/fold-text-demo";
import { GhostFibersDemo } from "@/components/ghost-fibers-demo";
import HaloReelDemo from "@/components/halo-reel-demo";
import { DemoOne as ImageAutoSliderDemo } from "@/components/image-auto-slider-demo";
import MasonryGridDemo from "@/components/masonry-grid-with-scroll-animation-demo";
import { RadixPreviewLinkCardDemo } from "@/components/radix-preview-link-card-demo";
import { RadialIntroDemo } from "@/components/radial-intro-demo";
import ScrollMorphHeroDemo from "@/components/scroll-morph-hero-demo";
import SplitAxisConvergenceDemo from "@/components/split-axis-convergence-demo";
import TailwindImageAccordionDemo from "@/components/tailwind-image-accordion-demo";
import TracingBeamDemo from "@/components/tracing-beam-demo";
import HabitFaqScrollerDemo from "@/components/habit-faq-scroller-demo";
import ImgSphereDemo from "@/components/img-sphere-demo";
import CircularGalleryDemo from "@/components/circular-gallery-demo";

export const metadata: Metadata = {
  title: "Component showcase",
  description: "Internal gallery of UI components used across FitKnowledge.",
  robots: { index: false, follow: false },
};

function Band({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-b border-border py-12">
      <h2 className="mb-6 px-4 text-xl font-semibold tracking-tight sm:px-6 lg:px-8">
        {title}
      </h2>
      <div className="px-2 sm:px-4">{children}</div>
    </section>
  );
}

/** Noindex gallery so every demo component is mounted somewhere. */
export default function ShowcasePage() {
  return (
    <main className="flex w-full flex-1 flex-col bg-white">
      <header className="border-b border-border bg-brand-50/60 px-4 py-10 sm:px-6 lg:px-8">
        <p className="text-sm font-medium text-primary">Internal</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">
          Component showcase
        </h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Living gallery of UI primitives. Production pages also embed these
          patterns — this route is for visual QA only.
        </p>
      </header>

      <Band title="Image auto slider">
        <ImageAutoSliderDemo />
      </Band>
      <Band title="Aurora background">
        <div className="min-h-[40vh]">
          <AuroraBackgroundDemo />
        </div>
      </Band>
      <Band title="Container text flip">
        <div className="flex justify-center py-8">
          <ContainerTextFlipDemo />
        </div>
      </Band>
      <Band title="Blur text">
        <div className="flex justify-center py-8">
          <BlurTextDemo />
        </div>
      </Band>
      <Band title="Focus cards">
        <FocusCardsDemo />
      </Band>
      <Band title="Connected carousel">
        <ConnectedCarouselDemo />
      </Band>
      <Band title="Carousel">
        <CarouselDemo />
      </Band>
      <Band title="Scroll morph hero">
        <div className="h-[560px] overflow-hidden">
          <ScrollMorphHeroDemo />
        </div>
      </Band>
      <Band title="Halo reel">
        <HaloReelDemo />
      </Band>
      <Band title="Ghost fibers">
        <div className="relative h-[360px] overflow-hidden rounded-xl bg-[#0B2533]">
          <GhostFibersDemo />
        </div>
      </Band>
      <Band title="Fold text">
        <div className="flex justify-center bg-[#0B2533] py-16">
          <FoldTextDemo />
        </div>
      </Band>
      <Band title="Bubble background">
        <div className="relative h-[320px] overflow-hidden rounded-xl">
          <BubbleBackgroundDemo interactive />
        </div>
      </Band>
      <Band title="Bento grid">
        <BentoDemo />
      </Band>
      <Band title="Masonry grid">
        <MasonryGridDemo />
      </Band>
      <Band title="Tracing beam">
        <TracingBeamDemo />
      </Band>
      <Band title="Split axis">
        <SplitAxisConvergenceDemo />
      </Band>
      <Band title="Image accordion">
        <TailwindImageAccordionDemo />
      </Band>
      <Band title="Radial intro">
        <div className="flex justify-center py-8">
          <RadialIntroDemo />
        </div>
      </Band>
      <Band title="Flip card">
        <div className="flex justify-center py-8">
          <FlipCardDemo />
        </div>
      </Band>
      <Band title="Preview link card">
        <div className="flex justify-center py-8">
          <RadixPreviewLinkCardDemo href="https://www.who.int/news-room/fact-sheets/detail/healthy-diet" />
        </div>
      </Band>
      <Band title="Alert dialog">
        <div className="px-4 py-8">
          <BaseAlertDialogDemo from="bottom" />
        </div>
      </Band>

      <Band title="Habit FAQ scroller">
        <HabitFaqScrollerDemo />
      </Band>

      <Band title="Image sphere">
        <ImgSphereDemo />
      </Band>

      <Band title="Circular gallery">
        <div className="max-h-[80vh] overflow-auto"><CircularGalleryDemo /></div>
      </Band>
    </main>
  );
}
