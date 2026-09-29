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
} from "./helpers";

/** Un-numbered on purpose: the boot link pass rewrites them to live numbered URLs. */
const LINK = {
  calories:
    "/blog/weight-loss/calorie-deficit/how-many-calories-should-i-eat-to-lose-weight",
  deficit:
    "/blog/weight-loss/calorie-deficit/how-to-calculate-your-calorie-deficit",
  walking:
    "/blog/weight-loss/walking-daily-activity/does-walking-help-you-lose-weight",
  bellyFat: "/blog/weight-loss/fat-loss-basics/how-to-lose-belly-fat",
  indianFoods:
    "/blog/weight-loss/weight-loss-nutrition/best-indian-foods-for-weight-loss",
  proteinPerDay: "/blog/nutrition/protein/how-much-protein-do-you-need-per-day",
  progressiveOverload:
    "/blog/muscle-building/training-programs/what-is-progressive-overload",
};

export const batch7: IntentArticleDef[] = [
  {
    slug: "why-am-i-not-losing-weight",
    title:
      "Why Am I Not Losing Weight? 9 Real Reasons the Scale Is Stuck (and What to Do)",
    excerpt:
      "Eating “healthy”, walking every day, and the scale still won’t budge? Here are the nine real reasons weight loss stalls — from hidden chai-and-tadka calories to weekend maths — and a calm 14-day plan to get it moving again.",
    quickAnswer: `Most weight-loss stalls come from a small gap between the deficit you planned and the one you actually have: portions and cooking oil creep up, weekends cancel weekdays, daily movement quietly drops, and your calorie needs shrink as you get lighter. Water retention can also hide real fat loss for 1–3 weeks. Judge progress on a 3–4 week trend of weekly-average weight plus waist size, track honestly for 14 days, and recalculate your calories before cutting further. If nothing changes after that, check sleep, stress, and — with a doctor — thyroid, PCOS, or medicines. ${DISCLAIMER}`,
    categorySlug: "weight-loss",
    subcategorySlug: "weight-loss-plateaus",
    primaryKeyword: "why am i not losing weight",
    metaTitle: "Why Am I Not Losing Weight? 9 Real Reasons | fitlives",
    metaDescription:
      "Stuck on the scale? The 9 real reasons weight loss stalls — hidden Indian calories, weekend maths, water retention, sleep — plus a simple 14-day plan to restart.",
    tags: [
      "weight loss plateau",
      "not losing weight",
      "calorie deficit",
      "water retention",
      "fat loss",
    ],
    topics: ["Weight Loss Plateau", "Calorie Deficit", "Fat Loss", "Habits"],
    featuredImageAlt:
      "Woman standing on a bathroom scale in the morning, looking down at the reading",
    relatedSlugs: [
      "how-many-calories-should-i-eat-to-lose-weight",
      "how-to-calculate-your-calorie-deficit",
      "does-walking-help-you-lose-weight",
      "how-to-lose-belly-fat",
      "best-indian-foods-for-weight-loss",
    ],
    dayOffset: 9,
    faq: [
      {
        question: "How long does a real weight-loss plateau last?",
        answer:
          "A few days or even two weeks without change is usually water, not a plateau. Call it a true plateau only when your weekly-average weight and your waist measurement have both stayed flat for 3–4 weeks while you were genuinely sticking to your plan.",
      },
      {
        question: "Why did I gain weight even though I’m in a calorie deficit?",
        answer:
          "Overnight or weekly gains during a deficit are almost always water: a salty or restaurant meal, more carbs than usual, a new or harder workout, poor sleep, stress, or the days before a period. Fat gain needs a calorie surplus. Keep going for another 1–2 weeks and watch the weekly average rather than a single weigh-in.",
      },
      {
        question: "Should I eat less when I stop losing weight?",
        answer:
          "Not straight away. First track everything honestly for 14 days — most stalls disappear once hidden calories are counted. If the trend is still flat, recalculate your calories for your new, lower weight and reduce by about 100–200 kcal a day, not by hundreds at once. Stay above roughly 1,200 kcal (women) or 1,500 kcal (men) unless a doctor supervises.",
      },
      {
        question: "Can eating too little stop weight loss (“starvation mode”)?",
        answer:
          "Your metabolism does slow somewhat as you diet, but it doesn’t stop fat loss while you’re truly in a deficit. The bigger problem with eating very little is that it’s hard to sustain — it often leads to weekend overeating that erases the weekday deficit, plus muscle loss, poor sleep, and low energy.",
      },
      {
        question: "Can thyroid problems or PCOS stop weight loss?",
        answer:
          "They can make it slower or harder, but they rarely make it impossible. An underactive thyroid lowers calorie needs, and PCOS is linked with insulin resistance and appetite changes. If you have symptoms such as unusual tiredness, irregular periods, hair changes, or feeling cold, ask a doctor for a check-up. Once treated, the same principles — a sustainable deficit, protein, strength training, sleep — still work.",
      },
      {
        question: "Should I weigh myself every day?",
        answer:
          "Daily weighing works well for many people if you use the weekly average and ignore single days. Weigh after the toilet, before food or water, in similar clothing. If daily numbers make you anxious, weigh 2–3 times a week and rely more on waist measurements and how clothes fit.",
      },
    ],
    sources: [
      {
        title:
          "Lichtman et al. (1992) — Discrepancy between self-reported and actual caloric intake and exercise in obese subjects (NEJM)",
        url: "https://pubmed.ncbi.nlm.nih.gov/1454084/",
        note: "Participants under-reported food intake by 47% and over-reported activity by 51%",
      },
      {
        title:
          "Thomas et al. (2014) — Effect of dietary adherence on the body weight plateau (Am J Clin Nutr)",
        url: "https://pubmed.ncbi.nlm.nih.gov/25080458/",
        note: "Most early plateaus are explained by drifting adherence, not a stalled metabolism",
      },
      {
        title:
          "Hall et al. (2011) — Quantification of the effect of energy imbalance on bodyweight (Lancet)",
        url: "https://pubmed.ncbi.nlm.nih.gov/21872751/",
        note: "Why weight loss naturally slows as body weight falls",
      },
      {
        title:
          "Nedeltcheva et al. (2010) — Insufficient sleep undermines dietary efforts to reduce adiposity (Ann Intern Med)",
        url: "https://pubmed.ncbi.nlm.nih.gov/20921542/",
        note: "Same diet, less sleep: less fat lost and more lean mass lost",
      },
      {
        title: "Levine (2002) — Non-exercise activity thermogenesis (NEAT)",
        url: "https://pubmed.ncbi.nlm.nih.gov/12468415/",
        note: "Everyday movement varies widely between people and days",
      },
      {
        title:
          "Pontzer et al. (2016) — Constrained total energy expenditure and metabolic adaptation to physical activity (Curr Biol)",
        url: "https://pubmed.ncbi.nlm.nih.gov/26832439/",
        note: "More exercise doesn’t add calories burned one-for-one",
      },
      {
        title: "Rosenbaum & Leibel (2010) — Adaptive thermogenesis in humans (Int J Obes)",
        url: "https://pubmed.ncbi.nlm.nih.gov/20935667/",
        note: "Energy expenditure drops somewhat more than expected after weight loss",
      },
      {
        title:
          "White et al. (2011) — Fluid retention over the menstrual cycle: 1-year data from the Prospective Ovulation Cohort",
        url: "https://pubmed.ncbi.nlm.nih.gov/21845193/",
        note: "Water retention peaks around the first day of the period",
      },
    ],
    body: [
      p(
        "Neha is 31, works in Bengaluru, and has done everything “right” for six weeks. Oats or poha for breakfast. No more office samosas. An evening walk around the society, 7,000 steps on most days. For the first three weeks the scale dropped nicely — 2.5 kg. Then it stopped. Three weeks at 69.5 kg, give or take. One morning it even read 70.3.",
        "“I’m eating less than ever,” she says. “My body just doesn’t want to lose weight.”",
        "Neha isn’t one real person — she’s a composite of the messages we get most often. And almost every one of them ends the same way: nothing is wrong with her body. The plan and the reality drifted apart by a few hundred calories a day, and the scale was also hiding progress under a layer of water. Both are fixable, and neither needs a crash diet.",
      ),

      h2("First: is your weight actually stuck?"),
      p(
        "Body weight isn’t a clean measure of fat. It includes water, food still in your gut, and glycogen (stored carbohydrate, which holds water with it). These alone move the scale by 0.5–2 kg from one day to the next. Fat loss is slower and quieter — a good pace is around 0.25–1% of body weight a week.",
      ),
      table(
        ["What you see", "What it usually means"],
        [
          ["Up 1 kg overnight", "Salty or late dinner, more carbs, less sleep — water, not fat"],
          ["No change for 7–14 days", "Normal. Fat loss can hide under water for a while"],
          ["Sudden 1 kg drop after a stall", "The “whoosh” — retained water finally leaving"],
          ["Weekly average and waist flat for 3–4 weeks", "A real plateau worth acting on"],
        ],
      ),
      p(
        "So before changing anything, change how you measure. Weigh on 3–7 mornings a week (after the toilet, before food), write it down, and compare <strong>weekly averages</strong>, not single days. Measure your waist at the navel once a week. If either one is trending down, you’re not stuck — you’re just impatient, and that’s allowed.",
      ),

      h2("The 9 real reasons weight loss stalls"),

      h3("1. You’re eating more than you think (everyone is)"),
      p(
        "This isn’t about willpower or honesty. In a well-known study, people who were sure they were eating very little under-reported their intake by 47% — and over-reported their exercise by 51%. They weren’t lying; food is just very easy to underestimate. In Indian kitchens the usual suspects are small, frequent, and invisible:",
      ),
      table(
        ["Easy-to-miss extra", "Approx. calories"],
        [
          ["An extra tablespoon of oil in sabzi or tadka", "~120 kcal"],
          ["1 teaspoon of ghee on two rotis", "~45 kcal"],
          ["3 cups of chai with milk and sugar", "~240–270 kcal"],
          ["A handful (30 g) of namkeen or bhujia", "~160 kcal"],
          ["2 digestive biscuits with tea", "~140 kcal"],
          ["A glass (250 ml) of packaged fruit juice", "~110–120 kcal"],
          ["A glass of sweet lassi", "~200–250 kcal"],
        ],
      ),
      p(
        "Three chai, one handful of namkeen, and a heavier hand with oil add up to about 500 kcal — roughly the entire deficit most people aim for. None of it feels like “eating”.",
      ),

      h3("2. The weekend cancels the weekdays"),
      p(
        "Here’s the maths that catches almost everyone. Say your maintenance is 2,000 kcal a day and you eat 1,500 from Monday to Friday. Then Saturday brunch, a birthday dinner, and a Sunday family lunch happen.",
      ),
      table(
        ["Days", "Eaten per day", "Difference from maintenance"],
        [
          ["Mon–Fri", "1,500 kcal", "−500 × 5 = −2,500 kcal"],
          ["Saturday", "3,100 kcal", "+1,100 kcal"],
          ["Sunday", "2,900 kcal", "+900 kcal"],
          ["<strong>Week total</strong>", "", "<strong>−500 kcal (about 65 g of fat)</strong>"],
        ],
      ),
      p(
        "Five disciplined days, and the week ends at roughly a single day’s deficit — far too little to see under normal water swings. The fix isn’t to ban weekends. It’s to plan them: choose one meal out rather than three, keep breakfast and lunch normal on those days, and skip the “I’ve already ruined it” second dessert.",
      ),

      h3("3. Water is hiding the fat you’ve lost"),
      p("Your body holds extra water, temporarily, when:"),
      ul([
        "You eat a salty or restaurant meal (biryani night, chaat, pickles, papad)",
        "You eat more carbohydrates than usual — each gram of stored glycogen holds water with it",
        "You start or intensify a workout — sore muscles hold fluid while they repair",
        "You sleep badly or you’re stressed",
        "It’s the week before or the first days of your period — water retention tends to peak around day one",
      ]),
      p(
        "This is why people often see nothing for two weeks and then a sudden 1 kg drop. The fat loss was happening; the water was masking it.",
      ),

      h3("4. You lost weight — so your calorie target moved"),
      p(
        `A lighter body burns fewer calories, both at rest and when it moves. Very roughly, every 5 kg lost trims your daily needs by 60–100 kcal. The 1,500 kcal that was a solid deficit at 75 kg may be only a small one at 68 kg. Your metabolism can also slow a little more than weight loss alone would predict. None of this means weight loss has “stopped working” — just that the numbers need updating. Recalculate every 4–5 kg using the <a href="/tools/calorie-calculator">calorie calculator</a>.`,
      ),

      h3("5. You’re moving less without noticing"),
      p(
        `Dieting makes you a little more tired, and your body saves energy in small ways: fewer trips to the kitchen, more lift and less stairs, sitting through calls you used to pace through. This everyday movement (called NEAT) can differ by hundreds of calories a day. Research also suggests that adding more and more exercise doesn’t raise total calories burned one-for-one — the body partly compensates. A steady step count is one of the simplest protections; see <a href="${LINK.walking}">does walking help you lose weight</a>.`,
      ),

      h3("6. The workout “reward”"),
      p(
        "An hour in the gym might burn 250–400 kcal. A post-workout smoothie, a “healthy” protein bar, and a bigger dinner because “I earned it” can easily be 500+. Calorie numbers on treadmills and fitness watches are estimates, and often generous ones. Treat exercise as a bonus for health and muscle, not as permission to eat back the number on the screen.",
      ),

      h3("7. Short sleep and high stress"),
      p(
        "In one controlled study, people on the same calorie-reduced diet lost noticeably less fat when they slept 5.5 hours than when they slept 8.5 hours — and lost more muscle instead. Poor sleep also increases hunger and cravings the next day. Deadlines, late screens, and stress eating are real plateau-makers, not excuses.",
      ),

      h3("8. You’re building muscle while losing fat"),
      p(
        `If you’ve recently started strength training — especially if you’re new to it — you can gain some muscle while losing fat. The scale barely moves, but your waist shrinks and clothes fit differently. That’s a win, not a stall. It’s one reason to track your waist and take a monthly photo, and to keep training with <a href="${LINK.progressiveOverload}">progressive overload</a>.`,
      ),

      h3("9. A medical or medication factor"),
      p(
        "Some conditions and medicines genuinely change the picture: an underactive thyroid (hypothyroidism), PCOS, insulin resistance, and some medicines such as steroids, certain antidepressants, and some diabetes treatments. If you have symptoms such as unusual tiredness, feeling cold, hair changes, or irregular periods — or you started a new medicine around the time the stall began — speak with a doctor. Never stop or change a prescribed medicine on your own.",
      ),

      h2("A calm 14-day plan to get moving again"),
      ol([
        "<strong>Measure properly.</strong> Weigh 3–7 mornings a week and use the weekly average. Measure your waist on day 1 and day 14.",
        "<strong>Track everything for 14 days</strong> — including oil, ghee, chai, bites while cooking, and weekends. Use a kitchen scale for oil and grains for at least the first week. Most people find their “missing” 300–500 kcal here.",
        `<strong>Recalculate your target</strong> for your current weight using the <a href="/tools/calorie-calculator">calorie calculator</a>. Compare it with what your tracking shows you really eat.`,
        `<strong>Fix protein.</strong> Aim for a palm-sized protein portion at every meal — dal with paneer or curd, eggs, chicken, fish, soya, or chana. Protein keeps you fuller and protects muscle; see <a href="${LINK.proteinPerDay}">how much protein you need per day</a>.`,
        "<strong>Hold a daily step floor.</strong> Pick a number you can hit even on busy days (for example 7,000) and keep it steady.",
        "<strong>Strength train 2–3 times a week.</strong> It protects muscle while you diet, which keeps your shape improving even when the scale is slow.",
        "<strong>Protect sleep.</strong> Aim for 7–9 hours. Screens off 30 minutes earlier is a realistic start.",
        "<strong>Plan the weekend.</strong> One planned meal out, normal meals around it, no “restart on Monday”.",
      ]),

      h2("After 14 days: what to change"),
      table(
        ["What you see", "What to do"],
        [
          ["Weekly average falling", "Nothing — the plan works. Keep going"],
          ["Scale flat, waist smaller", "Also working (likely muscle gain or water). Keep going"],
          ["Both flat, tracking was honest", "Reduce by 100–200 kcal a day or add ~2,000 daily steps — not both at once"],
          ["Both flat, tracking found extras", "Remove the extras first, then reassess in 2 weeks"],
          ["Tired, hungry, dieting for 3+ months", "Take 1–2 weeks at maintenance calories, then resume"],
          ["Possible medical signs (see reason 9)", "Book a check-up before cutting further"],
        ],
      ),
      p(
        `Keep daily calories above roughly 1,200 kcal for women and 1,500 kcal for men unless a doctor is supervising you. For setting the deficit itself, see <a href="${LINK.deficit}">how to calculate your calorie deficit</a>.`,
      ),

      h2("What not to do when you’re frustrated"),
      ul([
        "<strong>Slash calories to 800–1,000.</strong> It usually ends in a weekend binge and lost muscle.",
        "<strong>Buy detox teas or “fat-burner” pills.</strong> Many are laxatives or stimulants; they change water, not fat.",
        "<strong>Skip dinner and then raid the kitchen at 11 pm.</strong> Regular, protein-rich meals beat heroic skipping.",
        "<strong>Add two hours of cardio overnight.</strong> Hunger rises to match, and it rarely lasts.",
        "<strong>Change your whole plan every week.</strong> Nothing can be judged in seven days.",
      ]),

      h2("What happened to Neha"),
      p(
        "Two weeks of honest tracking found three things: about a tablespoon and a half of oil more than she thought in daily cooking, three sugary chais, and weekends that averaged close to 3,000 kcal. She kept two chais (less sugar), measured oil, and planned one dinner out on weekends. She didn’t cut a single meal.",
        `Over the next six weeks her weekly average dropped by about 0.4 kg a week and her waist by 3 cm. Nothing dramatic — and that’s exactly why it lasted. For more ideas on filling, everyday meals, see the <a href="${LINK.indianFoods}">best Indian foods for weight loss</a>, and if your main goal is your midsection, read <a href="${LINK.bellyFat}">how to lose belly fat</a>.`,
      ),
      toolCta(
        "/tools/calorie-calculator",
        "calorie calculator",
        "Recalculate your daily target for your current weight and activity.",
      ),

      takeaways([
        "A few days or even two weeks without change is usually water — judge progress on 3–4 week trends of weekly-average weight and waist.",
        "Most stalls come from hidden calories (oil, chai, snacks) and weekends that cancel weekday deficits.",
        "Your calorie needs fall as you lose weight; recalculate every 4–5 kg.",
        "Protect the basics: protein at every meal, a steady step count, strength training, and 7–9 hours of sleep.",
        "If honest tracking still shows no change, make a small adjustment — and see a doctor if thyroid, PCOS, or medicine could be involved.",
      ]),
      p(
        `Start with the numbers: <a href="${LINK.calories}">how many calories should I eat to lose weight</a> explains how to set a target you can actually keep. ${DISCLAIMER}`,
      ),
    ].join("\n"),
  },
];
