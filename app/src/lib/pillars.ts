import type { Href } from "expo-router";

import { IMG } from "./images";

export type PillarSlug = "nutrition" | "weight-loss" | "muscle-building";

export type QuickStart = {
  text: string;
  actions: { label: string; href: Href }[];
};

export type Pillar = {
  slug: PillarSlug;
  title: string;
  /** Hub page H1 — same wording as the website pillar page. */
  headline: string;
  tagline: string;
  intro: string;
  image: string;
  /** Calculators most relevant to this pillar. */
  tools: string[];
  quickStart: QuickStart;
};

/** Mirrors the website pillar hubs (/nutrition, /weight-loss, /muscle-building). */
export const PILLARS: Pillar[] = [
  {
    slug: "nutrition",
    title: "Nutrition",
    headline: "Nutrition",
    tagline: "Protein, macros and Indian food — explained.",
    intro:
      "Practical nutrition built around Indian meals: how much protein you need, how to read macros, and which everyday foods do the heavy lifting.",
    image: IMG.indianThali,
    tools: ["protein", "macro", "water"],
    quickStart: {
      text: "Most readers arrive asking about protein or calories. Start with the protein calculator, then explore Indian high-protein foods.",
      actions: [
        { label: "Protein calculator", href: "/calculator/protein" },
        { label: "Indian foods", href: "/foods" },
      ],
    },
  },
  {
    slug: "weight-loss",
    title: "Weight Loss",
    headline: "Weight loss: a practical, evidence-informed path",
    tagline: "Sustainable fat loss without crash diets.",
    intro:
      "Calorie deficits that you can live with, realistic rates of loss, and the habits that keep weight off — with no detoxes or miracle claims.",
    image: IMG.outdoorRun,
    tools: ["calorie", "deficit", "steps"],
    quickStart: {
      text: "Fat loss requires a sustained calorie deficit. Pair that with enough protein, resistance training and habits you can keep — then use a calculator to estimate a starting point.",
      actions: [
        { label: "TDEE calculator", href: "/calculator/tdee" },
        { label: "Calorie calculator", href: "/calculator/calorie" },
      ],
    },
  },
  {
    slug: "muscle-building",
    title: "Muscle Building",
    headline: "Muscle building fundamentals",
    tagline: "Train smarter, recover better, grow.",
    intro:
      "Progressive overload, sensible programming and the nutrition that supports it — for beginners and returning lifters alike.",
    image: IMG.deadlift,
    tools: ["protein", "one-rep-max", "tdee"],
    quickStart: {
      text: "Train hard with progressive overload, eat enough protein and total calories, sleep well and stay consistent. Use the exercise library and protein calculator to turn principles into a plan.",
      actions: [
        { label: "Exercise library", href: "/exercises" },
        { label: "Protein calculator", href: "/calculator/protein" },
      ],
    },
  },
];

export const PILLAR_BY_SLUG = Object.fromEntries(PILLARS.map((p) => [p.slug, p])) as Record<PillarSlug, Pillar>;

export function isPillarSlug(v: unknown): v is PillarSlug {
  return typeof v === "string" && v in PILLAR_BY_SLUG;
}
