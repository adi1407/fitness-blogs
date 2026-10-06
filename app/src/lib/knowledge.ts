import type Ionicons from "@expo/vector-icons/Ionicons";
import type { ComponentProps } from "react";

import type { KnowledgeSection } from "@/api/library";
import { IMG } from "./images";

type SectionMeta = {
  label: string;
  eyebrow: string;
  icon: ComponentProps<typeof Ionicons>["name"];
  image: string;
};

export const KNOWLEDGE_SECTIONS: Record<KnowledgeSection, SectionMeta> = {
  programs: { label: "Training programs", eyebrow: "Programs", icon: "calendar-outline", image: IMG.gymInterior },
  reviews: { label: "Buyer's guides", eyebrow: "Reviews", icon: "ribbon-outline", image: IMG.healthConsult },
};

export function isKnowledgeSection(v: unknown): v is KnowledgeSection {
  return v === "programs" || v === "reviews";
}
