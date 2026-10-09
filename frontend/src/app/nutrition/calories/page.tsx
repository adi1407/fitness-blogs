import type { Metadata } from "next";
import Link from "next/link";
import { TrackedHubLink } from "@/components/analytics/TrackedHubLink";
import { JsonLd } from "@/components/seo/JsonLd";
import { PillarGuides } from "@/features/blog/components/PillarGuides";
import { FaqAccordion } from "@/features/shared/components/FaqAccordion";
import { ARTICLES, CALCULATORS, FOODS } from "@/features/tools/content/links";
import { OG_DEFAULTS, breadcrumbLd, faqPageLd } from "@/lib/seo";

export const revalidate = 600;

const PATH = "/nutrition/calories";
const TITLE = "Calories Guide: How Many Calories Do You Need?";
const DESCRIPTION =
  "How many calories you need a day, explained for Indian diets: BMR, TDEE and maintenance, calorie targets to lose or gain weight, and calories in everyday Indian food.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: {
    ...OG_DEFAULTS,
    title: `${TITLE} | fitlives`,
    description: DESCRIPTION,
    url: PATH,
  },
};

const faq = [
  {
    q: "How many calories should I eat a day?",
    a: "It depends on your size, age, sex and activity. ICMR-NIN estimates about 2,100 kcal a day for a sedentary 65 kg Indian man and about 1,650 kcal for a sedentary 55 kg woman, rising with activity. A calorie calculator gives a personal starting point; two to three weeks of weigh-ins tell you whether it is right.",
  },
  {
    q: "How many calories should I eat to lose weight?",
    a: "Eat about 10–20% below your maintenance calories, which is usually 300–500 kcal less than maintenance. That typically produces 0.25–0.5 kg of fat loss a week. Very low intakes are hard to sustain and make it harder to keep muscle.",
  },
  {
    q: "Is 1,200 calories a day enough?",
    a: "For most adults, no. 1,200 kcal is below the needs of nearly every man and most active women, and makes it hard to get enough protein and micronutrients. Use it only with guidance from a doctor or registered dietitian.",
  },
  {
    q: "Do I need to count calories to lose weight?",
    a: "No, but you need to eat less than you burn. Counting for two to four weeks teaches you what portions look like; after that, many people manage with consistent meals, portion habits and a weekly weigh-in.",
  },
  {
    q: "Are all calories the same?",
    a: "For body weight, a calorie is a calorie. For hunger, muscle and health, the source matters: protein and fibre-rich foods keep you fuller for fewer calories than fried snacks, sweets or sugary drinks.",
  },
];

const icmrRows: ReadonlyArray<[string, string, string]> = [
  ["Sedentary", "≈ 2,110 kcal", "≈ 1,660 kcal"],
  ["Moderately active", "≈ 2,710 kcal", "≈ 2,130 kcal"],
  ["Heavy activity", "≈ 3,470 kcal", "≈ 2,720 kcal"],
];

const foodRows: ReadonlyArray<[string, string, string, string?]> = [
  ["Roti", "1 medium (30 g atta)", "96 kcal", FOODS.roti.href],
  ["Rice", "1 katori cooked (50 g raw)", "178 kcal", FOODS.rice.href],
  ["Moong dal", "1 katori cooked (30 g dry)", "98 kcal", FOODS.moongDal.href],
  ["Rajma", "1 katori cooked (40 g dry)", "120 kcal", "/foods/rajma"],
  ["Paneer", "50 g (about 4 cubes)", "129 kcal", FOODS.paneer.href],
  ["Boiled egg", "1 egg", "67 kcal", FOODS.boiledEgg.href],
  ["Chicken breast", "100 g raw", "168 kcal", FOODS.chickenBreast.href],
  ["Poha", "1 plate (50 g dry), before oil", "177 kcal", "/foods/poha"],
  ["Cow milk", "1 glass (200 ml)", "146 kcal", "/foods/cow-milk"],
  ["Banana", "1 medium", "105 kcal", "/foods/banana"],
  ["Peanuts", "1 handful (30 g)", "156 kcal", "/foods/peanuts"],
  ["Ghee", "1 teaspoon (5 g)", "44 kcal", "/foods/ghee"],
];

