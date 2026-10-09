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
  maintenance: "/blog/nutrition/calories-energy/maintenance-calories",
  bmrTdee: "/blog/nutrition/calories-energy/bmr-vs-tdee",
  loseWeight:
    "/blog/weight-loss/calorie-deficit/how-many-calories-should-i-eat-to-lose-weight",
  calcDeficit: "/blog/weight-loss/calorie-deficit/how-to-calculate-your-calorie-deficit",
  lose10: "/blog/weight-loss/calorie-deficit/how-many-calories-should-i-eat-to-lose-10-kg",
  plan1500: "/blog/weight-loss/diet-meal-planning/1500-calorie-indian-diet-plan",
  weekPlan: "/blog/weight-loss/diet-meal-planning/indian-diet-plan-for-weight-loss",
  proteinWl: "/blog/weight-loss/weight-loss-nutrition/protein-for-weight-loss",
  notLosing: "/blog/weight-loss/weight-loss-plateaus/why-am-i-not-losing-weight",
  walking: "/blog/weight-loss/walking-daily-activity/does-walking-help-you-lose-weight",
  bellyFat: "/blog/weight-loss/fat-loss-basics/how-to-lose-belly-fat",
  riceVsRoti: "/blog/weight-loss/weight-loss-nutrition/rice-vs-roti-for-weight-loss",
  indianFoodsWl: "/blog/weight-loss/weight-loss-nutrition/best-indian-foods-for-weight-loss",
  ghee: "/blog/nutrition/dietary-fats/is-ghee-good-for-you",
  perDay: "/blog/nutrition/calories-energy/how-many-calories-should-i-eat-per-day",
  deficit: "/blog/weight-loss/calorie-deficit/what-is-a-calorie-deficit",
  plan1200: "/blog/weight-loss/diet-meal-planning/1200-calorie-indian-diet-plan",
  plan2000: "/blog/weight-loss/diet-meal-planning/2000-calorie-indian-diet-plan",
  steps10k: "/blog/weight-loss/walking-daily-activity/calories-burned-walking-10000-steps",
  thali: "/blog/nutrition/calories-energy/calories-in-indian-thali",
};

const SRC_IFCT: IntentSource = {
  title: "Longvah et al. (2017) — Indian Food Composition Tables (ICMR-National Institute of Nutrition)",
  url: "https://www.nin.res.in/",
  note: "Calories and protein for the Indian foods in this guide",
};
const SRC_ICMR_RDA: IntentSource = {
  title: "ICMR-NIN (2020) — Nutrient Requirements for Indians: Recommended Dietary Allowances and Estimated Average Requirements",
  url: "https://www.nin.res.in/",
  note: "Energy requirements for reference Indian adults by activity level",
};
const SRC_MIFFLIN: IntentSource = {
  title: "Mifflin, St Jeor et al. (1990) — A new predictive equation for resting energy expenditure (Am J Clin Nutr)",
  url: "https://pubmed.ncbi.nlm.nih.gov/2305711/",
  note: "The BMR equation used in this guide and our calculators",
};
const SRC_FRANKENFIELD: IntentSource = {
  title: "Frankenfield et al. (2005) — Comparison of predictive equations for resting metabolic rate (J Am Diet Assoc)",
  url: "https://pubmed.ncbi.nlm.nih.gov/15883556/",
  note: "Mifflin-St Jeor was the most accurate equation, within 10% for most people",
};
const SRC_HALL: IntentSource = {
  title: "Hall et al. (2011) — Quantification of the effect of energy imbalance on bodyweight (Lancet)",
  url: "https://pubmed.ncbi.nlm.nih.gov/21872751/",
  note: "Why the '7,700 kcal per kg' rule overestimates long-term weight loss",
};
const SRC_COMPENDIUM: IntentSource = {
  title: "Ainsworth et al. (2011) — Compendium of Physical Activities: second update of codes and MET values (Med Sci Sports Exerc)",
  url: "https://pubmed.ncbi.nlm.nih.gov/21681120/",
  note: "MET values for walking at different speeds",
};
const SRC_PALUCH: IntentSource = {
  title: "Paluch et al. (2022) — Daily steps and all-cause mortality: meta-analysis of 15 cohorts (Lancet Public Health)",
  url: "https://pubmed.ncbi.nlm.nih.gov/35247352/",
  note: "Benefits level off around 6,000–8,000 steps (60+) and 8,000–10,000 steps (under 60)",
};
const SRC_TUDOR: IntentSource = {
  title: "Tudor-Locke et al. (2011) — How many steps/day are enough? For adults (Int J Behav Nutr Phys Act)",
  url: "https://pubmed.ncbi.nlm.nih.gov/21798015/",
  note: "Step-count benchmarks for adults",
};

const ICMR_ROWS = [
  ["Sedentary", "≈ 2,110 kcal", "≈ 1,660 kcal"],
  ["Moderately active", "≈ 2,710 kcal", "≈ 2,130 kcal"],
  ["Heavy activity", "≈ 3,470 kcal", "≈ 2,720 kcal"],
];

const GUIDE = p(
  `<strong>Explore the guide:</strong> Targets by goal, calories in everyday Indian foods and every related article are in the <a href="/nutrition/calories">calories guide</a>; the <a href="/weight-loss">weight loss guide</a> covers training and habits.`,
);

