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

const FOOD_LINK = {
  paneer100: "/blog/nutrition/protein/100g-paneer-calories-and-protein",
  chicken100: "/blog/nutrition/protein/100g-chicken-breast-calories-and-protein",
  eggs2: "/blog/nutrition/protein/2-eggs-calories-and-protein",
  bestProtein: "/blog/nutrition/protein/best-high-protein-indian-foods",
  paneerVsTofu: "/blog/nutrition/protein/paneer-vs-tofu",
  dalVsChicken: "/blog/nutrition/protein/dal-vs-chicken-for-protein",
  soya: "/blog/nutrition/protein/soya-chunks-protein",
  eggetarian: "/blog/nutrition/protein/protein-sources-for-eggetarians",
  vegProtein: "/blog/nutrition/protein/vegetarian-protein-sources-india",
  kidneys: "/blog/nutrition/protein/is-too-much-protein-bad-for-kidneys",
  breakfast: "/blog/weight-loss/diet-meal-planning/best-breakfast-for-weight-loss",
  vegWl: "/blog/weight-loss/weight-loss-nutrition/how-to-lose-weight-on-a-vegetarian-diet",
  bestIndianWl: "/blog/weight-loss/weight-loss-nutrition/best-indian-foods-for-weight-loss",
  maintenance: "/blog/nutrition/calories-energy/maintenance-calories",
  walking: "/blog/weight-loss/walking-daily-activity/does-walking-help-you-lose-weight",
};

const SRC_LEIDY: IntentSource = {
  title: "Leidy et al. (2015) — The role of protein in weight loss and maintenance (Am J Clin Nutr)",
  url: "https://pubmed.ncbi.nlm.nih.gov/25926512/",
  note: "Higher-protein diets improve fullness and help preserve lean mass during weight loss",
};
const SRC_WYCHERLEY: IntentSource = {
  title: "Wycherley et al. (2012) — Effects of energy-restricted high-protein, low-fat compared with standard-protein, low-fat diets: a meta-analysis (Am J Clin Nutr)",
  url: "https://pubmed.ncbi.nlm.nih.gov/23097268/",
  note: "Higher protein in a calorie deficit gave slightly more fat loss and less lean-mass loss",
};

