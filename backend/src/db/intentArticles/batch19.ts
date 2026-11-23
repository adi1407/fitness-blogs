import {
  DISCLAIMER,
  h2,
  h3,
  ol,
  p,
  table,
  takeaways,
  toolCta,
  ul,
  type IntentArticleDef,
  type IntentSource,
} from "./helpers";

/** Un-numbered on purpose: the boot link pass rewrites them to live numbered URLs. */
const LINK = {
  wheySafe: "/blog/nutrition/protein/is-whey-protein-safe",
  wheyDose: "/blog/nutrition/protein/how-much-whey-protein-per-day",
  wheyIsolate: "/blog/nutrition/protein/whey-protein-concentrate-vs-isolate",
  wheyTiming: "/blog/nutrition/protein/best-time-to-take-whey-protein",
  wheyVeg: "/blog/nutrition/protein/whey-protein-for-vegetarians",
  proteinPerDay: "/blog/nutrition/protein/how-much-protein-do-you-need-per-day",
  proteinMuscle:
    "/blog/muscle-building/muscle-building-nutrition/how-much-protein-to-build-muscle",
  indianProtein: "/blog/nutrition/protein/best-high-protein-indian-foods",
  proteinTiming:
    "/blog/nutrition/sports-nutrition/protein-before-or-after-workout",
  creatineDosage:
    "/blog/muscle-building/muscle-building-nutrition/creatine-dosage",
  vegProtein: "/blog/nutrition/protein/vegetarian-protein-sources-india",
};

const SRC_ISSN: IntentSource = {
  title: "Jäger et al. (2017) — ISSN position stand: protein and exercise",
  url: "https://pubmed.ncbi.nlm.nih.gov/28642676/",
  note: "Protein needs for active people and the role of supplements",
};

const SRC_MORTON: IntentSource = {
  title:
    "Morton et al. (2018) — Protein supplementation and resistance training-induced gains (Br J Sports Med)",
  url: "https://pubmed.ncbi.nlm.nih.gov/28698222/",
  note: "Supplements help most when total daily protein was low; gains plateau ~1.6 g/kg/day",
};

const SRC_PHILLIPS: IntentSource = {
  title:
    "Phillips et al. (2024) — Citizens Protein Project: popular protein supplements in India (Medicine)",
  url: "https://pubmed.ncbi.nlm.nih.gov/38579036/",
  note: "Label gaps and contaminants in some Indian-market products",
};

const SRC_ARETA: IntentSource = {
  title:
    "Areta et al. (2013) — Timing and distribution of protein ingestion during prolonged recovery from resistance exercise",
  url: "https://pubmed.ncbi.nlm.nih.gov/23459753/",
  note: "Spreading protein across the day supports muscle protein synthesis",
};

