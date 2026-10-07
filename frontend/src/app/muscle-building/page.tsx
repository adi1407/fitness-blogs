import type { Metadata } from "next";
import Link from "next/link";
import { TrackedHubLink } from "@/components/analytics/TrackedHubLink";
import { FaqAccordion } from "@/features/shared/components/FaqAccordion";
import { JsonLd } from "@/components/seo/JsonLd";
import { PillarGuides } from "@/features/blog/components/PillarGuides";
import { MuscleBuildingVisuals } from "@/features/muscle-building/components/MuscleBuildingVisuals";
import { ARTICLES } from "@/features/tools/content/links";
import { OG_DEFAULTS, breadcrumbLd, faqPageLd } from "@/lib/seo";

export const revalidate = 600;

const TITLE = "How to Build Muscle: A Beginner's Guide";
const DESCRIPTION =
  "How to build muscle: progressive overload, enough protein and calories, sleep and patience. A muscle building guide with Indian diet tips and free tools.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/muscle-building" },
  openGraph: {
    ...OG_DEFAULTS,
    title: `${TITLE} | fitlives`,
    description: DESCRIPTION,
    url: "/muscle-building",
  },
};

const faq = [
  {
    q: "How long does it take to build muscle?",
    a: "Visible changes usually take weeks to months of consistent training, progressive overload, enough protein and calories, and recovery. Beginners often progress faster than advanced lifters.",
  },
  {
    q: "How many sets per week do I need to build muscle?",
    a: "About 10–20 hard sets per muscle group per week works for most people. Beginners can grow well on the lower end; add sets gradually only if progress stalls and you are recovering well.",
  },
  {
    q: "Do I need a bulk to gain muscle?",
    a: "A modest calorie surplus can support faster gains, but beginners can build muscle near maintenance. Large surpluses mainly add fat.",
  },
  {
    q: "How important is protein for hypertrophy?",
    a: "Protein provides amino acids for repair and growth. Around 1.6–2.2 g per kg of body weight a day suits most lifters. Pair it with hard training — protein alone does not build muscle.",
  },
  {
    q: "Can I build muscle on a vegetarian Indian diet?",
    a: "Yes. Paneer, curd, milk, dal, chana, soya chunks and tofu can cover your protein needs when portions are planned across the day. Whey or other protein powders are optional conveniences, not requirements.",
  },
];

const steps = [
  {
    title: "Train each muscle hard, twice a week",
    body: (
      <>
        Muscle grows in response to challenging sets taken close to failure.
        Most people do well with about 10–20 hard sets per muscle group per
        week, split over two or more sessions. Sets of roughly 6–30 reps all
        work if the last few reps are genuinely hard. Browse the{" "}
        <Link href="/exercises" className="fk-link">
          exercise library
        </Link>{" "}
        for movements by muscle group.
      </>
    ),
  },
  {
    title: "Use progressive overload",
    body: (
      <>
        Over weeks, do a little more: an extra rep, a small jump in weight, or
        an extra set. This is the single most important habit in any program;
        our guide on{" "}
        <Link href={ARTICLES.progressiveOverload.href} className="fk-link">
          what progressive overload is
        </Link>{" "}
        shows how to apply it safely, and the{" "}
        <Link href="/one-rep-max-calculator" className="fk-link">
          one rep max calculator
        </Link>{" "}
        helps you pick working weights.
      </>
    ),
  },
  {
    title: "Eat enough protein",
    body: (
      <>
        Around 1.6–2.2 g of protein per kg of body weight a day, spread over
        three to four meals, supports muscle growth for most lifters. Get your
        target from the{" "}
        <Link href="/protein-calculator" className="fk-link">
          protein calculator
        </Link>{" "}
        and read{" "}
        <Link href={ARTICLES.proteinMuscle.href} className="fk-link">
          how much protein to build muscle
        </Link>{" "}
        for the evidence.
      </>
    ),
  },
  {
    title: "Eat enough total calories",
    body: (
      <>
        Muscle is easiest to build at maintenance or in a small surplus of
        about 200–300 kcal a day. Find your maintenance with the{" "}
        <Link href="/tdee-calculator" className="fk-link">
          TDEE calculator
        </Link>
        . A large &ldquo;dirty bulk&rdquo; mostly adds fat you will later need
        to lose.
      </>
    ),
  },
  {
    title: "Sleep, recover and be patient",
    body: (
      <>
        Muscle is built between sessions. Aim for 7–9 hours of sleep and avoid
        training the same muscle hard on consecutive days. Progress is slow but
        steady; see{" "}
        <Link href={ARTICLES.buildMuscleTime.href} className="fk-link">
          how long it takes to build muscle
        </Link>{" "}
        for realistic timelines.
      </>
    ),
  },
];

