import Link from "next/link";
import {
  CalcTable,
  type CalculatorContent,
} from "@/features/tools/components/CalculatorPageShell";
import { ARTICLES, CALCULATORS, FOODS } from "@/features/tools/content/links";
import { SOURCES } from "@/features/tools/content/sources";

export const calorieDeficitMeta = {
  title: "Calorie Deficit Calculator: Daily Calories to Reach Your Goal Weight",
  description:
    "Enter your goal weight and timeline to get a daily calorie target, the deficit it needs and a safer timeline if your plan is too aggressive. Built for Indian diets.",
  h1: "Calorie Deficit Calculator",
  intro:
    "Pick a goal weight and a timeline. We'll work out the daily calories that gets you there — and tell you honestly if the pace is too fast.",
};

export const calorieDeficitContent: CalculatorContent = {
  updated: "2026-10-05",
  sections: [
    {
      id: "what-is-a-calorie-deficit",
      heading: "What is a calorie deficit?",
      body: (
        <>
          <p>
            A calorie deficit means eating fewer calories than your body burns
            in a day. Your body makes up the gap from stored energy — mostly
            body fat, if you eat enough protein and keep training. It is the
            one thing every successful fat-loss diet has in common, whether
            it&apos;s called keto, intermittent fasting or &ldquo;just eating
            clean&rdquo;.
          </p>
          <p>
            Your burn is your <strong>TDEE</strong> (total daily energy
            expenditure): resting metabolism plus digestion, daily movement
            and exercise. This calculator estimates it with the Mifflin–St
            Jeor equation, then subtracts the deficit your timeline needs.
          </p>
        </>
      ),
    },
    {
      id: "how-big-should-a-deficit-be",
      heading: "How big should your deficit be?",
      body: (
        <>
          <p>
            Most people do best losing about <strong>0.5–1% of body weight per
            week</strong>. Faster than that and you lose more muscle, feel
            hungrier and are more likely to rebound.
          </p>
          <CalcTable
            head={["Daily deficit", "Approx. loss / week", "Best for"]}
            rows={[
              ["250–300 kcal", "≈ 0.25 kg", "Already lean, or gaining muscle while losing fat"],
              ["400–550 kcal", "≈ 0.5 kg", "Most people — sustainable and easy to stick to"],
              ["700–1,000 kcal", "≈ 0.75–1 kg", "Higher body weight, short phases only"],
            ]}
          />
          <p>
            We also never set a target below about{" "}
            <strong>1,200 kcal (women) or 1,500 kcal (men)</strong> without
            supervision. Below this it is hard to meet protein, iron, calcium
            and fibre needs from ordinary food.
          </p>
        </>
      ),
    },
    {
      id: "7700-rule",
      heading: "The 7,700 kcal rule — and why progress slows",
      body: (
        <>
          <p>
            A kilogram of body fat stores roughly 7,700 kcal, so a 550 kcal
            daily deficit works out at about 0.5 kg a week. It is a good
            planning number, but real weight loss isn&apos;t perfectly
            linear: as you get lighter your maintenance falls, and early
            weeks include water loss from lower carb stores.
          </p>
          <p>
            Research using dynamic models (Hall et al., 2011) shows losses
            slow over time if intake stays the same. The fix is simple:{" "}
            <strong>re-run this calculator every 4–5 kg</strong> and adjust
            your target.
          </p>
        </>
      ),
    },
    {
      id: "indian-deficit-swaps",
      heading: "Easy deficit swaps in an Indian diet",
      body: (
        <>
          <CalcTable
            head={["Swap", "Saves about"]}
            rows={[
              ["2 rotis without ghee instead of 2 with 1 tsp ghee each", "≈ 90 kcal"],
              ["1 katori rice instead of 2 at dinner", "≈ 130–150 kcal"],
              ["Tea with less sugar (2 cups, 1 tsp less each)", "≈ 40 kcal"],
              ["Roasted chana instead of a samosa", "≈ 120–150 kcal"],
              ["Dal tadka with 1 tsp oil instead of 1 tbsp", "≈ 80 kcal"],
              ["A 30-minute brisk walk", "≈ 120–170 kcal"],
            ]}
          />
          <p>
            Two or three of these together cover a 400–500 kcal deficit
            without cutting out the foods you enjoy. See{" "}
            <Link href={ARTICLES.indianWeightLossFoods.href}>
              best Indian foods for weight loss
            </Link>{" "}
            and <Link href={ARTICLES.riceVsRoti.href}>rice vs roti</Link> for
            more, or look up exact{" "}
            <Link href={FOODS.roti.href}>roti</Link> and{" "}
            <Link href={FOODS.rice.href}>rice</Link> calories per serving.
          </p>
        </>
      ),
    },
    {
      id: "keep-muscle",
      heading: "Keep muscle while you lose fat",
      body: (
        <ul>
          <li>
            <strong>Protein:</strong> about 1.6–2.2 g per kg of body weight a
            day while dieting — use the{" "}
            <Link href={CALCULATORS.protein.href}>protein calculator</Link>.
          </li>
          <li>
            <strong>Strength training:</strong> 2–4 sessions a week tells your
            body the muscle is still needed.
          </li>
          <li>
            <strong>Steps:</strong> daily walking raises your burn without
            much extra hunger — check it with the{" "}
            <Link href={CALCULATORS.steps.href}>steps to calories calculator</Link>.
          </li>
          <li>
            <strong>Sleep:</strong> short sleep increases appetite and makes
            a deficit harder to hold.
          </li>
        </ul>
      ),
    },
  ],
  example: {
    heading: "Worked example: Ankit wants to lose 10 kg",
    body: (
      <>
        <p>
          <strong>Ankit</strong> is 30, 175 cm, 85 kg and lightly active. His
          estimated maintenance is about <strong>2,470 kcal</strong>.
        </p>
        <p>
          <strong>Goal: 75 kg in 20 weeks.</strong> 10 kg × 7,700 = 77,000
          kcal ÷ 140 days = a 550 kcal daily deficit, so his target is about{" "}
          <strong>1,920 kcal a day</strong> — roughly 0.5 kg (0.6% of his
          weight) a week. Realistic.
        </p>
        <p>
          <strong>Goal: 75 kg in 6 weeks.</strong> That needs a 1,830 kcal
          daily deficit — below his 1,500 kcal floor and nearly 2% of his
          body weight a week. The calculator flags it and suggests about 12
          weeks instead.
        </p>
      </>
    ),
  },
  methodology: (
    <>
      <p>
        Maintenance (TDEE) = Mifflin–St Jeor BMR × an activity factor (1.2 to
        1.725). Daily deficit = kilograms to lose × 7,700 ÷ days in your
        timeline. Your target is TDEE minus the deficit, but never below 1,200
        kcal (women) or 1,500 kcal (men).
      </p>
      <p>
        We flag a plan as aggressive when it needs more than 1% of your
        current body weight per week, or a target below the floor. The
        suggested timeline is the slower of those two limits. Designed for
        adults; not suitable during pregnancy, breastfeeding, for under-18s,
        or with a history of eating disorders.
      </p>
    </>
  ),
  sources: [SOURCES.mifflin, SOURCES.hall, SOURCES.helms, SOURCES.icmr],
  faq: [
    {
      q: "How many calories should I cut to lose 1 kg a week?",
      a: "About 1,100 kcal a day (7,700 ÷ 7). That's too much for most people — it's only appropriate at higher body weights, and the calculator will warn you if it pushes you under a safe minimum. Around 0.5 kg a week is more sustainable.",
    },
    {
      q: "Is a 500 calorie deficit good?",
      a: "For most adults, yes. A 500 kcal daily deficit gives roughly 0.5 kg of loss a week, which is fast enough to stay motivated and slow enough to protect muscle and keep hunger manageable.",
    },
    {
      q: "Why am I not losing weight in a calorie deficit?",
      a: "Usually the deficit is smaller than you think: oil, sugar in tea and weekend meals are easy to underestimate. Water retention from salt, stress or your menstrual cycle can also hide fat loss for 1–2 weeks. Track for 3 weeks and compare averages before changing anything.",
    },
    {
      q: "Should I eat back the calories I burn exercising?",
      a: "Not one-for-one. This calculator's activity level already includes your usual training. If you add a lot of extra activity, eat back about half of it at most.",
    },
    {
      q: "Can I lose fat without counting calories?",
      a: "Yes — smaller portions of rice and roti, more dal, vegetables and protein, fewer fried snacks and more walking all create a deficit. Counting is simply the most reliable way to know you're in one.",
    },
    {
      q: "Is it safe to eat 1,200 calories a day?",
      a: "For some smaller, less active women it can be, short-term. For most men and active women it's too low. Going below 1,200 kcal without medical supervision makes it hard to meet nutrient needs.",
    },
  ],
  related: {
    calculators: [CALCULATORS.tdee, CALCULATORS.protein, CALCULATORS.steps, CALCULATORS.calorie],
    articles: [ARTICLES.calorieDeficit, ARTICLES.lose10kg, ARTICLES.caloriesToLoseWeight, ARTICLES.bellyFat],
  },
};
