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
  proteinMuscle:
    "/blog/muscle-building/muscle-building-nutrition/how-much-protein-to-build-muscle",
  overload: "/blog/muscle-building/training-programs/what-is-progressive-overload",
  buildTime:
    "/blog/muscle-building/muscle-growth-hypertrophy/how-long-does-it-take-to-build-muscle",
  gymDiet: "/blog/muscle-building/beginner-muscle-building/beginner-gym-diet-plan",
  creatine: "/blog/muscle-building/muscle-building-nutrition/is-creatine-safe",
  proteinTiming: "/blog/nutrition/sports-nutrition/protein-before-or-after-workout",
  highProtein: "/blog/nutrition/protein/best-high-protein-indian-foods",
  vegProtein: "/blog/nutrition/protein/vegetarian-protein-sources-india",
  maintenance: "/blog/nutrition/calories-energy/maintenance-calories",
  gainSkinny: "/blog/muscle-building/bulking/how-to-gain-weight-for-skinny-guys",
  threeDay: "/blog/muscle-building/training-programs/beginner-3-day-gym-workout-plan",
  sets: "/blog/muscle-building/muscle-growth-hypertrophy/how-many-sets-per-muscle-per-week",
  bulking: "/blog/muscle-building/bulking/bulking-on-an-indian-diet",
  ppl: "/blog/muscle-building/training-programs/push-pull-legs-for-beginners",
  daysPerWeek:
    "/blog/muscle-building/beginner-muscle-building/how-many-days-a-week-should-i-work-out",
};

const EX = {
  squat: `<a href="/exercises/legs/back-squat">back squat</a>`,
  legPress: `<a href="/exercises/legs/leg-press">leg press</a>`,
  rdl: `<a href="/exercises/legs/romanian-deadlift">Romanian deadlift</a>`,
  splitSquat: `<a href="/exercises/legs/bulgarian-split-squat">Bulgarian split squat</a>`,
  legCurl: `<a href="/exercises/legs/leg-curl">leg curl</a>`,
  calfRaise: `<a href="/exercises/legs/standing-calf-raise">standing calf raise</a>`,
  bench: `<a href="/exercises/chest/barbell-bench-press">barbell bench press</a>`,
  inclineDb: `<a href="/exercises/chest/incline-dumbbell-press">incline dumbbell press</a>`,
  pushUps: `<a href="/exercises/chest/push-ups">push-ups</a>`,
  pulldown: `<a href="/exercises/back/lat-pulldown">lat pulldown</a>`,
  cableRow: `<a href="/exercises/back/seated-cable-row">seated cable row</a>`,
  barbellRow: `<a href="/exercises/back/barbell-row">barbell row</a>`,
  pullUp: `<a href="/exercises/back/pull-up">pull-up</a>`,
  facePull: `<a href="/exercises/back/face-pull">face pull</a>`,
  ohp: `<a href="/exercises/shoulders/overhead-press">overhead press</a>`,
  dbPress: `<a href="/exercises/shoulders/dumbbell-shoulder-press">dumbbell shoulder press</a>`,
  lateral: `<a href="/exercises/shoulders/lateral-raise">lateral raise</a>`,
  curl: `<a href="/exercises/arms/barbell-curl">barbell curl</a>`,
  hammer: `<a href="/exercises/arms/hammer-curl">hammer curl</a>`,
  pushdown: `<a href="/exercises/arms/triceps-pushdown">triceps pushdown</a>`,
  plank: `<a href="/exercises/core/plank">plank</a>`,
};

const SRC_IFCT: IntentSource = {
  title: "Longvah et al. (2017) — Indian Food Composition Tables (ICMR-National Institute of Nutrition)",
  url: "https://www.nin.res.in/",
  note: "Calories and protein for the Indian foods in this guide",
};
const SRC_VOLUME: IntentSource = {
  title: "Schoenfeld, Ogborn & Krieger (2017) — Dose-response relationship between weekly resistance training volume and muscle mass (J Sports Sci)",
  url: "https://pubmed.ncbi.nlm.nih.gov/27433992/",
  note: "Each extra weekly set adds growth; 10+ sets per muscle beat fewer than 5",
};
const SRC_FREQ: IntentSource = {
  title: "Schoenfeld, Grgic & Krieger (2019) — How many times per week should a muscle be trained to maximize hypertrophy? (J Sports Sci)",
  url: "https://pubmed.ncbi.nlm.nih.gov/30558493/",
  note: "With weekly volume equal, frequency matters little; splitting volume over 2+ sessions is practical",
};
const SRC_FREQ_2016: IntentSource = {
  title: "Schoenfeld, Ogborn & Krieger (2016) — Effects of resistance training frequency on muscle hypertrophy (Sports Med)",
  url: "https://pubmed.ncbi.nlm.nih.gov/27102172/",
  note: "Training each muscle at least twice a week outperformed once a week",
};
const SRC_ACSM: IntentSource = {
  title: "ACSM (2009) — Progression models in resistance training for healthy adults (Med Sci Sports Exerc)",
  url: "https://pubmed.ncbi.nlm.nih.gov/19204579/",
  note: "Beginner frequency, load and rep-range recommendations",
};
const SRC_WHO_PA: IntentSource = {
  title: "WHO (2020) — Guidelines on physical activity and sedentary behaviour",
  url: "https://www.who.int/publications/i/item/9789240015128",
  note: "150–300 min moderate activity plus muscle-strengthening on 2+ days a week",
};
const SRC_MORTON: IntentSource = {
  title: "Morton et al. (2018) — Protein supplementation and resistance training-induced gains in muscle mass: meta-analysis (Br J Sports Med)",
  url: "https://pubmed.ncbi.nlm.nih.gov/28698222/",
  note: "Benefit plateaus around 1.6 g/kg/day",
};
const SRC_IRAKI: IntentSource = {
  title: "Iraki et al. (2019) — Nutrition recommendations for bodybuilders in the off-season (Sports)",
  url: "https://pubmed.ncbi.nlm.nih.gov/31247944/",
  note: "Modest surplus and a slow rate of weight gain to limit fat gain",
};
const SRC_SLATER: IntentSource = {
  title: "Slater et al. (2019) — Is an energy surplus required to maximize muscle hypertrophy? (Front Nutr)",
  url: "https://pubmed.ncbi.nlm.nih.gov/31482093/",
  note: "Surplus size and fat gain during bulking",
};

const GUIDE = p(
  `<strong>Explore the guide:</strong> Training, nutrition and recovery are all collected in the <a href="/muscle-building">muscle building guide</a>; for food sources and targets, see the <a href="/nutrition/protein">protein guide</a>.`,
);

