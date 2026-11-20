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
  creatineSafe:
    "/blog/muscle-building/muscle-building-nutrition/is-creatine-safe",
  creatineLoading:
    "/blog/muscle-building/muscle-building-nutrition/creatine-loading-phase",
  creatineWomen:
    "/blog/muscle-building/muscle-building-nutrition/creatine-for-women",
  creatineHcl:
    "/blog/muscle-building/muscle-building-nutrition/creatine-monohydrate-vs-hcl",
  proteinMuscle:
    "/blog/muscle-building/muscle-building-nutrition/how-much-protein-to-build-muscle",
  whey: "/blog/nutrition/protein/is-whey-protein-safe",
  bellyFat: "/blog/weight-loss/fat-loss-basics/how-to-lose-belly-fat",
};

const SRC_ISSN: IntentSource = {
  title:
    "Kreider et al. (2017) — ISSN position stand: safety and efficacy of creatine supplementation in exercise, sport, and medicine",
  url: "https://pubmed.ncbi.nlm.nih.gov/28615996/",
  note: "Dosing, loading, and safety summary for healthy adults",
};

const SRC_HULTMAN: IntentSource = {
  title: "Hultman et al. (1996) — Muscle creatine loading in men (J Appl Physiol)",
  url: "https://pubmed.ncbi.nlm.nih.gov/8828669/",
  note: "20 g/day for 6 days and 3 g/day for 28 days both raise muscle creatine ~20%",
};

const SRC_ANTONIO: IntentSource = {
  title:
    "Antonio et al. (2021) — Common questions and misconceptions about creatine supplementation",
  url: "https://pubmed.ncbi.nlm.nih.gov/33557850/",
  note: "Addresses loading, dose by size, and safety myths",
};

const SRC_SMITH_RYAN: IntentSource = {
  title:
    "Smith-Ryan et al. (2021) — Creatine supplementation in women’s health: a lifespan perspective",
  url: "https://pubmed.ncbi.nlm.nih.gov/33800439/",
  note: "Women’s responses, dose, and research gaps in pregnancy",
};

const SRC_JAGER: IntentSource = {
  title:
    "Jäger et al. (2011) — Analysis of the efficacy, safety, and regulatory status of novel forms of creatine",
  url: "https://pubmed.ncbi.nlm.nih.gov/21305891/",
  note: "Monohydrate remains the best-supported form vs newer alternatives",
};

