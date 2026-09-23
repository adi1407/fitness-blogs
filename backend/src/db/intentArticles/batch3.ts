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

export const batch3: IntentArticleDef[] = [
  {
    slug: "how-to-lose-belly-fat",
    title: "How to Lose Belly Fat",
    excerpt:
      "What actually reduces abdominal fat: calorie deficit, protein, training, sleep, and patience — not spot-reduction myths.",
    quickAnswer: `You cannot spot-reduce belly fat with 100 crunches. Reduce overall body fat with a calorie deficit, high protein, strength training, daily walking, and better sleep. Visceral fat responds to the same fundamentals. ${DISCLAIMER}`,
    categorySlug: "weight-loss",
    subcategorySlug: "fat-loss-basics",
    primaryKeyword: "how to lose belly fat",
    metaTitle: "How to Lose Belly Fat — What Actually Works | fitlives",
    metaDescription:
      "Evidence-aware belly fat loss: deficit, protein, lifting, steps, and myths to ignore.",
    tags: ["belly fat", "fat loss", "abs"],
    topics: ["Body Composition", "Calorie Deficit", "Strength"],
    featuredImageAlt:
      "Training and habits for fat loss around the midsection",
    relatedSlugs: [
      "how-many-calories-should-i-eat-to-lose-weight",
      "how-to-calculate-your-calorie-deficit",
      "best-indian-foods-for-weight-loss",
    ],
    dayOffset: 5,
    faq: [
      {
        question: "Will ab exercises melt belly fat?",
        answer:
          "Ab work strengthens the muscles under fat; it does not preferentially burn stomach fat. Keep core training for function, not magic.",
      },
      {
        question: "Why is my belly last to go?",
        answer:
          "Genetics influence fat storage patterns. Many people lose from face/limbs before the midsection. Stay consistent longer than the viral timeline promises.",
      },
    ],
    sources: [SRC.whoObesity, SRC.acsm],
    body: [
      p(
        "“How to lose belly fat” is the most emotionally loaded search in fitness. People want a local eraser. Biology gives a whole-body system. The good news: the system responds to boring, repeatable habits.",
      ),
      h2("The only real mechanism"),
      p(
        "Fat loss requires using more energy than you take in over time. Where fat comes off first is partly genetic. You can influence the total; you cannot command your stomach to empty first with a gadget.",
      ),
      toolCta(
        "/tools/tdee-calculator",
        "TDEE calculator",
        "Set up your intake using the",
      ),
      h2("Five levers that move the midsection"),
      ol([
        "Calorie deficit you can sustain (not a crash).",
        "Protein high enough to protect muscle and hunger.",
        "Strength training 2–4 days weekly.",
        "Daily walking (7–10k steps is a useful default target for many).",
        "Sleep and stress management — cortisol-chaos lifestyles make adherence harder.",
      ]),
      h2("What to stop wasting time on"),
      ul([
        "Spot-reduction belts and 30-day “shred” scams",
        "Only doing abs and no compound lifts",
        "Cutting carbs to zero if it destroys your training",
      ]),
      h3("Alcohol and late-night grazing"),
      p(
        "Liquid calories and mindless night eating are classic belly-softness partners. You do not need perfection — you need fewer weekly blowups.",
      ),
      takeaways([
        "Whole-body fat loss reduces belly fat over time.",
        "Deficit + protein + lifting + steps.",
        "Core training is useful, not sufficient.",
        "Patience beats extreme short challenges.",
      ]),
      p(`${DISCLAIMER}`),
    ].join("\n"),
  },
  {
    slug: "how-many-calories-should-i-eat-to-lose-10-kg",
    title: "How Many Calories Should I Eat to Lose 10 kg?",
    excerpt:
      "A realistic timeline and calorie approach for losing about 10 kg without wrecking your metabolism or social life.",
    quickAnswer: `Losing ~10 kg usually takes several months. Use a moderate deficit (often 300–500 kcal below maintenance), high protein, and training. Expect roughly 0.5–1% body weight per week as a sustainable band for many people. ${DISCLAIMER}`,
    categorySlug: "weight-loss",
    subcategorySlug: "calorie-deficit",
    primaryKeyword: "calories to lose 10 kg",
    metaTitle: "How Many Calories Should I Eat to Lose 10 kg? | fitlives",
    metaDescription:
      "Calorie strategy and timeline for a 10 kg fat-loss goal with sustainable habits.",
    tags: ["weight loss", "calories", "10 kg"],
    topics: ["Calorie Deficit", "Body Composition"],
    featuredImageAlt: "Sustainable calorie plan toward a 10 kg goal",
    relatedSlugs: [
      "how-many-calories-should-i-eat-to-lose-weight",
      "how-to-calculate-your-calorie-deficit",
      "how-to-lose-belly-fat",
    ],
    dayOffset: 5,
    faq: [
      {
        question: "Can I lose 10 kg in one month?",
        answer:
          "Aggressive losses that large are usually water, glycogen, and muscle risk — not a healthy default. Prefer a multi-month plan.",
      },
    ],
    sources: [SRC.whoObesity, SRC.acsm],
    body: [
      p(
        "Ten kilograms is a meaningful goal. It is also where people try to outrun physiology with a two-week starvation challenge. Let us do the adult version.",
      ),
      h2("Rough energy math (why months matter)"),
      p(
        "A kilogram of body fat is often ballparked around 7,700 kcal of energy stores, but real-world weight change includes water and glycogen. Still, a 500 kcal daily deficit theoretically trends near 0.5 kg/week — so 10 kg is commonly a multi-month project.",
      ),
      table(
        ["Weekly loss (approx.)", "Months for ~10 kg (ballpark)"],
        [
          ["0.4 kg/week", "~6 months"],
          ["0.6 kg/week", "~4 months"],
          ["1 kg/week", "~2.5 months (harder to sustain)"],
        ],
      ),
      h2("Calories: start from your maintenance"),
      ol([
        "Estimate TDEE.",
        "Subtract 300–500 kcal.",
        "Hold for 2–3 weeks; adjust using average weight.",
        "As you get lighter, recalculate — maintenance drops.",
      ]),
      toolCta(
        "/tools/calorie-calculator",
        "calorie calculator",
        "Plan intake with the",
      ),
      h2("Protect muscle while the scale drops"),
      p(
        "Lift weights, keep protein high (often 1.6–2.2 g/kg), and do not fear carbs around training. Looking “skinny-soft” after a crash diet is how extreme deficits show up.",
      ),
      takeaways([
        "10 kg is a marathon, not a weekend detox.",
        "Moderate deficit + protein + lifting.",
        "Recalculate calories as weight falls.",
      ]),
      p(`${DISCLAIMER}`),
    ].join("\n"),
  },
  {
    slug: "how-much-water-should-you-drink",
    title: "How Much Water Should You Drink?",
    excerpt:
      "Practical hydration targets, thirst cues, training days, and why “forced gallons” are not required for fat loss.",
    quickAnswer: `Many adults do well aiming near 30–40 ml of fluids per kg body weight as a starting range, adjusting for heat, training, and diet. Thirst, urine color, and energy are useful checks. Extra water does not melt fat by itself. ${DISCLAIMER}`,
    categorySlug: "nutrition",
    subcategorySlug: "hydration",
    primaryKeyword: "how much water should you drink",
    metaTitle: "How Much Water Should You Drink Daily? | fitlives",
    metaDescription:
      "Daily water intake guidance for training, climate, and common myths.",
    tags: ["hydration", "water"],
    topics: ["Hydration"],
    featuredImageAlt: "Daily water intake hydration",
    relatedSlugs: [
      "how-many-calories-should-i-eat-to-lose-weight",
      "beginner-gym-diet-plan",
    ],
    dayOffset: 6,
    faq: [
      {
        question: "Does tea/coffee count?",
        answer:
          "Yes, fluids from tea and coffee contribute for most people. Extremely high caffeine can still dehydrate indirectly via more bathroom trips — stay sensible.",
      },
      {
        question: "Clear urine all day?",
        answer:
          "Pale straw is usually fine. Constantly crystal-clear may mean you are overdoing forced intake.",
      },
    ],
    sources: [SRC.hydration, SRC.icmr],
    body: [
      p(
        "Hydration advice online swings between “sip occasionally” and “carry a jerry can.” After coaching people through Indian summers and AC offices, I prefer ranges plus feedback loops.",
      ),
      h2("A practical starting target"),
      table(
        ["Body weight", "Approx. 35 ml/kg"],
        [
          ["60 kg", "~2.1 L"],
          ["70 kg", "~2.5 L"],
          ["80 kg", "~2.8 L"],
        ],
      ),
      p(
        "Increase when training hard, sweating outdoors, or eating a lot of salty food. Medical conditions (heart, kidney) may need individualized fluid limits — that is clinician territory.",
      ),
      h2("Training days"),
      ul([
        "Start the session hydrated, not chugging mid-set only.",
        "Sip during longer workouts.",
        "Replace fluids after heavy sweat sessions.",
      ]),
      h2("Myths"),
      ul([
        "Water alone does not create a fat-loss deficit.",
        "You do not need to hurt yourself forcing water.",
        "Food moisture (dal, fruits, curd) counts toward fluid status.",
      ]),
      takeaways([
        "Use ml/kg as a start, then adjust.",
        "Watch thirst, urine color, performance.",
        "Heat and training increase needs.",
      ]),
      p(`${DISCLAIMER}`),
    ].join("\n"),
  },
  {
    slug: "is-rice-good-for-weight-loss",
    title: "Is Rice Good for Weight Loss?",
    excerpt:
      "Yes — in portions. Why rice can fit a fat-loss diet and how to keep servings honest.",
    quickAnswer: `Rice can be part of a weight-loss diet when portions fit your calorie target. It is not inherently fattening. Pair measured rice with protein and vegetables. ${DISCLAIMER}`,
    categorySlug: "weight-loss",
    subcategorySlug: "weight-loss-myths",
    primaryKeyword: "is rice good for weight loss",
    metaTitle: "Is Rice Good for Weight Loss? | fitlives",
    metaDescription:
      "Myth-busting rice and fat loss with portion tips and plate building.",
    tags: ["rice", "weight loss myths", "carbs"],
    topics: ["Calorie Deficit", "Indian Nutrition"],
    featuredImageAlt: "Rice portion in a weight-loss meal",
    relatedSlugs: [
      "rice-vs-roti-for-weight-loss",
      "best-indian-foods-for-weight-loss",
      "how-to-calculate-your-calorie-deficit",
    ],
    dayOffset: 6,
    faq: [
      {
        question: "White rice or brown rice?",
        answer:
          "Brown often has more fiber; white may digest easier for some. Calories are still the main lever — choose what you will stick with.",
      },
    ],
    sources: [SRC.icmr, SRC.whoObesity],
    body: [
      p(
        "If rice made fat loss impossible, large regions of the world would not produce successful physiques and athletes. The issue is usually the third helping and the oily gravy, not rice molecules.",
      ),
      h2("Where rice fits"),
      ul([
        "Measured cooked servings (start with 100–150 g cooked and adjust)",
        "Next to dal, chicken, fish, paneer, or curd",
        "Around training when you want easy carbs",
      ]),
      h2("Where people get stuck"),
      ul([
        "Unlimited biryani logic on “cheat” days every other day",
        "No protein on the plate",
        "Fear-based cutting rice then bingeing later",
      ]),
      takeaways([
        "Rice is allowed in a deficit.",
        "Portion and protein pairing matter.",
        "Myths that ban cultural staples often fail long-term.",
      ]),
      p(
        `Compare with <a href="/blog/weight-loss/weight-loss-nutrition/rice-vs-roti-for-weight-loss">rice vs roti</a>. ${DISCLAIMER}`,
      ),
    ].join("\n"),
  },
  {
    slug: "is-paneer-good-for-weight-loss",
    title: "Is Paneer Good for Weight Loss?",
    excerpt:
      "Paneer can support fat loss thanks to protein and satiety — if you portion the calories from fat.",
    quickAnswer: `Yes, paneer can be excellent for weight loss because it is protein-rich and filling. Keep portions measured (often 100–150 g per meal) because full-fat paneer is calorie-dense. ${DISCLAIMER}`,
    categorySlug: "weight-loss",
    subcategorySlug: "weight-loss-nutrition",
    primaryKeyword: "is paneer good for weight loss",
    metaTitle: "Is Paneer Good for Weight Loss? | fitlives",
    metaDescription:
      "How to use paneer in a fat-loss diet without overdoing calories.",
    tags: ["paneer", "weight loss", "protein"],
    topics: ["Protein", "Indian Nutrition", "Calorie Deficit"],
    featuredImageAlt: "Paneer in a fat-loss friendly meal",
    relatedSlugs: [
      "100g-paneer-calories-and-protein",
      "best-high-protein-indian-foods",
      "best-dinner-for-weight-loss",
    ],
    dayOffset: 7,
    faq: [
      {
        question: "Low-fat paneer only?",
        answer:
          "Helpful if calories are tight. Full-fat is fine in smaller portions if you prefer taste.",
      },
    ],
    sources: [SRC.icmr, SRC.issnProtein],
    body: [
      p(
        "Paneer is not the enemy of fat loss. Unmeasured paneer pakoras might be. Used well, paneer is one of the easiest vegetarian ways to raise protein.",
      ),
      h2("Why it helps"),
      ul([
        "Solid protein per serving",
        "Satiety from protein and fat",
        "Flexible: bhurji, grill, curry with light gravy",
      ]),
      h2("How to keep it deficit-friendly"),
      ol([
        "Weigh 100–150 g as a default meal portion.",
        "Cook with measured oil or non-stick methods.",
        "Load vegetables for volume.",
        "Prefer grilled/bhurji over deep-fried snacks.",
      ]),
      p(
        `Macro details: <a href="/blog/nutrition/protein/100g-paneer-calories-and-protein">100 g paneer calories and protein</a>. ${DISCLAIMER}`,
      ),
      takeaways([
        "Paneer supports weight loss when portioned.",
        "Protein helps adherence.",
        "Frying changes the story.",
      ]),
    ].join("\n"),
  },
];
