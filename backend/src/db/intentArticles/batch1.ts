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

export const batch1: IntentArticleDef[] = [
  {
    slug: "how-much-protein-do-you-need-per-day",
    title: "How Much Protein Do You Need Per Day?",
    excerpt:
      "A practical daily protein target by body weight and goal — general health, fat loss, or muscle — with Indian food examples.",
    quickAnswer: `Most active adults do well around 1.6–2.2 g of protein per kg of body weight per day when training hard. Sedentary adults can start nearer 0.8–1.2 g/kg. Spread protein across meals instead of one huge dinner. ${DISCLAIMER}`,
    categorySlug: "nutrition",
    subcategorySlug: "protein",
    primaryKeyword: "how much protein per day",
    metaTitle: "How Much Protein Do You Need Per Day? | fitlives",
    metaDescription:
      "Daily protein targets by goal and body weight, plus Indian high-protein foods and a calculator CTA.",
    tags: ["protein", "macros", "indian nutrition"],
    topics: ["Protein", "Macros", "Indian Nutrition"],
    featuredImageAlt: "High-protein Indian meal for daily protein targets",
    relatedSlugs: [
      "how-much-protein-to-build-muscle",
      "best-high-protein-indian-foods",
      "protein-before-or-after-workout",
    ],
    dayOffset: 0,
    faq: [
      {
        question: "Is 1 gram per pound mandatory?",
        answer:
          "No. That is a rough gym shorthand (~2.2 g/kg). Many people build muscle well between 1.6–2.2 g/kg if training and calories cooperate.",
      },
      {
        question: "Can vegetarians hit high protein?",
        answer:
          "Yes — paneer, dal, curd, sprouts, soy, eggs if you eat them, and whey or plant protein powder as convenience tools.",
      },
      {
        question: "Does more protein always mean more muscle?",
        answer:
          "Past a point, extra protein mainly displaces carbs/fats. Training stimulus and total calories still matter more.",
      },
    ],
    sources: [SRC.issnProtein, SRC.whoProtein, SRC.icmr],
    body: [
      p(
        "After fifteen-plus years of coaching people who train before office, after school, or between shifts, the protein question comes up almost every week. People either under-eat it all day and “make up” at night, or they fear protein will somehow damage them. The truth sits in the middle: hit a sensible daily target, distribute it, and keep the rest of your diet enjoyable.",
        "“How much protein per day” is not one number for India or the world. It depends on your body size, how hard you train, and whether you are trying to lose fat, maintain, or build muscle.",
      ),
      h2("Start with body weight, not Instagram myths"),
      p(
        "A useful way to set a target is grams per kilogram of body weight:",
      ),
      table(
        ["Goal", "Typical range", "Example for 70 kg"],
        [
          ["General health / light activity", "0.8–1.2 g/kg", "56–84 g"],
          ["Fat loss while lifting", "1.6–2.2 g/kg", "112–154 g"],
          ["Muscle gain / hard training", "1.6–2.2 g/kg", "112–154 g"],
          ["Very lean / high volume", "Up to ~2.3–2.5 g/kg", "Use only if needed"],
        ],
      ),
      p(
        "If you carry a lot of body fat, some coaches prefer using an estimated lean mass for the multiplier so the target is not inflated. If that feels confusing, start with total body weight at the lower end of the range and adjust with progress photos and strength — not scale panic.",
      ),
      toolCta(
        "/tools/protein-calculator",
        "Protein calculator",
        "Get a personalized gram estimate with our",
      ),
      h2("Why distribution matters more than one giant shake"),
      p(
        "Your body can use protein from a large meal, but muscle protein synthesis responds well to repeated pulses across the day. Aim for roughly 25–40 g of protein in most meals if you are an adult training regularly. That often looks like eggs or chilla at breakfast, dal + curd or chicken at lunch, and paneer, fish, or legumes at dinner.",
        "If you currently eat almost no protein until 9 p.m., fix that first. Moving 30 g into breakfast alone changes how satiated and recovered many clients feel within two weeks.",
      ),
      h2("Indian plates that actually add up"),
      ul([
        "2 eggs + 1 roti + vegetables ≈ solid breakfast protein start",
        "1 cup cooked dal + curd + salad at lunch",
        "100–150 g paneer or chicken at dinner",
        "Sprouts chaat or Greek-style hung curd as snacks",
      ]),
      p(
        "You do not need imported “fitfluencer” groceries. You need consistency. Paneer, dals, eggs, fish, chicken, soy chunks, and dairy already cover most Indian kitchens.",
      ),
      h2("Special cases (keep it practical)"),
      h3("Fat loss"),
      p(
        "Higher protein helps preserve muscle in a calorie deficit and improves fullness. Pair it with a modest deficit — see our guides on calorie targets — and keep lifting.",
      ),
      h3("Muscle gain"),
      p(
        "Protein without progressive training is just expensive amino acids. Lift, sleep, and eat enough total calories. Protein sits on top of that foundation.",
      ),
      h3("Kidneys and “too much protein”"),
      p(
        "For healthy adults, higher protein intakes used in sports nutrition research are generally well tolerated. If you have diagnosed kidney disease or other medical conditions, get individual advice from a clinician before pushing high intakes. Educational content is not a prescription.",
      ),
      takeaways([
        "Use g/kg ranges, not random scoop counts.",
        "1.6–2.2 g/kg covers most lifters in fat loss or muscle phases.",
        "Spread protein across the day; fix breakfast first.",
        "Indian staples can hit targets without living on supplements.",
      ]),
      p(
        `Related reading: <a href="/nutrition/protein">Protein hub</a>, <a href="/blog/nutrition/protein/best-high-protein-indian-foods">high-protein Indian foods</a>, and <a href="/blog/muscle-building/muscle-building-nutrition/how-much-protein-to-build-muscle">protein for muscle</a>. ${DISCLAIMER}`,
      ),
    ].join("\n"),
  },
  {
    slug: "how-many-calories-should-i-eat-to-lose-weight",
    title: "How Many Calories Should I Eat to Lose Weight?",
    excerpt:
      "Estimate maintenance calories, set a sustainable deficit, and avoid the crash diets that rebound hard.",
    quickAnswer: `A sustainable fat-loss intake is usually about 10–20% below maintenance (often ~300–500 kcal/day for many adults). Find maintenance first (TDEE), then subtract — do not jump to 1,200 kcal by default. ${DISCLAIMER}`,
    categorySlug: "weight-loss",
    subcategorySlug: "calorie-deficit",
    primaryKeyword: "calories to lose weight",
    metaTitle: "How Many Calories Should I Eat to Lose Weight? | fitlives",
    metaDescription:
      "Practical calorie targets for fat loss: estimate TDEE, set a 10–20% deficit, and adjust with weekly trends.",
    tags: ["calories", "fat loss", "deficit"],
    topics: ["Calories", "Calorie Deficit", "Body Composition"],
    featuredImageAlt: "Calorie-controlled meals for fat loss",
    relatedSlugs: [
      "how-to-calculate-your-calorie-deficit",
      "how-many-calories-should-i-eat-to-lose-10-kg",
      "how-to-lose-belly-fat",
    ],
    dayOffset: 0,
    faq: [
      {
        question: "Is 1,200 calories safe for everyone?",
        answer:
          "No. That number is often too low, especially for taller or more active people. Base intake on your maintenance estimate, not a viral default.",
      },
      {
        question: "Why am I not losing on a “deficit”?",
        answer:
          "Portions may be underestimated, weekends may erase weekday deficits, or the maintenance estimate may be high. Track honestly for 2–3 weeks and adjust.",
      },
      {
        question: "Should women eat less than men automatically?",
        answer:
          "Needs differ by size and activity more than by gender slogans. Two people of different heights will not share one calorie prescription.",
      },
    ],
    sources: [SRC.whoObesity, SRC.icmr, SRC.acsm],
    body: [
      p(
        "“Just eat less” is not a plan. Eating so little that you rebound is also not a plan. The useful question is: how many calories should you eat to lose weight at a pace your training, hormones, and social life can survive?",
        "In coaching, the clients who keep results are rarely the ones who hit the lowest number. They are the ones who stay consistent for months.",
      ),
      h2("Step 1 — Estimate maintenance (TDEE)"),
      p(
        "Maintenance is roughly the calories you need to hold weight steady. Online TDEE calculators use age, sex, height, weight, and activity. Treat the output as a starting point, not gospel.",
      ),
      toolCta(
        "/tools/tdee-calculator",
        "TDEE calculator",
        "Estimate maintenance with our",
      ),
      h2("Step 2 — Create a modest deficit"),
      table(
        ["Approach", "Deficit", "Typical weekly fat loss"],
        [
          ["Conservative", "10% below TDEE", "Slower, easier adherence"],
          ["Standard", "~15–20% or 300–500 kcal", "Common coaching start"],
          ["Aggressive", ">25%", "Harder; higher rebound risk"],
        ],
      ),
      p(
        "Example: maintenance 2,400 kcal → try 1,900–2,100 kcal. Recheck average weight after 14 days. If weight is stable, trim another 100–150 kcal or add daily walking — not both at once unless you enjoy misery.",
      ),
      h2("What “calories to lose weight” looks like in Indian meals"),
      p(
        "You do not need plain boiled everything. You need portions that match the target: dal, roti or rice (measured), plenty of vegetables, and a clear protein source. Oil and ghee count — cook with intention, not fear.",
        "Protein should stay relatively high so you keep muscle while the scale drops. Pair this article with our protein guides if your meals are carb-heavy and protein-light.",
      ),
      h2("Adjust like a coach, not like a panic button"),
      ol([
        "Weigh 3–4 mornings per week; use the weekly average.",
        "If average drops ~0.25–0.75% of body weight per week, stay the course.",
        "If stuck 2–3 weeks with honest tracking, reduce 100–200 kcal or add steps.",
        "If strength collapses and sleep tanks, the deficit may be too deep — reverse slightly.",
      ]),
      takeaways([
        "Estimate TDEE, then cut 10–20% — not randomly.",
        "Prefer adherence over extreme lows.",
        "Judge progress on weekly averages, not one weigh-in.",
        "Keep protein and lifting in the plan.",
      ]),
      p(
        `See also: <a href="/blog/weight-loss/calorie-deficit/how-to-calculate-your-calorie-deficit">how to calculate a deficit</a> and <a href="/tools/calorie-calculator">calorie calculator</a>. ${DISCLAIMER}`,
      ),
    ].join("\n"),
  },
  {
    slug: "how-to-calculate-your-calorie-deficit",
    title: "How to Calculate Your Calorie Deficit",
    excerpt:
      "A clear method: estimate TDEE, subtract a sustainable amount, and verify with your scale trend.",
    quickAnswer: `Calorie deficit = maintenance calories − intake. Calculate or estimate TDEE, subtract 300–500 kcal (or ~10–20%), then confirm with 2–3 weeks of weight averages. ${DISCLAIMER}`,
    categorySlug: "weight-loss",
    subcategorySlug: "calorie-deficit",
    primaryKeyword: "how to calculate calorie deficit",
    metaTitle: "How to Calculate Your Calorie Deficit | fitlives",
    metaDescription:
      "Step-by-step calorie deficit calculation with TDEE, example math, and real-world checks.",
    tags: ["calorie deficit", "fat loss", "tdee"],
    topics: ["Calorie Deficit", "Calories"],
    featuredImageAlt: "Calculating a calorie deficit with food and a scale",
    relatedSlugs: [
      "how-many-calories-should-i-eat-to-lose-weight",
      "how-many-calories-should-i-eat-to-lose-10-kg",
      "how-much-protein-do-you-need-per-day",
    ],
    dayOffset: 1,
    faq: [
      {
        question: "Do I need a food scale forever?",
        answer:
          "Not forever. Use it for a few weeks to calibrate portions, then loosen if your trend stays on track.",
      },
      {
        question: "Does exercise “earn” more food?",
        answer:
          "Activity raises expenditure, but wearable calorie burn estimates are often optimistic. Prefer steps and lifting consistency over chasing burn numbers.",
      },
    ],
    sources: [SRC.whoObesity, SRC.acsm],
    body: [
      p(
        "A calorie deficit is simple arithmetic wrapped in human behavior. The math is easy. The logging, weekends, and “small” chai-and-pakora extras are where people get lost.",
        "Here is the method I teach when someone asks how to calculate a calorie deficit without turning life into a spreadsheet prison.",
      ),
      h2("The formula"),
      p(
        "<strong>Deficit per day ≈ Maintenance (TDEE) − Calories eaten.</strong> If maintenance is 2,300 and you eat 1,900, your planned deficit is 400 kcal/day.",
      ),
      h2("Three ways to estimate maintenance"),
      ol([
        "TDEE calculator using BMR × activity factor.",
        "Track intake for 10–14 days while weight is stable — that average intake ≈ maintenance.",
        "Start from a calculator, then adjust after two weeks of weigh-ins.",
      ]),
      toolCta(
        "/tools/tdee-calculator",
        "TDEE calculator",
        "Run a first estimate with the",
      ),
      h2("Worked example"),
      table(
        ["Item", "Number"],
        [
          ["Estimated TDEE", "2,400 kcal"],
          ["Chosen deficit", "400 kcal"],
          ["Daily target", "2,000 kcal"],
          ["Weekly deficit (theory)", "~2,800 kcal ≈ ~0.3–0.4 kg fat"],
        ],
      ),
      p(
        "Real life is messy: water weight, menstrual cycle, salt, stress. That is why we use weekly averages, not daily drama.",
      ),
      h2("Verify the deficit exists"),
      ul([
        "If weight drifts down over 2–3 weeks, the deficit is real enough.",
        "If weight is flat and photos are flat, intake is closer to maintenance than you think.",
        "If weight crashes and gym performance dies, reopen calories slightly.",
      ]),
      h2("Common calculation mistakes"),
      ul([
        "Counting only “clean” meals and ignoring oil, nuts, and delivery apps",
        "Using max activity multipliers while sitting eight hours",
        "Changing five variables every Monday",
      ]),
      takeaways([
        "Deficit = TDEE − intake.",
        "Start with 300–500 kcal for most adults.",
        "Confirm with scale trends, not hope.",
        "Recalculate as you lose weight — maintenance falls.",
      ]),
      p(
        `Next: <a href="/blog/weight-loss/calorie-deficit/how-many-calories-should-i-eat-to-lose-weight">calories to lose weight</a> · <a href="/tools/calorie-calculator">calorie calculator</a>. ${DISCLAIMER}`,
      ),
    ].join("\n"),
  },
  {
    slug: "how-much-protein-to-build-muscle",
    title: "How Much Protein to Build Muscle?",
    excerpt:
      "Protein targets for hypertrophy, how to hit them on Indian meals, and why training still comes first.",
    quickAnswer: `For muscle building, most lifters thrive at about 1.6–2.2 g protein per kg body weight daily, paired with progressive strength training and enough total calories. ${DISCLAIMER}`,
    categorySlug: "muscle-building",
    subcategorySlug: "muscle-building-nutrition",
    primaryKeyword: "protein to build muscle",
    metaTitle: "How Much Protein to Build Muscle? | fitlives",
    metaDescription:
      "Hypertrophy protein ranges, meal distribution, and Indian food examples for building muscle.",
    tags: ["protein", "hypertrophy", "muscle"],
    topics: ["Protein", "Hypertrophy", "Muscle Building"],
    featuredImageAlt: "Protein-rich meal for muscle building",
    relatedSlugs: [
      "how-much-protein-do-you-need-per-day",
      "how-long-does-it-take-to-build-muscle",
      "beginner-gym-diet-plan",
    ],
    dayOffset: 1,
    faq: [
      {
        question: "Can I build muscle on a vegetarian diet?",
        answer:
          "Yes. Emphasize dairy, legumes, soy, eggs if included, and consider a protein supplement for convenience.",
      },
      {
        question: "Is whey mandatory?",
        answer:
          "No. Whey is convenient, not magical. Whole food can cover needs; powder helps busy schedules.",
      },
    ],
    sources: [SRC.issnProtein, SRC.acsm],
    body: [
      p(
        "Protein to build muscle is not a mystery powder — it is a daily total that supports repair after training. If you bench press hard and eat like a sparrow, progress stalls. If you eat protein but never add weight or reps, the same thing happens.",
      ),
      h2("The hypertrophy range"),
      p(
        "Sports nutrition literature commonly supports roughly 1.6–2.2 g/kg/day for people gaining muscle. Going higher is usually unnecessary unless preference or extreme leanness demands it.",
      ),
      toolCta(
        "/tools/protein-calculator",
        "protein calculator",
        "Sketch your daily grams with the",
      ),
      h2("Calories still decide the “building” part"),
      p(
        "Protein is the brick delivery. Calories are whether you have a construction budget. A small surplus (about 200–300 kcal above maintenance) helps intermediates gain with less fat. Beginners can sometimes gain on maintenance if they are new to lifting (“newbie gains”), but chronic under-eating still caps results.",
      ),
      h2("Sample day (~140 g protein, Indian-leaning)"),
      table(
        ["Meal", "Idea", "Protein (approx.)"],
        [
          ["Breakfast", "3 eggs + veggies + 1 roti", "20–25 g"],
          ["Lunch", "Dal, rice/roti, curd, salad", "30–35 g"],
          ["Snack", "Hung curd / whey / peanuts measured", "20–25 g"],
          ["Dinner", "Paneer or chicken + vegetables", "40–45 g"],
        ],
      ),
      h2("Training link you cannot skip"),
      p(
        "Progressive overload — more reps, load, or better quality over time — tells muscle to grow. Protein feeds that signal. Sleep 7–9 hours when you can; chronically sleeping five hours fights your groceries.",
      ),
      takeaways([
        "1.6–2.2 g/kg covers most muscle-building phases.",
        "Hit protein and train progressively.",
        "A small calorie surplus helps after the beginner phase.",
        "Supplements are optional convenience.",
      ]),
      p(
        `See <a href="/muscle-building">muscle building hub</a> and <a href="/blog/muscle-building/muscle-growth-hypertrophy/how-long-does-it-take-to-build-muscle">how long muscle takes</a>. ${DISCLAIMER}`,
      ),
    ].join("\n"),
  },
  {
    slug: "100g-chicken-breast-calories-and-protein",
    title: "100g Chicken Breast Calories and Protein",
    excerpt:
      "Typical calories and protein in 100 g chicken breast, cooked vs raw caveats, and how to use it in Indian meals.",
    quickAnswer: `Skinless chicken breast is typically around 110–165 kcal and about 22–31 g protein per 100 g depending on raw vs cooked and exact cut. Use a food scale and consistent state (raw or cooked) when tracking. ${DISCLAIMER}`,
    categorySlug: "nutrition",
    subcategorySlug: "protein",
    primaryKeyword: "100g chicken breast protein",
    metaTitle: "100g Chicken Breast Calories and Protein | fitlives",
    metaDescription:
      "Calories and protein in 100 g chicken breast, tracking tips, and meal ideas.",
    tags: ["chicken", "protein", "calories"],
    topics: ["Protein", "Calories", "Food Labels"],
    featuredImageAlt: "100 grams chicken breast on a kitchen scale",
    relatedSlugs: [
      "100g-paneer-calories-and-protein",
      "2-eggs-calories-and-protein",
      "how-much-protein-do-you-need-per-day",
    ],
    dayOffset: 2,
    faq: [
      {
        question: "Raw or cooked 100 g?",
        answer:
          "100 g raw becomes less than 100 g cooked as water leaves. Pick one method and stay consistent in your log.",
      },
      {
        question: "Does mustard oil change the macros a lot?",
        answer:
          "The chicken’s protein stays similar; added oil adds fat calories. Measure cooking fat if you track tightly.",
      },
    ],
    sources: [SRC.usdaFdc, SRC.icmr],
    body: [
      p(
        "Chicken breast is popular because it is lean, high-protein, and easy to season. The search for “100g chicken breast calories and protein” usually means: how do I log this without guessing?",
      ),
      h2("Typical numbers (skinless)"),
      table(
        ["State (approx.)", "Calories / 100 g", "Protein / 100 g"],
        [
          ["Raw, skinless breast", "~110–120 kcal", "~22–23 g"],
          ["Cooked, grilled/boiled lean", "~150–165 kcal", "~28–31 g"],
        ],
      ),
      p(
        "Databases vary slightly by breed and water content. Treat these as working averages. If your packet lists nutrition facts, prefer that label.",
      ),
      h2("How to use it in a day"),
      ul([
        "150 g cooked breast ≈ a large lunch protein portion for many lifters",
        "Pair with rice or roti and vegetables for a complete meal",
        "Batch-cook and refrigerate for 2–3 days max with safe storage",
      ]),
      h2("Tracking tip that saves arguments"),
      p(
        "Weigh raw if your recipe starts raw; weigh cooked if you meal-prep cooked pieces. Switching mid-week confuses the log and your brain.",
      ),
      takeaways([
        "Chicken breast is a lean, dense protein source.",
        "Expect roughly 22–31 g protein per 100 g depending on state.",
        "Oil and skin change calories more than protein.",
        "Be consistent with raw vs cooked logging.",
      ]),
      p(
        `Compare with <a href="/blog/nutrition/protein/100g-paneer-calories-and-protein">100 g paneer</a> and <a href="/blog/nutrition/protein/2-eggs-calories-and-protein">2 eggs</a>. ${DISCLAIMER}`,
      ),
    ].join("\n"),
  },
];