const paneerWeightLoss: ArticleRewrite = {
  originalOpening: "Paneer is not the enemy of fat loss.",
  excerpt:
    "Yes, paneer can help you lose weight — if you portion it. Calories and protein for 50–150 g, how paneer compares with tofu, eggs and chicken per calorie, low-fat paneer, and paneer meals that fit a calorie deficit.",
  quickAnswer: `Yes. Paneer helps weight loss because its protein keeps you full and protects muscle in a calorie deficit. But it is calorie-dense: 100 g of full-fat paneer has about 258 kcal and 19 g protein, and over half of those calories come from fat. For fat loss, 50–100 g per meal (130–260 kcal) works for most people. Grill it, scramble it or add it to sabzi with measured oil rather than frying it, and pair it with vegetables and roti or rice. ${DISCLAIMER}`,
  faq: [
    {
      question: "How much paneer can I eat per day to lose weight?",
      answer:
        "Most people losing weight do well with 50–100 g at a meal and up to about 150 g across the day, as long as it fits your calorie target. Get the rest of your protein from dal, curd, milk, soya or eggs rather than adding more paneer.",
    },
    {
      question: "Is low-fat paneer better for weight loss?",
      answer:
        "It helps if your calories are tight. Low-fat paneer made from toned or skimmed milk often has roughly a quarter fewer calories for similar protein — check the label, as brands vary. Full-fat paneer is fine in smaller portions if you prefer the taste.",
    },
    {
      question: "Can I eat paneer at night?",
      answer:
        "Yes. Eating paneer at dinner does not cause weight gain; your total calories across the day decide that. A paneer dinner with vegetables is a filling, protein-rich way to end the day.",
    },
    {
      question: "Is raw paneer better than cooked paneer?",
      answer:
        "Calories and protein are the same raw or cooked. What changes the numbers is the oil, butter or cream added while cooking — a teaspoon of oil adds about 45 kcal, and a restaurant gravy can add 200 kcal or more.",
    },
    {
      question: "Is paneer better than eggs or chicken for weight loss?",
      answer:
        "Not per calorie: chicken breast and egg whites give far more protein for the same calories. For vegetarians, paneer is still one of the most convenient protein sources; just pair it with lower-fat proteins like dal, hung curd, tofu or soya chunks.",
    },
  ],
  sources: [SRC_IFCT_FOODS, SRC_LEIDY, SRC_WYCHERLEY, SRC.issnProtein, SRC.icmr],
  body: [
    p(
      "Paneer is the default protein for most vegetarian Indians, so it is often the first food people question when they start a diet. It does not need to go. Paneer is high in protein, very filling and easy to cook in a dozen ways. The catch is that it is also high in fat, so the portion and the cooking decide whether it helps or hurts.",
      `This guide gives you the numbers per portion, how paneer compares with other proteins, and meals that fit a calorie deficit. For the full nutrient breakdown, see <a href="${FOOD_LINK.paneer100}">100 g paneer calories and protein</a>.`,
    ),

    h2("Paneer calories and protein by portion"),
    p(
      "Values for full-fat paneer from the Indian Food Composition Tables (IFCT 2017). Four average cubes weigh about 50 g.",
    ),
    table(
      ["Portion", "Calories", "Protein", "Fat"],
      [
        ["50 g (≈ 4 cubes)", "129 kcal", "9.4 g", "7.4 g"],
        ["75 g", "194 kcal", "14.1 g", "11.1 g"],
        ["100 g", "258 kcal", "18.9 g", "14.8 g"],
        ["150 g", "387 kcal", "28.3 g", "22.2 g"],
      ],
    ),
    p(
      "About 52% of paneer's calories come from fat and 29% from protein. That fat is why paneer is so satisfying — and why an unmeasured 200 g serving can quietly add 500+ kcal. Use the serving calculator on our <a href=\"/foods/paneer\">paneer nutrition page</a> for your exact portion.",
    ),

    h2("Why paneer can help you lose weight"),
    ul([
      "<strong>Protein keeps you full.</strong> Higher-protein diets reduce hunger and help people stick to a calorie deficit.",
      "<strong>It protects muscle.</strong> In a deficit, enough protein means more of the weight you lose is fat rather than muscle.",
      "<strong>It is easy to cook and hard to get bored of.</strong> Bhurji, tikka, palak paneer and paneer sabzi all work.",
      "<strong>It needs no special shopping.</strong> Paneer is available everywhere and is easy to make at home.",
    ]),
    p(
      `Protein is the single most useful thing to get right in a vegetarian fat-loss diet. See <a href="${LINK.proteinWl}">how much protein you need for weight loss</a> and <a href="${FOOD_LINK.vegWl}">how to lose weight on a vegetarian diet</a>.`,
    ),

    h2("Paneer vs other proteins, per calorie"),
    p("How many calories you eat to get 20 g of protein:"),
    table(
      ["Food", "Amount for 20 g protein", "Calories"],
      [
        ["Egg whites", "≈ 5–6 whites", "≈ 85 kcal"],
        ["Soya chunks", "≈ 40 g dry", "≈ 140 kcal"],
        ["Chicken breast", "≈ 92 g raw", "≈ 155 kcal"],
        ["Firm tofu", "≈ 115 g", "≈ 165 kcal"],
        ["Hung curd", "≈ 230 g", "≈ 230 kcal"],
        ["Moong dal", "≈ 84 g dry", "≈ 273 kcal"],
        ["Full-fat paneer", "≈ 106 g", "≈ 274 kcal"],
      ],
    ),
    p(
      `Paneer is not the leanest protein, which is why portion matters. Mixing it with leaner sources — tofu, soya chunks, hung curd or dal — lets you eat paneer every day and still hit your protein target. See the full comparison in <a href="${FOOD_LINK.paneerVsTofu}">paneer vs tofu</a>, or every food ranked on our <a href="/foods/indian/protein-ranking">protein ranking page</a>.`,
    ),

    h2("How much paneer to eat for weight loss"),
    table(
      ["Situation", "Paneer per meal", "Roughly"],
      [
        ["Smaller or less active", "50 g", "130 kcal, 9 g protein"],
        ["Most people losing weight", "75–100 g", "195–260 kcal, 14–19 g protein"],
        ["Taller, very active or training hard", "100–150 g", "260–390 kcal, 19–28 g protein"],
      ],
    ),
    p(
      "Weigh your paneer once or twice so you learn what 75 g or 100 g looks like. Make paneer one of your protein sources for the day, not the only one.",
    ),

    h2("Cooking: where paneer calories really come from"),
    p("Rough estimates per serving; oil, butter and cream vary widely."),
    table(
      ["Dish", "Serving", "Calories", "Protein"],
      [
        ["Grilled paneer tikka", "100 g paneer, curd marinade, 1 tsp oil", "≈ 340 kcal", "≈ 20 g"],
        ["Paneer bhurji", "100 g paneer, 1 tsp oil, onion and tomato", "≈ 330 kcal", "≈ 20 g"],
        ["Home-style palak paneer", "1 katori (75 g paneer, 1 tsp oil)", "≈ 270 kcal", "≈ 17 g"],
        ["Paneer pakora", "4 pieces (≈ 60 g paneer), deep-fried", "≈ 320 kcal", "≈ 15 g"],
        ["Restaurant paneer butter masala", "1 katori", "≈ 400–550 kcal", "≈ 15–18 g"],
      ],
    ),
    ul([
      "Grill, air-fry, scramble or add paneer to sabzi with a measured teaspoon of oil.",
      "Skip the pre-frying step many recipes use before adding paneer to gravy.",
      "Use tomato, onion and curd gravies rather than cream, cashew paste or butter.",
      "Treat paneer pakora and paneer butter masala as planned treats, not daily meals.",
    ]),

    h2("Paneer meals that fit a calorie deficit"),
    table(
      ["Meal", "What's on the plate", "Calories", "Protein"],
      [
        ["Bhurji and roti", "75 g paneer bhurji (1 tsp oil) + 2 roti + salad", "≈ 450 kcal", "≈ 21 g"],
        ["Tikka salad", "100 g grilled paneer + large vegetable salad (1 tsp oil)", "≈ 340 kcal", "≈ 21 g"],
        ["Palak paneer plate", "1 katori palak paneer + 1 roti + ½ katori curd", "≈ 410 kcal", "≈ 22 g"],
        ["Lunch thali", "50 g paneer sabzi + 1 katori moong dal + 1 katori rice", "≈ 470 kcal", "≈ 22 g"],
      ],
    ),
    p(
      `Each plate lands around 20 g protein for 340–470 kcal. For more ideas, see the <a href="${LINK.dinner}">best dinners for weight loss</a>, and set your daily calorie target with the <a href="/calorie-calculator">calorie calculator</a>.`,
    ),

    h2("Low-fat or full-fat paneer?"),
    p(
      "Low-fat paneer, made from toned or skimmed milk, usually has around a quarter fewer calories for similar protein — check the label, as brands differ. It is firmer and can turn rubbery if overcooked, so it suits bhurji and gravies more than tikka. If you prefer full-fat paneer, just use a smaller portion; either fits a fat-loss diet.",
    ),

    h2("Common mistakes"),
    ul([
      "Eating paneer by the block because it is “healthy protein”, without weighing it.",
      "Ordering paneer dishes out several times a week — restaurant gravies often double the calories.",
      "Relying on paneer alone for protein, instead of mixing in dal, curd, soya or eggs.",
      "Cutting paneer out completely, then struggling to eat enough protein as a vegetarian.",
    ]),
    toolCta("/protein-calculator", "protein calculator", "Find your daily protein target with the"),
    p(
      `<strong>Explore the guide:</strong> For the full plan, see the <a href="/weight-loss">weight loss guide</a> and the <a href="/nutrition/protein">protein guide</a>. Vegetarian and want more options? See <a href="${FOOD_LINK.vegProtein}">vegetarian protein sources in India</a>.`,
    ),

    takeaways([
      "Paneer supports weight loss when portioned: 50–100 g per meal suits most people.",
      "100 g of full-fat paneer has about 258 kcal and 19 g protein; over half the calories are fat.",
      "Cooking method matters more than paneer itself — grill or scramble, don't fry.",
      "Mix paneer with leaner proteins like tofu, soya chunks, hung curd and dal.",
    ]),
    p(DISCLAIMER),
  ].join("\n"),
};

