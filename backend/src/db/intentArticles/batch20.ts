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
  cardioDose: "/blog/weight-loss/cardio-weight-loss/how-much-cardio-for-fat-loss",
  hiit: "/blog/weight-loss/cardio-weight-loss/hiit-vs-steady-state-for-fat-loss",
  bestCardio: "/blog/weight-loss/cardio-weight-loss/best-cardio-for-weight-loss",
  strength:
    "/blog/weight-loss/strength-training-weight-loss/strength-training-for-fat-loss",
  walking:
    "/blog/weight-loss/walking-daily-activity/does-walking-help-you-lose-weight",
  steps:
    "/blog/weight-loss/walking-daily-activity/how-many-steps-a-day-to-lose-weight",
  caloriesLose:
    "/blog/weight-loss/calorie-deficit/how-many-calories-should-i-eat-to-lose-weight",
  deficit:
    "/blog/weight-loss/calorie-deficit/how-to-calculate-your-calorie-deficit",
  bellyFat: "/blog/weight-loss/fat-loss-basics/how-to-lose-belly-fat",
  plateau: "/blog/weight-loss/weight-loss-plateaus/why-am-i-not-losing-weight",
};

const SRC_DONNELLY: IntentSource = {
  title:
    "Donnelly et al. (2009) — ACSM position stand: appropriate physical activity intervention strategies for weight loss and prevention of weight regain",
  url: "https://pubmed.ncbi.nlm.nih.gov/19127177/",
  note: "Activity volume guidance for weight loss and weight-loss maintenance",
};

const SRC_WILLIS: IntentSource = {
  title:
    "Willis et al. (2012) — Effects of aerobic and/or resistance training on body mass and fat mass in overweight adults (STRRIDE)",
  url: "https://pubmed.ncbi.nlm.nih.gov/23019316/",
  note: "Aerobic vs resistance vs combined training for fat and lean mass",
};

const SRC_COMPENDIUM: IntentSource = {
  title: "Ainsworth et al. — Compendium of Physical Activities",
  url: "https://pubmed.ncbi.nlm.nih.gov/21681120/",
  note: "MET values used to estimate session calorie burn",
};

const SRC_KEATING: IntentSource = {
  title:
    "Keating et al. (2017) — A systematic review and meta-analysis of interval training vs moderate-intensity continuous training on body adiposity",
  url: "https://pubmed.ncbi.nlm.nih.gov/28401638/",
  note: "HIIT and steady cardio both reduce fat when weekly work is matched",
};

const SRC_ACSM: IntentSource = {
  title: "ACSM — Guidelines for exercise testing and prescription (overview)",
  url: "https://www.acsm.org/education-resources/books/guidelines-exercise-testing-prescription",
  note: "Intensity zones and progressive aerobic programming for adults",
};