export default function MuscleBuildingPage() {
  return (
    <main className="fk-page flex-1 py-16">
      <JsonLd
        data={breadcrumbLd([
          ["Home", "/"],
          ["Muscle Building", "/muscle-building"],
        ])}
      />
      <JsonLd data={faqPageLd(faq)} />

      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
        <ol className="flex flex-wrap gap-2">
          <li>
            <Link href="/" className="fk-link-muted">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-foreground">Muscle Building</li>
        </ol>
      </nav>

      <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
        How to build muscle: the fundamentals
      </h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Pillar hub · Educational content · Not medical advice
      </p>

      <aside className="fk-tool-card mt-8 p-6">
        <h2 className="text-lg font-semibold">Quick answer</h2>
        <p className="mt-2 text-muted-foreground">
          To build muscle, train each muscle hard about twice a week and add a
          little weight or reps over time (progressive overload). Eat around
          1.6–2.2 g of protein per kg of body weight, eat at maintenance or a
          small surplus, sleep 7–9 hours, and stay consistent for months.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <TrackedHubLink
            href="/exercises"
            label="Exercise library"
            className="fk-btn-primary rounded-full"
          >
            Exercise library →
          </TrackedHubLink>
          <TrackedHubLink
            href="/protein-calculator"
            label="Protein calculator"
            className="fk-btn-ghost rounded-full"
          >
            Protein calculator
          </TrackedHubLink>
        </div>
      </aside>

      <section className="mt-14">
        <h2 className="text-2xl font-semibold tracking-tight">
          How to build muscle in 5 steps
        </h2>
        <ol className="mt-6 space-y-6">
          {steps.map((step, i) => (
            <li key={step.title} className="flex gap-4">
              <span
                aria-hidden="true"
                className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground"
              >
                {i + 1}
              </span>
              <div>
                <h3 className="text-lg font-semibold">{step.title}</h3>
                <p className="mt-1 leading-relaxed text-muted-foreground">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <MuscleBuildingVisuals />

      <section className="mt-14">
        <h2 className="text-2xl font-semibold tracking-tight">
          A muscle building diet on Indian food
        </h2>
        <div className="mt-4 max-w-3xl space-y-4 leading-relaxed text-muted-foreground">
          <p>
            The main challenge on a typical Indian diet is protein, not
            calories. Dal and roti alone rarely get a lifter to 1.6 g per kg, so
            plan a clear protein source into every meal: paneer, curd or Greek
            yogurt, eggs, chicken or fish, soya chunks, tofu, or a scoop of
            whey if it suits your budget.
          </p>
          <p>
            A simple pattern is three main meals and one or two protein-rich
            snacks, each with roughly a quarter of your daily protein. Our{" "}
            <Link href={ARTICLES.beginnerGymDiet.href} className="fk-link">
              beginner gym diet plan
            </Link>{" "}
            lays this out with Indian meals, and{" "}
            <Link href={ARTICLES.indianProteinFoods.href} className="fk-link">
              the best high-protein Indian foods
            </Link>{" "}
            compares sources by protein per serving. Supplements are optional;
            creatine monohydrate has the strongest evidence, covered in{" "}
            <Link href={ARTICLES.creatineSafe.href} className="fk-link">
              is creatine safe
            </Link>
            .
          </p>
        </div>
      </section>

      <PillarGuides
        category="muscle-building"
        heading="All muscle building guides"
        intro="Every fitlives muscle building article, grouped by topic: training principles, nutrition and realistic timelines."
        path="/muscle-building"
        pageName={TITLE}
        pageDescription={DESCRIPTION}
      />

      <section className="mt-14">
        <h2 className="text-2xl font-semibold">Next steps</h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {[
            {
              href: "/exercises/chest",
              title: "Chest exercises",
              text: "Press and fly patterns for upper-body growth.",
            },
            {
              href: "/exercises/legs",
              title: "Leg exercises",
              text: "Squats, hinges, and accessories for lower body.",
            },
            {
              href: "/nutrition/protein",
              title: "Protein guide",
              text: "Protein needs and the best Indian protein foods.",
            },
            {
              href: "/programs",
              title: "Training programs",
              text: "Structured training plans to follow week to week.",
            },
          ].map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block h-full rounded-xl border border-border bg-card p-5 hover:border-accent hover:bg-accent-soft/40"
              >
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.text}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <FaqAccordion
        className="mt-16"
        items={faq.map((item) => ({
          question: item.q,
          answer: item.a,
        }))}
        title="Muscle building FAQs"
      />

      <p className="mt-12 text-xs text-muted-foreground">
        Educational information only. See our{" "}
        <Link href="/medical-disclaimer" className="underline">
          medical disclaimer
        </Link>
        .
      </p>
    </main>
  );
}
