"use client";

import { ImageAutoSlider } from "@/components/ui/image-auto-slider";
import { BubbleBackground } from "@/components/animate-ui/components/backgrounds/bubble";
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
                className="font-semibold text-primary underline"
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
