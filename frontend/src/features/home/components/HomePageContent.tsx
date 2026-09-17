"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { ContainerTextFlip } from "@/components/ui/container-text-flip";
import { FocusCards } from "@/components/ui/focus-cards";
import { CalendlyCarousel } from "@/components/ui/connected-carousel";
import type { CarouselItem } from "@/components/ui/connected-carousel";
import BlurText from "@/components/ui/blur-text";
import FoldText from "@/components/ui/fold-text";
import { BubbleBackground } from "@/components/animate-ui/components/backgrounds/bubble";
import { PreviewLinkCard, PreviewLinkCardTrigger, PreviewLinkCardContent, PreviewLinkCardImage } from "@/components/animate-ui/components/radix/preview-link-card";

const PILLARS = [
  {
    title: "Nutrition",
    src: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1200&auto=format&fit=crop",
    href: "/nutrition",
  },
  {
    title: "Weight Loss",
    src: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1200&auto=format&fit=crop",
    href: "/weight-loss",
  },
  {
    title: "Muscle Building",
    src: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop",
    href: "/muscle-building",
  },
  {
    title: "Exercises",
    src: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop",
    href: "/exercises",
  },
  {
    title: "Indian Foods",
    src: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=1200&auto=format&fit=crop",
    href: "/foods/indian",
  },
  {
    title: "Calculators",
    src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop",
    href: "/tools",
  },
];

const TOOL_STORIES: CarouselItem[] = [
  {
    id: "protein",
    stat: "Protein needs, clarified",
    quote:
      "Estimate daily protein targets by body weight and goal — then jump into foods and guides.",
    author: "Protein Calculator",
    role: "Tools · Nutrition",
    defaultImage:
      "https://images.unsplash.com/photo-1532550907401-a532f99ecef3?q=80&w=1200&auto=format&fit=crop",
    selectedImage:
      "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?q=80&w=1200&auto=format&fit=crop",
    alt: "Protein and training",
  },
  {
    id: "tdee",
    stat: "Know your calories",
    quote:
      "Maintenance, fat loss, and surplus ranges with educational next steps — not a dead-end number.",
    author: "TDEE Calculator",
    role: "Tools · Weight Loss",
    defaultImage:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1200&auto=format&fit=crop",
    selectedImage:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1200&auto=format&fit=crop",
    alt: "Healthy meal planning",
  },
  {
    id: "macros",
    stat: "Macros that match goals",
    quote:
      "Turn calorie targets into protein, carbs, and fat — then explore Indian meal ideas.",
    author: "Macro Calculator",
    role: "Tools · Performance",
    defaultImage:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1200&auto=format&fit=crop",
    selectedImage:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop",
    alt: "Macros and training",
  },
];

export function HomePageContent() {
  return (
    <>
      {/* SEO-critical H1 remains in hero for crawlers + users */}
      <section className="relative min-h-[100svh] overflow-hidden">
        <AuroraBackground className="!h-[100svh] bg-brand-50">
          <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-4 pb-16 pt-28 text-center sm:px-6">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm font-medium tracking-wide text-primary"
            >
              Searchable fitness knowledge platform
            </motion.p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Build a stronger body. Understand your{" "}
              <ContainerTextFlip
                words={["nutrition", "training", "recovery", "protein", "calories"]}
                className="mt-2 inline-flex"
                textClassName="text-primary"
              />
            </h1>
            <BlurText
              text="Evidence-informed guides, calculators, foods, and exercises — designed to rank for real questions and help people take the next step."
              delay={80}
              animateBy="words"
              direction="top"
              className="mt-6 max-w-2xl justify-center text-base text-muted-foreground sm:text-lg"
            />
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/nutrition"
                className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90"
              >
                Explore Guides
              </Link>
              <Link
                href="/tools/calorie-calculator"
                className="rounded-full border border-border bg-white px-6 py-3 text-sm font-semibold text-foreground transition hover:border-primary hover:bg-brand-50"
              >
                Calculate Calories
              </Link>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              Read the{" "}
              <PreviewLinkCard href="https://www.who.int/news-room/fact-sheets/detail/healthy-diet">
                <PreviewLinkCardTrigger
                  target="_blank"
                  className="underline text-foreground"
                >
                  WHO healthy diet overview
                </PreviewLinkCardTrigger>
                <PreviewLinkCardContent target="_blank">
                  <PreviewLinkCardImage alt="WHO healthy diet" />
                </PreviewLinkCardContent>
              </PreviewLinkCard>{" "}
              — we cite reputable sources across nutrition content.
            </p>
          </div>
        </AuroraBackground>
      </section>

      <section className="relative border-y border-border bg-white py-20">
        <div className="absolute inset-0 opacity-40">
          <BubbleBackground interactive className="absolute inset-0" />
        </div>
        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground">
              Featured calculators
            </h2>
            <p className="mt-3 text-muted-foreground">
              Tools that answer calculation intent and route users into guides,
              foods, and programs — a core SEO flywheel.
            </p>
          </div>
          <div className="mt-10">
            <CalendlyCarousel items={TOOL_STORIES} autoPlayInterval={7000} />
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            {[
              ["/tools/protein-calculator", "Protein"],
              ["/tools/tdee-calculator", "TDEE"],
              ["/tools/macro-calculator", "Macros"],
              ["/tools/bmi-calculator", "BMI"],
            ].map(([href, label]) => (
              <Link
                key={href}
                href={href}
                className="rounded-full bg-brand-50 px-4 py-2 text-sm font-medium text-foreground ring-1 ring-brand-100 hover:bg-primary hover:text-white"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-50/50 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight">
                Explore fitness topics
              </h2>
              <p className="mt-2 max-w-xl text-muted-foreground">
                Pillar hubs for topical authority — nutrition, fat loss, muscle,
                exercises, Indian foods, and tools.
              </p>
            </div>
            <Link href="/search" className="text-sm font-semibold text-primary">
              Search everything →
            </Link>
          </div>
          <FocusCards cards={PILLARS} />
          <ul className="sr-only">
            {PILLARS.map((p) => (
              <li key={p.href}>
                <Link href={p.href}>{p.title}</Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {PILLARS.map((p) => (
              <Link
                key={p.href}
                href={p.href}
                className="rounded-xl border border-border bg-white px-4 py-3 text-sm font-medium hover:border-primary hover:bg-brand-50"
              >
                {p.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-[#0b2533] py-24 text-center">
        <FoldText
          text="Train with clarity"
          splitBy="char"
          hinge="top"
          trigger="scroll"
          duration={0.65}
          stagger={0.04}
          ease="power3.out"
          perspective={700}
          creaseShading={0.55}
          fontSize="clamp(2.4rem, 8vw, 5.5rem)"
          fontWeight={700}
          color="#E1F5FE"
        />
        <p className="mx-auto mt-6 max-w-xl px-4 text-brand-100">
          From protein questions to exercise technique — every page should push
          you toward the next useful action.
        </p>
        <Link
          href="/muscle-building"
          className="mt-8 inline-flex rounded-full bg-orange-400 px-6 py-3 text-sm font-semibold text-white hover:bg-orange-300"
        >
          Muscle building guides
        </Link>
      </section>
    </>
  );
}
