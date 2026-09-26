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

export const batch5: IntentArticleDef[] = [
  {
    slug: "does-walking-help-you-lose-weight",
    title: "Does Walking Help You Lose Weight?",
    excerpt:
      "Yes — when it increases weekly energy burn and you keep food under control. How much walking helps, what pace matters, and where diet still wins.",
    quickAnswer: `Walking helps weight loss when it creates a consistent calorie deficit — especially if you currently sit most of the day. It will not override a large surplus from food, but 30–60 minutes of brisk walking most days is one of the most sustainable ways to raise daily burn without gym burnout. ${DISCLAIMER}`,
    categorySlug: "weight-loss",
    subcategorySlug: "walking-daily-activity",
    primaryKeyword: "does walking help you lose weight",
    metaTitle: "Does Walking Help You Lose Weight? | fitlives",
    metaDescription:
      "How walking supports fat loss, realistic step and pace targets, and why food still matters for results.",
    tags: ["walking", "weight loss", "steps", "daily activity"],
    topics: ["Calorie Deficit", "Body Composition", "Beginner Fitness"],
    featuredImageAlt:
      "Person walking outdoors for daily activity and weight loss",
    relatedSlugs: [
      "how-to-calculate-your-calorie-deficit",
      "how-many-calories-should-i-eat-to-lose-weight",
      "how-to-lose-belly-fat",
    ],
    dayOffset: 10,
    faq: [
      {
        question: "How many steps a day for weight loss?",
        answer:
          "There is no magic number. Moving from a very low baseline (e.g. under 4,000) toward 7,000–10,000 steps often helps if food intake stays stable. Focus on a sustainable increase you can keep 5–6 days a week.",
      },
      {
        question: "Is walking better than running for fat loss?",
        answer:
          "Running burns more per minute, but walking is easier to recover from and stick with. The best option is the one you will repeat. Many people combine both: walks on most days, harder sessions when recovered.",
      },
      {
        question: "Can I lose belly fat just by walking?",
        answer:
          "You cannot spot-reduce belly fat with walking alone. Walking supports overall fat loss when calories are controlled; where fat comes off first is largely individual. Pair walks with a realistic deficit and enough protein.",
      },
    ],
    sources: [SRC.whoObesity, SRC.acsm, SRC.icmr],
    body: [
      p(
        "Walking is underrated because it looks “too easy.” That is exactly why it works for many people: you can do it after work, between meetings, or while on a phone call — without needing a perfect gym schedule.",
      ),
      h2("Short answer"),
      p(
        "Yes, walking helps you lose weight when it increases total weekly energy expenditure and you do not fully “eat back” those calories. No, walking is not a free pass for unlimited snacks. Fat loss still follows energy balance over weeks.",
      ),
      h2("Why walking works for fat loss"),
      ul([
        "Raises daily calorie burn with low injury risk",
        "Improves consistency — the missing piece for most desk-job diets",
        "Supports mood, sleep, and appetite awareness for some people",
        "Stacks well with strength training without wrecking recovery",
      ]),
      h2("What actually moves the scale"),
      ol([
        "Know a rough maintenance calorie range (TDEE), then set a modest deficit.",
        "Add walking you can repeat (start with +2,000–3,000 steps over your baseline).",
        "Keep protein decent so more of the loss comes from fat, not only “scale weight.”",
        "Track trend weight weekly, not one dramatic morning.",
      ]),
      toolCta(
        "/tools/tdee-calculator",
        "TDEE calculator",
        "Estimate maintenance calories before you guess a deficit.",
      ),
      h2("Pace and duration (practical targets)"),
      table(
        ["Session", "Feel", "Use it for"],
        [
          ["20–30 min easy stroll", "Can talk easily", "Beginners, recovery days"],
          ["30–45 min brisk walk", "Slightly breathless, can still talk", "Most fat-loss weeks"],
          ["45–60+ min brisk / hills", "Challenging but sustainable", "Higher burn when diet is already tight"],
        ],
      ),
      p(
        "Brisk usually means you could talk in short sentences but would not sing comfortably. Exact calorie burn varies by body weight, terrain, and speed — treat tables as ballparks.",
      ),
      h2("Indian-context tips that stick"),
      ul([
        "Evening walk after dinner beats doomscrolling if it stops a second round of snacks",
        "Apartment/colony loops count — boring routes are fine if they are near home",
        " monsoons and heat: indoor mall walks, treadmill, or early morning windows",
        "Desk jobs: 5–10 minute walks after calls add up faster than one heroic Sunday",
      ]),
      h2("Limits — when walking is not enough"),
      ul([
        "Large calorie surplus from food will outrun most walking",
        "Very low protein + aggressive deficit can leave you tired and soft-looking",
        "Expecting belly-only fat loss from walking alone leads to disappointment",
        "Pain, joint issues, or medical limits: get professional guidance before ramping volume",
      ]),
      p(
        `Build the deficit properly: <a href="/blog/weight-loss/calorie-deficit/how-to-calculate-your-calorie-deficit">how to calculate your calorie deficit</a>. For weekly targets, see <a href="/blog/weight-loss/calorie-deficit/how-many-calories-should-i-eat-to-lose-weight">how many calories to eat to lose weight</a>. ${DISCLAIMER}`,
      ),
      toolCta(
        "/tools/calorie-calculator",
        "calorie calculator",
        "Turn maintenance into a fat-loss calorie target.",
      ),
      takeaways([
        "Walking helps when it increases weekly burn and food stays controlled.",
        "Raise steps from your real baseline — consistency beats a one-day 20k hero walk.",
        "Brisk 30–45 minutes most days is a strong default for beginners.",
        "Diet still decides most of the deficit; walking makes sticking to it easier.",
      ]),
    ].join("\n"),
  },
];
