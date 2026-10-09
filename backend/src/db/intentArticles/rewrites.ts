import {
  DISCLAIMER,
  h2,
  p,
  SRC,
  table,
  takeaways,
  toolCta,
  ul,
  type IntentFaq,
  type IntentSource,
} from "./helpers";

/**
 * Full rewrites of thin early articles. Applied by a content migration only while
 * the live body still contains `originalOpening`, so CMS rewrites are never replaced.
 */
export type ArticleRewrite = {
  originalOpening: string;
  excerpt: string;
  quickAnswer: string;
  body: string;
  faq: IntentFaq[];
  sources: IntentSource[];
};

const SRC_IFCT: IntentSource = {
  title: "Longvah et al. (2017) — Indian Food Composition Tables (ICMR-National Institute of Nutrition)",
  url: "https://www.nin.res.in/",
  note: "Per-100 g calories, protein and fibre for rice and other staples",
};

const LINK = {
  riceVsRoti: "/blog/weight-loss/weight-loss-nutrition/rice-vs-roti-for-weight-loss",
  dinner: "/blog/weight-loss/diet-meal-planning/best-dinner-for-weight-loss",
  calories:
    "/blog/weight-loss/calorie-deficit/how-many-calories-should-i-eat-to-lose-weight",
  proteinWl: "/blog/weight-loss/weight-loss-nutrition/protein-for-weight-loss",
  dietPlan: "/blog/weight-loss/diet-meal-planning/indian-diet-plan-for-weight-loss",
  notLosing: "/blog/weight-loss/weight-loss-plateaus/why-am-i-not-losing-weight",
};

