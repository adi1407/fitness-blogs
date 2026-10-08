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
} from "./helpers";

/** Un-numbered on purpose: the boot link pass rewrites them to live numbered URLs. */
const LINK = {
  proteinPerDay: "/blog/nutrition/protein/how-much-protein-do-you-need-per-day",
  highProteinIndian: "/blog/nutrition/protein/best-high-protein-indian-foods",
  paneer100g: "/blog/nutrition/protein/100g-paneer-calories-and-protein",
  wheySafe: "/blog/nutrition/protein/is-whey-protein-safe",
  proteinForMuscle:
    "/blog/muscle-building/muscle-building-nutrition/how-much-protein-to-build-muscle",
  paneerWeightLoss: "/blog/weight-loss/weight-loss-nutrition/is-paneer-good-for-weight-loss",
  calories:
    "/blog/weight-loss/calorie-deficit/how-many-calories-should-i-eat-to-lose-weight",
  plan1500: "/blog/weight-loss/diet-meal-planning/1500-calorie-indian-diet-plan",
  vegProtein: "/blog/nutrition/protein/vegetarian-protein-sources-india",
  proteinForWeightLoss: "/blog/weight-loss/weight-loss-nutrition/protein-for-weight-loss",
  notLosing:
    "/blog/weight-loss/weight-loss-plateaus/why-am-i-not-losing-weight",
};

const SRC_IFCT = {
  title: "Longvah et al. (2017) — Indian Food Composition Tables (ICMR-National Institute of Nutrition)",
  url: "https://www.nin.res.in/",
  note: "Per-100 g protein and calories for the Indian foods in this guide",
};

