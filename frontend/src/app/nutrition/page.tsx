import type { Metadata } from "next";
import Link from "next/link";
import { TrackedHubLink } from "@/components/analytics/TrackedHubLink";
import { JsonLd } from "@/components/seo/JsonLd";
import { PillarGuides } from "@/features/blog/components/PillarGuides";
import { NutritionFocusCards } from "@/features/nutrition/components/NutritionFocusCards";
import { FaqAccordion } from "@/features/shared/components/FaqAccordion";
import { ARTICLES } from "@/features/tools/content/links";
import { OG_DEFAULTS, breadcrumbLd, faqPageLd } from "@/lib/seo";

export const revalidate = 600;

const TITLE = "Nutrition Guide: Healthy Eating for Indians";
const DESCRIPTION =
  "A practical nutrition guide for Indian diets: calories, protein, carbs, fats, water and meal planning, with free calculators and an Indian food database.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/nutrition" },
  openGraph: {
    ...OG_DEFAULTS,
    title: `${TITLE} | fitlives`,
    description: DESCRIPTION,
    url: "/nutrition",
  },
};

const faq = [
  {
    q: "What is a balanced Indian diet?",
    a: "A balanced Indian plate has a measured portion of grains (roti, rice, millets), a clear protein source (dal, paneer, curd, eggs, chicken or fish), plenty of vegetables, and a modest amount of oil or ghee. Adjust portions to your calorie needs and goal.",
  },
  {
    q: "How many calories do I need per day?",
    a: "It depends on your size, age, sex and activity. Many adults fall somewhere between about 1,600 and 2,800 kcal a day. Use a calorie or TDEE calculator for a personal estimate, then adjust based on how your weight changes over a few weeks.",
  },
  {
    q: "Is it hard to get enough protein on a vegetarian Indian diet?",
    a: "It takes planning rather than special foods. Dal and roti alone are usually not enough for active people, so add paneer, curd or Greek yogurt, milk, soya chunks, tofu or chana to most meals.",
  },
  {
    q: "Are carbs or fats bad for you?",
    a: "Neither is bad in itself. Total calories, food quality and portion sizes matter far more. Most people do well getting roughly 45–65% of calories from carbs and 20–35% from fat, adjusted to preference and activity.",
  },
];

const basics = [
  {
    title: "Calories set the direction",
    body: (
      <>
        Eating more than you burn leads to weight gain, less leads to weight
        loss, regardless of which foods the calories come from. Start with the{" "}
        <Link href="/calorie-calculator" className="fk-link">
          calorie calculator
        </Link>{" "}
        or the{" "}
        <Link href="/tdee-calculator" className="fk-link">
          TDEE calculator
        </Link>{" "}
        to find your maintenance level.
      </>
    ),
  },
  {
    title: "Protein protects muscle",
    body: (
      <>
        The Indian RDA for sedentary adults is about 0.8 g of protein per kg of
        body weight; active people and lifters benefit from more, roughly
        1.2–2.2 g/kg. Read{" "}
        <Link href={ARTICLES.proteinPerDay.href} className="fk-link">
          how much protein you need per day
        </Link>{" "}
        or go straight to the{" "}
        <Link href="/protein-calculator" className="fk-link">
          protein calculator
        </Link>
        .
      </>
    ),
  },
  {
    title: "Carbs and fats fill the rest",
    body: (
      <>
        Once calories and protein are set, split the remainder between carbs
        and fats to suit your taste and training. The{" "}
        <Link href="/macro-calculator" className="fk-link">
          macro calculator
        </Link>{" "}
        does the maths. Cooking fats count too: our guide asks{" "}
        <Link href={ARTICLES.gheeGood.href} className="fk-link">
          is ghee good for you
        </Link>
        .
      </>
    ),
  },
  {
    title: "Water, fibre and micronutrients",
    body: (
      <>
        Vegetables, fruit, pulses and whole grains supply fibre, vitamins and
        minerals that calorie counts miss. Hydration needs vary with heat and
        activity; see{" "}
        <Link href={ARTICLES.waterPerDay.href} className="fk-link">
          how much water you should drink a day
        </Link>{" "}
        or use the{" "}
        <Link href="/water-intake-calculator" className="fk-link">
          water intake calculator
        </Link>
        .
      </>
    ),
  },
];

