import Link from "next/link";
import {
  CalcTable,
  type CalculatorContent,
} from "@/features/tools/components/CalculatorPageShell";
import { ARTICLES, CALCULATORS, FOODS } from "@/features/tools/content/links";
import { SOURCES } from "@/features/tools/content/sources";

export const proteinMeta = {
  title: "Protein Calculator: How Much Protein Per Day?",
  description:
    "Find out how much protein you need per day for general health, fat loss or muscle gain — with per-meal targets and Indian vegetarian protein sources.",
  h1: "Protein Calculator",
  intro:
    "Work out how much protein you need each day for your body weight and goal, and how to split it across your meals.",
};

export const proteinContent: CalculatorContent = {
  updated: "2026-09-29",
  sections: [
    {
      id: "how-much-protein",
      heading: "How much protein do you need?",
      body: (
        <>
          <p>
            The official minimum for adults is about 0.8 g of protein per kg
            of body weight — enough to prevent deficiency in sedentary
            people. ICMR–NIN&apos;s 2020 figures for Indian adults work out
            to roughly the same level. If you exercise, want to lose fat or
            build muscle, research supports more:
          </p>
          <CalcTable
            head={["Goal", "Protein per kg", "70 kg person"]}
            rows={[
              ["General health, light activity", "1.2 g/kg", "84 g/day"],
              ["Fat loss (keep muscle while dieting)", "1.8 g/kg (1.6–2.2)", "126 g/day"],
              ["Muscle building", "2.0 g/kg (1.6–2.2)", "140 g/day"],
            ]}
          />
          <p>
            A large meta-analysis found that gains in muscle from strength
            training level off at around 1.6 g/kg on average, with some
            people benefiting up to about 2.2 g/kg. That is why the
            calculator gives a range, not just one number.
          </p>
        </>
      ),
    },
    {
      id: "protein-for-muscle",
      heading: "Protein for muscle gain",
      body: (
        <>
          <p>
            Protein supplies the building blocks, but training is the signal.
            Without progressively harder workouts, extra protein simply gets
            used for energy. Combine a target of about 1.6–2.2 g/kg with a
            plan built on{" "}
            <Link href={ARTICLES.progressiveOverload.href}>
              progressive overload
            </Link>{" "}
            and a small calorie surplus from the{" "}
            <Link href={CALCULATORS.calorie.href}>calorie calculator</Link>.
          </p>
          <p>
            Timing is a minor detail. Hitting your daily total matters far
            more than whether you eat protein before or after training — see{" "}
            <Link href={ARTICLES.proteinTiming.href}>
              protein before or after workout
            </Link>
            .
          </p>
        </>
      ),
    },
    {
      id: "protein-for-fat-loss",
      heading: "Protein for weight loss",
      body: (
        <>
          <p>
            When you eat less, your body is more likely to break down muscle
            as well as fat. Higher protein — around 1.8 g/kg, and up to about
            2.2 g/kg for lean people in a bigger deficit — helps protect
            muscle, especially alongside strength training.
          </p>
          <p>
            Protein is also the most filling macronutrient, which makes a
            calorie deficit easier to stick to. Building each meal around a
            protein source is one of the simplest fat-loss habits there is.
          </p>
        </>
      ),
    },
    {
      id: "indian-protein-sources",
      heading: "Vegetarian and Indian protein sources",
      body: (
        <>
          <p>
            Hitting a higher protein target on a typical Indian diet takes
            planning, because many staples are carb-heavy. These foods do
            most of the work:
          </p>
          <CalcTable
            caption="Approximate protein per common serving (varies by brand and recipe)"
            head={["Food", "Serving", "Protein"]}
            rows={[
              ["Paneer", "100 g", "18–21 g"],
              ["Chicken breast", "100 g cooked", "25–31 g"],
              ["Eggs", "2 large", "12–13 g"],
              ["Soya chunks (dry)", "30–50 g", "15–25 g"],
              ["Cooked dal", "1 cup", "10–15 g"],
              ["Sprouts", "1–1.5 cups", "10–15 g"],
              ["Curd", "200 g", "6–8 g"],
            ]}
          />
          <p>
            Pairing dal or rajma with rice or roti improves the overall
            protein quality of the meal. For more ideas, read{" "}
            <Link href={ARTICLES.indianProteinFoods.href}>
              best high-protein Indian foods
            </Link>
            .
          </p>
          <p>
            For exact numbers per serving, see{" "}
            <Link href={FOODS.paneer.href}>paneer</Link>,{" "}
            <Link href={FOODS.chickenBreast.href}>chicken breast</Link>,{" "}
            <Link href={FOODS.boiledEgg.href}>boiled eggs</Link> and{" "}
            <Link href={FOODS.moongDal.href}>moong dal</Link>, or filter the{" "}
            <Link href={FOODS.index.href}>Indian food protein chart</Link> by
            high protein.
          </p>
        </>
      ),
    },
    {
      id: "spreading-protein",
      heading: "Spreading protein across meals",
      body: (
        <>
          <p>
            Your body can use a large protein meal, but for muscle building
            it seems to work best when protein is spread across the day. A
            practical approach is 3–4 meals with roughly 0.4 g/kg each — the
            calculator shows your per-meal amount after you calculate.
          </p>
          <p>
            For a 70 kg person on 140 g a day, that could look like: eggs or
            paneer bhurji at breakfast, dal with chicken or soya at lunch, a
            curd or whey snack, and paneer, tofu or fish at dinner.
          </p>
        </>
      ),
    },
    {
      id: "too-much-protein",
      heading: "Is too much protein harmful?",
      body: (
        <p>
          For healthy adults, intakes up to about 2.2 g/kg are generally
          considered safe. People with kidney disease, or at risk of it, are
          different: they should set protein with their doctor or dietitian.
          If you have diabetes, high blood pressure or a family history of
          kidney problems, get a check-up before significantly increasing
          protein.
        </p>
      ),
    },
  ],
  example: {
    heading: "Worked example: Priya and Rahul",
    body: (
      <>
        <p>
          <strong>Priya</strong> (60 kg, fat loss): 60 × 1.8 ={" "}
          <strong>108 g a day</strong>, range 96–120 g. Across 3 meals that is
          about 36 g each — for example, a paneer or egg breakfast, dal with
          curd at lunch, and a tofu or chicken dinner.
        </p>
        <p>
          <strong>Rahul</strong> (75 kg, muscle gain): 75 × 2.0 ={" "}
          <strong>150 g a day</strong>, range 135–165 g. Across 4 meals that
          is about 38 g each, easier to reach with a protein-rich snack
          between lunch and dinner.
        </p>
      </>
    ),
  },
  methodology: (
    <>
      <p>
        The calculator multiplies your body weight by a factor for your goal:
        1.2 g/kg for general health, 1.8 g/kg for fat loss and 2.0 g/kg for
        muscle building. The range shown is ±0.2 g/kg around that factor.
        Per-meal amounts divide the daily total across 3 or 4 meals.
      </p>
      <p>
        If you carry a lot of body fat, basing protein on total body weight
        can overshoot. In that case, the{" "}
        <Link href={CALCULATORS.calorie.href}>calorie calculator</Link>{" "}
        adjusts protein to a reference weight.
      </p>
    </>
  ),
  sources: [
    SOURCES.issnProtein,
    SOURCES.morton,
    SOURCES.helms,
    SOURCES.schoenfeldAragon,
    SOURCES.icmr,
  ],
  faq: [
    {
      q: "How much protein do I need to build muscle?",
      a: "Most people who strength train do well on about 1.6–2.2 g of protein per kg of body weight per day. Around 2.0 g/kg is a practical target that covers most people.",
    },
    {
      q: "Can I get enough protein as a vegetarian?",
      a: "Yes. Combine dairy (paneer, curd, milk), legumes (dal, chana, rajma), soya and, if you like, a protein supplement. Spreading these across 3–4 meals makes the target much easier to reach.",
    },
    {
      q: "Do I need protein powder?",
      a: "No. Protein powder is simply a convenient food. It helps if you struggle to reach your target from meals, but whole foods work just as well.",
    },
    {
      q: "Should I calculate protein on my current or goal weight?",
      a: "For most people, current weight is fine. If you have a lot of weight to lose, using a goal or reference weight gives a more realistic number.",
    },
    {
      q: "Is 100 g of protein a day too much?",
      a: "For most healthy adults, 100 g a day is well within a safe range and often appropriate if you are active. People with kidney disease should follow medical advice.",
    },
    {
      q: "What happens if I eat less protein than my target?",
      a: "Nothing dramatic day to day. Over weeks, consistently low protein makes it harder to keep muscle while dieting and to build muscle when training. Aim to hit your target on most days.",
    },
  ],
  related: {
    calculators: [CALCULATORS.macro, CALCULATORS.calorie, CALCULATORS.tdee, CALCULATORS.bmi],
    articles: [
      ARTICLES.proteinPerDay,
      ARTICLES.proteinMuscle,
      ARTICLES.indianProteinFoods,
      ARTICLES.beginnerGymDiet,
    ],
  },
};
