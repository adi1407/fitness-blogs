import {
  DISCLAIMER,
  h2,
  h3,
  ol,
  p,
  SRC,
  table,
  takeaways,
  toolCta,
  ul,
  type IntentArticleDef,
  type IntentSource,
} from "./helpers";

/** Un-numbered on purpose: the boot link pass rewrites them to live numbered URLs. */
const LINK = {
  perDay: "/blog/nutrition/protein/how-much-protein-do-you-need-per-day",
  highProtein: "/blog/nutrition/protein/best-high-protein-indian-foods",
  vegProtein: "/blog/nutrition/protein/vegetarian-protein-sources-india",
  paneer100: "/blog/nutrition/protein/100g-paneer-calories-and-protein",
  chicken100: "/blog/nutrition/protein/100g-chicken-breast-calories-and-protein",
  eggs2: "/blog/nutrition/protein/2-eggs-calories-and-protein",
  whey: "/blog/nutrition/protein/is-whey-protein-safe",
  creatine: "/blog/muscle-building/muscle-building-nutrition/is-creatine-safe",
  proteinMuscle:
    "/blog/muscle-building/muscle-building-nutrition/how-much-protein-to-build-muscle",
  proteinWl: "/blog/weight-loss/weight-loss-nutrition/protein-for-weight-loss",
  timing: "/blog/nutrition/sports-nutrition/protein-before-or-after-workout",
  breakfastWl: "/blog/weight-loss/diet-meal-planning/best-breakfast-for-weight-loss",
  paneerWl: "/blog/weight-loss/weight-loss-nutrition/is-paneer-good-for-weight-loss",
  water: "/blog/nutrition/hydration/how-much-water-should-you-drink",
  breakfastVeg: "/blog/nutrition/protein/high-protein-vegetarian-indian-breakfast",
  beginners: "/blog/nutrition/protein/protein-for-beginners",
  kidneys: "/blog/nutrition/protein/is-too-much-protein-bad-for-kidneys",
  soya: "/blog/nutrition/protein/soya-chunks-protein",
  eggetarian: "/blog/nutrition/protein/protein-sources-for-eggetarians",
  paneerTofu: "/blog/nutrition/protein/paneer-vs-tofu",
  dalChicken: "/blog/nutrition/protein/dal-vs-chicken-for-protein",
  oatsPoha: "/blog/weight-loss/weight-loss-nutrition/oats-vs-poha-for-weight-loss",
  curdMilk: "/blog/nutrition/protein/curd-vs-milk",
};

const SRC_IFCT: IntentSource = {
  title: "Longvah et al. (2017) — Indian Food Composition Tables (ICMR-National Institute of Nutrition)",
  url: "https://www.nin.res.in/",
  note: "Per-100 g values for the Indian foods in this guide",
};
const SRC_DIAAS: IntentSource = {
  title: "FAO (2013) — Dietary protein quality evaluation in human nutrition (DIAAS report)",
  url: "https://www.fao.org/3/i3124e/i3124e.pdf",
  note: "Protein quality: dairy, egg, meat and soy score high; cereals and pulses lower alone",
};
const SRC_ICMR_RDA: IntentSource = {
  title: "ICMR-NIN (2020) — Nutrient Requirements for Indians",
  url: "https://www.nin.res.in/",
  note: "Protein requirement of about 0.83 g per kg body weight for healthy adults",
};
const SRC_MORTON: IntentSource = {
  title: "Morton et al. (2018) — Protein supplementation and resistance training: meta-analysis (Br J Sports Med)",
  url: "https://pubmed.ncbi.nlm.nih.gov/28698222/",
  note: "Muscle gains plateau around 1.6 g/kg/day",
};
const SRC_DEVRIES: IntentSource = {
  title: "Devries et al. (2018) — Changes in kidney function do not differ between healthy adults consuming higher- vs lower-protein diets: meta-analysis (J Nutr)",
  url: "https://pubmed.ncbi.nlm.nih.gov/30383278/",
  note: "No harmful effect of higher protein on kidney function in healthy adults",
};
const SRC_KDOQI: IntentSource = {
  title: "Ikizler et al. (2020) — KDOQI clinical practice guideline for nutrition in CKD (Am J Kidney Dis)",
  url: "https://pubmed.ncbi.nlm.nih.gov/32829751/",
  note: "Protein restriction for people with chronic kidney disease, under supervision",
};
const SRC_REED: IntentSource = {
  title: "Reed et al. (2021) — Neither soy nor isoflavone intake affects male reproductive hormones: meta-analysis (Reprod Toxicol)",
  url: "https://pubmed.ncbi.nlm.nih.gov/33383165/",
  note: "Soy foods do not lower testosterone or raise oestrogen in men",
};
const SRC_EFSA_BG: IntentSource = {
  title: "EFSA (2011) — Scientific opinion on oat beta-glucan and blood cholesterol",
  url: "https://www.efsa.europa.eu/en/efsajournal/pub/2207",
  note: "3 g a day of oat beta-glucan lowers LDL cholesterol",
};

const GUIDE = p(
  `<strong>Explore the guide:</strong> Targets by goal, the best Indian protein foods and every protein article are in the <a href="/nutrition/protein">protein guide</a>. Compare any food in the <a href="/foods/indian">Indian food calories and protein chart</a>.`,
);

