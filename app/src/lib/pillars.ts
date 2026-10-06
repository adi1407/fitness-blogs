import { IMG } from "./images";

export type PillarSlug = "nutrition" | "weight-loss" | "muscle-building";

export type Pillar = {
  slug: PillarSlug;
  title: string;
  tagline: string;
  intro: string;
  image: string;
  /** Calculators most relevant to this pillar. */
  tools: string[];
};

/** Mirrors the website pillar hubs (/nutrition, /weight-loss, /muscle-building). */
export const PILLARS: Pillar[] = [
  {
    slug: "nutrition",
    title: "Nutrition",
    tagline: "Protein, macros and Indian food — explained.",
    intro:
      "Practical nutrition built around Indian meals: how much protein you need, how to read macros, and which everyday foods do the heavy lifting.",
    image: IMG.indianThali,
    tools: ["protein", "macro", "water"],
  },
  {
    slug: "weight-loss",
    title: "Weight Loss",
    tagline: "Sustainable fat loss without crash diets.",
    intro:
      "Calorie deficits that you can live with, realistic rates of loss, and the habits that keep weight off — with no detoxes or miracle claims.",
    image: IMG.outdoorRun,
    tools: ["calorie", "deficit", "steps"],
  },
  {
    slug: "muscle-building",
    title: "Muscle Building",
    tagline: "Train smarter, recover better, grow.",
    intro:
      "Progressive overload, sensible programming and the nutrition that supports it — for beginners and returning lifters alike.",
    image: IMG.deadlift,
    tools: ["protein", "one-rep-max", "tdee"],
  },
];

export const PILLAR_BY_SLUG = Object.fromEntries(PILLARS.map((p) => [p.slug, p])) as Record<PillarSlug, Pillar>;

export function isPillarSlug(v: unknown): v is PillarSlug {
  return typeof v === "string" && v in PILLAR_BY_SLUG;
}