const rice: ArticleRewrite = {
  originalOpening:
    "If rice made fat loss impossible, large regions of the world would not produce successful physiques and athletes.",
  excerpt:
    "Yes, rice can fit a weight-loss diet. How much rice to eat per meal for your goal, white vs brown vs red vs parboiled rice, how cooking and cooling change it, and how to build South and North Indian rice plates that keep you full.",
  quickAnswer: `Yes. Rice is not fattening on its own; weight loss depends on your total calories. One katori of cooked rice (about 50 g raw) has roughly 175 kcal. Most people losing weight do well with 1 katori per meal, paired with dal, curd, paneer, eggs, fish or chicken and a large serving of vegetables. Brown, red and parboiled rice add a little fibre and digest more slowly, but portion size matters far more than the type. ${DISCLAIMER}`,
  faq: [
    {
      question: "How much rice can I eat per day to lose weight?",
      answer:
        "For most people, 1 katori of cooked rice (about 50 g raw, 175 kcal) at one or two meals fits a fat-loss diet. Smaller, less active people may need ¾ katori; taller or very active people can often eat 1½ katori. Adjust based on your weekly weigh-ins.",
    },
    {
      question: "Is brown rice better than white rice for weight loss?",
      answer:
        "Slightly. Brown rice has about 60% more fibre than white rice (4.4 g vs 2.8 g per 100 g raw) and digests more slowly, which some people find more filling. Calories are almost identical, so a measured katori of white rice beats an unmeasured plate of brown rice.",
    },
    {
      question: "Should I stop eating rice at night?",
      answer:
        "No. Eating rice at night does not cause weight gain by itself; your total calories across the day decide that. If a lighter dinner helps you sleep or eat less overall, have a smaller rice portion with more dal and vegetables.",
    },
    {
      question: "Does cooling rice reduce its calories?",
      answer:
        "Not meaningfully. Cooling cooked rice turns some starch into resistant starch, which slightly lowers the blood-sugar rise in small studies. The calorie difference is small, so treat it as a minor bonus rather than a weight-loss method. Refrigerate cooked rice quickly and reheat it thoroughly.",
    },
    {
      question: "I have diabetes. Can I eat rice?",
      answer:
        "Many people with diabetes eat rice in controlled portions, often paired with protein, vegetables and fibre. The right amount depends on your medication and blood-sugar targets, so agree it with your doctor or dietitian.",
    },
  ],
  sources: [
    SRC_IFCT,
    SRC.icmr,
    {
      title: "Atkinson et al. (2021) — International tables of glycemic index and glycemic load values (Am J Clin Nutr)",
      url: "https://pubmed.ncbi.nlm.nih.gov/34258626/",
      note: "Glycaemic index of rice varieties",
    },
    {
      title: "Hu et al. (2012) — White rice consumption and risk of type 2 diabetes: meta-analysis (BMJ)",
      url: "https://pubmed.ncbi.nlm.nih.gov/22422870/",
      note: "Higher white rice intake associated with higher diabetes risk, especially in Asian populations",
    },
    {
      title: "Sonia et al. (2015) — Effect of cooling of cooked white rice on resistant starch content and glycemic response (Asia Pac J Clin Nutr)",
      url: "https://pubmed.ncbi.nlm.nih.gov/26693748/",
      note: "Cooled and reheated rice produced a lower glycaemic response",
    },
    SRC.whoObesity,
  ],
  body: [
    p(
      "Rice is the staple for most of India, and it is usually the first food people cut when they start a diet. That is rarely necessary. Body weight changes with total calories over weeks, and rice is simply one of the easiest carbohydrates to measure. The people who struggle are usually eating a heaped plate with oily gravy and little protein, not a katori of rice.",
      `This guide covers how much rice to eat, which kind to choose and how to build a rice plate that keeps you full. If you are deciding between the two staples, see <a href="${LINK.riceVsRoti}">rice vs roti for weight loss</a>.`,
    ),

    h2("Calories in rice: what a katori really is"),
    p(
      "Values are from the Indian Food Composition Tables (IFCT 2017), measured raw. Rice roughly triples in weight when cooked, so one katori of cooked rice (about 150 g) starts as about 50 g of raw rice.",
    ),
    table(
      ["Portion", "Raw rice", "Calories", "Protein", "Fibre"],
      [
        ["Small (¾ katori cooked)", "35 g", "125 kcal", "2.8 g", "1.0 g"],
        ["1 katori cooked", "50 g", "178 kcal", "4.0 g", "1.4 g"],
        ["1½ katori cooked", "75 g", "267 kcal", "6.0 g", "2.1 g"],
        ["1 full plate cooked", "100 g", "356 kcal", "7.9 g", "2.8 g"],
      ],
    ),
    p(
      "A restaurant plate of rice or a biryani portion often holds 2–3 katoris, which is why rice gets the blame. Weigh your raw rice once, cook it and spoon it into your usual katori, and you will know your portion for good. Our <a href=\"/foods/rice\">rice nutrition page</a> has a serving calculator.",
    ),

    h2("How much rice to eat per meal, by goal"),
    p("Starting points for the rice at one meal. Adjust after two to three weeks of weigh-ins."),
    table(
      ["Goal", "Rice per meal (cooked)", "Raw weight", "Roughly"],
      [
        ["Fat loss, smaller or less active", "¾ katori", "30–40 g", "105–140 kcal"],
        ["Fat loss, taller or active", "1 katori", "50 g", "175 kcal"],
        ["Maintenance", "1–1½ katori", "50–75 g", "175–265 kcal"],
        ["Muscle gain", "1½–2 katori", "75–100 g", "265–355 kcal"],
      ],
    ),
    p(
      `Your total daily calories set the real limit. Find your number with the <a href="/calorie-calculator">calorie calculator</a>, or read <a href="${LINK.calories}">how many calories to eat to lose weight</a>.`,
    ),

    h2("White, brown, red or parboiled rice?"),
    table(
      ["Rice", "Fibre per 100 g raw", "Digestion", "Best use"],
      [
        ["White (sona masoori, ponni, regular)", "≈ 2.8 g", "Fastest", "Fine in measured portions with dal and vegetables"],
        ["Basmati", "≈ 2–3 g", "Medium; often a lower GI than other white rice", "Pulao, biryani, everyday meals"],
        ["Parboiled (ukda / boiled rice)", "≈ 2–3 g", "Slower than raw white rice", "South Indian and Bengali meals"],
        ["Brown", "≈ 4.4 g", "Slower", "If you like it and it keeps you fuller"],
        ["Red / matta", "Similar to brown", "Slower", "Kerala and Karnataka meals"],
      ],
    ),
    p(
      "All of these have nearly the same calories per gram. Brown, red and parboiled rice digest more slowly and give slightly more fibre, which can help with fullness and blood sugar. Large studies link very high white rice intake with higher type 2 diabetes risk, mostly in Asian populations who eat a lot of it, so swapping some white rice for less refined rice, millets or dal is sensible. For weight loss, though, a measured portion of the rice you enjoy beats an unmeasured portion of a “healthy” one.",
    ),

    h2("Cooking tips that actually matter"),
    ul([
      "<strong>Watch the fat, not the rice.</strong> Jeera rice, lemon rice, pulao and fried rice often have 1–2 teaspoons of oil or ghee per katori, adding 45–90 kcal. Plain steamed rice is the lightest option.",
      "<strong>Cook it with dal or vegetables.</strong> Khichdi or vegetable pulao bulks the bowl and adds protein and fibre for the same rice.",
      "<strong>Draining rice water is optional.</strong> It removes a little starch and calories, but the difference is small next to portion size.",
      "<strong>Cooling is a minor bonus.</strong> Cooked, cooled and reheated rice forms some resistant starch and causes a slightly lower blood-sugar rise in small studies. Refrigerate leftovers within an hour and reheat until piping hot.",
    ]),

    h2("Rice plates that work for weight loss"),
    p(
      "Use the plate method: half the plate vegetables, a quarter protein, a quarter rice. ICMR-NIN guidance also suggests cereals should make up a smaller share of daily energy than they do in most Indian diets, which this plate achieves without dropping rice.",
    ),
    table(
      ["Plate", "What to put on it", "Approx. calories"],
      [
        ["South Indian", "1 katori rice + 1 big katori sambar + poriyal or kootu + ½ katori curd", "≈ 450–500 kcal"],
        ["North Indian", "1 katori rice + 1 katori rajma or chole + salad + raita", "≈ 450–500 kcal"],
        ["Bengali / coastal", "1 katori rice + 1 piece fish curry + 1 katori vegetables", "≈ 450–550 kcal"],
        ["Khichdi bowl", "1½ katori moong dal khichdi + vegetables + curd", "≈ 400–450 kcal"],
        ["Non-veg", "1 katori rice + 150 g chicken curry (light oil) + salad", "≈ 500–550 kcal"],
      ],
    ),
    p(
      `Each plate has a protein source, which matters as much as the rice portion: protein keeps you full and protects muscle in a calorie deficit. See <a href="${LINK.proteinWl}">how much protein you need for weight loss</a>. For a full week built this way, follow the <a href="${LINK.dietPlan}">7-day Indian diet plan for weight loss</a>.`,
    ),

    h2("Rice dishes: what to watch"),
    table(
      ["Dish", "Typical serving", "Rough calories"],
      [
        ["Plain steamed rice", "1 katori", "≈ 175 kcal"],
        ["Curd rice", "1 katori", "≈ 200–250 kcal"],
        ["Lemon or jeera rice", "1 katori", "≈ 220–260 kcal"],
        ["Vegetable pulao", "1 katori", "≈ 220–270 kcal"],
        ["Veg biryani", "1 restaurant plate", "≈ 450–600 kcal"],
        ["Chicken biryani", "1 restaurant plate", "≈ 550–800 kcal"],
        ["Fried rice", "1 restaurant plate", "≈ 500–700 kcal"],
      ],
    ),
    p(
      "Estimates vary with oil, ghee and portion size. Biryani and fried rice fit a fat-loss week, but plan them: have a smaller plate, add raita and salad, and keep the other meals that day lighter.",
    ),

    h2("Common mistakes"),
    ul([
      "Cutting rice completely, then overeating it on weekends.",
      "Eating rice with only rasam or a thin dal, so there is no real protein on the plate.",
      "Second and third helpings because the portion was never decided.",
      "Switching to brown rice and eating twice as much because it is “healthy”.",
      `Blaming rice when the scale stalls, rather than checking total calories — see <a href="${LINK.notLosing}">why you might not be losing weight</a>.`,
    ]),
    toolCta("/calorie-calculator", "calorie calculator", "Set your daily target first with the"),
    p(
      `<strong>Explore the guide:</strong> Rice is one part of your daily calories — see the <a href="/nutrition/calories">calories guide</a> and the <a href="/weight-loss">weight loss guide</a>, and compare portions on our <a href="/foods/rice">rice</a>, <a href="/foods/brown-rice">brown rice</a> and <a href="/foods/roti">roti</a> pages. For a lighter evening plate, see the <a href="${LINK.dinner}">best dinners for weight loss</a>.`,
    ),

    takeaways([
      "Rice is not fattening; total daily calories decide weight loss.",
      "One katori of cooked rice (≈ 50 g raw) is about 175 kcal — a good fat-loss portion for most people.",
      "Brown, red and parboiled rice add a little fibre; portion size matters more than type.",
      "Build every rice plate with protein and plenty of vegetables.",
      "Plan biryani and fried rice instead of banning them.",
    ]),
    p(DISCLAIMER),
  ].join("\n"),
};