const weightLossGuides = [
  ARTICLES.caloriesToLoseWeight,
  ARTICLES.calorieDeficit,
  ARTICLES.lose10kg,
  ARTICLES.plan1500,
  ARTICLES.indianDietPlan,
  ARTICLES.notLosingWeight,
];

const tools = [
  CALCULATORS.calorie,
  CALCULATORS.tdee,
  CALCULATORS.bmr,
  CALCULATORS.deficit,
  CALCULATORS.macro,
  CALCULATORS.steps,
];

const toc = [
  ["what-is-a-calorie", "What a calorie is"],
  ["how-many", "How many calories you need"],
  ["targets", "Calorie targets by goal"],
  ["indian-foods", "Calories in Indian foods"],
  ["tracking", "How to track without obsessing"],
  ["tools", "Calorie calculators"],
  ["guides", "Calorie guides"],
] as const;

export default function CaloriesHubPage() {
  return (
    <main className="fk-page flex-1 py-16">
      <JsonLd
        data={breadcrumbLd([
          ["Home", "/"],
          ["Nutrition", "/nutrition"],
          ["Calories", PATH],
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
          <li className="text-foreground">Calories</li>
        </ol>
      </nav>

      <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
        Calories guide: how many calories do you need?
      </h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Pillar hub · Educational content · Not medical advice
      </p>

      <aside className="fk-tool-card mt-8 p-6">
        <h2 className="text-lg font-semibold text-foreground">Quick answer</h2>
        <p className="mt-2 text-muted-foreground">
          Most Indian adults need roughly 1,600–2,200 kcal a day if they sit for
          most of it, and more if they are active. Your own number is your
          maintenance calories (TDEE). To lose weight, eat about 10–20% below
          it; to build muscle, about 5–10% above it. Calculate a starting point,
          then adjust it with two to three weeks of weigh-ins.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <TrackedHubLink
            href="/calorie-calculator"
            label="Calculate daily calories"
            className="fk-btn-accent rounded-full"
          >
            Calculate your daily calories →
          </TrackedHubLink>
          <TrackedHubLink
            href="/calorie-deficit-calculator"
            label="Calorie deficit calculator"
            className="fk-btn-ghost rounded-full"
          >
            Calorie deficit calculator
          </TrackedHubLink>
        </div>
      </aside>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold">On this page</h2>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-muted-foreground">
          {toc.map(([id, label]) => (
            <li key={id}>
              <a href={`#${id}`} className="hover:text-foreground">
                {label}
              </a>
            </li>
          ))}
        </ol>
      </section>

      <section id="what-is-a-calorie" className="mt-12 scroll-mt-24">
        <h2 className="text-2xl font-semibold">What a calorie is</h2>
        <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">
          A calorie (strictly a kilocalorie, kcal) is a unit of energy. Food
          labels and calculators use kcal. Protein and carbohydrate give about 4
          kcal per gram, fat about 9 kcal per gram, and alcohol about 7. If you
          regularly eat more energy than you use, the extra is stored, mostly as
          fat; if you eat less, your body draws on its stores and you lose
          weight. That balance decides weight change. What you eat decides how
          full you feel, how much muscle you keep and how healthy you are.
        </p>
      </section>

      <section id="how-many" className="mt-12 scroll-mt-24">
        <h2 className="text-2xl font-semibold">How many calories you need</h2>
        <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">
          Your daily need has two parts. <strong>BMR</strong> is what your body
          burns at complete rest, keeping you alive. <strong>TDEE</strong>{" "}
          (total daily energy expenditure) adds everything else: walking, work,
          training and digesting food. TDEE is your{" "}
          <Link href={ARTICLES.maintenanceCalories.href} className="fk-link">
            maintenance calories
          </Link>
          , the amount that keeps your weight stable. See{" "}
          <Link href={ARTICLES.bmrVsTdee.href} className="fk-link">
            BMR vs TDEE
          </Link>{" "}
          for a worked example.
        </p>
        <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">
          For a rough population picture, ICMR-NIN (2020) estimates these daily
          needs for a reference Indian adult (man 65 kg, woman 55 kg):
        </p>
        <div className="mt-6 overflow-x-auto rounded-xl border border-border">
          <table className="min-w-full text-left text-sm">
            <caption className="sr-only">
              Estimated daily energy needs of Indian adults by activity level
            </caption>
            <thead className="bg-brand-50">
              <tr>
                <th className="px-4 py-3 font-semibold">Activity level</th>
                <th className="px-4 py-3 font-semibold">Man (65 kg)</th>
                <th className="px-4 py-3 font-semibold">Woman (55 kg)</th>
              </tr>
            </thead>
            <tbody>
              {icmrRows.map(([level, man, woman]) => (
                <tr key={level} className="border-t border-border">
                  <td className="px-4 py-3">{level}</td>
                  <td className="px-4 py-3 text-muted-foreground">{man}</td>
                  <td className="px-4 py-3 text-muted-foreground">{woman}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">
          These are averages. A heavier, taller or younger person needs more; a
          lighter, older or less active person needs less. The{" "}
          <Link href="/calorie-calculator" className="fk-link">
            calorie calculator
          </Link>{" "}
          uses your own age, height, weight and activity.
        </p>
      </section>

      <section id="targets" className="mt-12 scroll-mt-24">
        <h2 className="text-2xl font-semibold">Calorie targets by goal</h2>
        <div className="mt-6 overflow-x-auto rounded-xl border border-border">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-brand-50">
              <tr>
                <th className="px-4 py-3 font-semibold">Goal</th>
                <th className="px-4 py-3 font-semibold">Daily calories</th>
                <th className="px-4 py-3 font-semibold">Expected change</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-border">
                <td className="px-4 py-3">Lose fat</td>
                <td className="px-4 py-3 text-muted-foreground">
                  Maintenance minus 10–20% (about 300–500 kcal)
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  0.25–0.5 kg a week
                </td>
              </tr>
              <tr className="border-t border-border">
                <td className="px-4 py-3">Maintain</td>
                <td className="px-4 py-3 text-muted-foreground">
                  Maintenance (TDEE)
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  Stable weight, ±1 kg of day-to-day water swings
                </td>
              </tr>
              <tr className="border-t border-border">
                <td className="px-4 py-3">Build muscle</td>
                <td className="px-4 py-3 text-muted-foreground">
                  Maintenance plus 5–10% (about 200–300 kcal), with strength
                  training
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  0.25–0.5% of body weight a month for most beginners
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">
          Losing weight? Start with{" "}
          <Link href={ARTICLES.caloriesToLoseWeight.href} className="fk-link">
            how many calories to eat to lose weight
          </Link>{" "}
          and{" "}
          <Link href={ARTICLES.calorieDeficit.href} className="fk-link">
            how to calculate your calorie deficit
          </Link>
          . Keep protein high in a deficit (see{" "}
          <Link href="/nutrition/protein" className="fk-link">
            the protein guide
          </Link>
          ) and avoid going below about 1,200 kcal (women) or 1,500 kcal (men)
          without medical supervision.
        </p>
      </section>

      <section id="indian-foods" className="mt-12 scroll-mt-24">
        <h2 className="text-2xl font-semibold">Calories in everyday Indian foods</h2>
        <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">
          Per common serving, from the Indian Food Composition Tables (IFCT
          2017). Cooking oil and ghee are extra: every teaspoon adds about 45
          kcal, which is why home-cooked sabzi and tadka often carry more
          calories than people expect.
        </p>
        <div className="mt-6 overflow-x-auto rounded-xl border border-border">
          <table className="min-w-full text-left text-sm">
            <caption className="sr-only">
              Calories per serving of common Indian foods
            </caption>
            <thead className="bg-brand-50">
              <tr>
                <th className="px-4 py-3 font-semibold">Food</th>
                <th className="px-4 py-3 font-semibold">Serving</th>
                <th className="px-4 py-3 font-semibold">Calories</th>
              </tr>
            </thead>
            <tbody>
              {foodRows.map(([food, serving, kcal, href]) => (
                <tr key={food} className="border-t border-border">
                  <td className="px-4 py-3">
                    {href ? (
                      <Link href={href} className="fk-link">
                        {food}
                      </Link>
                    ) : (
                      food
                    )}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{serving}</td>
                  <td className="px-4 py-3">{kcal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">
          Look up any other staple in the{" "}
          <Link href={FOODS.index.href} className="fk-link">
            Indian food calories and protein chart
          </Link>
          , and see{" "}
          <Link href={ARTICLES.riceVsRoti.href} className="fk-link">
            rice vs roti for weight loss
          </Link>{" "}
          for the most common swap question.
        </p>
      </section>

      <section id="tracking" className="mt-12 scroll-mt-24">
        <h2 className="text-2xl font-semibold">How to track without obsessing</h2>
        <ul className="mt-4 max-w-3xl list-disc space-y-2 pl-5 leading-relaxed text-muted-foreground">
          <li>
            Track honestly for two to four weeks, including oil, chai, biscuits
            and weekend meals. That is usually enough to learn your portions.
          </li>
          <li>
            Weigh dry dal, rice and atta once to learn what a katori or roti
            really is in your kitchen.
          </li>
          <li>
            Weigh yourself at the same time a few mornings a week and compare
            weekly averages, not single days.
          </li>
          <li>
            If the weekly average has not moved in three weeks, reduce by
            100–200 kcal or add 2,000–3,000 daily steps. See{" "}
            <Link href={ARTICLES.notLosingWeight.href} className="fk-link">
              why you might not be losing weight
            </Link>
            .
          </li>
          <li>
            Daily walking adds up: use the{" "}
            <Link href="/steps-to-calories-calculator" className="fk-link">
              steps to calories calculator
            </Link>{" "}
            to see what your steps are worth, and read{" "}
            <Link href={ARTICLES.walking.href} className="fk-link">
              whether walking helps you lose weight
            </Link>
            .
          </li>
        </ul>
      </section>

      <section id="tools" className="mt-12 scroll-mt-24">
        <h2 className="text-2xl font-semibold">Calorie calculators</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="fk-panel block p-5 transition hover:border-primary"
            >
              <p className="font-semibold text-foreground">{tool.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {tool.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-2xl font-semibold tracking-tight">
          Weight-loss calorie guides
        </h2>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {weightLossGuides.map((guide) => (
            <li key={guide.href}>
              <Link
                href={guide.href}
                className="text-sm leading-snug text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
              >
                {guide.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <PillarGuides
        category="nutrition"
        subcategories={["calories-energy"]}
        heading="Calorie and energy guides"
        intro="Every fitlives article on calories and energy balance: maintenance calories, BMR and TDEE, and how much to eat."
        path={PATH}
        pageName={TITLE}
        pageDescription={DESCRIPTION}
      />

      <FaqAccordion
        className="mt-12"
        variant="stacked"
        items={faq.map((item) => ({ question: item.q, answer: item.a }))}
        title="Calorie FAQs"
      />

      <p className="mt-12 text-xs text-muted-foreground">
        Educational information only. Calorie needs during pregnancy,
        breastfeeding, illness or for people with diabetes or an eating disorder
        should be set with a doctor or registered dietitian. See our{" "}
        <Link href="/medical-disclaimer" className="underline">
          medical disclaimer
        </Link>
        .
      </p>
    </main>
  );
}