export const batch12: IntentArticleDef[] = [
  {
    slug: "vegetarian-protein-sources-india",
    title: "Vegetarian Protein Sources: Best Indian Foods",
    excerpt:
      "The best vegetarian protein sources in India, ranked by protein per serving and per calorie — soya, paneer, dals, rajma, chana, dairy and nuts — plus how to combine them and a sample 90 g protein vegetarian day.",
    quickAnswer: `The best vegetarian protein sources in India are soya (chunks or whole soybean), paneer, dals such as moong and masoor, rajma, kala chana, milk and curd, and peanuts. Soya and paneer give the most protein per serving; dals and soya give the most protein per calorie. Combining dal with roti or rice improves protein quality, and a planned vegetarian day can easily reach 80–100 g of protein. ${DISCLAIMER}`,
    categorySlug: "nutrition",
    subcategorySlug: "protein",
    primaryKeyword: "vegetarian protein sources india",
    metaTitle: "Vegetarian Protein Sources: Best Indian Foods",
    metaDescription:
      "Vegetarian protein sources in India ranked by protein per serving and per calorie, how to combine dal and grains, and a sample 90 g protein vegetarian day.",
    tags: ["vegetarian protein", "protein sources", "Indian vegetarian diet", "soya", "paneer", "dal"],
    topics: ["Indian Nutrition", "Protein", "Vegetarian"],
    featuredImageAlt:
      "Bowls of Indian vegetarian protein foods: soya chunks, paneer, moong dal, rajma, kala chana, curd and peanuts",
    relatedSlugs: [
      "best-high-protein-indian-foods",
      "how-much-protein-do-you-need-per-day",
      "100g-paneer-calories-and-protein",
      "protein-for-weight-loss",
      "is-whey-protein-safe",
    ],
    dayOffset: 9,
    faq: [
      {
        question: "Which vegetarian food has the most protein?",
        answer:
          "Among everyday Indian foods, dry soya chunks have the most — around 50 g per 100 g dry by most pack labels — followed by whole soybean (about 38 g per 100 g dry). Per typical serving, a katori of soya chunk curry and 100 g of paneer are the richest options.",
      },
      {
        question: "Can vegetarians get enough protein without supplements?",
        answer:
          "Yes. A day built around dal, paneer or soya, curd and milk can reach 80–100 g of protein, as the sample day below shows. Supplements are a convenience, not a requirement.",
      },
      {
        question: "Is plant protein as good as animal protein?",
        answer:
          "Soy and dairy protein are high quality on their own. Most other plant proteins are lower in one essential amino acid — dals in methionine, grains in lysine — but eating both across the day fills the gap. Total protein matters more than any single food.",
      },
      {
        question: "How much protein is in one katori of dal?",
        answer:
          "A katori of cooked dal made from about 30 g of dry dal has roughly 6.5–7.5 g of protein, depending on the dal. Thicker dal made from 50 g dry has about 11–12 g.",
      },
    ],
    sources: [
      SRC_IFCT,
      SRC.icmr,
      {
        title: "Mariotti & Gardner (2019) — Dietary protein and amino acids in vegetarian diets: a review (Nutrients)",
        url: "https://pubmed.ncbi.nlm.nih.gov/31690027/",
        note: "Well-planned vegetarian diets meet protein and amino acid needs",
      },
      {
        title: "FAO (2013) — Dietary protein quality evaluation in human nutrition (DIAAS report)",
        url: "https://www.fao.org/3/i3124e/i3124e.pdf",
        note: "Protein quality scoring: dairy and soy score high; cereals are limited by lysine",
      },
      SRC.issnProtein,
    ],
    body: [
      p(
        "Vegetarian diets in India are often low in protein not because vegetarian protein is hard to find, but because meals lean heavily on roti and rice with a thin dal on the side. Swap the proportions and add one or two protein-dense foods a day, and hitting your target becomes simple.",
        "Values below come from the Indian Food Composition Tables (IFCT 2017), the same data behind our <a href=\"/foods/indian\">Indian food pages</a>.",
      ),

      h2("Vegetarian protein sources ranked"),
      p("Sorted by protein in a typical serving. Dals and legumes are weighed dry; one katori of cooked dal uses about 30 g dry."),
      table(
        ["Food", "Protein per 100 g", "Typical serving", "Protein per serving", "Calories per serving"],
        [
          ["Soya chunks (dry)", "≈ 50 g (pack labels vary)", "30 g dry, cooked as curry or pulao", "≈ 15 g", "≈ 105 kcal"],
          ["<a href=\"/foods/soybean\">Soybean</a> (dry)", "37.8 g", "1 katori cooked (30 g dry)", "11.3 g", "113 kcal"],
          ["<a href=\"/foods/paneer\">Paneer</a>", "18.9 g", "50 g (about 4 cubes)", "9.4 g", "129 kcal"],
          ["<a href=\"/foods/rajma\">Rajma</a> (dry)", "19.9 g", "1 katori cooked (40 g dry)", "8.0 g", "120 kcal"],
          ["<a href=\"/foods/kala-chana\">Kala chana</a> (dry)", "18.8 g", "1 katori cooked (40 g dry)", "7.5 g", "115 kcal"],
          ["Masoor dal (dry)", "24.4 g", "1 katori cooked (30 g dry)", "7.3 g", "97 kcal"],
          ["<a href=\"/foods/moong-dal\">Moong dal</a> (dry)", "23.9 g", "1 katori cooked (30 g dry)", "7.2 g", "98 kcal"],
          ["<a href=\"/foods/peanuts\">Peanuts</a>", "23.7 g", "1 handful (30 g)", "7.1 g", "156 kcal"],
          ["Cow milk", "3.3 g", "1 glass (200 ml)", "6.5 g", "146 kcal"],
          ["Toor dal (dry)", "21.7 g", "1 katori cooked (30 g dry)", "6.5 g", "99 kcal"],
          ["Roti (atta)", "10.6 g", "2 medium rotis (60 g atta)", "6.3 g", "192 kcal"],
          ["Quinoa (dry)", "13.1 g", "1 katori cooked (45 g dry)", "5.9 g", "148 kcal"],
          ["Green peas", "7.3 g", "1 katori (80 g)", "5.8 g", "65 kcal"],
          ["Almonds", "18.4 g", "1 handful (30 g)", "5.5 g", "183 kcal"],
          ["Curd", "≈ 3.1 g", "1 katori (150 g)", "≈ 4.7 g", "≈ 90 kcal"],
        ],
      ),
      p(
        `Paneer is a staple for good reason — see <a href="${LINK.paneer100g}">100 g paneer calories and protein</a> for the full breakdown. For a list that includes eggs, chicken and fish, see <a href="${LINK.highProteinIndian}">the best high-protein Indian foods</a>.`,
      ),

      h2("Best value per calorie"),
      p(
        "If you are also watching calories, what matters is how much energy you spend to get 10 g of protein. Lower is better:",
      ),
      table(
        ["Food", "Calories for 10 g protein", "Verdict"],
        [
          ["Soya chunks", "≈ 65–70 kcal", "Best by far"],
          ["Soybean", "≈ 100 kcal", "Excellent"],
          ["Green peas", "≈ 110 kcal", "Excellent (but large portions needed)"],
          ["Masoor / moong dal", "≈ 130–140 kcal", "Very good"],
          ["Paneer", "≈ 135 kcal", "Very good"],
          ["Rajma, kala chana, toor dal", "≈ 150 kcal", "Good — and high in fibre"],
          ["Curd, milk", "≈ 195–225 kcal", "Moderate"],
          ["Peanuts", "≈ 220 kcal", "Calorie-dense — measure portions"],
          ["Roti", "≈ 300 kcal", "Useful contributor, not a main source"],
          ["Almonds", "≈ 330 kcal", "Mostly fat — a garnish, not a protein source"],
        ],
      ),
      p(
        "Nuts are healthy, but they are mainly a source of fat. A handful of almonds has less protein than a katori of dal for nearly twice the calories.",
      ),

      h2("Protein quality: why dal and roti work together"),
      p(
        "Protein is built from amino acids, and your body needs nine of them from food. Dairy and soy contain all nine in good amounts. Dals and other legumes are lower in one (methionine), while wheat and rice are lower in another (lysine). Each fills the other’s gap, which is why dal-chawal and rajma-roti are such good combinations.",
        "You do not have to combine them at the same meal — eating both across the day is enough. And total protein matters far more than perfect pairing.",
      ),

      h2("How much protein do vegetarians need?"),
      p(
        `The ICMR-NIN recommended allowance for healthy adults is about 0.8 g per kg of body weight — a minimum for health. If you train or are losing weight, 1.2–1.6 g per kg is more useful. Read <a href="${LINK.proteinPerDay}">how much protein you need per day</a> for targets by goal.`,
      ),
      toolCta("/protein-calculator", "protein calculator", "Get your personal target with the"),

      h2("Sample vegetarian day: about 93 g protein"),
      p("For a 70 kg person aiming for roughly 85–110 g a day:"),
      table(
        ["Meal", "What to eat", "Protein", "Calories"],
        [
          ["Breakfast", "2 moong dal chillas (50 g dry dal) stuffed with 50 g paneer, 1 tsp oil", "21 g", "≈ 337 kcal"],
          ["Mid-morning", "1 glass milk (200 ml)", "6.5 g", "146 kcal"],
          ["Lunch", "2 rotis + 1 katori rajma (40 g dry) with 1 tsp oil + 150 g curd", "19 g", "≈ 447 kcal"],
          ["Evening", "Soya chunk chaat (30 g dry chunks) with onion, tomato, lemon", "≈ 15.5 g", "≈ 125 kcal"],
          ["Dinner", "1 katori rice + palak paneer with 100 g paneer, 1 tsp oil", "26 g", "≈ 517 kcal"],
          ["Snack", "20 g roasted peanuts", "4.7 g", "104 kcal"],
          ["<strong>Total</strong>", "", "<strong>≈ 93 g</strong>", "<strong>≈ 1,680 kcal</strong>"],
        ],
      ),
      p(
        "The trick is not any single food: it is putting a protein-dense item — paneer, soya, a thick dal or rajma — at every meal instead of treating dal as a side.",
      ),

      h2("Easy ways to add protein to Indian meals"),
      ul([
        "<strong>Make dal thicker:</strong> 50 g dry per serving instead of 30 g adds about 4.5–5 g protein.",
        "<strong>Swap besan or atta snacks for chana:</strong> boiled kala chana chaat instead of namkeen.",
        "<strong>Add soya chunks</strong> to pulao, sabzi or a keema-style dish.",
        "<strong>Use curd generously:</strong> raita at lunch, curd with dinner, chaas in the afternoon.",
        "<strong>Stuff parathas and chillas</strong> with paneer or sprouts.",
        "<strong>Mix sprouts</strong> into poha, upma or salads.",
      ]),

      h2("Do vegetarians need protein powder?"),
      p(
        `Not necessarily. Powder is useful if your appetite is small, your target is high, or you are short on time. If you use one, choose a third-party tested brand; whey is suitable for lacto-vegetarians, and soy or pea protein work for vegans. See <a href="${LINK.wheySafe}">is whey protein safe</a> before you buy.`,
      ),

      h2("Who should be careful"),
      p(
        "If you have kidney disease, gout or a soy or milk allergy, check with your doctor before increasing protein or adding soya and dairy. Pregnant and breastfeeding women have higher protein needs and should plan their diet with a professional.",
      ),

      takeaways([
        "Top vegetarian protein sources: soya, paneer, dals, rajma, kala chana, milk, curd and peanuts.",
        "Soya and dals give the most protein per calorie; nuts are mostly fat.",
        "Dal plus roti or rice covers each other’s amino-acid gaps — across the day is enough.",
        "Put a protein-dense food at every meal; a vegetarian day can easily reach 80–100 g.",
        "Powder is optional — useful for convenience, not required.",
      ]),
      p(
        `Losing weight as a vegetarian? Read <a href="${LINK.proteinForWeightLoss}">how much protein you need for weight loss</a>. ${DISCLAIMER}`,
      ),
    ].join("\n"),
  },

  {
    slug: "protein-for-weight-loss",
    title: "Protein for Weight Loss: How Much Per Day?",
    excerpt:
      "How much protein you need to lose weight, why it matters in a calorie deficit, a simple table by body weight, how to split it across Indian meals, and when to be careful.",
    quickAnswer: `For weight loss, most adults do well on about 1.2–1.6 g of protein per kg of body weight per day — roughly 80–110 g for a 70 kg person. If you are carrying a lot of extra weight, base it on your goal weight instead. Spread it across meals at about 25–35 g each. Higher protein keeps you fuller, slightly raises the calories you burn digesting food, and helps you keep muscle while you lose fat. ${DISCLAIMER}`,
    categorySlug: "weight-loss",
    subcategorySlug: "weight-loss-nutrition",
    primaryKeyword: "protein for weight loss",
    metaTitle: "Protein for Weight Loss: How Much Per Day?",
    metaDescription:
      "How much protein for weight loss? Simple g/kg targets by body weight, why protein helps in a deficit, and how to hit it with Indian veg and non-veg meals.",
    tags: ["protein for weight loss", "high protein diet", "calorie deficit", "fat loss", "Indian diet"],
    topics: ["Protein", "Calorie Deficit", "Indian Nutrition"],
    featuredImageAlt:
      "A high-protein Indian plate for weight loss with paneer tikka, dal, salad and a roti",
    relatedSlugs: [
      "how-much-protein-do-you-need-per-day",
      "is-paneer-good-for-weight-loss",
      "how-many-calories-should-i-eat-to-lose-weight",
      "vegetarian-protein-sources-india",
      "1500-calorie-indian-diet-plan",
    ],
    dayOffset: 9,
    faq: [
      {
        question: "Does eating more protein help you lose weight?",
        answer:
          "Indirectly, yes. Protein does not burn fat by itself, but it keeps you fuller on fewer calories, costs more energy to digest than carbs or fat, and helps you keep muscle in a deficit. Calories still decide whether you lose weight.",
      },
      {
        question: "Should I use my current weight or goal weight?",
        answer:
          "If you are close to a healthy weight, use your current weight. If you have a lot to lose, multiply your goal weight by 1.2–1.6 instead — using current weight can give a number that is much higher than you need.",
      },
      {
        question: "Can too much protein be harmful?",
        answer:
          "For healthy adults, intakes up to about 2 g per kg a day are considered safe. People with kidney disease are different — they should not raise protein without medical advice.",
      },
      {
        question: "What if I am vegetarian?",
        answer:
          "You can still hit 1.2–1.6 g per kg. Build each meal around paneer, soya, a thick dal, rajma, chana or curd rather than treating dal as a side dish.",
      },
    ],
    sources: [
      {
        title: "Leidy et al. (2015) — The role of protein in weight loss and maintenance (Am J Clin Nutr)",
        url: "https://pubmed.ncbi.nlm.nih.gov/25926512/",
        note: "Higher-protein diets (about 1.2–1.6 g/kg) improve appetite control and body composition",
      },
      {
        title:
          "Wycherley et al. (2012) — Effects of energy-restricted high-protein, low-fat compared with standard-protein diets: a meta-analysis (Am J Clin Nutr)",
        url: "https://pubmed.ncbi.nlm.nih.gov/23097268/",
        note: "High-protein calorie-restricted diets led to modestly greater fat loss and better lean-mass retention",
      },
      {
        title:
          "Helms et al. (2014) — A systematic review of dietary protein during caloric restriction in resistance trained lean athletes (Int J Sport Nutr Exerc Metab)",
        url: "https://pubmed.ncbi.nlm.nih.gov/24092765/",
        note: "Lean, trained people in a deficit may benefit from higher intakes",
      },
      {
        title: "Westerterp (2004) — Diet induced thermogenesis (Nutrition & Metabolism)",
        url: "https://pubmed.ncbi.nlm.nih.gov/15507147/",
        note: "Protein has a higher thermic effect than carbohydrate or fat",
      },
      SRC.icmr,
    ],
    body: [
      p(
        "When people cut calories, protein is usually the first thing to drop — breakfast becomes tea and biscuits, lunch becomes a smaller roti-sabzi. That is the opposite of what helps. In a calorie deficit, protein is the nutrient most worth protecting.",
      ),

      h2("How much protein for weight loss?"),
      p(
        "Research on calorie-restricted diets points to about <strong>1.2–1.6 g of protein per kg of body weight per day</strong> for most adults. That is well above the ICMR-NIN minimum for health (about 0.8 g/kg), which is set to prevent deficiency, not to protect muscle in a deficit.",
      ),
      table(
        ["Body weight", "1.2 g/kg", "1.6 g/kg"],
        [
          ["55 kg", "66 g", "88 g"],
          ["65 kg", "78 g", "104 g"],
          ["75 kg", "90 g", "120 g"],
          ["85 kg", "102 g", "136 g"],
          ["95 kg", "114 g", "152 g"],
        ],
      ),
      h3("If you have a lot of weight to lose"),
      p(
        "Use your <strong>goal weight</strong> instead of your current weight. For someone at 95 kg aiming for 75 kg, 1.2–1.6 × 75 gives 90–120 g — plenty, and far more realistic than 150 g.",
      ),
      h3("If you are lean and training hard"),
      p(
        `People who are already fairly lean and lifting weights in a deficit may benefit from the top of the range or slightly more (up to about 2 g/kg). For muscle-focused targets, see <a href="${LINK.proteinForMuscle}">how much protein you need to build muscle</a>.`,
      ),
      toolCta("/protein-calculator", "protein calculator", "Get your number for your weight and goal with the"),

      h2("Why protein helps you lose weight"),
      ul([
        "<strong>It keeps you full.</strong> Protein-rich meals reduce hunger more than the same calories from refined carbs, which makes a deficit easier to stick to.",
        "<strong>It costs more to digest.</strong> About 20–30% of protein’s calories are spent processing it, compared with roughly 5–10% for carbs and 0–3% for fat.",
        "<strong>It protects muscle.</strong> In a deficit your body can break down muscle as well as fat. Enough protein, plus strength training, keeps the weight you lose coming mostly from fat.",
        "<strong>It helps keep weight off.</strong> Keeping muscle helps protect your maintenance calories after the diet ends.",
      ]),
      p(
        `Protein does not override calories, though. If you eat more than you burn, you will not lose weight however much protein you eat — see <a href="${LINK.calories}">how many calories you should eat to lose weight</a>.`,
      ),

      h2("How to split protein across the day"),
      p(
        "Aim for 25–35 g at each main meal, plus a protein-containing snack if your target is high. Most Indian meals fall short at breakfast and dinner, so start there.",
      ),
      table(
        ["Meal", "Vegetarian (≈ 25–30 g)", "Non-vegetarian (≈ 25–35 g)"],
        [
          ["Breakfast", "2 moong dal chillas with 50 g paneer (≈ 21 g) + 1 glass milk", "2-egg omelette + 1 roti (≈ 21 g) + 100 g curd"],
          ["Lunch", "2 rotis, thick dal (50 g dry), 150 g curd (≈ 23 g)", "2 rotis, 100 g raw chicken curry, salad (≈ 28 g)"],
          ["Snack", "Soya chunk chaat, 30 g dry (≈ 15 g)", "2 boiled eggs (≈ 12 g)"],
          ["Dinner", "Paneer tikka, 100 g paneer + 1 roti (≈ 22 g)", "150 g raw rohu or chicken + 1 katori rice (≈ 33–37 g)"],
        ],
      ),
      p(
        `For a full day with gram weights at about 1,500 kcal and 70–85 g protein, see our <a href="${LINK.plan1500}">1500 calorie Indian diet plan</a>. Vegetarian? Our guide to <a href="${LINK.vegProtein}">vegetarian protein sources in India</a> ranks every option by protein per calorie.`,
      ),

      h2("Best protein foods when you are cutting calories"),
      p("In a deficit, pick foods that give a lot of protein for few calories:"),
      table(
        ["Food", "Protein", "Calories", "Why it works"],
        [
          ["<a href=\"/foods/egg-white\">Egg whites</a> (3)", "11 g", "48 kcal", "Almost pure protein"],
          ["<a href=\"/foods/rohu\">Rohu fish</a> (100 g raw)", "19.7 g", "102 kcal", "Lean and cheap in many regions"],
          ["<a href=\"/foods/chicken-breast\">Chicken breast</a> (100 g raw)", "21.8 g", "168 kcal", "High protein, easy to batch-cook"],
          ["Soya chunks (30 g dry)", "≈ 15 g", "≈ 105 kcal", "Best vegetarian protein per calorie"],
          ["<a href=\"/foods/paneer\">Paneer</a> (100 g)", "18.9 g", "258 kcal", "Filling, but measure — it is also high in fat"],
          ["Thick moong or masoor dal (50 g dry)", "≈ 12 g", "≈ 162 kcal", "Protein plus fibre"],
          ["Curd (150 g)", "≈ 4.7 g", "≈ 90 kcal", "Easy add-on to any meal"],
        ],
      ),
      p(
        `Paneer is a regular question — read <a href="${LINK.paneerWeightLoss}">is paneer good for weight loss</a> for portions that fit a deficit.`,
      ),

      h2("Common mistakes"),
      ol([
        "<strong>Cutting protein along with calories.</strong> Reduce oil, sugar and extra roti or rice first; keep the dal, paneer, eggs or chicken.",
        "<strong>Counting dal as a side.</strong> A thin katori has only about 6–7 g. Make it thicker or add a second protein.",
        "<strong>Relying on nuts.</strong> Almonds and peanuts are mostly fat; they add calories faster than protein.",
        "<strong>Skipping strength training.</strong> Protein protects muscle best when you also give your muscles a reason to stay.",
        "<strong>Using current weight when you have a lot to lose,</strong> which sets an unrealistically high target.",
      ]),
      p(
        `Eating plenty of protein and still not losing? Work through <a href="${LINK.notLosing}">why you might not be losing weight</a>.`,
      ),

      h2("Who should be careful"),
      p(
        "Higher protein is safe for healthy adults, but not for everyone. If you have chronic kidney disease or reduced kidney function, diabetes with kidney involvement, or liver disease, do not increase protein without your doctor’s advice. Pregnant and breastfeeding women, older adults with medical conditions and anyone with a history of disordered eating should plan changes with a professional.",
      ),

      takeaways([
        "Aim for about 1.2–1.6 g of protein per kg a day while losing weight.",
        "With a lot to lose, multiply your goal weight, not your current weight.",
        "Split it into 25–35 g per meal — breakfast and dinner are usually the gaps.",
        "Protein keeps you full and protects muscle, but calories still decide fat loss.",
        "Cut oil, sugar and extra grains before you cut protein.",
      ]),
      p(
        `For the general daily target outside a diet, see <a href="${LINK.proteinPerDay}">how much protein you need per day</a>, and for food ideas, <a href="${LINK.highProteinIndian}">the best high-protein Indian foods</a>. ${DISCLAIMER}`,
      ),
    ].join("\n"),
  },
];