const MB_LINK = {
  proteinMuscle: "/blog/muscle-building/muscle-building-nutrition/how-much-protein-to-build-muscle",
  proteinPerDay: "/blog/nutrition/protein/how-much-protein-do-you-need-per-day",
  proteinBeginners: "/blog/nutrition/protein/protein-for-beginners",
  whey: "/blog/nutrition/protein/is-whey-protein-safe",
  curdVsMilk: "/blog/nutrition/protein/curd-vs-milk",
  vegBreakfast: "/blog/nutrition/protein/high-protein-vegetarian-indian-breakfast",
  overload: "/blog/muscle-building/training-programs/what-is-progressive-overload",
  gymDiet: "/blog/muscle-building/beginner-muscle-building/beginner-gym-diet-plan",
  threeDay: "/blog/muscle-building/training-programs/beginner-3-day-gym-workout-plan",
  sets: "/blog/muscle-building/muscle-growth-hypertrophy/how-many-sets-per-muscle-per-week",
  days: "/blog/muscle-building/beginner-muscle-building/how-many-days-a-week-should-i-work-out",
  skinny: "/blog/muscle-building/bulking/how-to-gain-weight-for-skinny-guys",
  strengthFatLoss: "/blog/weight-loss/strength-training-weight-loss/strength-training-for-fat-loss",
};

