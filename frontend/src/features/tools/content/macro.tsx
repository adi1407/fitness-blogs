import Link from "next/link";
import {
  CalcTable,
  type CalculatorContent,
} from "@/features/tools/components/CalculatorPageShell";
import { ARTICLES, CALCULATORS } from "@/features/tools/content/links";
import { SOURCES } from "@/features/tools/content/sources";

export const macroMeta = {
  title: "Macro Calculator: Protein, Carbs & Fat Grams",
  description:
    "Split your daily calories into protein, carbs and fat in grams for weight loss, maintenance or muscle gain — with an Indian diet example day.",
  h1: "Macro Calculator",
  intro:
    "Turn your daily calorie target into grams of protein, carbohydrate and fat that fit your goal.",
};

export const macroContent: CalculatorContent = {
  updated: "2026-09-29",
  sections: [
    {
      id: "what-are-macros",
      heading: "What are macros?",
      body: (
        <>
          <p>
            Macronutrients — macros — are the three nutrients that supply
            calories: <strong>protein</strong> (4 kcal per gram),{" "}
            <strong>carbohydrate</strong> (4 kcal per gram) and{" "}
            <strong>fat</strong> (9 kcal per gram). Your calorie total decides
            whether you lose, keep or gain weight. Your macro split
            influences how full you feel, how well you train and how much of
            the weight you lose or gain is muscle.
          </p>
          <p>
            Start with calories: if you don&apos;t know your target, get it
            from the{" "}
            <Link href={CALCULATORS.calorie.href}>calorie calculator</Link>{" "}
            first, then bring it here.
          </p>
        </>
      ),
    },
    {
      id: "how-we-split",
      heading: "How we split your macros",
      body: (
        <>
          <ol>
            <li>
              <strong>Protein first</strong>, from your body weight and the
              protein level you pick (1.2–2.0 g/kg).
            </li>
            <li>
              <strong>Fat at about 25% of calories</strong> — enough for
              hormones, vitamin absorption and satisfying meals, without
              crowding out carbs.
            </li>
            <li>
              <strong>Carbohydrate fills the rest.</strong> Carbs fuel
              training and are the easiest macro to flex up or down.
            </li>
          </ol>
          <p>
            This order matters. Setting protein as a percentage of calories
            can leave people on low calories short of protein, and people on
            high calories with far more than they need. Basing it on body
            weight avoids both.
          </p>
        </>
      ),
    },
    {
      id: "macros-for-weight-loss",
      heading: "Macros for weight loss",
      body: (
        <p>
          In a calorie deficit, protein does the most important job: it helps
          you keep muscle and keeps hunger down. Pick <strong>1.8 g/kg</strong>{" "}
          and keep fat at a moderate level. You will usually have fewer carbs
          than before — put them around your workouts and choose
          high-fibre options like dal, vegetables, fruit and whole grains.
          Portion control of rice and roti matters more than choosing between
          them — see{" "}
          <Link href={ARTICLES.riceVsRoti.href}>rice vs roti for weight loss</Link>.
        </p>
      ),
    },
    {
      id: "macros-for-muscle-gain",
      heading: "Macros for muscle gain",
      body: (
        <p>
          With a small surplus, pick <strong>2.0 g/kg</strong> of protein and
          let the extra calories go mainly to carbohydrate, which supports
          harder training sessions. Keep fat at around 25% unless you prefer
          more — it is a personal choice as long as protein and calories are
          on target.
        </p>
      ),
    },
    {
      id: "indian-example-day",
      heading: "Indian diet example day",
      body: (
        <>
          <p>
            Here is roughly how Priya&apos;s fat-loss macros (1,429 kcal: 108
            g protein, 159 g carbs, 40 g fat) could look on a vegetarian day.
            Amounts are approximate and depend on recipes and oil.
          </p>
          <CalcTable
            head={["Meal", "Example", "Protein (approx.)"]}
            rows={[
              ["Breakfast", "Besan chilla (2) with 100 g paneer filling, green chutney", "~30 g"],
              ["Lunch", "1 cup dal, 1 roti, ½ cup rice, sabzi, salad", "~18 g"],
              ["Snack", "200 g curd with fruit, or a whey shake", "~8–24 g"],
              ["Dinner", "Soya chunk or tofu curry, 1 roti, vegetables", "~25–30 g"],
            ]}
          />
          <p>
            For more meal ideas, see{" "}
            <Link href={ARTICLES.indianWeightLossFoods.href}>
              best Indian foods for weight loss
            </Link>{" "}
            and the{" "}
            <Link href={ARTICLES.beginnerGymDiet.href}>beginner gym diet plan</Link>.
          </p>
        </>
      ),
    },
  ],
  example: {
    heading: "Worked example: two splits",
    body: (
      <CalcTable
        head={["", "Priya — fat loss", "Rahul — muscle gain"]}
        rows={[
          ["Calories", "1,429 kcal", "2,939 kcal"],
          ["Protein", "60 kg × 1.8 = 108 g", "75 kg × 2.0 = 150 g"],
          ["Fat (25%)", "40 g", "82 g"],
          ["Carbs (rest)", "159 g", "400 g"],
          ["Split", "30% P · 45% C · 25% F", "20% P · 54% C · 25% F"],
        ]}
      />
    ),
  },
  methodology: (
    <>
      <p>
        Protein (g) = body weight (kg) × your chosen g/kg. Fat (g) = 25% of
        calories ÷ 9. Carbohydrate (g) = remaining calories ÷ 4. Grams are
        rounded, so the total can differ from your target by a few calories.
      </p>
      <p>
        If protein and fat already use all your calories, carbs show as zero
        — that is a sign your calorie target is too low or your protein
        level too high for your weight.
      </p>
    </>
  ),
  sources: [SOURCES.issnProtein, SOURCES.morton, SOURCES.helms, SOURCES.icmr],
  faq: [
    {
      q: "What is the best macro ratio for weight loss?",
      a: "There is no single best ratio. Total calories drive weight loss; beyond that, higher protein (around 1.8 g/kg) and a carb/fat balance you can stick to work best.",
    },
    {
      q: "Do I have to hit my macros exactly?",
      a: "No. Aim to get within about 10 g of protein and close to your calorie target on most days. Carbs and fat can swap around a bit as long as calories stay roughly the same.",
    },
    {
      q: "Is a low-carb diet better for fat loss?",
      a: "When protein and calories are matched, low-carb and higher-carb diets lead to similar fat loss. Choose the style you can keep up; lower carbs can make hard training feel harder.",
    },
    {
      q: "Can I use this calculator with an Indian vegetarian diet?",
      a: "Yes. The split works for any diet. Vegetarians usually need to plan protein deliberately — paneer, curd, dal, soya and tofu at most meals make the target realistic.",
    },
    {
      q: "What is IIFYM?",
      a: "IIFYM stands for 'if it fits your macros' — the idea that any food can fit your plan if your daily macros add up. It is flexible, but meals built around whole foods make the targets far easier to hit and keep you fuller.",
    },
  ],
  related: {
    calculators: [CALCULATORS.calorie, CALCULATORS.protein, CALCULATORS.tdee, CALCULATORS.bmr],
    articles: [
      ARTICLES.indianProteinFoods,
      ARTICLES.indianWeightLossFoods,
      ARTICLES.beginnerGymDiet,
      ARTICLES.riceVsRoti,
    ],
  },
};
