import Link from "next/link";
import {
  CalcTable,
  type CalculatorContent,
} from "@/features/tools/components/CalculatorPageShell";
import { ARTICLES, CALCULATORS } from "@/features/tools/content/links";
import { SOURCES } from "@/features/tools/content/sources";

export const stepsToCaloriesMeta = {
  title: "Steps to Calories Calculator (Walking)",
  description:
    "Convert your daily steps into calories burned and distance walked, based on your height, weight and walking pace. See how many calories 10,000 steps burns.",
  h1: "Steps to Calories Calculator",
  intro:
    "Enter your steps, height, weight and pace into this steps to calories calculator to see how far you walked and how many calories you burned — including the extra above resting.",
};

export const stepsToCaloriesContent: CalculatorContent = {
  updated: "2026-10-05",
  sections: [
    {
      id: "10000-steps",
      heading: "How many calories do 10,000 steps burn?",
      body: (
        <>
          <p>
            For most adults, 10,000 steps at a moderate pace covers about 7–8
            km and burns roughly <strong>300–450 kcal</strong> in total, or
            about 200–320 kcal above what you&apos;d burn sitting still. Heavier
            and taller people burn more, because they move more mass over a
            longer stride.
          </p>
          <CalcTable
            caption="Approximate total kcal for 10,000 steps, 170 cm, moderate pace"
            head={["Body weight", "Total kcal", "Above resting"]}
            rows={[
              ["55 kg", "≈ 285", "≈ 200"],
              ["65 kg", "≈ 335", "≈ 240"],
              ["75 kg", "≈ 385", "≈ 275"],
              ["85 kg", "≈ 440", "≈ 315"],
              ["95 kg", "≈ 490", "≈ 350"],
            ]}
          />
        </>
      ),
    },
    {
      id: "total-vs-net",
      heading: "Total vs. above-resting calories",
      body: (
        <>
          <p>
            Most fitness trackers show <strong>total</strong> calories during
            a walk — including the energy you&apos;d have burned anyway just
            being alive. The <strong>above-resting</strong> (net) figure strips
            that out, and it&apos;s the honest number when you&apos;re thinking
            about a calorie deficit.
          </p>
          <p>
            Your <Link href={CALCULATORS.tdee.href}>TDEE</Link> already
            includes your normal activity level, so only count steps
            you&apos;ve <em>added</em> on top of your usual routine as extra
            burn.
          </p>
        </>
      ),
    },
    {
      id: "how-many-steps",
      heading: "How many steps a day should you aim for?",
      body: (
        <>
          <CalcTable
            head={["Steps per day", "Activity level"]}
            rows={[
              ["Under 5,000", "Sedentary"],
              ["5,000–7,499", "Low active"],
              ["7,500–9,999", "Somewhat active"],
              ["10,000–12,499", "Active"],
              ["12,500 +", "Highly active"],
            ]}
          />
          <p>
            There&apos;s nothing magic about 10,000. Research reviews suggest
            most adults get meaningful health benefits around 7,000–8,000
            steps a day, with more helping weight management. If you&apos;re at
            3,000 now, adding 1,000–2,000 a day is a great first goal.
          </p>
        </>
      ),
    },
    {
      id: "steps-and-health",
      heading: "What the research says about daily steps",
      body: (
        <>
          <p>
            Large studies that tracked people with step counters found that
            mortality risk falls steadily as daily steps rise, levelling off
            at around <strong>6,000–8,000 steps for adults over 60</strong>{" "}
            and <strong>8,000–10,000 for younger adults</strong>. Step
            intensity mattered far less than the total number of steps.
          </p>
          <p>
            That&apos;s good news if brisk walking feels hard: getting the
            steps in at any comfortable pace is what counts most.
          </p>
        </>
      ),
    },
    {
      id: "pace",
      heading: "Walking pace and calories per minute",
      body: (
        <>
          <CalcTable
            caption="70 kg adult, flat ground"
            head={["Pace", "Speed", "kcal per 10 min (total)", "Steps per minute (approx.)"]}
            rows={[
              ["Slow / strolling", "3.2 km/h", "≈ 33", "80–90"],
              ["Moderate", "4.8 km/h", "≈ 41", "100–110"],
              ["Brisk", "5.6 km/h", "≈ 50", "115–125"],
            ]}
          />
          <p>
            A rough test for brisk: you can talk in short sentences but
            couldn&apos;t sing. Walking uphill, on sand or carrying a bag
            raises the burn further — the calculator assumes flat ground, so
            treat hilly walks as a bonus.
          </p>
        </>
      ),
    },
    {
      id: "walking-for-weight-loss",
      heading: "Walking for weight loss",
      body: (
        <>
          <p>
            Walking is easy to recover from, doesn&apos;t spike hunger much and
            is something you can do every day — which makes it one of the most
            reliable ways to widen a calorie deficit. 3,000 extra steps a day
            adds up to roughly 0.5 kg of fat over 5–7 weeks for many people.
          </p>
          <p>
            Practical ways to fit steps into an Indian day: a 15-minute walk
            after lunch and dinner (also helps blood sugar), taking calls on
            foot, getting off the metro or auto one stop early, and stairs
            instead of the lift. Read{" "}
            <Link href={ARTICLES.walking.href}>does walking help you lose weight?</Link>
          </p>
        </>
      ),
    },
  ],
  example: {
    heading: "Worked example: Vikram's evening walks",
    body: (
      <>
        <p>
          <strong>Vikram</strong> is 170 cm and 70 kg and walks 10,000 steps
          at a moderate pace.
        </p>
        <p>
          Stride ≈ 170 × 0.415 = 71 cm, so distance ≈ 7.1 km. At 4.8 km/h that
          takes about 88 minutes. Energy = 3.5 METs × 70 kg × 1.47 h ≈{" "}
          <strong>360 kcal total</strong>, or about{" "}
          <strong>257 kcal above resting</strong>.
        </p>
        <p>
          If those are 5,000 steps more than his usual day, his extra burn is
          about half that — roughly 130 kcal.
        </p>
      </>
    ),
  },
  methodology: (
    <>
      <p>
        Stride length is estimated from height (41.5% for men, 41.3% for
        women). Distance = steps × stride. Time = distance ÷ pace speed (3.2,
        4.8 or 5.6 km/h). Calories = MET × weight (kg) × hours, using MET
        values of 2.8, 3.5 and 4.3 from the 2011 Compendium of Physical
        Activities. Above-resting calories use (MET − 1).
      </p>
      <p>
        Real-world numbers vary with terrain, incline, carrying weight and
        individual efficiency. Treat the result as an estimate on flat ground.
      </p>
    </>
  ),
  sources: [SOURCES.compendium, SOURCES.tudorLocke, SOURCES.saintMauriceSteps, SOURCES.paluchSteps],
  faq: [
    {
      q: "How many calories does 1,000 steps burn?",
      a: "Roughly 30–50 kcal in total for most adults, depending on body weight and pace — about 20–35 kcal above resting.",
    },
    {
      q: "How many steps do I need to burn 500 calories?",
      a: "For a 70 kg adult at a moderate pace, around 14,000 steps (total calories) or close to 20,000 steps if you count only calories above resting.",
    },
    {
      q: "How many km is 10,000 steps?",
      a: "Usually 6.5–8 km, depending on your height and stride. A 170 cm adult covers about 7 km.",
    },
    {
      q: "Is brisk walking better than slow walking?",
      a: "Brisk walking burns more per minute and gives bigger fitness benefits. But total steps matter most — a slow walk you'll actually do beats a fast one you skip.",
    },
    {
      q: "Are fitness tracker calorie numbers accurate?",
      a: "Step counts are fairly accurate; calorie estimates often aren't and can be off by 20–40%. Use any tool's calorie figure as a guide, not a precise number.",
    },
  ],
  related: {
    calculators: [CALCULATORS.deficit, CALCULATORS.tdee, CALCULATORS.calorie, CALCULATORS.water],
    articles: [ARTICLES.walking, ARTICLES.calorieDeficit, ARTICLES.bellyFat, ARTICLES.caloriesToLoseWeight],
  },
};