export const batch13: IntentArticleDef[] = [
  {
    slug: "how-to-gain-weight-for-skinny-guys",
    title: "How to Gain Weight for Skinny Guys (Indian Diet Plan)",
    excerpt:
      "A practical weight-gain plan for skinny guys in India: how many extra calories to eat, calorie-dense Indian foods, a 2,500 kcal sample day, a 3-day gym routine and how fast to gain without just getting fat.",
    quickAnswer: `To gain weight as a skinny guy, eat about 300–500 kcal more than your maintenance calories every day, get 1.6–2 g of protein per kg of body weight, and lift weights three times a week. Aim to gain about 0.25–0.5 kg a week. Calorie-dense Indian foods such as milk, peanuts, ghee, bananas, paneer, dates and rice make the surplus easier when your appetite is small. ${DISCLAIMER}`,
    categorySlug: "muscle-building",
    subcategorySlug: "bulking",
    primaryKeyword: "how to gain weight for skinny guys",
    metaTitle: "How to Gain Weight for Skinny Guys (India)",
    metaDescription:
      "How skinny guys can gain weight the right way: calorie surplus, protein, calorie-dense Indian foods, a 2,500 kcal sample day and a simple 3-day gym plan.",
    tags: ["weight gain", "skinny guys", "bulking", "Indian diet", "muscle gain"],
    topics: ["Muscle Building", "Indian Nutrition", "Bulking"],
    featuredImageAlt:
      "Calorie-dense Indian foods for weight gain: milk, banana, peanuts, paneer, rice, roti and dates",
    relatedSlugs: [
      "bulking-on-an-indian-diet",
      "beginner-3-day-gym-workout-plan",
      "how-much-protein-to-build-muscle",
      "beginner-gym-diet-plan",
      "maintenance-calories",
    ],
    dayOffset: 9,
    faq: [
      {
        question: "How fast can a skinny guy gain weight?",
        answer:
          "About 0.25–0.5 kg a week is a good pace for most beginners, or 1–2 kg a month. Faster gain is possible, but more of it will be fat.",
      },
      {
        question: "Do I need a mass gainer?",
        answer:
          "No. A mass gainer is just calories in a tub — mostly sugar or maltodextrin plus some protein. A home-made shake of milk, banana, peanut butter and oats gives similar calories for much less money.",
      },
      {
        question: "Why can't I gain weight even though I eat a lot?",
        answer:
          "Most people who say this eat a lot at one or two meals and much less the rest of the week. Track your food for a week and weigh yourself three times a week. If you really are eating well above your maintenance and still losing weight, see a doctor to rule out thyroid, digestive or other medical causes.",
      },
      {
        question: "Can I gain weight on a vegetarian diet?",
        answer:
          "Yes. Milk, curd, paneer, dal, rajma, soya, peanuts and ghee make it easy to eat enough calories and protein without meat.",
      },
    ],
    sources: [SRC_IFCT, SRC_IRAKI, SRC_MORTON, SRC_ACSM, SRC.icmr],
    body: [
      p(
        "If you are naturally thin, gaining weight can feel harder than losing it is for everyone else. You fill up quickly, forget to eat when you are busy, and a big meal on Sunday does not make up for skipped meals on weekdays. The fix is not a magic food or supplement. It is eating a little more than you burn, every day, and giving your body a reason to turn those calories into muscle.",
      ),

      h2("Step 1: eat 300–500 kcal above maintenance"),
      p(
        `Your maintenance calories are what you burn in a day. A thin, active young man in India typically burns 2,100–2,600 kcal; find your own estimate with the <a href="/calorie-calculator">calorie calculator</a> and read <a href="${LINK.maintenance}">what maintenance calories are</a>. Then add 300–500 kcal.`,
        "Weigh yourself at the same time three mornings a week and compare weekly averages:",
      ),
      table(
        ["Weekly change", "What it means", "What to do"],
        [
          ["Under 0.2 kg", "Not enough surplus", "Add 200 kcal a day (a glass of milk and a banana)"],
          ["0.25–0.5 kg", "On track", "Keep going"],
          ["Over 0.75 kg (after week 2)", "Gaining more fat than needed", "Remove 200 kcal a day"],
        ],
      ),
      p(
        "Expect a 1–2 kg jump in the first week or two. That is mostly extra food, water and stored carbohydrate in your muscles, not fat.",
      ),

      h2("Step 2: get enough protein"),
      p(
        `Aim for 1.6–2 g of protein per kg of body weight — about 95–120 g a day for a 60 kg man. Research shows the muscle-building benefit levels off around 1.6 g/kg for most people. Spread it across three or four meals. See <a href="${LINK.proteinMuscle}">how much protein you need to build muscle</a> and the <a href="${LINK.highProtein}">best high-protein Indian foods</a>.`,
      ),

      h2("Step 3: use calorie-dense Indian foods"),
      p(
        "When your appetite is small, choose foods that pack a lot of calories into a small volume. Values from IFCT 2017:",
      ),
      table(
        ["Food", "Serving", "Calories", "Protein"],
        [
          ["<a href=\"/foods/peanuts\">Peanuts</a>", "1 handful (30 g)", "156 kcal", "7.1 g"],
          ["Peanut butter", "2 tablespoons (32 g)", "≈ 190 kcal", "≈ 8 g"],
          ["<a href=\"/foods/almonds\">Almonds</a>", "1 handful (30 g)", "183 kcal", "5.5 g"],
          ["<a href=\"/foods/ghee\">Ghee</a>", "1 teaspoon (5 g)", "44 kcal", "0 g"],
          ["<a href=\"/foods/cow-milk\">Whole milk</a>", "1 glass (200 ml)", "146 kcal", "6.5 g"],
          ["<a href=\"/foods/banana\">Banana</a>", "1 medium", "105 kcal", "1.2 g"],
          ["<a href=\"/foods/dates\">Dates</a>", "3 dates (24 g)", "75 kcal", "0.6 g"],
          ["<a href=\"/foods/paneer\">Paneer</a>", "100 g", "258 kcal", "18.9 g"],
          ["<a href=\"/foods/rice\">Rice</a>", "1½ katori cooked (75 g raw)", "267 kcal", "6.0 g"],
          ["<a href=\"/foods/roti\">Roti</a>", "1 medium (30 g atta)", "96 kcal", "3.2 g"],
        ],
      ),
      h3("Easy ways to add 300–500 kcal"),
      ul([
        "A glass of milk with breakfast and another before bed (≈ 290 kcal).",
        "A teaspoon of ghee on your dal and rice at lunch and dinner (≈ 90 kcal).",
        "A handful of peanuts or almonds as an evening snack (≈ 155–185 kcal).",
        "One extra roti at each main meal (≈ 190 kcal).",
        "Drink some of your calories: liquids fill you up less than solid food.",
      ]),

      h2("Sample day: about 2,500 kcal and 100 g protein"),
      p(
        "Suitable for a 55–60 kg beginner whose maintenance is around 2,100–2,200 kcal. Quantities are starting points; scale them to your weigh-ins.",
      ),
      table(
        ["Meal", "What to eat", "Calories", "Protein"],
        [
          ["Breakfast shake", "300 ml whole milk, 1 banana, 2 tbsp peanut butter, 30 g oats", "≈ 630 kcal", "≈ 23 g"],
          ["Lunch", "3 rotis, 1 katori rajma, 1 katori sabzi, 1 tsp ghee, 1 katori curd", "≈ 640 kcal", "≈ 24 g"],
          ["Evening snack", "30 g peanuts, 1 glass milk, 3 dates", "≈ 375 kcal", "≈ 14 g"],
          ["Dinner", "1½ katori rice, 100 g paneer bhurji, 1 katori moong dal, salad", "≈ 700 kcal", "≈ 32 g"],
          ["Before bed", "1 glass milk", "≈ 145 kcal", "≈ 6.5 g"],
          ["<strong>Total</strong>", "", "<strong>≈ 2,490 kcal</strong>", "<strong>≈ 100 g</strong>"],
        ],
      ),
      p(
        `Eat eggs or chicken? Swap the paneer for 150 g chicken breast (≈ 250 kcal, 33 g protein) or add a 3-egg omelette at breakfast (≈ 280 kcal, 27 g protein). For a bigger, higher-calorie plan, see <a href="${LINK.bulking}">bulking on an Indian diet</a>.`,
      ),

      h2("Step 4: lift weights three times a week"),
      p(
        `Without training, a surplus mostly becomes fat. With it, a good share becomes muscle. Beginners do best with three full-body sessions a week built on big compound lifts — ${EX.squat}, ${EX.bench}, ${EX.pulldown}, ${EX.cableRow} and ${EX.dbPress} — adding a little weight or a rep each week. Our <a href="${LINK.threeDay}">beginner 3-day gym workout plan</a> lays it out session by session, and <a href="${LINK.overload}">progressive overload</a> explains how to keep progressing.`,
      ),

      h2("Habits that make the difference"),
      ol([
        "Eat four or five times a day; set reminders if you forget meals.",
        "Start each meal with the protein and the carb, and leave salad for last.",
        "Keep easy snacks ready: peanuts, chikki, bananas, milk.",
        "Sleep 7–9 hours; growth and appetite both suffer without it.",
        "Be patient: 5–8 kg in 6 months is excellent progress for a beginner.",
      ]),
      p(
        `For a realistic picture of how quickly the muscle part arrives, read <a href="${LINK.buildTime}">how long it takes to build muscle</a>.`,
      ),

      h2("When to see a doctor"),
      p(
        "If you are losing weight without trying, have ongoing stomach problems, unusual tiredness, a racing heart or a very small appetite that does not improve, see a doctor before starting a weight-gain plan. Thyroid problems, diabetes, digestive conditions and infections can all cause weight loss.",
      ),
      toolCta("/calorie-calculator", "calorie calculator", "Find your maintenance and surplus target with the"),

      GUIDE,
      takeaways([
        "Eat 300–500 kcal above maintenance and aim for 0.25–0.5 kg a week.",
        "Get 1.6–2 g of protein per kg of body weight, spread over the day.",
        "Use calorie-dense foods: milk, peanuts, ghee, bananas, paneer, dates.",
        "Lift weights three times a week so the extra calories build muscle.",
        "Adjust by 200 kcal based on weekly average weigh-ins.",
      ]),
      p(DISCLAIMER),
    ].join("\n"),
  },

  {
    slug: "beginner-3-day-gym-workout-plan",
    title: "Beginner 3-Day Gym Workout Plan (Full Body)",
    excerpt:
      "A simple 3-day full-body gym plan for beginners: two alternating workouts, exact sets and reps, how to choose weights, how to progress each week and what to do on rest days.",
    quickAnswer: `A good beginner gym plan is three full-body workouts a week on non-consecutive days (for example Monday, Wednesday, Friday), alternating Workout A and Workout B. Each session has five or six exercises of 2–3 sets in the 6–15 rep range, stopping 1–3 reps short of failure. Add a rep or a little weight every week. This trains every muscle two or three times a week, which suits beginners better than a one-muscle-a-day split. ${DISCLAIMER}`,
    categorySlug: "muscle-building",
    subcategorySlug: "training-programs",
    primaryKeyword: "beginner 3 day gym workout plan",
    metaTitle: "Beginner 3-Day Gym Workout Plan (Full Body)",
    metaDescription:
      "A 3-day full-body gym workout plan for beginners: Workout A and B with sets and reps, how to pick your weights, weekly progression and rest-day guidance.",
    tags: ["beginner workout", "gym plan", "full body workout", "3 day split", "strength training"],
    topics: ["Muscle Building", "Training Programs", "Beginners"],
    featuredImageAlt: "Beginner training in a gym with a barbell squat, bench press and lat pulldown",
    relatedSlugs: [
      "what-is-progressive-overload",
      "how-many-days-a-week-should-i-work-out",
      "how-many-sets-per-muscle-per-week",
      "push-pull-legs-for-beginners",
      "beginner-gym-diet-plan",
    ],
    dayOffset: 9,
    faq: [
      {
        question: "Is a 3-day workout plan enough to build muscle?",
        answer:
          "Yes. Three full-body sessions train each muscle three times a week with roughly 8–10 hard sets per muscle — plenty for a beginner. Consistency and progression matter more than extra days.",
      },
      {
        question: "Can I do the workouts on back-to-back days?",
        answer:
          "It is better to leave a day between sessions because every workout trains the whole body. If your schedule forces two days in a row, put Workout A and B on those days and keep the third day separate.",
      },
      {
        question: "How long should each workout take?",
        answer:
          "About 45–70 minutes including a 5–10 minute warm-up. Rest 2–3 minutes between sets of the big lifts and 60–90 seconds on smaller exercises.",
      },
      {
        question: "When should I change to a split?",
        answer:
          "After 3–6 months, or once you stop progressing on most lifts even with good sleep and food. Upper/lower or push/pull/legs are the usual next steps.",
      },
    ],
    sources: [SRC_ACSM, SRC_FREQ_2016, SRC_VOLUME, SRC_WHO_PA],
    body: [
      p(
        "Most beginners walk into a gym and copy a bodybuilder's “chest day, back day, arm day” split. It works for advanced lifters, but for a beginner it means training each muscle once a week and spending a lot of time on isolation exercises. A full-body plan, three days a week, builds strength and muscle faster in the first months and is easier to fit around work or college.",
      ),

      h2("The weekly schedule"),
      p("Train on three non-consecutive days and alternate the two workouts:"),
      table(
        ["Week", "Monday", "Wednesday", "Friday"],
        [
          ["Week 1", "Workout A", "Workout B", "Workout A"],
          ["Week 2", "Workout B", "Workout A", "Workout B"],
        ],
      ),
      p(
        `Any three days with a rest day between them works, such as Tuesday–Thursday–Saturday. Why three? Training each muscle at least twice a week tends to build more muscle than once a week — see <a href="${LINK.daysPerWeek}">how many days a week you should work out</a>.`,
      ),

      h2("Workout A"),
      table(
        ["Exercise", "Sets × reps", "Rest"],
        [
          [EX.squat, "3 × 6–10", "2–3 min"],
          [EX.bench, "3 × 6–10", "2–3 min"],
          [EX.pulldown, "3 × 8–12", "90 s"],
          [EX.rdl, "2 × 8–12", "2 min"],
          [EX.plank, "3 × 30–45 s", "60 s"],
        ],
      ),

      h2("Workout B"),
      table(
        ["Exercise", "Sets × reps", "Rest"],
        [
          [`${EX.legPress} (or ${EX.splitSquat})`, "3 × 10–12", "2 min"],
          [EX.dbPress, "3 × 8–12", "90 s"],
          [EX.cableRow, "3 × 8–12", "90 s"],
          [EX.inclineDb, "2 × 8–12", "90 s"],
          [EX.curl, "2 × 10–15", "60 s"],
          [EX.pushdown, "2 × 10–15", "60 s"],
        ],
      ),
      p(
        "Each exercise links to a how-to page with form cues. If a machine is taken, use the closest alternative — a dumbbell row for the cable row, push-ups for the incline press.",
      ),

      h2("How to choose your weights"),
      ol([
        "In week 1, pick a weight you could lift for about 3 more reps than the target at the end of each set.",
        "Learn the movement first. Film a set or ask a trainer to check your squat, bench and deadlift form.",
        "From week 2, stop each set with 1–3 reps “in the tank” — hard, but with clean form.",
        "Write every set down: exercise, weight, reps. A notebook or phone note is enough.",
      ]),

      h2("How to progress every week"),
      p(
        "Use double progression. Stay at the same weight until you hit the top of the rep range on every set, then add weight and start again at the bottom of the range.",
      ),
      table(
        ["Session", "Bench press", "What happened"],
        [
          ["1", "40 kg: 8, 7, 6", "Start"],
          ["2", "40 kg: 9, 8, 7", "One more rep per set"],
          ["3", "40 kg: 10, 10, 9", "Almost there"],
          ["4", "40 kg: 10, 10, 10", "Top of range on every set"],
          ["5", "42.5 kg: 7, 7, 6", "Add 2.5 kg, back to the bottom of the range"],
        ],
      ),
      p(
        `Lower-body lifts can usually go up by 2.5–5 kg at a time; upper-body and dumbbell lifts by 1–2.5 kg. Read <a href="${LINK.overload}">what progressive overload is</a> for more ways to progress, and track your strength with the <a href="/one-rep-max-calculator">one rep max calculator</a>.`,
      ),

      h2("How much volume this gives you"),
      p(
        `Over a typical week this plan gives each major muscle about 8–10 hard sets — the right starting dose for a beginner. Once progress slows, adding a set to the main lifts is the simplest next step. See <a href="${LINK.sets}">how many sets per muscle per week</a> you need as you advance.`,
      ),

      h2("Warm-up (5–10 minutes)"),
      ul([
        "3–5 minutes of easy cycling, rowing or brisk walking.",
        "10 bodyweight squats, 10 push-ups (or incline push-ups), 10 band pull-aparts or arm circles.",
        "Two lighter warm-up sets of your first exercise (for example an empty bar for 10, then about 60% of your working weight for 5).",
      ]),

      h2("Rest days and cardio"),
      p(
        `On non-gym days, walk. WHO recommends 150–300 minutes of moderate activity a week alongside muscle-strengthening work; 7,000–10,000 steps a day covers most of that. Avoid hard leg sessions on rest days so you recover for the next workout. If you are trying to lose weight at the same time, see <a href="/blog/weight-loss/walking-daily-activity/does-walking-help-you-lose-weight">whether walking helps you lose weight</a>.`,
      ),

      h2("Eat for the plan"),
      p(
        `Training is the signal; food is the material. Get 1.6–2 g of protein per kg of body weight (see <a href="${LINK.proteinMuscle}">how much protein to build muscle</a>) and eat at or slightly above maintenance if your goal is muscle gain. The <a href="${LINK.gymDiet}">beginner gym diet plan</a> turns that into Indian meals.`,
      ),
      toolCta("/protein-calculator", "protein calculator", "Get your daily protein target with the"),

      h2("After 3–6 months"),
      p(
        `When most lifts stall for two or three weeks despite good sleep and food, move to a four-day upper/lower split or a <a href="${LINK.ppl}">push/pull/legs routine</a>. Until then, keep this plan and keep adding reps.`,
      ),

      GUIDE,
      takeaways([
        "Three full-body workouts a week, alternating A and B, on non-consecutive days.",
        "2–3 sets of 6–15 reps per exercise, stopping 1–3 reps short of failure.",
        "Use double progression: hit the top of the rep range, then add weight.",
        "Each muscle gets about 8–10 hard sets a week — enough for beginners.",
        "Walk on rest days and eat enough protein to back up the training.",
      ]),
      p(DISCLAIMER),
    ].join("\n"),
  },

  {
    slug: "how-many-sets-per-muscle-per-week",
    title: "How Many Sets Per Muscle Per Week to Build Muscle?",
    excerpt:
      "How many sets per muscle group per week you need to build muscle, by training experience — what the research says about volume, how to count sets from compound lifts and how hard each set should be.",
    quickAnswer: `Most people build muscle well with about 10–20 hard sets per muscle group per week. Beginners can grow on 6–10 sets; intermediate lifters usually need 10–20. A “hard set” ends 0–3 reps short of failure. Split the weekly sets across at least two sessions per muscle, and add sets gradually only when progress stalls. ${DISCLAIMER}`,
    categorySlug: "muscle-building",
    subcategorySlug: "muscle-growth-hypertrophy",
    primaryKeyword: "how many sets per muscle per week",
    metaTitle: "How Many Sets Per Muscle Per Week? (By Level)",
    metaDescription:
      "How many sets per muscle per week build muscle? Research-based weekly volume for beginners and intermediates, how to count sets and how hard to train.",
    tags: ["training volume", "sets per week", "hypertrophy", "muscle growth", "workout planning"],
    topics: ["Muscle Building", "Training Science"],
    featuredImageAlt: "Training log showing weekly sets per muscle group next to a pair of dumbbells",
    relatedSlugs: [
      "beginner-3-day-gym-workout-plan",
      "push-pull-legs-for-beginners",
      "what-is-progressive-overload",
      "how-long-does-it-take-to-build-muscle",
      "how-many-days-a-week-should-i-work-out",
    ],
    dayOffset: 9,
    faq: [
      {
        question: "Is 10 sets per muscle per week enough?",
        answer:
          "For beginners and many intermediate lifters, yes — 10 hard sets is a solid weekly dose. Research found 10 or more weekly sets produced more growth than fewer than 5, but the extra benefit from going much higher is smaller and varies by person.",
      },
      {
        question: "Can I do too many sets?",
        answer:
          "Yes. If your performance drops week to week, joints ache, or you dread training, you are probably doing more than you can recover from. Cut volume by a third for a week, then build back up.",
      },
      {
        question: "Do warm-up sets count?",
        answer:
          "No. Only count working sets that end within about 3 reps of failure. Light warm-up sets prepare you but do not add meaningful growth stimulus.",
      },
      {
        question: "Should I train to failure on every set?",
        answer:
          "No. Stopping 1–3 reps short of failure gives almost the same growth with less fatigue. Taking the last set of an isolation exercise to failure occasionally is fine.",
      },
    ],
    sources: [SRC_VOLUME, SRC_FREQ, SRC_FREQ_2016, SRC_ACSM],
    body: [
      p(
        "Training volume — how much work you do for each muscle in a week — is one of the main drivers of muscle growth. Too little and you leave progress on the table; too much and you cannot recover. The simplest way to measure it is to count hard sets per muscle per week.",
      ),

      h2("Weekly sets by experience level"),
      table(
        ["Level", "Hard sets per muscle per week", "Typical example"],
        [
          ["Beginner (0–6 months)", "6–10", "3 full-body sessions, 2–3 sets per lift"],
          ["Novice / early intermediate (6–24 months)", "10–15", "4-day upper/lower split"],
          ["Intermediate (2+ years)", "12–20", "Push/pull/legs or upper/lower, 4–6 days"],
          ["Advanced", "Varies widely; may exceed 20 for lagging muscles", "Individually adjusted"],
        ],
      ),
      p(
        "A 2017 meta-analysis found a clear dose-response: each extra weekly set was linked to a little more growth, and 10 or more sets per muscle per week produced noticeably more growth than fewer than 5. Beyond about 20 sets, the benefit is less certain and recovery becomes the limit for most people.",
      ),

      h2("What counts as a hard set"),
      ul([
        "A working set taken to within 0–3 reps of failure (you could have done 1–3 more reps with good form).",
        "In roughly the 5–30 rep range. Very heavy sets of 1–3 reps build strength but give less growth per set.",
        "Not warm-ups, and not easy sets you stop long before the effort gets hard.",
      ]),
      p(
        "If you are not sure how close to failure you are, take the last set of an isolation exercise (such as a curl or lateral raise) to failure once in a while. It recalibrates your sense of effort.",
      ),

      h2("How to count sets from compound lifts"),
      p(
        "Big lifts train more than one muscle. A simple, widely used rule: count the main muscle as 1 set and the helper muscles as ½ set.",
      ),
      table(
        ["Exercise", "Counts as 1 set for", "Counts as ½ set for"],
        [
          [EX.bench, "Chest", "Triceps, front shoulders"],
          [EX.ohp, "Shoulders", "Triceps"],
          [EX.pulldown, "Back (lats)", "Biceps"],
          [EX.barbellRow, "Upper back", "Biceps, rear shoulders"],
          [EX.squat, "Quads, glutes", "Adductors"],
          [EX.rdl, "Hamstrings, glutes", "Lower back"],
        ],
      ),
      p(
        "So 3 sets of bench press plus 3 sets of overhead press gives your triceps about 3 sets before you do a single pushdown. Many beginners need little direct arm work because of this.",
      ),

      h2("Split the sets across the week"),
      p(
        `When weekly volume is matched, training a muscle twice a week gives about the same growth as three times — but both beat cramming everything into one session, because quality drops after 6–8 hard sets for one muscle in a workout. A practical rule is no more than about 8–10 hard sets per muscle per session, and at least two sessions per muscle per week. That is why <a href="${LINK.threeDay}">full-body</a>, upper/lower and <a href="${LINK.ppl}">push/pull/legs</a> plans work better for most people than a once-a-week “bro split”.`,
      ),

      h2("Sample week: 12 sets for chest"),
      table(
        ["Day", "Exercises", "Chest sets"],
        [
          ["Monday (upper)", `${EX.bench} 3 sets + ${EX.inclineDb} 2 sets`, "5"],
          ["Thursday (upper)", `${EX.inclineDb} 3 sets + <a href="/exercises/chest/cable-chest-fly">cable fly</a> 2 sets + ${EX.pushUps} 2 sets`, "7"],
          ["<strong>Week</strong>", "", "<strong>12</strong>"],
        ],
      ),

      h2("How to find your own number"),
      ol([
        "Start at the low end for your level (for example 10 sets per muscle).",
        `Run it for 4–6 weeks while applying <a href="${LINK.overload}">progressive overload</a>.`,
        "If reps and weights keep climbing, stay there — more is not needed.",
        "If a muscle stalls for 2–3 weeks while sleep and food are good, add 2 sets per week for that muscle.",
        "If performance drops or joints ache, reduce volume by about a third for a week (a deload), then resume.",
      ]),

      h2("Volume is not the only lever"),
      p(
        `Sets only work if you eat enough protein (see <a href="${LINK.proteinMuscle}">how much protein to build muscle</a>), sleep 7–9 hours and add load or reps over time. Growth is also slower than most people expect; read <a href="${LINK.buildTime}">how long it takes to build muscle</a> for realistic timelines.`,
      ),
      toolCta("/one-rep-max-calculator", "one rep max calculator", "Pick working weights for each rep range with the"),

      GUIDE,
      takeaways([
        "Most people grow well on 10–20 hard sets per muscle per week; beginners on 6–10.",
        "A hard set ends 0–3 reps short of failure; warm-ups do not count.",
        "Count helper muscles in compound lifts as half a set.",
        "Spread weekly sets over at least two sessions per muscle.",
        "Add sets only when progress stalls, and deload when recovery slips.",
      ]),
      p(DISCLAIMER),
    ].join("\n"),
  },

  {
    slug: "bulking-on-an-indian-diet",
    title: "Bulking on an Indian Diet: Veg & Non-Veg Plan",
    excerpt:
      "How to bulk on an Indian diet: calorie surplus and protein targets, lean bulk vs dirty bulk, a 3,000 kcal vegetarian day with gram weights, non-veg swaps, budget tips and how to track progress.",
    quickAnswer: `To bulk on an Indian diet, eat about 250–500 kcal (5–15%) above maintenance, get 1.6–2.2 g of protein per kg of body weight, and train with progressive overload. Aim to gain about 0.25–0.5% of body weight a week. Build meals around roti or rice, dal, paneer or chicken, curd and milk, and use peanuts, ghee and bananas to add calories without huge portions. ${DISCLAIMER}`,
    categorySlug: "muscle-building",
    subcategorySlug: "bulking",
    primaryKeyword: "bulking diet indian",
    metaTitle: "Bulking on an Indian Diet (3,000 kcal Plan)",
    metaDescription:
      "Bulking on an Indian diet: surplus and protein targets, lean vs dirty bulk, a 3,000 kcal veg day with gram weights, non-veg swaps and budget-friendly foods.",
    tags: ["bulking", "Indian diet", "lean bulk", "muscle gain", "meal plan"],
    topics: ["Muscle Building", "Indian Nutrition", "Bulking"],
    featuredImageAlt:
      "Indian bulking meals: rotis with rajma and paneer, rice with dal, milk, bananas and peanuts",
    relatedSlugs: [
      "how-to-gain-weight-for-skinny-guys",
      "how-much-protein-to-build-muscle",
      "beginner-gym-diet-plan",
      "vegetarian-protein-sources-india",
      "how-many-sets-per-muscle-per-week",
    ],
    dayOffset: 9,
    faq: [
      {
        question: "How many calories should I eat when bulking?",
        answer:
          "Start at about 250–500 kcal above maintenance. Beginners and very thin people can use the upper end; experienced lifters gain less muscle per month and should stay near the lower end to limit fat gain.",
      },
      {
        question: "Is dirty bulking bad?",
        answer:
          "Eating anything to hit calories — sweets, fried snacks, fast food — usually leads to fast fat gain and poor protein and fibre intake. You then need a longer diet to lose the fat. A lean bulk with mostly home food builds a similar amount of muscle with less fat.",
      },
      {
        question: "Can I bulk without eggs or meat?",
        answer:
          "Yes. Paneer, soya, dal, rajma, chana, milk and curd provide plenty of protein. A vegetarian day of about 3,000 kcal with roughly 118 g of protein is shown below.",
      },
      {
        question: "How long should a bulk last?",
        answer:
          "Most people bulk for 3–6 months, then spend a few weeks at maintenance. If your waist grows much faster than your strength, reduce the surplus.",
      },
    ],
    sources: [SRC_IFCT, SRC_IRAKI, SRC_SLATER, SRC_MORTON, SRC.issnProtein],
    body: [
      p(
        "Bulking simply means eating a calorie surplus so your body has the material to build muscle. Indian food is well suited to it: rice and roti supply easy carbohydrates, dal and dairy add protein, and ghee and nuts add calories without big portions. The challenge is keeping the surplus modest so you gain muscle without much fat.",
      ),

      h2("Set your targets"),
      table(
        ["Target", "Lean bulk (recommended)", "Why"],
        [
          ["Calories", "Maintenance + 250–500 kcal (about 5–15%)", "Enough to grow, small enough to limit fat gain"],
          ["Rate of gain", "0.25–0.5% of body weight a week (≈ 0.2–0.35 kg for 70 kg)", "Faster gain is mostly fat for most lifters"],
          ["Protein", "1.6–2.2 g per kg (≈ 110–155 g for 70 kg)", "Covers the muscle-building plateau with a margin"],
          ["Fat", "20–30% of calories", "Hormones and taste; ghee and nuts count here"],
          ["Carbs", "The rest", "Fuel for training; rice, roti, poha, fruit"],
        ],
      ),
      p(
        `Get your maintenance and macros from the <a href="/macro-calculator">macro calculator</a>, and see <a href="${LINK.proteinMuscle}">how much protein to build muscle</a> for the evidence behind the protein range. Very thin beginner? Start with <a href="${LINK.gainSkinny}">how to gain weight for skinny guys</a>.`,
      ),

      h2("Lean bulk vs dirty bulk"),
      table(
        ["", "Lean bulk", "Dirty bulk"],
        [
          ["Surplus", "250–500 kcal", "1,000+ kcal, often uncounted"],
          ["Food", "Mostly home meals plus dairy, nuts, fruit", "Anything — sweets, fried food, takeaway"],
          ["Muscle gained", "Close to maximum", "Barely more than lean"],
          ["Fat gained", "Low to moderate", "High"],
          ["Afterwards", "Short or no cut needed", "Long diet to lose the fat"],
        ],
      ),

      h2("Vegetarian bulking day: about 3,000 kcal and 118 g protein"),
      p("For a 70 kg man training four days a week. Values from IFCT 2017; dals and rice weighed dry or raw."),
      table(
        ["Meal", "Food and amount", "Calories", "Protein"],
        [
          ["Breakfast", "Moong dal chilla (60 g dry dal) cooked in 2 tsp oil, 1 glass milk (200 ml), 1 banana", "≈ 540 kcal", "≈ 22 g"],
          ["Lunch", "4 rotis (120 g atta), 1 katori rajma (40 g dry), 100 g paneer sabzi with 2 tsp oil, 1 katori curd", "≈ 940 kcal", "≈ 44 g"],
          ["Pre-workout snack", "30 g peanuts, 1 glass milk, 1 apple", "≈ 395 kcal", "≈ 14 g"],
          ["Dinner", "2 katori rice (100 g raw), 1 big katori toor dal (50 g dry), 2 tsp ghee, 1 katori sabzi, 1 katori curd", "≈ 800 kcal", "≈ 26 g"],
          ["Before bed", "1 glass milk, 30 g almonds", "≈ 330 kcal", "≈ 12 g"],
          ["<strong>Total</strong>", "", "<strong>≈ 3,005 kcal</strong>", "<strong>≈ 118 g</strong>"],
        ],
      ),

      h2("Non-veg swaps"),
      table(
        ["Swap out", "Swap in", "Change"],
        [
          ["Moong dal chilla with 2 tsp oil", "3-egg omelette", "About the same calories, +13 g protein"],
          ["100 g paneer sabzi", "150 g chicken breast curry (raw weight)", "≈ −5 kcal, +14 g protein"],
          ["1 big katori toor dal", "1 piece fish curry (≈ 75 g rohu) + ½ katori dal", "≈ +40 kcal, +9 g protein"],
        ],
      ),
      p(
        `More vegetarian options, ranked by protein per calorie, are in <a href="${LINK.vegProtein}">vegetarian protein sources in India</a>; food-by-food numbers are in the <a href="/foods/indian">Indian food calories and protein chart</a>.`,
      ),

      h2("Budget bulking foods"),
      ul([
        "<strong>Milk:</strong> the cheapest calories and protein in most cities — 1 litre gives about 730 kcal and 33 g protein.",
        "<strong>Peanuts and chikki:</strong> 156 kcal and 7 g protein per handful.",
        "<strong>Soya chunks:</strong> around 50 g protein per 100 g dry by most labels, at a fraction of the price of whey.",
        "<strong>Eggs:</strong> about 67 kcal and 6 g protein each.",
        "<strong>Dal, rajma, chana and rice:</strong> filling, cheap and protein-rich when combined.",
        "<strong>Bananas and dates:</strong> easy carbohydrates around training.",
      ]),

      h2("Track and adjust"),
      ol([
        "Weigh yourself three mornings a week and compare weekly averages.",
        "Measure your waist at the navel every two weeks.",
        "Log your main lifts; strength should rise most weeks.",
        "If weight is flat for two weeks, add 150–200 kcal (a glass of milk).",
        "If waist grows faster than about 1 cm a month while strength stalls, cut 150–200 kcal.",
      ]),

      h2("Train to make the surplus count"),
      p(
        `The surplus only becomes muscle with hard, progressive training. Most people grow well on 10–20 hard sets per muscle per week (see <a href="${LINK.sets}">how many sets per muscle per week</a>) on a <a href="${LINK.ppl}">push/pull/legs</a> or upper/lower plan. Creatine monohydrate (3–5 g a day) is the one supplement with strong evidence — read <a href="${LINK.creatine}">is creatine safe</a> first.`,
      ),
      toolCta("/macro-calculator", "macro calculator", "Get your bulking calories and macros with the"),

      GUIDE,
      takeaways([
        "Eat 250–500 kcal above maintenance and gain 0.25–0.5% of body weight a week.",
        "Hit 1.6–2.2 g of protein per kg from dal, dairy, paneer, soya, eggs or chicken.",
        "A lean bulk builds nearly as much muscle as a dirty bulk with far less fat.",
        "Milk, peanuts, ghee, rice and bananas make the surplus easy and affordable.",
        "Adjust by 150–200 kcal based on weight, waist and strength trends.",
      ]),
      p(DISCLAIMER),
    ].join("\n"),
  },

  {
    slug: "push-pull-legs-for-beginners",
    title: "Push Pull Legs for Beginners (3- and 6-Day PPL)",
    excerpt:
      "Push pull legs explained for beginners: what goes on each day, a 3-day and 6-day PPL schedule, full workouts with sets and reps, when a beginner should switch to PPL and how to progress.",
    quickAnswer: `Push pull legs (PPL) splits training into three workouts: push (chest, shoulders, triceps), pull (back, biceps, rear shoulders) and legs (quads, hamstrings, glutes, calves). Run it 3 days a week if you can only train three times, or 6 days a week to hit each muscle twice. Most complete beginners progress faster on full-body training first, then move to PPL after 2–6 months or when they want to train 5–6 days a week. ${DISCLAIMER}`,
    categorySlug: "muscle-building",
    subcategorySlug: "training-programs",
    primaryKeyword: "push pull legs for beginners",
    metaTitle: "Push Pull Legs for Beginners (PPL Workout)",
    metaDescription:
      "Push pull legs for beginners: what to train each day, 3-day and 6-day PPL schedules, full workouts with sets and reps, and when to switch from full body.",
    tags: ["push pull legs", "PPL", "workout split", "gym plan", "muscle building"],
    topics: ["Muscle Building", "Training Programs"],
    featuredImageAlt: "Push pull legs split shown as bench press, lat pulldown and squat",
    relatedSlugs: [
      "beginner-3-day-gym-workout-plan",
      "how-many-sets-per-muscle-per-week",
      "how-many-days-a-week-should-i-work-out",
      "what-is-progressive-overload",
      "bulking-on-an-indian-diet",
    ],
    dayOffset: 9,
    faq: [
      {
        question: "Is push pull legs good for beginners?",
        answer:
          "It works, but a full-body plan usually works better in the first few months because you practise each lift more often. PPL suits beginners who want to train 5–6 days a week or who have finished a few months of full-body training.",
      },
      {
        question: "Is 3-day PPL enough?",
        answer:
          "It trains each muscle only once a week, which is the minimum. It can still build muscle, but a 3-day full-body plan or 6-day PPL gives each muscle more frequent practice and is usually better.",
      },
      {
        question: "Where do abs and forearms go?",
        answer:
          "Add 2–3 sets of a core exercise such as planks or hanging knee raises to the end of leg or pull days. Forearms get plenty of work from rows, pull-ups and deadlift variations.",
      },
      {
        question: "Can I do PPL at home?",
        answer:
          "Yes, with dumbbells and a pull-up bar: push-ups and dumbbell presses for push, pull-ups and dumbbell rows for pull, goblet squats, split squats and Romanian deadlifts for legs.",
      },
    ],
    sources: [SRC_FREQ, SRC_FREQ_2016, SRC_VOLUME, SRC_ACSM],
    body: [
      p(
        "Push pull legs is one of the most popular gym splits because it is simple: muscles that push go together, muscles that pull go together, and legs get their own day. Each session is focused, nothing overlaps much, and it scales from three days to six.",
      ),

      h2("What goes on each day"),
      table(
        ["Day", "Muscles", "Movement pattern"],
        [
          ["Push", "Chest, shoulders, triceps", "Pressing away from the body or overhead"],
          ["Pull", "Back (lats, upper back), biceps, rear shoulders", "Pulling toward the body or down from overhead"],
          ["Legs", "Quads, hamstrings, glutes, calves (plus core)", "Squatting, hinging, lunging"],
        ],
      ),

      h2("3-day or 6-day PPL?"),
      table(
        ["Version", "Schedule", "Each muscle trained", "Best for"],
        [
          ["3-day", "Mon push, Wed pull, Fri legs", "Once a week", "Busy weeks; beginners who prefer splits"],
          ["6-day", "Push, pull, legs, push, pull, legs, rest", "Twice a week", "Lifters with time, energy and good recovery"],
          ["Rolling 4-day", "Push, pull, legs, rest, repeat", "About 1.5 times a week", "A middle ground"],
        ],
      ),
      p(
        `Training each muscle at least twice a week tends to build more muscle than once a week, so 6-day PPL is the stronger version. If you can only train three days, the <a href="${LINK.threeDay}">beginner 3-day full-body plan</a> usually beats 3-day PPL.`,
      ),

      h2("Push day"),
      table(
        ["Exercise", "Sets × reps"],
        [
          [EX.bench, "3 × 6–10"],
          [EX.ohp, "3 × 6–10"],
          [EX.inclineDb, "2 × 8–12"],
          [EX.lateral, "3 × 12–15"],
          [EX.pushdown, "2 × 10–15"],
        ],
      ),

      h2("Pull day"),
      table(
        ["Exercise", "Sets × reps"],
        [
          [`${EX.pullUp} or ${EX.pulldown}`, "3 × 6–12"],
          [EX.barbellRow, "3 × 6–10"],
          [EX.cableRow, "2 × 8–12"],
          [EX.facePull, "2 × 12–15"],
          [EX.curl, "2 × 8–12"],
          [EX.hammer, "2 × 10–12"],
        ],
      ),

      h2("Leg day"),
      table(
        ["Exercise", "Sets × reps"],
        [
          [EX.squat, "3 × 6–10"],
          [EX.rdl, "3 × 8–10"],
          [EX.legPress, "2 × 10–12"],
          [EX.legCurl, "2 × 10–15"],
          [EX.calfRaise, "3 × 10–15"],
          [EX.plank, "2–3 × 30–45 s"],
        ],
      ),
      p(
        "Rest 2–3 minutes after big compound sets and 60–90 seconds after smaller exercises. Each exercise links to a form guide.",
      ),

      h2("Weekly volume check"),
      p(
        `On 6-day PPL each muscle gets roughly 10–16 hard sets a week; on 3-day PPL, about 5–8. Beginners rarely need more than 10–12 to grow, so a beginner running 6 days can drop one exercise per session. See <a href="${LINK.sets}">how many sets per muscle per week</a> for how to adjust.`,
      ),

      h2("When should a beginner switch to PPL?"),
      ul([
        "You have trained full body consistently for 2–6 months.",
        "You can reliably train 5–6 days a week and recover (sleep, food, stress).",
        "Full-body sessions are getting too long because you are doing more sets per lift.",
        "You enjoy focusing on fewer muscles per session — enjoyment drives consistency.",
      ]),

      h2("How to progress"),
      p(
        `Use double progression on every exercise: keep the weight until you reach the top of the rep range on all sets, then add the smallest jump available. Log every session. <a href="${LINK.overload}">Progressive overload</a> explains other ways to progress when weight jumps are too big, such as on lateral raises.`,
      ),
      toolCta("/one-rep-max-calculator", "one rep max calculator", "Set working weights for each rep range with the"),

      h2("Recovery and food"),
      p(
        `Six training days only work if you recover. Sleep 7–9 hours, get 1.6–2.2 g of protein per kg of body weight, and eat at least at maintenance. If you are trying to gain size, see <a href="${LINK.bulking}">bulking on an Indian diet</a>; if your lifts stall for two weeks and you feel run-down, take a lighter week.`,
      ),

      GUIDE,
      takeaways([
        "Push = chest, shoulders, triceps; pull = back, biceps; legs = lower body and core.",
        "6-day PPL trains each muscle twice a week; 3-day PPL only once.",
        "Most complete beginners do better on full-body training for the first few months.",
        "Aim for about 10–20 hard sets per muscle per week and progress with double progression.",
        "Recovery — sleep, protein and calories — decides whether 6 days works for you.",
      ]),
      p(DISCLAIMER),
    ].join("\n"),
  },

  {
    slug: "how-many-days-a-week-should-i-work-out",
    title: "How Many Days a Week Should I Work Out?",
    excerpt:
      "How many days a week to work out for muscle, fat loss or general health: what WHO and the research recommend, the best weekly schedules for 2–6 training days, rest days and how to fit cardio in.",
    quickAnswer: `For most people, 3–4 days a week of strength training plus daily walking is the sweet spot. WHO recommends muscle-strengthening on at least 2 days a week and 150–300 minutes of moderate activity. For building muscle, training each muscle about twice a week matters more than the number of gym days, so 3 full-body days or 4 upper/lower days work well. Beginners should start with 3 days and add more only if they recover well. ${DISCLAIMER}`,
    categorySlug: "muscle-building",
    subcategorySlug: "beginner-muscle-building",
    primaryKeyword: "how many days a week should i work out",
    metaTitle: "How Many Days a Week Should I Work Out?",
    metaDescription:
      "How many days a week should you work out? Recommendations for muscle gain, fat loss and health, the best schedules for 2–6 days, rest days and cardio.",
    tags: ["workout frequency", "training days", "rest days", "beginner workout", "exercise guidelines"],
    topics: ["Muscle Building", "Beginners", "Training Programs"],
    featuredImageAlt: "Weekly calendar with gym days, walking days and a rest day marked",
    relatedSlugs: [
      "beginner-3-day-gym-workout-plan",
      "push-pull-legs-for-beginners",
      "how-many-sets-per-muscle-per-week",
      "how-long-does-it-take-to-build-muscle",
      "does-walking-help-you-lose-weight",
    ],
    dayOffset: 9,
    faq: [
      {
        question: "Is working out 3 days a week enough?",
        answer:
          "Yes. Three full-body sessions train every muscle three times a week, which is enough to build muscle and strength, especially for beginners. Add daily walking for heart health and fat loss.",
      },
      {
        question: "Is it okay to work out every day?",
        answer:
          "Light activity such as walking, yoga or easy cycling every day is fine and healthy. Hard strength training for the same muscles every day is not — muscles need about 48 hours between hard sessions. Take at least one full rest day a week.",
      },
      {
        question: "How many days a week should I work out to lose weight?",
        answer:
          "Two to four strength sessions a week plus 7,000–10,000 steps a day is a strong plan. Your calorie deficit decides most of the fat loss; training keeps the weight you lose coming from fat rather than muscle.",
      },
      {
        question: "Should I work out on consecutive days?",
        answer:
          "You can, if the sessions train different muscles — for example upper body on Monday and lower body on Tuesday. With full-body workouts, leave a day in between.",
      },
    ],
    sources: [SRC_WHO_PA, SRC_FREQ, SRC_FREQ_2016, SRC_ACSM],
    body: [
      p(
        "The best number of training days is the one you can keep up for a year. More days are not automatically better: what builds muscle is the total hard work each muscle gets across the week, and what keeps you healthy is moving most days. Here is how to choose.",
      ),

      h2("The minimum for health"),
      p(
        "WHO's 2020 guidelines for adults are 150–300 minutes a week of moderate activity (such as brisk walking) or 75–150 minutes of vigorous activity, plus muscle-strengthening activities for all major muscle groups on 2 or more days a week. Two strength sessions and a 30-minute walk on most days meets both.",
      ),

      h2("Recommended days by goal"),
      table(
        ["Goal", "Strength days", "Other activity"],
        [
          ["General health", "2", "150–300 min moderate activity a week"],
          ["Build muscle (beginner)", "3", "Walking on rest days"],
          ["Build muscle (intermediate)", "4–6", "Walking; light cardio 1–2 times a week"],
          ["Lose fat", "2–4", "7,000–10,000 steps a day"],
          ["Busy schedule", "2 (full body)", "Walk wherever you can"],
        ],
      ),

      h2("Why frequency per muscle matters more than gym days"),
      p(
        "Research comparing training frequencies found that hitting each muscle at least twice a week builds more muscle than once a week. When total weekly sets are equal, going from two to three times a week adds little. So a 3-day full-body plan and a 4-day upper/lower plan both work — they hit each muscle 2–3 times. A 5-day “one muscle per day” split hits each muscle only once, despite more gym time.",
      ),

      h2("Best schedule for each number of days"),
      table(
        ["Days a week", "Split", "Example week"],
        [
          ["2", "Full body × 2", "Mon full body, Thu full body"],
          ["3", "Full body × 3", "Mon A, Wed B, Fri A"],
          ["4", "Upper / lower × 2", "Mon upper, Tue lower, Thu upper, Fri lower"],
          ["5", "Upper / lower + push/pull/legs", "Upper, lower, rest, push, pull, legs"],
          ["6", "Push / pull / legs × 2", "Push, pull, legs, push, pull, legs, rest"],
        ],
      ),
      p(
        `Starting out? Use the <a href="${LINK.threeDay}">beginner 3-day gym workout plan</a>. Ready for more days? See <a href="${LINK.ppl}">push pull legs for beginners</a>.`,
      ),

      h2("Rest days: how many and what to do"),
      ul([
        "Take at least one full rest day a week, and leave about 48 hours before training the same muscles hard again.",
        "Active rest is ideal: a 30–60 minute walk, light cycling, yoga or mobility work.",
        "Sleep matters more than any recovery tool. Aim for 7–9 hours.",
        "Signs you need more rest: performance dropping for two or more sessions, aching joints, poor sleep, or dreading workouts.",
      ]),

      h2("Fitting in cardio"),
      p(
        `Walking is the easiest cardio to recover from and can be done daily. Harder cardio (running, intervals, cycling) is best kept to 1–3 sessions a week if your main goal is muscle, and ideally not right before leg training. If your goal is fat loss, steps add up fast — see <a href="/blog/weight-loss/walking-daily-activity/does-walking-help-you-lose-weight">does walking help you lose weight</a> and the <a href="/steps-to-calories-calculator">steps to calories calculator</a>.`,
      ),

      h2("How to choose your number"),
      ol([
        "Count the days you can train every week, even in a busy week. Start there, not with your best-case week.",
        "Pick the split for that number from the table above.",
        `Make each session count: 10–20 hard sets per muscle per week for most people (see <a href="${LINK.sets}">how many sets per muscle per week</a>).`,
        "Add a day only after 4–6 weeks of never missing a session and recovering well.",
      ]),
      p(
        `Results take months, not weeks — read <a href="${LINK.buildTime}">how long it takes to build muscle</a> so your expectations match your schedule.`,
      ),
      toolCta("/tdee-calculator", "TDEE calculator", "See how your training days change your daily calorie burn with the"),

      GUIDE,
      takeaways([
        "Most people do best with 3–4 strength days a week plus daily walking.",
        "WHO's minimum: 2 strength days and 150–300 minutes of moderate activity a week.",
        "Training each muscle twice a week matters more than total gym days.",
        "Beginners: start with 3 full-body days; add days only when you recover well.",
        "Take at least one full rest day and sleep 7–9 hours.",
      ]),
      p(DISCLAIMER),
    ].join("\n"),
  },
];
