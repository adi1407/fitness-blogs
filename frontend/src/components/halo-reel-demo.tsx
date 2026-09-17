"use client";

import { HaloReel, type HaloReelItem } from "@/components/ui/halo-reel";

const CARDS: HaloReelItem[] = [
  {
    src: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=800&auto=format&fit=crop",
    alt: "Ocean waves at sunset",
  },
  {
    src: "https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=800&auto=format&fit=crop",
    alt: "Soft multi-tone gradient wash",
  },
  {
    src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop",
    alt: "Portrait against a warm backdrop",
  },
  {
    src: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=800&auto=format&fit=crop",
    alt: "Abstract color gradient",
  },
  {
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
    alt: "Motion-blurred side-profile portrait",
  },
  {
    src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
    alt: "Shifting shade abstract art",
  },
  {
    src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=800&auto=format&fit=crop",
    alt: "Landscape with dramatic light",
  },
  {
    src: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=800&auto=format&fit=crop",
    alt: "Colorful abstract pattern",
  },
  {
    src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop",
    alt: "Creative portrait with gesture",
  },
  {
    src: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=800&auto=format&fit=crop",
    alt: "Moon-toned gradient texture",
  },
];

export default function HaloReelDemo() {
  return (
    <HaloReel
      items={CARDS}
      aria-label="Recent work"
      centerLabel={
        <span className="text-[3.4vw] font-medium tracking-tight text-foreground">
          Selected works
        </span>
      }
      cardWidth={130}
      cardHeight={180}
      minScale={0.4}
      radiusYRatio={0.36}
      holdDuration={1000}
      stepDuration={700}
      className="h-[560px] bg-muted/40"
    />
  );
}