export const batch14: IntentArticleDef[] = [
  {
    slug: "how-many-calories-should-i-eat-per-day",
    title: "How Many Calories Should I Eat Per Day?",
    excerpt:
      "How many calories you should eat per day by age, sex and activity, with ICMR-NIN numbers for Indian adults, a worked Mifflin-St Jeor example, and targets for losing, maintaining or gaining weight.",
    quickAnswer: `Most Indian adults need about 1,500–2,000 kcal a day (women) or 1,800–2,600 kcal (men), depending on age, size and activity. ICMR-NIN estimates about 1,660 kcal for a sedentary 55 kg woman and 2,110 kcal for a sedentary 65 kg man. To lose weight, eat 10–20% below your number; to gain muscle, 5–10% above it. Use a calculator for a starting point, then adjust with two to three weeks of weigh-ins. ${DISCLAIMER}`,
    categorySlug: "nutrition",
    subcategorySlug: "calories-energy",
    primaryKeyword: "how many calories should i eat per day",
    metaTitle: "How Many Calories Should I Eat Per Day?",
    metaDescription:
      "How many calories should you eat per day? Needs by age, sex and activity for Indian adults, a worked example, and calorie targets to lose, maintain or gain.",
    tags: ["calories per day", "daily calories", "TDEE", "BMR", "calorie needs"],
    topics: ["Calories", "Indian Nutrition"],
    featuredImageAlt: "Plate of Indian food next to a notebook with a daily calorie target written on it",
    relatedSlugs: [
      "maintenance-calories",
      "bmr-vs-tdee",
      "how-many-calories-should-i-eat-to-lose-weight",
      "what-is-a-calorie-deficit",
      "2000-calorie-indian-diet-plan",
    ],
    dayOffset: 9,
    faq: [
      {
        question: "Is 2,000 calories a day too much?",
        answer:
          "It depends on you. 2,000 kcal is roughly maintenance for a moderately active Indian woman and below maintenance for most men, so it would cause weight loss for many men and weight maintenance or slow gain for many smaller, less active women.",
      },
      {
        question: "Do calorie needs drop with age?",
        answer:
          "Yes, slowly — by roughly 50 kcal a day per decade in the equations, mostly because muscle mass and activity tend to fall. Strength training and staying active slow that decline.",
      },
      {
        question: "Should I eat the same calories every day?",
        answer:
          "Your weekly total matters more than any single day. Eating a little more on training days and less on rest days is fine if the weekly average hits your target.",
      },
      {
        question: "How accurate are calorie calculators?",
        answer:
          "The Mifflin-St Jeor equation predicts resting calories within about 10% for most people; activity estimates add more error. Treat the result as a starting point and adjust it based on what the scale does over 2–3 weeks.",
      },
    ],
    sources: [SRC_ICMR_RDA, SRC_MIFFLIN, SRC_FRANKENFIELD, SRC.icmr, SRC.whoObesity],
    body: [
      p(
        "There is no single right number of calories for everyone. A 50 kg office worker and an 85 kg construction worker can differ by more than 1,500 kcal a day. Your number depends on your size, age, sex and, above all, how active you are. Here is how to find yours and what to do with it.",
      ),

      h2("Average daily calorie needs for Indian adults"),
      p(
        "ICMR-NIN's 2020 requirements for a reference Indian adult (man 65 kg, woman 55 kg):",
      ),
      table(["Activity level", "Man (65 kg)", "Woman (55 kg)"], ICMR_ROWS),
      p(
        "“Sedentary” means mostly sitting — desk work and little planned exercise. “Moderately active” fits people who walk a lot, stand at work or exercise most days. Most urban office workers are sedentary, even if they go to the gym three times a week.",
      ),

      h2("Calories per day by age and activity"),
      p(
        "Calculated with the Mifflin-St Jeor equation, the most accurate of the common formulas, for an average-height man (170 cm, 70 kg) and woman (158 cm, 58 kg):",
      ),
      table(
        ["Age", "Man, sedentary", "Man, moderately active", "Woman, sedentary", "Woman, moderately active"],
        [
          ["25", "≈ 1,970 kcal", "≈ 2,550 kcal", "≈ 1,540 kcal", "≈ 1,990 kcal"],
          ["45", "≈ 1,850 kcal", "≈ 2,390 kcal", "≈ 1,420 kcal", "≈ 1,830 kcal"],
          ["60", "≈ 1,760 kcal", "≈ 2,270 kcal", "≈ 1,330 kcal", "≈ 1,720 kcal"],
        ],
      ),
      p(
        "Taller, heavier and more muscular people need more; smaller and less active people need less.",
      ),

      h2("How to work out your own number"),
      h3("Step 1: BMR (calories at complete rest)"),
      ul([
        "Men: 10 × weight (kg) + 6.25 × height (cm) − 5 × age + 5",
        "Women: 10 × weight (kg) + 6.25 × height (cm) − 5 × age − 161",
      ]),
      h3("Step 2: multiply by your activity level"),
      table(
        ["Activity", "Multiplier"],
        [
          ["Sedentary (desk job, little exercise)", "1.2"],
          ["Lightly active (exercise 1–3 days a week or 6,000–8,000 steps)", "1.375"],
          ["Moderately active (exercise 3–5 days or 8,000–12,000 steps)", "1.55"],
          ["Very active (hard exercise 6–7 days or a physical job)", "1.725"],
        ],
      ),
      h3("Worked example"),
      p(
        "Priya is 32, 160 cm and 62 kg, works at a desk and walks about 6,000 steps a day.",
        "BMR = 10 × 62 + 6.25 × 160 − 5 × 32 − 161 = 620 + 1,000 − 160 − 161 = 1,299 kcal.",
        "Lightly active: 1,299 × 1.375 ≈ 1,790 kcal a day. That is her estimated maintenance.",
      ),
      p(
        `The difference between BMR and this total is explained in <a href="${LINK.bmrTdee}">BMR vs TDEE</a>. Or skip the maths: the <a href="/calorie-calculator">calorie calculator</a> does it for you.`,
      ),

      h2("Calories per day by goal"),
      table(
        ["Goal", "Daily calories", "Priya's target"],
        [
          ["Lose fat", "Maintenance − 10–20%", "≈ 1,430–1,610 kcal"],
          ["Maintain", "Maintenance", "≈ 1,790 kcal"],
          ["Build muscle", "Maintenance + 5–10%", "≈ 1,880–1,970 kcal"],
        ],
      ),
      p(
        `For weight loss, see <a href="${LINK.loseWeight}">how many calories to eat to lose weight</a> and <a href="${LINK.deficit}">what a calorie deficit is</a>. Avoid going below about 1,200 kcal (women) or 1,500 kcal (men) without medical supervision.`,
      ),

      h2("Check the estimate against reality"),
      ol([
        "Eat your estimated maintenance consistently for 2–3 weeks.",
        "Weigh yourself 3–4 mornings a week, after the toilet, before food.",
        "Compare weekly averages. Stable means you found maintenance; rising or falling means adjust by 100–200 kcal.",
      ]),
      p(
        `This is the most reliable way to find your number — explained in detail in <a href="${LINK.maintenance}">what maintenance calories are</a>.`,
      ),

      h2("What those calories look like in Indian food"),
      p(
        `A 1,800 kcal day might be: poha with peanuts and curd for breakfast, three rotis with dal, sabzi and salad at lunch, fruit and chai in the evening, and rice with dal and a paneer or chicken dish at dinner. See it laid out with gram weights in the <a href="${LINK.plan2000}">2,000 calorie Indian diet plan</a> and the <a href="${LINK.plan1500}">1,500 calorie Indian diet plan</a>, or check what a restaurant meal costs you in <a href="${LINK.thali}">calories in an Indian thali</a>.`,
      ),
      toolCta("/calorie-calculator", "calorie calculator", "Get your personal number in under a minute with the"),
      GUIDE,

      takeaways([
        "Most Indian women need about 1,500–2,000 kcal a day; most men about 1,800–2,600.",
        "Your number is BMR × activity level; Mifflin-St Jeor is the best everyday formula.",
        "Lose fat at 10–20% below maintenance; build muscle at 5–10% above.",
        "Check any estimate against 2–3 weeks of average weigh-ins.",
      ]),
      p(DISCLAIMER),
    ].join("\n"),
  },

  {
    slug: "what-is-a-calorie-deficit",
    title: "What Is a Calorie Deficit? How It Works for Weight Loss",
    excerpt:
      "What a calorie deficit is, how it causes fat loss, how big it should be, why the '7,700 kcal = 1 kg' rule overpromises, signs your deficit is too aggressive and the easiest ways to create one on an Indian diet.",
    quickAnswer: `A calorie deficit means eating fewer calories than your body burns, so it uses stored energy — mostly body fat — to make up the difference. A moderate deficit of 10–20% below maintenance (usually 300–500 kcal a day) leads to about 0.25–0.5 kg of fat loss a week for most people. You can create it by eating less, moving more, or both; diet changes usually do most of the work. ${DISCLAIMER}`,
    categorySlug: "weight-loss",
    subcategorySlug: "calorie-deficit",
    primaryKeyword: "what is a calorie deficit",
    metaTitle: "What Is a Calorie Deficit? How It Works",
    metaDescription:
      "What is a calorie deficit? How it burns fat, how big it should be, why weight loss slows over time, signs it's too aggressive and easy ways to create one.",
    tags: ["calorie deficit", "weight loss", "fat loss", "energy balance"],
    topics: ["Calorie Deficit", "Weight Loss"],
    featuredImageAlt: "Scale balancing calories eaten against calories burned",
    relatedSlugs: [
      "how-to-calculate-your-calorie-deficit",
      "how-many-calories-should-i-eat-to-lose-weight",
      "maintenance-calories",
      "why-am-i-not-losing-weight",
      "how-many-calories-should-i-eat-per-day",
    ],
    dayOffset: 9,
    faq: [
      {
        question: "Can you lose weight without a calorie deficit?",
        answer:
          "No. Every diet that causes fat loss — low-carb, intermittent fasting, keto — works by creating a deficit. They differ only in how easy they make it for you to eat less.",
      },
      {
        question: "Is a 1,000 calorie deficit safe?",
        answer:
          "For most people it is too aggressive: it raises hunger and fatigue, makes it harder to keep muscle and is rarely sustainable. People with a lot of weight to lose sometimes use larger deficits, but only with medical supervision.",
      },
      {
        question: "Why am I in a deficit but not losing weight?",
        answer:
          "Usually because the deficit is smaller than you think (untracked oil, snacks, weekends), or because water retention is hiding fat loss for a week or two. Compare weekly averages over 3–4 weeks before deciding.",
      },
      {
        question: "Does a calorie deficit burn muscle?",
        answer:
          "Some muscle loss is possible in any deficit, but eating 1.6–2.2 g of protein per kg and strength training two to three times a week keep most of the weight lost coming from fat.",
      },
    ],
    sources: [SRC_HALL, SRC.whoObesity, SRC_MIFFLIN, SRC.issnProtein],
    body: [
      p(
        "Every weight-loss diet, from keto to intermittent fasting, works the same way underneath: it gets you to eat less energy than you burn. That gap is a calorie deficit. Understanding it makes every other diet decision simpler.",
      ),

      h2("How a calorie deficit works"),
      p(
        `Your body burns energy all day — to keep you alive (BMR), to move and to digest food. Together that is your total daily energy expenditure, or <a href="${LINK.maintenance}">maintenance calories</a>. Eat exactly that and your weight stays stable. Eat less, and your body makes up the shortfall from stored energy: a little from stored carbohydrate (glycogen) at first, then mostly from body fat.`,
      ),
      table(
        ["Daily intake", "Example (maintenance 2,000 kcal)", "Result"],
        [
          ["Above maintenance", "2,300 kcal", "Surplus → weight gain"],
          ["At maintenance", "2,000 kcal", "Stable weight"],
          ["Below maintenance", "1,600 kcal", "400 kcal deficit → fat loss"],
        ],
      ),

      h2("How big should your deficit be?"),
      table(
        ["Deficit", "Typical size", "Expected loss", "Verdict"],
        [
          ["Small", "10% (≈ 200–250 kcal)", "≈ 0.2–0.25 kg a week", "Easy to sustain; good when close to goal"],
          ["Moderate", "15–20% (≈ 300–500 kcal)", "≈ 0.3–0.5 kg a week", "Best for most people"],
          ["Large", "25%+ (750+ kcal)", "0.75 kg+ a week", "Hard to sustain; more muscle loss; medical guidance advised"],
        ],
      ),
      p(
        `To turn these percentages into your own number, follow <a href="${LINK.calcDeficit}">how to calculate your calorie deficit</a> or use the <a href="/calorie-deficit-calculator">calorie deficit calculator</a>.`,
      ),

      h2("Why the “7,700 kcal = 1 kg” rule overpromises"),
      p(
        "A kilogram of body fat stores roughly 7,700 kcal, so a 500 kcal daily deficit “should” remove about 0.5 kg a week forever. In practice, weight loss slows over time because a smaller body burns fewer calories, and you tend to move a little less when dieting. Modelling research suggests the simple rule can overestimate long-term loss considerably. Expect faster loss in the first weeks (partly water), then a slower, steadier rate — and adjust your intake as your weight drops.",
      ),

      h2("Ways to create a deficit on an Indian diet"),
      h3("Eat less (does most of the work)"),
      ul([
        `<strong>Measure oil and ghee.</strong> Each teaspoon is about 45 kcal; three extra teaspoons a day is 135 kcal. See <a href="${LINK.ghee}">is ghee good for you</a>.`,
        `<strong>Fix the carb portion.</strong> One katori of rice or two rotis per meal instead of “whatever is served”. See <a href="${LINK.riceVsRoti}">rice vs roti</a>.`,
        `<strong>Put protein in every meal.</strong> It is the most filling macronutrient — see <a href="${LINK.proteinWl}">protein for weight loss</a>.`,
        "<strong>Bulk up with vegetables.</strong> Sabzi, salad and soups add volume for few calories.",
        "<strong>Watch liquid calories.</strong> Sweet chai, juices and cold drinks add up quickly.",
      ]),
      h3("Move more (helps, and protects your health)"),
      ul([
        `<strong>Walk more.</strong> 10,000 steps burn roughly 250–400 kcal for most adults — see <a href="${LINK.steps10k}">calories burned walking 10,000 steps</a>.`,
        "<strong>Strength train 2–3 times a week</strong> so the weight you lose is fat, not muscle.",
      ]),

      h2("Signs your deficit is too aggressive"),
      ul([
        "You are losing more than about 1% of body weight a week after the first two weeks.",
        "Constant hunger, poor sleep, irritability or dizziness.",
        "Workouts getting weaker week after week.",
        "Missed periods, hair shedding or feeling cold all the time.",
        "Regular binges after days of strict eating.",
      ]),
      p(
        "If these appear, raise intake by 150–250 kcal. A slower deficit you can keep for months beats a fast one you abandon in two weeks.",
      ),

      h2("When the deficit seems to stop working"),
      p(
        `Most “plateaus” are either water retention hiding fat loss or a deficit that quietly shrank — weekend meals, more oil, fewer steps. Track honestly for a week and compare weekly averages. Read <a href="${LINK.notLosing}">why you might not be losing weight</a> for a step-by-step check.`,
      ),
      toolCta("/calorie-deficit-calculator", "calorie deficit calculator", "Find a safe daily target for your goal weight with the"),
      GUIDE,

      takeaways([
        "A calorie deficit means eating less energy than you burn; it is how every diet works.",
        "10–20% below maintenance (usually 300–500 kcal) suits most people.",
        "Weight loss slows over time — adjust intake as you get lighter.",
        "Oil, portions, protein and liquid calories are the easiest levers in Indian food.",
        "Too-large deficits backfire through hunger, muscle loss and binges.",
      ]),
      p(DISCLAIMER),
    ].join("\n"),
  },

  {
    slug: "1200-calorie-indian-diet-plan",
    title: "1200 Calorie Indian Diet Plan: Who It's For (and Not)",
    excerpt:
      "A 1,200 calorie Indian diet plan with gram weights and about 62 g protein — and, first, who should not follow it. Plus how to tell whether 1,200 is too low for you and how to scale up.",
    quickAnswer: `A 1,200 calorie diet is too low for most adults. It is below the needs of nearly all men, active women, teenagers and anyone pregnant or breastfeeding. It may suit some smaller, sedentary women — ideally with guidance from a doctor or dietitian. If you do follow it, prioritise protein (60 g or more), vegetables and measured oil. The sample vegetarian day below provides about 1,210 kcal and 62 g protein. ${DISCLAIMER}`,
    categorySlug: "weight-loss",
    subcategorySlug: "diet-meal-planning",
    primaryKeyword: "1200 calorie diet plan indian",
    metaTitle: "1200 Calorie Indian Diet Plan (Read This First)",
    metaDescription:
      "A 1200 calorie Indian diet plan with gram weights and 62 g protein, plus who should not follow it, warning signs it's too low and how to scale it up.",
    tags: ["1200 calorie diet", "Indian diet plan", "weight loss diet", "meal plan", "low calorie"],
    topics: ["Meal Planning", "Indian Nutrition", "Calorie Deficit"],
    featuredImageAlt: "Small Indian meals: moong chilla with curd, phulka with dal and sabzi, paneer tikka with salad",
    relatedSlugs: [
      "1500-calorie-indian-diet-plan",
      "how-many-calories-should-i-eat-per-day",
      "what-is-a-calorie-deficit",
      "protein-for-weight-loss",
      "indian-diet-plan-for-weight-loss",
    ],
    dayOffset: 9,
    faq: [
      {
        question: "How much weight will I lose on 1,200 calories?",
        answer:
          "It depends on your maintenance. Someone who maintains on 1,700 kcal is in a 500 kcal deficit and may lose about 0.4–0.5 kg a week; someone who maintains on 2,400 kcal is in a deficit that is too large to sustain safely.",
      },
      {
        question: "Is 1,200 calories enough for a man?",
        answer:
          "Almost never. Even sedentary Indian men typically need about 1,900–2,100 kcal to maintain weight. A man looking to lose weight should usually start around 1,600–1,900 kcal.",
      },
      {
        question: "Can I do 1,200 calories without exercise?",
        answer:
          "You can, but strength training two to three times a week helps you keep muscle while losing weight, and walking improves health. Without them, more of the lost weight may come from muscle.",
      },
      {
        question: "Can I take a cheat day on 1,200 calories?",
        answer:
          "A planned higher-calorie meal is fine. Full 'cheat days' can easily erase a week's deficit. If you feel you need them often, your target is probably too low.",
      },
    ],
    sources: [SRC_IFCT, SRC_ICMR_RDA, SRC.whoObesity, SRC.issnProtein],
    body: [
      h2("Read this first: who should not follow a 1,200 calorie diet"),
      ul([
        "<strong>Men</strong> — even sedentary men usually need 1,900 kcal or more to maintain.",
        "<strong>Active women</strong> and anyone doing hard training or a physical job.",
        "<strong>Teenagers</strong>, who are still growing.",
        "<strong>Pregnant or breastfeeding women</strong> — needs are higher, not lower.",
        "<strong>People with diabetes on insulin or tablets</strong> — low intake can cause low blood sugar; diet changes must be agreed with your doctor.",
        "<strong>Anyone with a history of an eating disorder.</strong>",
        "<strong>Older adults</strong> at risk of muscle loss or frailty, unless supervised.",
      ]),
      p(
        `For most people, a 1,500 kcal plan (women) or 1,700–1,900 kcal (men) gives steady loss with much less hunger — see the <a href="${LINK.plan1500}">1,500 calorie Indian diet plan</a>. Check your own number first with <a href="${LINK.perDay}">how many calories you need per day</a>.`,
      ),

      h2("Who 1,200 calories may suit"),
      p(
        "Smaller, less active women — for example, under about 155 cm and 55–65 kg — whose maintenance is around 1,450–1,700 kcal. For them, 1,200 kcal is a 17–30% deficit: effective but demanding. It works best for a limited period, with enough protein and regular check-ins with a professional.",
      ),

      h2("Sample 1,200 calorie vegetarian Indian day"),
      p("Values from IFCT 2017. Dals weighed dry; cook with the oil listed and no more."),
      table(
        ["Meal", "What to eat", "Calories", "Protein"],
        [
          ["Breakfast", "2 moong dal chillas (40 g dry dal) with ½ tsp oil, 1 katori curd (150 g)", "≈ 240 kcal", "≈ 14 g"],
          ["Mid-morning", "1 guava", "≈ 30 kcal", "≈ 1.5 g"],
          ["Lunch", "2 small phulkas (40 g atta), 1 katori moong dal (30 g dry), 1 katori lauki or bhindi sabzi (½ tsp oil), salad", "≈ 315 kcal", "≈ 14 g"],
          ["Evening", "Tea with milk, no sugar; 20 g roasted chana", "≈ 165 kcal", "≈ 9 g"],
          ["Dinner", "75 g paneer tikka (½ tsp oil), 1 phulka, 1 katori sabzi, salad, 1 katori raita (150 g curd)", "≈ 460 kcal", "≈ 23 g"],
          ["<strong>Total</strong>", "", "<strong>≈ 1,210 kcal</strong>", "<strong>≈ 62 g</strong>"],
        ],
      ),
      h3("Non-veg and egg swaps"),
      ul([
        "Replace the paneer with 120 g raw chicken breast, grilled (≈ same calories, +12 g protein).",
        "Replace the chillas with 2 boiled eggs and 1 slice of whole-wheat toast (≈ +50 kcal, +5 g protein).",
        "Replace the moong dal with a piece of rohu or other fish curry made with ½ tsp oil.",
      ]),

      h2("Rules that make 1,200 calories work"),
      ol([
        "Protein at every meal — aim for 60 g or more a day.",
        "Measure oil: 1½–2 teaspoons for the whole day.",
        "Fill half of lunch and dinner with vegetables.",
        "Drink water, unsweetened tea or black coffee instead of juices and sweet chai.",
        "Strength train two to three times a week and walk daily.",
      ]),

      h2("Warning signs that 1,200 is too low for you"),
      ul([
        "Losing more than about 1% of your body weight per week after the first two weeks.",
        "Dizziness, headaches, poor sleep or constant tiredness.",
        "Missed or irregular periods, hair shedding.",
        "Strong cravings and regular binges.",
        "Workouts getting harder every week.",
      ]),
      p(
        `If any of these appear, move up to 1,400–1,500 kcal by adding a roti, a katori of dal or a glass of milk. A slower deficit you can keep is better than a fast one you quit — see <a href="${LINK.deficit}">what a calorie deficit is</a> for how to size it.`,
      ),

      h2("How to scale this plan"),
      table(
        ["Target", "Add to the 1,200 day"],
        [
          ["≈ 1,400 kcal", "+1 phulka at lunch, +1 banana or apple"],
          ["≈ 1,500 kcal", "Above + 1 glass toned milk"],
          ["≈ 1,650 kcal", "Above + ½ katori rice at dinner and 1 tsp ghee"],
        ],
      ),
      p(
        `For a full week of meals, follow the <a href="${LINK.weekPlan}">7-day Indian diet plan for weight loss</a>, and make sure protein is high enough with <a href="${LINK.proteinWl}">protein for weight loss</a>.`,
      ),
      toolCta("/calorie-deficit-calculator", "calorie deficit calculator", "Check whether 1,200 is a safe target for you with the"),
      GUIDE,

      takeaways([
        "1,200 kcal is too low for most men, active women, teens and pregnant or breastfeeding women.",
        "It may suit smaller, sedentary women for a limited time, ideally with professional support.",
        "Keep protein at 60 g or more, measure oil and fill half your plate with vegetables.",
        "Watch for warning signs and scale up to 1,400–1,500 kcal if needed.",
      ]),
      p(DISCLAIMER),
    ].join("\n"),
  },

  {
    slug: "2000-calorie-indian-diet-plan",
    title: "2000 Calorie Indian Diet Plan (Veg & Non-Veg)",
    excerpt:
      "A 2,000 calorie Indian diet plan with gram weights and about 90 g protein: who 2,000 kcal is right for, a full vegetarian day, non-veg swaps, and how to adjust it for weight loss, maintenance or muscle gain.",
    quickAnswer: `A 2,000 calorie Indian diet plan suits many moderately active women at maintenance and many men who want to lose weight. The sample vegetarian day below gives about 2,010 kcal and 90 g protein from familiar foods: moong chilla, roti, rajma, rice, dal, paneer, curd and milk. Swap in eggs, chicken or fish for more protein. Whether 2,000 kcal makes you lose, keep or gain weight depends on your maintenance calories. ${DISCLAIMER}`,
    categorySlug: "weight-loss",
    subcategorySlug: "diet-meal-planning",
    primaryKeyword: "2000 calorie diet plan indian",
    metaTitle: "2000 Calorie Indian Diet Plan (Veg & Non-Veg)",
    metaDescription:
      "A 2000 calorie Indian diet plan with gram weights and 90 g protein, who it suits, non-veg swaps and how to adjust it for weight loss, maintenance or gain.",
    tags: ["2000 calorie diet", "Indian diet plan", "meal plan", "weight loss diet", "high protein"],
    topics: ["Meal Planning", "Indian Nutrition"],
    featuredImageAlt: "A day of Indian meals: moong chilla, roti with rajma, rice with dal and paneer bhurji",
    relatedSlugs: [
      "1500-calorie-indian-diet-plan",
      "how-many-calories-should-i-eat-per-day",
      "indian-diet-plan-for-weight-loss",
      "protein-for-weight-loss",
      "bulking-on-an-indian-diet",
    ],
    dayOffset: 9,
    faq: [
      {
        question: "Will I lose weight on 2,000 calories a day?",
        answer:
          "If your maintenance is above about 2,300 kcal — common for men and active, taller women — yes, at roughly 0.25–0.5 kg a week. If your maintenance is around 2,000 kcal, you will maintain; if it is lower, you may gain slowly.",
      },
      {
        question: "Is 2,000 calories enough to build muscle?",
        answer:
          "For smaller, less active people it can be at or slightly above maintenance, which is enough. Most men building muscle need more — see our bulking plan.",
      },
      {
        question: "Can I include sweets or eating out?",
        answer:
          "Yes, occasionally. Plan for it: a gulab jamun is about 150 kcal and a restaurant curry can be 300–400 kcal, so trim the rest of that day or the next.",
      },
      {
        question: "Is this plan suitable for diabetes?",
        answer:
          "It is balanced and high in protein and fibre, but people with diabetes need carbohydrate amounts matched to their medication and blood-sugar targets. Use it only with your doctor or dietitian's input.",
      },
    ],
    sources: [SRC_IFCT, SRC_ICMR_RDA, SRC.icmr, SRC.issnProtein],
    body: [
      p(
        "2,000 kcal is the number printed on most food labels, but it is not a universal target. For an Indian woman who is fairly active it is roughly maintenance; for most men it is a comfortable fat-loss target. Here is who it suits and what a full day looks like.",
      ),

      h2("Who 2,000 calories is right for"),
      table(
        ["Person", "Maintenance (approx.)", "On 2,000 kcal"],
        [
          ["Sedentary woman, 55–60 kg", "≈ 1,450–1,550 kcal", "Slow weight gain"],
          ["Moderately active woman, 55–65 kg", "≈ 1,900–2,100 kcal", "Maintenance"],
          ["Sedentary man, 65–75 kg", "≈ 1,900–2,000 kcal", "Maintenance"],
          ["Moderately active man, 70–80 kg", "≈ 2,500–2,650 kcal", "Fat loss (≈ 0.4–0.6 kg a week)"],
        ],
      ),
      p(
        `Estimates from the Mifflin-St Jeor equation; your real number may differ by 10–15%. Work out yours with <a href="${LINK.perDay}">how many calories you need per day</a> or the <a href="/calorie-calculator">calorie calculator</a>.`,
      ),

      h2("Sample 2,000 calorie vegetarian day (≈ 90 g protein)"),
      p("Values from IFCT 2017; dals and rice weighed dry or raw."),
      table(
        ["Meal", "What to eat", "Calories", "Protein"],
        [
          ["Breakfast", "3 moong dal chillas (60 g dry dal) with 1 tsp oil, 1 katori curd (150 g)", "≈ 330 kcal", "≈ 19 g"],
          ["Mid-morning", "1 banana, 10 almonds", "≈ 180 kcal", "≈ 3.5 g"],
          ["Lunch", "3 rotis (90 g atta), 1 katori rajma (40 g dry), 1 katori sabzi with 1 tsp oil, salad", "≈ 530 kcal", "≈ 20 g"],
          ["Evening", "1 glass milk or milky tea with 1 tsp sugar, 30 g roasted chana", "≈ 275 kcal", "≈ 12.5 g"],
          ["Dinner", "1 katori rice (50 g raw), 1 roti, 100 g paneer bhurji with 1 tsp oil, 1 katori moong dal, salad", "≈ 695 kcal", "≈ 34 g"],
          ["<strong>Total</strong>", "", "<strong>≈ 2,010 kcal</strong>", "<strong>≈ 90 g</strong>"],
        ],
      ),

      h2("Non-veg and egg swaps"),
      table(
        ["Swap out", "Swap in", "Effect"],
        [
          ["3 moong dal chillas", "2-egg omelette + 1 slice whole-wheat toast", "≈ same calories, +7 g protein"],
          ["100 g paneer bhurji", "150 g chicken breast curry (raw weight, 1 tsp oil)", "≈ same calories, +14 g protein"],
          ["1 katori rajma", "1 piece rohu fish curry (75 g, 1 tsp oil)", "≈ same calories, +7 g protein"],
        ],
      ),

      h2("Adjust it to your goal"),
      table(
        ["Goal", "Change", "New total"],
        [
          ["Faster fat loss", "Drop the evening chana and use 2 rotis at lunch", "≈ 1,800 kcal"],
          ["Maintenance (if 2,000 is a deficit for you)", "Add 1 glass milk at night and 1 tsp ghee at lunch", "≈ 2,200 kcal"],
          ["Muscle gain", "Above + 1 more roti and 30 g peanuts", "≈ 2,450 kcal"],
        ],
      ),
      p(
        `Need lower? See the <a href="${LINK.plan1500}">1,500 calorie Indian diet plan</a>. Building muscle on a bigger intake? See <a href="/blog/muscle-building/bulking/bulking-on-an-indian-diet">bulking on an Indian diet</a>.`,
      ),

      h2("Make it work day to day"),
      ul([
        "Cook a big batch of dal and rajma twice a week; portion it into katoris.",
        "Measure oil into the pan with a teaspoon, not a pour.",
        "Keep protein at every meal: curd, dal, paneer, eggs or chicken.",
        `Eat out with a plan — a restaurant thali can be 1,000–1,800 kcal on its own. See <a href="${LINK.thali}">calories in an Indian thali</a>.`,
        "Weigh yourself 3–4 mornings a week and adjust by 150–200 kcal after 2–3 weeks if needed.",
      ]),
      p(
        `For variety across a full week, use the <a href="${LINK.weekPlan}">7-day Indian diet plan for weight loss</a>, and check protein targets in <a href="${LINK.proteinWl}">protein for weight loss</a>.`,
      ),
      toolCta("/macro-calculator", "macro calculator", "Split 2,000 kcal into protein, carbs and fat for your goal with the"),
      GUIDE,

      takeaways([
        "2,000 kcal is maintenance for many active women and a fat-loss target for many men.",
        "The sample vegetarian day gives about 2,010 kcal and 90 g protein from everyday Indian food.",
        "Egg, chicken and fish swaps raise protein at similar calories.",
        "Scale up or down by a roti, a glass of milk or a teaspoon of ghee.",
      ]),
      p(DISCLAIMER),
    ].join("\n"),
  },

  {
    slug: "calories-burned-walking-10000-steps",
    title: "Calories Burned Walking 10,000 Steps (By Weight)",
    excerpt:
      "How many calories 10,000 steps burn for your body weight, how far 10,000 steps is, how pace changes the number, how much fat that adds up to each month and whether 10,000 steps is the right target.",
    quickAnswer: `Walking 10,000 steps burns about 250–500 kcal for most adults, depending mainly on body weight. A 70 kg person walking at a normal pace burns roughly 360 kcal in total, or about 260 kcal more than they would have burned resting. 10,000 steps is about 6.5–7.5 km and takes 80–100 minutes. Walking faster mostly saves time rather than adding many calories. ${DISCLAIMER}`,
    categorySlug: "weight-loss",
    subcategorySlug: "walking-daily-activity",
    primaryKeyword: "calories burned walking 10000 steps",
    metaTitle: "Calories Burned Walking 10,000 Steps (By Weight)",
    metaDescription:
      "How many calories do 10,000 steps burn? Totals by body weight, distance and time, how pace changes it, monthly fat-loss impact and whether 10k is the right goal.",
    tags: ["10000 steps", "walking calories", "steps", "walking for weight loss", "NEAT"],
    topics: ["Walking", "Weight Loss", "Calories"],
    featuredImageAlt: "Phone step counter showing 10,000 steps during an evening walk",
    relatedSlugs: [
      "does-walking-help-you-lose-weight",
      "what-is-a-calorie-deficit",
      "how-to-lose-belly-fat",
      "why-am-i-not-losing-weight",
      "how-many-calories-should-i-eat-per-day",
    ],
    dayOffset: 9,
    faq: [
      {
        question: "How many calories do 5,000 steps burn?",
        answer:
          "About half the 10,000-step numbers: roughly 130–250 kcal in total for most adults, or 90–180 kcal above resting.",
      },
      {
        question: "Can I lose weight just by walking 10,000 steps?",
        answer:
          "It helps, especially if you currently walk 3,000–5,000 steps a day. But 260 kcal of extra burn is easy to cancel with a couple of biscuits and a sweet chai, so food still decides most of the result.",
      },
      {
        question: "Do steps at home and work count?",
        answer:
          "Yes. Every step burns energy, whether it is a walk in the park, climbing stairs at the office or walking around the kitchen. Total daily steps matter more than one long walk.",
      },
      {
        question: "Is my smartwatch calorie number accurate?",
        answer:
          "Step counts are usually fairly accurate, but calorie estimates can be off by 20–40%. Use the trend, not the exact number, and never 'eat back' every calorie your watch reports.",
      },
    ],
    sources: [SRC_COMPENDIUM, SRC_PALUCH, SRC_TUDOR, SRC.whoObesity],
    body: [
      p(
        "10,000 steps a day is the most famous fitness target in the world. It began as a marketing slogan for a Japanese pedometer in the 1960s, but it turns out to be a useful number: it adds a meaningful amount of activity to a desk-bound day. Here is what it actually burns.",
      ),

      h2("Calories burned walking 10,000 steps, by weight"),
      p(
        "For a person about 170 cm tall walking at a normal pace (4.8 km/h), using the Compendium of Physical Activities value of 3.5 METs. “Above resting” is the extra energy compared with sitting still — the number that matters for weight loss.",
      ),
      table(
        ["Body weight", "Total calories", "Above resting"],
        [
          ["50 kg", "≈ 255 kcal", "≈ 185 kcal"],
          ["60 kg", "≈ 310 kcal", "≈ 220 kcal"],
          ["70 kg", "≈ 360 kcal", "≈ 260 kcal"],
          ["80 kg", "≈ 410 kcal", "≈ 295 kcal"],
          ["90 kg", "≈ 465 kcal", "≈ 330 kcal"],
          ["100 kg", "≈ 515 kcal", "≈ 370 kcal"],
        ],
      ),
      p(
        "Shorter people take shorter strides, so they cover less distance and burn a little less per 10,000 steps; taller people burn a little more. Our <a href=\"/steps-to-calories-calculator\">steps to calories calculator</a> adjusts for your height, weight and pace.",
      ),

      h2("How far and how long is 10,000 steps?"),
      table(
        ["Height", "Stride (approx.)", "Distance", "Time at 4.8 km/h"],
        [
          ["155 cm", "64 cm", "≈ 6.4 km", "≈ 80 min"],
          ["165 cm", "68 cm", "≈ 6.8 km", "≈ 85 min"],
          ["175 cm", "73 cm", "≈ 7.3 km", "≈ 90 min"],
          ["185 cm", "77 cm", "≈ 7.7 km", "≈ 95 min"],
        ],
      ),

      h2("Does walking faster burn more?"),
      p("For a 70 kg, 170 cm person covering the same 10,000 steps:"),
      table(
        ["Pace", "Time", "Total calories", "Above resting"],
        [
          ["Easy (3.2 km/h)", "≈ 130 min", "≈ 435 kcal", "≈ 280 kcal"],
          ["Normal (4.8 km/h)", "≈ 90 min", "≈ 360 kcal", "≈ 260 kcal"],
          ["Brisk (5.6 km/h)", "≈ 75 min", "≈ 380 kcal", "≈ 290 kcal"],
        ],
      ),
      p(
        "The extra calories above resting barely change with pace — walking faster mainly gets the steps done sooner. Brisk walking does improve fitness more, so it is still worth it when you have time.",
      ),

      h2("What 10,000 steps a day adds up to"),
      p(
        "If you currently walk about 4,000 steps and move up to 10,000, the extra 6,000 steps burn roughly 150–200 kcal a day above resting for a 70 kg person. Over a month that is about 4,500–6,000 kcal — in theory around 0.5–0.75 kg of fat, if you do not eat more to compensate. Real results are usually a bit smaller because the body adapts, but it is a meaningful boost to any diet.",
      ),
      p("At 70 kg, every 1,000 steps burns only about 26 kcal above resting, so small treats cancel a lot of walking:"),
      table(
        ["Food", "Calories", "Steps to burn it off (70 kg, above resting)"],
        [
          ["2 cups sweet chai with 2 biscuits each", "≈ 300 kcal", "≈ 11,500 steps"],
          ["1 samosa", "≈ 250 kcal", "≈ 10,000 steps"],
          ["1 gulab jamun", "≈ 150 kcal", "≈ 6,000 steps"],
          ["1 can of cola (330 ml)", "≈ 140 kcal", "≈ 5,500 steps"],
        ],
      ),
      p(
        `That is why walking works best alongside a modest diet change — see <a href="${LINK.deficit}">what a calorie deficit is</a> and <a href="${LINK.walking}">does walking help you lose weight</a>.`,
      ),

      h2("Is 10,000 the right target?"),
      p(
        "For health, large studies pooling data from 15 cohorts found the risk of early death kept falling as daily steps rose, levelling off at around 6,000–8,000 steps for adults over 60 and 8,000–10,000 steps for younger adults. So:",
      ),
      ul([
        "If you walk under 5,000 steps, any increase helps. Add 1,000–2,000 a day each week.",
        "7,000–10,000 steps covers most of the health benefit for most adults.",
        "For fat loss, more steps help, but they are not a substitute for eating less.",
      ]),

      h2("Easy ways to add steps in an Indian day"),
      ul([
        "A 10–15 minute walk after lunch and dinner (≈ 1,500–2,000 steps each) — also helps blood sugar after meals.",
        "Walk while on phone calls.",
        "Take the stairs for 2–3 floors instead of the lift.",
        "Get off the auto or metro one stop early.",
        "Walk to the local kirana or vegetable market instead of ordering.",
      ]),
      toolCta("/steps-to-calories-calculator", "steps to calories calculator", "See exactly what your steps burn with the"),
      GUIDE,

      takeaways([
        "10,000 steps burn about 250–500 kcal in total for most adults; ≈ 260 kcal above resting at 70 kg.",
        "10,000 steps is about 6.5–7.5 km and 80–100 minutes of walking.",
        "Pace changes time more than calories; body weight changes calories most.",
        "Health benefits level off around 7,000–10,000 steps a day for most adults.",
        "Walking boosts fat loss but cannot outwalk an unplanned diet.",
      ]),
      p(DISCLAIMER),
    ].join("\n"),
  },

  {
    slug: "calories-in-indian-thali",
    title: "Calories in an Indian Thali: Veg, South Indian & More",
    excerpt:
      "How many calories are in an Indian thali — home veg, restaurant Punjabi, South Indian meals, Gujarati, Bengali fish and non-veg thalis — with item-by-item estimates and a simple way to build a lighter thali.",
    quickAnswer: `A home-style North Indian veg thali (2 rotis, rice, dal, sabzi, curd and salad) has roughly 750–850 kcal. Restaurant thalis are much higher: a Punjabi or Gujarati thali with naan or puri, rich curries, farsan and a sweet is often 1,300–2,000 kcal. South Indian meals with unlimited rice usually land around 900–1,200 kcal. Oil, ghee, fried sides and refills make the biggest difference. ${DISCLAIMER}`,
    categorySlug: "nutrition",
    subcategorySlug: "calories-energy",
    primaryKeyword: "calories in indian thali",
    metaTitle: "Calories in an Indian Thali (Veg, South Indian)",
    metaDescription:
      "How many calories are in an Indian thali? Item-by-item estimates for home veg, Punjabi, South Indian, Gujarati, Bengali and non-veg thalis, and how to eat lighter.",
    tags: ["thali calories", "Indian food calories", "restaurant food", "portion control"],
    topics: ["Calories", "Indian Nutrition"],
    featuredImageAlt: "A steel Indian thali with roti, rice, dal, sabzi, curd, salad and pickle",
    relatedSlugs: [
      "how-many-calories-should-i-eat-per-day",
      "best-indian-foods-for-weight-loss",
      "rice-vs-roti-for-weight-loss",
      "is-ghee-good-for-you",
      "why-am-i-not-losing-weight",
    ],
    dayOffset: 9,
    faq: [
      {
        question: "How many calories are in a veg thali?",
        answer:
          "A home-style veg thali is about 750–850 kcal. A restaurant veg thali is usually 1,200–1,800 kcal because of naan or puri, cream- or butter-based curries, fried sides and a sweet.",
      },
      {
        question: "Can I eat a thali on a diet?",
        answer:
          "Yes. A thali is a balanced meal when the portions are sensible. Skip refills, choose roti over puri or naan, leave the sweet or share it, and fill up on dal, salad and sabzi.",
      },
      {
        question: "Is a South Indian meal lower in calories?",
        answer:
          "Sambar, rasam and poriyal are fairly light, but unlimited rice refills push the total up. Two katoris of rice with the sides is roughly 900–1,000 kcal; three or four katoris can go past 1,200.",
      },
      {
        question: "Why are restaurant thalis so high in calories?",
        answer:
          "Mostly fat: restaurant curries often use several tablespoons of oil, butter or cream per portion, breads are brushed with ghee or butter, and fried items like papad, pakora and puri add more.",
      },
    ],
    sources: [SRC_IFCT, SRC.icmr, SRC_ICMR_RDA],
    body: [
      p(
        "A thali is one of the most balanced meals you can eat — grain, dal, vegetables, curd — but the calorie total varies enormously. A home thali can be under 800 kcal; a restaurant thali with refills can be more than most people need for a whole day. The difference comes down to fat, fried items and portions.",
      ),

      h2("Calories in common thalis"),
      p(
        "Estimates for a typical single serving without refills. Home values are built from IFCT 2017 food data with the oil listed; restaurant values are ranges because recipes vary.",
      ),
      table(
        ["Thali", "Typical contents", "Approx. calories"],
        [
          ["Home North Indian veg", "2 rotis, 1 katori rice, dal, sabzi, curd, salad, pickle", "≈ 750–850 kcal"],
          ["Office / mini thali", "2 rotis or rice, dal, 1 sabzi, curd", "≈ 600–800 kcal"],
          ["South Indian meals", "2 katori rice, sambar, rasam, poriyal, kootu, curd, papad", "≈ 900–1,100 kcal"],
          ["Bengali fish thali", "2 katori rice, dal, fish curry, bhaja, chutney", "≈ 900–1,100 kcal"],
          ["Gujarati thali", "Rotli with ghee, dal, kadhi, 2 shaak, rice, farsan, sweet", "≈ 1,300–1,700 kcal"],
          ["Restaurant Punjabi veg", "Butter naan, dal makhani, paneer gravy, jeera rice, raita, gulab jamun", "≈ 1,500–2,000 kcal"],
          ["Restaurant non-veg", "Naan or rice, chicken curry, dal, raita, salad, sweet", "≈ 1,400–1,900 kcal"],
        ],
      ),

      h2("Item by item: home North Indian veg thali"),
      table(
        ["Item", "Portion", "Calories"],
        [
          ["<a href=\"/foods/roti\">Roti</a>", "2 medium (60 g atta)", "≈ 190 kcal"],
          ["<a href=\"/foods/rice\">Rice</a>", "1 katori cooked (50 g raw)", "≈ 180 kcal"],
          ["Dal with tadka", "1 katori (30 g dry dal + 1 tsp ghee)", "≈ 140 kcal"],
          ["Sabzi (e.g. aloo gobi)", "1 katori with 2 tsp oil", "≈ 150 kcal"],
          ["Curd", "1 katori (150 g)", "≈ 90 kcal"],
          ["Salad", "1 plate", "≈ 20 kcal"],
          ["Pickle", "1 tablespoon", "≈ 30 kcal"],
          ["<strong>Total</strong>", "", "<strong>≈ 800 kcal</strong>"],
        ],
      ),
      p(
        "Swap one roti for a second katori of rice and the total barely moves — see <a href=\"" +
          LINK.riceVsRoti +
          "\">rice vs roti for weight loss</a>. Add a teaspoon of ghee on the rice and it rises by 45 kcal.",
      ),

      h2("Item by item: restaurant Punjabi veg thali"),
      table(
        ["Item", "Approx. calories"],
        [
          ["2 butter naan", "≈ 500–600 kcal"],
          ["Dal makhani (1 katori)", "≈ 250–300 kcal"],
          ["Paneer butter masala (1 katori)", "≈ 300–400 kcal"],
          ["Jeera rice (1 katori)", "≈ 220–260 kcal"],
          ["Boondi raita", "≈ 100–130 kcal"],
          ["Gulab jamun (1)", "≈ 150 kcal"],
          ["Salad, pickle, papad", "≈ 60–100 kcal"],
          ["<strong>Total</strong>", "<strong>≈ 1,580–1,940 kcal</strong>"],
        ],
      ),
      p(
        `That single meal is close to a full day's needs for many women (see <a href="${LINK.perDay}">how many calories you need per day</a>).`,
      ),

      h2("What adds the most calories"),
      ul([
        `<strong>Oil, ghee and butter:</strong> each teaspoon ≈ 45 kcal; restaurant gravies often hide 2–4 tablespoons per portion. See <a href="${LINK.ghee}">is ghee good for you</a>.`,
        "<strong>Breads:</strong> a plain roti is about 95 kcal; a butter naan 250–300; a puri 100–130.",
        "<strong>Fried sides:</strong> fried papad ≈ 60 kcal; pakora or farsan ≈ 150–250 per serving.",
        "<strong>Refills:</strong> every extra katori of rice is ≈ 180 kcal.",
        "<strong>Sweets:</strong> 150–300 kcal each.",
      ]),

      h2("How to build a lighter thali (≈ 600–700 kcal)"),
      ol([
        "Choose roti or phulka over naan, puri or paratha; limit to 2 pieces.",
        "One katori of rice, no refill, if you also take rotis — or 1½ katori rice and no roti.",
        "Fill up on dal, sambar, rasam, salad and dry sabzi.",
        "Pick one rich item (paneer gravy or dal makhani), not both.",
        "Have plain curd or raita instead of boondi raita.",
        "Skip the papad and sweet, or share them.",
      ]),
      p(
        `For a list of the best everyday choices, see the <a href="${LINK.indianFoodsWl}">best Indian foods for weight loss</a>. If thalis keep appearing in your week and the scale won't move, read <a href="${LINK.notLosing}">why you might not be losing weight</a>.`,
      ),
      p(
        "Look up exact values for staples in the <a href=\"/foods/indian\">Indian food calories and protein chart</a>.",
      ),
      toolCta("/calorie-calculator", "calorie calculator", "See how a thali fits your daily target with the"),
      GUIDE,

      takeaways([
        "A home veg thali is about 750–850 kcal; restaurant thalis are often 1,300–2,000 kcal.",
        "Fat (oil, ghee, butter, cream), fried sides, breads and refills cause most of the difference.",
        "South Indian meals depend mainly on how much rice you take.",
        "Roti over naan, one rich dish, no refills and no fried sides keep a thali near 600–700 kcal.",
      ]),
      p(DISCLAIMER),
    ].join("\n"),
  },
];
