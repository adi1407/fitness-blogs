import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { ContainerTextFlip } from "@/components/ui/container-text-flip";
import BlurText from "@/components/ui/blur-text";
import TailwindImageAccordion, {
  type AccordionItem,
} from "@/components/ui/tailwind-image-accordion";
import { AboutRadialIntro } from "@/features/about/components/AboutRadialIntro";
import { SocialFollow } from "@/components/shared/SocialFollow";
import { HUB } from "@/lib/hubImages";

export const metadata: Metadata = {
  title: "About fitlives — Fitness Knowledge Platform",
  description:
    "Why fitlives exists: evidence-informed fitness and nutrition content, calculators, Indian foods, exercises, and transparent editorial standards.",
  alternates: { canonical: "/about" },
};

const PILLAR_ACCORDION: AccordionItem[] = [
  {
    id: "muscle-building",
    url: HUB.deadlift,
    title: "Muscle Building",
    description: "Hypertrophy & strength",
    href: "/muscle-building",
  },
  {
    id: "weight-loss",
    url: HUB.outdoorRun,
    title: "Weight Loss",
    description: "Deficit done right",
    href: "/weight-loss",
  },
  {
    id: "nutrition",
    url: HUB.chickenBowl,
    title: "Nutrition",
    description: "Protein, macros & meals",
    href: "/nutrition",
  },
];

const SECONDARY_HUBS = [
  {
    title: "Calculators",
    blurb: "Educational tools that teach and link into guides.",
    src: HUB.healthConsult,
    href: "/tools",
  },
  {
    title: "Indian Foods",
    blurb: "High-protein staples mapped to real goals.",
    src: HUB.indianThali,
    href: "/foods/indian",
  },
  {
    title: "Exercises",
    blurb: "Browse by muscle group, then connect to guidance.",
    src: HUB.gymFloor,
    href: "/exercises",
  },
];

