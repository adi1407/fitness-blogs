import {
  DISCLAIMER,
  h2,
  ol,
  p,
  SRC,
  table,
  takeaways,
  toolCta,
  ul,
  type IntentArticleDef,
} from "./helpers";

export const batch2: IntentArticleDef[] = [
  {
    slug: "100g-paneer-calories-and-protein",
    title: "100g Paneer Calories and Protein",
    excerpt:
      "Typical calories, protein, and fat in 100 g paneer — and how to fit it into fat loss or muscle meals.",
    quickAnswer: `100 g paneer often lands around 265–320 kcal with roughly 18–21 g protein, depending on milk fat percentage and brand. It is protein-dense but calorie-dense — portion with intent. ${DISCLAIMER}`,
    categorySlug: "nutrition",
    subcategorySlug: "protein",
    primaryKeyword: "100g paneer calories protein",
    metaTitle: "100g Paneer Calories and Protein | fitlives",
    metaDescription:
      "Macros for 100 g paneer, low-fat vs full-fat tips, and Indian meal ideas.",
    tags: ["paneer", "protein", "indian nutrition"],
    topics: ["Protein", "Indian Nutrition", "Calories"],
    featuredImageAlt: "100 grams paneer on a kitchen scale",
    relatedSlugs: [
      "is-paneer-good-for-weight-loss",
      "100g-chicken-breast-calories-and-protein",
      "best-high-protein-indian-foods",
    ],
    dayOffset: 2,
    faq: [
      {
        question: "Is low-fat paneer better?",
        answer:
          "Lower fat means fewer calories per gram and slightly different texture. Choose based on your calorie budget and taste adherence.",
      },
      {
        question: "Homemade vs packed?",
        answer:
          "Homemade varies with milk creaminess. Packed brands with labels are easier to log accurately.",
      },
    ],
    sources: [SRC.usdaFdc, SRC.icmr],
    body: [
      p(
        "Paneer shows up in almost every Indian “high protein” conversation — and for good reason. It is convenient, cooks quickly, and actually gets eaten. The mistake is treating 300 g bhurji like a free food because it is “protein.”",
      ),
      h2("Typical macros per 100 g"),
      table(
        ["Type (approx.)", "Calories", "Protein", "Fat"],
        [
          ["Full-fat paneer", "~265–320 kcal", "~18–21 g", "~20–25 g"],
          ["Lower-fat paneer", "Often lower kcal", "Similar protein band", "Less fat"],
        ],
      ),
      p(
        "Always check your brand when possible. Malai-heavy homemade paneer can sit on the higher end.",
      ),
      h2("How coaches use paneer"),
      ul([
        "100–150 g in a meal for most fat-loss clients",
        "Grilled or bhurji with lots of vegetables for volume",
        "Paired with roti count that matches the calorie target",
      ]),
      h2("Paneer vs chicken for protein-per-calorie"),
      p(
        "Chicken breast usually gives more protein per calorie. Paneer wins on vegetarian convenience and satiety from fat. You can use both across the week.",
      ),
      takeaways([
        "Weigh paneer — “a bowl” is not a unit.",
        "Expect ~18–21 g protein per 100 g for many full-fat versions.",
        "Great vegetarian staple; watch total calories.",
      ]),
      p(
        `Related: <a href="/blog/weight-loss/weight-loss-nutrition/is-paneer-good-for-weight-loss">is paneer good for weight loss</a>. ${DISCLAIMER}`,
      ),
    ].join("\n"),
  },
  {
    slug: "2-eggs-calories-and-protein",
    title: "2 Eggs Calories and Protein",
    excerpt:
      "Calories and protein in two large eggs, yolk vs white tradeoffs, and easy Indian breakfast ideas.",
    quickAnswer: `Two large eggs typically provide about 140–160 kcal and 12–13 g protein. Whole eggs are nutrient-dense; whites add protein with fewer calories if you need volume. ${DISCLAIMER}`,
    categorySlug: "nutrition",
    subcategorySlug: "protein",
    primaryKeyword: "2 eggs calories protein",
    metaTitle: "2 Eggs Calories and Protein | fitlives",
    metaDescription:
      "Macros for 2 eggs, cooking tips, and how to build a higher-protein breakfast.",
    tags: ["eggs", "protein", "breakfast"],
    topics: ["Protein", "Meal Planning", "Calories"],
    featuredImageAlt: "Two eggs showing calories and protein portion",
    relatedSlugs: [
      "best-breakfast-for-weight-loss",
      "how-much-protein-do-you-need-per-day",
      "100g-chicken-breast-calories-and-protein",
    ],
    dayOffset: 3,
    faq: [
      {
        question: "Are egg yolks unhealthy?",
        answer:
          "For most healthy people, whole eggs can fit a balanced diet. If you have specific lipid concerns, follow your clinician’s advice.",
      },
      {
        question: "Boiled vs bhurji?",
        answer:
          "Protein is similar; oil in bhurji adds calories. Measure oil if you track closely.",
      },
    ],
    sources: [SRC.usdaFdc, SRC.icmr],
    body: [
      p(
        "Two eggs is the default Indian fitness breakfast for a reason: cheap, fast, and reliable. Knowing the calories and protein helps you decide whether to stop at two or add whites, paneer, or dal on training days.",
      ),
      h2("Typical macros — 2 large eggs"),
      table(
        ["Item", "Calories", "Protein"],
        [
          ["2 whole large eggs", "~140–160 kcal", "~12–13 g"],
          ["2 whole + 2 whites (approx.)", "Higher protein, modest kcal rise", "~20+ g"],
        ],
      ),
      h2("Build a real breakfast around them"),
      ul([
        "2 eggs + vegetables + 1 roti",
        "Egg bhurji + salad + curd",
        "Omelette with spinach/tomato + fruit on the side",
      ]),
      p(
        "If your daily protein target is 140 g, two eggs alone will not finish the job — they are a strong start, not the whole plan.",
      ),
      takeaways([
        "Two large eggs ≈ 12–13 g protein.",
        "Add whites or other proteins when targets are high.",
        "Watch cooking oil in bhurji.",
      ]),
      p(
        `Pair with <a href="/blog/weight-loss/diet-meal-planning/best-breakfast-for-weight-loss">best breakfast for weight loss</a>. ${DISCLAIMER}`,
      ),
    ].join("\n"),
  },
  {
    slug: "rice-vs-roti-for-weight-loss",
    title: "Rice vs Roti for Weight Loss",
    excerpt:
      "An honest comparison of rice and roti for fat loss — portions, protein pairing, and adherence beat tribal food wars.",
    quickAnswer: `Neither rice nor roti is “fattening” by default. Weight loss depends on total calories and protein. Choose the carb you can portion and enjoy, and build the plate around vegetables and protein. ${DISCLAIMER}`,
    categorySlug: "weight-loss",
    subcategorySlug: "weight-loss-nutrition",
    primaryKeyword: "rice vs roti weight loss",
    metaTitle: "Rice vs Roti for Weight Loss — Which Is Better? | fitlives",
    metaDescription:
      "Rice vs roti for fat loss: calories, portions, and how to choose without food guilt.",
    tags: ["rice", "roti", "weight loss", "carbs"],
    topics: ["Calorie Deficit", "Indian Nutrition", "Meal Planning"],
    featuredImageAlt: "Rice versus roti comparison for weight loss",
    relatedSlugs: [
      "is-rice-good-for-weight-loss",
      "best-indian-foods-for-weight-loss",
      "how-many-calories-should-i-eat-to-lose-weight",
    ],
    dayOffset: 3,
    faq: [
      {
        question: "Is roti always better because it has fiber?",
        answer:
          "Whole-wheat roti often has more fiber than polished white rice, which can help satiety. Brown rice closes that gap. Portions still rule.",
      },
      {
        question: "Can I eat both?",
        answer:
          "Yes. Many clients do roti at lunch and a measured rice bowl at dinner — or the reverse — based on preference.",
      },
    ],
    sources: [SRC.icmr, SRC.whoObesity],
    body: [
      p(
        "Rice vs roti debates fill comment sections. In the gym and kitchen, I care about a simpler test: which one helps you hit your calorie and protein targets without feeling punished?",
      ),
      h2("Rough calorie reality"),
      table(
        ["Food", "Typical serving", "Approx. calories"],
        [
          ["Cooked white rice", "100 g", "~130 kcal"],
          ["Medium roti (whole wheat)", "1 piece (~40–50 g flour)", "~100–140 kcal"],
        ],
      ),
      p(
        "People underestimate rice when serving with a big ladle and underestimate roti when “just one more” happens three times. Measure for two weeks, then you will see your pattern.",
      ),
      h2("When roti may feel better"),
      ul([
        "Higher fiber if using whole wheat",
        "Easier to count pieces than fluffy rice volume",
        "Pairs well with sabzi and dal",
      ]),
      h2("When rice may feel better"),
      ul([
        "Easier digestion for some people",
        "Better with south-Indian or rice-based cultural meals",
        "Simple to scale with a measuring cup",
      ]),
      h2("The winning plate"),
      ol([
        "Protein first (dal, paneer, eggs, chicken, fish, curd).",
        "Vegetables for volume.",
        "Rice or roti in a planned portion.",
        "Oil measured, not poured from the heart.",
      ]),
      takeaways([
        "No universal winner — calories and adherence win.",
        "Portion both foods honestly.",
        "Prioritize protein either way.",
      ]),
      p(
        `Also read <a href="/blog/weight-loss/weight-loss-myths/is-rice-good-for-weight-loss">is rice good for weight loss</a>. ${DISCLAIMER}`,
      ),
    ].join("\n"),
  },
  {
    slug: "best-indian-foods-for-weight-loss",
    title: "Best Indian Foods for Weight Loss",
    excerpt:
      "Satiety-friendly Indian foods that fit a calorie deficit — dals, vegetables, lean proteins, spices, and smart carb portions.",
    quickAnswer: `Best Indian foods for weight loss are high-volume, high-protein, and easy to cook often: dals, vegetables, eggs, low-to-moderate fat dairy, lean meats/fish, sprouts, and measured roti or rice. Spices help adherence; deep frying does not. ${DISCLAIMER}`,
    categorySlug: "weight-loss",
    subcategorySlug: "weight-loss-nutrition",
    primaryKeyword: "best indian foods for weight loss",
    metaTitle: "Best Indian Foods for Weight Loss | fitlives",
    metaDescription:
      "Practical Indian foods for fat loss — protein, fiber, and portions that fit real kitchens.",
    tags: ["indian food", "weight loss", "diet"],
    topics: ["Indian Nutrition", "Meal Planning", "Calorie Deficit"],
    featuredImageAlt: "Indian foods useful for weight loss",
    relatedSlugs: [
      "best-high-protein-indian-foods",
      "best-breakfast-for-weight-loss",
      "best-dinner-for-weight-loss",
    ],
    dayOffset: 4,
    faq: [
      {
        question: "Do I need to quit rice completely?",
        answer:
          "No. Measure it. Extreme bans often backfire at family dinners.",
      },
      {
        question: "Is ghee forbidden?",
        answer:
          "Not forbidden — it is calorie-dense. Use small, intentional amounts.",
      },
    ],
    sources: [SRC.icmr, SRC.whoObesity],
    body: [
      p(
        "The best Indian foods for weight loss are not imported powders. They are the foods you will cook on a Tuesday when you are tired. Think fiber, protein, and spices — not sadness.",
      ),
      h2("Protein anchors"),
      ul([
        "Eggs and egg whites",
        "Paneer (portioned), hung curd, milk",
        "Dal, sambar, chana, rajma (watch oil)",
        "Chicken, fish, soy chunks",
      ]),
      h2("Volume vegetables"),
      p(
        "Palak, lauki, bhindi, cabbage, cucumber, tomato, mixed salad — load the plate so the meal feels big while calories stay controlled.",
      ),
      h2("Smart carbs"),
      ul([
        "Roti with known flour weight",
        "Rice measured cooked",
        "Millets if you enjoy them — still count calories",
      ]),
      h2("Flavor without wrecking the deficit"),
      p(
        "Jeera, ajwain, chili, garam masala, lemon, coriander, mint chutney (watch oil/peanuts). Flavor is adherence technology.",
      ),
      toolCta(
        "/tools/calorie-calculator",
        "calorie calculator",
        "Match food choices to a target with the",
      ),
      takeaways([
        "Build meals around protein + vegetables.",
        "Measure calorie-dense items (oil, nuts, paneer, rice).",
        "Keep cultural foods — adjust portions.",
      ]),
      p(
        `Explore <a href="/foods/indian">Indian foods hub</a> and <a href="/blog/nutrition/protein/best-high-protein-indian-foods">high-protein Indian foods</a>. ${DISCLAIMER}`,
      ),
    ].join("\n"),
  },
  {
    slug: "best-high-protein-indian-foods",
    title: "Best High Protein Indian Foods",
    excerpt:
      "A practical list of high-protein Indian foods with approximate protein per common serving.",
    quickAnswer: `Top high-protein Indian options include eggs, paneer, chicken, fish, dals, curd/hung curd, soy chunks, sprouts, and milk. Combine several across the day to hit your gram target. ${DISCLAIMER}`,
    categorySlug: "nutrition",
    subcategorySlug: "protein",
    primaryKeyword: "high protein indian foods",
    metaTitle: "Best High Protein Indian Foods | fitlives",
    metaDescription:
      "High-protein Indian foods list with practical servings for lifters and fat-loss diets.",
    tags: ["protein", "indian nutrition"],
    topics: ["Protein", "Indian Nutrition"],
    featuredImageAlt: "High-protein Indian foods spread",
    relatedSlugs: [
      "how-much-protein-do-you-need-per-day",
      "100g-paneer-calories-and-protein",
      "best-indian-foods-for-weight-loss",
    ],
    dayOffset: 4,
    faq: [
      {
        question: "Is dal enough alone?",
        answer:
          "Dal helps, but many people need additional dairy, eggs, soy, or meat/fish to reach higher athletic targets comfortably.",
      },
    ],
    sources: [SRC.icmr, SRC.usdaFdc, SRC.issnProtein],
    body: [
      p(
        "You do not need a foreign grocery haul to eat high protein in India. You need a short list you actually buy every week.",
      ),
      h2("High-protein staples (approx. protein)"),
      table(
        ["Food", "Common portion", "Protein (approx.)"],
        [
          ["Eggs", "2 large", "12–13 g"],
          ["Paneer", "100 g", "18–21 g"],
          ["Chicken breast", "100 g cooked", "~25–31 g"],
          ["Cooked dal", "1 cup", "~10–15 g (varies)"],
          ["Curd", "200 g", "~6–8 g (varies)"],
          ["Soy chunks (dry)", "30–50 g", "Often 15–25+ g"],
          ["Sprouts", "1–1.5 cups", "~10–15 g"],
        ],
      ),
      h2("How to stack a 120–150 g day"),
      ol([
        "Breakfast: eggs or chilla + dairy",
        "Lunch: dal + curd + optional chicken/paneer",
        "Snack: sprouts or whey/hung curd",
        "Dinner: paneer/fish/chicken + vegetables",
      ]),
      toolCta(
        "/tools/protein-calculator",
        "protein calculator",
        "Set the daily target with our",
      ),
      takeaways([
        "Mix animal and plant proteins as your diet allows.",
        "Watch oil when cooking “high protein” curries.",
        "Consistency beats exotic foods.",
      ]),
      p(`${DISCLAIMER}`),
    ].join("\n"),
  },
];
