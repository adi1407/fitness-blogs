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
  maintenance: "/blog/nutrition/calories-energy/maintenance-calories",
  calories:
    "/blog/weight-loss/calorie-deficit/how-many-calories-should-i-eat-to-lose-weight",
  deficit:
    "/blog/weight-loss/calorie-deficit/how-to-calculate-your-calorie-deficit",
  walking:
    "/blog/weight-loss/walking-daily-activity/does-walking-help-you-lose-weight",
  notLosing:
    "/blog/weight-loss/weight-loss-plateaus/why-am-i-not-losing-weight",
  breakfast: "/blog/weight-loss/diet-meal-planning/best-breakfast-for-weight-loss",
  dinner: "/blog/weight-loss/diet-meal-planning/best-dinner-for-weight-loss",
  plan1500: "/blog/weight-loss/diet-meal-planning/1500-calorie-indian-diet-plan",
  weekPlan: "/blog/weight-loss/diet-meal-planning/indian-diet-plan-for-weight-loss",
  highProteinIndian: "/blog/nutrition/protein/best-high-protein-indian-foods",
  vegProtein: "/blog/nutrition/protein/vegetarian-protein-sources-india",
  proteinForWeightLoss: "/blog/weight-loss/weight-loss-nutrition/protein-for-weight-loss",
  indianFoods: "/blog/weight-loss/weight-loss-nutrition/best-indian-foods-for-weight-loss",
  riceVsRoti: "/blog/weight-loss/weight-loss-nutrition/rice-vs-roti-for-weight-loss",
};

const SRC_MIFFLIN = {
  title:
    "Mifflin et al. (1990) — A new predictive equation for resting energy expenditure in healthy individuals (Am J Clin Nutr)",
  url: "https://pubmed.ncbi.nlm.nih.gov/2305711/",
  note: "The BMR equation used by our BMR and TDEE calculators",
};

const SRC_IFCT = {
  title: "Longvah et al. (2017) — Indian Food Composition Tables (ICMR-National Institute of Nutrition)",
  url: "https://www.nin.res.in/",
  note: "Source of the per-100 g values used for Indian foods in this guide and in the fitlives food database",
};

