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

export const ARTICLE_REWRITES: Record<string, ArticleRewrite> = {
  "is-rice-good-for-weight-loss": rice,
};