const SRC_NASEM_WATER: IntentSource = {
  title: "National Academies (2005) — Dietary Reference Intakes for Water, Potassium, Sodium, Chloride, and Sulfate",
  url: "https://nap.nationalacademies.org/catalog/10925",
  note: "Adequate intake for total water; most needs are met by thirst and normal drinking",
};
const SRC_ACSM_FLUIDS: IntentSource = {
  title: "Sawka et al. (2007) — ACSM position stand: exercise and fluid replacement (Med Sci Sports Exerc)",
  url: "https://pubmed.ncbi.nlm.nih.gov/17277604/",
  note: "Drink 5–7 ml/kg about 4 hours before exercise; limit losses to under 2% of body weight",
};
const SRC_DENNIS: IntentSource = {
  title: "Dennis et al. (2010) — Water consumption increases weight loss during a hypocaloric diet intervention (Obesity)",
  url: "https://pubmed.ncbi.nlm.nih.gov/19661958/",
  note: "500 ml of water before meals led to about 2 kg extra loss over 12 weeks",
};
const SRC_KILLER: IntentSource = {
  title: "Killer, Blannin & Jeukendrup (2014) — No evidence of dehydration with moderate daily coffee intake (PLoS One)",
  url: "https://pubmed.ncbi.nlm.nih.gov/24416202/",
  note: "Moderate coffee hydrated habitual drinkers as well as water",
};

