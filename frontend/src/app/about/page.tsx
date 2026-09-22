import type { Metadata } from "next";
import Link from "next/link";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { ContainerTextFlip } from "@/components/ui/container-text-flip";
import BlurText from "@/components/ui/blur-text";
import TailwindImageAccordion, {
  type AccordionItem,
} from "@/components/ui/tailwind-image-accordion";
import { AboutRadialIntro } from "@/features/about/components/AboutRadialIntro";
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
    href: "/blog/muscle-building",
  },
  {
    id: "weight-loss",
    url: HUB.outdoorRun,
    title: "Weight Loss",
    description: "Deficit done right",
    href: "/blog/weight-loss",
  },
  {
    id: "nutrition",
    url: HUB.chickenBowl,
    title: "Nutrition",
    description: "Protein, macros & meals",
    href: "/blog/nutrition",
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
          Deep clusters for topical authority — muscle building, weight loss,
          and nutrition — with articles under each subcategory.
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
            Calculators and libraries that complement the blog — the product
            flywheel beyond articles alone.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {SECONDARY_HUBS.map((hub) => (
              <Link
                key={hub.href}
                href={hub.href}
                className="group overflow-hidden rounded-2xl border border-border bg-brand-50/40 transition hover:border-primary"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={hub.src}
                  alt=""
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
        <h2 className="text-2xl font-semibold tracking-tight">
          Editorial philosophy
        </h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-muted-foreground">
          <li>Search intent first, keywords second</li>
          <li>Cite reputable sources for health and nutrition claims</li>
          <li>Prefer educational framing over medical promises</li>
          <li>Build topic clusters that interconnect with tools and databases</li>
          <li>Highlight Indian nutrition context as a differentiator</li>
        </ul>
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
          <Link href="/contact" className="hover:underline">
            Contact
          </Link>
        </div>
      </section>
    </main>
  );
}
