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
  calories:
    "/blog/weight-loss/calorie-deficit/how-many-calories-should-i-eat-to-lose-weight",
  deficit:
    "/blog/weight-loss/calorie-deficit/how-to-calculate-your-calorie-deficit",
  tenKg:
    "/blog/weight-loss/calorie-deficit/how-many-calories-should-i-eat-to-lose-10-kg",
  notLosing:
    "/blog/weight-loss/weight-loss-plateaus/why-am-i-not-losing-weight",
  walking:
    "/blog/weight-loss/walking-daily-activity/does-walking-help-you-lose-weight",
  proteinPerDay: "/blog/nutrition/protein/how-much-protein-do-you-need-per-day",
  proteinForMuscle:
    "/blog/muscle-building/muscle-building-nutrition/how-much-protein-to-build-muscle",
};

export const batch10: IntentArticleDef[] = [
  {
    slug: "maintenance-calories",
    title: "What Are Maintenance Calories? How to Find Yours",
    excerpt:
      "Maintenance calories are the number that keeps your weight steady — and the starting point for every fat-loss or muscle-gain plan. Here’s how to estimate yours in two minutes, then check it against your real weight over two weeks.",
    quickAnswer: `Maintenance calories are the calories you need each day to keep your body weight the same. For most adults they fall between about 1,600 and 2,800 kcal a day, depending on size, sex, age and how much you move. Estimate yours with a TDEE calculator (BMR × an activity factor), then confirm it: eat a consistent amount for two weeks and check whether your average weight stays flat. Eat about 10–20% below maintenance to lose fat, or 5–10% above to build muscle. ${DISCLAIMER}`,
    categorySlug: "nutrition",
    subcategorySlug: "calories-energy",
    primaryKeyword: "maintenance calories",
    metaTitle: "What Are Maintenance Calories? | fitlives",
    metaDescription:
      "What maintenance calories are, how to calculate yours with BMR and activity level, and how to confirm the number with two weeks of weigh-ins.",
    tags: [
      "maintenance calories",
      "TDEE",
      "BMR",
      "calories per day",
      "calorie deficit",
    ],
    topics: ["Calorie Deficit", "Body Composition", "Beginner Fitness", "Indian Nutrition"],
    featuredImageAlt:
      "Weighing scale beside a thali of dal, rice, roti and sabzi representing daily maintenance calories",
    relatedSlugs: [
      "how-many-calories-should-i-eat-to-lose-weight",
      "how-to-calculate-your-calorie-deficit",
      "how-many-calories-should-i-eat-to-lose-10-kg",
      "why-am-i-not-losing-weight",
      "how-much-protein-to-build-muscle",
    ],
    dayOffset: 9,
    faq: [
      {
        question: "Is maintenance calories the same as TDEE?",
        answer:
          "Yes, in practice. TDEE (total daily energy expenditure) is the calories you burn in a day; eating that amount keeps your weight stable, so it is your maintenance. A calculator gives an estimate of TDEE; your real maintenance is the intake at which your weight trend stays flat.",
      },
      {
        question: "Is maintenance calories the same as BMR?",
        answer:
          "No. BMR is what your body burns at complete rest — roughly 60–70% of the total for most people. Maintenance adds everything else: digesting food, daily movement and exercise. Eating only your BMR is a large deficit for almost everyone.",
      },
      {
        question: "Do I eat the same maintenance calories on rest days?",
        answer:
          "You can. Most people do best with one average daily number across the week, which is simpler and works just as well. If you prefer, eat a little more on training days and a little less on rest days, as long as the weekly total matches.",
      },
      {
        question: "Why does my maintenance go down as I lose weight?",
        answer:
          "A smaller body burns fewer calories at rest and during movement, and many people also move a little less without noticing when they diet. Recalculate after every 4–5 kg lost, or whenever your weight stops trending down for 2–3 weeks.",
      },
      {
        question: "Should I eat at maintenance before starting a diet?",
        answer:
          "It helps if you have no idea what you currently eat. Two weeks of tracking at a steady intake tells you your real maintenance, so the deficit you set afterwards is accurate rather than a guess.",
      },
    ],
    sources: [
      {
        title:
          "Mifflin et al. (1990) — A new predictive equation for resting energy expenditure in healthy individuals (Am J Clin Nutr)",
        url: "https://pubmed.ncbi.nlm.nih.gov/2305711/",
        note: "The BMR equation used by most TDEE calculators, including ours",
      },
      {
        title:
          "Frankenfield et al. (2005) — Comparison of predictive equations for resting metabolic rate: a systematic review (J Am Diet Assoc)",
        url: "https://pubmed.ncbi.nlm.nih.gov/15883556/",
        note: "Mifflin-St Jeor was the most reliable equation, though individual estimates can be off by more than 10%",
      },
      {
        title:
          "Hall et al. (2011) — Quantification of the effect of energy imbalance on bodyweight (The Lancet)",
        url: "https://pubmed.ncbi.nlm.nih.gov/21872751/",
        note: "Why energy needs fall as weight is lost, and why the simple 7,700 kcal per kg rule is only an approximation",
      },
      {
        title:
          "Levine (2002) — Non-exercise activity thermogenesis (Best Pract Res Clin Endocrinol Metab)",
        url: "https://pubmed.ncbi.nlm.nih.gov/12468415/",
        note: "Everyday movement outside exercise varies widely between people and changes daily burn",
      },
      SRC.icmr,
    ],
    body: [
      p(
        "Every calorie target you will ever set — for fat loss, muscle gain or just staying the same — starts from one number: your maintenance calories. Get it roughly right and the rest of the plan is simple arithmetic. Guess it badly and you can “diet” for months without losing a kilo, or eat clean and still gain.",
        "This guide explains what maintenance calories are, how to estimate yours, and — the step most guides skip — how to check the estimate against your own body.",
      ),

      h2("What are maintenance calories?"),
      p(
        "Maintenance calories are the number of calories you need each day to keep your body weight stable. Eat about that much on average and your weight stays flat; eat less and you lose weight; eat more and you gain.",
        "Your maintenance is the same thing as your <strong>TDEE</strong> (total daily energy expenditure) — the calories your body burns in a full day. It has four parts:",
      ),
      table(
        ["Part", "What it is", "Share of the day’s burn"],
        [
          ["BMR (basal metabolic rate)", "Keeping you alive at rest: heart, brain, breathing, organs", "About 60–70%"],
          ["Thermic effect of food", "Digesting and processing what you eat (higher for protein)", "About 10%"],
          ["NEAT (non-exercise activity)", "Walking, standing, chores, fidgeting, climbing stairs", "Most variable — roughly 15–30%"],
          ["Exercise", "Planned workouts, sport, runs", "Often only 5–10% for regular gym-goers"],
        ],
      ),
      p(
        `The surprise for most people is how small the exercise share is, and how big everyday movement is. Two people with the same body and the same gym routine can differ by several hundred calories a day simply because one has a desk job and the other is on their feet. That is why <a href="${LINK.walking}">daily walking helps weight loss</a> more than most people expect.`,
      ),

      h2("How to calculate your maintenance calories"),
      p(
        "The standard method has two steps: estimate your BMR from an equation, then multiply it by an activity factor.",
      ),
      h3("Step 1: Estimate your BMR"),
      p(
        "Most calculators, including ours, use the Mifflin-St Jeor equation. In a systematic review it was the most reliable of the common equations for healthy adults:",
      ),
      ul([
        "<strong>Men:</strong> BMR = (10 × weight in kg) + (6.25 × height in cm) − (5 × age) + 5",
        "<strong>Women:</strong> BMR = (10 × weight in kg) + (6.25 × height in cm) − (5 × age) − 161",
      ]),
      h3("Step 2: Multiply by your activity level"),
      table(
        ["Activity level", "What it looks like", "Multiply BMR by"],
        [
          ["Sedentary", "Desk job, under ~5,000 steps, little or no exercise", "1.2"],
          ["Lightly active", "~5,000–7,500 steps or exercise 1–3 days a week", "1.375"],
          ["Moderately active", "~7,500–10,000 steps or exercise 3–5 days a week", "1.55"],
          ["Very active", "Physical job or hard training 6–7 days a week", "1.725"],
          ["Extremely active", "Manual labour plus daily training, or athletes in heavy training", "1.9"],
        ],
      ),
      p(
        "Be honest here — overestimating activity is the most common reason calculated maintenance comes out too high. If you are unsure between two levels, pick the lower one.",
      ),
      toolCta(
        "/tdee-calculator",
        "TDEE calculator",
        "Skip the arithmetic and get your maintenance estimate with the",
      ),

      h2("Worked examples"),
      table(
        ["", "Rohan — 30, office worker", "Priya — 35, teacher"],
        [
          ["Weight / height", "70 kg, 170 cm", "60 kg, 158 cm"],
          ["BMR (Mifflin-St Jeor)", "700 + 1,062.5 − 150 + 5 ≈ <strong>1,620 kcal</strong>", "600 + 987.5 − 175 − 161 ≈ <strong>1,250 kcal</strong>"],
          ["Activity", "Gym 3 days a week, desk job → lightly active (1.375)", "On her feet at school, no gym → lightly active (1.375)"],
          ["Estimated maintenance", "1,620 × 1.375 ≈ <strong>2,220 kcal/day</strong>", "1,250 × 1.375 ≈ <strong>1,720 kcal/day</strong>"],
        ],
      ),
      p(
        "To put Rohan’s number in Indian food terms: 2,220 kcal is roughly a poha breakfast with chai, a lunch of 3 rotis with dal, sabzi and curd, an evening snack of fruit and roasted chana, and a dinner of rice, dal and a paneer or chicken curry. His maintenance is not a diet — it is a normal day of eating.",
      ),

      h2("Calculators are estimates — check yours in two weeks"),
      p(
        "Even the best equation can be off by 10% or more for an individual, because muscle mass, genetics, sleep and daily movement all vary. For Rohan, that is a range of about 2,000–2,450 kcal. The fix is to treat the calculator as a starting point and let your weight confirm it:",
      ),
      ol([
        "<strong>Eat close to the same calories every day for 14 days.</strong> Log everything, including chai, cooking oil and weekend meals — that is where most hidden calories live.",
        "<strong>Weigh yourself every morning</strong> after the toilet, before food or water, and write it down.",
        "<strong>Compare the average of week 1 with the average of week 2.</strong> Single days jump around by 0.5–1 kg from water and salt; weekly averages do not.",
        "<strong>Read the result:</strong> if the average is flat (within about 0.2 kg), you have found your maintenance. If it went down, your maintenance is higher than you ate; if it went up, it is lower.",
      ]),
      h3("Adjusting the number"),
      p(
        "A rough rule: a sustained change of about 0.5 kg a week corresponds to roughly 500 kcal a day. Suppose Rohan averaged 2,000 kcal a day and his weekly average dropped 0.5 kg. His real maintenance is about 2,000 + 500 = <strong>2,500 kcal</strong> — higher than the calculator said.",
        "Treat this as an approximation. Part of early weight change is water and glycogen, especially in the first week of any diet, so a third week of data makes the estimate more reliable.",
      ),

      h2("Using maintenance to set your goal"),
      table(
        ["Goal", "Daily target", "Rohan (≈2,220 kcal maintenance)"],
        [
          ["Lose fat steadily", "10–20% below maintenance", "About 1,780–2,000 kcal"],
          ["Stay the same / recomposition", "At maintenance", "About 2,220 kcal"],
          ["Build muscle with minimal fat gain", "5–10% above maintenance", "About 2,330–2,440 kcal"],
        ],
      ),
      p(
        `For the full fat-loss method, see <a href="${LINK.deficit}">how to calculate your calorie deficit</a> and <a href="${LINK.calories}">how many calories you should eat to lose weight</a>. Building muscle? A small surplus only works with enough protein — read <a href="${LINK.proteinForMuscle}">how much protein you need to build muscle</a>.`,
      ),
      toolCta(
        "/calorie-deficit-calculator",
        "calorie deficit calculator",
        "Turn your maintenance into a fat-loss target with the",
      ),

      h2("Why your maintenance changes over time"),
      ul([
        "<strong>Weight loss lowers it.</strong> A lighter body burns less. After losing 5 kg, Rohan’s maintenance drops by roughly 100 kcal from body size alone.",
        "<strong>You move less without noticing.</strong> Dieting often reduces everyday movement — fewer steps, more sitting. Keeping a daily step target protects your maintenance.",
        "<strong>Muscle raises it slightly.</strong> Muscle burns more than fat at rest, but the difference is modest — think tens of calories per kilo, not hundreds.",
        "<strong>Age lowers it gradually,</strong> mostly through lost muscle and less activity. Strength training slows both.",
        "<strong>Life changes it.</strong> A new job, a move, an injury or a festival season can shift daily movement by hundreds of calories.",
      ]),
      p(
        `Recalculate after every 4–5 kg of weight change, or if your weight trend stalls for 2–3 weeks. If you are eating “at a deficit” and nothing is moving, work through <a href="${LINK.notLosing}">why you might not be losing weight</a> — under-counted calories are far more common than a broken metabolism.`,
      ),

      h2("Common mistakes"),
      ul([
        "<strong>Eating your BMR instead of your maintenance.</strong> 1,200 kcal sounds “safe” but is a steep deficit for most adults, and usually ends in fatigue and a binge.",
        "<strong>Picking “very active” because you go to the gym.</strong> An hour of training does not cancel eight hours of sitting.",
        "<strong>Adding exercise calories back on top.</strong> The activity factor already includes your workouts; fitness trackers often overestimate burn as well.",
        "<strong>Ignoring weekends.</strong> Five days at 1,900 kcal and two days at 3,200 average out to about 2,270 — maintenance, not a deficit.",
        "<strong>Judging from one weigh-in.</strong> A salty dinner or a hard workout can add 1 kg of water overnight. Use weekly averages.",
      ]),

      h2("Who should be careful"),
      p(
        "Calorie equations are built for healthy, non-pregnant adults. They are less reliable if you are pregnant or breastfeeding, under 18, very muscular, living with obesity, or managing a condition such as thyroid disease, diabetes or kidney disease. In those cases, or if you have a history of disordered eating, work with a doctor or registered dietitian rather than setting a target on your own.",
      ),

      takeaways([
        "Maintenance calories are what you need each day to keep your weight steady — the same as your TDEE.",
        "Estimate it with BMR × activity factor, choosing the lower activity level when unsure.",
        "Confirm it with two weeks of steady eating and weekly-average weigh-ins; adjust about 500 kcal a day per 0.5 kg weekly change.",
        "Eat 10–20% below maintenance to lose fat, or 5–10% above to build muscle.",
        "Recalculate after every 4–5 kg of change or when your trend stalls.",
      ]),
      p(
        `Planning a bigger change? See <a href="${LINK.tenKg}">how many calories to eat to lose 10 kg</a>, and keep protein up while you do it with <a href="${LINK.proteinPerDay}">how much protein you need per day</a>. ${DISCLAIMER}`,
      ),
    ].join("\n"),
  },
];