const SRC_SCHOENFELD_TIMING: IntentSource = {
  title: "Schoenfeld, Aragon & Krieger (2013) — The effect of protein timing on muscle strength and hypertrophy: a meta-analysis (J Int Soc Sports Nutr)",
  url: "https://pubmed.ncbi.nlm.nih.gov/24299050/",
  note: "Timing effects disappeared once total daily protein was accounted for",
};
const SRC_SCHOENFELD_PREPOST: IntentSource = {
  title: "Schoenfeld et al. (2017) — Pre- versus post-exercise protein intake has similar effects on muscular adaptations (PeerJ)",
  url: "https://pubmed.ncbi.nlm.nih.gov/28070459/",
  note: "Protein before or after training gave similar strength and size gains",
};
const SRC_ARAGON_WINDOW: IntentSource = {
  title: "Aragon & Schoenfeld (2013) — Nutrient timing revisited: is there a post-exercise anabolic window? (J Int Soc Sports Nutr)",
  url: "https://pubmed.ncbi.nlm.nih.gov/23360586/",
  note: "A protein meal before training covers much of the post-workout period",
};
const SRC_KERKSICK: IntentSource = {
  title: "Kerksick et al. (2017) — ISSN position stand: nutrient timing (J Int Soc Sports Nutr)",
  url: "https://pubmed.ncbi.nlm.nih.gov/28919842/",
  note: "20–40 g protein every 3–4 hours; pre-sleep protein can support overnight synthesis",
};
const SRC_ARETA: IntentSource = {
  title: "Areta et al. (2013) — Timing and distribution of protein ingestion during prolonged recovery from resistance exercise (J Physiol)",
  url: "https://pubmed.ncbi.nlm.nih.gov/23459753/",
  note: "Four 20 g feedings beat two large or eight small feedings over 12 hours",
};
const SRC_MORTON_2018: IntentSource = {
  title: "Morton et al. (2018) — Protein supplementation and resistance training-induced gains in muscle mass and strength (Br J Sports Med)",
  url: "https://pubmed.ncbi.nlm.nih.gov/28698222/",
  note: "Benefits plateau around 1.6 g protein per kg body weight per day",
};
const SRC_IFCT_FOODS: IntentSource = {
  title: "Longvah et al. (2017) — Indian Food Composition Tables (ICMR-National Institute of Nutrition)",
  url: "https://www.nin.res.in/",
  note: "Protein and calories for the Indian foods in this guide",
};