export const batch15: IntentArticleDef[] = [
  {
    slug: "high-protein-vegetarian-indian-breakfast",
    title: "High-Protein Vegetarian Indian Breakfast: 10 Ideas",
    excerpt:
      "Ten high-protein vegetarian Indian breakfasts with 15–30 g protein each — chilla, paneer bhurji, soya upma, sprouts, overnight oats and more — with calories, protein and how to upgrade poha, upma and idli.",
    quickAnswer: `The best high-protein vegetarian Indian breakfasts combine a protein-dense food with your usual base: moong dal chilla stuffed with paneer (≈ 21 g protein), paneer bhurji with 2 rotis (≈ 25 g), soya chunk poha or upma (≈ 18 g), overnight oats with milk and hung curd (≈ 21 g), or besan chilla with curd (≈ 16 g). Aim for 20–30 g protein at breakfast. Plain poha, upma or idli alone usually give under 10 g, so add curd, sprouts, peanuts or paneer. ${DISCLAIMER}`,
    categorySlug: "nutrition",
    subcategorySlug: "protein",
    primaryKeyword: "high protein vegetarian breakfast indian",
    metaTitle: "High-Protein Vegetarian Indian Breakfast Ideas",
    metaDescription:
      "10 high-protein vegetarian Indian breakfasts with 15–30 g protein each, calories per serving, and easy ways to add protein to poha, upma and idli.",
    tags: ["high protein breakfast", "vegetarian breakfast", "Indian breakfast", "protein", "paneer"],
    topics: ["Protein", "Indian Nutrition", "Vegetarian"],
    featuredImageAlt: "Indian vegetarian breakfasts: moong chilla with paneer, paneer bhurji with roti and a bowl of overnight oats",
    relatedSlugs: [
      "vegetarian-protein-sources-india",
      "best-breakfast-for-weight-loss",
      "how-much-protein-do-you-need-per-day",
      "soya-chunks-protein",
      "oats-vs-poha-for-weight-loss",
    ],
    dayOffset: 9,
    faq: [
      {
        question: "How much protein should I eat at breakfast?",
        answer:
          "About 20–30 g for most adults, or roughly a quarter of your daily target. Spreading protein across three or four meals works better for muscle than eating most of it at dinner.",
      },
      {
        question: "Which Indian breakfast has the most protein?",
        answer:
          "Paneer bhurji with rotis, moong dal chilla stuffed with paneer, and soya chunk upma or poha are the highest among everyday vegetarian options, at roughly 18–25 g per plate.",
      },
      {
        question: "Is poha a good protein breakfast?",
        answer:
          "Not on its own — a plate of poha has only about 4 g of protein. Add a handful of peanuts, a katori of curd and sprouts or soya granules to bring it to 15 g or more.",
      },
      {
        question: "Can I have a protein shake for breakfast?",
        answer:
          "Yes, if it is convenient. A scoop of whey or plant protein in milk gives 25–30 g. Whole foods are just as effective if you have time to cook them.",
      },
    ],
    sources: [SRC_IFCT, SRC.usdaFdc, SRC_ICMR_RDA, SRC.issnProtein],
    body: [
      p(
        "Most Indian breakfasts — poha, upma, idli, paratha, bread-butter — are built on carbohydrates and give 5–10 g of protein. That leaves a lot to catch up on later. Moving 15–20 g of protein into breakfast keeps you fuller through the morning and makes your daily target far easier to hit.",
      ),

      h2("10 high-protein vegetarian breakfasts"),
      p(
        "Approximate values per serving, from IFCT 2017 for Indian staples and pack labels for oats, soya and besan. Oil is included where listed.",
      ),
      table(
        ["Breakfast", "Serving", "Calories", "Protein"],
        [
          ["Moong dal chilla stuffed with paneer", "2 chillas (50 g dry dal) + 50 g paneer, 1 tsp oil", "≈ 335 kcal", "≈ 21 g"],
          ["Paneer bhurji with roti", "100 g paneer, 1 tsp oil, 2 rotis", "≈ 495 kcal", "≈ 25 g"],
          ["Soya chunk upma or poha", "30 g dry soya + 40 g suji or poha, 1 tsp oil", "≈ 285 kcal", "≈ 20 g"],
          ["Overnight oats", "40 g oats, 150 ml milk, 100 g hung curd, 1 tsp chia", "≈ 390 kcal", "≈ 20 g"],
          ["Besan chilla with curd", "2 chillas (50 g besan), 1 tsp oil, 150 g curd", "≈ 330 kcal", "≈ 16 g"],
          ["Sprouts chaat + curd", "Sprouts from 40 g dry moong, onion, tomato, 150 g curd", "≈ 240 kcal", "≈ 14 g"],
          ["Tofu bhurji with toast", "150 g firm tofu, 1 tsp oil, 2 slices whole-wheat toast", "≈ 400 kcal", "≈ 31 g"],
          ["Upgraded poha", "50 g poha, 15 g peanuts, 1 tsp oil + 150 g curd", "≈ 390 kcal", "≈ 12 g"],
          ["Idli with sambar and curd", "3 idlis, 1 katori sambar, 150 g curd", "≈ 385 kcal", "≈ 15 g"],
          ["Milk + dry fruit + fruit", "300 ml milk, 20 g almonds, 1 banana", "≈ 445 kcal", "≈ 15 g"],
        ],
      ),
      p(
        `Values for <a href="/foods/paneer">paneer</a>, <a href="/foods/moong-dal">moong dal</a>, <a href="/foods/poha">poha</a> and <a href="/foods/cow-milk">milk</a> link to their nutrition pages. See <a href="${LINK.soya}">soya chunks protein</a> and <a href="${LINK.paneerTofu}">paneer vs tofu</a> for those two in detail.`,
      ),

      h2("How to add protein to the breakfasts you already eat"),
      table(
        ["Breakfast", "Add", "Extra protein"],
        [
          ["Poha", "15 g peanuts + ½ katori sprouts + side of curd", "+ 8–10 g"],
          ["Upma", "20 g soya granules cooked in, or paneer cubes", "+ 8–10 g"],
          ["Idli or dosa", "Thick sambar (more dal) + a katori of curd", "+ 6–8 g"],
          ["Paratha", "Paneer or sattu stuffing, curd on the side", "+ 8–12 g"],
          ["Bread toast", "Paneer or tofu bhurji topping, glass of milk", "+ 12–18 g"],
          ["Chai and biscuits", "Swap for a glass of milk and a handful of roasted chana", "+ 10 g"],
        ],
      ),

      h2("Quick weekday options (under 10 minutes)"),
      ul([
        "Overnight oats made the night before.",
        "Hung curd or Greek yogurt with fruit and a spoon of seeds.",
        "Leftover dal turned into a quick chilla or paratha.",
        "Roasted chana and a glass of milk on the go.",
        "Sprouts chaat from pre-soaked moong.",
      ]),

      h2("Why breakfast protein matters"),
      p(
        `Protein is the most filling macronutrient, so a 20–30 g breakfast reduces mid-morning snacking. For muscle, spreading protein across meals works better than eating most of it at night. Your daily total still matters most — see <a href="${LINK.perDay}">how much protein you need per day</a>, or <a href="${LINK.proteinWl}">protein for weight loss</a> if you are cutting.`,
      ),
      p(
        `Watching calories too? The <a href="${LINK.breakfastWl}">best breakfasts for weight loss</a> focuses on lower-calorie options, and <a href="${LINK.oatsPoha}">oats vs poha</a> compares the two most common choices.`,
      ),
      toolCta("/protein-calculator", "protein calculator", "Find your daily target and per-meal split with the"),
      GUIDE,

      takeaways([
        "Aim for 20–30 g protein at breakfast.",
        "Paneer, moong dal, soya, tofu, hung curd and milk are the easiest vegetarian boosters.",
        "Plain poha, upma or idli give under 10 g; add curd, sprouts, peanuts or paneer.",
        "Prepare overnight oats or soaked moong for fast weekday breakfasts.",
      ]),
      p(DISCLAIMER),
    ].join("\n"),
  },

  {
    slug: "protein-for-beginners",
    title: "Protein for Beginners: What It Is & How Much You Need",
    excerpt:
      "A beginner's guide to protein: what it does, how much you need per day for health, fat loss or muscle, how to count it, the best Indian protein foods, when supplements make sense and common myths.",
    quickAnswer: `Protein supplies the amino acids your body uses to build and repair muscle, skin, enzymes and hormones. Healthy adults need at least about 0.8 g per kg of body weight a day; people who exercise do better on 1.2–1.6 g/kg, and those lifting weights to build muscle on 1.6–2.2 g/kg. Spread it over 3–4 meals of 20–40 g. Dal, paneer, curd, milk, soya, eggs, chicken and fish are the easiest Indian sources; supplements are optional. ${DISCLAIMER}`,
    categorySlug: "nutrition",
    subcategorySlug: "protein",
    primaryKeyword: "protein for beginners",
    metaTitle: "Protein for Beginners: How Much You Need",
    metaDescription:
      "Protein for beginners: what protein does, how much you need per day by goal, how to count it, the best Indian protein foods and common myths explained.",
    tags: ["protein", "beginners", "protein intake", "nutrition basics"],
    topics: ["Protein", "Nutrition Basics"],
    featuredImageAlt: "Beginner's protein plate with dal, paneer, curd, eggs and chicken in labelled katoris",
    relatedSlugs: [
      "how-much-protein-do-you-need-per-day",
      "best-high-protein-indian-foods",
      "vegetarian-protein-sources-india",
      "is-too-much-protein-bad-for-kidneys",
      "is-whey-protein-safe",
    ],
    dayOffset: 9,
    faq: [
      {
        question: "How do I know if I'm eating enough protein?",
        answer:
          "Track a typical day once using food labels or our food pages, and compare the total to your target. Most Indians eating dal-roti-rice meals without much dairy, paneer, eggs or meat fall short of 1.2 g/kg.",
      },
      {
        question: "Can I eat all my protein in one meal?",
        answer:
          "Your body will use it, but for muscle building, three or four meals of 20–40 g each work better than one huge meal. It also keeps you fuller through the day.",
      },
      {
        question: "Does protein make you bulky?",
        answer:
          "No. Muscle growth needs hard strength training and, usually, extra calories over months. Eating enough protein on its own does not make anyone bulky.",
      },
      {
        question: "Do women need less protein?",
        answer:
          "Women need the same amount per kg of body weight as men for the same goal. Because they are usually lighter, the total in grams is lower.",
      },
    ],
    sources: [SRC_ICMR_RDA, SRC.issnProtein, SRC_MORTON, SRC_DIAAS, SRC_IFCT],
    body: [
      p(
        "Protein is the nutrient everyone talks about and most people find confusing. Do you need 50 g or 150 g? Is dal enough? Do you need a shake? Here are the basics, in plain language.",
      ),

      h2("What protein does"),
      p(
        "Protein is made of building blocks called amino acids. Your body uses them to build and repair muscle, skin, hair and organs, and to make enzymes, hormones and antibodies. Nine of the amino acids are “essential” — your body cannot make them, so they must come from food.",
        "Protein also keeps you full longer than carbohydrate or fat, which is why higher-protein diets make weight loss easier.",
      ),

      h2("How much protein you need"),
      table(
        ["Your situation", "Protein per kg body weight", "For a 60 kg person"],
        [
          ["Minimum for healthy adults (ICMR-NIN)", "≈ 0.8 g", "≈ 50 g"],
          ["Active, exercising regularly", "1.2–1.6 g", "≈ 70–95 g"],
          ["Lifting weights to build muscle", "1.6–2.2 g", "≈ 95–130 g"],
          ["Losing weight (to keep muscle)", "1.6–2.2 g", "≈ 95–130 g"],
          ["Older adults (60+)", "1.0–1.2 g or more", "≈ 60–70 g"],
        ],
      ),
      p(
        `If you are overweight, use your goal weight or a healthy weight for your height rather than your current weight. For more detail, see <a href="${LINK.perDay}">how much protein you need per day</a> and <a href="${LINK.proteinMuscle}">how much protein to build muscle</a>.`,
      ),

      h2("How to count protein (the simple way)"),
      ol([
        "Write down what you eat in a normal day.",
        "Look up each food on a pack label or our food pages.",
        "Add it up and compare to your target.",
        "Find the meal with the least protein and add one protein food to it.",
      ]),
      p("Handy reference amounts (IFCT 2017):"),
      table(
        ["Food", "Serving", "Protein"],
        [
          ["<a href=\"/foods/chicken-breast\">Chicken breast</a>", "100 g raw", "≈ 22 g"],
          ["<a href=\"/foods/paneer\">Paneer</a>", "100 g", "≈ 19 g"],
          ["Soya chunks", "30 g dry", "≈ 15 g"],
          ["<a href=\"/foods/boiled-egg\">Eggs</a>", "2 whole", "≈ 12 g"],
          ["<a href=\"/foods/rajma\">Rajma</a>", "1 katori cooked (40 g dry)", "≈ 8 g"],
          ["<a href=\"/foods/moong-dal\">Moong dal</a>", "1 katori cooked (30 g dry)", "≈ 7 g"],
          ["<a href=\"/foods/cow-milk\">Milk</a>", "1 glass (200 ml)", "≈ 6.5 g"],
          ["<a href=\"/foods/roti\">Roti</a>", "2 medium", "≈ 6 g"],
          ["Curd", "1 katori (150 g)", "≈ 5 g"],
        ],
      ),
      p(
        `For a longer ranked list, see the <a href="${LINK.highProtein}">best high-protein Indian foods</a> or, for vegetarians, <a href="${LINK.vegProtein}">vegetarian protein sources in India</a>.`,
      ),

      h2("Animal vs plant protein"),
      p(
        "Milk, curd, paneer, eggs, meat, fish and soya contain all nine essential amino acids in good amounts. Dals and grains are each low in one, but eating both across the day fills the gap — dal-chawal and rajma-roti are naturally good combinations. Vegetarians can easily meet their needs with a little planning.",
      ),

      h2("Do you need protein powder?"),
      p(
        `No. Whey or plant protein is a convenient way to add 20–25 g when food is hard to fit in, not a requirement. If you buy one, read <a href="${LINK.whey}">is whey protein safe</a> first. Creatine is a different supplement entirely — see <a href="${LINK.creatine}">is creatine safe</a>.`,
      ),

      h2("Common protein myths"),
      ul([
        `<strong>“High protein damages your kidneys.”</strong> Not in healthy people; people with kidney disease are different. See <a href="${LINK.kidneys}">is too much protein bad for your kidneys</a>.`,
        "<strong>“You can only absorb 30 g at a time.”</strong> You absorb all of it; very large meals are just less efficient for muscle building than several moderate ones.",
        `<strong>“You must drink a shake right after the gym.”</strong> Your daily total matters far more than timing — see <a href="${LINK.timing}">protein before or after a workout</a>.`,
        "<strong>“Vegetarians can't get enough protein.”</strong> They can, with dairy, dal, soya and paneer at most meals.",
      ]),
      toolCta("/protein-calculator", "protein calculator", "Get your personal daily target with the"),
      GUIDE,

      takeaways([
        "Protein builds and repairs tissue and keeps you full.",
        "Healthy adults need at least 0.8 g/kg; active people 1.2–1.6; lifters and dieters 1.6–2.2.",
        "Split it over 3–4 meals of 20–40 g.",
        "Dal, dairy, paneer, soya, eggs, chicken and fish cover it; supplements are optional.",
      ]),
      p(DISCLAIMER),
    ].join("\n"),
  },

  {
    slug: "is-too-much-protein-bad-for-kidneys",
    title: "Is Too Much Protein Bad for Your Kidneys?",
    excerpt:
      "Is a high-protein diet bad for your kidneys? What research shows in healthy people, who does need to limit protein, the creatine vs creatinine confusion, kidney stone risk and which tests to ask your doctor about.",
    quickAnswer: `In healthy adults, research has not found that high-protein diets (up to about 2 g per kg a day) damage the kidneys. People with chronic kidney disease are different: they are usually advised to limit protein under medical supervision. If you have diabetes, high blood pressure, a family history of kidney disease or a past kidney problem, ask your doctor to check your kidney function before raising protein. This article is educational; consult a doctor for personal advice. ${DISCLAIMER}`,
    categorySlug: "nutrition",
    subcategorySlug: "protein",
    primaryKeyword: "is too much protein bad for kidneys",
    metaTitle: "Is Too Much Protein Bad for Your Kidneys?",
    metaDescription:
      "Is high protein bad for your kidneys? What research shows in healthy people, who should limit protein, creatine vs creatinine, and tests to ask a doctor about.",
    tags: ["protein", "kidney health", "high protein diet", "creatinine", "myths"],
    topics: ["Protein", "Health"],
    featuredImageAlt: "Kidney health illustration next to a plate of high-protein Indian foods",
    relatedSlugs: [
      "how-much-protein-do-you-need-per-day",
      "is-whey-protein-safe",
      "is-creatine-safe",
      "protein-for-beginners",
      "how-much-water-should-you-drink",
    ],
    dayOffset: 9,
    faq: [
      {
        question: "How much protein is too much for kidneys?",
        answer:
          "For healthy adults, intakes up to about 2 g per kg a day have not been shown to harm kidney function. There is less long-term data above that, so very high intakes have no proven benefit. People with kidney disease need an individual limit set by their doctor.",
      },
      {
        question: "Does whey protein damage kidneys?",
        answer:
          "Whey is just a concentrated food protein. In healthy people it behaves like protein from milk or paneer. The usual risk with supplements is quality — contamination or mislabelling — not the protein itself.",
      },
      {
        question: "My creatinine is high after starting the gym. Is that kidney damage?",
        answer:
          "Not necessarily. Creatinine rises with more muscle mass, hard exercise, high meat intake and creatine supplements. Tell your doctor about your training and supplements; they may repeat the test after a few rest days or use another test such as cystatin C or urine albumin.",
      },
      {
        question: "Can high protein cause kidney stones?",
        answer:
          "Very high animal-protein intake can raise some stone risk factors, especially if you drink little water. People with a history of stones should follow their doctor's advice; for everyone else, drinking enough water is the main protection.",
      },
    ],
    sources: [SRC_DEVRIES, SRC_KDOQI, SRC.issnProtein, SRC_ICMR_RDA, SRC.hydration],
    body: [
      p(
        "“Too much protein will ruin your kidneys” is one of the most common warnings people hear when they start eating more paneer, eggs or whey. The concern comes from a real fact — people with kidney disease are often told to limit protein — but it has been wrongly applied to everyone.",
      ),

      h2("What happens when you eat more protein"),
      p(
        "Your kidneys filter waste products from protein, such as urea. When protein intake rises, they filter a bit more blood — the glomerular filtration rate goes up. This is a normal adaptation, similar to your heart beating faster during exercise, not damage in itself.",
      ),

      h2("What research shows in healthy people"),
      p(
        "A 2018 meta-analysis of 28 studies compared higher-protein diets with lower or normal-protein diets in adults without kidney disease. It found no difference in changes to kidney function. Sports-nutrition reviews reach the same conclusion for intakes of 1.4–2.0 g per kg in healthy, active people.",
        "There is less long-term evidence for very high intakes (well above 2 g per kg for years), and no proven benefit either — so there is no reason to push protein that high.",
      ),

      h2("Who should be careful with protein"),
      ul([
        "<strong>People with chronic kidney disease (CKD).</strong> Kidney nutrition guidelines recommend reduced protein intakes for many CKD stages, set and monitored by a nephrologist or renal dietitian. Do not raise protein without their advice.",
        "<strong>People with diabetes or high blood pressure</strong> — the two leading causes of kidney disease. Get kidney function checked before a big change in diet.",
        "<strong>People with a single kidney, a kidney transplant or past kidney disease.</strong>",
        "<strong>People with a history of kidney stones</strong>, who should follow their doctor's advice on protein, salt and fluids.",
      ]),

      h2("Tests to ask your doctor about"),
      table(
        ["Test", "What it shows"],
        [
          ["Serum creatinine and eGFR", "How well your kidneys filter (eGFR is calculated from creatinine, age and sex)"],
          ["Urine albumin-to-creatinine ratio (UACR)", "Early kidney damage, especially in diabetes or high blood pressure"],
          ["Cystatin C (sometimes)", "An alternative filtering test less affected by muscle mass"],
          ["Blood pressure and blood sugar (HbA1c)", "The two main risk factors for kidney disease"],
        ],
      ),

      h2("Creatine vs creatinine: a common mix-up"),
      p(
        `Creatinine is a waste product made from creatine in your muscles. Lifters with more muscle, people who eat a lot of meat and people taking creatine supplements often have slightly higher creatinine on blood tests — without any kidney problem. Tell your doctor about your training and supplements so the result is interpreted correctly. See <a href="${LINK.creatine}">is creatine safe</a> for more.`,
      ),

      h2("Sensible protein habits for kidney health"),
      ol([
        `Stay in the evidence-based range: 1.2–2.0 g per kg for active people — see <a href="${LINK.perDay}">how much protein you need per day</a>.`,
        `Drink enough water, especially in hot weather — see <a href="${LINK.water}">how much water you should drink</a>.`,
        "Get protein from a mix of foods: dal, dairy, soya, eggs, fish and chicken, not only supplements.",
        "Keep salt moderate and blood pressure and blood sugar under control.",
        `Buy supplements from brands with third-party testing — see <a href="${LINK.whey}">is whey protein safe</a>.`,
        "Avoid regular use of painkillers such as ibuprofen without medical advice; they can affect the kidneys.",
      ]),
      p(
        `New to protein? Start with <a href="${LINK.beginners}">protein for beginners</a>.`,
      ),
      toolCta("/protein-calculator", "protein calculator", "Find a sensible daily target with the"),
      GUIDE,

      takeaways([
        "In healthy adults, higher-protein diets up to about 2 g/kg have not been shown to harm the kidneys.",
        "People with kidney disease usually need to limit protein under medical supervision.",
        "If you have diabetes, high BP or kidney history, get tested before raising protein.",
        "High creatinine in lifters can reflect muscle and creatine use, not kidney damage — discuss it with your doctor.",
        "Drink enough water and get protein from varied foods.",
      ]),
      p(DISCLAIMER),
    ].join("\n"),
  },

  {
    slug: "soya-chunks-protein",
    title: "Soya Chunks Protein: Per 100 g, Per Serving & Safety",
    excerpt:
      "How much protein soya chunks have per 100 g and per serving, how they compare with paneer, eggs and chicken, how much to eat a day, whether soya affects hormones in men and women, and easy Indian recipes.",
    quickAnswer: `Dry soya chunks have about 50–52 g of protein per 100 g, with roughly 345 kcal and almost no fat, according to common pack labels. A typical 30 g dry serving gives about 15 g protein for 105 kcal — more protein per calorie than paneer, eggs or dal. Research shows normal soya intake does not lower testosterone or raise oestrogen in men. 25–50 g dry a day is a sensible amount for most people. ${DISCLAIMER}`,
    categorySlug: "nutrition",
    subcategorySlug: "protein",
    primaryKeyword: "soya chunks protein",
    metaTitle: "Soya Chunks Protein Per 100g & Per Serving",
    metaDescription:
      "Soya chunks protein per 100 g and per serving, compared with paneer, eggs and chicken, how much to eat a day, soya and hormones, and easy Indian recipes.",
    tags: ["soya chunks", "soy protein", "vegetarian protein", "meal maker", "nutrela"],
    topics: ["Protein", "Vegetarian", "Indian Nutrition"],
    featuredImageAlt: "Bowl of dry soya chunks next to a soya chunk curry",
    relatedSlugs: [
      "vegetarian-protein-sources-india",
      "paneer-vs-tofu",
      "best-high-protein-indian-foods",
      "high-protein-vegetarian-indian-breakfast",
      "protein-for-beginners",
    ],
    dayOffset: 9,
    faq: [
      {
        question: "How much protein is in 100 g of cooked soya chunks?",
        answer:
          "Soya chunks roughly triple in weight when soaked and cooked, so 100 g cooked is about 33 g dry — around 17 g of protein. Always measure dry weight for accurate tracking.",
      },
      {
        question: "Is it safe to eat soya chunks every day?",
        answer:
          "Yes, in normal amounts such as 25–50 g dry a day as part of a varied diet. People with a soy allergy should avoid them, and people on thyroid medication should take it at a consistent time apart from soy-rich meals and follow their doctor's advice.",
      },
      {
        question: "Do soya chunks cause gas?",
        answer:
          "They can, because of their fibre and some carbohydrates. Soak them well, squeeze out the water, start with smaller portions and increase gradually.",
      },
      {
        question: "Are soya chunks better than whey?",
        answer:
          "Per calorie, both are excellent. Whey is more convenient and digests faster; soya chunks are cheaper and add fibre. Either can help you reach your daily protein target.",
      },
    ],
    sources: [SRC.usdaFdc, SRC_REED, SRC_DIAAS, SRC_IFCT, SRC_ICMR_RDA],
    body: [
      p(
        "Soya chunks (often sold as “meal maker”) are made from defatted soy flour — the soybean with most of the oil removed. That makes them one of the most protein-dense and cheapest foods in an Indian kitchen, especially useful for vegetarians.",
      ),

      h2("Soya chunks nutrition per 100 g (dry)"),
      table(
        ["Nutrient", "Per 100 g dry (typical label)"],
        [
          ["Calories", "≈ 345 kcal"],
          ["Protein", "≈ 50–52 g"],
          ["Carbohydrates", "≈ 33 g"],
          ["Fibre", "≈ 13 g"],
          ["Fat", "≈ 0.5–1 g"],
        ],
      ),
      p("Brands differ slightly — check your pack. Whole soybean, by comparison, has 37.8 g protein and 19.4 g fat per 100 g (IFCT 2017)."),

      h2("Protein per serving"),
      table(
        ["Dry weight", "Cooked (approx.)", "Calories", "Protein"],
        [
          ["20 g (small handful)", "≈ 60 g", "≈ 70 kcal", "≈ 10 g"],
          ["30 g (1 serving)", "≈ 90 g", "≈ 105 kcal", "≈ 15 g"],
          ["50 g (large serving)", "≈ 150 g", "≈ 175 kcal", "≈ 25 g"],
        ],
      ),

      h2("Soya chunks vs other protein foods"),
      table(
        ["Food", "Serving", "Protein", "Calories for 10 g protein"],
        [
          ["Soya chunks", "30 g dry", "≈ 15 g", "≈ 70 kcal"],
          ["<a href=\"/foods/chicken-breast\">Chicken breast</a>", "100 g raw", "21.8 g", "≈ 77 kcal"],
          ["<a href=\"/foods/egg-white\">Egg whites</a>", "3 whites", "11.1 g", "≈ 43 kcal"],
          ["<a href=\"/foods/boiled-egg\">Whole eggs</a>", "2 eggs", "12.1 g", "≈ 110 kcal"],
          ["<a href=\"/foods/paneer\">Paneer</a>", "100 g", "18.9 g", "≈ 137 kcal"],
          ["<a href=\"/foods/moong-dal\">Moong dal</a>", "30 g dry", "7.2 g", "≈ 137 kcal"],
        ],
      ),
      p(
        `Among vegetarian foods, only soya comes close to lean meat for protein per calorie. See <a href="${LINK.vegProtein}">vegetarian protein sources in India</a> and <a href="${LINK.paneerTofu}">paneer vs tofu</a> for more comparisons.`,
      ),

      h2("Does soya affect hormones?"),
      p(
        "Soya contains isoflavones, plant compounds that are sometimes called “phyto-oestrogens”. This has led to worries about lower testosterone or “man boobs”. A 2021 meta-analysis of 41 clinical studies found that soy protein and isoflavone intake did not affect testosterone, free testosterone or oestrogen levels in men. Case reports of problems involve extremely high intakes far beyond normal diets.",
        "For women, normal soy food intake is considered safe, including for most women with a history of breast cancer according to cancer organisations — but anyone with a hormone-sensitive condition should follow their doctor's advice.",
      ),

      h2("How much soya to eat a day"),
      ul([
        "25–50 g dry soya chunks a day is a sensible amount for most adults.",
        "Mix it with other proteins — dal, dairy, eggs — rather than relying on one food.",
        "If you take thyroid medication, take it consistently and follow your doctor's advice on timing around soy-rich meals.",
        "Avoid soya if you have a soy allergy.",
      ]),

      h2("How to cook soya chunks well"),
      ol([
        "Boil in salted water for 5 minutes, or soak in hot water for 15–20 minutes.",
        "Rinse in cold water and squeeze out as much water as possible — this removes the beany taste.",
        "Marinate in curd and spices for 15 minutes, or add straight to a masala.",
      ]),
      h3("Easy Indian recipes"),
      ul([
        "Soya chunk curry (with onion-tomato masala) with rice or roti.",
        "Soya pulao or biryani — add 30 g dry chunks per person.",
        "Soya keema made from soya granules.",
        "Soya poha or upma for breakfast — see <a href=\"" + LINK.breakfastVeg + "\">high-protein vegetarian Indian breakfasts</a>.",
        "Soya tikka on skewers with capsicum and onion.",
      ]),
      toolCta("/protein-calculator", "protein calculator", "Work out how much protein you need with the"),
      GUIDE,

      takeaways([
        "Dry soya chunks have about 50–52 g protein per 100 g and very little fat.",
        "30 g dry gives about 15 g protein for 105 kcal — excellent protein per calorie.",
        "Normal soya intake does not lower testosterone or raise oestrogen in men.",
        "25–50 g dry a day, mixed with other protein foods, suits most people.",
      ]),
      p(DISCLAIMER),
    ].join("\n"),
  },

  {
    slug: "protein-sources-for-eggetarians",
    title: "Protein Sources for Eggetarians (+ 96 g Day)",
    excerpt:
      "The best protein sources for eggetarians — eggs, egg whites, dairy, dals, soya — ranked by protein per serving, how many eggs a day is fine, and a sample day with about 96 g protein.",
    quickAnswer: `Eggetarians have it easier than strict vegetarians: eggs add high-quality, cheap protein to a dairy and dal diet. The best sources are whole eggs (≈ 6 g protein each), egg whites (≈ 3.7 g each, almost no fat), paneer, hung curd, milk, soya chunks, dals and rajma. A day built around 3–4 eggs, dal, curd and milk easily reaches 90–100 g protein. ${DISCLAIMER}`,
    categorySlug: "nutrition",
    subcategorySlug: "protein",
    primaryKeyword: "protein sources for eggetarians",
    metaTitle: "Protein Sources for Eggetarians (Indian Diet)",
    metaDescription:
      "The best protein sources for eggetarians ranked per serving — eggs, egg whites, paneer, curd, soya and dal — how many eggs a day, and a 96 g protein sample day.",
    tags: ["eggetarian", "eggs", "protein sources", "Indian diet", "egg whites"],
    topics: ["Protein", "Indian Nutrition"],
    featuredImageAlt: "Eggetarian protein foods: boiled eggs, omelette, paneer, curd, dal and milk",
    relatedSlugs: [
      "2-eggs-calories-and-protein",
      "vegetarian-protein-sources-india",
      "best-high-protein-indian-foods",
      "protein-for-beginners",
      "high-protein-vegetarian-indian-breakfast",
    ],
    dayOffset: 9,
    faq: [
      {
        question: "How many eggs a day is safe?",
        answer:
          "For most healthy adults, 1–3 whole eggs a day fits a healthy diet, and many studies find no rise in heart risk at that level. If you have diabetes, high LDL cholesterol or heart disease, ask your doctor — and use more egg whites, which have no cholesterol.",
      },
      {
        question: "Are egg whites better than whole eggs?",
        answer:
          "Egg whites give protein with almost no fat or calories, which helps when calories are tight. Whole eggs add vitamins A, D, B12, choline and healthy fats from the yolk. A mix, such as 2 whole eggs plus 2 whites, works well.",
      },
      {
        question: "Is a boiled egg or an omelette better?",
        answer:
          "Protein is the same. Boiled eggs have no added fat; an omelette adds whatever oil or butter you cook it in — about 45 kcal per teaspoon.",
      },
      {
        question: "Can eggetarians build muscle without meat?",
        answer:
          "Yes. Eggs and dairy are among the highest-quality proteins available. Hitting 1.6–2.2 g of protein per kg from eggs, dairy, dal and soya is very achievable.",
      },
    ],
    sources: [SRC_IFCT, SRC_DIAAS, SRC.issnProtein, SRC_ICMR_RDA],
    body: [
      p(
        "Eggetarian diets — vegetarian plus eggs — are common across India. Eggs are cheap, quick to cook and among the highest-quality proteins in the world, so adding even two a day makes a big difference to a dal-and-dairy diet.",
      ),

      h2("Best protein sources for eggetarians"),
      p("Ranked by protein per typical serving (IFCT 2017; soya from pack labels)."),
      table(
        ["Food", "Serving", "Calories", "Protein"],
        [
          ["<a href=\"/foods/paneer\">Paneer</a>", "100 g", "258 kcal", "18.9 g"],
          ["<a href=\"/foods/omelette\">Omelette</a>", "2-egg omelette (110 g)", "187 kcal", "18.2 g"],
          ["Soya chunks", "30 g dry", "≈ 105 kcal", "≈ 15 g"],
          ["<a href=\"/foods/boiled-egg\">Boiled eggs</a>", "2 eggs", "133 kcal", "12.1 g"],
          ["<a href=\"/foods/egg-white\">Egg whites</a>", "3 whites", "48 kcal", "11.1 g"],
          ["Hung curd / Greek yogurt", "150 g", "≈ 150 kcal", "≈ 13 g"],
          ["<a href=\"/foods/rajma\">Rajma</a>", "1 katori (40 g dry)", "120 kcal", "8.0 g"],
          ["<a href=\"/foods/moong-dal\">Moong dal</a>", "1 katori (30 g dry)", "98 kcal", "7.2 g"],
          ["<a href=\"/foods/cow-milk\">Milk</a>", "1 glass (200 ml)", "146 kcal", "6.5 g"],
          ["<a href=\"/foods/peanuts\">Peanuts</a>", "30 g", "156 kcal", "7.1 g"],
        ],
      ),
      p(
        `For the full numbers on eggs, see <a href="${LINK.eggs2}">2 eggs: calories and protein</a>. For the vegetarian side, see <a href="${LINK.vegProtein}">vegetarian protein sources in India</a>.`,
      ),

      h2("Whole eggs vs egg whites"),
      table(
        ["", "1 whole egg (45 g)", "1 egg white (30 g)"],
        [
          ["Calories", "≈ 67 kcal", "≈ 16 kcal"],
          ["Protein", "≈ 6.0 g", "≈ 3.7 g"],
          ["Fat", "≈ 4.7 g", "≈ 0.1 g"],
          ["Extras", "Vitamins A, D, B12, choline in the yolk", "Almost pure protein"],
        ],
      ),

      h2("Sample eggetarian day: about 96 g protein"),
      table(
        ["Meal", "What to eat", "Calories", "Protein"],
        [
          ["Breakfast", "Omelette of 2 whole eggs + 2 whites (1 tsp oil), 2 slices whole-wheat toast", "≈ 350 kcal", "≈ 25 g"],
          ["Lunch", "2 rotis, 1 katori rajma, 1 katori sabzi, 1 katori curd", "≈ 500 kcal", "≈ 21 g"],
          ["Evening", "1 glass milk, 30 g roasted chana", "≈ 255 kcal", "≈ 12.5 g"],
          ["Dinner", "Egg curry (2 eggs, 1 tsp oil), 1 katori rice, 1 katori moong dal, salad", "≈ 475 kcal", "≈ 23 g"],
          ["Before bed", "150 g hung curd with fruit", "≈ 150 kcal", "≈ 13.5 g"],
          ["<strong>Total</strong>", "", "<strong>≈ 1,730 kcal</strong>", "<strong>≈ 96 g</strong>"],
        ],
      ),
      p(
        "Scale portions up or down for your calorie target — the protein foods are what make the day work. Larger or more active people can add a roti and a glass of milk; people losing weight can swap the rice for extra sabzi.",
      ),

      h2("Tips for eggetarians"),
      ul([
        "Boil 6–8 eggs at once; they keep in the fridge for about a week (shell on).",
        "Use egg whites to raise protein without much extra fat.",
        "Have dairy or dal at every meal that has no eggs.",
        `Try soya once or twice a week — see <a href="${LINK.soya}">soya chunks protein</a>.`,
        `Breakfast is the easiest place to fit eggs — more ideas in <a href="${LINK.breakfastWl}">the best breakfasts for weight loss</a>.`,
      ]),
      toolCta("/protein-calculator", "protein calculator", "Find your daily protein target with the"),
      GUIDE,

      takeaways([
        "Eggs make it easy for eggetarians to hit 90–100 g of protein a day.",
        "Each whole egg has about 6 g protein; each white about 3.7 g with almost no fat.",
        "Combine eggs with paneer, curd, milk, dal and soya through the day.",
        "1–3 whole eggs a day suits most healthy adults; ask your doctor if you have heart or cholesterol issues.",
      ]),
      p(DISCLAIMER),
    ].join("\n"),
  },

  {
    slug: "paneer-vs-tofu",
    title: "Paneer vs Tofu: Protein, Calories & Which Is Better",
    excerpt:
      "Paneer vs tofu compared per 100 g and per 10 g of protein: calories, fat, calcium and price, which is better for weight loss or muscle gain, and how to swap one for the other in Indian recipes.",
    quickAnswer: `Paneer and firm tofu have similar protein per 100 g (about 17–19 g), but paneer has roughly twice the calories (≈ 258 vs ≈ 140 kcal) because it is much higher in fat. That makes tofu better for weight loss, while paneer is handy when you need extra calories, such as when bulking. Both are rich in calcium. Packaged tofu in India varies a lot, so check the label: soft tofu can have half the protein of firm. ${DISCLAIMER}`,
    categorySlug: "nutrition",
    subcategorySlug: "protein",
    primaryKeyword: "paneer vs tofu",
    metaTitle: "Paneer vs Tofu: Protein, Calories & Which Wins",
    metaDescription:
      "Paneer vs tofu: protein, calories, fat and calcium per 100 g, calories per 10 g protein, which is better for weight loss or muscle and how to swap in recipes.",
    tags: ["paneer", "tofu", "vegetarian protein", "food comparison", "weight loss"],
    topics: ["Protein", "Vegetarian", "Food Comparisons"],
    featuredImageAlt: "Cubes of paneer and tofu side by side on a wooden board",
    relatedSlugs: [
      "100g-paneer-calories-and-protein",
      "is-paneer-good-for-weight-loss",
      "soya-chunks-protein",
      "vegetarian-protein-sources-india",
      "dal-vs-chicken-for-protein",
    ],
    dayOffset: 9,
    faq: [
      {
        question: "Is tofu healthier than paneer?",
        answer:
          "Neither is unhealthy. Tofu is lower in calories and saturated fat; paneer is a good dairy source of calcium and protein. Choose based on your calorie needs and taste.",
      },
      {
        question: "Can I replace paneer with tofu in any recipe?",
        answer:
          "Mostly yes. Use firm or extra-firm tofu, press out the water for 15–20 minutes, and cook it a little longer so it browns. It works well in bhurji, tikka, palak and matar dishes.",
      },
      {
        question: "Does tofu have more protein than paneer?",
        answer:
          "Firm tofu has slightly less or similar protein per 100 g, but much more protein per calorie. Soft or silken tofu has considerably less.",
      },
      {
        question: "Is low-fat paneer a good middle ground?",
        answer:
          "Yes. Paneer made from toned or skimmed milk has fewer calories and similar or higher protein than full-fat paneer. Check the pack label.",
      },
    ],
    sources: [SRC_IFCT, SRC.usdaFdc, SRC_REED, SRC_DIAAS],
    body: [
      p(
        "Paneer is made by curdling milk; tofu by curdling soy milk. They look similar, cook in similar ways and are both popular vegetarian proteins — but their calorie and fat content are very different.",
      ),

      h2("Paneer vs tofu per 100 g"),
      p(
        "Paneer from IFCT 2017; tofu values for firm tofu (calcium-set) from USDA FoodData Central. Indian packaged tofu ranges widely — roughly 70–150 kcal and 8–17 g protein — so check your label.",
      ),
      table(
        ["Per 100 g", "Paneer", "Firm tofu"],
        [
          ["Calories", "258 kcal", "≈ 144 kcal"],
          ["Protein", "18.9 g", "≈ 17.3 g"],
          ["Fat", "14.8 g", "≈ 8.7 g"],
          ["Carbohydrates", "12.4 g", "≈ 2.8 g"],
          ["Calcium", "476 mg", "≈ 680 mg (calcium-set)"],
          ["Fibre", "0 g", "≈ 2 g"],
        ],
      ),

      h2("Protein per calorie"),
      table(
        ["Food", "Calories for 10 g protein", "Grams for 20 g protein"],
        [
          ["Firm tofu", "≈ 83 kcal", "≈ 115 g"],
          ["Low-fat paneer (typical label)", "≈ 90–110 kcal", "≈ 100–110 g"],
          ["Full-fat paneer", "≈ 137 kcal", "≈ 106 g"],
        ],
      ),
      p(
        `If you are counting calories, tofu gives the same protein for about 40% fewer calories. For full paneer numbers see <a href="${LINK.paneer100}">100 g paneer calories and protein</a>.`,
      ),

      h2("Which is better for your goal?"),
      table(
        ["Goal", "Better choice", "Why"],
        [
          ["Weight loss", "Tofu (or low-fat paneer)", "Fewer calories and less fat for the same protein"],
          ["Muscle gain / bulking", "Either; paneer adds easy calories", "Paneer's fat helps reach a calorie surplus"],
          ["Heart health / cholesterol", "Tofu", "Less saturated fat"],
          ["Calcium", "Both are good sources", "Choose calcium-set tofu"],
          ["Lactose intolerance", "Tofu", "Paneer has small amounts of lactose"],
          ["Taste in Indian dishes", "Paneer", "Creamier, holds masala well"],
        ],
      ),
      p(
        `Still prefer paneer on a diet? That works with portions — see <a href="${LINK.paneerWl}">is paneer good for weight loss</a>.`,
      ),

      h2("Swapping paneer for tofu in recipes"),
      ol([
        "Buy firm or extra-firm tofu for curries, tikka and bhurji.",
        "Press it: wrap in a cloth, place something heavy on top for 15–20 minutes.",
        "Cut into cubes and pan-sear or air-fry until golden before adding to masala.",
        "Add a spoon of curd or a little cream to the gravy if you miss paneer's richness.",
      ]),
      h3("Dishes that work well with tofu"),
      ul(["Tofu bhurji with onion, tomato and haldi", "Palak tofu", "Tofu tikka", "Matar tofu", "Tofu in kathi rolls"]),

      h2("What about soya?"),
      p(
        `Tofu, soya chunks and soy milk come from the same bean. Soy foods eaten in normal amounts do not affect male hormones, according to a large 2021 meta-analysis. If you want the most protein per calorie, dry soya chunks beat both — see <a href="${LINK.soya}">soya chunks protein</a>. For a non-veg comparison, see <a href="${LINK.dalChicken}">dal vs chicken for protein</a>.`,
      ),
      toolCta("/protein-calculator", "protein calculator", "See how much paneer or tofu fits your daily target with the"),
      GUIDE,

      takeaways([
        "Paneer and firm tofu have similar protein per 100 g; paneer has about twice the calories.",
        "Tofu gives 10 g protein for about 83 kcal; full-fat paneer for about 137 kcal.",
        "Tofu suits weight loss; paneer suits bulking and classic Indian dishes.",
        "Indian packaged tofu varies — always check the label for protein per 100 g.",
      ]),
      p(DISCLAIMER),
    ].join("\n"),
  },

  {
    slug: "dal-vs-chicken-for-protein",
    title: "Dal vs Chicken for Protein: Which Is Better?",
    excerpt:
      "Dal vs chicken compared for protein: grams per serving and per calorie, protein quality, fibre and cost, how much dal you'd need to match chicken, and how to build a high-protein vegetarian plate.",
    quickAnswer: `Chicken breast gives far more protein per serving and per calorie: about 22 g in 100 g raw (168 kcal), versus about 7 g in a katori of cooked dal (30 g dry, ≈ 98 kcal). To match 100 g of chicken you would need about 3 katoris of dal (≈ 300 kcal). Dal is lower in quality on its own but pairs well with rice or roti, and it adds fibre chicken lacks. For vegetarians, dal works best combined with paneer, curd or soya. ${DISCLAIMER}`,
    categorySlug: "nutrition",
    subcategorySlug: "protein",
    primaryKeyword: "dal vs chicken protein",
    metaTitle: "Dal vs Chicken for Protein: Which Is Better?",
    metaDescription:
      "Dal vs chicken for protein: grams per serving and per calorie, protein quality, fibre, how much dal equals 100 g chicken, and better vegetarian combinations.",
    tags: ["dal", "chicken", "protein", "food comparison", "vegetarian vs non-veg"],
    topics: ["Protein", "Food Comparisons", "Indian Nutrition"],
    featuredImageAlt: "A katori of moong dal next to a plate of grilled chicken breast",
    relatedSlugs: [
      "100g-chicken-breast-calories-and-protein",
      "vegetarian-protein-sources-india",
      "best-high-protein-indian-foods",
      "paneer-vs-tofu",
      "protein-for-beginners",
    ],
    dayOffset: 9,
    faq: [
      {
        question: "Is dal a complete protein?",
        answer:
          "Not on its own: dal is low in the amino acid methionine. Grains are low in lysine, which dal has plenty of, so dal-rice and dal-roti together give a much more complete protein. You don't need to combine them at the same meal.",
      },
      {
        question: "Which dal has the most protein?",
        answer:
          "Per 100 g dry, masoor (24.4 g) and moong dal (23.9 g) are highest, followed by toor (21.7 g) and chana dal (21.6 g), according to IFCT 2017. In a katori, the difference is under 1 g.",
      },
      {
        question: "Can I build muscle on dal without chicken?",
        answer:
          "Yes, but rarely on dal alone. Add paneer, curd, milk, soya or eggs to reach 1.6 g of protein per kg. Dal is an excellent part of a high-protein vegetarian diet rather than the whole of it.",
      },
      {
        question: "Does cooking chicken change its protein?",
        answer:
          "No — cooking removes water, so 100 g raw becomes about 70–75 g cooked with the same protein. That is why cooked chicken shows a higher protein per 100 g than raw.",
      },
    ],
    sources: [SRC_IFCT, SRC_DIAAS, SRC.issnProtein, SRC_ICMR_RDA],
    body: [
      p(
        "Dal is the backbone of protein in most Indian homes, and chicken is the first thing people add when they want more. Comparing them shows why dal alone rarely covers a high-protein target — and how to make it work if you don't eat meat.",
      ),

      h2("Dal vs chicken: protein per serving"),
      p("Values from IFCT 2017. Dals weighed dry; one katori of cooked dal uses about 30 g dry."),
      table(
        ["Food", "Serving", "Calories", "Protein", "Fibre"],
        [
          ["<a href=\"/foods/chicken-breast\">Chicken breast</a>", "100 g raw (≈ 75 g cooked)", "168 kcal", "21.8 g", "0 g"],
          ["<a href=\"/foods/chicken-thigh\">Chicken thigh</a>", "100 g raw", "200 kcal", "18.2 g", "0 g"],
          ["<a href=\"/foods/masoor-dal\">Masoor dal</a>", "1 katori (30 g dry)", "97 kcal", "7.3 g", "3.1 g"],
          ["<a href=\"/foods/moong-dal\">Moong dal</a>", "1 katori (30 g dry)", "98 kcal", "7.2 g", "2.8 g"],
          ["<a href=\"/foods/toor-dal\">Toor dal</a>", "1 katori (30 g dry)", "99 kcal", "6.5 g", "2.7 g"],
          ["<a href=\"/foods/chana-dal\">Chana dal</a>", "1 katori (30 g dry)", "99 kcal", "6.5 g", "4.5 g"],
          ["<a href=\"/foods/rajma\">Rajma</a>", "1 katori (40 g dry)", "120 kcal", "8.0 g", "6.6 g"],
        ],
      ),

      h2("How much dal equals 100 g of chicken?"),
      table(
        ["To get 22 g protein from", "Amount", "Calories"],
        [
          ["Chicken breast", "100 g raw", "≈ 168 kcal"],
          ["Moong dal", "≈ 92 g dry (about 3 katoris cooked)", "≈ 300 kcal"],
          ["Rajma", "≈ 110 g dry (nearly 3 katoris)", "≈ 330 kcal"],
        ],
      ),
      p(
        "Three katoris of dal is a lot of food, and almost twice the calories. Dal also brings 60% of its calories from carbohydrate, so it fills you up and fuels you, but it is not a lean protein source the way chicken is.",
      ),

      h2("Protein quality"),
      p(
        "Chicken contains all nine essential amino acids in the right proportions. Dal is short in methionine, while wheat and rice are short in lysine — which dal supplies. Together they complement each other, which is why dal-chawal and dal-roti work so well. Over a day of mixed meals, vegetarians get a complete amino acid profile without careful combining.",
      ),

      h2("What dal does better"),
      ul([
        "<strong>Fibre:</strong> 3–7 g per katori, which chicken lacks entirely — good for digestion, fullness and blood sugar.",
        "<strong>Cost:</strong> dal is usually cheaper per gram of protein than chicken.",
        "<strong>Minerals:</strong> iron, folate, magnesium and potassium.",
        "<strong>Environment:</strong> pulses use far less land and water than meat.",
      ]),

      h2("Building a high-protein vegetarian plate around dal"),
      table(
        ["Plate", "Protein"],
        [
          ["1 katori dal + 2 rotis + 1 katori curd", "≈ 18 g"],
          ["Above + 50 g paneer", "≈ 27 g"],
          ["1 katori dal + 1 katori soya curry (30 g dry) + 1 katori rice", "≈ 26 g"],
          ["Thick dal (50 g dry) + 2 rotis + 150 g hung curd", "≈ 31 g"],
        ],
      ),
      p(
        `More options in <a href="${LINK.vegProtein}">vegetarian protein sources in India</a>, <a href="${LINK.paneerTofu}">paneer vs tofu</a> and <a href="${LINK.soya}">soya chunks protein</a>. If you eat chicken, see <a href="${LINK.chicken100}">100 g chicken breast calories and protein</a>.`,
      ),

      h2("The verdict"),
      p(
        "For lean protein per calorie, chicken wins clearly. For an all-round food — protein, fibre, minerals, cost — dal is excellent. The best diets use both, or for vegetarians, dal plus dairy and soya.",
      ),
      toolCta("/protein-calculator", "protein calculator", "Check how much protein you need each day with the"),
      GUIDE,

      takeaways([
        "100 g raw chicken breast ≈ 22 g protein; 1 katori dal ≈ 7 g.",
        "Matching chicken's protein takes about 3 katoris of dal and nearly twice the calories.",
        "Dal + grains together give a complete protein; dal adds fibre chicken lacks.",
        "Vegetarians should pair dal with paneer, curd, milk or soya to reach high targets.",
      ]),
      p(DISCLAIMER),
    ].join("\n"),
  },

  {
    slug: "oats-vs-poha-for-weight-loss",
    title: "Oats vs Poha for Weight Loss: Which Is Better?",
    excerpt:
      "Oats vs poha compared for weight loss: calories, protein and fibre per serving, which keeps you fuller, glycaemic response, how toppings change everything, and better ways to make each one.",
    quickAnswer: `Oats are slightly better for weight loss: per 100 g they have nearly twice the protein and about three times the fibre of poha for similar calories, so a bowl keeps most people fuller. Poha is still a good breakfast if you control the oil, add peanuts or sprouts for protein and serve it with curd. How you cook and top either one matters more than which you choose — instant flavoured oats and oily poha both undo the benefit. ${DISCLAIMER}`,
    categorySlug: "weight-loss",
    subcategorySlug: "weight-loss-nutrition",
    primaryKeyword: "oats vs poha for weight loss",
    metaTitle: "Oats vs Poha for Weight Loss: Which Is Better?",
    metaDescription:
      "Oats vs poha for weight loss: calories, protein and fibre per serving, which keeps you fuller, how toppings change it and healthier ways to make both.",
    tags: ["oats", "poha", "breakfast", "weight loss", "food comparison"],
    topics: ["Weight Loss", "Indian Nutrition", "Food Comparisons"],
    featuredImageAlt: "A bowl of vegetable poha next to a bowl of oats with fruit",
    relatedSlugs: [
      "best-breakfast-for-weight-loss",
      "high-protein-vegetarian-indian-breakfast",
      "best-indian-foods-for-weight-loss",
      "protein-for-weight-loss",
      "curd-vs-milk",
    ],
    dayOffset: 9,
    faq: [
      {
        question: "Is poha good for weight loss?",
        answer:
          "Yes, in a measured portion (about 50 g dry) cooked with 1 teaspoon of oil and plenty of vegetables, served with curd. Large plates cooked in a lot of oil and topped with sev and namkeen are not.",
      },
      {
        question: "Are instant masala oats healthy?",
        answer:
          "They are better than many packaged breakfasts but often contain added salt, sugar and flavourings, and less fibre per serving. Plain rolled oats cooked with vegetables and spices give you more control.",
      },
      {
        question: "Can I eat oats every day?",
        answer:
          "Yes. Plain oats are a whole grain with soluble fibre (beta-glucan) that helps lower LDL cholesterol at about 3 g a day — roughly 70–80 g of oats. Rotate with other breakfasts for variety.",
      },
      {
        question: "Which is better for diabetes?",
        answer:
          "Rolled or steel-cut oats generally cause a slower rise in blood sugar than poha, especially when paired with protein. People with diabetes should check their own response and follow their doctor's advice.",
      },
    ],
    sources: [SRC_IFCT, SRC.usdaFdc, SRC_EFSA_BG, SRC.icmr],
    body: [
      p(
        "Oats and poha are two of India's most popular “healthy” breakfasts. Both are quick, light and easy on the stomach. But they are not the same nutritionally, and the way they are usually cooked can change the picture completely.",
      ),

      h2("Oats vs poha per 100 g (dry)"),
      p("Poha from IFCT 2017; rolled oats from USDA FoodData Central and typical Indian pack labels."),
      table(
        ["Per 100 g dry", "Poha", "Rolled oats"],
        [
          ["Calories", "354 kcal", "≈ 380–390 kcal"],
          ["Protein", "7.4 g", "≈ 13 g"],
          ["Fibre", "3.5 g", "≈ 10 g"],
          ["Fat", "1.1 g", "≈ 6.5 g"],
          ["Carbohydrates", "76.8 g", "≈ 66 g"],
        ],
      ),

      h2("Per typical serving"),
      table(
        ["Breakfast", "Calories", "Protein", "Fibre"],
        [
          ["Plain poha, 50 g dry, 1 tsp oil", "≈ 220 kcal", "≈ 3.7 g", "≈ 1.7 g"],
          ["Poha with 15 g peanuts and vegetables, 1 tsp oil", "≈ 320 kcal", "≈ 7.5 g", "≈ 4 g"],
          ["Oats porridge, 40 g oats in 200 ml milk", "≈ 300 kcal", "≈ 12 g", "≈ 4 g"],
          ["Masala oats, 40 g oats with vegetables, 1 tsp oil", "≈ 220 kcal", "≈ 6 g", "≈ 5 g"],
        ],
      ),
      p(
        "At similar calories, a bowl of oats gives more protein and more than twice the fibre of a plate of poha — the two things that keep you fullest. Cooking oats in milk widens the protein gap further.",
      ),

      h2("Which keeps you fuller?"),
      p(
        "Oats contain beta-glucan, a soluble fibre that thickens in the gut and slows digestion; regular intake of about 3 g a day also lowers LDL cholesterol. Poha is flattened rice — lighter, faster to digest and lower in fibre. Most people find a bowl of oats with milk keeps them going longer than a plate of plain poha. Add protein to either and the gap narrows.",
      ),

      h2("How toppings change everything"),
      table(
        ["Add", "Effect"],
        [
          ["Extra oil (2–3 tsp in poha)", "+45 kcal per teaspoon"],
          ["Sev or namkeen (20 g)", "+100–110 kcal, little protein"],
          ["Sugar or honey (2 tsp)", "+40 kcal"],
          ["Peanuts (15 g)", "+78 kcal, +3.5 g protein"],
          ["Curd on the side (150 g)", "+90 kcal, +4.7 g protein"],
          ["Sprouts or soya granules", "+5–10 g protein"],
        ],
      ),

      h2("Better ways to make each"),
      h3("Weight-loss poha"),
      ul([
        "50 g dry poha, 1 teaspoon oil, lots of onion, peas, carrot and capsicum.",
        "Add 15 g peanuts or a handful of sprouts.",
        "Serve with a katori of curd. Skip the sev.",
      ]),
      h3("Weight-loss oats"),
      ul([
        "Plain rolled oats, not sugary instant packs.",
        "Cook in milk or make savoury masala oats with vegetables.",
        "Add hung curd or a scoop of protein for 20 g+ protein.",
        "Sweeten with fruit, not sugar.",
      ]),

      h2("The verdict"),
      p(
        `Oats have a nutritional edge — more protein and fibre for similar calories. Poha, made well, is still a good weight-loss breakfast. Choose the one you will enjoy daily and build protein into it. More ideas in <a href="${LINK.breakfastWl}">the best breakfasts for weight loss</a> and <a href="${LINK.breakfastVeg}">high-protein vegetarian Indian breakfasts</a>; see <a href="/foods/poha">poha's nutrition page</a> for portion sizes.`,
      ),
      toolCta("/calorie-calculator", "calorie calculator", "See how breakfast fits your daily target with the"),
      p(
        `<strong>Explore the guide:</strong> The full plan — calories, protein, training and habits — is in the <a href="/weight-loss">weight loss guide</a>, and calories in everyday Indian foods are in the <a href="/nutrition/calories">calories guide</a>.`,
      ),

      takeaways([
        "Per 100 g, oats have nearly twice the protein and about three times the fibre of poha.",
        "Both are similar in calories; oil, sev, sugar and portion size change them the most.",
        "Oats keep most people fuller; poha with peanuts, sprouts and curd comes close.",
        "Pick the one you'll stick with and add 15–20 g protein to it.",
      ]),
      p(DISCLAIMER),
    ].join("\n"),
  },

  {
    slug: "curd-vs-milk",
    title: "Curd vs Milk: Protein, Digestion & Which Is Better",
    excerpt:
      "Curd vs milk compared: protein, calories and calcium per serving, digestion and lactose, probiotics, which is better for weight loss or muscle gain, and how hung curd changes the protein picture.",
    quickAnswer: `Curd and milk have similar protein (about 3–3.3 g per 100 g) and calcium, because curd is just fermented milk. Curd is usually easier to digest for people who are sensitive to lactose and contains live bacteria that may support gut health. Milk is easier to drink in larger amounts. For the most protein, hung curd or Greek yogurt has about three times as much as regular curd. Choose based on your digestion and goal — both are good foods. ${DISCLAIMER}`,
    categorySlug: "nutrition",
    subcategorySlug: "protein",
    primaryKeyword: "curd vs milk",
    metaTitle: "Curd vs Milk: Protein, Digestion & Which Wins",
    metaDescription:
      "Curd vs milk: protein, calories and calcium per serving, lactose and digestion, probiotics, and which is better for weight loss or muscle — plus hung curd.",
    tags: ["curd", "milk", "dahi", "dairy", "food comparison", "probiotics"],
    topics: ["Protein", "Food Comparisons", "Indian Nutrition"],
    featuredImageAlt: "A glass of milk next to a bowl of curd and a bowl of hung curd",
    relatedSlugs: [
      "best-high-protein-indian-foods",
      "vegetarian-protein-sources-india",
      "paneer-vs-tofu",
      "high-protein-vegetarian-indian-breakfast",
      "protein-for-beginners",
    ],
    dayOffset: 9,
    faq: [
      {
        question: "Is curd better than milk at night?",
        answer:
          "Either is fine. Some people sleep better after warm milk; others find curd lighter. Traditional advice to avoid curd at night is not backed by good evidence, but follow what suits your digestion.",
      },
      {
        question: "Can I have curd if I'm lactose intolerant?",
        answer:
          "Many people with lactose intolerance tolerate curd and hung curd better than milk, because fermentation breaks down part of the lactose. Start with a small katori and see how you feel.",
      },
      {
        question: "Does curd have more protein than milk?",
        answer:
          "Regular curd has about the same protein per 100 g as the milk it was made from. Hung curd or Greek yogurt, with the whey drained off, has about 8–10 g per 100 g — roughly three times more.",
      },
      {
        question: "Is packaged curd as good as homemade?",
        answer:
          "Plain packaged curd is similar in nutrition. Check that it has no added sugar, and look for 'live and active cultures' if you want the probiotic benefit. Flavoured yogurts often contain a lot of sugar.",
      },
    ],
    sources: [SRC_IFCT, SRC.usdaFdc, SRC_ICMR_RDA, SRC_DIAAS],
    body: [
      p(
        "Curd (dahi) is milk that has been fermented by lactic acid bacteria. The bacteria turn some of the milk sugar (lactose) into lactic acid, which thickens the milk and gives curd its tang. Nutritionally the two are close — but there are differences worth knowing.",
      ),

      h2("Curd vs milk per 100 g"),
      p(
        "Milk from IFCT 2017 (whole cow milk); curd and hung curd are typical values for curd made from whole milk and thick strained curd, which vary with the milk used.",
      ),
      table(
        ["Per 100 g", "Whole cow milk", "Curd (whole milk)", "Hung curd / Greek yogurt"],
        [
          ["Calories", "73 kcal", "≈ 60–65 kcal", "≈ 90–110 kcal"],
          ["Protein", "3.3 g", "≈ 3.1 g", "≈ 8–10 g"],
          ["Fat", "4.5 g", "≈ 3–4 g", "≈ 4–5 g (less if made from toned milk)"],
          ["Carbohydrates (mostly lactose)", "4.9 g", "≈ 3–4 g", "≈ 3–4 g"],
          ["Calcium", "≈ 120 mg", "≈ 120–150 mg", "≈ 100–150 mg"],
        ],
      ),

      h2("Per typical serving"),
      table(
        ["Serving", "Calories", "Protein"],
        [
          ["<a href=\"/foods/cow-milk\">Milk</a>, 1 glass (200 ml)", "≈ 146 kcal", "≈ 6.5 g"],
          ["Curd, 1 katori (150 g)", "≈ 90 kcal", "≈ 4.7 g"],
          ["Hung curd, 150 g", "≈ 150 kcal", "≈ 13 g"],
          ["<a href=\"/foods/buffalo-milk\">Buffalo milk</a>, 1 glass (200 ml)", "≈ 214 kcal", "≈ 7.4 g"],
        ],
      ),

      h2("Digestion and lactose"),
      p(
        "Fermentation breaks down part of the lactose, and the live bacteria in curd help digest some of the rest. That is why many people who feel bloated after milk are comfortable with curd, buttermilk or hung curd. If milk does not bother you, there is no need to avoid it.",
      ),

      h2("Probiotics"),
      p(
        "Curd with live cultures contains bacteria such as Lactobacillus that may support gut health. The evidence for specific health benefits varies by strain and person, so think of curd as a helpful everyday food rather than a medicine. Heating curd (for example in kadhi) kills the bacteria but keeps the protein and calcium.",
      ),

      h2("Which is better for your goal?"),
      table(
        ["Goal", "Better choice", "Why"],
        [
          ["Weight loss", "Curd or hung curd from toned milk", "Filling, lower calories per serving, easy to pair with meals"],
          ["Muscle gain", "Milk (and hung curd)", "Easy extra calories and protein in a glass; hung curd for dense protein"],
          ["Most protein per serving", "Hung curd / Greek yogurt", "About three times the protein of regular curd"],
          ["Lactose sensitivity", "Curd, buttermilk, hung curd", "Less lactose and better tolerated"],
          ["Bone health", "Either", "Both are good calcium sources"],
        ],
      ),

      h2("Easy ways to use both"),
      ul([
        "A glass of milk or milky tea with breakfast; curd with lunch and dinner.",
        "Raita or buttermilk instead of sugary drinks.",
        `Hung curd with fruit as a high-protein snack — more ideas in <a href="${LINK.breakfastVeg}">high-protein vegetarian Indian breakfasts</a>.`,
        "Milk with oats or dalia for a filling porridge.",
        "Curd-based marinades for paneer, tofu or chicken tikka.",
      ]),
      p(
        `For other dairy and vegetarian protein comparisons, see <a href="${LINK.paneerTofu}">paneer vs tofu</a> and the <a href="${LINK.highProtein}">best high-protein Indian foods</a>.`,
      ),
      toolCta("/protein-calculator", "protein calculator", "See how much dairy fits your protein target with the"),
      GUIDE,

      takeaways([
        "Curd and milk have similar protein and calcium per 100 g.",
        "Curd is easier for many lactose-sensitive people and contains live cultures.",
        "Hung curd has about three times the protein of regular curd.",
        "Milk suits bulking; curd and hung curd suit weight loss and high-protein snacks.",
      ]),
      p(DISCLAIMER),
    ].join("\n"),
  },
];