export const batch19: IntentArticleDef[] = [
  {
    slug: "how-much-whey-protein-per-day",
    title: "How Much Whey Protein Per Day? Scoops by Goal",
    excerpt:
      "One scoop or three? How much whey protein per day you actually need depends on your total protein target — not the tub’s marketing. Clear scoop maths for Indian diets.",
    quickAnswer: `Most people need zero to two scoops of whey a day — enough to finish a daily protein target of about 1.6–2.2 g per kg if you lift, or ~0.8–1.2 g/kg if you are mostly sedentary. A typical scoop is ~20–25 g protein (~110–130 kcal). Food comes first; whey fills gaps. More than ~40–50 g from powder alone rarely helps if meals already cover your total. Ask a doctor first if you have kidney disease, a milk allergy, or other medical limits. ${DISCLAIMER}`,
    categorySlug: "nutrition",
    subcategorySlug: "protein",
    primaryKeyword: "how much whey protein per day",
    metaTitle: "How Much Whey Protein Per Day? Scoops by Goal",
    metaDescription:
      "How much whey protein per day: scoop maths from your total protein target, when 1–2 scoops are enough, and who should skip powder — with Indian food examples.",
    tags: ["whey protein", "protein powder", "protein", "supplements", "muscle building"],
    topics: ["Protein", "Indian Nutrition", "Performance", "Beginner Fitness"],
    featuredImageAlt:
      "Protein scoop next to a shaker and a plate of dal and curd",
    relatedSlugs: [
      "is-whey-protein-safe",
      "how-much-protein-do-you-need-per-day",
      "how-much-protein-to-build-muscle",
      "best-high-protein-indian-foods",
      "protein-before-or-after-workout",
    ],
    dayOffset: 9,
    faq: [
      {
        question: "Is one scoop of whey protein a day enough?",
        answer:
          "Often yes — if the rest of your meals bring you close to your daily protein target. One scoop (~20–25 g) is a convenience tool, not a full day’s protein.",
      },
      {
        question: "Can I take 3 scoops of whey a day?",
        answer:
          "You can, but it is usually unnecessary and expensive. If you need that much powder, rebuild meals with dal, paneer, curd, eggs or chicken first. Very high powder intakes also mean more calories and more chance of digestive upset.",
      },
      {
        question: "Should I take whey on rest days?",
        answer:
          "Only if you still need help hitting your daily protein target. Muscle repair continues on rest days; the daily total matters more than the workout window.",
      },
      {
        question: "Does whey replace food protein?",
        answer:
          "It counts toward the same daily total. Food also brings micronutrients and satiety, so prefer meals first and use whey for gaps.",
      },
      {
        question: "How many scoops for weight loss?",
        answer:
          "Same logic: hit protein, stay in a calorie deficit. One scoop replacing a fried snack often helps. Extra scoops that push calories up do not.",
      },
    ],
    sources: [SRC_ISSN, SRC_MORTON, SRC_PHILLIPS, SRC_ARETA],
    body: [
      p(
        "Aryan bought a 1 kg tub because the label said “50 g protein per serving.” His friend takes three scoops. His coach said “just hit 150 g protein.” Nobody told him how much whey protein per day he actually needed.",
        "Whey dose is not a separate religion. It is leftover maths after you set a daily protein target and count food.",
      ),

      h2("Start with total protein — not scoops"),
      p(
        `Active people who lift often do well around 1.6–2.2 g of protein per kg of body weight per day. Sedentary adults need less. Work the number out with our guides on <a href="${LINK.proteinPerDay}">how much protein you need per day</a> and <a href="${LINK.proteinMuscle}">how much protein to build muscle</a>, then use the calculator.`,
      ),
      table(
        ["Body weight", "Example target (~1.8 g/kg)", "Rough food + whey split"],
        [
          ["55 kg", "~100 g/day", "Mostly food; 0–1 scoop"],
          ["70 kg", "~125 g/day", "Food + often 1 scoop"],
          ["85 kg", "~150 g/day", "Food + 1–2 scoops if meals fall short"],
        ],
      ),

      h2("What one scoop usually gives you"),
      p(
        "Check your label. Many Indian tubs list a 30–35 g serving with about 20–25 g protein. Calories are often ~110–130 per scoop. Flavoured mass gainers are different — they are calorie bombs, not “whey dose” tools.",
      ),
      table(
        ["Scoop protein", "When it fits"],
        [
          ["~20–25 g (1 scoop)", "Common gap-filler after Indian vegetarian meals"],
          ["~40–50 g (2 scoops)", "Only if food still leaves a large gap"],
          ["3+ scoops", "Usually a meal-planning problem, not a scoop problem"],
        ],
      ),

      h2("Worked example (70 kg, vegetarian, lifts 4×/week)"),
      ol([
        "Target ~125–140 g protein/day",
        "Breakfast curd + eggs or paneer bhurji: ~30 g",
        "Lunch dal + roti + curd: ~25–30 g",
        "Evening whey shake: ~22 g",
        "Dinner paneer/soya + sabzi + roti: ~35–40 g",
        "Total lands near the target without living on powder",
      ]),
      p(
        `Build the food half with <a href="${LINK.indianProtein}">best high-protein Indian foods</a>. Safety, kidneys myths, and fake tubs: <a href="${LINK.wheySafe}">is whey protein safe</a>.`,
      ),

      h2("Concentrate, isolate, and “more scoops” marketing"),
      p(
        `Isolate packs a bit more protein per scoop and less lactose; concentrate is usually cheaper. Neither needs a magic scoop count — see <a href="${LINK.wheyIsolate}">whey concentrate vs isolate</a>. Timing is flexible: <a href="${LINK.wheyTiming}">best time to take whey protein</a>.`,
      ),

      h2("Who should not self-dose whey"),
      ul([
        "Kidney or liver disease — ask a clinician first",
        "Cow’s milk allergy (whey is milk-derived)",
        "Severe lactose intolerance — try isolate or a non-dairy powder, or fix food first",
        "Under 18 — food first; involve a parent/doctor if considering powder",
      ]),
      p(DISCLAIMER),

      toolCta(
        "/protein-calculator",
        "protein calculator",
        "Set your daily protein target first, then decide scoops with the",
      ),

      takeaways([
        "How much whey protein per day = whatever closes the gap to your total protein target.",
        "Most lifters need 0–2 scoops; three-plus usually means meals are under-built.",
        "A typical scoop is ~20–25 g protein — always read your label.",
        "Food first; whey is convenience, not a steroid or a requirement.",
        "Buy simple whey from trusted sellers — quality matters as much as scoop count.",
      ]),
    ].join("\n"),
  },
];
