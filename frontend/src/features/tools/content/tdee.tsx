import Link from "next/link";
import {
  CalcTable,
  type CalculatorContent,
} from "@/features/tools/components/CalculatorPageShell";
import { ARTICLES, CALCULATORS } from "@/features/tools/content/links";
import { SOURCES } from "@/features/tools/content/sources";

export const tdeeMeta = {
  title: "TDEE Calculator: Your Maintenance Calories",
  description:
    "Free TDEE calculator: estimate your total daily energy expenditure — the calories you burn each day — from age, height, weight and activity. Includes BMR.",
  h1: "TDEE Calculator",
  intro:
    "This TDEE calculator estimates how many calories you burn in a day — your maintenance calories — from your body stats and activity level.",
};

export const tdeeContent: CalculatorContent = {
  updated: "2026-09-29",
  sections: [
    {
      id: "what-is-tdee",
      heading: "What is TDEE?",
      body: (
        <>
          <p>
            TDEE stands for <strong>total daily energy expenditure</strong>:
            all the calories your body uses in 24 hours. Eat about your TDEE
            and your weight stays roughly stable, which is why it is also
            called your <em>maintenance calories</em>. To check the estimate
            against your real weight, see{" "}
            <Link href={ARTICLES.maintenanceCalories.href}>
              how to find your maintenance calories
            </Link>
            .
          </p>
          <p>
            Knowing it is the foundation for any goal. Fat loss means eating
            a bit below it, muscle gain a bit above it. If you want those
            targets worked out for you, the{" "}
            <Link href={CALCULATORS.calorie.href}>calorie calculator</Link>{" "}
            does it in one step.
          </p>
        </>
      ),
    },
    {
      id: "four-parts",
      heading: "The four parts of TDEE",
      body: (
        <>
          <CalcTable
            head={["Part", "What it is", "Typical share"]}
            rows={[
              ["BMR", "Energy to keep you alive at complete rest", "About 60–70%"],
              ["TEF (digestion)", "Energy used to digest and absorb food", "About 10%"],
              ["NEAT", "Walking, chores, standing, fidgeting", "Highly variable"],
              ["Exercise", "Planned workouts and sport", "Often 5–10%"],
            ]}
          />
          <p>
            The surprise for most people is <strong>NEAT</strong>{" "}
            (non-exercise activity thermogenesis). Research by James Levine
            found it can differ by hundreds of calories a day between people
            of similar size. A shop-floor job, walking to work or chasing
            children can outweigh an hour in the gym. That is why step count
            matters so much for fat loss — see{" "}
            <Link href={ARTICLES.walking.href}>
              does walking help you lose weight?
            </Link>
          </p>
        </>
      ),
    },
    {
      id: "activity-levels",
      heading: "Activity levels explained",
      body: (
        <>
          <p>
            Choosing the right activity level matters more than any other
            input. Most people overestimate it. Use your whole day, not just
            your workouts:
          </p>
          <CalcTable
            caption="Example: TDEE for Rahul (BMR 1,724 kcal) at each level"
            head={["Level", "Multiplier", "Looks like", "TDEE"]}
            rows={[
              ["Sedentary", "× 1.2", "Desk job, under ~5,000 steps, no training", "2,069"],
              ["Lightly active", "× 1.375", "Desk job + 1–3 workouts or daily walks", "2,371"],
              ["Moderately active", "× 1.55", "3–5 workouts a week or an on-your-feet job", "2,672"],
              ["Very active", "× 1.725", "Hard training most days or physical labour", "2,974"],
            ]}
          />
          <p>
            Between two levels? Pick the lower one. It is easier to add
            calories when progress is faster than planned than to find out
            weeks later that you have been eating at maintenance.
          </p>
        </>
      ),
    },
    {
      id: "tdee-vs-bmr",
      heading: "TDEE vs BMR",
      body: (
        <>
          <p>
            BMR is the floor: what you would burn lying in bed all day. TDEE
            is the real-life number that includes moving, eating and
            training. You should almost never eat below your BMR for long
            periods without medical supervision — it leaves little room for
            protein and micronutrients and tends to backfire.
          </p>
          <p>
            If you just want your resting number, use the{" "}
            <Link href={CALCULATORS.bmr.href}>BMR calculator</Link>.
          </p>
        </>
      ),
    },
    {
      id: "tdee-changes",
      heading: "Why your TDEE changes when you lose weight",
      body: (
        <>
          <p>
            A smaller body needs less energy to run and to move, so TDEE
            falls as you lose weight. Many people also move a little less
            without noticing when they eat less — fewer steps, less
            fidgeting. Together, these explain why weight loss slows over
            time even when you stick to the plan.
          </p>
          <p>
            The practical fix: recalculate every 4–5 kg, keep your steps up,
            keep protein high and keep strength training so more of what you
            lose is fat rather than muscle.
          </p>
        </>
      ),
    },
  ],
  example: {
    heading: "Worked example: Priya",
    body: (
      <>
        <p>
          Priya is a 28-year-old woman, 60 kg and 160 cm, with a desk job and
          regular evening walks.
        </p>
        <ol>
          <li>BMR = 10 × 60 + 6.25 × 160 − 5 × 28 − 161 = 1,299 kcal</li>
          <li>Lightly active: 1,299 × 1.375 = <strong>1,786 kcal/day</strong></li>
          <li>
            A steady fat-loss start (−20%) would be about 1,429 kcal; a lean
            gain (+10%) about 1,965 kcal.
          </li>
        </ol>
        <p>
          If Priya added three strength sessions a week and moved up to
          &ldquo;moderately active&rdquo;, her estimate would rise to about
          2,013 kcal.
        </p>
      </>
    ),
  },
  methodology: (
    <>
      <p>
        We estimate BMR with the Mifflin–St Jeor equation (10 × weight in kg
        + 6.25 × height in cm − 5 × age, +5 for men, −161 for women) and
        multiply it by the activity factor you choose: 1.2, 1.375, 1.55 or
        1.725. The fat-loss and gain cards show −20% and +10% of TDEE as
        simple starting points.
      </p>
      <p>
        These are population equations. They are most accurate for healthy
        adults and less accurate for very muscular people, people with
        obesity, older adults and some ethnic groups. Your weight trend over
        a few weeks is the best test of your real TDEE.
      </p>
    </>
  ),
  sources: [SOURCES.mifflin, SOURCES.frankenfield, SOURCES.levine, SOURCES.westerterp, SOURCES.icmr],
  faq: [
    {
      q: "What is a good TDEE?",
      a: "There is no good or bad TDEE — it simply reflects your size and how much you move. Larger and more active people have a higher TDEE. Adding daily steps and strength training is the most reliable way to raise it.",
    },
    {
      q: "Is TDEE the same as maintenance calories?",
      a: "Yes. TDEE is the estimate of calories you burn per day, so eating about that amount should keep your weight roughly stable.",
    },
    {
      q: "Do fitness watches measure TDEE accurately?",
      a: "Wearables are useful for tracking trends in steps and activity, but their calorie estimates can be off by a wide margin. Use them to compare your own days, not as an exact TDEE.",
    },
    {
      q: "Should I use my TDEE on rest days and training days?",
      a: "Keep it simple: use one average daily target. The activity factor already averages training and rest days across the week.",
    },
    {
      q: "How do I find my real TDEE?",
      a: "Eat a consistent, tracked amount for 2–3 weeks. If your average weight stays flat, that intake is your real maintenance. If it drops or rises, adjust your estimate up or down accordingly.",
    },
  ],
  related: {
    calculators: [CALCULATORS.calorie, CALCULATORS.bmr, CALCULATORS.macro, CALCULATORS.protein],
    articles: [
      ARTICLES.maintenanceCalories,
      ARTICLES.caloriesToLoseWeight,
      ARTICLES.calorieDeficit,
      ARTICLES.walking,
    ],
  },
};
