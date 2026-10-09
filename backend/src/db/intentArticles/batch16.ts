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
  walking: "/blog/weight-loss/walking-daily-activity/does-walking-help-you-lose-weight",
  steps10k: "/blog/weight-loss/walking-daily-activity/calories-burned-walking-10000-steps",
  deficit: "/blog/weight-loss/calorie-deficit/what-is-a-calorie-deficit",
  loseWeight:
    "/blog/weight-loss/calorie-deficit/how-many-calories-should-i-eat-to-lose-weight",
  notLosing: "/blog/weight-loss/weight-loss-plateaus/why-am-i-not-losing-weight",
  bellyFat: "/blog/weight-loss/fat-loss-basics/how-to-lose-belly-fat",
  proteinWl: "/blog/weight-loss/weight-loss-nutrition/protein-for-weight-loss",
  threeDay: "/blog/muscle-building/training-programs/beginner-3-day-gym-workout-plan",
  overload: "/blog/muscle-building/training-programs/what-is-progressive-overload",
  daysPerWeek:
    "/blog/muscle-building/beginner-muscle-building/how-many-days-a-week-should-i-work-out",
  weekPlan: "/blog/weight-loss/diet-meal-planning/indian-diet-plan-for-weight-loss",
  plan1500: "/blog/weight-loss/diet-meal-planning/1500-calorie-indian-diet-plan",
  vegProtein: "/blog/nutrition/protein/vegetarian-protein-sources-india",
  vegBreakfast: "/blog/nutrition/protein/high-protein-vegetarian-indian-breakfast",
  soya: "/blog/nutrition/protein/soya-chunks-protein",
  thali: "/blog/nutrition/calories-energy/calories-in-indian-thali",
  indianFoodsWl: "/blog/weight-loss/weight-loss-nutrition/best-indian-foods-for-weight-loss",
  steps: "/blog/weight-loss/walking-daily-activity/how-many-steps-a-day-to-lose-weight",
  strength: "/blog/weight-loss/strength-training-weight-loss/strength-training-for-fat-loss",
};

const SRC_COMPENDIUM: IntentSource = {
  title: "Ainsworth et al. (2011) — Compendium of Physical Activities: second update of codes and MET values (Med Sci Sports Exerc)",
  url: "https://pubmed.ncbi.nlm.nih.gov/21681120/",
  note: "MET values for walking, running and resistance training",
};
const SRC_PALUCH: IntentSource = {
  title: "Paluch et al. (2022) — Daily steps and all-cause mortality: meta-analysis of 15 cohorts (Lancet Public Health)",
  url: "https://pubmed.ncbi.nlm.nih.gov/35247352/",
  note: "Health benefits level off around 6,000–8,000 steps (60+) and 8,000–10,000 steps (under 60)",
};
const SRC_RICHARDSON: IntentSource = {
  title: "Richardson et al. (2008) — A meta-analysis of pedometer-based walking interventions and weight loss (Ann Fam Med)",
  url: "https://pubmed.ncbi.nlm.nih.gov/18195310/",
  note: "Walking programmes without diet change produced modest weight loss of about 0.05 kg a week",
};
const SRC_REYNOLDS: IntentSource = {
  title: "Reynolds et al. (2016) — Advice to walk after meals is more effective for lowering postprandial glycaemia (Diabetologia)",
  url: "https://pubmed.ncbi.nlm.nih.gov/27747394/",
  note: "Short walks after meals lowered blood sugar more than one daily walk",
};
const SRC_HALL: IntentSource = {
  title: "Hall et al. (2011) — Quantification of the effect of energy imbalance on bodyweight (Lancet)",
  url: "https://pubmed.ncbi.nlm.nih.gov/21872751/",
  note: "Why weight loss slows over time for the same deficit",
};
const SRC_CAVA: IntentSource = {
  title: "Cava, Yeat & Mittendorfer (2017) — Preserving healthy muscle during weight loss (Adv Nutr)",
  url: "https://pubmed.ncbi.nlm.nih.gov/28507015/",
  note: "Resistance training and adequate protein reduce muscle loss while dieting",
};
const SRC_WILLIS: IntentSource = {
  title: "Willis et al. (2012) — Effects of aerobic and/or resistance training on body mass and fat mass in overweight or obese adults (J Appl Physiol)",
  url: "https://pubmed.ncbi.nlm.nih.gov/23019316/",
  note: "Aerobic training lost more fat; resistance training added lean mass; combined gave the best body composition",
};
const SRC_MORTON: IntentSource = {
  title: "Morton et al. (2018) — Protein supplementation and resistance training-induced gains in muscle mass and strength (Br J Sports Med)",
  url: "https://pubmed.ncbi.nlm.nih.gov/28698222/",
  note: "Benefits plateau around 1.6 g protein per kg body weight per day",
};
const SRC_ELIA: IntentSource = {
  title: "Elia (1992) — Organ and tissue contribution to metabolic rate (Energy Metabolism: Tissue Determinants and Cellular Corollaries)",
  note: "Resting skeletal muscle burns about 13 kcal per kg per day",
};
const SRC_IFCT: IntentSource = {
  title: "Longvah et al. (2017) — Indian Food Composition Tables (ICMR-National Institute of Nutrition)",
  url: "https://www.nin.res.in/",
  note: "Calories and protein for the Indian foods in this guide",
};
const SRC_HUANG: IntentSource = {
  title: "Huang et al. (2016) — Vegetarian diets and weight reduction: a meta-analysis of randomized controlled trials (J Gen Intern Med)",
  url: "https://pubmed.ncbi.nlm.nih.gov/26138004/",
  note: "People on vegetarian diets lost about 2 kg more than controls",
};
const SRC_LEIDY: IntentSource = {
  title: "Leidy et al. (2015) — The role of protein in weight loss and maintenance (Am J Clin Nutr)",
  url: "https://pubmed.ncbi.nlm.nih.gov/25926512/",
  note: "Higher-protein diets improve fullness and help preserve lean mass",
};