const waterIntake: ArticleRewrite = {
  originalOpening: "Hydration advice online swings between",
  excerpt:
    "How much water you need per day by body weight, how much more for heat and workouts, what counts as water, how to tell if you're drinking enough, and whether water helps weight loss.",
  quickAnswer: `Most healthy adults need about 33 ml of fluid per kg of body weight a day from drinks — around 2.3 litres (9 glasses) for a 70 kg adult. Add about 700 ml for every hour of sweaty exercise and about 500 ml on hot days. Tea, coffee, milk, chaas and dal all count. Pale-yellow urine and rarely feeling thirsty mean you're drinking enough. Water doesn't burn fat, but a glass before meals can help you eat less. ${DISCLAIMER}`,
  faq: [
    {
      question: "Do tea and coffee count towards water intake?",
      answer:
        "Yes. Studies in regular coffee drinkers found moderate coffee (3–4 cups a day) hydrated them about as well as water. Chai, coffee, milk, chaas and coconut water all count. Very high caffeine intake can affect sleep, so keep it moderate.",
    },
    {
      question: "Is clear urine all day a good sign?",
      answer:
        "Not necessarily. Pale straw-yellow urine is the target. Urine that is colourless all day usually means you're drinking more than you need, which is unnecessary and, in extreme amounts, unsafe.",
    },
    {
      question: "Does drinking 4–5 litres of water help weight loss?",
      answer:
        "No. Extra water beyond your needs does not burn fat. What helps is drinking water instead of sugary drinks and, for some people, a glass or two before meals to feel fuller. Fat loss still depends on a calorie deficit.",
    },
    {
      question: "Is warm water better than cold water for weight loss?",
      answer:
        "No meaningful difference. Warm water with lemon or jeera is fine if you enjoy it, but it does not melt fat. Drink whichever temperature helps you drink enough.",
    },
    {
      question: "How much water should I drink during a workout?",
      answer:
        "For most gym sessions under an hour, sip to thirst — often 300–500 ml. For long or very sweaty sessions, aim to drink enough that you lose less than 2% of your body weight, and add some salt (ORS, nimbu pani or chaas) for sessions over 60–90 minutes in the heat.",
    },
  ],
  sources: [SRC.hydration, SRC_NASEM_WATER, SRC_ACSM_FLUIDS, SRC_DENNIS, SRC_KILLER, SRC.icmr],
  body: [
    p(
      "Hydration advice swings between “sip occasionally” and “carry a 4-litre bottle everywhere.” Neither is right for most people. Your needs depend on your body weight, the weather and how much you sweat, and your body gives you clear signals when you're short.",
      "This guide gives you a starting number, tells you when to drink more, and shows how to check you're getting it right — including in an Indian summer.",
    ),

    h2("How much water you need per day"),
    p(
      "A practical starting point is about 33 ml of fluid from drinks per kg of body weight. Food — dal, curd, fruit, vegetables — supplies roughly a fifth of your total water on top of what you drink. European (EFSA) guidance sets total water from food and drinks at about 2.0 litres a day for women and 2.5 litres for men in a mild climate.",
    ),
    table(
      ["Body weight", "Base (drinks)", "Glasses (250 ml)", "With 1 h training on a hot day"],
      [
        ["50 kg", "≈ 1.65 L", "≈ 7", "≈ 2.9 L"],
        ["60 kg", "≈ 2.0 L", "≈ 8", "≈ 3.2 L"],
        ["70 kg", "≈ 2.3 L", "≈ 9", "≈ 3.5 L"],
        ["80 kg", "≈ 2.6 L", "≈ 11", "≈ 3.9 L"],
        ["90 kg", "≈ 3.0 L", "≈ 12", "≈ 4.2 L"],
      ],
    ),
    p(
      "Get your own number, including exercise and climate, with the <a href=\"/water-intake-calculator\">water intake calculator</a>.",
    ),

    h2("When you need more water"),
    table(
      ["Situation", "Add roughly"],
      [
        ["Each hour of sweaty exercise", "≈ 700 ml"],
        ["Hot day, outdoor work or no AC", "≈ 500 ml or more"],
        ["Pregnancy", "≈ 300 ml"],
        ["Breastfeeding", "≈ 700 ml"],
        ["Fever, vomiting or diarrhoea", "Use ORS and see a doctor if it's severe or lasts"],
      ],
    ),
    p(
      "Older adults feel thirst less strongly, so drinking on a routine — a glass with each meal and one mid-morning and mid-afternoon — works better than waiting to feel thirsty.",
    ),

    h2("Water for workouts"),
    ul([
      "<strong>Before:</strong> about 5–7 ml per kg roughly 4 hours before training — around 350–500 ml for a 70 kg person — then a few sips just before you start.",
      "<strong>During:</strong> for sessions under an hour, sip to thirst. For longer or very sweaty sessions, aim to lose less than 2% of your body weight.",
      "<strong>After:</strong> weigh yourself before and after a hard session once. Drink about 1.25–1.5 litres for every kg lost, spread over the next few hours.",
      "<strong>Salt for long sessions:</strong> for 60–90+ minutes in the heat, add sodium — ORS, nimbu pani with a pinch of salt, or chaas.",
    ]),

    h2("What counts as water"),
    p(
      "All drinks count, not just plain water. Chai, coffee, milk, chaas, nimbu pani, coconut water and soups all add to your total, and so do water-rich foods like dal, curd, watermelon, cucumber and oranges. In regular coffee drinkers, moderate coffee hydrates about as well as water. Sugary drinks count too, but a 300 ml soft drink adds around 120–140 kcal, so water, chaas and unsweetened chai are the better daily choices.",
    ),

    h2("How to tell if you're drinking enough"),
    table(
      ["Sign", "What it suggests"],
      [
        ["Pale straw-yellow urine, rarely thirsty", "You're on track"],
        ["Dark yellow urine, headache, tiredness, dry mouth", "Drink more"],
        ["Urine colourless all day, running to the toilet constantly", "You can ease off"],
      ],
    ),
    p(
      "Some multivitamins (especially B vitamins) turn urine bright yellow regardless of hydration, so use thirst and energy as checks too.",
    ),

    h2("Does drinking water help weight loss?"),
    p(
      "Water has no calories and does not burn fat, but it helps in two practical ways. First, replacing sugary drinks, packaged juices and sweet chai cuts calories without extra hunger. Second, in a 12-week trial, adults on a diet who drank 500 ml of water before each meal lost about 2 kg more than those who didn't, probably because they ate a little less.",
      `Water can also mask fat loss on the scale for a week or two after a salty meal or a hard workout — here's <a href="${LINK.notLosing}">how to tell a real plateau from water</a>. For the food side, see the <a href="${FOOD_LINK.bestIndianWl}">best Indian foods for weight loss</a> and get a daily target from the <a href="/calorie-calculator">calorie calculator</a>.`,
    ),

    h2("Can you drink too much water?"),
    p(
      "Yes, though it's rare. Healthy kidneys can clear roughly 0.8–1 litre an hour; drinking far more than that for hours can dilute your blood sodium (hyponatraemia), which causes nausea, headache and confusion. The risk is highest in long endurance events and “water challenges”. People with kidney, heart or liver disease, or on diuretics, may have a fluid limit — follow your doctor's advice.",
    ),

    h2("Simple habits that work"),
    ul([
      "Keep a 1-litre bottle at your desk and aim to finish it twice a day.",
      "Drink a glass of water with every meal and before each cup of chai or coffee.",
      "Carry water when commuting in summer, and drink before you feel thirsty outdoors.",
      "Swap one sugary drink a day for water, chaas or nimbu pani without sugar.",
    ]),
    toolCta("/water-intake-calculator", "water intake calculator", "Get your personal daily target with the"),
    p(
      `<strong>Explore the guide:</strong> Water is one part of your diet: see <a href="${FOOD_LINK.maintenance}">how to find your maintenance calories</a>, <a href="${FOOD_LINK.walking}">whether walking helps you lose weight</a>, and the full <a href="/nutrition">nutrition guide</a>.`,
    ),

    takeaways([
      "Start at about 33 ml per kg from drinks — around 2.3 litres for a 70 kg adult.",
      "Add about 700 ml per hour of sweaty exercise and 500 ml on hot days.",
      "Tea, coffee, milk, chaas and water-rich foods all count.",
      "Pale-yellow urine and rare thirst mean you're drinking enough.",
      "Water doesn't burn fat, but swapping sugary drinks and drinking before meals helps.",
    ]),
    p(DISCLAIMER),
  ].join("\n"),
};