const proteinTiming: ArticleRewrite = {
  originalOpening: "The internet loves timing wars: anabolic windows measured in minutes.",
  excerpt:
    "Should you eat protein before or after a workout? What the research shows, how big the “anabolic window” really is, how much protein per meal, Indian pre- and post-workout options, and when timing actually matters.",
  quickAnswer: `Either works. Studies comparing protein before vs after training find similar muscle and strength gains — your total daily protein (about 1.6 g per kg) matters far more than the exact timing. Aim for a meal with 20–40 g protein within a couple of hours either side of your workout. Timing matters more if you train fasted early in the morning: then have protein soon after. ${DISCLAIMER}`,
  faq: [
    {
      question: "Do I need a protein shake right after the gym?",
      answer:
        "No. If you ate a meal with protein in the few hours before training, a normal meal within a couple of hours afterwards is enough. A shake is just a convenient way to get 20–30 g of protein.",
    },
    {
      question: "Is it bad to train on an empty stomach?",
      answer:
        "Not for most people, but you'll recover better if you have 20–40 g of protein soon after a fasted session. If fasted training hurts your performance or makes you dizzy, eat something light 60–90 minutes before.",
    },
    {
      question: "Should I eat protein before bed?",
      answer:
        "It can help, especially if you train in the evening or struggle to hit your daily target. 30–40 g from milk, curd, paneer or casein before sleep supports muscle repair overnight.",
    },
    {
      question: "How much protein can the body absorb in one meal?",
      answer:
        "Your body absorbs almost all of it; the question is how much is used for muscle building at once. About 0.3–0.4 g per kg per meal (20–40 g for most people) maximises the response, and larger meals still count toward your daily total.",
    },
  ],
  sources: [
    SRC_SCHOENFELD_TIMING,
    SRC_SCHOENFELD_PREPOST,
    SRC_ARAGON_WINDOW,
    SRC_KERKSICK,
    SRC_ARETA,
    SRC_MORTON_2018,
    SRC_IFCT_FOODS,
  ],
  body: [
    p(
      "Few fitness questions cause more anxiety than protein timing. Do you have to drink a shake within 30 minutes of your last set, or is a pre-workout meal better? The short answer: much less depends on timing than the internet suggests. Here's what the research shows and how to set up your meals around training.",
    ),

    h2("What the research shows"),
    ul([
      "<strong>Total daily protein is what matters most.</strong> A meta-analysis of timing studies found that the apparent benefit of eating protein close to training disappeared once total daily protein was accounted for.",
      "<strong>Before and after work equally well.</strong> In a 10-week trial, lifters who took 25 g of protein right before training gained the same muscle and strength as those who took it right after.",
      "<strong>Spreading protein helps a little.</strong> Four feedings of about 20 g spread across the day produced more muscle protein synthesis than the same protein in two large or eight small doses.",
    ]),
    p(
      `So the order of priorities is: hit your daily target (about 1.6 g per kg for muscle gain — see <a href="${MB_LINK.proteinMuscle}">how much protein to build muscle</a>), spread it over 3–5 meals, and only then worry about timing.`,
    ),

    h2("How big is the “anabolic window”?"),
    p(
      "Much bigger than 30 minutes. Protein from a meal eaten 1–3 hours before training is still being digested and absorbed during and after your workout. Muscles stay more sensitive to protein for at least 24 hours after a session. In practice, if your pre- and post-workout meals are no more than about 4–6 hours apart, you have the window covered.",
    ),

    h2("When timing does matter"),
    table(
      ["Your situation", "What to do"],
      [
        ["Ate a meal 1–3 hours before training", "Eat your next protein meal within a couple of hours after — no rush"],
        ["Train fasted early in the morning", "Have 20–40 g protein soon after training"],
        ["Train in the evening", "Make dinner your post-workout meal; consider protein before bed"],
        ["Two sessions in one day", "Have protein and carbs between sessions"],
        ["Aged 60+", "Aim for about 0.4 g per kg per meal — older muscles need a bigger dose"],
      ],
    ),

    h2("How much protein per meal?"),
    p("About 0.3–0.4 g per kg of body weight per meal, three to five times a day:"),
    table(
      ["Body weight", "Per meal", "Daily target (1.6 g/kg)"],
      [
        ["60 kg", "18–24 g", "≈ 96 g"],
        ["70 kg", "21–28 g", "≈ 112 g"],
        ["80 kg", "24–32 g", "≈ 128 g"],
        ["90 kg", "27–36 g", "≈ 144 g"],
      ],
    ),
    p(
      `New to tracking? Start with <a href="${MB_LINK.proteinBeginners}">protein for beginners</a>, or get your exact daily number from the <a href="/protein-calculator">protein calculator</a>.`,
    ),

    h2("Indian pre- and post-workout meal ideas"),
    p("Values from IFCT 2017 and typical labels:"),
    table(
      ["Meal", "Protein", "Calories"],
      [
        ["2-egg omelette + 2 rotis", "≈ 24 g", "≈ 380 kcal"],
        ["100 g paneer bhurji (1 tsp oil) + 2 rotis", "≈ 25 g", "≈ 495 kcal"],
        ["100 g chicken breast curry + 1 katori rice", "≈ 26 g", "≈ 390 kcal"],
        ["30 g soya chunk curry + 1 katori rice", "≈ 20 g", "≈ 330 kcal"],
        ["200 g hung curd + 1 banana", "≈ 19 g", "≈ 305 kcal"],
        ["1 scoop whey in 250 ml milk", "≈ 32 g", "≈ 300 kcal"],
      ],
    ),
    p(
      `Vegetarian mornings are often low in protein — see <a href="${MB_LINK.vegBreakfast}">high-protein vegetarian Indian breakfasts</a> and <a href="${MB_LINK.curdVsMilk}">curd vs milk</a> for easy upgrades.`,
    ),

    h2("What about carbs?"),
    p(
      "For sessions longer than about an hour or very intense training, carbs 1–2 hours before help performance: a banana, poha, toast or a roti with your protein. After training, carbs refill muscle glycogen, which matters most if you train again within 24 hours. For a typical 45–60 minute gym session, your normal meals cover it.",
    ),

    h2("Do you need a protein shake?"),
    p(
      `No. Whey is simply a convenient, well-studied protein source — useful when you can't get a proper meal after training or struggle to hit your target. It is not more “anabolic” than food. Read <a href="${MB_LINK.whey}">is whey protein safe</a> if you're considering one.`,
    ),

    h2("Protein before bed"),
    p(
      "A 30–40 g dose of slow-digesting protein before sleep — milk, curd, paneer or casein — increases muscle protein synthesis overnight. It is a useful extra if you train in the evening or find it hard to fit enough protein into the day, not a requirement.",
    ),
    p(
      `<strong>Where to go next:</strong> Timing only matters once training is consistent — follow a <a href="${MB_LINK.threeDay}">beginner 3-day gym workout plan</a>, add <a href="${MB_LINK.overload}">progressive overload</a>, and plan meals with the <a href="${MB_LINK.gymDiet}">beginner gym diet plan</a>.`,
    ),
    toolCta("/protein-calculator", "protein calculator", "Find your daily protein target with the"),
    p(
      `<strong>Explore the guide:</strong> For daily targets and food sources, see the <a href="/nutrition/protein">protein guide</a>, all foods <a href="/foods/indian/protein-ranking">ranked by protein</a>, and the <a href="/muscle-building">muscle building guide</a>.`,
    ),

    takeaways([
      "Protein before or after a workout gives similar results — daily total matters most.",
      "Aim for 20–40 g protein (0.3–0.4 g/kg) per meal, 3–5 times a day.",
      "If you train fasted, eat protein soon after; otherwise, there's no 30-minute deadline.",
      "Shakes are convenient, not essential; protein before bed is a useful extra.",
    ]),
    p(DISCLAIMER),
  ].join("\n"),
};