const GUIDE = p(
  `<strong>Explore the guide:</strong> Calories, protein, training and habits all come together in the <a href="/weight-loss">weight loss guide</a>; calories in everyday Indian foods are in the <a href="/nutrition/calories">calories guide</a>.`,
);

export const batch16: IntentArticleDef[] = [
  {
    slug: "how-many-steps-a-day-to-lose-weight",
    title: "How Many Steps a Day to Lose Weight?",
    excerpt:
      "How many steps a day you need to lose weight, how many calories extra steps burn at your body weight, how long it takes, why steps alone rarely work, and a simple plan to build up from where you are.",
    quickAnswer: `There is no magic number, but 7,000–10,000 steps a day is a good target for most adults trying to lose weight. Each extra 1,000 steps burns only about 20–40 kcal above resting, so walking works best alongside a modest calorie cut from food. If you currently walk 3,000–4,000 steps, adding 4,000–5,000 a day plus eating 300–400 kcal less typically produces about 0.3–0.5 kg of weight loss a week at first. ${DISCLAIMER}`,
    categorySlug: "weight-loss",
    subcategorySlug: "walking-daily-activity",
    primaryKeyword: "how many steps a day to lose weight",
    metaTitle: "How Many Steps a Day to Lose Weight?",
    metaDescription:
      "How many steps a day to lose weight: calories burned per 1,000 steps by body weight, a realistic step target, how long it takes and a plan to build up.",
    tags: ["steps", "walking", "weight loss", "10000 steps", "NEAT"],
    topics: ["Weight Loss", "Walking"],
    featuredImageAlt: "Person checking a step count on a smartwatch during an evening walk",
    relatedSlugs: [
      "calories-burned-walking-10000-steps",
      "does-walking-help-you-lose-weight",
      "what-is-a-calorie-deficit",
      "why-am-i-not-losing-weight",
      "strength-training-for-fat-loss",
    ],
    dayOffset: 9,
    faq: [
      {
        question: "Can I lose weight just by walking 10,000 steps?",
        answer:
          "You can, if 10,000 steps is a big jump from your usual activity and you don't eat more to make up for it. But the effect is modest — studies of walking programmes without diet changes found about 0.05 kg lost per week. Pairing steps with a small food cut works much better.",
      },
      {
        question: "Does walking speed matter?",
        answer:
          "Less than you'd think. Faster walking burns slightly more per step and saves time, but the total distance matters most. Pick a pace you can sustain daily.",
      },
      {
        question: "Do treadmill steps count?",
        answer:
          "Yes. Steps on a treadmill burn similar calories to the same steps outside. Adding a slight incline raises the burn per minute.",
      },
      {
        question: "Is 5,000 steps a day enough?",
        answer:
          "It is better than 2,000–3,000, but it is still in the low-activity range. For both weight control and health, aim to work up to at least 7,000–8,000 steps a day.",
      },
    ],
    sources: [SRC_COMPENDIUM, SRC_RICHARDSON, SRC_PALUCH, SRC_REYNOLDS, SRC_HALL],
    body: [
      p(
        "Steps are the easiest form of exercise to track and the hardest to overdo. But a step target only helps weight loss if it raises your daily calorie burn above what you eat. Here is how many steps actually make a difference, and how to set a target that fits your starting point.",
      ),

      h2("How many calories do extra steps burn?"),
      p(
        "Calories burned per step depend mainly on body weight. These are the calories above resting, at a normal walking pace (about 4.8 km/h), using MET values from the Compendium of Physical Activities:",
      ),
      table(
        ["Body weight", "Per 1,000 steps", "Adding 5,000 steps a day", "Per week", "≈ Fat per month"],
        [
          ["60 kg", "≈ 22 kcal", "≈ 110 kcal", "≈ 770 kcal", "≈ 0.4 kg"],
          ["70 kg", "≈ 26 kcal", "≈ 130 kcal", "≈ 910 kcal", "≈ 0.5 kg"],
          ["80 kg", "≈ 29 kcal", "≈ 145 kcal", "≈ 1,000 kcal", "≈ 0.6 kg"],
          ["90 kg", "≈ 33 kcal", "≈ 165 kcal", "≈ 1,150 kcal", "≈ 0.6 kg"],
          ["100 kg", "≈ 37 kcal", "≈ 185 kcal", "≈ 1,290 kcal", "≈ 0.7 kg"],
        ],
      ),
      p(
        `The monthly figure is an upper estimate using about 7,700 kcal per kg of fat; real loss is usually a little lower because the body adapts. For your exact numbers, use the <a href="/steps-to-calories-calculator">steps to calories calculator</a>, and see <a href="${LINK.steps10k}">calories burned walking 10,000 steps</a> for the full breakdown.`,
      ),

      h2("So how many steps should you aim for?"),
      table(
        ["Your current steps", "Target for the next month", "Longer-term goal"],
        [
          ["Under 3,000", "5,000", "7,000–8,000"],
          ["3,000–5,000", "6,000–7,000", "8,000–10,000"],
          ["5,000–8,000", "8,000–10,000", "10,000+"],
          ["Over 8,000", "Keep it; focus on food and strength", "—"],
        ],
      ),
      p(
        "Increase by about 1,000–2,000 steps a week rather than jumping straight to 10,000. For health, large studies show benefits level off around 8,000–10,000 steps for adults under 60 and 6,000–8,000 for older adults. For weight loss, the increase from your current baseline matters more than hitting a round number.",
      ),

      h2("Why steps alone rarely work"),
      ul([
        "<strong>The burn is small.</strong> 5,000 extra steps burns about 130 kcal at 70 kg — less than one gulab jamun.",
        "<strong>People eat a little more.</strong> Appetite rises slightly with activity, and “I walked, so I've earned it” is common.",
        "<strong>Other movement drops.</strong> After a long walk, many people sit more for the rest of the day.",
      ]),
      p(
        `A meta-analysis of pedometer walking programmes without diet changes found average weight loss of only about 0.05 kg a week. That is why walking works best as part of a <a href="${LINK.deficit}">calorie deficit</a>, not as the whole plan — more in <a href="${LINK.walking}">does walking help you lose weight</a>.`,
      ),

      h2("Steps plus food: a worked example"),
      p(
        "Rahul weighs 80 kg, walks about 4,000 steps a day and maintains his weight on roughly 2,300 kcal.",
      ),
      ol([
        "He builds up to 9,000 steps a day: about +145 kcal burned.",
        "He drops sugar from three cups of chai, one roti at dinner and the evening namkeen: about −350 kcal eaten.",
        "Total daily deficit: about 500 kcal, or roughly 0.4–0.5 kg a week at first.",
      ]),
      p(
        `Neither change alone feels drastic, but together they add up. Work out your own numbers with <a href="${LINK.loseWeight}">how many calories to eat to lose weight</a>.`,
      ),

      h2("Easy ways to add 3,000–5,000 steps"),
      ul([
        "<strong>Walk 10–15 minutes after meals</strong> — about 1,000–1,500 steps each, and it lowers the blood-sugar rise after eating.",
        "Walk during phone calls and meetings you don't need a screen for.",
        "Take the stairs and get off the metro or bus one stop early.",
        "Walk to the market, the chemist or the chai stall instead of driving.",
        "Add one 30-minute evening walk: about 3,000–3,500 steps.",
      ]),
      p("Roughly, 1,000 steps takes 9–10 minutes and covers about 0.7 km at a normal pace."),

      h2("When the scale doesn't move"),
      p(
        `If you have hit your step target for three to four weeks without any change in weight or waist size, the deficit is not there yet. Check portion sizes, oil, drinks and weekend eating — see <a href="${LINK.notLosing}">why you might not be losing weight</a>. Adding <a href="${LINK.strength}">strength training</a> two to three times a week also helps keep muscle while you lose fat.`,
      ),
      toolCta("/steps-to-calories-calculator", "steps to calories calculator", "See what your daily steps burn at your weight with the"),
      GUIDE,

      takeaways([
        "Aim for 7,000–10,000 steps a day, building up by 1,000–2,000 a week.",
        "Each extra 1,000 steps burns about 20–40 kcal, depending on body weight.",
        "Steps alone produce slow loss; pair them with a 300–500 kcal food cut.",
        "Short walks after meals are an easy way to add steps and help blood sugar.",
      ]),
      p(DISCLAIMER),
    ].join("\n"),
  },

  {
    slug: "strength-training-for-fat-loss",
    title: "Strength Training for Fat Loss: Does It Work?",
    excerpt:
      "Does strength training help you lose fat? What lifting actually burns, why it protects muscle while you diet, how it compares with cardio, and a simple 3-day beginner plan for fat loss.",
    quickAnswer: `Yes, but not mainly by burning calories. A 45-minute weights session burns about 130–260 kcal for a 70 kg person — similar to a brisk walk. Its real value is protecting muscle while you are in a calorie deficit, so more of the weight you lose is fat, and you look and feel stronger at the end. The best fat-loss approach combines a moderate calorie deficit, enough protein, strength training 2–4 days a week and daily walking. ${DISCLAIMER}`,
    categorySlug: "weight-loss",
    subcategorySlug: "strength-training-weight-loss",
    primaryKeyword: "strength training for fat loss",
    metaTitle: "Strength Training for Fat Loss: Does It Work?",
    metaDescription:
      "Strength training for fat loss: what lifting burns, why it protects muscle in a deficit, weights vs cardio, and a simple 3-day beginner fat-loss workout plan.",
    tags: ["strength training", "fat loss", "weight training", "resistance training", "cardio"],
    topics: ["Weight Loss", "Strength Training"],
    featuredImageAlt: "Person doing a goblet squat with a dumbbell in a gym",
    relatedSlugs: [
      "beginner-3-day-gym-workout-plan",
      "protein-for-weight-loss",
      "what-is-progressive-overload",
      "how-many-steps-a-day-to-lose-weight",
      "how-to-lose-belly-fat",
    ],
    dayOffset: 9,
    faq: [
      {
        question: "Is cardio or weights better for fat loss?",
        answer:
          "Cardio burns more calories per session, while weights protect muscle. In a well-known trial, aerobic training lost more fat, resistance training added lean mass, and combining both gave the best overall change in body composition. Do both if you can, and let diet create most of the deficit.",
      },
      {
        question: "Will lifting weights make women bulky?",
        answer:
          "No. Building large muscles takes years of focused training and eating in a surplus. In a calorie deficit, lifting mainly helps you keep muscle and look firmer as you lose fat.",
      },
      {
        question: "Why is my weight not dropping even though I'm lifting?",
        answer:
          "Beginners can gain a little muscle while losing fat, so the scale may move slowly. Track your waist measurement and progress photos as well. If neither changes in four weeks, your calorie deficit needs adjusting.",
      },
      {
        question: "Should I do high reps for fat loss?",
        answer:
          "No need. Fat loss comes from the calorie deficit, not from the rep range. Working in the 6–15 rep range with good form and gradually heavier weights builds and keeps muscle best.",
      },
    ],
    sources: [SRC_CAVA, SRC_WILLIS, SRC_MORTON, SRC_COMPENDIUM, SRC_ELIA, SRC.acsm],
    body: [
      p(
        "Many people trying to lose weight skip the weights and spend all their gym time on the treadmill. That is a missed opportunity. Strength training does not burn a huge number of calories, but it changes what kind of weight you lose — and that matters for how you look, how strong you are and how well you keep the weight off.",
      ),

      h2("How many calories does strength training burn?"),
      p("Estimates for a 70 kg person, above resting, using Compendium MET values:"),
      table(
        ["45-minute session", "Calories burned"],
        [
          ["Moderate weight training", "≈ 130 kcal"],
          ["Hard weight training or circuits", "≈ 260 kcal"],
          ["Brisk walking (5.6 km/h)", "≈ 175 kcal"],
          ["Jogging (8 km/h)", "≈ 380 kcal"],
        ],
      ),
      p(
        "So lifting burns about as much as walking, and less than running. If burning calories were the only goal, it would not be the best choice.",
      ),

      h2("Why strength training still matters for fat loss"),
      h3("It protects your muscle"),
      p(
        "When you eat less, your body breaks down some muscle as well as fat. Research reviews consistently find that resistance training — together with enough protein — greatly reduces that muscle loss. Keeping muscle means the weight you lose is mostly fat, so you end up leaner rather than just smaller.",
      ),
      h3("It keeps you strong and functional"),
      p(
        "Dieting without lifting often leaves people weaker and more tired. Lifting keeps strength up, which makes daily life, sport and future training easier.",
      ),
      h3("The metabolism boost is small"),
      p(
        "A kilogram of muscle burns about 13 kcal a day at rest. Gaining 2 kg of muscle adds about 25 kcal a day — helpful, but not a reason to expect lifting to melt fat on its own.",
      ),

      h2("Weights vs cardio: what the research shows"),
      p(
        "In the STRRIDE trial, overweight adults did aerobic training, resistance training or both for eight months. Aerobic training lost the most fat and body weight. Resistance training increased lean mass. The combined group got the best of both — fat loss plus muscle gain. The takeaway: use walking or cardio to add to your calorie burn, and weights to keep muscle.",
      ),

      h2("A simple 3-day fat-loss strength plan"),
      p(
        "Train three non-consecutive days a week, alternating workouts A and B. Do 2–3 sets of each exercise and stop each set with 1–3 reps left in the tank.",
      ),
      table(
        ["Workout A", "Sets × reps", "Workout B", "Sets × reps"],
        [
          [`<a href="/exercises/legs/back-squat">Squat</a> (or goblet squat)`, "3 × 8–12", `<a href="/exercises/legs/walking-lunge">Walking lunge</a>`, "3 × 10 each leg"],
          [`<a href="/exercises/chest/push-ups">Push-ups</a> (or bench press)`, "3 × 8–12", `<a href="/exercises/back/lat-pulldown">Lat pulldown</a>`, "3 × 10–12"],
          [`<a href="/exercises/back/seated-cable-row">Seated cable row</a>`, "3 × 10–12", `<a href="/exercises/shoulders/dumbbell-shoulder-press">Dumbbell shoulder press</a>`, "3 × 10–12"],
          [`<a href="/exercises/legs/romanian-deadlift">Romanian deadlift</a>`, "2 × 10", `<a href="/exercises/legs/leg-curl">Leg curl</a>`, "2 × 12"],
          [`<a href="/exercises/core/plank">Plank</a>`, "3 × 30–45 s", `<a href="/exercises/core/dead-bug">Dead bug</a>`, "3 × 8 each side"],
        ],
      ),
      p(
        `Add a little weight or a rep each week when you can — that is <a href="${LINK.overload}">progressive overload</a>, and it is what keeps muscle while you diet. For a fuller version with warm-ups and progressions, see the <a href="${LINK.threeDay}">beginner 3-day gym workout plan</a>.`,
      ),

      h2("A sample fat-loss week"),
      table(
        ["Day", "Training"],
        [
          ["Monday", "Workout A"],
          ["Tuesday", "30–45 minute walk"],
          ["Wednesday", "Workout B"],
          ["Thursday", "30–45 minute walk"],
          ["Friday", "Workout A"],
          ["Saturday", "Longer walk, sport or a cardio session"],
          ["Sunday", "Rest or easy walk"],
        ],
      ),
      p(
        `Aim for 7,000–10,000 steps on most days as well — see <a href="${LINK.steps}">how many steps a day to lose weight</a>. More training days can work, as covered in <a href="${LINK.daysPerWeek}">how many days a week to work out</a>.`,
      ),

      h2("Get the diet side right"),
      ul([
        `<strong>Moderate deficit:</strong> eat about 10–20% below maintenance; very aggressive cuts cost more muscle. Start with <a href="${LINK.deficit}">what a calorie deficit is</a>.`,
        `<strong>Enough protein:</strong> about 1.6 g per kg of body weight a day while dieting and lifting. See <a href="${LINK.proteinWl}">protein for weight loss</a>.`,
        "<strong>Sleep:</strong> 7–9 hours helps recovery and appetite control.",
      ]),
      p(
        `Track your waist and strength as well as body weight — beginners can lose fat and gain a little muscle at the same time, which makes the scale move slowly. Fat loss is also never targeted to one area; see <a href="${LINK.bellyFat}">how to lose belly fat</a>.`,
      ),
      toolCta("/calorie-deficit-calculator", "calorie deficit calculator", "Set a sustainable fat-loss target with the"),
      GUIDE,

      takeaways([
        "Strength training burns about as much as walking — its main job is protecting muscle.",
        "Combine weights 2–4 days a week with daily walking and a moderate calorie deficit.",
        "Use 2–3 sets of 6–15 reps, adding weight or reps over time.",
        "Eat about 1.6 g protein per kg and judge progress by waist and strength, not just the scale.",
      ]),
      p(DISCLAIMER),
    ].join("\n"),
  },

  {
    slug: "how-to-lose-weight-on-a-vegetarian-diet",
    title: "How to Lose Weight on a Vegetarian Indian Diet",
    excerpt:
      "How to lose weight on a vegetarian Indian diet: why typical veg plates make it hard, the plate method, vegetarian protein sources per serving, simple swaps with calories saved, a sample day and common mistakes.",
    quickAnswer: `You can lose weight on a vegetarian Indian diet by eating about 10–20% below your maintenance calories and fixing the two usual problems: too little protein and too much oil, sugar and refined carbs. Build each plate as half vegetables, a quarter protein (dal, paneer, curd, soya or tofu) and a quarter roti or rice, and cook with about 1 teaspoon of oil per person per dish. Aim for 1.2–1.6 g protein per kg of body weight. ${DISCLAIMER}`,
    categorySlug: "weight-loss",
    subcategorySlug: "weight-loss-nutrition",
    primaryKeyword: "vegetarian indian diet for weight loss",
    metaTitle: "How to Lose Weight on a Vegetarian Indian Diet",
    metaDescription:
      "How to lose weight on a vegetarian Indian diet: the plate method, protein per serving, swaps that save 100–200 kcal, a sample day and common mistakes.",
    tags: ["vegetarian", "weight loss", "Indian diet", "protein", "plate method"],
    topics: ["Weight Loss", "Indian Nutrition", "Vegetarian"],
    featuredImageAlt: "Vegetarian Indian plate with dal, paneer sabzi, salad, curd and two rotis",
    relatedSlugs: [
      "indian-diet-plan-for-weight-loss",
      "vegetarian-protein-sources-india",
      "protein-for-weight-loss",
      "high-protein-vegetarian-indian-breakfast",
      "best-indian-foods-for-weight-loss",
    ],
    dayOffset: 9,
    faq: [
      {
        question: "Is a vegetarian diet good for weight loss?",
        answer:
          "It can be. A meta-analysis of randomised trials found people on vegetarian diets lost about 2 kg more than those on comparison diets. But a vegetarian diet heavy in fried snacks, sweets and refined carbs won't lead to weight loss — the calorie deficit and food quality still decide the result.",
      },
      {
        question: "How do vegetarians get enough protein for weight loss?",
        answer:
          "Include a protein food at every meal: dal or rajma, paneer, tofu, soya chunks, curd or hung curd, and milk. Most vegetarians reach 1.2–1.6 g per kg with three meals built this way plus one protein snack; whey can fill gaps if needed.",
      },
      {
        question: "Should I stop eating rice and roti?",
        answer:
          "No. Keep them in measured portions — about 2 rotis or 1 katori of cooked rice per meal for most people — and fill the rest of the plate with vegetables and protein.",
      },
      {
        question: "Are fasting foods like sabudana good for weight loss?",
        answer:
          "Not usually. Sabudana khichdi, vadas and fried fasting snacks are high in starch and oil and low in protein. On fasting days, choose curd, fruit, paneer and roasted makhana in sensible portions.",
      },
    ],
    sources: [SRC_IFCT, SRC_HUANG, SRC_LEIDY, SRC_MORTON, SRC.icmr],
    body: [
      p(
        "Vegetarian Indian food can be some of the healthiest in the world — dal, sabzi, curd, whole grains and fruit. Yet many vegetarians struggle to lose weight. The problem is rarely the food itself; it is the proportions. Here is how to keep eating the food you love and still lose fat.",
      ),

      h2("Why it can be harder on a typical veg diet"),
      ul([
        "<strong>Low protein.</strong> A typical day of paratha, roti-sabzi and dal-rice often gives just 40–50 g of protein — less than 1 g per kg for many adults. Low protein makes it harder to stay full and keep muscle.",
        "<strong>Carb-heavy plates.</strong> Three or four rotis plus rice, with a small katori of dal, is mostly starch.",
        "<strong>Hidden oil and ghee.</strong> Tadkas, parathas and restaurant gravies add 200–400 kcal a day without people noticing.",
        "<strong>Snacks and sugar.</strong> Namkeen, biscuits, sweet chai and mithai add up quickly.",
      ]),

      h2("Step 1: eat in a small calorie deficit"),
      p(
        `Weight loss still comes down to eating less than you burn. Aim for 10–20% below your maintenance calories — for many women that is about 1,300–1,600 kcal and for many men 1,700–2,100 kcal. Find your number with the <a href="/calorie-deficit-calculator">calorie deficit calculator</a>, and see <a href="${LINK.deficit}">what a calorie deficit is</a> if this is new to you.`,
      ),

      h2("Step 2: build every plate the same way"),
      table(
        ["Part of the plate", "What to put there", "Typical portion"],
        [
          ["Half", "Vegetables — sabzi, salad, raita vegetables", "1–2 katoris"],
          ["Quarter", "Protein — dal, rajma, chana, paneer, tofu, soya, curd", "1 katori dal or 50–100 g paneer/tofu"],
          ["Quarter", "Grain — roti, rice, millet roti", "2 rotis or 1 katori rice"],
          ["Fat", "Oil or ghee in cooking", "≈ 1 tsp per person per dish"],
        ],
      ),

      h2("Step 3: hit your protein target"),
      p(
        `Aim for 1.2–1.6 g protein per kg of body weight a day — about 70–100 g for a 60 kg person. Higher protein keeps you fuller and helps keep muscle while you lose weight. Per typical serving (IFCT 2017):`,
      ),
      table(
        ["Food (serving)", "Protein", "Calories"],
        [
          ["Soya chunks, 30 g dry", "≈ 15.6 g", "≈ 104 kcal"],
          ["Firm tofu, 100 g", "≈ 17 g", "≈ 144 kcal"],
          ["Hung curd, 150 g", "≈ 13.5 g", "≈ 150 kcal"],
          ["Paneer, 50 g", "≈ 9.4 g", "≈ 129 kcal"],
          ["Rajma, 40 g dry (1 katori cooked)", "≈ 8 g", "≈ 120 kcal"],
          ["Moong dal, 30 g dry (1 katori cooked)", "≈ 7.2 g", "≈ 98 kcal"],
          ["Roasted chana, 30 g", "≈ 6.5 g", "≈ 110 kcal"],
          ["Milk, 200 ml", "≈ 6.5 g", "≈ 146 kcal"],
        ],
      ),
      p(
        `More options in <a href="${LINK.vegProtein}">vegetarian protein sources in India</a> and <a href="${LINK.soya}">soya chunks protein</a>; breakfast is often the weakest meal, so try a <a href="${LINK.vegBreakfast}">high-protein vegetarian breakfast</a>.`,
      ),

      h2("Step 4: make easy swaps"),
      table(
        ["Instead of", "Try", "Saves about"],
        [
          ["2 parathas with ghee", "2 phulkas", "≈ 200 kcal"],
          ["50 g namkeen", "30 g roasted chana", "≈ 160 kcal, +6 g protein"],
          ["3 cups chai with 2 tsp sugar each", "Same chai, no sugar", "≈ 95 kcal"],
          ["2 katoris rice", "1 katori rice + extra sabzi", "≈ 130 kcal"],
          ["2–3 tsp oil per person in sabzi", "1 tsp oil", "≈ 45–90 kcal"],
          ["1 gulab jamun after dinner", "1 piece of fruit", "≈ 80–100 kcal"],
        ],
      ),

      h2("A sample day (≈ 1,430 kcal, ≈ 71 g protein)"),
      table(
        ["Meal", "What to eat", "Calories", "Protein"],
        [
          ["Breakfast", "2 moong chillas (50 g dal) with 50 g paneer, 1 tsp oil", "≈ 340 kcal", "≈ 21 g"],
          ["Lunch", "2 phulkas, 1 katori dal, sabzi (1 tsp oil), 150 g curd", "≈ 480 kcal", "≈ 20 g"],
          ["Snack", "Tea with 100 ml milk, no sugar + 30 g roasted chana, 1 apple", "≈ 265 kcal", "≈ 10 g"],
          ["Dinner", "Soya chunk curry (30 g, 1 tsp oil), 1 katori rice, salad", "≈ 345 kcal", "≈ 20 g"],
        ],
      ),
      p(
        `Need a full week? Follow the <a href="${LINK.weekPlan}">7-day vegetarian Indian diet plan for weight loss</a> or the <a href="${LINK.plan1500}">1,500 calorie Indian diet plan</a>.`,
      ),

      h2("Common mistakes"),
      ul([
        "Treating “healthy” foods as free — dry fruits, ghee and jaggery are still calorie-dense.",
        "Fasting days built around sabudana, aloo and fried snacks.",
        `Restaurant and wedding meals: one thali can pass 1,000 kcal — see <a href="${LINK.thali}">calories in an Indian thali</a>.`,
        "Juices, lassi with sugar and sweetened coffee.",
        "Skipping strength training and losing muscle along with fat.",
      ]),
      p(
        `Exercise helps too: walking and <a href="${LINK.strength}">strength training for fat loss</a> make the deficit easier and protect muscle. For food ideas, see <a href="${LINK.indianFoodsWl}">the best Indian foods for weight loss</a>.`,
      ),
      toolCta("/protein-calculator", "protein calculator", "Find your daily protein target with the"),
      GUIDE,

      takeaways([
        "Eat 10–20% below maintenance; the vegetarian diet itself doesn't cause weight loss.",
        "Plate: half vegetables, a quarter protein, a quarter roti or rice, about 1 tsp oil.",
        "Aim for 1.2–1.6 g protein per kg using dal, paneer, tofu, soya, curd and milk.",
        "Small swaps — sugar, namkeen, parathas, oil — each save 100–200 kcal a day.",
      ]),
      p(DISCLAIMER),
    ].join("\n"),
  },
];
