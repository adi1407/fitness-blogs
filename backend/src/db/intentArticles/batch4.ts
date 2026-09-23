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

export const batch4: IntentArticleDef[] = [
  {
    slug: "best-breakfast-for-weight-loss",
    title: "Best Breakfast for Weight Loss",
    excerpt:
      "High-protein, satisfying Indian-friendly breakfasts that reduce mid-morning chaos without tiny “diet” portions.",
    quickAnswer: `The best breakfast for weight loss is high in protein, includes fiber, and fits your calorie budget — think eggs, chilla, hung curd bowls, or dal-based options — not sugar cereal or tea-only mornings. ${DISCLAIMER}`,
    categorySlug: "weight-loss",
    subcategorySlug: "diet-meal-planning",
    primaryKeyword: "best breakfast for weight loss",
    metaTitle: "Best Breakfast for Weight Loss | fitlives",
    metaDescription:
      "Protein-forward Indian breakfast ideas for fat loss and steadier energy.",
    tags: ["breakfast", "weight loss", "meal planning"],
    topics: ["Meal Planning", "Protein", "Calorie Deficit"],
    featuredImageAlt: "High-protein breakfast for weight loss",
    relatedSlugs: [
      "best-dinner-for-weight-loss",
      "2-eggs-calories-and-protein",
      "best-indian-foods-for-weight-loss",
    ],
    dayOffset: 7,
    faq: [
      {
        question: "Is skipping breakfast better?",
        answer:
          "Only if total daily intake and adherence improve. Many people overeat later after tea-only mornings. Experiment honestly.",
      },
    ],
    sources: [SRC.icmr, SRC.issnProtein],
    body: [
      p(
        "Breakfast does not magically burn fat. A good breakfast does something more useful: it stops you from arriving at lunch ravenous and negotiating with every fried snack in a 200-meter radius.",
      ),
      h2("What “best” means here"),
      ul([
        "20–35+ g protein when possible",
        "Some fiber/volume (vegetables, sprouts, fruit in moderation)",
        "Calories that fit the rest of the day",
        "Food you can cook in 15 minutes on weekdays",
      ]),
      h2("Strong Indian-friendly options"),
      table(
        ["Breakfast", "Why it works"],
        [
          ["Egg bhurji + veggies + 1 roti", "Protein + volume"],
          ["Moong chilla + paneer/curd", "Plant + dairy protein"],
          ["Hung curd bowl + fruit + seeds (measured)", "Fast, high protein"],
          ["Besan chilla + salad", "Filling when oil is controlled"],
          ["Leftover chicken/paneer + eggs", "Serious training days"],
        ],
      ),
      h2("What to limit"),
      ul([
        "Sugary chai + biscuits as the entire meal",
        "Huge sweetened oats floods without protein",
        "Deep-fried “breakfast snacks” daily",
      ]),
      p(
        `Egg macros: <a href="/blog/nutrition/protein/2-eggs-calories-and-protein">2 eggs calories and protein</a>. ${DISCLAIMER}`,
      ),
      takeaways([
        "Prioritize protein at breakfast.",
        "Keep it cookable.",
        "Match portions to your deficit.",
      ]),
    ].join("\n"),
  },
  {
    slug: "best-dinner-for-weight-loss",
    title: "Best Dinner for Weight Loss",
    excerpt:
      "Dinner ideas that keep protein high, carbs intentional, and late-night grazing less likely.",
    quickAnswer: `A strong fat-loss dinner is protein-centered (dal, paneer, eggs, chicken, fish) with vegetables and a planned carb portion if needed — not an accidental feast because lunch was chaotic. ${DISCLAIMER}`,
    categorySlug: "weight-loss",
    subcategorySlug: "diet-meal-planning",
    primaryKeyword: "best dinner for weight loss",
    metaTitle: "Best Dinner for Weight Loss | fitlives",
    metaDescription:
      "Practical dinner templates for calorie control and high protein.",
    tags: ["dinner", "weight loss", "meal planning"],
    topics: ["Meal Planning", "Protein"],
    featuredImageAlt: "Balanced dinner for weight loss",
    relatedSlugs: [
      "best-breakfast-for-weight-loss",
      "is-paneer-good-for-weight-loss",
      "how-many-calories-should-i-eat-to-lose-weight",
    ],
    dayOffset: 8,
    faq: [
      {
        question: "Should I eat zero carbs at night?",
        answer:
          "Not required. Total daily intake matters more than a carb curfew. Some people sleep better with a moderate carb dinner.",
      },
    ],
    sources: [SRC.icmr, SRC.whoObesity],
    body: [
      p(
        "Dinner is where good intentions go to negotiate. Office stress, family servings, and “I was good all day” logic collide. A template beats nightly improvisation.",
      ),
      h2("Dinner template"),
      ol([
        "Protein portion first (decide grams before the sabzi debate).",
        "Vegetables occupying half the plate.",
        "Rice/roti measured to remaining calories.",
        "End the kitchen for the night when possible — brush teeth as a cue.",
      ]),
      h2("Examples"),
      table(
        ["Dinner", "Notes"],
        [
          ["Grilled paneer + salad + 1–2 roti", "Vegetarian staple"],
          ["Chicken curry (light) + veggies + rice cup", "Watch oil"],
          ["Dal + lauki + roti + curd", "High volume"],
          ["Egg dinner + sautéed veggies", "Fast"],
        ],
      ),
      takeaways([
        "Protein + vegetables are non-negotiable.",
        "Carbs are a budget item, not a moral failure.",
        "Plan dinner when breakfast/lunch were imperfect.",
      ]),
      p(`${DISCLAIMER}`),
    ].join("\n"),
  },
  {
    slug: "protein-before-or-after-workout",
    title: "Protein Before or After Workout?",
    excerpt:
      "Total daily protein matters most; peri-workout timing is a small optimization once the basics are solid.",
    quickAnswer: `Both can work. Total daily protein and training quality matter more than the exact minute. A protein-containing meal within a few hours before or after training is enough for most people. ${DISCLAIMER}`,
    categorySlug: "nutrition",
    subcategorySlug: "sports-nutrition",
    primaryKeyword: "protein before or after workout",
    metaTitle: "Protein Before or After Workout? | fitlives",
    metaDescription:
      "Protein timing around training — what matters and what is overhyped.",
    tags: ["protein timing", "workout", "sports nutrition"],
    topics: ["Protein", "Performance", "Recovery"],
    featuredImageAlt: "Protein timing around workouts",
    relatedSlugs: [
      "how-much-protein-do-you-need-per-day",
      "how-much-protein-to-build-muscle",
      "beginner-gym-diet-plan",
    ],
    dayOffset: 8,
    faq: [
      {
        question: "Do I need a shake in the locker room?",
        answer:
          "Only if it helps you hit totals. A normal meal within a couple of hours is fine for most lifters.",
      },
      {
        question: "Training fasted?",
        answer:
          "Some prefer it. Ensure daily protein still lands, and consider a post-workout meal soon if performance suffers.",
      },
    ],
    sources: [SRC.issnProtein, SRC.acsm],
    body: [
      p(
        "The internet loves timing wars: anabolic windows measured in minutes. In coaching, people who hit daily protein and progressive training outperform people who stress about shake timing while eating 60 g protein a day.",
      ),
      h2("What the evidence roughly says"),
      p(
        "Muscle protein synthesis responds to protein feedings across the day. Being in a reasonable fed state around training is helpful. Obsessing over “immediately or gains die” is not.",
      ),
      h2("Simple rules"),
      ul([
        "Hit your daily protein target first.",
        "Include 20–40 g protein in the meal before or after lifting.",
        "If sessions are very long/intense, peri-workout carbs can matter for performance too.",
      ]),
      toolCta(
        "/tools/protein-calculator",
        "protein calculator",
        "Confirm daily needs with the",
      ),
      takeaways([
        "Daily total > perfect timing.",
        "Either before or after can work.",
        "Use shakes for convenience, not superstition.",
      ]),
      p(`${DISCLAIMER}`),
    ].join("\n"),
  },
  {
    slug: "how-long-does-it-take-to-build-muscle",
    title: "How Long Does It Take to Build Muscle?",
    excerpt:
      "Realistic hypertrophy timelines for beginners and intermediates — and why transformation photos lie about speed.",
    quickAnswer: `Beginners can often see noticeable strength and some size in 8–12 weeks of consistent training. Meaningful physique change usually takes many months to years. Rate of gain slows as you advance. ${DISCLAIMER}`,
    categorySlug: "muscle-building",
    subcategorySlug: "muscle-growth-hypertrophy",
    primaryKeyword: "how long to build muscle",
    metaTitle: "How Long Does It Take to Build Muscle? | fitlives",
    metaDescription:
      "Honest muscle-building timelines, newbie gains, and what speeds progress.",
    tags: ["hypertrophy", "beginner", "muscle"],
    topics: ["Hypertrophy", "Beginner Fitness", "Progressive Overload"],
    featuredImageAlt: "Training progress for muscle growth over time",
    relatedSlugs: [
      "how-much-protein-to-build-muscle",
      "beginner-gym-diet-plan",
      "protein-before-or-after-workout",
    ],
    dayOffset: 9,
    faq: [
      {
        question: "Can I gain 5 kg muscle in a month?",
        answer:
          "Unlikely for natural lifters. Early scale jumps often include glycogen, water, and food volume.",
      },
    ],
    sources: [SRC.acsm, SRC.issnProtein],
    body: [
      p(
        "Muscle is patient tissue. It rewards people who show up for quarters and years, not those who restart every Monday with a new program and the same inconsistent sleep.",
      ),
      h2("Rough expectations"),
      table(
        ["Stage", "What you might notice"],
        [
          ["First 4–8 weeks", "Neurological strength jumps, technique improvements"],
          ["8–16 weeks", "Visible changes if diet and photos are honest"],
          ["6–12+ months", "Clear physique shifts with consistency"],
          ["Years", "Advanced refinements; slower monthly gains"],
        ],
      ),
      h2("What actually speeds things up"),
      ul([
        "Progressive overload you log",
        "Protein and enough calories",
        "Sleep",
        "Fewer program hops",
      ]),
      h2("What slows you down"),
      ul([
        "Chronic low calories while “trying to bulk”",
        "Training to failure chaos every set with no progression",
        "Comparing your month 2 to someone’s year 5 (with lighting)",
      ]),
      takeaways([
        "Think in months and years.",
        "Beginners progress faster at first.",
        "Consistency compounds.",
      ]),
      p(
        `Support with <a href="/blog/muscle-building/muscle-building-nutrition/how-much-protein-to-build-muscle">protein for muscle</a> and <a href="/programs">programs</a>. ${DISCLAIMER}`,
      ),
    ].join("\n"),
  },
  {
    slug: "beginner-gym-diet-plan",
    title: "Beginner Gym Diet Plan",
    excerpt:
      "A simple Indian-friendly diet framework for new lifters — protein targets, meal examples, and free-meal sanity.",
    quickAnswer: `A beginner gym diet prioritizes a protein target (often ~1.6 g/kg+), enough calories to train hard, mostly whole foods, and 3–4 solid meals. Perfect macros matter less than showing up consistently for 12 weeks. ${DISCLAIMER}`,
    categorySlug: "muscle-building",
    subcategorySlug: "beginner-muscle-building",
    primaryKeyword: "beginner gym diet plan",
    metaTitle: "Beginner Gym Diet Plan (Indian-Friendly) | fitlives",
    metaDescription:
      "Starter gym diet plan with protein focus, sample meals, and calculator links.",
    tags: ["beginner", "diet plan", "gym"],
    topics: ["Beginner Fitness", "Meal Planning", "Protein"],
    featuredImageAlt: "Beginner gym diet meal plan",
    relatedSlugs: [
      "how-much-protein-to-build-muscle",
      "how-long-does-it-take-to-build-muscle",
      "best-high-protein-indian-foods",
    ],
    dayOffset: 9,
    faq: [
      {
        question: "Bulking or cutting as a beginner?",
        answer:
          "If you are new and carrying higher body fat, a mild deficit while lifting can improve body composition. If underweight or very lean, eat at maintenance or a small surplus. Pick one for 8–12 weeks.",
      },
    ],
    sources: [SRC.issnProtein, SRC.icmr, SRC.acsm],
    body: [
      p(
        "Beginners do not need a 37-food spreadsheet. They need a repeatable plate, a protein number, and permission to be imperfect while the barbell teaches them new skills.",
      ),
      h2("Step 1 — Set calories and protein"),
      ol([
        "Estimate maintenance with a TDEE tool.",
        "Choose mild deficit, maintenance, or small surplus based on your goal.",
        "Set protein around 1.6–2.0 g/kg to start.",
      ]),
      toolCta(
        "/tools/tdee-calculator",
        "TDEE calculator",
        "Start calories with the",
      ),
      toolCta(
        "/tools/protein-calculator",
        "protein calculator",
        "Set protein with the",
      ),
      h2("Sample day (template — adjust portions)"),
      table(
        ["Meal", "Example"],
        [
          ["Breakfast", "Eggs or chilla + milk/curd"],
          ["Lunch", "Dal/chicken/paneer + roti/rice + salad"],
          ["Snack", "Fruit + curd or whey + peanuts measured"],
          ["Dinner", "Protein + vegetables + planned carbs"],
        ],
      ),
      h2("Gym-day extras"),
      p(
        "If performance is flat, add a small carb-rich snack before lifting. Post-workout, eat a normal protein meal — timing stress is optional.",
      ),
      h2("Rules that keep beginners sane"),
      ul([
        "Cook most meals at home 5–6 days weekly.",
        "One flexible meal weekly beats secret daily snacking.",
        "Track for 2–3 weeks to learn portions, then loosen if trends are good.",
        "Sleep is part of the diet plan.",
      ]),
      takeaways([
        "Protein + calorie direction + consistency.",
        "Indian staples work — portion them.",
        "Run the plan 8–12 weeks before judging.",
      ]),
      p(
        `Programs: <a href="/programs/beginner-3-day-full-body">beginner 3-day full body</a>. ${DISCLAIMER}`,
      ),
    ].join("\n"),
  },
];
