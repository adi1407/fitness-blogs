import Link from "next/link";
import {
  CalcTable,
  type CalculatorContent,
} from "@/features/tools/components/CalculatorPageShell";
import { ARTICLES, CALCULATORS } from "@/features/tools/content/links";
import { SOURCES } from "@/features/tools/content/sources";

export const oneRepMaxMeta = {
  title: "One Rep Max Calculator (1RM) & Load Chart",
  description:
    "Estimate your one-rep max for bench press, squat or deadlift from any set of 1–12 reps, and get working weights for strength and muscle-building rep ranges.",
  h1: "One Rep Max Calculator",
  intro:
    "Enter the weight and reps from a hard set into this one rep max calculator. We'll estimate your one-rep max and give you a load chart for every common rep range.",
};

export const oneRepMaxContent: CalculatorContent = {
  updated: "2026-10-05",
  sections: [
    {
      id: "what-is-1rm",
      heading: "What is a one-rep max?",
      body: (
        <>
          <p>
            Your one-rep max (1RM) is the heaviest weight you can lift once
            with good form. Coaches use it as a reference point: most
            programmes prescribe work as a percentage of 1RM — for example
            &ldquo;4 sets of 6 at 80%&rdquo;.
          </p>
          <p>
            Testing a true max is tiring and carries more injury risk,
            especially for beginners. Estimating it from a set of 3–10 reps is
            safer and accurate enough for planning training.
          </p>
        </>
      ),
    },
    {
      id: "percentage-chart",
      heading: "1RM percentage chart",
      body: (
        <>
          <CalcTable
            head={["% of 1RM", "Reps you can usually do", "Training goal"]}
            rows={[
              ["90–100%", "1–4", "Maximal strength, peaking"],
              ["80–89%", "4–8", "Strength"],
              ["67–79%", "8–12", "Muscle growth (hypertrophy)"],
              ["Below 67%", "12+", "Muscular endurance, technique, warm-ups"],
            ]}
          />
          <p>
            Muscle grows across a wide range of loads as long as sets are taken
            close to failure, so you don&apos;t have to train heavy to build
            size. Heavier work mainly improves your ability to lift heavy.
          </p>
        </>
      ),
    },
    {
      id: "how-to-use",
      heading: "How to use your 1RM in training",
      body: (
        <ul>
          <li>
            <strong>Pick a rep target</strong> from the table in your results
            and use that load for your working sets.
          </li>
          <li>
            <strong>Leave 1–3 reps in reserve</strong> on most sets. The table
            loads are close to all-out efforts, so start slightly lighter.
          </li>
          <li>
            <strong>Progress gradually:</strong> once you can beat your rep
            target at a load, add 2.5 kg (upper body) or 5 kg (lower body).
            See <Link href={ARTICLES.progressiveOverload.href}>progressive overload</Link>.
          </li>
          <li>
            <strong>Re-estimate every 4–6 weeks</strong> from a recent hard
            set, so your percentages keep up with your strength.
          </li>
        </ul>
      ),
    },
    {
      id: "accuracy",
      heading: "How accurate are 1RM formulas?",
      body: (
        <p>
          With sets of about 10 reps or fewer, estimates are usually within
          5–10% of a tested max. Accuracy drops with higher reps, with fatigue,
          and for lifters whose endurance is unusually good or poor for their
          strength. Different lifts also behave differently — many people can
          do more reps at a given percentage on squats and leg press than on
          bench press. That&apos;s why we cap the input at 12 reps and show
          two formulas side by side.
        </p>
      ),
    },
    {
      id: "safe-testing",
      heading: "How to test your 1RM safely",
      body: (
        <>
          <p>
            If you do want to test a true max — usually only after several
            months of consistent training — build up gradually so the heavy
            single feels familiar rather than shocking:
          </p>
          <ol>
            <li>Warm up with 5–10 minutes of light cardio and an empty bar.</li>
            <li>Do sets of 5 reps at about 40–50% of your estimated max, then 3 reps at 60–70%.</li>
            <li>Do singles at about 80%, 90% and 95%, resting 3–5 minutes between them.</li>
            <li>Attempt your max. If it moves cleanly, add 2.5–5 kg for one more attempt; stop when form breaks down.</li>
          </ol>
          <p>
            Always use a spotter on bench press and safety bars on squats.
            For most people, the estimate above is all they ever need.
          </p>
        </>
      ),
    },
    {
      id: "rir",
      heading: "Reps in reserve: training without maxing out",
      body: (
        <>
          <p>
            Reps in reserve (RIR) is how many more reps you could have done at
            the end of a set. Stopping at 1–3 RIR gives nearly the same muscle
            and strength gains as training to failure, with less fatigue and
            injury risk — and it lets you adjust for good and bad days without
            retesting your max.
          </p>
          <CalcTable
            head={["RIR", "How the last rep feels", "Use it for"]}
            rows={[
              ["0", "Couldn't do another rep", "Occasional final sets, machines"],
              ["1–2", "Slow, hard grind", "Most strength and muscle-building sets"],
              ["3–4", "Challenging but controlled", "Technique work, deloads, beginners"],
            ]}
          />
          <p>
            Light loads build muscle too: a large meta-analysis found
            similar muscle growth from low- and high-load training when sets
            are taken close to failure, while heavier loads produced bigger
            strength gains.
          </p>
        </>
      ),
    },
    {
      id: "strength-standards",
      heading: "Is my 1RM good?",
      body: (
        <>
          <p>
            Compare yourself with your past self first. As a rough guide for
            adult men after 1–2 years of consistent training, a bench press
            around body weight, a squat around 1.25–1.5× and a deadlift
            around 1.5–2× body weight are solid intermediate numbers. Women
            often reach about 0.6×, 1× and 1.25× body weight respectively.
          </p>
          <p>
            Strength gains depend on eating enough protein — use the{" "}
            <Link href={CALCULATORS.protein.href}>protein calculator</Link> to
            check your target.
          </p>
        </>
      ),
    },
  ],
  example: {
    heading: "Worked example: Rohan's bench press",
    body: (
      <>
        <p>
          <strong>Rohan</strong> benches <strong>80 kg for 5 reps</strong>.
        </p>
        <p>
          Epley: 80 × (1 + 5 ÷ 30) = 93.3 kg. Brzycki: 80 × 36 ÷ (37 − 5) =
          90.0 kg. Average: <strong>about 91.7 kg</strong>.
        </p>
        <p>
          For sets of 8 he would use about 80% — 72.5 kg — and for sets of
          10–12, about 65–70 kg. He doesn&apos;t need to test a single to train
          effectively.
        </p>
      </>
    ),
  },
  methodology: (
    <>
      <p>
        We average two widely used prediction equations: Epley, 1RM = weight
        × (1 + reps ÷ 30), and Brzycki, 1RM = weight × 36 ÷ (37 − reps). For a
        single rep, your 1RM is the weight entered. Inputs are limited to 1–12
        reps because prediction error grows quickly beyond that.
      </p>
      <p>
        The load table uses common reference percentages for each rep count
        and rounds to the nearest 2.5 kg or lb, the smallest jump most gyms
        allow.
      </p>
    </>
  ),
  sources: [SOURCES.reynolds1rm, SOURCES.schoenfeldLoad, SOURCES.helmsRir],
  faq: [
    {
      q: "How do I calculate my one rep max?",
      a: "Do a hard set of 3–10 reps with good form, then enter the weight and reps here. The Epley formula is weight × (1 + reps ÷ 30); we average it with the Brzycki formula.",
    },
    {
      q: "Should beginners test their 1RM?",
      a: "Usually not. In the first few months strength rises quickly and technique is still developing. Estimating from a 5–8 rep set is safer and just as useful.",
    },
    {
      q: "Which 1RM formula is most accurate?",
      a: "No single formula wins for everyone. Epley tends to read a little higher and Brzycki a little lower at moderate reps, so averaging them is a sensible middle ground.",
    },
    {
      q: "Does this work for squats and deadlifts?",
      a: "Yes, for any barbell or machine lift you can do with steady form. Estimates are most reliable for compound lifts in the 3–10 rep range.",
    },
    {
      q: "How often should I retest my max?",
      a: "Every 4–6 weeks, using a hard set from your normal training, is enough to keep training percentages accurate.",
    },
  ],
  related: {
    calculators: [CALCULATORS.protein, CALCULATORS.bodyFat, CALCULATORS.calorie, CALCULATORS.macro],
    articles: [ARTICLES.progressiveOverload, ARTICLES.buildMuscleTime, ARTICLES.proteinMuscle, ARTICLES.creatineSafe],
  },
};
