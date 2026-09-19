"use client";

import Link from "next/link";
import { ImageAutoSlider } from "@/components/ui/image-auto-slider";
import { BubbleBackground } from "@/components/animate-ui/components/backgrounds/bubble";
import { CalendlyCarousel } from "@/components/ui/connected-carousel";
import type { CarouselItem } from "@/components/ui/connected-carousel";
import {
  PreviewLinkCard,
  PreviewLinkCardTrigger,
  PreviewLinkCardContent,
  PreviewLinkCardImage,
} from "@/components/animate-ui/components/radix/preview-link-card";
import { HomeGhostFoldBand } from "@/features/home/components/HomeGhostFoldBand";

const TOOL_SLIDER_IMAGES = [
  "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1532550907401-a532f99ecef3?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop",
];

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
    role: "Tools · Nutrition",
    defaultImage:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1200&auto=format&fit=crop",
    selectedImage:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop",
    alt: "Macros and training",
  },
];

/** Visual bands for the Tools hub. */
export function ToolsVisualBands() {
  return (
    <div className="mt-12 space-y-12">
      <section className="overflow-hidden rounded-2xl border border-border">
        <ImageAutoSlider
          images={TOOL_SLIDER_IMAGES}
          durationSec={24}
          className="min-h-[260px] sm:min-h-[300px]"
        />
      </section>

      <section>
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
              className="fk-btn-ghost rounded-full px-4 py-2 text-sm"
            >
              {label}
            </Link>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden rounded-2xl border border-border bg-white px-6 py-12 sm:px-10">
        <div className="absolute inset-0 opacity-30">
          <BubbleBackground interactive className="absolute inset-0" />
        </div>
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-xl font-semibold tracking-tight">
            Calculators that teach
          </h2>
          <p className="mt-2 text-muted-foreground">
            Every tool should push you toward a guide, food, or next step — see
            the{" "}
            <PreviewLinkCard href="https://www.who.int/news-room/fact-sheets/detail/healthy-diet">
              <PreviewLinkCardTrigger
                target="_blank"
                className="fk-link font-semibold"
              >
                WHO healthy diet overview
              </PreviewLinkCardTrigger>
              <PreviewLinkCardContent target="_blank">
                <PreviewLinkCardImage alt="WHO healthy diet" />
              </PreviewLinkCardContent>
            </PreviewLinkCard>{" "}
            for how we think about evidence-informed nutrition framing.
          </p>
        </div>
      </section>
    </div>
  );
}

export function ToolsGhostBand() {
  return (
    <div className="mt-16 -mx-4 sm:-mx-6 lg:-mx-8">
      <HomeGhostFoldBand />
    </div>
  );
}