export const batch18: IntentArticleDef[] = [
  {
    slug: "creatine-dosage",
    title: "How Much Creatine Per Day? Dose by Body Weight",
    excerpt:
      "Confused between 3 g, 5 g, and “load 20 g”? Here’s the evidence-based creatine dosage for most people, when a higher dose makes sense, and how to take it without an upset stomach.",
    quickAnswer: `For most healthy adults, the effective creatine dosage is 3–5 g of creatine monohydrate once a day, every day — including rest days. That fills muscle stores in about 3–4 weeks. Larger, very muscular people usually sit at the higher end (~5 g). A short loading phase of about 20 g a day (split into 4 doses) for 5–7 days reaches the same level in roughly a week, then you drop to 3–5 g. You do not need to cycle off. Skip creatine — or ask a doctor first — if you have kidney disease, diabetes affecting the kidneys, are pregnant, under 18, or take medicines that affect the kidneys. ${DISCLAIMER}`,
    categorySlug: "muscle-building",
    subcategorySlug: "muscle-building-nutrition",
    primaryKeyword: "creatine dosage",
    metaTitle: "How Much Creatine Per Day? Dose by Weight",
    metaDescription:
      "Creatine dosage explained: 3–5 g a day for most people, when to use 5 g, optional loading at ~20 g, timing tips, and who should ask a doctor first.",
    tags: ["creatine", "creatine dosage", "supplements", "muscle building", "strength"],
    topics: ["Strength", "Hypertrophy", "Performance", "Beginner Fitness"],
    featuredImageAlt:
      "Measuring scoop of creatine monohydrate powder next to a glass of water",
    relatedSlugs: [
      "is-creatine-safe",
      "how-much-protein-to-build-muscle",
      "beginner-gym-diet-plan",
      "what-is-progressive-overload",
      "is-whey-protein-safe",
    ],
    dayOffset: 9,
    faq: [
      {
        question: "Is 3 g of creatine enough?",
        answer:
          "For many people, yes — especially smaller adults. Studies show about 3 g a day raises muscle creatine over ~28 days. If you are larger or very muscular, 5 g is the usual target so stores fill fully.",
      },
      {
        question: "Should creatine dosage be based on body weight?",
        answer:
          "Research often uses a fixed 3–5 g maintenance dose. Some loading protocols use ~0.3 g per kg for a week (about 20 g for a 70 kg person). For daily use, fixed 3–5 g is simpler and matches most position stands.",
      },
      {
        question: "Can I take more than 5 g a day long term?",
        answer:
          "More than ~5 g a day after muscles are full mainly increases what you pee out, not performance. Stick to 3–5 g once stores are saturated unless a clinician advises otherwise.",
      },
      {
        question: "When should I take my creatine dose?",
        answer:
          "Whenever you will remember it every day. Timing is far less important than consistency. With a meal or shake is fine if your stomach is sensitive.",
      },
      {
        question: "Do I need creatine on rest days?",
        answer:
          "Yes. Muscle creatine stays elevated with a daily dose. Skipping rest days slows saturation and makes it harder to stay consistent.",
      },
    ],
    sources: [SRC_ISSN, SRC_HULTMAN, SRC_ANTONIO, SRC_JAGER],
    body: [
      p(
        "Rohan bought a 250 g tub of creatine monohydrate because his gym WhatsApp group swore by it. The label said “5 g”, his trainer said “load 20 g for a week”, and a YouTube short said “0.3 g per kg or you’re wasting money.” He stood in the kitchen with a scoop that didn’t match any of those numbers.",
        "Creatine dosage looks complicated online. In the research, it is mostly two clear paths that end in the same place: full muscle creatine stores.",
      ),

      h2("The simple answer: 3–5 g a day"),
      p(
        "The International Society of Sports Nutrition (ISSN) position stand supports a daily maintenance dose of about 3–5 g of creatine monohydrate for healthy adults who train. That dose, taken every day, raises muscle creatine by roughly 20% over about 3–4 weeks.",
        "You do not need a different “workout day” dose. Rest days use the same scoop.",
      ),
      table(
        ["Who", "Typical daily dose", "Why"],
        [
          ["Most adults", "3–5 g", "Matches the evidence for filling muscle stores"],
          ["Smaller adults / lighter trainees", "Often ~3 g", "Enough for saturation with less GI risk"],
          ["Larger / highly muscular athletes", "Closer to 5 g", "Slightly higher absolute stores to refill"],
          ["After an optional load", "3–5 g", "Maintains the stores you already filled"],
        ],
      ),
      p(
        `For safety, myths, and kidney caveats, start with <a href="${LINK.creatineSafe}">is creatine safe</a>. Dosage only helps if you also train hard and eat enough protein — see <a href="${LINK.proteinMuscle}">how much protein to build muscle</a>.`,
      ),

      h2("Optional: loading vs slow daily dosing"),
      p(
        "A classic study (Hultman et al., 1996) showed two ways to raise muscle creatine by a similar amount:",
      ),
      table(
        ["Protocol", "How", "Stores full in"],
        [
          ["Loading (optional)", "~20 g/day split into 4 × ~5 g for 5–7 days, then 3–5 g/day", "~1 week"],
          ["No load (recommended for most)", "3–5 g once daily from day one", "~3–4 weeks"],
        ],
      ),
      p(
        `Loading is a speed choice, not a better end result. If you want less water weight jump and less stomach upset, skip the load. Details and trade-offs: <a href="${LINK.creatineLoading}">creatine loading phase — is it necessary?</a>.`,
      ),

      h2("Body-weight formulas (when people mention 0.3 g/kg)"),
      p(
        "Some protocols describe loading as about 0.3 g of creatine per kg of body weight per day for a week. For a 70 kg person that is roughly 21 g — close to the common “20 g split into four” advice.",
        "Maintenance is often described as ~0.03 g/kg (about 2–3 g for many adults), but practice and position stands usually round to a convenient 3–5 g scoop. Use the fixed range unless you have a coach who is tracking a specific protocol.",
      ),
      table(
        ["Body weight", "Rough load day (~0.3 g/kg)", "Usual maintenance"],
        [
          ["55 kg", "~16–17 g (split doses)", "3–5 g"],
          ["70 kg", "~21 g (split doses)", "3–5 g"],
          ["85 kg", "~25 g (split doses)", "3–5 g"],
        ],
      ),

      h2("How to take the dose without an upset stomach"),
      ol([
        "<strong>Use creatine monohydrate</strong> — the form in nearly all the research. Newer forms are covered in <a href=\"" +
          LINK.creatineHcl +
          "\">creatine monohydrate vs HCl</a>.",
        "<strong>Check the scoop</strong> on your tub. Many scoops are 3 g or 5 g; weigh once if the label is unclear.",
        "<strong>Mix in water, milk, curd, juice, or a whey shake.</strong> Food with the dose helps if you get queasy.",
        "<strong>If you load, split it</strong> into 4 smaller servings instead of 20 g at once.",
        "<strong>Stay consistent for 4 weeks</strong> before judging whether it “works” for your lifts.",
      ]),

      h2("Buying tips that protect your dose (India)"),
      ul([
        "Buy plain creatine monohydrate from the brand site or an authorised seller — not the cheapest anonymous listing.",
        "Confirm FSSAI details on the pack; prefer products that state grams of creatine per serving clearly.",
        "Avoid proprietary blends that hide how much creatine you actually get.",
        "Unflavoured is usually cheapest per effective gram and easiest to dose accurately.",
      ]),
      p(
        `Fake and mislabelled supplements are a real issue — the same caution we use for whey in <a href="${LINK.whey}">is whey protein safe</a> applies here.`,
      ),

      h2("Who should not self-dose creatine"),
      ul([
        "Kidney disease or reduced kidney function",
        "Diabetes or blood pressure issues that affect the kidneys",
        "Regular medicines that stress the kidneys (ask a pharmacist or doctor)",
        "Pregnancy, trying to conceive, or breastfeeding",
        "Under 18",
      ]),
      p(
        `Women’s dosing is the same 3–5 g range — see <a href="${LINK.creatineWomen}">creatine for women</a> for myths about “bulk” and bloating. ${DISCLAIMER}`,
      ),

      toolCta(
        "/protein-calculator",
        "protein calculator",
        "Creatine multiplies training you already do. Match it with a clear protein target using the",
      ),

      takeaways([
        "Default creatine dosage: 3–5 g of monohydrate daily, including rest days.",
        "Optional load (~20 g/day split for 5–7 days) only speeds saturation; end result is the same.",
        "Body-weight formulas exist for loading, but fixed 3–5 g maintenance is enough for most people.",
        "Split large doses, take with food if needed, and buy labelled monohydrate from a trusted seller.",
        "Ask a doctor first if you have kidney issues, are pregnant, or are under 18.",
      ]),
    ].join("\n"),
  },
];