export default function AboutPage() {
  return (
    <main className="flex w-full flex-1 flex-col">
      <section className="relative min-h-[70svh] overflow-visible border-b border-border">
        <AuroraBackground className="!min-h-[70svh] overflow-visible bg-brand-50">
          <div className="relative z-10 fk-page flex flex-col items-center py-16 text-center">
            <p className="text-sm font-medium tracking-wide text-primary">
              About the platform
            </p>
            <h1 className="mt-3 max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl">
              Build a stronger body. Understand your{" "}
              <ContainerTextFlip
                words={["nutrition", "training", "recovery", "protein", "calories"]}
                className="mt-2 inline-flex"
                textClassName="text-primary"
              />
            </h1>
            <BlurText
              text="fitlives is a searchable fitness knowledge platform — articles, guides, calculators, foods, and exercises — designed to answer real questions better than a thin blog post."
              delay={40}
              animateBy="words"
              direction="top"
              className="mt-6 max-w-2xl justify-center text-lg leading-relaxed text-muted-foreground"
            />
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/"
                className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
              >
                Latest guides
              </Link>
              <Link
                href="/tools"
                className="rounded-full border border-border bg-white px-5 py-2.5 text-sm font-semibold text-foreground hover:border-primary"
              >
                Free calculators
              </Link>
            </div>
            <AboutRadialIntro />
          </div>
        </AuroraBackground>
      </section>

      <section className="fk-page py-14">
        <h2 className="text-2xl font-semibold tracking-tight">
          Three knowledge pillars
        </h2>
        <p className="mt-2 max-w-xl text-muted-foreground">
          Everything we publish sits under muscle building, weight loss or
          nutrition, so related guides are always one click apart.
        </p>
        <div className="mt-8">
          <TailwindImageAccordion items={PILLAR_ACCORDION} />
        </div>
      </section>

      <section className="border-y border-border bg-white">
        <div className="fk-page py-14">
          <h2 className="text-2xl font-semibold tracking-tight">
            Tools & databases
          </h2>
          <p className="mt-2 max-w-xl text-muted-foreground">
            Free calculators, an Indian food database and an exercise library
            that turn the guides into numbers and plans you can use.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {SECONDARY_HUBS.map((hub) => (
              <Link
                key={hub.href}
                href={hub.href}
                className="group overflow-hidden rounded-2xl border border-border bg-brand-50/40 transition hover:border-primary"
              >
                <Image
                  src={hub.src}
                  alt=""
                  width={640}
                  height={288}
                  sizes="(min-width: 640px) 33vw, 100vw"
                  className="h-36 w-full object-cover transition group-hover:scale-[1.02]"
                />
                <div className="px-4 py-3">
                  <p className="text-sm font-semibold text-foreground">
                    {hub.title}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {hub.blurb}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="fk-page py-14">
        <div className="article-body max-w-3xl">
          <h2>Why fitlives exists</h2>
          <p>
            Most fitness advice online is written for Western diets, hidden
            behind vague claims, or spread thin across short posts that never
            answer the question. fitlives aims to fix that for Indian readers:
            clear answers built on evidence, with real numbers for the foods
            you actually eat — dal, roti, rice, paneer, curd and more.
          </p>
          <h2>What you&apos;ll find here</h2>
          <ul>
            <li>
              <strong>Guides and articles</strong> on muscle building, weight
              loss and nutrition, each starting with a quick answer and
              going into the detail.
            </li>
            <li>
              <strong>An Indian food database</strong> with calories, protein
              and nutrients per 100 g and per serving, based on the Indian Food
              Composition Tables (IFCT 2017).
            </li>
            <li>
              <strong>An exercise library</strong> with step-by-step technique,
              common mistakes and sets-and-reps guidance.
            </li>
            <li>
              <strong>Free calculators</strong> for calories, protein, macros,
              TDEE, water intake and more — each explaining what the result
              means.
            </li>
            <li>
              <strong>Programs and recipes</strong> that put the principles
              into weekly plans and measured, high-protein meals.
            </li>
          </ul>
          <h2>How we create content</h2>
          <p>
            Health and nutrition claims are checked against peer-reviewed
            research and guidance from bodies such as the WHO, ICMR-NIN and
            sports-science organisations, and sources are listed on each
            article. Articles show who wrote them and, where applicable, who
            reviewed them. We update pages when the evidence changes and
            correct mistakes openly.
          </p>
          <p>
            Our content is educational. It isn&apos;t medical advice, and we
            don&apos;t make cure claims or recommend medication. If you have a
            medical condition, are pregnant or take medication, talk to a
            qualified professional before changing your diet or training.
          </p>
          <h2>How fitlives is funded</h2>
          <p>
            fitlives is free to read. We may show display advertising to cover
            running costs, and advertisers never influence what we write or
            recommend. We currently have no paid affiliate links; if that
            changes, we will say so on our affiliate disclosure page.
          </p>
          <h2>Our principles</h2>
          <ul>
            <li>Answer the reader&apos;s question first, clearly and completely</li>
            <li>Cite reputable sources for health and nutrition claims</li>
            <li>Educate rather than make medical promises</li>
            <li>Use Indian foods, portions and budgets in every example</li>
            <li>Link guides to the tools and data you need to act on them</li>
          </ul>
        </div>
        <div className="mt-8 flex flex-wrap gap-4 text-sm font-semibold text-primary">
          <Link href="/editorial-policy" className="hover:underline">
            Editorial policy
          </Link>
          <Link href="/medical-disclaimer" className="hover:underline">
            Medical disclaimer
          </Link>
          <Link href="/terms" className="hover:underline">
            Terms
          </Link>
          <Link href="/privacy" className="hover:underline">
            Privacy
          </Link>
          <Link href="/authors" className="hover:underline">
            Authors
          </Link>
          <Link href="/blog" className="hover:underline">
            Latest articles
          </Link>
          <Link href="/corrections" className="hover:underline">
            Corrections
          </Link>
          <Link href="/affiliate-disclosure" className="hover:underline">
            Affiliate disclosure
          </Link>
          <Link href="/contact" className="hover:underline">
            Contact
          </Link>
        </div>
        <SocialFollow
          variant="strip"
          placement="about"
          className="mt-10"
          title="Follow our work"
          description="New guides, myth-busting reels and Indian nutrition tips — every week on Instagram and Facebook."
        />
      </section>
    </main>
  );
}
