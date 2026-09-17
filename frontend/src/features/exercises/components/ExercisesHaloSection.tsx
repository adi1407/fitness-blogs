"use client";

import { HaloReel, type HaloReelItem } from "@/components/ui/halo-reel";

const ITEMS: HaloReelItem[] = [
  {
    src: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800&auto=format&fit=crop",
    alt: "Chest training",
    title: "Chest",
    subtitle: "Presses & flyes",
  },
  {
    src: "https://images.unsplash.com/photo-1603287681836-b174ce5074c2?q=80&w=800&auto=format&fit=crop",
    alt: "Back training",
    title: "Back",
    subtitle: "Rows & pulls",
  },
  {
    src: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800&auto=format&fit=crop",
    alt: "Shoulder training",
    title: "Shoulders",
    subtitle: "Presses & raises",
  },
  {
    src: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=800&auto=format&fit=crop",
    alt: "Arm training",
    title: "Arms",
    subtitle: "Biceps & triceps",
  },
  {
    src: "https://images.unsplash.com/photo-1434682881908-b43d0467b798?q=80&w=800&auto=format&fit=crop",
    alt: "Leg training",
    title: "Legs",
    subtitle: "Squats & hinges",
  },
  {
    src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=800&auto=format&fit=crop",
    alt: "Core training",
    title: "Core",
    subtitle: "Stability work",
  },
  {
    src: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=800&auto=format&fit=crop",
    alt: "Cardio training",
    title: "Cardio",
    subtitle: "Conditioning",
  },
];

export function ExercisesHaloSection() {
  return (
    <section className="mt-12 overflow-hidden rounded-2xl border border-border bg-brand-50/60">
      <HaloReel
        items={ITEMS}
        aria-label="Exercise muscle groups"
        centerLabel={
          <span className="text-center text-lg font-semibold tracking-tight text-foreground sm:text-2xl">
            Muscle
            <br />
            groups
          </span>
        }
        cardWidth={140}
        cardHeight={190}
        minScale={0.42}
        radiusYRatio={0.34}
        holdDuration={1200}
        stepDuration={700}
        className="h-[520px] bg-transparent"
      />
    </section>
  );
}
