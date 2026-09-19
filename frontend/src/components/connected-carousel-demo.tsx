"use client";

import React from "react";

import type { CarouselItem } from "@/components/ui/connected-carousel";

import { CalendlyCarousel } from "@/components/ui/connected-carousel";

const STORIES_DATA: CarouselItem[] = [
  {
    id: "studio-prism",
    stat: "140+ design sprints completed",
    quote:
      "Automating client bookings unlocked uninterrupted deep work sessions and transformed our delivery cadence.",
    author: "Elena Rostova",
    role: "Head of Product Design at Studio Prism",
    defaultImage:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop",
    selectedImage:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1200&auto=format&fit=crop",
    alt: "Elena Rostova collaborating with her design team in a creative studio",
  },
  {
    id: "veloce-ai",
    stat: "99.4% client meeting attendance",
    quote:
      "Smart qualification workflows removed manual no-shows completely and gave our sales engineering team its focus back.",
    author: "Julian Chen",
    role: "VP of Engineering at Veloce AI",
    defaultImage:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop",
    selectedImage:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1200&auto=format&fit=crop",
    alt: "Julian Chen in high-tech corporate office",
  },
  {
    id: "hyperion-health",
    stat: "65 hours saved monthly",
    quote:
      "Patients schedule specialty consultations in seconds, giving our clinicians more high-value care time.",
    author: "Dr. Amara Okafor",
    role: "Chief Medical Officer at Hyperion Health",
    defaultImage:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop",
    selectedImage:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=1200&auto=format&fit=crop",
    alt: "Dr. Amara Okafor examining care timelines in modern medical center",
  },
  {
    id: "aura-craft",
    stat: "$48,000 saved annually",
    quote:
      "Eliminating email tennis accelerated our bespoke customer intake and noticeably elevated our brand impression.",
    author: "Maya Lindqvist",
    role: "Creative Director & Founder at Aura Craft",
    defaultImage:
      "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?q=80&w=1200&auto=format&fit=crop",
    selectedImage:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1200&auto=format&fit=crop",
    alt: "Maya Lindqvist working with artisan craft prototypes",
  },
  {
    id: "echo-labs",
    stat: "82% reduction in coordination overhead",
    quote:
      "Distributed asynchronous scheduling let our remote founders operate seamlessly across twelve timezones.",
    author: "Siddharth Rao",
    role: "Co-Founder & COO at Echo Labs",
    defaultImage:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1200&auto=format&fit=crop",
    selectedImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200&auto=format&fit=crop",
    alt: "Siddharth Rao on a walking consultation outside an open-air tech campus",
  },
];

export default function ConnectedCarouselDemo() {
  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-8 bg-gradient-to-br from-neutral-100/60 via-background to-orange-100/40 dark:from-background dark:via-background dark:to-background">
      <CalendlyCarousel
        items={STORIES_DATA}
        autoPlayInterval={6000}
        pauseOnHover={false}
      />
    </main>
  );
}
