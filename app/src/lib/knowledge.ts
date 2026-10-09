import type Ionicons from "@expo/vector-icons/Ionicons";
import type { ComponentProps } from "react";

import type { KnowledgeSection } from "@/api/library";
import { IMG } from "./images";

type SectionMeta = {
  label: string;
  eyebrow: string;
  icon: ComponentProps<typeof Ionicons>["name"];
  image: string;
  /** Hub intro copy used until the CMS hub loads (mirrors the website fallbacks). */
  lede: string;
  listTitle: string;
  relatedTitle: string;
};

export const KNOWLEDGE_SECTIONS: Record<KnowledgeSection, SectionMeta> = {
  programs: {
    label: "Training programs",
    eyebrow: "Programs",
    icon: "calendar-outline",
    image: IMG.gymInterior,
    lede: "Progressive plans built for real schedules — not perfect spreadsheets.",
    listTitle: "Pick a plan",
    relatedTitle: "More programs",
  },
  reviews: {
    label: "Buyer's guides",
    eyebrow: "Reviews",
    icon: "ribbon-outline",
    image: IMG.healthConsult,
    lede: "Criteria and red flags so you can judge products yourself.",
    listTitle: "Read before you buy",
    relatedTitle: "Related guides",
  },
};

export function isKnowledgeSection(v: unknown): v is KnowledgeSection {
  return v === "programs" || v === "reviews";
}