const topics = [
  {
    href: "/nutrition/protein",
    title: "Protein",
    text: "Protein needs by goal and the best Indian protein foods.",
  },
  {
    href: "/nutrition/calories",
    title: "Calories",
    text: "How many calories you need, targets by goal and calories in Indian food.",
  },
  {
    href: "/macro-calculator",
    title: "Macros",
    text: "Turn calories into protein, carbs, and fat for your goal.",
  },
  {
    href: "/foods/indian",
    title: "Indian nutrition",
    text: "Practical macros for roti, dal, paneer, eggs, and vegetarian building blocks.",
  },
];

export default function NutritionPage() {
  return (
    <main className="fk-page flex-1 py-16">
      <JsonLd data={breadcrumbLd([["Home", "/"], ["Nutrition", "/nutrition"]])} />
      <JsonLd data={faqPageLd(faq)} />

      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
        <ol className="flex flex-wrap gap-2">
          <li>
            <Link href="/" className="fk-link-muted">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-foreground">Nutrition</li>
        </ol>
      </nav>

      <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
        Nutrition guide: healthy eating for Indian diets
      </h1>
      <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
        Clear, evidence-informed answers on calories, protein, carbs, fats and
        hydration, built around the food people in India actually eat, with
        calculators whenever you need a number.
      </p>

      <aside className="fk-tool-card mt-8 p-6">
        <h2 className="text-lg font-semibold">Quick answer</h2>
        <p className="mt-2 text-muted-foreground">
          Good nutrition comes down to four things: the right amount of calories
          for your goal, enough protein, mostly whole foods for carbs and fats,
          and enough water and fibre. Start with your calorie and protein
          targets, then build meals from familiar Indian staples.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <TrackedHubLink
            href="/nutrition/protein"
            label="Protein guide"
            className="fk-btn-primary rounded-full"
          >
            Protein guide
          </TrackedHubLink>
          <TrackedHubLink
            href="/protein-calculator"
            label="Protein calculator"
            className="fk-btn-ghost rounded-full"
          >
            Protein calculator
          </TrackedHubLink>
          <TrackedHubLink
            href="/foods/indian"
            label="Indian foods"
            className="fk-btn-ghost rounded-full"
          >
            Indian foods
          </TrackedHubLink>
        </div>
      </aside>

      <section className="mt-14">
        <h2 className="text-2xl font-semibold tracking-tight">
          Nutrition basics in four steps
        </h2>
        <ol className="mt-6 space-y-6">
          {basics.map((item, i) => (
            <li key={item.title} className="flex gap-4">
              <span
                aria-hidden="true"
                className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground"
              >
                {i + 1}
              </span>
              <div>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-1 leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <NutritionFocusCards />

      <section className="mt-14">
        <h2 className="text-2xl font-semibold tracking-tight">
          Building a healthy Indian plate
        </h2>
        <div className="mt-4 max-w-3xl space-y-4 leading-relaxed text-muted-foreground">
          <p>
            Most Indian meals are carb-heavy and protein-light. A simple fix is
            to fill about half the plate with vegetables or salad, a quarter
            with a protein source (dal, paneer, curd, eggs, chicken or fish) and
            a quarter with roti, rice or millets. Measure oil and ghee rather
            than pouring them; they are the easiest calories to over-eat.
          </p>
          <p>
            For exact numbers, look foods up in the{" "}
            <Link href="/foods/indian" className="fk-link">
              Indian food calorie database
            </Link>
            , or compare common staples in{" "}
            <Link href={ARTICLES.indianProteinFoods.href} className="fk-link">
              best high-protein Indian foods
            </Link>
            . If you train, our guide on{" "}
            <Link href={ARTICLES.proteinTiming.href} className="fk-link">
              protein before or after a workout
            </Link>{" "}
            covers meal timing.
          </p>
        </div>
      </section>

      <PillarGuides
        category="nutrition"
        heading="All nutrition guides"
        intro="Every fitlives nutrition article, grouped by topic. Each one answers a single question in depth, with sources."
        path="/nutrition"
        pageName={TITLE}
        pageDescription={DESCRIPTION}
      />

      <section className="mt-14">
        <h2 className="text-2xl font-semibold">Core topics</h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {topics.map((topic) => (
            <li key={topic.href}>
              <Link
                href={topic.href}
                className="fk-panel block p-5 transition hover:border-accent"
              >
                <h3 className="text-lg font-semibold">{topic.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{topic.text}</p>
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
        title="Nutrition FAQs"
      />

      <p className="mt-12 text-xs text-muted-foreground">
        Educational information only. If you have a medical condition, are
        pregnant, or take medication, talk to a doctor or registered dietitian
        before changing your diet. See our{" "}
        <Link href="/medical-disclaimer" className="underline">
          medical disclaimer
        </Link>
        .
      </p>
    </main>
  );
}
