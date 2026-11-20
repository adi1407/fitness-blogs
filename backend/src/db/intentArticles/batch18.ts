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
  creatineDosage:
    "/blog/muscle-building/muscle-building-nutrition/creatine-dosage",
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
  {
    slug: "creatine-loading-phase",
    title: "Creatine Loading Phase: Is It Necessary?",
    excerpt:
      "Should you load creatine at 20 g a day for a week, or just take 3–5 g from day one? What loading actually does, who might bother, and how to avoid stomach upset.",
    quickAnswer: `A creatine loading phase is optional. About 20 g a day (split into four ~5 g doses) for 5–7 days fills muscle creatine in roughly a week; then you maintain with 3–5 g daily. Taking 3–5 g from the start reaches the same muscle levels in about 3–4 weeks, usually with less bloating and less GI discomfort. Load only if you want the effect sooner — for a meet, a short training block, or personal preference. ${DISCLAIMER}`,
    categorySlug: "muscle-building",
    subcategorySlug: "muscle-building-nutrition",
    primaryKeyword: "creatine loading phase",
    metaTitle: "Creatine Loading Phase: Is It Necessary?",
    metaDescription:
      "Is a creatine loading phase necessary? Compare ~20 g/day for a week vs 3–5 g daily, water weight, stomach upset, and when loading is worth it.",
    tags: [
      "creatine",
      "creatine loading",
      "supplements",
      "muscle building",
      "strength",
    ],
    topics: ["Strength", "Hypertrophy", "Performance", "Beginner Fitness"],
    featuredImageAlt:
      "Four small creatine scoops lined up to show a split loading day",
    relatedSlugs: [
      "creatine-dosage",
      "is-creatine-safe",
      "how-much-protein-to-build-muscle",
      "what-is-progressive-overload",
      "beginner-gym-diet-plan",
    ],
    dayOffset: 9,
    faq: [
      {
        question: "Do I have to load creatine?",
        answer:
          "No. Loading only speeds how fast your muscles fill. A steady 3–5 g a day gets you to the same place in a few weeks.",
      },
      {
        question: "How much creatine for a loading phase?",
        answer:
          "Commonly about 20 g per day for 5–7 days, split into four ~5 g servings, then 3–5 g daily. Some protocols use ~0.3 g per kg body weight for the load week.",
      },
      {
        question: "Why does loading make me feel bloated?",
        answer:
          "Creatine pulls water into muscle; higher early doses can raise the scale by 1–2 kg faster. Splitting doses and drinking normally (not gallons) helps. The water is inside muscle, not the same as body fat.",
      },
      {
        question: "Can I load for only 3 days?",
        answer:
          "Shorter loads raise stores somewhat but may not fully match a 5–7 day protocol. If you cut a load short, continue with 3–5 g daily afterward.",
      },
      {
        question: "Should I load again after a break?",
        answer:
          "If you stopped for several weeks, muscle creatine drifts back toward baseline over about 4–6 weeks. You can reload or simply resume 3–5 g daily — same trade-off as the first time.",
      },
    ],
    sources: [SRC_ISSN, SRC_HULTMAN, SRC_ANTONIO],
    body: [
      p(
        "Every new tub seems to come with the same whiteboard math: “Load 20 grams for seven days or you’re doing it wrong.” Loading sounds scientific. It also sounds like a week of chalky drinks and a scale that jumps overnight.",
        "Here is the honest version: loading works, and so does not loading. The difference is mostly speed and comfort — not a permanent strength ceiling.",
      ),

      h2("What “loading” actually means"),
      p(
        "Muscle creatine stores are not empty in healthy people, but they are not usually maxed out either — especially on vegetarian diets with little meat or fish. A loading phase pushes a larger amount of creatine into those stores quickly.",
        "The classic protocol from Hultman et al. (1996) used about 20 g a day for 6 days and raised muscle creatine by roughly 20%. The same study showed that about 3 g a day for 28 days produced a similar rise — just slower.",
      ),
      table(
        ["Approach", "Dose", "Rough timeline to full stores"],
        [
          ["Load then maintain", "~20 g/day (split) for 5–7 days → 3–5 g/day", "~1 week"],
          ["No load", "3–5 g/day from day one", "~3–4 weeks"],
        ],
      ),
      p(
        `For the day-to-day dose after (or instead of) loading, see <a href="${LINK.creatineDosage}">how much creatine per day</a>. Safety and kidney caveats stay the same either way — read <a href="${LINK.creatineSafe}">is creatine safe</a>.`,
      ),

      h2("Is a loading phase necessary?"),
      p(
        "No. Position stands and reviews treat loading as optional. Once stores are full, both paths use the same maintenance dose. You do not “miss out” on muscle forever if you skip the load week.",
      ),
      table(
        ["Situation", "Loading makes more sense?", "Why"],
        [
          ["You want the effect before a short training block or meet", "Maybe", "Faster saturation"],
          ["Sensitive stomach or hate the scale jump", "Usually no", "Smaller daily dose is gentler"],
          ["Vegetarian / low meat intake", "Optional", "You may notice saturation either way; speed is still a preference"],
          ["First time trying creatine", "Usually no", "Easier adherence with one scoop a day"],
        ],
      ),

      h2("How to load without wrecking your gut"),
      ol([
        "<strong>Split the day:</strong> four servings of ~5 g instead of 20 g at once.",
        "<strong>Take with food or a shake</strong> if neat creatine bothers you.",
        "<strong>Use monohydrate</strong> — the form the loading studies used.",
        "<strong>Drink normally.</strong> You do not need extreme water intake; follow thirst and training/heat as usual.",
        "<strong>Drop to 3–5 g</strong> after 5–7 days. Continuing 20 g long term mostly increases what you excrete.",
      ]),

      h2("Water weight and the scale"),
      p(
        "Expect the scale to rise faster with loading because creatine draws water into muscle. That is not the same as gaining fat. Many people see about 0.5–2 kg early on; loading front-loads that change.",
        "If the jump will mess with your head during a fat-loss phase, skip loading and use the slow daily dose.",
      ),

      h2("Who should skip loading (and maybe skip creatine)"),
      ul([
        "Anyone who already gets stomach upset from 5 g — start with 3 g daily instead of loading",
        "People who should ask a doctor before creatine at all (kidney disease, pregnancy, under 18, certain medicines) — see the safety guide",
        "Anyone who will not stay consistent after the load week — maintenance is what keeps stores full",
      ]),
      p(DISCLAIMER),

      toolCta(
        "/one-rep-max-calculator",
        "one-rep max calculator",
        "Creatine helps hard sets add up. Track strength progress with the",
      ),

      takeaways([
        "Loading (~20 g/day split for 5–7 days) fills stores in about a week; 3–5 g daily fills them in 3–4 weeks.",
        "End result after saturation is the same — loading is optional speed, not magic.",
        "Split doses and take with food to reduce stomach upset; then maintain at 3–5 g.",
        "Expect a quicker water-weight bump with loading; skip it if that will derail you.",
        "Safety rules do not change because you loaded — ask a doctor if you have kidney concerns.",
      ]),
    ].join("\n"),
  },
  {
    slug: "creatine-for-women",
    title: "Creatine for Women: Benefits, Dose & Myths",
    excerpt:
      "Will creatine make women bulky? What about bloating, hormones, and the right dose? Evidence-based answers for women who lift — including when to ask a doctor first.",
    quickAnswer: `Women can take creatine. The usual dose is the same as for men: 3–5 g of creatine monohydrate daily with strength training. It does not add “male hormones” or automatic bulk — muscle comes from progressive training and enough protein and calories. Expect possible early water weight inside muscle (often ~0.5–2 kg), not fat. Evidence in healthy women is supportive for strength and training quality; pregnancy, trying to conceive, and breastfeeding still need a clinician’s advice because safety data are limited. ${DISCLAIMER}`,
    categorySlug: "muscle-building",
    subcategorySlug: "muscle-building-nutrition",
    primaryKeyword: "creatine for women",
    metaTitle: "Creatine for Women: Benefits, Dose & Myths",
    metaDescription:
      "Creatine for women: benefits with lifting, 3–5 g dose, bloating vs bulk myths, hormones, and when to ask a doctor — with Indian buying notes.",
    tags: [
      "creatine",
      "creatine for women",
      "supplements",
      "strength training",
      "muscle building",
    ],
    topics: ["Strength", "Hypertrophy", "Women's Fitness", "Beginner Fitness"],
    featuredImageAlt:
      "Woman mixing a shaker bottle in a gym with a small creatine scoop nearby",
    relatedSlugs: [
      "creatine-dosage",
      "is-creatine-safe",
      "how-to-lose-belly-fat",
      "how-much-protein-to-build-muscle",
      "creatine-loading-phase",
    ],
    dayOffset: 9,
    faq: [
      {
        question: "Will creatine make women bulky?",
        answer:
          "No. Creatine is not an anabolic steroid. Any muscle you gain comes from training and nutrition. Most women who lift see fuller muscles and strength gains, not sudden “bulk.”",
      },
      {
        question: "Should women use a different creatine dose?",
        answer:
          "Usually no. 3–5 g daily of monohydrate is the standard range. Smaller adults often do well on ~3 g. Loading is optional for everyone.",
      },
      {
        question: "Does creatine mess with women’s hormones?",
        answer:
          "Creatine is not a hormone. Reviews of creatine in women’s health do not show it acting like testosterone therapy. If you have a hormone-related medical condition, ask your doctor before any supplement.",
      },
      {
        question: "Is creatine okay while trying to lose fat?",
        answer:
          "Yes for many people — it can help you keep training hard in a deficit. The scale may rise slightly from muscle water, which can be confusing during a cut. Track waist, photos, and lifts, not only body weight. See how to lose belly fat for the bigger fat-loss picture.",
      },
      {
        question: "Can I take creatine on my period?",
        answer:
          "Yes. There is no need to stop for a normal menstrual cycle. Stay hydrated as you usually would with training and heat.",
      },
    ],
    sources: [SRC_ISSN, SRC_SMITH_RYAN, SRC_ANTONIO, SRC_HULTMAN],
    body: [
      p(
        "Meera trains three days a week in Bengaluru. Her coach suggested creatine. Her sister said it would make her “look like a man.” A reel said women need a special “female formula.” Meera’s actual question was simpler: does creatine for women work, and is the dose different?",
        "Most of the creatine research historically enrolled men, but women have been studied enough for practical answers — and the dose is not a pink marketing scoop.",
      ),

      h2("What creatine does for women who lift"),
      p(
        "Creatine helps regenerate the energy system muscles use for short, hard efforts: heavy sets, sprints, repeated bursts. With progressive strength training, that often means a few more quality reps over time — which is how strength and muscle are built.",
        "A lifespan review on creatine in women’s health (Smith-Ryan et al., 2021) discusses potential benefits across training and aging contexts, while noting where evidence is still thinner (including pregnancy).",
      ),
      table(
        ["Goal", "What creatine can support", "What it cannot do alone"],
        [
          ["Strength", "Harder training sessions over weeks", "Replace progressive overload"],
          ["Muscle", "Slight edge when paired with lifting + protein", "Create large muscle without calories and training"],
          ["Fat loss", "Help you keep intensity in a deficit", "Burn belly fat by itself"],
        ],
      ),
      p(
        `Pair creatine with solid training and protein. See <a href="${LINK.proteinMuscle}">how much protein to build muscle</a> and, for fat-loss context, <a href="${LINK.bellyFat}">how to lose belly fat</a>.`,
      ),

      h2("Dose: same 3–5 g for women"),
      p(
        `Use creatine monohydrate at <strong>3–5 g per day</strong>, every day. That matches general ISSN dosing guidance. Details and scoop quirks: <a href="${LINK.creatineDosage}">creatine dosage</a>. A loading phase is optional — see <a href="${LINK.creatineLoading}">creatine loading phase</a>.`,
      ),
      ul([
        "Many women prefer starting at 3 g to limit stomach upset",
        "Take it whenever you will remember — timing is secondary to consistency",
        "Rest days still count",
      ]),

      h2("Myth: “It will make me bulky”"),
      p(
        "Bulking requires a calorie surplus and a training stimulus that builds a lot of muscle over months and years. Creatine does not flip a hormonal switch that creates male-pattern muscle overnight.",
        "What you may notice: slightly fuller muscles and a small scale increase from water held inside muscle tissue. Clothes can feel a bit snuger in the gym sense without meaning you “got bulky.”",
      ),

      h2("Myth: “Creatine bloating means I’m retaining junk water”"),
      p(
        "Early water weight is common and mostly intramuscular. Large single doses (especially during aggressive loading) are more likely to feel uncomfortable. Split doses or skip loading if bloating bothers you.",
        `For kidney myths, hair myths, and blood-test creatinine quirks that affect everyone, read <a href="${LINK.creatineSafe}">is creatine safe</a>.`,
      ),

      h2("Pregnancy, PCOS, and medical caution"),
      p(
        "Creatine is not automatically “unsafe,” but research in pregnancy and breastfeeding is limited. If you are pregnant, trying to conceive, or breastfeeding, ask your obstetrician or a qualified clinician before using it.",
        "If you have PCOS, thyroid disease, or other conditions and take prescription medicines, check with your doctor or pharmacist — not a supplement seller — before starting.",
      ),

      h2("Buying notes (India)"),
      ul([
        "Plain creatine monohydrate beats flavoured “women’s creatine” blends that cost more per gram",
        "Check FSSAI labelling and buy from authorised sellers",
        "Ignore proprietary blends that hide the creatine amount",
      ]),
      p(DISCLAIMER),

      toolCta(
        "/protein-calculator",
        "protein calculator",
        "Creatine works best next to a clear protein target. Set yours with the",
      ),

      takeaways([
        "Creatine for women uses the same 3–5 g monohydrate daily dose as for men.",
        "It supports hard training; it does not create automatic bulk or act like a steroid.",
        "Expect possible early muscle water weight; skip loading if that feels worse.",
        "Ask a doctor before use in pregnancy, trying to conceive, breastfeeding, or with kidney concerns.",
        "Buy labelled monohydrate — not expensive “female formula” blends with hidden doses.",
      ]),
    ].join("\n"),
  },
];
