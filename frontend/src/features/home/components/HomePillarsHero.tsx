"use client";

import {
  TeamShowcase,
  type TeamMember,
} from "@/components/ui/team-showcase";

/** Three locked pillars — replaces “latest articles” carousel in the home hero. */
const PILLARS: TeamMember[] = [
  {
    name: "Muscle Building",
    role: "Hypertrophy & strength",
    href: "/muscle-building",
    imageSrc:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop",
    themeColor: "bg-[#FFE0B2]",
  },
  {
    name: "Weight Loss",
    role: "Deficit done right",
    href: "/weight-loss",
    imageSrc:
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800&auto=format&fit=crop",
    themeColor: "bg-[#E8E8E8]",
  },
  {
    name: "Nutrition",
    role: "Protein, macros & meals",
    href: "/nutrition",
    imageSrc:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=800&auto=format&fit=crop",
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