const SRC_SEYNNES: IntentSource = {
  title: "Seynnes, de Boer & Narici (2007) — Early skeletal muscle hypertrophy and architectural changes in response to high-intensity resistance training (J Appl Physiol)",
  url: "https://pubmed.ncbi.nlm.nih.gov/17138722/",
  note: "Muscle size increases were measurable within about 3–4 weeks of training",
};
const SRC_MORITANI: IntentSource = {
  title: "Moritani & deVries (1979) — Neural factors versus hypertrophy in the time course of muscle strength gain (Am J Phys Med)",
  url: "https://pubmed.ncbi.nlm.nih.gov/453338/",
  note: "Early strength gains are mostly neural; hypertrophy contributes more over time",
};
const SRC_SCHOENFELD_VOLUME: IntentSource = {
  title: "Schoenfeld, Ogborn & Krieger (2017) — Dose-response relationship between weekly resistance training volume and increases in muscle mass (J Sports Sci)",
  url: "https://pubmed.ncbi.nlm.nih.gov/27433992/",
  note: "More weekly sets per muscle produced more growth, up to around 10+ sets",
};
const SRC_ROBERTS: IntentSource = {
  title: "Roberts et al. (2020) — Sex differences in resistance training: a systematic review and meta-analysis (J Strength Cond Res)",
  url: "https://pubmed.ncbi.nlm.nih.gov/32218059/",
  note: "Men and women gained muscle size at similar relative rates",
};
const SRC_PETERSON: IntentSource = {
  title: "Peterson, Sen & Gordon (2011) — Influence of resistance exercise on lean body mass in aging adults: a meta-analysis (Med Sci Sports Exerc)",
  url: "https://pubmed.ncbi.nlm.nih.gov/21131862/",
  note: "Adults over 50 gained about 1.1 kg of lean mass with resistance training",
};

