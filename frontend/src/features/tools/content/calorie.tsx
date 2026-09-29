import Link from "next/link";
import {
  CalcTable,
  type CalculatorContent,
} from "@/features/tools/components/CalculatorPageShell";
import { ARTICLES, CALCULATORS } from "@/features/tools/content/links";
import { SOURCES } from "@/features/tools/content/sources";

export const calorieMeta = {
  title: "Calorie Calculator: Daily Calorie Needs & Targets",
  description:
    "Calculate your daily calorie needs with the fitlives Calorie Calculator. Estimate BMR, TDEE, maintenance calories and targets for weight loss or muscle gain.",
  h1: "Calorie Calculator",
  intro:
    "Calculate your estimated daily calorie needs from your age, sex, height, weight and activity level — with targets for fat loss, maintenance and muscle gain.",
};

export const calorieContent: CalculatorContent = {
  updated: "2026-09-29",
  sections: [
    {
      id: "what-are-calories",
      heading: "What are calories?",
      body: (
        <>
          <p>
            A calorie (kcal on food labels) is a unit of energy. Everything
            you eat and drink supplies some, and everything your body does
            uses some — breathing, digesting, walking to the metro, lifting
            weights. Protein and carbohydrates provide about 4 kcal per gram,
            fat about 9 kcal and alcohol about 7 kcal.
          </p>
          <p>
            Your body weight over weeks and months mostly reflects the balance
            between the energy you take in and the energy you use. Eat more
            than you use and the extra is stored; eat less and your body draws
            on stores, including fat. Day-to-day scale changes are mostly
            water, salt and food in your gut — the trend over two to three
            weeks is what tells you whether your calories are right.
          </p>
        </>
      ),
    },
    {
      id: "how-many-calories",
      heading: "How many calories should I eat per day?",
      body: (
        <>
          <p>
            It depends on your size, age, sex and — more than most people
            expect — how much you move. The calculator above gives you a
            personal estimate. As a reference point, here is what it
            estimates for maintenance for two reference adults (a 30-year-old
            woman of 55 kg and 155 cm, and a 30-year-old man of 65 kg and
            170 cm — the reference body weights used by ICMR–NIN for Indian
            adults):
          </p>
          <CalcTable
            caption="Estimated maintenance calories (kcal/day) from this calculator"
            head={["Activity level", "Woman, 55 kg", "Man, 65 kg"]}
            rows={[
              ["Sedentary (desk work, little exercise)", "1,450", "1,882"],
              ["Lightly active (1–3 sessions a week)", "1,661", "2,156"],
              ["Moderately active (3–5 days a week)", "1,872", "2,430"],
              ["Very active (hard training most days)", "2,084", "2,705"],
            ]}
          />
          <p>
            India&apos;s national figures (ICMR–NIN 2020) estimate about
            1,660 kcal for a sedentary woman and 2,110 kcal for a sedentary
            man at those body weights. They come out higher because the
            official &ldquo;sedentary&rdquo; level assumes more daily
            movement than a modern desk-and-sofa day. If you sit most of the
            day and don&apos;t exercise, choose <strong>Sedentary</strong>{" "}
            in the calculator and treat the answer as a starting point.
          </p>
        </>
      ),
    },
    {
      id: "calories-for-weight-loss",
      heading: "Calories for weight loss",
      body: (
        <>
          <p>
            To lose fat you need to eat less than your maintenance calories
            for long enough — a calorie deficit. The calculator offers two
            paces:
          </p>
          <ul>
            <li>
              <strong>Gentle (about 10% below maintenance)</strong> — easier
              to live with, good if you have less to lose, train hard, or
              have failed on aggressive diets before.
            </li>
            <li>
              <strong>Steady (about 20% below maintenance)</strong> — a
              common starting point for most adults with fat to lose. For
              many people it works out to roughly 0.3–0.6 kg a week at first.
            </li>
          </ul>
          <p>
            We never suggest going below about 1,200 kcal a day for women or
            1,500 kcal for men. Below that it gets hard to cover protein,
            fibre, vitamins and minerals, and hunger usually wins. If your
            numbers land close to those floors, the better lever is more
            daily movement rather than eating less. Very-low-calorie diets
            should only be done under medical supervision.
          </p>
          <p>
            Expect the scale to slow after the first few weeks. As you get
            lighter you burn a little less, so an estimate that worked at
            80 kg won&apos;t be exact at 72 kg — recalculate after every 4–5
            kg lost. For a step-by-step method, read{" "}
            <Link href={ARTICLES.calorieDeficit.href}>
              how to calculate your calorie deficit
            </Link>
            .
          </p>
        </>
      ),
    },
    {
      id: "calories-for-muscle-gain",
      heading: "Calories for muscle gain",
      body: (
        <>
          <p>
            Building muscle is easier with a small calorie surplus, enough
            protein and a training plan that gets progressively harder. A
            bigger surplus does not build muscle faster — it mostly adds fat.
          </p>
          <ul>
            <li>
              <strong>Lean (about 5% above maintenance)</strong> — best for
              most people who already train, and for anyone who wants to stay
              fairly lean.
            </li>
            <li>
              <strong>Standard (about 10% above maintenance)</strong> — suits
              beginners, very active people and those who struggle to gain
              weight.
            </li>
          </ul>
          <p>
            Aim for a slow scale increase of roughly 0.25–0.5% of body weight
            per month for experienced lifters, and a little more for
            beginners. Training is what tells your body to use the extra
            energy for muscle — see{" "}
            <Link href={ARTICLES.progressiveOverload.href}>
              progressive overload
            </Link>{" "}
            for how to structure it.
          </p>
        </>
      ),
    },
    {
      id: "men-vs-women",
      heading: "Calorie needs for men vs women",
      body: (
        <>
          <p>
            On average men need more calories because they tend to be larger
            and carry more muscle, which burns more energy even at rest. The
            Mifflin–St Jeor formula reflects this with a 166 kcal difference
            between men and women of identical weight, height and age.
          </p>
          <p>
            That difference is an average, not a rule. A tall, active woman
            can easily need more than a small, sedentary man. That is why the
            calculator asks for your actual height, weight and activity
            rather than giving one number per sex. If you know your body-fat
            percentage, add it — the calculator then uses lean mass (the
            Katch–McArdle formula), which removes most of the sex difference.
          </p>
        </>
      ),
    },
    {
      id: "bmr-vs-tdee",
      heading: "BMR vs TDEE: how your number is built",
      body: (
        <>
          <p>
            <strong>BMR (basal metabolic rate)</strong> is the energy your
            body uses at complete rest — keeping your heart, brain, lungs and
            organs running. For most people it is the biggest part of the
            day&apos;s burn.
          </p>
          <p>
            <strong>TDEE (total daily energy expenditure)</strong> adds
            everything else: digesting food (roughly 10% of intake), daily
            movement like walking, chores and fidgeting, and planned
            exercise. TDEE is your <em>maintenance</em> calories — eat about
            this much and your weight stays roughly steady.
          </p>
          <p>
            The calculator estimates BMR, multiplies it by an activity factor
            to get TDEE, and then adjusts TDEE for your goal. Want to go
            deeper into just one part? Use the{" "}
            <Link href={CALCULATORS.bmr.href}>BMR calculator</Link> or the{" "}
            <Link href={CALCULATORS.tdee.href}>TDEE calculator</Link>.
          </p>
        </>
      ),
    },
    {
      id: "make-it-accurate",
      heading: "How to make your estimate more accurate",
      body: (
        <>
          <p>
            Any formula can be off by a couple of hundred calories for an
            individual. The fix is simple: use the number, then let your own
            results correct it.
          </p>
          <ol>
            <li>
              Eat close to your target for 2–3 weeks. Weigh the food you eat
              most often for the first week — rice, oil, roti and nuts are
              where estimates usually go wrong.
            </li>
            <li>
              Weigh yourself 3–4 mornings a week, after the toilet and before
              eating, and look at the weekly average.
            </li>
            <li>
              If the average hasn&apos;t moved the way you wanted, adjust by
              100–200 kcal a day and repeat. Women may find the trend easier
              to read by comparing the same week of each cycle.
            </li>
          </ol>
        </>
      ),
    },
  ],
  example: {
    heading: "Worked example: Priya and Rahul",
    body: (
      <>
        <p>
          <strong>Priya</strong> is 28, 60 kg and 160 cm, with a desk job and
          regular walks (lightly active). She wants to lose fat.
        </p>
        <ul>
          <li>BMR: 1,299 kcal/day</li>
          <li>Maintenance (TDEE): 1,299 × 1.375 = 1,786 kcal/day</li>
          <li>
            Steady fat loss (−20%): <strong>1,429 kcal/day</strong> — about
            0.3 kg a week at first
          </li>
          <li>Suggested macros: 108 g protein, 159 g carbs, 40 g fat</li>
        </ul>
        <p>
          <strong>Rahul</strong> is 25, 75 kg and 175 cm, and trains in the
          gym four days a week (moderately active). He wants to build muscle.
        </p>
        <ul>
          <li>BMR: 1,724 kcal/day</li>
          <li>Maintenance (TDEE): 1,724 × 1.55 = 2,672 kcal/day</li>
          <li>
            Standard gain (+10%): <strong>2,939 kcal/day</strong>; a leaner
            +5% would be 2,806 kcal
          </li>
          <li>Suggested macros: 150 g protein, 400 g carbs, 82 g fat</li>
        </ul>
        <p>
          Both would follow their target for a few weeks, check their weekly
          average weight and adjust from there.
        </p>
      </>
    ),
  },
  methodology: (
    <>
      <p>
        <strong>1. BMR.</strong> By default we use the Mifflin–St Jeor
        equation: 10 × weight (kg) + 6.25 × height (cm) − 5 × age, then +5
        for men or −161 for women. In a systematic review it predicted
        resting metabolism within 10% of measured values for more people than
        other common equations. If you enter body-fat %, we switch to
        Katch–McArdle: 370 + 21.6 × lean body mass (kg).
      </p>
      <p>
        <strong>2. TDEE.</strong> BMR × activity factor: 1.2 sedentary, 1.375
        lightly active, 1.55 moderately active, 1.725 very active.
      </p>
      <p>
        <strong>3. Goal target.</strong> Fat loss uses −10% or −20%, muscle
        gain +5% or +10%. Fat-loss targets never go below 1,200 kcal (women)
        or 1,500 kcal (men). The weekly change uses the rough rule of 7,700
        kcal per kg of fat; real-world loss slows over time as your body
        adapts.
      </p>
      <p>
        <strong>4. Macros.</strong> Protein is 1.8 g/kg for fat loss, 1.6 g/kg
        for maintenance and 2.0 g/kg for muscle gain (for a BMI over 30 we
        use a reference weight instead, so protein isn&apos;t overstated).
        Fat is about 25% of calories and carbs make up the rest.
      </p>
    </>
  ),
  sources: [
    SOURCES.mifflin,
    SOURCES.frankenfield,
    SOURCES.icmr,
    SOURCES.hall,
    SOURCES.westerterp,
    SOURCES.issnProtein,
  ],
  faq: [
    {
      q: "How accurate is this calorie calculator?",
      a: "For most people the estimate is within about 10% of their real needs, but some individuals will be further off. Treat it as a starting point: follow it for 2–3 weeks, watch your average weight, and adjust by 100–200 kcal if needed.",
    },
    {
      q: "Should I eat back the calories I burn exercising?",
      a: "No need if you picked the right activity level — your training is already included in the activity factor. Fitness trackers often overestimate exercise burn, so adding those calories on top usually slows fat loss.",
    },
    {
      q: "Is 1,200 calories a day enough?",
      a: "For some smaller, less active women 1,200 kcal can be a reasonable fat-loss target, but it is the lowest we suggest without professional support. Most people lose fat eating more than that, especially if they walk more. Men and active women usually need considerably more.",
    },
    {
      q: "Why am I not losing weight on my calorie target?",
      a: "The most common reasons are under-counted food (oil, snacks, drinks and weekend meals), water retention from salt, stress or a new training plan, and not waiting long enough. Compare weekly averages over at least 2–3 weeks before cutting calories further.",
    },
    {
      q: "Do I need to count calories to lose weight?",
      a: "Not forever. Counting for a few weeks teaches you portion sizes. Many people then switch to simpler habits — a protein source at each meal, half the plate vegetables, measured rice or roti — and use the scale trend to check they are still on track.",
    },
    {
      q: "Should I recalculate as I lose weight?",
      a: "Yes. Recalculate after every 4–5 kg lost, if your activity changes a lot, or if progress has stalled for more than three weeks despite accurate tracking.",
    },
    {
      q: "Is this calculator suitable during pregnancy or for teenagers?",
      a: "No. Energy needs during pregnancy, breastfeeding and adolescence are different and should be set with a doctor or registered dietitian. The calculator is designed for healthy adults aged 18 and over.",
    },
  ],
  related: {
    calculators: [
      CALCULATORS.tdee,
      CALCULATORS.macro,
      CALCULATORS.protein,
      CALCULATORS.bmr,
    ],
    articles: [
      ARTICLES.caloriesToLoseWeight,
      ARTICLES.calorieDeficit,
      ARTICLES.lose10kg,
      ARTICLES.indianWeightLossFoods,
    ],
  },
};