const SRC_DROUIN: IntentSource = {
  title: "Drouin-Chartier et al. (2020) — Egg consumption and risk of cardiovascular disease: three large prospective US cohort studies, systematic review, and updated meta-analysis (BMJ)",
  url: "https://pubmed.ncbi.nlm.nih.gov/32132002/",
  note: "Up to one egg a day was not associated with higher cardiovascular risk",
};
const SRC_EVENEPOEL: IntentSource = {
  title: "Evenepoel et al. (1998) — Digestibility of cooked and raw egg protein in humans (J Nutr)",
  url: "https://pubmed.ncbi.nlm.nih.gov/9772161/",
  note: "About 91% of cooked egg protein was absorbed vs about 51% of raw",
};

const twoEggs: ArticleRewrite = {
  originalOpening: "Two eggs is the default Indian fitness breakfast for a reason",
  excerpt:
    "Calories and protein in 1, 2, 3 and 4 eggs, yolk vs white, how cooking changes the numbers, egg breakfasts with full macros, and how many eggs fit your daily protein target.",
  quickAnswer: `Two boiled eggs (about 45 g each without the shell) have about 133 kcal, 12 g protein, 9.5 g fat and almost no carbohydrate (IFCT 2017). Two large eggs (about 50 g each) are closer to 148 kcal and 13.4 g protein. Cooking in a teaspoon of oil or ghee adds about 45 kcal. Two eggs cover roughly 11–14% of a typical 85–110 g daily protein target, so pair them with other protein foods. ${DISCLAIMER}`,
  faq: [
    {
      question: "Are egg yolks unhealthy?",
      answer:
        "For most healthy people, no. Large studies found up to one egg a day was not linked to higher heart disease risk, and the yolk carries most of the egg's vitamins A, D and B12 and choline. If you have high LDL cholesterol, diabetes or heart disease, ask your doctor how many yolks suit you.",
    },
    {
      question: "Boiled or bhurji — which is better?",
      answer:
        "Protein is the same. Bhurji and omelettes add the oil or ghee you cook them in — about 45 kcal per teaspoon. Measure the oil if you are counting calories, and add onion, tomato and spinach for volume.",
    },
    {
      question: "How many eggs can I eat a day?",
      answer:
        "Many healthy people eat 1–3 whole eggs a day. If you want more protein without more fat, add egg whites rather than extra whole eggs.",
    },
    {
      question: "Do raw eggs have more protein?",
      answer:
        "No. Your body absorbs cooked egg protein much better — around 91% versus about 51% for raw eggs in one study — and raw eggs carry a salmonella risk. Cook them.",
    },
    {
      question: "Are two eggs enough protein for breakfast?",
      answer:
        "Two eggs give about 12 g. Many people feel fuller with 20–30 g at breakfast — add two egg whites, a glass of milk, or curd to get there.",
    },
  ],
  sources: [SRC_IFCT_FOODS, SRC.usdaFdc, SRC_DROUIN, SRC_EVENEPOEL, SRC.issnProtein],
  body: [
    p(
      "Two eggs is the default Indian fitness breakfast for good reason: cheap, quick and one of the highest-quality proteins you can buy. Knowing exactly what two eggs give you helps you decide whether to stop at two or add whites, milk or paneer to reach your protein target.",
      `Values below are from the Indian Food Composition Tables (IFCT 2017) for whole boiled eggs without the shell. Get any number of eggs on our <a href="/foods/boiled-egg">boiled egg nutrition page</a>.`,
    ),

    h2("Calories and protein in eggs"),
    table(
      ["Eggs (≈ 45 g each)", "Calories", "Protein", "Fat"],
      [
        ["1 egg", "67 kcal", "6.0 g", "4.7 g"],
        ["2 eggs", "133 kcal", "12.1 g", "9.5 g"],
        ["3 eggs", "200 kcal", "18.1 g", "14.2 g"],
        ["4 eggs", "266 kcal", "24.2 g", "19.0 g"],
      ],
    ),
    p(
      "Most eggs sold in India weigh 50–60 g in the shell, or about 45–52 g without it. Two large eggs (50 g each) come to about 148 kcal and 13.4 g protein. Eggs have almost no carbohydrate and no fibre.",
    ),

    h2("Yolk vs white"),
    table(
      ["Part (2 eggs)", "Calories", "Protein", "Fat"],
      [
        ["2 whites", "≈ 32 kcal", "≈ 7.4 g", "≈ 0.2 g"],
        ["2 yolks", "≈ 101 kcal", "≈ 4.7 g", "≈ 9.3 g"],
        ["2 whole eggs", "133 kcal", "12.1 g", "9.5 g"],
      ],
    ),
    p(
      `The white supplies most of the protein for very few calories; the yolk carries most of the fat along with vitamins A, D and B12 and choline. Whole eggs are a nutritious default. If you want more protein without more calories, add <a href="/foods/egg-white">egg whites</a> rather than extra whole eggs.`,
    ),

    h2("How cooking changes the numbers"),
    table(
      ["2 eggs, cooked as", "Calories", "Protein"],
      [
        ["Boiled or poached", "133 kcal", "12.1 g"],
        ["Omelette with 1 tsp oil", "≈ 180 kcal", "≈ 12 g"],
        ["Bhurji with 1 tsp oil, onion and tomato", "≈ 200 kcal", "≈ 12.5 g"],
        ["Fried in 2 tsp ghee or butter", "≈ 205–220 kcal", "≈ 12 g"],
        ["Egg curry, restaurant serving", "≈ 300–400 kcal", "≈ 13–14 g"],
      ],
    ),
    p(
      "Protein barely changes with cooking; calories change with the fat you add. A non-stick pan and a measured teaspoon of oil keep an omelette under 200 kcal. Always cook eggs fully — cooked egg protein is absorbed far better than raw, and raw eggs carry a salmonella risk.",
    ),

    h2("Egg breakfasts with full numbers"),
    table(
      ["Breakfast", "Calories", "Protein"],
      [
        ["2 boiled eggs + 1 banana", "≈ 240 kcal", "≈ 13 g"],
        ["Egg poha: 1 plate poha (1 tsp oil) + 2 boiled eggs", "≈ 355 kcal", "≈ 16 g"],
        ["2-egg bhurji (1 tsp oil) + 2 roti", "≈ 390 kcal", "≈ 19 g"],
        ["2 eggs + 2 whites omelette (1 tsp oil) + 1 glass milk", "≈ 355 kcal", "≈ 26 g"],
      ],
    ),
    p(
      `Adding two whites and a glass of milk doubles the protein for about 180 extra kcal — useful on training days. More ideas are in the <a href="${FOOD_LINK.breakfast}">best breakfasts for weight loss</a>.`,
    ),

    h2("Where two eggs fit in your day"),
    p(
      `Most active adults do well with about 1.2–1.6 g of protein per kg of body weight — about 85–110 g a day at 70 kg. Two eggs cover roughly 11–14% of that, so they are a strong start, not the whole plan. See <a href="${MB_LINK.proteinPerDay}">how much protein you need per day</a>, or get your number from the <a href="/protein-calculator">protein calculator</a>.`,
    ),
    table(
      ["Food", "Protein per 100 kcal"],
      [
        ["Egg whites", "23.3 g"],
        ["Chicken breast", "13.0 g"],
        ["Whole eggs", "9.1 g"],
        ["Paneer", "7.3 g"],
        ["Moong dal", "7.3 g"],
      ],
    ),
    p(
      `Whole eggs sit in the middle — leaner than paneer or dal, less lean than chicken or egg whites. For vegetarian swaps, compare <a href="${FOOD_LINK.paneer100}">100 g of paneer</a>; for meat, see <a href="${FOOD_LINK.chicken100}">100 g chicken breast</a>.`,
    ),

    h2("Eggs and cholesterol"),
    p(
      "One large egg has around 185 mg of cholesterol, almost all in the yolk. For most healthy people, dietary cholesterol has a smaller effect on blood cholesterol than once thought, and a large 2020 analysis found up to one egg a day was not linked to higher heart disease risk. If you have high LDL cholesterol, diabetes or heart disease, agree your egg intake with your doctor — and you can still use egg whites freely.",
    ),

    h2("Common mistakes"),
    ul([
      "Counting two eggs as a full protein breakfast when your target is 25–30 g.",
      "Cooking in 2–3 teaspoons of oil or butter without counting it.",
      "Throwing away every yolk — you lose most of the vitamins for a small calorie saving.",
      "Drinking raw eggs for “more protein”.",
    ]),
    p(
      `<strong>Explore the guide:</strong> See where eggs rank among the <a href="${FOOD_LINK.bestProtein}">best high-protein Indian foods</a>, build a full day with <a href="${FOOD_LINK.eggetarian}">protein sources for eggetarians</a>, or browse the full <a href="/nutrition/protein">protein guide</a>.`,
    ),

    takeaways([
      "Two boiled eggs ≈ 133 kcal and 12 g protein; two large eggs ≈ 148 kcal and 13.4 g.",
      "Whites give most of the protein; yolks give most of the fat and vitamins.",
      "Each teaspoon of oil or ghee adds about 45 kcal.",
      "Two eggs cover about 11–14% of a typical daily protein target — add whites, milk or curd.",
    ]),
    p(DISCLAIMER),
  ].join("\n"),
};

