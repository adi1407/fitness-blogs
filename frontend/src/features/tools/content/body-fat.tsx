import Link from "next/link";
import {
  CalcTable,
  type CalculatorContent,
} from "@/features/tools/components/CalculatorPageShell";
import { ARTICLES, CALCULATORS } from "@/features/tools/content/links";
import { SOURCES } from "@/features/tools/content/sources";

export const bodyFatMeta = {
  title: "Body Fat Calculator: Estimate Body Fat % with a Tape Measure",
  description:
    "Estimate your body fat percentage with the U.S. Navy tape-measure method. See your category, fat and lean mass, and what the numbers mean for South Asians.",
  h1: "Body Fat Calculator",
  intro:
    "All you need is a tape measure. Enter your neck and waist (and hips, for women) to estimate body fat percentage, fat mass and lean mass.",
};

export const bodyFatContent: CalculatorContent = {
  updated: "2026-10-05",
  sections: [
    {
      id: "how-to-measure",
      heading: "How to measure (it matters more than the formula)",
      body: (
        <>
          <ol>
            <li>
              Use a soft, non-stretch tape. Measure on bare skin, first thing
              in the morning, before eating.
            </li>
            <li>
              <strong>Neck:</strong> just below the larynx (Adam&apos;s apple),
              with the tape sloping slightly down towards the front.
            </li>
            <li>
              <strong>Waist:</strong> men at the belly button; women at the
              narrowest point. Stand relaxed and measure after a normal breath
              out — don&apos;t suck in.
            </li>
            <li>
              <strong>Hips (women):</strong> around the widest part of the
              buttocks, feet together.
            </li>
            <li>
              Take each measurement twice and use the average. The tape should
              sit snug without pressing into the skin.
            </li>
          </ol>
          <p>
            A 1 cm error at the waist changes the result by roughly half a
            percentage point, so measure the same way every time.
          </p>
        </>
      ),
    },
    {
      id: "body-fat-chart",
      heading: "Body fat percentage chart",
      body: (
        <>
          <CalcTable
            caption="American Council on Exercise (ACE) reference categories"
            head={["Category", "Men", "Women"]}
            rows={[
              ["Essential fat", "2–5%", "10–13%"],
              ["Athletic", "6–13%", "14–20%"],
              ["Fitness", "14–17%", "21–24%"],
              ["Average", "18–24%", "25–31%"],
              ["Above average", "25% +", "32% +"],
            ]}
          />
          <p>
            Women naturally carry more essential fat for hormonal and
            reproductive health, which is why their ranges are higher. Very
            low body fat isn&apos;t a health goal — for women in particular,
            dropping toward essential levels can disrupt periods and bone
            health.
          </p>
        </>
      ),
    },
    {
      id: "south-asians",
      heading: "Body fat in Indians and South Asians",
      body: (
        <>
          <p>
            Studies in Singapore and India have found that South Asians often
            carry <strong>more body fat at the same BMI</strong> than
            Europeans — sometimes 3–5 percentage points more — with more of it
            stored around the abdomen. This &ldquo;thin-fat&rdquo; pattern is
            one reason Indian guidelines use lower BMI and waist cut-offs.
          </p>
          <p>
            The Navy formula was developed largely on U.S. service members, so
            it may under-read body fat slightly for South Asians. Treat your
            result as a trend tracker and pair it with your waist-to-height
            ratio: keeping your waist under half your height is a simple,
            well-supported target. Compare with the{" "}
            <Link href={CALCULATORS.bmi.href}>BMI calculator</Link>, which
            shows Indian cut-offs.
          </p>
        </>
      ),
    },
    {
      id: "methods-compared",
      heading: "How accurate are body fat methods?",
      body: (
        <CalcTable
          head={["Method", "Typical error", "Notes"]}
          rows={[
            ["DEXA scan", "≈ 1–2%", "Reference standard in most clinics; costs money"],
            ["Tape measure (Navy)", "≈ 3–4%", "Free, repeatable, good for tracking trends"],
            ["Skinfold calipers", "≈ 3–5%", "Depends heavily on the tester's skill"],
            ["Smart scales (BIA)", "≈ 4–8%", "Shifts with hydration, meals and time of day"],
            ["Mirror / photos", "—", "Underrated for tracking change over months"],
          ]}
        />
      ),
    },
    {
      id: "lower-body-fat",
      heading: "How to lower your body fat",
      body: (
        <>
          <p>
            Body fat comes down with a moderate calorie deficit, enough protein
            and strength training — the training is what makes sure the weight
            you lose is fat rather than muscle. Spot-reducing belly fat with
            crunches doesn&apos;t work; overall fat loss does.
          </p>
          <p>
            Start with the{" "}
            <Link href={CALCULATORS.deficit.href}>calorie deficit calculator</Link>{" "}
            and read <Link href={ARTICLES.bellyFat.href}>how to lose belly fat</Link>.
          </p>
        </>
      ),
    },
  ],
  example: {
    heading: "Worked example: Arjun and Meera",
    body: (
      <>
        <p>
          <strong>Arjun</strong>: 175 cm, 80 kg, neck 38 cm, waist 90 cm. His
          estimate is about <strong>20.7% body fat</strong> — the
          &ldquo;average&rdquo; band — with roughly 16.6 kg of fat and 63.4 kg
          of lean mass. His waist-to-height ratio is 0.51, just over the 0.5
          rule of thumb.
        </p>
        <p>
          <strong>Meera</strong>: 160 cm, 62 kg, neck 33 cm, waist 78 cm, hips
          98 cm. Her estimate is about <strong>31.3%</strong>, the top of the
          average band, with a waist-to-height ratio of 0.49.
        </p>
        <p>
          Both would see more benefit from tracking these numbers monthly
          than from chasing a specific percentage.
        </p>
      </>
    ),
  },
  methodology: (
    <>
      <p>
        We use the U.S. Navy circumference equations (Hodgdon &amp; Beckett,
        1984) in metric form. Men: 495 ÷ (1.0324 − 0.19077 × log₁₀(waist −
        neck) + 0.15456 × log₁₀(height)) − 450. Women: 495 ÷ (1.29579 − 0.35004
        × log₁₀(waist + hip − neck) + 0.22100 × log₁₀(height)) − 450. All
        measurements are in centimetres.
      </p>
      <p>
        Fat mass = weight × body fat %; lean mass is the rest. Categories
        follow ACE reference ranges. Designed for adults; not valid during
        pregnancy and less reliable at very high or very low body fat.
      </p>
    </>
  ),
  sources: [SOURCES.navyHistory, SOURCES.navyCircumference, SOURCES.asianBodyFat, SOURCES.waistToHeight],
  faq: [
    {
      q: "What is a healthy body fat percentage?",
      a: "For most adult men, roughly 10–20%, and for women roughly 20–30%, is a healthy range. Athletes often sit lower; older adults often sit a little higher.",
    },
    {
      q: "Is the Navy body fat calculator accurate?",
      a: "It's usually within about 3–4 percentage points of a DEXA scan for most people. That's good enough to track progress if you measure carefully and consistently.",
    },
    {
      q: "Why do women need hip measurements?",
      a: "Women store more fat around the hips and thighs, so the women's equation uses waist plus hips minus neck to capture it.",
    },
    {
      q: "Is a smart scale better than a tape measure?",
      a: "Not usually. Smart scales use bioelectrical impedance, which swings with hydration, meals and time of day. A tape is cheaper and often more consistent.",
    },
    {
      q: "Can I be a normal BMI and still have high body fat?",
      a: "Yes. This is common in South Asians and in people who don't do strength training. A body fat estimate or waist measurement can reveal it when BMI doesn't.",
    },
    {
      q: "How often should I measure body fat?",
      a: "Every 2–4 weeks is plenty. Weekly changes are smaller than the measurement error.",
    },
  ],
  related: {
    calculators: [CALCULATORS.bmi, CALCULATORS.deficit, CALCULATORS.protein, CALCULATORS.oneRepMax],
    articles: [ARTICLES.bellyFat, ARTICLES.buildMuscleTime, ARTICLES.proteinMuscle, ARTICLES.indianWeightLossFoods],
  },
};