const buildMuscleTimeline: ArticleRewrite = {
  originalOpening: "Muscle is patient tissue.",
  excerpt:
    "How long it takes to build muscle: a realistic week-by-week and year-by-year timeline, how much muscle you can gain per month, differences for women and older adults, what speeds it up and how to track progress.",
  quickAnswer: `You'll usually feel stronger within 2–4 weeks, and muscle growth becomes measurable after about 4–8 weeks of consistent training. Visible changes typically show in 8–12 weeks. In the first year, many beginners gain roughly 0.5–1 kg of muscle a month under good conditions (women about half that in absolute terms), and the rate slows each year after. Progressive training, enough protein and calories, and sleep decide how fast you go. ${DISCLAIMER}`,
  faq: [
    {
      question: "Can I gain 5 kg of muscle in a month?",
      answer:
        "No. Even beginners on a good plan gain roughly 0.5–1 kg of muscle a month. A 5 kg jump on the scale in a month would be mostly water, glycogen, food in the gut and fat.",
    },
    {
      question: "How long before I see results from the gym?",
      answer:
        "Strength improves within 2–4 weeks. Most people notice visible changes in the mirror or photos after 8–12 weeks of consistent training and eating, and clear changes after 6–12 months.",
    },
    {
      question: "Do women build muscle more slowly?",
      answer:
        "Women gain muscle at a similar rate relative to their starting size, but less in absolute kilograms, mainly because they start with less muscle and have lower testosterone. Training principles are the same.",
    },
    {
      question: "Is it too late to build muscle after 40 or 50?",
      answer:
        "No. Studies show adults over 50 gain muscle with regular strength training — about 1 kg of lean mass on average in a few months. Progress is slower than at 20, and protein needs per meal are slightly higher.",
    },
  ],
  sources: [SRC_SEYNNES, SRC_MORITANI, SRC_SCHOENFELD_VOLUME, SRC_MORTON_2018, SRC_ROBERTS, SRC_PETERSON, SRC.acsm],
  body: [
    p(
      "Building muscle is slow — but it is also predictable. If you train consistently, eat enough protein and calories and sleep well, you will see changes on a fairly reliable timeline. Knowing that timeline helps you stay patient and spot when something isn't working.",
    ),

    h2("Week-by-week: what to expect"),
    table(
      ["Time training", "What's happening", "What you'll notice"],
      [
        ["Weeks 1–4", "Your nervous system learns the movements and recruits more muscle", "Strength rises quickly; muscles may look fuller from extra water and glycogen"],
        ["Weeks 4–8", "Muscle fibres start to grow measurably", "Small changes in how clothes fit; steady strength gains"],
        ["Months 3–6", "Steady growth if training and food are consistent", "Visible changes in photos, especially shoulders, arms and chest"],
        ["Months 6–12", "Continued growth, slowly tapering", "Clear physique change that other people notice"],
        ["Years 2–5", "Slower gains; training needs more planning", "Refinement and gradual size increases"],
      ],
    ),
    p(
      "Early strength gains are mostly neural — your brain getting better at using the muscle you already have. Ultrasound studies still detect real increases in muscle size within the first month, but they're too small to see in the mirror yet.",
    ),

    h2("How much muscle can you gain per month?"),
    p("Rough coaching estimates under good conditions (consistent training, enough protein, a small calorie surplus and good sleep):"),
    table(
      ["Training experience", "Men", "Women"],
      [
        ["Year 1", "≈ 0.5–1 kg a month", "≈ 0.25–0.5 kg a month"],
        ["Year 2", "≈ 0.25–0.5 kg a month", "≈ 0.1–0.25 kg a month"],
        ["Year 3 and beyond", "≈ 0.1–0.25 kg a month", "≈ 0.1 kg a month or less"],
      ],
    ),
    p(
      "These are estimates, not promises — genetics, age, sleep, stress and how close you are to your starting point all change them. Real-world results are often at the lower end. Scale weight will rise faster than muscle because some water, glycogen and fat come with it.",
    ),

    h2("Women, older adults and people returning to training"),
    ul([
      "<strong>Women</strong> gain muscle at a similar rate relative to their size, but fewer kilograms in total.",
      "<strong>Over 40–50:</strong> growth is slower but very much possible — studies of adults over 50 show around 1 kg of lean mass gained in a few months of training.",
      "<strong>Returning lifters</strong> regain lost muscle much faster than they built it the first time, thanks to “muscle memory”.",
    ]),

    h2("What speeds up muscle growth"),
    ul([
      `<strong>Enough weekly volume:</strong> about 10–20 hard sets per muscle per week, spread over 2 sessions — see <a href="${MB_LINK.sets}">how many sets per muscle per week</a>.`,
      `<strong>Progressive overload:</strong> add weight or reps over time and log it — <a href="${MB_LINK.overload}">what progressive overload is</a>.`,
      `<strong>Protein:</strong> about 1.6 g per kg per day — <a href="${MB_LINK.proteinMuscle}">how much protein to build muscle</a>.`,
      `<strong>A small calorie surplus:</strong> about 5–10% above maintenance; very thin people may need more — <a href="${MB_LINK.skinny}">how to gain weight for skinny guys</a>.`,
      "<strong>Sleep:</strong> 7–9 hours a night.",
      "<strong>Consistency:</strong> the same solid program for at least 8–12 weeks before changing it.",
    ]),

    h2("What slows you down"),
    ul([
      "Eating too little while trying to “bulk”.",
      "Changing programs every few weeks, so nothing progresses.",
      "Training every set to failure with no plan for adding weight.",
      "Missing sessions — two good workouts a week beat five sporadic ones.",
      "Comparing your third month with someone else's fifth year.",
    ]),

    h2("How to track progress"),
    table(
      ["Measure", "How often", "What good progress looks like"],
      [
        ["Strength log", "Every session", "More weight or reps on main lifts most weeks"],
        ["Body weight (weekly average)", "Weekly", "Beginners gaining: about 0.5–1 kg a month"],
        ["Tape: arms, chest, thighs, waist", "Every 4 weeks", "Arms and chest up; waist roughly stable"],
        ["Photos in the same light", "Every 4 weeks", "Visible change every 2–3 months"],
      ],
    ),
    p(
      `If you're trying to lose fat at the same time, the scale may barely move while your shape changes — see <a href="${MB_LINK.strengthFatLoss}">strength training for fat loss</a>.`,
    ),
    p(
      `<strong>Where to go next:</strong> Start with a <a href="${MB_LINK.threeDay}">beginner 3-day gym workout plan</a>, decide <a href="${MB_LINK.days}">how many days a week to work out</a>, and plan your meals with the <a href="${MB_LINK.gymDiet}">beginner gym diet plan</a>.`,
    ),
    toolCta("/protein-calculator", "protein calculator", "Get your daily protein target with the"),
    p(
      `<strong>Explore the guide:</strong> Training, nutrition and recovery for beginners are all in the <a href="/muscle-building">muscle building guide</a>.`,
    ),

    takeaways([
      "Strength improves in 2–4 weeks; visible muscle usually takes 8–12 weeks.",
      "Beginners can gain roughly 0.5–1 kg of muscle a month in year one; it slows after.",
      "Women and older adults build muscle too — fewer kilograms, similar principles.",
      "Volume, progressive overload, protein, a small surplus and sleep set the pace.",
    ]),
    p(DISCLAIMER),
  ].join("\n"),
};

export const ARTICLE_REWRITES: Record<string, ArticleRewrite> = {
  "is-rice-good-for-weight-loss": rice,
  "protein-before-or-after-workout": proteinTiming,
  "how-long-does-it-take-to-build-muscle": buildMuscleTimeline,
};
