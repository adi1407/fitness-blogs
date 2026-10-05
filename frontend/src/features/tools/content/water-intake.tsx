import Link from "next/link";
import {
  CalcTable,
  type CalculatorContent,
} from "@/features/tools/components/CalculatorPageShell";
import { ARTICLES, CALCULATORS } from "@/features/tools/content/links";
import { SOURCES } from "@/features/tools/content/sources";

export const waterIntakeMeta = {
  title: "Water Intake Calculator: How Much Water Should I Drink a Day?",
  description:
    "Find out how much water to drink each day based on your weight, exercise and climate — with extra guidance for Indian summers, pregnancy and breastfeeding.",
  h1: "Water Intake Calculator",
  intro:
    "Get a daily drinking target in litres and glasses, adjusted for your body weight, training and how hot it is where you live.",
};

export const waterIntakeContent: CalculatorContent = {
  updated: "2026-10-05",
  sections: [
    {
      id: "how-much-water",
      heading: "How much water do you need a day?",
      body: (
        <>
          <p>
            The European Food Safety Authority sets adequate total water
            intakes of about <strong>2.0 litres a day for women</strong> and{" "}
            <strong>2.5 litres for men</strong> in mild climates, at moderate
            activity. Roughly 20–30% of that usually comes from food — dal,
            sabzi, curd, fruit and rice all contain plenty of water — and the
            rest from drinks.
          </p>
          <p>
            Bigger bodies, more sweating and hotter weather all raise that
            number, which is why this calculator starts from your weight
            (about 33 ml per kg) and adds to it for exercise and heat.
          </p>
          <CalcTable
            caption="Approximate daily drinks, mild climate, no exercise"
            head={["Body weight", "Litres", "Glasses (250 ml)"]}
            rows={[
              ["50 kg", "1.65 L", "≈ 7"],
              ["60 kg", "2.0 L", "≈ 8"],
              ["70 kg", "2.3 L", "≈ 9"],
              ["80 kg", "2.65 L", "≈ 11"],
              ["90 kg", "3.0 L", "≈ 12"],
            ]}
          />
        </>
      ),
    },
    {
      id: "exercise-and-heat",
      heading: "Exercise and Indian summers",
      body: (
        <>
          <p>
            Sweat rates during exercise commonly range from 0.3 to over 2
            litres an hour, depending on intensity, body size and heat. We add
            about 350 ml for every 30 minutes of training and another 500 ml
            for hot or humid weather — a reasonable middle estimate.
          </p>
          <p>
            For long or very sweaty sessions, the American College of Sports
            Medicine suggests weighing yourself before and after: each kilo
            lost is about a litre of fluid to replace. In heat or after more
            than an hour of hard work, add salt — nimbu pani with a pinch of
            salt, chaas or ORS work well.
          </p>
        </>
      ),
    },
    {
      id: "signs",
      heading: "Signs you're drinking enough (or not)",
      body: (
        <CalcTable
          head={["Sign", "What it suggests"]}
          rows={[
            ["Pale straw-coloured urine", "Well hydrated"],
            ["Dark yellow urine, rarely needing to go", "Drink more"],
            ["Headache, tiredness, dizziness in heat", "Possible dehydration — drink and rest in shade"],
            ["Clear urine and going very often", "You can likely drink a bit less"],
          ]}
        />
      ),
    },
    {
      id: "what-counts",
      heading: "What counts towards your water intake?",
      body: (
        <>
          <p>
            Almost every drink counts: water, chaas, lassi, nimbu pani,
            coconut water, milk, and even tea and coffee — moderate caffeine
            doesn&apos;t cause net fluid loss in regular drinkers. Watch the
            sugar, though: sweetened juices and soft drinks add calories fast.
          </p>
          <p>
            Trying to lose weight? Drinking water before meals may help you
            feel fuller. See the{" "}
            <Link href={CALCULATORS.deficit.href}>calorie deficit calculator</Link>{" "}
            and <Link href={ARTICLES.indianWeightLossFoods.href}>Indian foods for weight loss</Link>.
          </p>
        </>
      ),
    },
    {
      id: "too-much",
      heading: "Can you drink too much water?",
      body: (
        <p>
          Yes. Drinking very large amounts quickly — several litres in a few
          hours — can dilute blood sodium (hyponatraemia), which can be
          dangerous. It is rare in everyday life but does happen in endurance
          events. Spread drinks through the day and let thirst guide you.
          People with kidney, heart or liver conditions may need to limit
          fluids and should follow their doctor&apos;s advice.
        </p>
      ),
    },
  ],
  example: {
    heading: "Worked example: Sneha in Chennai",
    body: (
      <>
        <p>
          <strong>Sneha</strong> weighs 70 kg, trains for 45 minutes a day and
          lives in a hot, humid city.
        </p>
        <p>
          Baseline: 70 × 33 ml ≈ 2.3 L. Exercise: 45 min ≈ +0.55 L. Heat: +0.5
          L. Total: <strong>about 3.4 litres a day</strong> — roughly 13
          glasses, from all drinks combined.
        </p>
        <p>
          On rest days in an air-conditioned office, the same calculation gives
          about 2.3 L.
        </p>
      </>
    ),
  },
  methodology: (
    <>
      <p>
        Daily drinks = 33 ml × body weight (kg) + 350 ml per 30 minutes of
        exercise (up to 5 hours) + 500 ml for hot or humid climates. We add
        300 ml during pregnancy and 700 ml while breastfeeding, in line with
        EFSA&apos;s increments. The total is rounded to the nearest 50 ml.
      </p>
      <p>
        This is a starting estimate for healthy adults. Individual needs vary
        with sweat rate, diet and health, so adjust using thirst and urine
        colour.
      </p>
    </>
  ),
  sources: [SOURCES.efsaWater, SOURCES.acsmFluid, SOURCES.popkinWater],
  faq: [
    {
      q: "How much water should I drink a day according to my weight?",
      a: "A practical rule of thumb is about 33 ml per kg of body weight from drinks — around 2.3 litres for a 70 kg adult — plus more for exercise and hot weather.",
    },
    {
      q: "Is 3 litres of water a day too much?",
      a: "Not for most healthy adults, especially if you're active or live somewhere hot. It's only a concern if you have a condition that requires limiting fluids, or if you drink very large amounts in a short time.",
    },
    {
      q: "Do tea and coffee count as water?",
      a: "Yes. In people who drink them regularly, moderate tea and coffee hydrate about as well as water. Keep added sugar low.",
    },
    {
      q: "Does drinking water help weight loss?",
      a: "Water has no calories, and a glass before meals may help you feel fuller. Swapping sugary drinks for water is one of the easiest calorie cuts.",
    },
    {
      q: "How much water should I drink while working out?",
      a: "For sessions under an hour, sipping to thirst is usually enough. For longer or very sweaty sessions, aim to replace about a litre for every kilo of body weight lost, with some salt.",
    },
  ],
  related: {
    calculators: [CALCULATORS.calorie, CALCULATORS.deficit, CALCULATORS.steps, CALCULATORS.protein],
    articles: [ARTICLES.indianWeightLossFoods, ARTICLES.walking, ARTICLES.caloriesToLoseWeight, ARTICLES.proteinTiming],
  },
};
