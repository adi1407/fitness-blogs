"use client";

import {
  TeamShowcase,
  type TeamMember,
} from "@/components/ui/team-showcase";
import { HUB } from "@/lib/hubImages";

/** Three locked pillars — replaces “latest articles” carousel in the home hero. */
const PILLARS: TeamMember[] = [
  {
    name: "Muscle Building",
    role: "Hypertrophy & strength",
    href: "/muscle-building",
    imageSrc: HUB.deadlift,
    themeColor: "bg-[#FFE0B2]",
  },
  {
    name: "Weight Loss",
    role: "Deficit done right",
    href: "/weight-loss",
    imageSrc: HUB.outdoorRun,
    themeColor: "bg-[#E8E8E8]",
  },
  {
    name: "Nutrition",
    role: "Protein, macros & meals",
    href: "/nutrition",
    imageSrc: HUB.chickenBowl,
    themeColor: "bg-[#FFF3E0]",
  },
];

/** Brand-first home hero: fitlives + three category pillars. */
export function HomePillarsHero() {
  return (
    <TeamShowcase
      className="border-b border-border bg-white"
      title="fitlives"
      description="Searchable guides for muscle building, weight loss, and nutrition — built for real questions, not thin blog posts."
      buttonText="Browse all guides"
      buttonHref="/blog"
      members={PILLARS}
    />
  );
}
