import type { Metadata } from "next";
import Link from "next/link";
import { TrackedHubLink } from "@/components/analytics/TrackedHubLink";
import { FaqAccordion } from "@/features/shared/components/FaqAccordion";
import { JsonLd } from "@/components/seo/JsonLd";
import { PillarGuides } from "@/features/blog/components/PillarGuides";
import { ProteinTracingBeam } from "@/features/nutrition/components/ProteinTracingBeam";
import { ARTICLES, FOODS } from "@/features/tools/content/links";
import { OG_DEFAULTS, breadcrumbLd, faqPageLd } from "@/lib/seo";

export const revalidate = 600;

const TITLE = "Protein Guide: Best Protein Foods in India";
const DESCRIPTION =
  "A protein guide for Indian diets: what protein does, how much you need by goal, and the best veg and non-veg protein foods in India, with a free calculator.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/nutrition/protein" },
  openGraph: {
    ...OG_DEFAULTS,
    title: `${TITLE} | fitlives`,
    description: DESCRIPTION,
    url: "/nutrition/protein",
  },
};

const faq = [
  {
    q: "What are the best vegetarian protein sources in India?",
    a: "Paneer, soya chunks, Greek yogurt or hung curd, tofu, milk, dal, chana, rajma and sprouts. Paneer, soya and Greek yogurt give the most protein per serving; dals and legumes add protein plus fibre.",
  },
  {
    q: "How much protein do I need per day?",
    a: "Sedentary adults need roughly 0.8–1.2 g per kg of body weight. People who strength train, or who are losing weight and want to keep muscle, generally do well on about 1.6–2.2 g/kg. The protein calculator gives a personal estimate.",
  },
  {
    q: "Is more protein always better for muscle growth?",
    a: "No. Benefits level off at around 1.6 g/kg on average, with some people benefiting up to about 2.2 g/kg. Training, total calories and sleep matter as much as extra protein.",
  },
  {
    q: "Do I need protein powder?",
    a: "No. Whey and plant protein powders are a convenient way to top up, not a requirement. If you buy whey in India, choose a brand with third-party lab testing.",
  },
];

const foods: ReadonlyArray<[string, string, string]> = [
  ["Chicken breast", "100 g cooked", "25–31 g"],
  ["Paneer", "100 g", "18–21 g"],
  ["Greek yogurt / hung curd", "200 g", "16–20 g"],
  ["Soya chunks (dry)", "30–50 g", "15–25 g"],
  ["Tofu (firm)", "100 g", "12–17 g"],
  ["Eggs", "2 large", "12–13 g"],
  ["Cooked dal", "1 cup", "10–15 g"],
  ["Sprouts", "1–1.5 cups", "10–15 g"],
  ["Milk", "250 ml", "8–9 g"],
  ["Curd", "200 g", "6–8 g"],
];

