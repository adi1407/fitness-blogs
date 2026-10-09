import Link from "next/link";
import {
  CalcTable,
  type CalculatorContent,
} from "@/features/tools/components/CalculatorPageShell";
import { ARTICLES, CALCULATORS } from "@/features/tools/content/links";
import { SOURCES } from "@/features/tools/content/sources";

export const bmrMeta = {
  title: "BMR Calculator: Calories Your Body Burns at Rest",
  description:
    "Free BMR calculator: find the calories your body burns at complete rest with the Mifflin–St Jeor equation, and learn how BMR differs from TDEE (maintenance calories).",
  h1: "BMR Calculator",
  intro:
    "This BMR calculator estimates your basal metabolic rate: the calories your body burns at complete rest, before any movement or exercise.",
};

export const bmrContent: CalculatorContent = {
  updated: "2026-09-29",
  sections: [
    {
      id: "what-is-bmr",
      heading: "What is BMR?",
      body: (
        <>
          <p>
            Basal metabolic rate (BMR) is the energy your body needs to stay
            alive while completely at rest — pumping blood, breathing,
            keeping your brain, liver and kidneys working, and maintaining
            body temperature. For most people it accounts for the majority of
            the calories they burn in a day.
          </p>
          <p>
            BMR is <strong>not</strong> how much you should eat. It leaves
            out digestion, daily movement and exercise. To turn it into a
            maintenance number, use the{" "}
            <Link href={CALCULATORS.tdee.href}>TDEE calculator</Link>, or get
            goal targets straight away with the{" "}
            <Link href={CALCULATORS.calorie.href}>calorie calculator</Link>.
          </p>
        </>
      ),
    },
    {
      id: "formulas-compared",
      heading: "BMR formulas compared",
      body: (
        <>
          <CalcTable
            head={["Formula", "Uses", "Best for"]}
            rows={[
              ["Mifflin–St Jeor (1990)", "Weight, height, age, sex", "Most adults — our default"],
              ["Harris–Benedict (1919, revised 1984)", "Weight, height, age, sex", "Older standard; tends to run slightly high"],
              ["Katch–McArdle", "Lean body mass (needs body-fat %)", "Lean or muscular people who know their body fat"],
            ]}
          />
          <p>
            In the original study, Harris–Benedict overestimated measured
            resting energy by about 5%. A later systematic review found
            Mifflin–St Jeor predicted resting metabolism within 10% of
            measured values for more people than the other common equations,
            which is why most dietitians use it today. If you know your
            body-fat percentage, the{" "}
            <Link href={CALCULATORS.calorie.href}>calorie calculator</Link>{" "}
            can switch to Katch–McArdle.
          </p>
        </>
      ),
    },
    {
      id: "bmr-by-age",
      heading: "How BMR changes with age",
      body: (
        <>
          <p>
            Mifflin–St Jeor lowers BMR by 5 kcal for every year of age, which
            reflects the gradual loss of muscle and organ mass over time. For
            the same body size, that adds up to 50 kcal a decade:
          </p>
          <CalcTable
            caption="Estimated BMR (kcal/day) at the same weight and height"
            head={["Age", "Woman, 60 kg, 160 cm", "Man, 75 kg, 175 cm"]}
            rows={[
              ["25", "1,314", "1,724"],
              ["35", "1,264", "1,674"],
              ["45", "1,214", "1,624"],
              ["55", "1,164", "1,574"],
            ]}
          />
          <p>
            Much of that decline can be slowed. Strength training preserves
            muscle, and staying active keeps your total daily burn much
            higher than BMR alone suggests.
          </p>
        </>
      ),
    },
    {
      id: "bmr-rmr-tdee",
      heading: "BMR vs RMR vs TDEE",
      body: (
        <ul>
          <li>
            <strong>BMR</strong> — measured in strict lab conditions: after
            sleep, fasting, lying still in a warm room.
          </li>
          <li>
            <strong>RMR (resting metabolic rate)</strong> — measured under
            looser conditions and usually slightly higher. Online tools,
            including this one, estimate something between the two; the
            terms are often used interchangeably.
          </li>
          <li>
            <strong>TDEE</strong> — BMR plus digestion, daily movement and
            exercise. This is the number to base eating targets on.
          </li>
        </ul>
      ),
    },
    {
      id: "raise-bmr",
      heading: "Can you raise your BMR?",
      body: (
        <>
          <p>
            A little. Muscle tissue burns more energy than fat, so building
            muscle nudges BMR up — but the effect is modest, roughly 10–15
            calories a day per kilogram of muscle at rest, not hundreds.
            Supplements, &ldquo;metabolism-boosting&rdquo; foods and detox
            teas have no meaningful effect.
          </p>
          <p>
            The bigger wins are outside BMR: more daily steps, regular
            strength training and enough protein. They raise your total daily
            burn and help you keep muscle while losing fat. Start with{" "}
            <Link href={ARTICLES.progressiveOverload.href}>
              progressive overload
            </Link>
            .
          </p>
        </>
      ),
    },
  ],
  example: {
    heading: "Worked example: Rahul",
    body: (
      <>
        <p>Rahul is a 25-year-old man, 75 kg and 175 cm.</p>
        <ol>
          <li>10 × 75 = 750</li>
          <li>6.25 × 175 = 1,093.75</li>
          <li>5 × 25 = 125</li>
          <li>
            750 + 1,093.75 − 125 + 5 = <strong>1,724 kcal/day</strong>
          </li>
        </ol>
        <p>
          If Rahul knew he had 15% body fat, Katch–McArdle would give 370 +
          21.6 × 63.75 kg lean mass = about 1,747 kcal — very close. With his
          gym routine (moderately active), his maintenance would be about
          2,672 kcal.
        </p>
      </>
    ),
  },
  methodology: (
    <>
      <p>
        This calculator uses the Mifflin–St Jeor equation: 10 × weight (kg) +
        6.25 × height (cm) − 5 × age (years), then +5 for men or −161 for
        women. The result is rounded to the nearest calorie.
      </p>
      <p>
        Only lab testing (indirect calorimetry) measures BMR directly. Any
        equation can be off for an individual, especially for very muscular
        people, people with obesity, older adults and some thyroid or
        hormonal conditions.
      </p>
    </>
  ),
  sources: [SOURCES.mifflin, SOURCES.frankenfield, SOURCES.icmr],
  faq: [
    {
      q: "What is a normal BMR?",
      a: "It depends on your size, age and sex. Many adult women fall somewhere around 1,200–1,500 kcal a day and many adult men around 1,500–1,900 kcal, but larger and more muscular people can be well above that.",
    },
    {
      q: "Should I eat my BMR to lose weight?",
      a: "Usually not. Your BMR is below your real daily burn. Base fat-loss targets on TDEE instead — a 10–20% deficit from maintenance is a better starting point than eating at BMR.",
    },
    {
      q: "Why is my BMR lower than my friend's?",
      a: "BMR scales with body size and muscle. Someone taller, heavier or more muscular will usually have a higher BMR. Age and sex also play a role.",
    },
    {
      q: "Does a slow metabolism stop weight loss?",
      a: "Differences between similar people are usually smaller than expected. More often, the gap comes from daily movement and under-counted food. Thyroid problems can lower metabolism — speak to a doctor if you have symptoms.",
    },
    {
      q: "Does BMR drop when I diet?",
      a: "Yes, somewhat. A smaller body burns less, and your body adapts a little to eating less. Keeping protein high and continuing strength training helps limit the drop.",
    },
  ],
  related: {
    calculators: [CALCULATORS.tdee, CALCULATORS.calorie, CALCULATORS.macro, CALCULATORS.bmi],
    articles: [ARTICLES.maintenanceCalories, ARTICLES.caloriesToLoseWeight, ARTICLES.calorieDeficit, ARTICLES.notLosingWeight],
  },
};