const bestProteinFoods: ArticleRewrite = {
  originalOpening: "You do not need a foreign grocery haul to eat high protein in India.",
  excerpt:
    "The best high-protein Indian foods ranked per serving and per calorie — chicken, fish, eggs, paneer, soya, tofu, hung curd, dals and more — with veg and non-veg sample days that reach 100 g protein.",
  quickAnswer: `The best high-protein Indian foods per serving are chicken breast (≈ 22 g per 100 g raw), prawns (≈ 19 g), paneer (≈ 19 g per 100 g), firm tofu (≈ 17 g per 100 g), rohu fish (≈ 15 g per piece), soya chunks (≈ 15 g per 30 g dry), hung curd (≈ 13 g per 150 g) and eggs (≈ 12 g for two). Dals and chana give about 7–8 g per katori. For the most protein per calorie, choose egg whites, prawns, fish, soya chunks and chicken. Spread 3–4 of these across the day to reach about 1.2–1.6 g per kg. ${DISCLAIMER}`,
  faq: [
    {
      question: "Is dal enough protein on its own?",
      answer:
        "Rarely. One katori of cooked dal has about 7 g protein, so you would need around 11 katoris to reach 80 g. Dal is a great base — add curd, paneer, soya, tofu, eggs, fish or chicken to reach higher targets.",
    },
    {
      question: "Which Indian food has the most protein?",
      answer:
        "Per 100 g as bought, soya chunks lead (around 50 g per 100 g dry, by pack labels), followed by dry soybean (≈ 38 g). Per cooked serving, chicken breast, fish, prawns and paneer give the most — about 15–22 g each.",
    },
    {
      question: "What are the best high-protein foods for vegetarians?",
      answer:
        "Paneer, soya chunks, tofu, hung curd and Greek yogurt, milk, and dals, rajma and chana. Combining dal with rice or roti also improves the overall protein quality of the meal.",
    },
    {
      question: "Do I need whey protein?",
      answer:
        "No. Whey is a convenient, well-studied protein (about 22–25 g per scoop), useful if you struggle to hit your target from food. It is not required to build muscle or lose fat.",
    },
    {
      question: "Is a high-protein diet bad for the kidneys?",
      answer:
        "In healthy people, protein intakes common in fitness diets have not been shown to harm the kidneys. If you have kidney disease, follow your doctor's protein limit.",
    },
  ],
  sources: [SRC_IFCT_FOODS, SRC.icmr, SRC.issnProtein, SRC_MORTON_2018, SRC.usdaFdc, SRC.whoProtein],
  body: [
    p(
      "You don't need imported supplements or a foreign grocery list to eat high protein in India. You need a short list of everyday foods you actually buy each week, and a rough idea of how much protein each serving gives.",
      "Below, foods are ranked per typical serving and per calorie, using the Indian Food Composition Tables (IFCT 2017) for Indian staples and pack labels for soya chunks.",
    ),

    h2("How much protein you need"),
    p(
      `ICMR-NIN sets the minimum for healthy adults at about 0.83 g per kg of body weight a day. If you train or are losing weight, 1.2–1.6 g per kg is a better target — about 85–110 g a day at 70 kg. Gains in muscle level off around 1.6 g per kg. See <a href="${MB_LINK.proteinPerDay}">how much protein you need per day</a>, or get your number from the <a href="/protein-calculator">protein calculator</a>.`,
    ),

    h2("Non-vegetarian and egg proteins"),
    table(
      ["Food", "Serving", "Calories", "Protein", "Protein per 100 kcal"],
      [
        ["<a href=\"/foods/chicken-breast\">Chicken breast</a>", "100 g raw", "168 kcal", "21.8 g", "13.0 g"],
        ["<a href=\"/foods/mutton\">Mutton</a>", "100 g raw", "188 kcal", "20.3 g", "10.8 g"],
        ["<a href=\"/foods/prawns\">Prawns</a>", "100 g raw, shelled", "91 kcal", "19.2 g", "21.1 g"],
        ["<a href=\"/foods/chicken-thigh\">Chicken thigh</a>", "100 g raw", "200 kcal", "18.2 g", "9.1 g"],
        ["<a href=\"/foods/rohu\">Rohu fish</a>", "1 piece (75 g raw)", "77 kcal", "14.8 g", "19.3 g"],
        ["<a href=\"/foods/egg-white\">Egg whites</a>", "4 whites", "64 kcal", "14.8 g", "23.3 g"],
        ["<a href=\"/foods/boiled-egg\">Whole eggs</a>", "2 boiled", "133 kcal", "12.1 g", "9.1 g"],
      ],
    ),
    p(
      `Fish, prawns, egg whites and chicken breast give the most protein for the fewest calories, which makes them especially useful when losing weight. See <a href="${FOOD_LINK.chicken100}">100 g chicken breast calories and protein</a> and <a href="${FOOD_LINK.eggs2}">2 eggs calories and protein</a> for the full numbers.`,
    ),

    h2("Vegetarian proteins"),
    table(
      ["Food", "Serving", "Calories", "Protein", "Protein per 100 kcal"],
      [
        ["<a href=\"/foods/paneer\">Paneer</a>", "100 g", "258 kcal", "18.9 g", "7.3 g"],
        ["Firm tofu", "100 g", "≈ 144 kcal", "≈ 17.3 g", "≈ 12.0 g"],
        ["Soya chunks", "30 g dry", "≈ 105 kcal", "≈ 15 g", "≈ 14.3 g"],
        ["Hung curd / Greek yogurt", "150 g", "≈ 150 kcal", "≈ 13 g", "≈ 8.7 g"],
        ["<a href=\"/foods/soybean\">Soybean</a>", "1 katori cooked (30 g dry)", "113 kcal", "11.3 g", "10.0 g"],
        ["<a href=\"/foods/rajma\">Rajma</a>", "1 katori cooked (40 g dry)", "120 kcal", "8.0 g", "6.7 g"],
        ["<a href=\"/foods/kala-chana\">Kala chana</a>", "1 katori cooked (40 g dry)", "115 kcal", "7.5 g", "6.5 g"],
        ["<a href=\"/foods/masoor-dal\">Masoor dal</a>", "1 katori cooked (30 g dry)", "97 kcal", "7.3 g", "7.6 g"],
        ["<a href=\"/foods/moong-dal\">Moong dal</a>", "1 katori cooked (30 g dry)", "98 kcal", "7.2 g", "7.3 g"],
        ["<a href=\"/foods/peanuts\">Peanuts</a>", "30 g", "156 kcal", "7.1 g", "4.5 g"],
        ["<a href=\"/foods/cow-milk\">Milk</a>", "1 glass (200 ml)", "146 kcal", "6.5 g", "4.5 g"],
        ["<a href=\"/foods/green-peas\">Green peas</a>", "1 katori (80 g)", "65 kcal", "5.8 g", "9.0 g"],
        ["Curd", "1 katori (150 g)", "≈ 90 kcal", "≈ 4.7 g", "≈ 5.2 g"],
      ],
    ),
    p(
      `Soya chunks and tofu are the leanest vegetarian proteins; paneer gives a lot of protein per serving but also a lot of fat. Dals and chana are moderate on their own and work best alongside dairy or soya. For a vegetarian deep-dive, see <a href="${FOOD_LINK.vegProtein}">vegetarian protein sources in India</a> and <a href="${FOOD_LINK.soya}">soya chunks protein</a>.`,
    ),

    h2("A 100 g protein day: vegetarian"),
    table(
      ["Meal", "Foods", "Protein"],
      [
        ["Breakfast", "2 moong dal chillas (60 g dry dal) + mint chutney", "≈ 14 g"],
        ["Mid-morning", "1 glass milk", "≈ 6.5 g"],
        ["Lunch", "2 roti + 1 katori rajma + 1 katori curd", "≈ 19 g"],
        ["Evening", "Soya chunk chaat (30 g dry)", "≈ 15 g"],
        ["Dinner", "Paneer bhurji (100 g) + 1 katori moong dal + 1 roti", "≈ 29 g"],
        ["Before bed", "150 g hung curd", "≈ 13 g"],
        ["<strong>Total</strong>", "", "<strong>≈ 97 g</strong>"],
      ],
    ),

    h2("A 100 g protein day: non-vegetarian"),
    table(
      ["Meal", "Foods", "Protein"],
      [
        ["Breakfast", "2 eggs + 2 whites omelette + 1 roti", "≈ 23 g"],
        ["Lunch", "Chicken curry (100 g raw breast) + 1 katori rice + 1 katori masoor dal", "≈ 33 g"],
        ["Evening", "1 glass milk + 30 g roasted peanuts", "≈ 14 g"],
        ["Dinner", "Rohu fish curry (2 pieces) + 2 roti + sabzi", "≈ 38 g"],
        ["<strong>Total</strong>", "", "<strong>≈ 107 g</strong>"],
      ],
    ),
    p(
      `The pattern is the same in both: a real protein source at every meal, 20–40 g at a time, rather than one huge serving at dinner. Building muscle? See <a href="${MB_LINK.proteinMuscle}">how much protein builds muscle</a>. Losing weight? See <a href="${LINK.proteinWl}">protein for weight loss</a>.`,
    ),

    h2("Tips for eating more protein the Indian way"),
    ul([
      "Make dal thicker and serve a bigger katori, with a little less rice or roti.",
      "Add curd or raita to lunch and dinner — it's an easy 5 g each time.",
      "Use besan or moong dal chillas instead of plain dosa or paratha at breakfast.",
      "Toss soya chunks or chana into pulao, sabzi and salads.",
      "Keep roasted chana, peanuts or hung curd as snacks instead of biscuits and namkeen.",
      "Watch the oil: 2–3 tablespoons in a “high-protein” curry adds 250–400 kcal.",
    ]),

    h2("Common mistakes"),
    ul([
      "Assuming dal and roti alone cover your protein — usually they give 30–50 g a day.",
      "Counting the protein in dry weight when you're eating a cooked portion.",
      "Leaning on paneer and peanuts only, which adds a lot of fat along with the protein.",
      "Buying protein bars and drinks before fixing the basics at each meal.",
    ]),
    p(
      `Worried about eating more protein? See <a href="${FOOD_LINK.kidneys}">is too much protein bad for your kidneys</a> and, if you're considering supplements, <a href="${MB_LINK.whey}">is whey protein safe</a>.`,
    ),
    p(
      `<strong>Compare protein foods:</strong> Head-to-head: <a href="${FOOD_LINK.paneerVsTofu}">paneer vs tofu</a>, <a href="${FOOD_LINK.dalVsChicken}">dal vs chicken</a> and <a href="${MB_LINK.curdVsMilk}">curd vs milk</a>.`,
    ),
    p(
      `<strong>See the data:</strong> Every food in our database sorted per serving, per calorie and per 100 g: <a href="/foods/indian/protein-ranking">protein in Indian foods, ranked</a>, or filter the full <a href="/foods/indian">Indian food calories &amp; protein chart</a>.`,
    ),
    p(
      `<strong>Explore the guide:</strong> Targets by goal and every protein article are collected in our <a href="/nutrition/protein">protein guide</a>.`,
    ),

    takeaways([
      "Per serving, chicken, fish, prawns, paneer, tofu and soya chunks give the most protein.",
      "Per calorie, egg whites, prawns, fish, soya chunks and chicken breast lead.",
      "Dals and chana give about 7–8 g per katori — great with dairy or soya, not enough alone.",
      "Put 20–40 g of protein at each meal to reach about 1.2–1.6 g per kg a day.",
    ]),
    p(DISCLAIMER),
  ].join("\n"),
};

export const ARTICLE_REWRITES: Record<string, ArticleRewrite> = {
  "is-rice-good-for-weight-loss": rice,
  "protein-before-or-after-workout": proteinTiming,
  "how-long-does-it-take-to-build-muscle": buildMuscleTimeline,
  "is-paneer-good-for-weight-loss": paneerWeightLoss,
  "how-much-water-should-you-drink": waterIntake,
  "2-eggs-calories-and-protein": twoEggs,
  "best-high-protein-indian-foods": bestProteinFoods,
};