export default function ProteinHubPage() {
  return (
    <main className="fk-page flex-1 py-16">
      <JsonLd
        data={breadcrumbLd([
          ["Home", "/"],
          ["Nutrition", "/nutrition"],
          ["Protein", "/nutrition/protein"],
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
          <li>
            <Link href="/nutrition" className="fk-link-muted">
              Nutrition
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-foreground">Protein</li>
        </ol>
      </nav>

      <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
        Protein guide: best protein foods in India
      </h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Pillar hub · Educational content · Not medical advice
      </p>

      <aside className="fk-tool-card mt-8 p-6">
        <h2 className="text-lg font-semibold text-foreground">Quick answer</h2>
        <p className="mt-2 text-muted-foreground">
          Most people who train do well on about 1.6–2.2 g of protein per kg of
          body weight a day, spread over three to four meals. In India, the
          easiest high-protein foods are chicken, eggs, paneer, Greek yogurt,
          soya chunks and tofu, with dal, chana and milk filling the gaps.
        </p>
        <TrackedHubLink
          href="/protein-calculator"
          label="Calculate protein requirement"
          className="fk-btn-accent mt-4 rounded-full"
        >
          Calculate your protein requirement →
        </TrackedHubLink>
      </aside>

      <ProteinTracingBeam>
        <section className="mt-12 prose-none pl-4 sm:pl-8">
          <h2 className="text-2xl font-semibold">On this page</h2>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-muted-foreground">
            <li>
              <a href="#what-protein-does" className="hover:text-foreground">
                What protein does
              </a>
            </li>
            <li>
              <a href="#requirements" className="hover:text-foreground">
                Protein requirements by goal
              </a>
            </li>
            <li>
              <a href="#foods" className="hover:text-foreground">
                Best protein foods in India
              </a>
            </li>
            <li>
              <a href="#vegetarian" className="hover:text-foreground">
                Vegetarian protein tips
              </a>
            </li>
            <li>
              <a href="#guides" className="hover:text-foreground">
                Protein guides
              </a>
            </li>
          </ol>
        </section>

        <section id="what-protein-does" className="mt-12 scroll-mt-24 pl-4 sm:pl-8">
          <h2 className="text-2xl font-semibold">What protein does</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Protein provides amino acids used for tissue repair, enzymes and
            hormones, and, when paired with training, muscle protein synthesis.
            It is also the most filling macronutrient, which is why higher
            protein makes a calorie deficit easier to stick to. It is one part
            of a complete diet that also includes the right total calories,
            carbs, fats, fibre and micronutrients.
          </p>
        </section>

        <section id="requirements" className="mt-12 scroll-mt-24 pl-4 sm:pl-8">
          <h2 className="text-2xl font-semibold">Protein requirements by goal</h2>
          <div className="mt-6 overflow-x-auto rounded-xl border border-border">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-brand-50">
                <tr>
                  <th className="px-4 py-3 font-semibold">Goal</th>
                  <th className="px-4 py-3 font-semibold">Typical target</th>
                  <th className="px-4 py-3 font-semibold">Learn more</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-border">
                  <td className="px-4 py-3">General health</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    0.8–1.2 g/kg a day
                  </td>
                  <td className="px-4 py-3">
                    <Link href={ARTICLES.proteinPerDay.href} className="text-primary">
                      Protein per day
                    </Link>
                  </td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-4 py-3">Muscle building</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    1.6–2.2 g/kg with progressive training
                  </td>
                  <td className="px-4 py-3">
                    <Link href={ARTICLES.proteinMuscle.href} className="text-primary">
                      Protein for muscle
                    </Link>
                  </td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-4 py-3">Fat loss</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    1.6–2.2 g/kg to protect muscle in a deficit
                  </td>
                  <td className="px-4 py-3">
                    <Link href="/weight-loss" className="text-primary">
                      Weight loss guide
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            For the full evidence, read{" "}
            <Link href={ARTICLES.proteinPerDay.href} className="fk-link">
              how much protein you need per day
            </Link>
            , or get a personal number from the{" "}
            <Link href="/protein-calculator" className="fk-link">
              protein calculator
            </Link>
            . If you have kidney disease, ask your doctor before raising
            protein.
          </p>
        </section>

        <section id="foods" className="mt-12 scroll-mt-24 pl-4 sm:pl-8">
          <h2 className="text-2xl font-semibold">Best protein foods in India</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Approximate protein per common serving. Values vary by brand,
            recipe and cooking method; check exact numbers in the{" "}
            <Link href="/foods/indian" className="fk-link">
              Indian food database
            </Link>
            .
          </p>
          <div className="mt-6 overflow-x-auto rounded-xl border border-border">
            <table className="min-w-full text-left text-sm">
              <caption className="sr-only">
                Approximate protein per serving of common Indian foods
              </caption>
              <thead className="bg-brand-50">
                <tr>
                  <th className="px-4 py-3 font-semibold">Food</th>
                  <th className="px-4 py-3 font-semibold">Serving</th>
                  <th className="px-4 py-3 font-semibold">Protein</th>
                </tr>
              </thead>
              <tbody>
                {foods.map(([food, serving, protein]) => (
                  <tr key={food} className="border-t border-border">
                    <td className="px-4 py-3">{food}</td>
                    <td className="px-4 py-3 text-muted-foreground">{serving}</td>
                    <td className="px-4 py-3">{protein}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            See the detailed breakdowns for{" "}
            <Link href={FOODS.paneer.href} className="fk-link">
              paneer
            </Link>
            ,{" "}
            <Link href={FOODS.chickenBreast.href} className="fk-link">
              chicken breast
            </Link>
            ,{" "}
            <Link href={FOODS.boiledEgg.href} className="fk-link">
              boiled eggs
            </Link>{" "}
            and{" "}
            <Link href={FOODS.moongDal.href} className="fk-link">
              moong dal
            </Link>
            , or our ranked list of{" "}
            <Link href={ARTICLES.indianProteinFoods.href} className="fk-link">
              the best high-protein Indian foods
            </Link>
            .
          </p>
        </section>

        <section id="vegetarian" className="mt-12 scroll-mt-24 pl-4 sm:pl-8">
          <h2 className="text-2xl font-semibold">Vegetarian protein tips</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-muted-foreground">
            <li>
              Put a dense protein source in every meal: paneer, tofu, soya,
              Greek yogurt or a large serving of dal.
            </li>
            <li>
              Pair grains and pulses (dal-rice, rajma-chawal, khichdi) for a
              more complete amino acid mix across the day.
            </li>
            <li>
              Swap regular curd for hung curd or Greek yogurt to roughly double
              the protein per bowl.
            </li>
            <li>
              Keep roasted chana, sprouts or a glass of milk as snacks instead
              of biscuits or namkeen.
            </li>
            <li>
              Protein powder is optional; if you use whey, read{" "}
              <Link href={ARTICLES.wheySafe.href} className="fk-link">
                is whey protein safe
              </Link>{" "}
              first. For training days, see{" "}
              <Link href={ARTICLES.proteinTiming.href} className="fk-link">
                protein before or after a workout
              </Link>
              .
            </li>
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/protein-calculator"
              className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white"
            >
              Protein calculator
            </Link>
            <Link
              href="/macro-calculator"
              className="rounded-full border border-border px-4 py-2 text-sm font-semibold"
            >
              Macro calculator
            </Link>
            <Link
              href="/foods/indian"
              className="rounded-full border border-border px-4 py-2 text-sm font-semibold"
            >
              Indian high-protein foods
            </Link>
          </div>
        </section>

        <div className="pl-4 sm:pl-8">
          <PillarGuides
            category="nutrition"
            subcategories={["protein", "sports-nutrition"]}
            heading="Protein guides"
            intro="Every fitlives article on protein: daily needs, food-by-food breakdowns, timing and supplement safety."
            path="/nutrition/protein"
            pageName={TITLE}
            pageDescription={DESCRIPTION}
          />
        </div>

        <FaqAccordion
          className="mt-12 pl-4 sm:pl-8"
          variant="stacked"
          items={faq.map((item) => ({
            question: item.q,
            answer: item.a,
          }))}
          title="Protein FAQs"
        />

        <p className="mt-12 pl-4 text-xs text-muted-foreground sm:pl-8">
          Educational information only. See our{" "}
          <Link href="/medical-disclaimer" className="underline">
            medical disclaimer
          </Link>
          .
        </p>
      </ProteinTracingBeam>
    </main>
  );
}
