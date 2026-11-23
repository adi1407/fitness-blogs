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
  {
    slug: "whey-protein-concentrate-vs-isolate",
    title: "Whey Concentrate vs Isolate: Which Is Better?",
    excerpt:
      "Concentrate is cheaper; isolate is leaner and lower in lactose. Here is how whey concentrate vs isolate actually differ — and which to buy in India.",
    quickAnswer: `Both whey concentrate and isolate build muscle when total daily protein and training are right. Concentrate is usually ~70–80% protein by weight, cheaper, and fine if you tolerate dairy. Isolate is more filtered (~90%+ protein), lower lactose and fat, and often better if milk bloats you. Pick based on budget and digestion — not Instagram “superior” claims. Check labels and buy from authorised sellers. ${DISCLAIMER}`,
    categorySlug: "nutrition",
    subcategorySlug: "protein",
    primaryKeyword: "whey concentrate vs isolate",
    metaTitle: "Whey Concentrate vs Isolate: Which Is Better?",
    metaDescription:
      "Whey concentrate vs isolate: protein %, lactose, price, and who should pick which — plus India buying tips to avoid fake or blended tubs.",
    tags: [
      "whey protein",
      "whey concentrate",
      "whey isolate",
      "protein powder",
      "supplements",
    ],
    topics: ["Protein", "Indian Nutrition", "Performance", "Beginner Fitness"],
    featuredImageAlt:
      "Two whey tubs labelled concentrate and isolate beside a measuring scoop",
    relatedSlugs: [
      "how-much-whey-protein-per-day",
      "is-whey-protein-safe",
      "best-high-protein-indian-foods",
      "how-much-protein-to-build-muscle",
      "whey-protein-for-vegetarians",
    ],
    dayOffset: 9,
    faq: [
      {
        question: "Is whey isolate better than concentrate for muscle?",
        answer:
          "Not meaningfully if you match protein grams. Isolate is denser per scoop; concentrate can match it if you use a slightly larger serving. Training and total daily protein matter more.",
      },
      {
        question: "Which is better for weight loss?",
        answer:
          "Isolate is slightly lower in carbs/fat per scoop, but the difference is small. Calorie deficit and total protein decide fat loss.",
      },
      {
        question: "I get bloated with whey — concentrate or isolate?",
        answer:
          "Try isolate (less lactose) or take concentrate with meals. If you have a milk allergy, avoid whey entirely. Persistent symptoms need a clinician, not another brand hop.",
      },
      {
        question: "What about hydrolysate?",
        answer:
          "Hydrolysate is pre-broken-down whey, usually costlier, with little proven muscle advantage for most gym-goers over concentrate/isolate when doses match.",
      },
      {
        question: "Can I mix concentrate and isolate?",
        answer:
          "Yes. Some blends exist. Just count the protein on the label toward your daily target.",
      },
    ],
    sources: [SRC_ISSN, SRC_MORTON, SRC_PHILLIPS],
    body: [
      p(
        "Shop shelves in India stack “gold isolate” next to “raw concentrate” with a 2× price gap. The question whey concentrate vs isolate sounds technical. For most people it is a digestion-and-budget choice.",
      ),

      h2("Side-by-side"),
      table(
        ["Factor", "Concentrate (WPC)", "Isolate (WPI)"],
        [
          ["Typical protein %", "~70–80% by weight", "~90%+ by weight"],
          ["Lactose / fat", "More", "Much less"],
          ["Price per gram protein", "Usually lower", "Usually higher"],
          ["Taste / mix", "Often creamier", "Often thinner; brand-dependent"],
          ["Best default?", "Yes for most healthy dairy-tolerant buyers", "If lactose bothers you or you want leaner scoops"],
        ],
      ),
      p(
        `Neither replaces food. Dose still follows <a href="${LINK.wheyDose}">how much whey protein per day</a>. Safety and fake-tub checks: <a href="${LINK.wheySafe}">is whey protein safe</a>.`,
      ),

      h2("What does not change"),
      ul([
        "Both are milk-derived complete proteins with plenty of leucine",
        "Both only help muscle when you train and hit daily protein",
        "Neither is a steroid or a hormone",
      ]),

      h2("When concentrate is enough"),
      p(
        "If milk, curd and paneer sit fine with you, concentrate is usually the value pick. Use the label’s protein-per-scoop to hit your gap — not the brand’s “fastest absorbing” slogan.",
      ),

      h2("When isolate is worth the premium"),
      ul([
        "Bloating or loose stools with concentrate that improves on isolate",
        "You want fewer leftover carbs/fats per scoop during a tight cut",
        "You prefer a smaller scoop for the same protein grams",
      ]),
      p(
        `Vegetarians still using dairy can use either form — see <a href="${LINK.wheyVeg}">whey protein for vegetarians</a>. Vegans need a plant blend instead.`,
      ),

      h2("India buying checklist"),
      ol([
        "Single-ingredient whey (or clear WPC/WPI) — avoid mystery “proprietary blends”",
        "Authorised seller + FSSAI details on pack",
        "Compare price per gram of protein, not tub size",
        "Skip tubs that hide protein behind huge servings of maltodextrin (mass gainers)",
      ]),
      p(DISCLAIMER),

      toolCta(
        "/protein-calculator",
        "protein calculator",
        "Choose a form, then size scoops against your daily target with the",
      ),

      takeaways([
        "Concentrate is cheaper and fine for most dairy-tolerant people.",
        "Isolate is leaner and lower lactose — useful for digestion or tight macros.",
        "Matched protein grams → similar muscle outcomes; training still rules.",
        "Pay for verified protein grams, not “gold” marketing.",
        "Food first; powder second; quality sellers always.",
      ]),
    ].join("\n"),
  },
  {
    slug: "best-time-to-take-whey-protein",
    title: "Best Time to Take Whey Protein (Before or After?)",
    excerpt:
      "Post-workout only? Before bed? The best time to take whey protein is whenever it helps you hit your daily total — here’s what actually matters.",
    quickAnswer: `The best time to take whey protein is the time you will actually drink it. Total daily protein matters more than a narrow “anabolic window.” Post-workout is convenient; with breakfast or between meals works too. Spread protein across the day when you can. If you train fasted, a scoop after lifting is a practical default. ${DISCLAIMER}`,
    categorySlug: "nutrition",
    subcategorySlug: "protein",
    primaryKeyword: "best time to take whey protein",
    metaTitle: "Best Time to Take Whey Protein (Before or After?)",
    metaDescription:
      "Best time to take whey protein: post-workout vs anytime, morning and night myths, and how timing fits your daily protein target.",
    tags: [
      "whey protein",
      "protein timing",
      "supplements",
      "workout nutrition",
      "protein",
    ],
    topics: ["Protein", "Performance", "Beginner Fitness", "Indian Nutrition"],
    featuredImageAlt:
      "Shaker bottle on a gym bench after a workout session",
    relatedSlugs: [
      "protein-before-or-after-workout",
      "how-much-whey-protein-per-day",
      "is-whey-protein-safe",
      "how-much-protein-to-build-muscle",
      "whey-protein-concentrate-vs-isolate",
    ],
    dayOffset: 9,
    faq: [
      {
        question: "Should I take whey immediately after my workout?",
        answer:
          "It is fine and convenient, but not mandatory if you already ate protein within a few hours. Missing the exact minute does not erase your training.",
      },
      {
        question: "Is whey before bed useful?",
        answer:
          "Only if it helps your daily protein total. Casein-rich foods like curd or paneer also work overnight. Whey before bed is optional, not magic.",
      },
      {
        question: "Can I take whey on an empty stomach?",
        answer:
          "Many people do. If it upsets your stomach, take it with a small meal or switch form (e.g. isolate).",
      },
      {
        question: "Should I take whey before cardio?",
        answer:
          "Not required. For long sessions, carbs and fluids matter more. Use whey to hit daily protein around your schedule.",
      },
      {
        question: "Can I mix whey with milk or water?",
        answer:
          "Both work. Milk adds calories and protein; water is lighter. Curd smoothies are another Indian-friendly option.",
      },
    ],
    sources: [SRC_ISSN, SRC_ARETA, SRC_MORTON],
    body: [
      p(
        "Gym folklore says the shake must hit your lips within 30 minutes or the workout “wastes.” That fear sells tubs. It does not match how protein timing actually works for most lifters.",
      ),

      h2("Daily total beats the stopwatch"),
      p(
        `Research on protein distribution favours getting enough across the day more than a single magic minute. Pair this guide with <a href="${LINK.proteinTiming}">protein before or after workout</a> and set scoops with <a href="${LINK.wheyDose}">how much whey protein per day</a>.`,
      ),
      table(
        ["Timing", "When it helps", "When it does not matter much"],
        [
          ["After training", "You trained fasted or far from a meal", "You already ate a protein-rich meal nearby"],
          ["Breakfast / mid-morning", "Vegetarian breakfasts run low on protein", "Your morning already has eggs, paneer or curd"],
          ["Between meals", "Long gaps leave you under target", "You are force-feeding calories you do not need"],
          ["Before bed", "Evening protein was low", "You already hit the day’s total"],
        ],
      ),

      h2("Practical defaults"),
      ol([
        "<strong>Lift after a normal meal:</strong> shake whenever it is convenient that day",
        "<strong>Lift fasted mornings:</strong> scoop after training is a simple default",
        "<strong>Hate shakes post-workout:</strong> eat paneer/eggs/dal within a few hours instead",
        "<strong>Travel days:</strong> whey is a portable gap-filler — timing is whatever airport security allows",
      ]),

      h2("Stacking with creatine"),
      p(
        `You can mix whey and creatine in the same shaker. Creatine cares about daily consistency more than the clock — see <a href="${LINK.creatineDosage}">creatine dosage</a>.`,
      ),

      h2("Digestion tips"),
      ul([
        "Bloat with concentrate? Try isolate or take the scoop with food — <a href=\"" +
          LINK.wheyIsolate +
          "\">concentrate vs isolate</a>",
        "Very sweet flavours can bother some stomachs — unflavoured in milk/curd is an option",
        "Safety and quality still matter: <a href=\"" +
          LINK.wheySafe +
          "\">is whey protein safe</a>",
      ]),
      p(DISCLAIMER),

      toolCta(
        "/protein-calculator",
        "protein calculator",
        "Fix the daily number first; then place scoops where they fit using the",
      ),

      takeaways([
        "Best time to take whey = the time that helps you hit today’s protein target.",
        "Post-workout is convenient, not sacred.",
        "Spread protein across meals when possible.",
        "Fasted training → a post-lift scoop is a sensible default.",
        "Form and food quality still beat clock anxiety.",
      ]),
    ].join("\n"),
  },
  {
    slug: "whey-protein-for-vegetarians",
    title: "Whey Protein for Vegetarians: Does It Fit?",
    excerpt:
      "Lactose-ovo vegetarians can use whey; vegans cannot. How whey protein for vegetarians fits Indian diets, when to prefer isolate, and food-first alternatives.",
    quickAnswer: `Whey protein for vegetarians who eat dairy is fine — whey comes from milk, the same family as paneer and curd. It is not vegan. Use 0–2 scoops to close gaps after dal, curd, paneer and soya, aiming for your daily protein target. If milk bloats you, try isolate or emphasise non-dairy vegetarian foods. Vegans should choose a plant protein blend instead. ${DISCLAIMER}`,
    categorySlug: "nutrition",
    subcategorySlug: "protein",
    primaryKeyword: "whey protein for vegetarians",
    metaTitle: "Whey Protein for Vegetarians: Does It Fit?",
    metaDescription:
      "Whey protein for vegetarians: dairy vs vegan rules, scoop use with Indian meals, isolate tips, and food-first alternatives when you skip powder.",
    tags: [
      "whey protein",
      "vegetarian protein",
      "protein powder",
      "Indian diet",
      "supplements",
    ],
    topics: ["Protein", "Indian Nutrition", "Vegetarian", "Beginner Fitness"],
    featuredImageAlt:
      "Whey scoop beside curd, paneer and a bowl of dal on a vegetarian thali",
    relatedSlugs: [
      "vegetarian-protein-sources-india",
      "is-whey-protein-safe",
      "how-much-whey-protein-per-day",
      "best-high-protein-indian-foods",
      "whey-protein-concentrate-vs-isolate",
    ],
    dayOffset: 9,
    faq: [
      {
        question: "Is whey vegetarian?",
        answer:
          "Yes for lacto-vegetarians — it is from milk. It is not suitable for vegans. Check capsule “tablets” separately; some use gelatin shells.",
      },
      {
        question: "Is whey better than paneer and dal?",
        answer:
          "No. Food should carry most of your protein. Whey is a convenient top-up when meals fall short.",
      },
      {
        question: "Can Jain or satvik diets use whey?",
        answer:
          "Whey is dairy-derived. Whether it fits your personal rules depends on how you define satvik/Jain practice — check with your tradition or advisor. Ingredient lists still matter (flavours, additives).",
      },
      {
        question: "What if I am lactose intolerant but vegetarian?",
        answer:
          "Try whey isolate, lactose-free milk products, or emphasise soya, paneer if tolerated, and dals. Severe allergy to milk protein means avoiding whey.",
      },
      {
        question: "Do vegetarians need more whey than non-vegetarians?",
        answer:
          "Not automatically. They often need more planning because meat is absent — powder is one tool among many.",
      },
    ],
    sources: [SRC_ISSN, SRC_MORTON, SRC_PHILLIPS],
    body: [
      p(
        "In India, “vegetarian” usually still includes milk. That is why whey protein for vegetarians is a common gym recommendation — and why vegan friends need a different aisle.",
      ),

      h2("Dairy vegetarian vs vegan"),
      table(
        ["Pattern", "Whey OK?", "Notes"],
        [
          ["Lacto / lacto-ovo vegetarian", "Yes", "Same milk family as curd and paneer"],
          ["Vegan", "No", "Use pea/soy/rice blends instead"],
          ["Eggetarian", "Yes", "Eggs + dairy + whey can cover targets easily"],
        ],
      ),
      p(
        `Map food options first with <a href="${LINK.vegProtein}">vegetarian protein sources in India</a> and <a href="${LINK.indianProtein}">best high-protein Indian foods</a>.`,
      ),

      h2("How vegetarians usually use whey"),
      ol([
        "Set a daily protein target (calculator + body weight)",
        "Build meals with dal, curd, paneer, soya, sprouts, milk",
        "Add 1 scoop where breakfast or evening snacks run thin",
        "Skip powder on days food already hits the number",
      ]),
      p(
        `Scoop maths: <a href="${LINK.wheyDose}">how much whey protein per day</a>. Form choice: <a href="${LINK.wheyIsolate}">concentrate vs isolate</a>.`,
      ),

      h2("Sample vegetarian day (≈70 kg lifter)"),
      table(
        ["Meal", "Example", "Protein (ballpark)"],
        [
          ["Breakfast", "Besan chilla + curd", "~25–30 g"],
          ["Lunch", "Dal, roti, sabzi, raita", "~25–30 g"],
          ["Evening", "Whey in water or milk", "~20–25 g"],
          ["Dinner", "Paneer bhurji + salad + roti", "~35–40 g"],
        ],
      ),

      h2("Quality still matters"),
      p(
        `Vegetarian or not, India has label and contaminant issues in some powders. Read <a href="${LINK.wheySafe}">is whey protein safe</a> before you buy the cheapest tub online.`,
      ),
      p(DISCLAIMER),

      toolCta(
        "/protein-calculator",
        "protein calculator",
        "Set a vegetarian-friendly daily target, then decide if whey is needed with the",
      ),

      takeaways([
        "Whey fits lacto-vegetarians; it is not vegan.",
        "Food first — dal, curd, paneer, soya — then 0–2 scoops as needed.",
        "Isolate can help if concentrate bloats you.",
        "Plan protein across meals; powder is a bridge, not the whole diet.",
        "Buy verified whey; quality issues are real in some market products.",
      ]),
    ].join("\n"),
  },
];
