"use client";

import { CalendlyCarousel } from "@/components/ui/connected-carousel";
import type { CarouselItem } from "@/components/ui/connected-carousel";

const PROGRAM_STORIES: CarouselItem[] = [
  {
    id: "beginner",
    stat: "Start strong",
    quote:
      "A simple full-body template that teaches progressive overload without overwhelm.",
    author: "Beginner track",
    role: "Programs",
    defaultImage:
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1200&auto=format&fit=crop",
    selectedImage:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop",
    alt: "Beginner training",
  },
  {
    id: "fat-loss",
    stat: "Train in a deficit",
    quote:
      "Preserve muscle while losing fat — pair training volume with a sustainable calorie target.",
    author: "Fat-loss track",
    role: "Programs",
    defaultImage:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop",
    selectedImage:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1200&auto=format&fit=crop",
    alt: "Fat loss training",
  },
  {
    id: "hypertrophy",
    stat: "Build muscle",
    quote:
      "Hypertrophy-focused programming linked to protein guidance and exercise technique.",
    author: "Muscle track",
    role: "Programs",
    defaultImage:
      "https://images.unsplash.com/photo-1583454110551-21d2be4aaa31?q=80&w=1200&auto=format&fit=crop",
    selectedImage:
      "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?q=80&w=1200&auto=format&fit=crop",
    alt: "Hypertrophy training",
  },
];

export function ProgramsCarousel() {
  return (
    <div className="mt-10">
      <CalendlyCarousel items={PROGRAM_STORIES} autoPlayInterval={6500} />
    </div>
  );
}