export const batch11: IntentArticleDef[] = [
  {
    slug: "bmr-vs-tdee",
    title: "BMR vs TDEE: What’s the Difference?",
    excerpt:
      "BMR is what your body burns at complete rest; TDEE is what you burn in a whole day. Here’s how the two numbers relate, how to calculate each, and which one to use when you set a calorie target.",
    quickAnswer: `BMR (basal metabolic rate) is the calories your body burns at complete rest just to stay alive. TDEE (total daily energy expenditure) is BMR plus everything else you do in a day — digesting food, walking, working and exercising. TDEE is usually 1.2 to 1.9 times your BMR. Use TDEE, not BMR, to set calorie targets: it is your maintenance, and eating only your BMR is a large deficit for almost everyone. ${DISCLAIMER}`,
    categorySlug: "nutrition",
    subcategorySlug: "calories-energy",
    primaryKeyword: "bmr vs tdee",
    metaTitle: "BMR vs TDEE: What’s the Difference?",
    metaDescription:
      "BMR vs TDEE explained: what each number measures, how to calculate both with a worked Indian example, and why calorie targets should start from TDEE.",
    tags: ["BMR", "TDEE", "maintenance calories", "metabolism", "calorie deficit"],
    topics: ["Calorie Deficit", "Body Composition", "Beginner Fitness"],
    featuredImageAlt:
      "Two calorie numbers compared: a resting body for BMR and a person walking to work for TDEE",
    relatedSlugs: [
      "maintenance-calories",
      "how-many-calories-should-i-eat-to-lose-weight",
      "how-to-calculate-your-calorie-deficit",
      "does-walking-help-you-lose-weight",
    ],
    dayOffset: 9,
    faq: [
      {
        question: "Should I eat my BMR or my TDEE to lose weight?",
        answer:
          "Neither exactly. Start from your TDEE and eat about 10–20% below it. For most people, eating only their BMR means a deficit of roughly 20–35%, which is hard to sustain, makes training feel worse and increases muscle loss.",
      },
      {
        question: "Is TDEE the same as maintenance calories?",
        answer:
          "Yes. TDEE is what you burn in a day, so eating that much on average keeps your weight steady. A calculator gives an estimate; your real maintenance is the intake at which your weekly average weight stays flat.",
      },
      {
        question: "Can I increase my BMR?",
        answer:
          "Only a little. Building muscle raises BMR slightly, and a heavier body has a higher BMR. The bigger, easier lever is TDEE: more daily steps and regular training can add several hundred calories a day.",
      },
      {
        question: "Why is my BMR lower than my friend’s?",
        answer:
          "BMR depends mostly on body size, sex and age. A taller, heavier or younger person, or someone with more muscle, burns more at rest. Equations also have an error margin of around 10% for individuals.",
      },
    ],
    sources: [
      SRC_MIFFLIN,
      {
        title:
          "Frankenfield et al. (2005) — Comparison of predictive equations for resting metabolic rate: a systematic review (J Am Diet Assoc)",
        url: "https://pubmed.ncbi.nlm.nih.gov/15883556/",
        note: "Mifflin-St Jeor was the most accurate common equation; individual error can exceed 10%",
      },
      {
        title: "Westerterp (2004) — Diet induced thermogenesis (Nutrition & Metabolism)",
        url: "https://pubmed.ncbi.nlm.nih.gov/15507147/",
        note: "Digestion accounts for roughly 10% of daily energy expenditure",
      },
      {
        title:
          "Levine (2002) — Non-exercise activity thermogenesis (Best Pract Res Clin Endocrinol Metab)",
        url: "https://pubmed.ncbi.nlm.nih.gov/12468415/",
        note: "Everyday movement is the most variable part of daily calorie burn",
      },
    ],
    body: [
      p(
        "If you have used a calorie calculator, you have probably seen two numbers: BMR and TDEE. They sound similar, but mixing them up is one of the most common reasons people set a calorie target that is far too low — and then give up when they feel exhausted.",
        "Here is the difference in plain terms, how each is calculated, and which one to use.",
      ),

      h2("BMR vs TDEE at a glance"),
      table(
        ["", "BMR (basal metabolic rate)", "TDEE (total daily energy expenditure)"],
        [
          ["What it measures", "Calories burned at complete rest — lying still, awake, after a night’s fast", "Calories burned in a full, normal day"],
          ["Includes", "Heart, brain, breathing, organs, body temperature", "BMR + digesting food + daily movement + exercise"],
          ["Typical size", "About 1,200–1,800 kcal for most adults", "About 1.2–1.9 × BMR"],
          ["Use it for", "Understanding your baseline", "Setting calorie targets (it is your maintenance)"],
        ],
      ),

      h2("What is BMR?"),
      p(
        "BMR is the energy your body needs to keep you alive if you did nothing at all for 24 hours. It makes up the biggest share of your daily burn — roughly 60–70% for most people — and it is mostly decided by your size, sex and age.",
        "Most calculators estimate it with the Mifflin-St Jeor equation, which a systematic review found to be the most reliable of the common formulas:",
      ),
      ul([
        "<strong>Men:</strong> BMR = (10 × weight in kg) + (6.25 × height in cm) − (5 × age) + 5",
        "<strong>Women:</strong> BMR = (10 × weight in kg) + (6.25 × height in cm) − (5 × age) − 161",
      ]),
      toolCta("/bmr-calculator", "BMR calculator", "Get yours in seconds with the"),

      h2("What is TDEE?"),
      p(
        "TDEE is everything your body burns in a day. On top of BMR it adds three things:",
      ),
      ul([
        "<strong>Digesting food</strong> (thermic effect of food) — about 10% of the day’s burn, a bit higher on high-protein diets.",
        "<strong>Everyday movement</strong> (NEAT) — walking, standing, chores, climbing stairs. This varies the most between people, often by several hundred calories a day.",
        "<strong>Exercise</strong> — planned workouts and sport. For most gym-goers this is a smaller slice than they expect.",
      ]),
      p(
        "Calculators estimate TDEE by multiplying BMR by an activity factor:",
      ),
      table(
        ["Activity level", "Typical day", "TDEE = BMR ×"],
        [
          ["Sedentary", "Desk job, under ~5,000 steps", "1.2"],
          ["Lightly active", "~5,000–7,500 steps or exercise 1–3 days a week", "1.375"],
          ["Moderately active", "~7,500–10,000 steps or exercise 3–5 days a week", "1.55"],
          ["Very active", "Physical job or hard training 6–7 days a week", "1.725"],
          ["Extremely active", "Manual labour plus daily training", "1.9"],
        ],
      ),
      toolCta("/tdee-calculator", "TDEE calculator", "Add your activity level with the"),

      h2("Worked example: same person, two numbers"),
      p(
        "Rohan is 30, 70 kg and 170 cm, works at a desk and goes to the gym three days a week.",
      ),
      table(
        ["Step", "Calculation", "Result"],
        [
          ["BMR", "(10 × 70) + (6.25 × 170) − (5 × 30) + 5", "≈ <strong>1,620 kcal/day</strong>"],
          ["Activity", "Desk job + 3 gym days → lightly active", "× 1.375"],
          ["TDEE", "1,620 × 1.375", "≈ <strong>2,220 kcal/day</strong>"],
        ],
      ),
      p(
        "The gap is 600 kcal a day. If Rohan read his BMR as “what I should eat” and ate 1,620 kcal to lose weight, he would be in a deficit of about 27% — far steeper than he needs, and much harder to stick with. Starting from his TDEE, a 15% deficit puts him at about 1,890 kcal: real Indian meals, steady fat loss, and enough energy to train.",
      ),

      h2("Which number should you use?"),
      table(
        ["Goal", "Start from", "Target"],
        [
          ["Lose fat", "TDEE", "10–20% below TDEE"],
          ["Maintain weight", "TDEE", "At TDEE"],
          ["Build muscle", "TDEE", "5–10% above TDEE"],
          ["Understand your minimum", "BMR", "Not a target — a floor most people should stay well above"],
        ],
      ),
      p(
        `TDEE is your maintenance calories, so every goal starts there. For the full method, read <a href="${LINK.maintenance}">what maintenance calories are and how to find yours</a>, then <a href="${LINK.deficit}">how to calculate your calorie deficit</a>.`,
      ),

      h2("Why you shouldn’t eat at your BMR"),
      ul([
        "<strong>It is a bigger deficit than it looks.</strong> For most people BMR is roughly 20–35% below TDEE — beyond the 10–20% range that is easiest to sustain.",
        "<strong>Muscle loss goes up</strong> with very large deficits, especially if protein is low.",
        "<strong>Energy and training suffer,</strong> and everyday movement quietly drops, which shrinks your TDEE and slows the result you were trying to speed up.",
        "<strong>It rarely lasts.</strong> Very low intakes are the most common setup for a weekend binge that wipes out the week’s deficit.",
      ]),

      h2("Both numbers are estimates"),
      p(
        "Equations can be off by 10% or more for an individual, and the activity factor is a judgement call. Treat a calculator’s TDEE as a starting point, eat close to it for two weeks, and watch your weekly average weight. If it holds steady, that is your real maintenance. If you are dieting and the scale will not move, work through <a href=\"" +
          LINK.notLosing +
          "\">why you might not be losing weight</a> before cutting calories further.",
      ),

      h2("How to raise your TDEE (the easier lever)"),
      p(
        `You cannot change BMR much, but TDEE responds to how you live. A daily step target is the simplest win — see <a href="${LINK.walking}">does walking help you lose weight</a>. Strength training adds a little muscle (a small BMR boost) and keeps the weight you lose coming from fat. Protein slightly raises the calories spent on digestion and keeps you fuller in a deficit.`,
      ),

      h2("Who should be careful"),
      p(
        "These equations are designed for healthy, non-pregnant adults. They are less reliable if you are pregnant or breastfeeding, under 18, very muscular, living with obesity, or managing a thyroid, metabolic or kidney condition. If any of these apply, or you have a history of disordered eating, set targets with a doctor or registered dietitian.",
      ),

      takeaways([
        "BMR is the calories you burn at complete rest; TDEE is your whole day, usually 1.2–1.9 × BMR.",
        "TDEE is your maintenance — use it as the starting point for any calorie target.",
        "Lose fat at 10–20% below TDEE; eating at your BMR is usually too steep a deficit.",
        "Both are estimates: confirm with two weeks of steady eating and weekly-average weigh-ins.",
        "More daily movement raises TDEE far more than anything you can do to BMR.",
      ]),
      p(
        `Next, see <a href="${LINK.calories}">how many calories you should eat to lose weight</a>. ${DISCLAIMER}`,
      ),
    ].join("\n"),
  },

  {
    slug: "1500-calorie-indian-diet-plan",
    title: "1500 Calorie Indian Diet Plan (Veg & Non-Veg)",
    excerpt:
      "A full day of normal Indian meals at about 1,500 calories — veg and non-veg versions with gram weights from Indian food data, the protein in each meal, and how to scale it up or down for your own calorie target.",
    quickAnswer: `A 1500 calorie Indian diet plan can include a moong dal chilla breakfast, a lunch of 2 rotis with dal, sabzi and curd, a chana chaat snack, and rice with palak paneer for dinner — about 1,470 kcal and 70 g protein at the portions listed below. The non-veg version swaps in eggs and chicken for about 1,450 kcal and 83 g protein. 1,500 kcal suits many women and smaller adults trying to lose weight; most men need more, so check your own target first. ${DISCLAIMER}`,
    categorySlug: "weight-loss",
    subcategorySlug: "diet-meal-planning",
    primaryKeyword: "1500 calorie diet plan indian",
    metaTitle: "1500 Calorie Indian Diet Plan (Veg & Non-Veg)",
    metaDescription:
      "A 1500 calorie Indian diet plan with veg and non-veg menus, gram weights, protein per meal and simple swaps to scale it to 1,200 or 1,800 calories a day.",
    tags: ["1500 calorie diet", "Indian diet plan", "weight loss diet", "meal plan", "high protein"],
    topics: ["Indian Nutrition", "Calorie Deficit", "Meal Planning"],
    featuredImageAlt:
      "A day of Indian meals for 1500 calories: moong dal chilla, roti with dal and sabzi, chana chaat and palak paneer with rice",
    relatedSlugs: [
      "indian-diet-plan-for-weight-loss",
      "best-breakfast-for-weight-loss",
      "best-dinner-for-weight-loss",
      "how-many-calories-should-i-eat-to-lose-weight",
      "best-high-protein-indian-foods",
    ],
    dayOffset: 9,
    faq: [
      {
        question: "Is 1500 calories enough to lose weight?",
        answer:
          "For many women and lighter adults, yes — 1,500 kcal is usually a moderate deficit. For most men and taller or more active people it is a steep deficit. Work out your maintenance first and aim about 10–20% below it.",
      },
      {
        question: "How much weight will I lose on 1500 calories a day?",
        answer:
          "It depends on how far 1,500 is below your maintenance. A daily deficit of about 500 kcal leads to roughly 0.5 kg a week on average, though the first week often shows more because of water loss.",
      },
      {
        question: "Can I eat rice on a 1500 calorie diet?",
        answer:
          "Yes. One katori of cooked rice (about 50 g raw) is roughly 180 kcal. The plan below includes rice at dinner; what matters is the portion and the dal, sabzi and protein you eat with it.",
      },
      {
        question: "Is 1500 calories safe?",
        answer:
          "For most healthy adults it is a reasonable intake, but it is not right for everyone. Pregnant or breastfeeding women, teenagers, athletes and anyone with a medical condition or a history of disordered eating should get advice before eating this little.",
      },
    ],
    sources: [
      SRC_IFCT,
      SRC.icmr,
      {
        title:
          "Hall et al. (2011) — Quantification of the effect of energy imbalance on bodyweight (The Lancet)",
        url: "https://pubmed.ncbi.nlm.nih.gov/21872751/",
        note: "Why a fixed calorie intake slows in effect as weight falls",
      },
      {
        title:
          "Wycherley et al. (2012) — Effects of energy-restricted high-protein, low-fat compared with standard-protein diets: a meta-analysis (Am J Clin Nutr)",
        url: "https://pubmed.ncbi.nlm.nih.gov/23097268/",
        note: "Higher-protein calorie-controlled diets preserved more lean mass",
      },
    ],
    body: [
      p(
        "Most 1,500-calorie plans online are either Western (oats, chicken salad, protein bars) or vague (“1 bowl dal, 1 bowl sabzi”). This one uses ordinary Indian meals with gram weights, so you can actually cook it and know what you are eating.",
        "Calories and protein are calculated from the Indian Food Composition Tables (IFCT 2017), the same data behind our food pages. Cooking oil is counted — it is where most home-cooked calories hide.",
      ),

      h2("Is 1,500 calories right for you?"),
      p(
        "1,500 kcal is a moderate deficit for many women and smaller adults, and a steep one for most men. Before you follow any fixed-calorie plan, work out your own target: find your maintenance, then aim about 10–20% below it.",
      ),
      table(
        ["Who", "Typical maintenance", "Is 1,500 kcal a sensible target?"],
        [
          ["Woman, 35, 60 kg, 158 cm, lightly active", "≈ 1,720 kcal", "Yes — a gentle deficit of about 13%"],
          ["Woman, 35, 75 kg, 162 cm, sedentary", "≈ 1,710 kcal", "Yes — about 12% below"],
          ["Man, 30, 70 kg, 170 cm, lightly active", "≈ 2,220 kcal", "Too steep — try 1,800–1,900 instead"],
          ["Man, 35, 90 kg, 175 cm, sedentary", "≈ 2,190 kcal", "Too steep — try 1,750–1,950 instead"],
        ],
      ),
      toolCta("/calorie-calculator", "calorie calculator", "Get your own daily target with the"),

      h2("1500 calorie Indian diet plan: vegetarian day"),
      p("Portions are as weighed before cooking (dry dal, raw rice, atta). One teaspoon of oil or ghee is about 5 g."),
      table(
        ["Meal", "What to eat", "Calories", "Protein"],
        [
          ["Breakfast", "2 moong dal chillas from 50 g dry moong dal, stuffed with 50 g grated paneer, cooked in 1 tsp oil", "≈ 337 kcal", "21 g"],
          ["Mid-morning", "1 guava (≈100 g) + 1 cup tea with 50 ml milk, no sugar", "≈ 69 kcal", "3 g"],
          ["Lunch", "2 medium rotis (60 g atta) + 1 katori toor dal (30 g dry) + 1 katori mixed-veg sabzi with 1 tsp oil + 150 g curd", "≈ 486 kcal", "19.5 g"],
          ["Evening", "Kala chana chaat (40 g dry chana, boiled, with onion, tomato, lemon) + 1 cup tea with milk, no sugar", "≈ 161 kcal", "9 g"],
          ["Dinner", "1 katori cooked rice (50 g raw) + palak paneer (150 g spinach, 60 g paneer, 1 tsp oil)", "≈ 414 kcal", "18.5 g"],
          ["<strong>Total</strong>", "", "<strong>≈ 1,470 kcal</strong>", "<strong>≈ 71 g</strong>"],
        ],
      ),
      p(
        "That leaves about 30 kcal of headroom for spices, a little salad or a teaspoon of sugar in one tea. Curd and the mixed-veg sabzi are approximate (curd ≈ 60 kcal and 3 g protein per 100 g); everything else uses IFCT values from our <a href=\"/foods/indian\">Indian food database</a>.",
      ),

      h2("Non-vegetarian version"),
      p("Keep the mid-morning, lunch and evening meals the same, and swap breakfast and dinner:"),
      table(
        ["Meal", "What to eat", "Calories", "Protein"],
        [
          ["Breakfast", "2-egg omelette with onion and tomato + 1 medium roti (30 g atta)", "≈ 283 kcal", "21 g"],
          ["Dinner", "120 g raw chicken breast cooked as a curry with 1 tsp oil + 1 katori cooked rice (50 g raw) + salad", "≈ 445 kcal", "30 g"],
          ["<strong>Day total</strong>", "With the vegetarian lunch and snacks above", "<strong>≈ 1,445 kcal</strong>", "<strong>≈ 83 g</strong>"],
        ],
      ),
      p(
        `Higher protein helps in a deficit: it keeps you fuller and helps you keep muscle while you lose fat. Read <a href="${LINK.proteinForWeightLoss}">how much protein you need for weight loss</a> for the full picture.`,
      ),

      h2("Why this plan works"),
      ul([
        "<strong>Protein at every meal.</strong> Dal, paneer, chana, curd, eggs or chicken in each sitting — about 70–85 g across the day.",
        "<strong>Normal staples, measured.</strong> Rice and roti stay; the portion is fixed. See <a href=\"" +
          LINK.riceVsRoti +
          "\">rice vs roti for weight loss</a> if you are deciding between them.",
        "<strong>Oil is counted.</strong> Three teaspoons a day is about 135 kcal. Free-pouring from the bottle can easily double that.",
        "<strong>Plenty of volume.</strong> Sabzi, spinach, salad and fruit fill the plate for very few calories.",
      ]),

      h2("Swaps that keep the calories the same"),
      table(
        ["Instead of", "Try (similar calories)"],
        [
          ["2 rotis (60 g atta)", "1 katori cooked rice (50 g raw) + a few extra spoons of dal"],
          ["Moong dal chilla with paneer", "Paneer bhurji (75 g paneer) + 1 roti"],
          ["Palak paneer dinner", "Moong dal khichdi (30 g rice + 30 g dal) with 1 tsp ghee + 150 g curd"],
          ["Kala chana chaat", "1 apple + 10 almonds"],
          ["Toor dal", "Masoor or moong dal (same 30 g dry)"],
        ],
      ),
      p(
        `For more ideas, see <a href="${LINK.breakfast}">the best Indian breakfasts for weight loss</a> and <a href="${LINK.dinner}">the best dinners for weight loss</a>. Want a full week instead of one day? Use our <a href="${LINK.weekPlan}">7-day Indian diet plan for weight loss</a>.`,
      ),

      h2("Scaling the plan to your target"),
      table(
        ["Your target", "Change from the 1,500 kcal day"],
        [
          ["About 1,200 kcal", "Have 1 roti at lunch and half a katori of rice at dinner, and replace the chana chaat with a katori of papaya and plain tea. Only follow this with professional guidance — it is a very low intake for most adults."],
          ["About 1,800 kcal", "Add 1 roti at lunch, 1 roti at dinner and 100 g curd (≈ +250 kcal), plus 20 g roasted peanuts (≈ +100 kcal)."],
          ["About 2,000 kcal", "The 1,800 changes plus 200 ml milk and an extra 30 g dal at lunch (≈ +245 kcal)."],
        ],
      ),

      h2("Tips for sticking to it"),
      ol([
        "<strong>Weigh for one week.</strong> Measure dal, rice, atta and oil for a week; after that, your eye gets surprisingly accurate.",
        "<strong>Cook once, eat twice.</strong> Make dal and chana in bulk; keep boiled chana and grated paneer ready.",
        "<strong>Watch drinks.</strong> Two cups of sweet chai with full sugar add about 100 kcal; a mango lassi can add 250.",
        "<strong>Plan weekends.</strong> A heavy Sunday lunch is fine if the rest of the day is lighter — the weekly average is what counts.",
        "<strong>Check progress weekly,</strong> not daily. If your weekly average weight has not dropped after 3 weeks, revisit your portions.",
      ]),

      h2("Who should be careful"),
      p(
        "A fixed 1,500-calorie plan is not suitable during pregnancy or breastfeeding, for teenagers, or for very active people and athletes. If you have diabetes, kidney disease, thyroid disease or take regular medication, or you have a history of disordered eating, plan your diet with a doctor or registered dietitian.",
      ),

      takeaways([
        "This vegetarian day comes to about 1,470 kcal and 71 g protein; the non-veg version about 1,445 kcal and 83 g.",
        "1,500 kcal suits many women and smaller adults; most men lose weight well on 1,800–1,950.",
        "Measure oil, rice, roti and dal — portions decide the result, not special foods.",
        "Include protein at every meal to stay full and keep muscle.",
        "Judge progress on weekly averages and adjust after 3 weeks if nothing moves.",
      ]),
      p(
        `Not sure how much to eat? Start with <a href="${LINK.calories}">how many calories you should eat to lose weight</a>, and see <a href="${LINK.highProteinIndian}">the best high-protein Indian foods</a> for more ways to hit your protein. ${DISCLAIMER}`,
      ),
    ].join("\n"),
  },

  {
    slug: "indian-diet-plan-for-weight-loss",
    title: "Indian Diet Plan for Weight Loss (7-Day Veg)",
    excerpt:
      "A simple 7-day vegetarian Indian diet plan for weight loss: real home meals, about 1,350–1,500 calories a day, protein at every meal, a portion guide for bigger appetites and a weekly shopping list.",
    quickAnswer: `A good Indian diet plan for weight loss keeps your usual foods — roti, rice, dal, sabzi, curd, paneer — but controls portions so you eat about 10–20% below your maintenance calories, with protein at every meal. The 7-day vegetarian plan below averages roughly 1,350–1,500 kcal and 50–70 g protein a day. Larger or more active people should add portions using the scaling table rather than follow it exactly. ${DISCLAIMER}`,
    categorySlug: "weight-loss",
    subcategorySlug: "diet-meal-planning",
    primaryKeyword: "weight loss diet plan india",
    metaTitle: "Indian Diet Plan for Weight Loss (7-Day Veg)",
    metaDescription:
      "A 7-day vegetarian Indian diet plan for weight loss with home-style meals, calories and protein for each day, portion guides and a simple weekly grocery list.",
    tags: ["Indian diet plan", "weight loss diet plan", "vegetarian diet", "meal plan", "calorie deficit"],
    topics: ["Indian Nutrition", "Calorie Deficit", "Meal Planning", "Vegetarian"],
    featuredImageAlt:
      "A week of vegetarian Indian meals laid out by day: chilla, poha, dal, rajma chawal, khichdi and paneer",
    relatedSlugs: [
      "1500-calorie-indian-diet-plan",
      "best-indian-foods-for-weight-loss",
      "rice-vs-roti-for-weight-loss",
      "how-to-calculate-your-calorie-deficit",
      "best-breakfast-for-weight-loss",
    ],
    dayOffset: 9,
    faq: [
      {
        question: "Which Indian diet is best for weight loss?",
        answer:
          "The one you can follow for months. Any Indian diet works if it keeps you in a modest calorie deficit and includes enough protein. Home-cooked dal, roti or rice, sabzi, curd and paneer in measured portions are a better base than special diet products.",
      },
      {
        question: "Can I lose weight eating rice and roti?",
        answer:
          "Yes. Weight loss depends on total calories, not on cutting out a food. Keep rice to about one katori and roti to two at a meal, and fill the rest of the plate with dal, sabzi and protein.",
      },
      {
        question: "How quickly will I lose weight on this plan?",
        answer:
          "Most people lose around 0.5 kg a week on a deficit of about 500 kcal a day, after a quicker drop in the first week from water. A steady 2–3 kg a month is a realistic, sustainable pace.",
      },
      {
        question: "Can I follow this plan if I eat eggs or chicken?",
        answer:
          "Yes. Swap any paneer or chilla breakfast for a 2-egg omelette with a roti, or any dinner for 120 g of chicken curry with a katori of rice. Calories stay similar and protein goes up.",
      },
    ],
    sources: [
      SRC_IFCT,
      SRC.icmr,
      {
        title:
          "Wycherley et al. (2012) — Effects of energy-restricted high-protein, low-fat compared with standard-protein diets: a meta-analysis (Am J Clin Nutr)",
        url: "https://pubmed.ncbi.nlm.nih.gov/23097268/",
        note: "More protein during calorie restriction helped preserve lean mass",
      },
      {
        title:
          "Johnston et al. (2014) — Comparison of weight loss among named diet programs in overweight and obese adults: a meta-analysis (JAMA)",
        url: "https://pubmed.ncbi.nlm.nih.gov/25182101/",
        note: "Weight loss differences between named diets were small — adherence mattered most",
      },
    ],
    body: [
      p(
        "You do not need quinoa bowls or imported superfoods to lose weight on an Indian diet. What you need is a modest calorie deficit, enough protein, and meals you will still want to eat in week six. This plan is built from ordinary vegetarian home food, with portions measured so the numbers add up.",
      ),

      h2("The rules behind the plan"),
      ol([
        "<strong>Eat about 10–20% below your maintenance.</strong> That is roughly 300–500 kcal a day for most adults — enough to lose fat without feeling starved.",
        "<strong>Protein at every meal.</strong> Dal, paneer, curd, chana, rajma, soya or sprouts at breakfast, lunch and dinner.",
        "<strong>Use the plate method:</strong> half the plate sabzi or salad, a quarter dal or paneer, a quarter roti or rice.",
        "<strong>Measure oil.</strong> About 3 teaspoons a day across all cooking.",
        "<strong>Drink your calories rarely.</strong> Tea and coffee with little or no sugar; save juices, lassi and soft drinks for occasions.",
      ]),
      p(
        `If you are not sure what your deficit should be, read <a href="${LINK.deficit}">how to calculate your calorie deficit</a> first.`,
      ),
      toolCta("/calorie-deficit-calculator", "calorie deficit calculator", "Find your daily target and timeline with the"),

      h2("Meal options (each measured)"),
      p(
        "Every day of the plan combines one option from each slot. Calories come from IFCT 2017 food data with cooking oil included; curd (≈ 60 kcal and 3 g protein per 100 g) and sabzi are approximate.",
      ),
      h3("Breakfast (about 340–360 kcal)"),
      table(
        ["Option", "Portion", "Calories", "Protein"],
        [
          ["A. Moong dal chilla with paneer", "50 g dry moong dal, 50 g paneer, 1 tsp oil", "≈ 337 kcal", "21 g"],
          ["B. Poha with sprouts and curd", "40 g dry poha, 30 g sprouted moong, 1 tsp oil, 100 g curd", "≈ 360 kcal", "14 g"],
          ["C. Vegetable dalia with milk", "40 g dalia cooked in 200 ml milk + 10 almonds", "≈ 356 kcal", "13 g"],
          ["D. Paneer bhurji with roti", "75 g paneer, 1 tsp oil, onion, tomato + 1 roti (30 g atta)", "≈ 355 kcal", "18 g"],
        ],
      ),
      h3("Lunch (about 460–490 kcal)"),
      table(
        ["Option", "Portion", "Calories", "Protein"],
        [
          ["A. Roti, dal, sabzi, curd", "2 rotis (60 g atta), 30 g dry toor dal, mixed-veg sabzi with 1 tsp oil, 150 g curd", "≈ 486 kcal", "19.5 g"],
          ["B. Rajma chawal", "50 g raw rice, 40 g dry rajma, 1 tsp oil, 1 small phulka, salad, 100 g curd", "≈ 487 kcal", "18 g"],
          ["C. Kala chana curry with roti", "40 g dry kala chana, 1 tsp oil, 2 rotis, cucumber raita (150 g curd)", "≈ 462 kcal", "19 g"],
          ["D. Jowar bhakri thali", "1 jowar bhakri (40 g flour) + 1 roti, 30 g dry masoor dal, bhindi with 1 tsp oil, 100 g curd", "≈ 492 kcal", "19.5 g"],
        ],
      ),
      h3("Evening snack (about 35–165 kcal)"),
      table(
        ["Option", "Portion", "Calories", "Protein"],
        [
          ["A. Chana chaat + tea", "40 g dry kala chana, boiled; tea with 50 ml milk, no sugar", "≈ 161 kcal", "9 g"],
          ["B. Apple and almonds", "1 medium apple + 10 almonds", "≈ 166 kcal", "2.5 g"],
          ["C. Buttermilk and peanuts", "200 ml chaas + 20 g roasted peanuts", "≈ 140 kcal", "6.5 g"],
          ["D. Fruit only", "1 katori papaya (150 g)", "≈ 36 kcal", "0.5 g"],
        ],
      ),
      h3("Dinner (about 360–415 kcal)"),
      table(
        ["Option", "Portion", "Calories", "Protein"],
        [
          ["A. Rice with palak paneer", "50 g raw rice, 150 g spinach, 60 g paneer, 1 tsp oil", "≈ 414 kcal", "18.5 g"],
          ["B. Moong dal khichdi", "30 g rice + 30 g moong dal, 1 tsp ghee, 150 g curd, salad", "≈ 359 kcal", "15 g"],
          ["C. Soya curry with roti", "30 g dry soybean, 1 tsp oil, 2 rotis, salad", "≈ 370 kcal", "18 g"],
          ["D. Paneer tikka plate", "100 g paneer, ½ tsp oil, 1 roti, large salad", "≈ 406 kcal", "23 g"],
        ],
      ),
      p("Every day also includes a mid-morning fruit with tea (1 guava + tea with 50 ml milk, ≈ 69 kcal and 3 g protein)."),

      h2("The 7-day vegetarian plan"),
      table(
        ["Day", "Breakfast", "Lunch", "Evening", "Dinner", "≈ Day total"],
        [
          ["Monday", "A. Moong chilla + paneer", "A. Roti, dal, sabzi, curd", "A. Chana chaat", "A. Rice + palak paneer", "1,470 kcal · 71 g protein"],
          ["Tuesday", "B. Poha with sprouts", "B. Rajma chawal", "B. Apple + almonds", "B. Moong khichdi", "1,440 kcal · 52 g"],
          ["Wednesday", "D. Paneer bhurji + roti", "C. Kala chana + roti", "C. Chaas + peanuts", "C. Soya curry + roti", "1,400 kcal · 65 g"],
          ["Thursday", "C. Dalia with milk", "D. Jowar bhakri thali", "A. Chana chaat", "D. Paneer tikka plate", "1,485 kcal · 68 g"],
          ["Friday", "A. Moong chilla + paneer", "B. Rajma chawal", "C. Chaas + peanuts", "B. Moong khichdi", "1,390 kcal · 63 g"],
          ["Saturday", "D. Paneer bhurji + roti", "A. Roti, dal, sabzi, curd", "B. Apple + almonds", "C. Soya curry + roti", "1,445 kcal · 61 g"],
          ["Sunday", "B. Poha with sprouts", "C. Kala chana + roti", "D. Papaya", "D. Paneer tikka plate", "1,335 kcal · 60 g"],
        ],
      ),
      p(
        `Sunday is deliberately lighter so a family meal or a sweet still fits in the week. For gram-by-gram detail of one full day, including a non-veg version, see our <a href="${LINK.plan1500}">1500 calorie Indian diet plan</a>.`,
      ),

      h2("Scale it to your appetite"),
      p(
        "The plan sits at about 1,350–1,500 kcal, which suits many women and smaller adults. Most men, and anyone taller or more active, should start higher:",
      ),
      table(
        ["Add to every day", "Extra calories", "New daily range"],
        [
          ["1 extra roti at lunch + 100 g curd at dinner", "≈ +155 kcal", "≈ 1,490–1,640 kcal"],
          ["The above + 1 extra roti at dinner + 200 ml milk", "≈ +400 kcal", "≈ 1,735–1,885 kcal"],
          ["The above + a handful (30 g) of roasted peanuts", "≈ +555 kcal", "≈ 1,890–2,040 kcal"],
        ],
      ),

      h2("Weekly grocery list (one person)"),
      ul([
        "<strong>Dals and legumes:</strong> moong dal 250 g, toor dal 100 g, masoor dal 50 g, rajma 100 g, kala chana 200 g, soybean 100 g, whole moong for sprouts 100 g",
        "<strong>Grains:</strong> atta 1 kg, rice 300 g, poha 100 g, dalia 100 g, jowar flour 100 g",
        "<strong>Dairy:</strong> paneer 500 g, curd 1.5 kg, milk 1 litre",
        "<strong>Vegetables:</strong> spinach 500 g, onions, tomatoes, cucumbers, bhindi, mixed seasonal sabzi, lemons, ginger, green chillies",
        "<strong>Fruit:</strong> guavas, apples, papaya — whatever is in season",
        "<strong>Other:</strong> almonds and peanuts (small packs), cooking oil, ghee, spices",
      ]),

      h2("Make it easier to follow"),
      ul([
        "<strong>Prep on Sunday:</strong> soak and boil chana and rajma, sprout moong, knead dough for two days.",
        `<strong>Keep paneer and curd stocked</strong> — they rescue any meal that is short on protein. More options in our guide to <a href="${LINK.vegProtein}">vegetarian protein sources in India</a>.`,
        `<strong>Pick foods that fill you up.</strong> Our list of <a href="${LINK.indianFoods}">the best Indian foods for weight loss</a> ranks staples by how filling they are per calorie.`,
        "<strong>Eat out smartly:</strong> choose tandoori over butter or malai gravies, one naan instead of two, and dal or chana over fried snacks.",
        "<strong>Weigh in weekly.</strong> If your average has not moved after 3 weeks, trim 1 roti a day or skip the evening snack.",
      ]),

      h2("Who should be careful"),
      p(
        "This is a general plan for healthy adults. Do not follow it during pregnancy or breastfeeding, if you are under 18, or if you train hard most days. If you have diabetes, kidney disease, thyroid disease or other medical conditions, take medication, or have a history of disordered eating, get a plan from a doctor or registered dietitian.",
      ),

      takeaways([
        "Keep your usual Indian foods; control portions to stay 10–20% below maintenance.",
        "Put protein in every meal — dal, paneer, curd, chana, rajma, soya.",
        "This 7-day plan averages about 1,350–1,500 kcal and 50–70 g protein a day.",
        "Bigger or more active people should add rotis, curd and milk using the scaling table.",
        "Expect about 0.5 kg a week; review portions if nothing changes in 3 weeks.",
      ]),
      p(
        `Deciding between staples? Read <a href="${LINK.riceVsRoti}">rice vs roti for weight loss</a>, and check calories for <a href="/foods/roti">roti</a>, <a href="/foods/rice">rice</a> and <a href="/foods/paneer">paneer</a> in our food database. ${DISCLAIMER}`,
      ),
    ].join("\n"),
  },
];