export const batch20: IntentArticleDef[] = [
  {
    slug: "how-much-cardio-for-fat-loss",
    title: "How Much Cardio for Fat Loss?",
    excerpt:
      "How much cardio for fat loss actually helps: weekly minutes that matter, when more stops helping, and how to pair walking, steady work and lifting without wrecking recovery.",
    quickAnswer: `Most people lose fat with roughly 150–300 minutes a week of moderate cardio (brisk walking counts) or 75–150 minutes of harder work, on top of a food calorie deficit. Cardio helps by raising weekly burn; it does not replace diet. Start with daily walking, add 2–3 structured sessions if needed, and keep strength training so you do not lose muscle. More than about an hour of hard cardio most days often backfires via hunger, joint stress and skipped lifts. ${DISCLAIMER}`,
    categorySlug: "weight-loss",
    subcategorySlug: "cardio-weight-loss",
    primaryKeyword: "how much cardio for fat loss",
    metaTitle: "How Much Cardio for Fat Loss?",
    metaDescription:
      "How much cardio for fat loss: weekly minutes that work, walking vs harder sessions, and how to add cardio without killing recovery or muscle.",
    tags: ["cardio", "fat loss", "weight loss", "walking", "exercise"],
    topics: ["Weight Loss", "Cardio", "Beginner Fitness"],
    featuredImageAlt: "Person brisk walking outdoors for cardio fat loss",
    relatedSlugs: [
      "hiit-vs-steady-state-for-fat-loss",
      "best-cardio-for-weight-loss",
      "strength-training-for-fat-loss",
      "does-walking-help-you-lose-weight",
      "how-many-calories-should-i-eat-to-lose-weight",
    ],
    dayOffset: 10,
    faq: [
      {
        question: "Is 30 minutes of cardio a day enough to lose fat?",
        answer:
          "It can help if you are also in a calorie deficit. Thirty minutes of brisk walking most days is a solid baseline. If the scale has not moved in two to three weeks, fix food tracking before doubling cardio.",
      },
      {
        question: "Can I lose fat with cardio only and no diet change?",
        answer:
          "Usually not for long. People often eat back the calories they burn. Treat cardio as support; create most of the deficit with food.",
      },
      {
        question: "How much cardio if I already lift weights?",
        answer:
          "Keep lifts 2–4 days a week, then add 2–4 cardio sessions of 20–40 minutes, or simply raise daily steps. Protect recovery: hard HIIT every day next to heavy squats is a common mistake.",
      },
      {
        question: "Does fasted cardio burn more fat?",
        answer:
          "Fasted cardio can burn a slightly higher share of fat during the session, but 24-hour fat loss is similar when calories match. Choose the time you will stick with.",
      },
    ],
    sources: [SRC_DONNELLY, SRC_WILLIS, SRC_COMPENDIUM, SRC_ACSM],
    body: [
      p(
        "“Do more cardio” is the default fat-loss advice in every gym. The useful question is narrower: how much cardio for fat loss is enough to help, without stealing recovery from the training that keeps your muscle?",
      ),

      h2("Diet still does most of the work"),
      p(
        `Fat loss needs a calorie deficit. Cardio raises how many calories you burn; food decides whether that shows up on the scale. Set the food side with <a href="${LINK.caloriesLose}">how many calories to eat to lose weight</a> and <a href="${LINK.deficit}">how to calculate your calorie deficit</a>, then size cardio to support that plan.`,
      ),

      h2("Weekly targets that match the evidence"),
      p(
        "Public-health guidelines for adults often land around 150 minutes of moderate activity a week for health, and closer to 250–300 minutes when the goal is weight loss or keeping weight off. Moderate means you can talk but not sing — brisk walking on most Indian roads counts.",
      ),
      table(
        ["Goal", "Moderate cardio (e.g. brisk walk)", "Harder cardio (jog, cycling hard)"],
        [
          ["General health", "~150 min/week", "~75 min/week"],
          ["Fat loss support", "~200–300 min/week", "~100–150 min/week"],
          ["Keeping weight off", "Often toward the higher end", "Mix as recovery allows"],
        ],
      ),
      p(
        "You can mix intensities. Two hard sessions plus daily walking is a common, sustainable pattern.",
      ),

      h2("What a realistic week looks like"),
      ol([
        "Daily: walk to a step target (often 7,000–10,000) — see walking and step guides linked below",
        "2–4 days: strength training to protect muscle",
        "2–3 days: 20–40 minutes of steady cardio or intervals if steps alone are not enough",
        "1–2 days: easier movement only",
      ]),
      p(
        `Pair this with <a href="${LINK.strength}">strength training for fat loss</a>. For steps alone, read <a href="${LINK.walking}">does walking help you lose weight</a> and <a href="${LINK.steps}">how many steps a day to lose weight</a>.`,
      ),

      h2("When “more cardio” stops helping"),
      ul([
        "Hunger and snack attacks cancel the session burn",
        "Joints, sleep or mood get worse",
        "You skip lifts or cut protein",
        "You are already training hard six days a week with no progress for a month — fix the deficit and NEAT first",
      ]),
      p(
        `If the scale stalled, walk through <a href="${LINK.plateau}">why you might not be losing weight</a> before adding a second hour on the treadmill.`,
      ),

      h2("Session burn is smaller than people think"),
      p(
        "For a roughly 70 kg person, a brisk 45-minute walk is often in the ballpark of a light weights session — useful, not magic. Hard running burns more per minute, but recovery cost is higher. Use cardio to nudge weekly energy expenditure, not as punishment for dinner.",
      ),

      toolCta(
        "/calorie-deficit-calculator",
        "calorie deficit calculator",
        "Set the food deficit first, then layer cardio with the",
      ),
      toolCta(
        "/steps-to-calories-calculator",
        "steps to calories calculator",
        "Estimate walking burn with the",
      ),

      takeaways([
        "How much cardio for fat loss: roughly 150–300 minutes of moderate work a week for most people, plus a food deficit.",
        "Walking counts; hard sessions are optional amplifiers.",
        "Keep lifting so more of the weight you lose is fat.",
        "If progress stalls, fix intake and daily steps before endless treadmill time.",
      ]),
      p(DISCLAIMER),
    ].join("\n"),
  },

  {
    slug: "hiit-vs-steady-state-for-fat-loss",
    title: "HIIT vs Steady State for Fat Loss",
    excerpt:
      "HIIT vs steady-state cardio for fat loss: what research shows when weekly work is matched, who should pick which, and a simple way to combine both without burning out.",
    quickAnswer: `When total weekly hard work is similar, HIIT and steady-state cardio reduce body fat by about the same amount. HIIT is time-efficient and demanding; steady work (brisk walking, easy cycling) is easier to recover from and easier to do often. For fat loss, pick the style you will repeat, keep a calorie deficit, and still lift. Beginners and anyone with joint issues usually do better starting with steady walking before intense intervals. ${DISCLAIMER}`,
    categorySlug: "weight-loss",
    subcategorySlug: "cardio-weight-loss",
    primaryKeyword: "hiit vs steady state for fat loss",
    metaTitle: "HIIT vs Steady State for Fat Loss",
    metaDescription:
      "HIIT vs steady-state cardio for fat loss: equal weekly work, similar fat loss — choose the style you can recover from and stick with.",
    tags: ["HIIT", "steady state", "cardio", "fat loss", "intervals"],
    topics: ["Weight Loss", "Cardio", "Training"],
    featuredImageAlt: "Interval timer next to a treadmill for HIIT vs steady cardio",
    relatedSlugs: [
      "how-much-cardio-for-fat-loss",
      "best-cardio-for-weight-loss",
      "strength-training-for-fat-loss",
      "does-walking-help-you-lose-weight",
      "how-to-lose-belly-fat",
    ],
    dayOffset: 10,
    faq: [
      {
        question: "Is HIIT better than jogging for fat loss?",
        answer:
          "Not automatically. Matched for weekly effort, fat loss is similar. HIIT wins on time per session; jogging or walking wins on recoverability and joint friendliness for many people.",
      },
      {
        question: "How many HIIT sessions per week?",
        answer:
          "One to three is enough for most. Daily all-out intervals plus heavy lifting is a common overtraining pattern.",
      },
      {
        question: "What counts as steady-state cardio?",
        answer:
          "Continuous work at a pace you could hold for 20–60 minutes while still able to speak in short sentences: brisk walking, easy cycling, light jogging, swimming laps.",
      },
      {
        question: "Can HIIT spot-reduce belly fat?",
        answer:
          "No. Fat loss is whole-body. HIIT can help the weekly deficit, but it does not melt stomach fat preferentially — see how belly fat actually works.",
      },
    ],
    sources: [SRC_KEATING, SRC_WILLIS, SRC_DONNELLY, SRC_ACSM],
    body: [
      p(
        "Gym marketing loves HIIT. Long walks look boring. For fat loss, the comparison that matters is HIIT vs steady state when you control for how much work you actually do each week.",
      ),

      h2("What the research usually finds"),
      p(
        "Meta-analyses that match interval training against moderate continuous training often show similar reductions in body fat when total training load is comparable. HIIT is not a fat-loss cheat code; it is a different way to accumulate hard minutes.",
      ),
      table(
        ["Style", "Pros", "Cons"],
        [
          ["HIIT / intervals", "Time-efficient; keeps sessions interesting", "Harder on joints and recovery; form breaks down when exhausted"],
          ["Steady state", "Easy to repeat daily; pairs well with lifting", "Longer clock time for the same calorie burn"],
          ["Daily walking", "Lowest barrier; builds NEAT", "Easy to under-dose intensity if you stroll too slowly"],
        ],
      ),

      h2("A simple decision rule"),
      ul([
        "Short on time and already fit → 1–2 HIIT sessions + daily walking",
        "Beginner, heavier, or sore knees → mostly steady walking/cycling first",
        "Lifting hard 4 days a week → keep cardio mostly easy so legs recover",
      ]),
      p(
        `Size the weekly dose with <a href="${LINK.cardioDose}">how much cardio for fat loss</a>. Keep muscle with <a href="${LINK.strength}">strength training for fat loss</a>. Belly fat still needs a deficit — see <a href="${LINK.bellyFat}">how to lose belly fat</a>.`,
      ),

      h2("Sample HIIT session (intermediate)"),
      ol([
        "5–8 minute easy warm-up",
        "6–10 rounds: 30–40 seconds hard, 60–90 seconds easy",
        "5 minute cool-down",
        "Total hard work often lands around 5–8 minutes — enough when done consistently",
      ]),
      p(
        "Hard means breathing heavily but still in control. All-out sprints every session are optional drama, not a requirement.",
      ),

      h2("Sample steady session"),
      p(
        "30–45 minutes continuous at a conversational pace: treadmill incline walk, outdoor brisk walk, cycle, or rower. This is the style you can do the day after squats.",
      ),

      h2("Combining both without frying yourself"),
      p(
        `Many people do best with mostly steady work and one interval day. Walking every day still counts — see <a href="${LINK.walking}">does walking help you lose weight</a>. For machine and outdoor options, use <a href="${LINK.bestCardio}">best cardio for weight loss</a>.`,
      ),

      toolCta(
        "/body-fat-calculator",
        "body fat calculator",
        "Track shape change, not only scale weight, with the",
      ),

      takeaways([
        "HIIT vs steady state for fat loss: similar results when weekly work matches.",
        "Choose the style you recover from and will repeat.",
        "1–3 HIIT days max for most; fill the rest with walking or easy cardio.",
        "Diet deficit + lifting still decide most of the outcome.",
      ]),
      p(DISCLAIMER),
    ].join("\n"),
  },

  {
    slug: "best-cardio-for-weight-loss",
    title: "Best Cardio for Weight Loss Beginners",
    excerpt:
      "Best cardio for weight loss beginners: walking, cycling, swimming and simple intervals ranked by joints, sweat, and how easy they are to stick with on an Indian schedule.",
    quickAnswer: `The best cardio for weight loss is the one you will do three or more days a week without quitting — usually brisk walking first. Cycling and swimming are strong low-impact backups. Jogging and HIIT work if joints and fitness allow. Pair any of them with a calorie deficit and 2–4 days of strength training; cardio alone rarely reshapes your body. ${DISCLAIMER}`,
    categorySlug: "weight-loss",
    subcategorySlug: "cardio-weight-loss",
    primaryKeyword: "best cardio for weight loss",
    metaTitle: "Best Cardio for Weight Loss Beginners",
    metaDescription:
      "Best cardio for weight loss beginners: walking first, then cycling, swimming or easy intervals — plus how to fit sessions around Indian workdays.",
    tags: ["cardio", "weight loss", "beginner", "walking", "fat loss"],
    topics: ["Weight Loss", "Cardio", "Beginner Fitness"],
    featuredImageAlt: "Beginner walking for weight-loss cardio on a quiet road",
    relatedSlugs: [
      "how-much-cardio-for-fat-loss",
      "hiit-vs-steady-state-for-fat-loss",
      "does-walking-help-you-lose-weight",
      "how-many-steps-a-day-to-lose-weight",
      "strength-training-for-fat-loss",
    ],
    dayOffset: 10,
    faq: [
      {
        question: "Is walking enough cardio to lose weight?",
        answer:
          "Yes for many beginners, if you walk briskly most days and control food. Raise incline, pace or duration before jumping to punishing HIIT.",
      },
      {
        question: "Which machine is best: treadmill, cycle or elliptical?",
        answer:
          "Whichever you will use. Treadmill walking/jogging is familiar; bikes spare the knees; ellipticals reduce impact. Consistency beats the logo on the console.",
      },
      {
        question: "Morning or evening cardio?",
        answer:
          "The best slot is the one that survives your commute and family schedule. Consistency beats fasted-morning mythology.",
      },
      {
        question: "Do I need a gym for cardio?",
        answer:
          "No. Outdoor walking, stair climbs, and body-weight circuits work. A gym helps when weather or safety makes outdoor walking hard.",
      },
    ],
    sources: [SRC_DONNELLY, SRC_COMPENDIUM, SRC_WILLIS, SRC_ACSM],
    body: [
      p(
        "Beginners often ask for the single best cardio for weight loss. There isn’t one machine that melts fat. There is a short list of options ranked by how easy they are to start, recover from, and repeat.",
      ),

      h2("Ranked for most beginners"),
      table(
        ["Option", "Why it works", "Watch-outs"],
        [
          ["Brisk walking", "Low skill, low injury risk, easy daily dose", "Too-slow stroll under-doses intensity"],
          ["Cycling (outdoor/stationary)", "Easy on knees; steady burn", "Traffic safety outdoors; saddle comfort"],
          ["Swimming / water walking", "Joint-friendly full-body work", "Pool access and comfort in water"],
          ["Elliptical / rower", "Indoor, scalable effort", "Form fatigue on the rower"],
          ["Easy jogging", "Higher burn per minute once base exists", "Shins, knees — build volume slowly"],
          ["HIIT / circuits", "Short sessions", "Easy to overdo; learn form first"],
        ],
      ),

      h2("A beginner week you can actually live with"),
      ol([
        "Most days: 30–45 minute brisk walk (or step target)",
        "2–3 days: strength training (goblet squat, push-ups, rows, hinges)",
        "Optional 1 day: 15–20 minute easy intervals once walking feels easy",
        "Keep one lighter day for joints and sleep",
      ]),
      p(
        `How big the cardio dose should get: <a href="${LINK.cardioDose}">how much cardio for fat loss</a>. Intervals vs easy pace: <a href="${LINK.hiit}">HIIT vs steady state for fat loss</a>. Walking depth: <a href="${LINK.walking}">does walking help you lose weight</a> and <a href="${LINK.steps}">how many steps a day to lose weight</a>.`,
      ),

      h2("Indian-schedule tips"),
      ul([
        "Commute walk + evening 20 minutes beats one heroic Sunday session",
        "Apartment stairs count when roads feel unsafe after dark",
        "Monsoon plan: hallway walks, indoor cycle video, or mall walking",
        "Office days: 10-minute post-lunch walk to break long sitting",
      ]),

      h2("What “best” never replaces"),
      p(
        `A calorie deficit and enough protein still drive fat loss. Lifting keeps the look of the weight you lose — see <a href="${LINK.strength}">strength training for fat loss</a>. Cardio is the volume dial, not the whole plan.`,
      ),

      toolCta(
        "/steps-to-calories-calculator",
        "steps to calories calculator",
        "Turn walks into an estimated burn with the",
      ),
      toolCta(
        "/calorie-deficit-calculator",
        "calorie deficit calculator",
        "Keep food honest with the",
      ),

      takeaways([
        "Best cardio for weight loss beginners usually starts with brisk walking.",
        "Cycling and swimming are excellent low-impact upgrades.",
        "Add HIIT only after a base of easy work feels comfortable.",
        "Cardio supports a deficit; it does not replace one.",
      ]),
      p(DISCLAIMER),
    ].join("\n"),
  },
];
