import Link from "next/link";
import {
  CalcTable,
  type CalculatorContent,
} from "@/features/tools/components/CalculatorPageShell";
import { ARTICLES, CALCULATORS } from "@/features/tools/content/links";
import { SOURCES } from "@/features/tools/content/sources";

export const bmiMeta = {
  title: "BMI Calculator with Indian & Asian Ranges",
  description:
    "Free BMI calculator with Indian and Asian cut-offs: check your body mass index from height and weight, see your category and what BMI can and can't tell you.",
  h1: "BMI Calculator",
  intro:
    "This BMI calculator checks your body mass index against both the international ranges and the lower cut-offs recommended for Indians and other Asian populations.",
};

export const bmiContent: CalculatorContent = {
  updated: "2026-09-29",
  sections: [
    {
      id: "what-is-bmi",
      heading: "What is BMI?",
      body: (
        <>
          <p>
            Body mass index (BMI) is your weight in kilograms divided by your
            height in metres squared. It is quick, free and needs no
            equipment, which is why doctors and public-health agencies use it
            to screen for weight-related health risk across large groups of
            people.
          </p>
          <p>
            It is a screening number, not a diagnosis. BMI doesn&apos;t know
            whether your weight is muscle or fat, or where that fat is
            stored — which matters a lot for health.
          </p>
        </>
      ),
    },
    {
      id: "bmi-chart",
      heading: "BMI chart",
      body: (
        <>
          <CalcTable
            head={["Category", "International (WHO)", "Indian / Asian cut-offs"]}
            rows={[
              ["Underweight", "Below 18.5", "Below 18.5"],
              ["Healthy range", "18.5–24.9", "18.5–22.9"],
              ["Overweight", "25–29.9", "23–24.9"],
              ["Obesity", "30 and above", "25 and above"],
            ]}
          />
          <p>Healthy weight ranges by height, on each scale:</p>
          <CalcTable
            caption="Approximate healthy weight range (kg)"
            head={["Height", "Indian / Asian (18.5–22.9)", "International (18.5–24.9)"]}
            rows={[
              ["150 cm (4 ft 11 in)", "42–51 kg", "42–56 kg"],
              ["155 cm (5 ft 1 in)", "44–55 kg", "44–60 kg"],
              ["160 cm (5 ft 3 in)", "47–59 kg", "47–64 kg"],
              ["165 cm (5 ft 5 in)", "50–62 kg", "50–68 kg"],
              ["170 cm (5 ft 7 in)", "53–66 kg", "53–72 kg"],
              ["175 cm (5 ft 9 in)", "57–70 kg", "57–76 kg"],
              ["180 cm (5 ft 11 in)", "60–74 kg", "60–81 kg"],
            ]}
          />
        </>
      ),
    },
    {
      id: "bmi-for-indians",
      heading: "BMI for Indians and South Asians",
      body: (
        <>
          <p>
            At the same BMI, South Asians tend to carry more body fat —
            especially around the abdomen — and develop type 2 diabetes and
            heart disease at lower body weights than white Europeans. A WHO
            expert consultation in 2004 recognised this for Asian
            populations, and Indian consensus guidelines (2009) recommend
            treating a BMI of <strong>23 or more as overweight</strong> and{" "}
            <strong>25 or more as obesity</strong> for Asian Indians.
          </p>
          <p>
            That is why this calculator shows both scales. If you are of
            South Asian heritage and your BMI is between 23 and 25, the
            international scale may call you &ldquo;healthy&rdquo; while the
            Indian cut-offs flag higher risk. It is a prompt to check your
            waist, activity and diet — not a cause for alarm.
          </p>
        </>
      ),
    },
    {
      id: "limitations",
      heading: "Limitations of BMI",
      body: (
        <ul>
          <li>
            <strong>Muscle:</strong> strength-trained people often score as
            &ldquo;overweight&rdquo; while being lean.
          </li>
          <li>
            <strong>Fat distribution:</strong> two people with the same BMI
            can have very different amounts of belly fat, which carries more
            risk.
          </li>
          <li>
            <strong>Age:</strong> older adults can lose muscle and gain fat
            with little change in BMI.
          </li>
          <li>
            <strong>Not for everyone:</strong> children and teenagers need
            age-specific BMI charts, and BMI isn&apos;t meaningful during
            pregnancy.
          </li>
        </ul>
      ),
    },
    {
      id: "waist-to-height",
      heading: "Waist-to-height ratio: a useful second check",
      body: (
        <>
          <p>
            Measure your waist at the level of your belly button, breathing
            out normally, and divide it by your height in the same units. A
            simple rule of thumb: <strong>keep your waist to less than half
            your height</strong>. For someone 165 cm tall, that means a waist
            under about 82 cm.
          </p>
          <p>
            Indian guidelines also flag a waist of 90 cm or more in men and
            80 cm or more in women as abdominal obesity. If you are above
            these numbers, a small calorie deficit, more daily walking and
            strength training are the best places to start — see{" "}
            <Link href={ARTICLES.bellyFat.href}>how to lose belly fat</Link>.
          </p>
        </>
      ),
    },
  ],
  example: {
    heading: "Worked example: Priya and Rahul",
    body: (
      <>
        <p>
          <strong>Priya</strong>: 60 kg, 1.60 m → 60 ÷ (1.60 × 1.60) ={" "}
          <strong>23.4</strong>. Healthy on the international scale, but in
          the overweight band on Indian cut-offs.
        </p>
        <p>
          <strong>Rahul</strong>: 75 kg, 1.75 m → 75 ÷ (1.75 × 1.75) ={" "}
          <strong>24.5</strong>. Also healthy internationally and overweight
          on Indian cut-offs — but Rahul lifts four days a week, so some of
          that weight is muscle. His waist measurement would tell him more
          than his BMI.
        </p>
        <p>
          Neither needs to panic. Both are good candidates for keeping an eye
          on waist size and following a sensible plan from the{" "}
          <Link href={CALCULATORS.calorie.href}>calorie calculator</Link>.
        </p>
      </>
    ),
  },
  methodology: (
    <>
      <p>
        BMI = weight (kg) ÷ height (m)². If you enter pounds or feet and
        inches, we convert them first. The result is rounded to one decimal
        place and compared with the WHO international categories and the
        Indian/Asian cut-offs (23 for overweight, 25 for obesity).
      </p>
      <p>
        This calculator is designed for adults aged 18 and over. It is not
        suitable for children, teenagers or during pregnancy.
      </p>
    </>
  ),
  sources: [SOURCES.whoAsiaBmi, SOURCES.indianConsensus, SOURCES.whoObesity],
  faq: [
    {
      q: "What is a healthy BMI for Indians?",
      a: "Indian guidelines consider 18.5–22.9 the healthy range for adults. A BMI of 23–24.9 is classed as overweight and 25 or more as obesity, lower than the international cut-offs of 25 and 30.",
    },
    {
      q: "Is BMI different for men and women?",
      a: "The formula and adult categories are the same for men and women. Women naturally carry more body fat at the same BMI, which is one reason BMI should be read alongside other measures.",
    },
    {
      q: "I lift weights and my BMI says overweight. Should I worry?",
      a: "Probably not, if your waist is less than half your height and you feel well. BMI can't tell muscle from fat. A waist measurement or body-fat estimate is more useful for you.",
    },
    {
      q: "What BMI is considered obese?",
      a: "Internationally, a BMI of 30 or more. For Asian Indians, guidelines use 25 or more because health risks rise at lower BMIs in this population.",
    },
    {
      q: "How can I lower my BMI?",
      a: "Losing body fat through a moderate calorie deficit, more daily movement and strength training will lower your BMI over time. Use the calorie calculator to find a realistic target.",
    },
    {
      q: "Is BMI accurate for older adults?",
      a: "Less so. Older adults often lose muscle, so BMI can look normal while body fat rises. Waist measurement and strength are useful extra checks.",
    },
  ],
  related: {
    calculators: [CALCULATORS.bodyFat, CALCULATORS.calorie, CALCULATORS.tdee, CALCULATORS.protein],
    articles: [ARTICLES.bellyFat, ARTICLES.caloriesToLoseWeight, ARTICLES.walking, ARTICLES.indianWeightLossFoods],
  },
};
