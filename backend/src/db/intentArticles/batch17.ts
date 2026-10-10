import {
  DISCLAIMER,
  h2,
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
  overload: "/blog/muscle-building/training-programs/what-is-progressive-overload",
  sets: "/blog/muscle-building/muscle-growth-hypertrophy/how-many-sets-per-muscle-per-week",
  threeDay: "/blog/muscle-building/training-programs/beginner-3-day-gym-workout-plan",
  ppl: "/blog/muscle-building/training-programs/push-pull-legs-for-beginners",
  proteinMuscle: "/blog/muscle-building/muscle-building-nutrition/how-much-protein-to-build-muscle",
  timeline: "/blog/muscle-building/muscle-growth-hypertrophy/how-long-does-it-take-to-build-muscle",
  strengthFatLoss: "/blog/weight-loss/strength-training-weight-loss/strength-training-for-fat-loss",
};

const ex = (group: string, slug: string, text: string) => `<a href="/exercises/${group}/${slug}">${text}</a>`;

const SRC_VOLUME: IntentSource = {
  title: "Schoenfeld, Ogborn & Krieger (2017) — Dose-response relationship between weekly resistance training volume and increases in muscle mass (J Sports Sci)",
  url: "https://pubmed.ncbi.nlm.nih.gov/27433992/",
  note: "More weekly sets per muscle produced more growth, up to around 10+ sets",
};
const SRC_FREQUENCY: IntentSource = {
  title: "Schoenfeld, Ogborn & Krieger (2016) — Effects of resistance training frequency on measures of muscle hypertrophy (Sports Med)",
  url: "https://pubmed.ncbi.nlm.nih.gov/27102172/",
  note: "Training each muscle at least twice a week gave better growth than once",
};
const SRC_LOAD: IntentSource = {
  title: "Schoenfeld et al. (2017) — Strength and hypertrophy adaptations between low- vs high-load resistance training (J Strength Cond Res)",
  url: "https://pubmed.ncbi.nlm.nih.gov/28834797/",
  note: "Light and heavy loads built similar muscle when sets were taken close to failure",
};
const SOURCES = [SRC_VOLUME, SRC_FREQUENCY, SRC_LOAD, SRC.acsm];

const GUIDE = p(
  `<strong>Explore the guide:</strong> Every exercise with step-by-step form cues is in the <a href="/exercises">exercise library</a>; programs, nutrition and recovery are in the <a href="/muscle-building">muscle building guide</a>.`,
);

const VOLUME_NOTE = p(
  `<strong>How much per week:</strong> aim for about 10–20 hard sets per muscle a week, split over at least two sessions, in roughly the 6–15 rep range, stopping 1–3 reps short of failure. Beginners grow well on the lower end — see <a href="${LINK.sets}">how many sets per muscle per week</a>. Add weight or reps over time with <a href="${LINK.overload}">progressive overload</a>.`,
);

/** Double progression, with jump sizes by exercise type. */
function progression(upperJump: string, example: string): string {
  return [
    h2("How to progress week to week"),
    p(
      `Use <strong>double progression</strong>: pick a rep range (say 8–12), start with a weight you can lift for the bottom of the range with 2–3 reps to spare, and add reps each session. Once you hit the top of the range on every set, add weight — ${upperJump} — and work back up. ${example}`,
    ),
    table(
      ["Week", "Sets × reps achieved", "Next session"],
      [
        ["1", "3 × 8, 8, 8", "Same weight, aim for 9s"],
        ["2", "3 × 10, 9, 9", "Same weight"],
        ["3", "3 × 12, 12, 11", "Same weight"],
        ["4", "3 × 12, 12, 12", "Add weight, back to 8s"],
      ],
    ),
  ].join("\n");
}

function mistakes(items: string[]): string {
  return [h2("Common mistakes"), ul(items)].join("\n");
}

const COMMON_FAQ_PROTEIN =
  "Training creates the stimulus; protein and calories supply the building material. Most people building muscle do well on about 1.6 g of protein per kg of body weight a day and a small calorie surplus.";

export const batch17: IntentArticleDef[] = [
  {
    slug: "best-chest-exercises",
    title: "Best Chest Exercises for Muscle Growth",
    excerpt:
      "The best chest exercises for size and strength — bench press, incline press, dips, push-ups and flies — with sets and reps, a ready-made chest workout, home alternatives and the form mistakes that hold people back.",
    quickAnswer: `The best chest exercises are a flat press (barbell bench press or dumbbell press), an incline press for the upper chest, dips or push-ups, and a fly for a stretched position. Two or three of these, for 10–20 total sets a week across two sessions, is enough for most people to grow their chest. Progress the weight or reps over time and keep shoulders pulled back and down. ${DISCLAIMER}`,
    categorySlug: "muscle-building",
    subcategorySlug: "muscle-growth-hypertrophy",
    primaryKeyword: "best chest exercises",
    metaTitle: "Best Chest Exercises: Gym and Home Workout",
    metaDescription:
      "The best chest exercises for muscle growth: bench press, incline press, dips, push-ups and flies, with sets and reps, a chest workout and home options.",
    tags: ["chest exercises", "chest workout", "bench press", "push-ups", "hypertrophy"],
    topics: ["Muscle Building", "Exercises"],
    featuredImageAlt: "Person performing an incline dumbbell press on a gym bench",
    relatedSlugs: ["best-back-exercises", "best-shoulder-exercises", "push-pull-legs-for-beginners", "how-many-sets-per-muscle-per-week", "what-is-progressive-overload"],
    dayOffset: 9,
    faq: [
      {
        question: "How do I build my upper chest?",
        answer:
          "Use an incline press at about 30 degrees with dumbbells or a barbell, and include it at least once a week. Flat pressing also trains the upper chest, but incline work emphasises it more.",
      },
      {
        question: "Can I build my chest with push-ups only?",
        answer:
          "Yes, especially as a beginner. Push-ups build muscle when sets are taken close to failure. Make them harder over time — feet elevated, slower lowering, a backpack with weight — once you can do more than about 25–30.",
      },
      {
        question: "Should I train chest once or twice a week?",
        answer:
          "Twice is usually better. Research shows training a muscle at least twice a week tends to produce more growth than once, for the same weekly sets.",
      },
      { question: "Why isn't my chest growing even though I train it?", answer: COMMON_FAQ_PROTEIN },
    ],
    sources: SOURCES,
    body: [
      p(
        "A strong, well-developed chest comes from a few pressing movements done well and progressed consistently — not from a dozen exercises and endless variety. These are the exercises worth your time, how to program them and how to train your chest at home.",
      ),

      h2("The best chest exercises"),
      table(
        ["Exercise", "Why it works", "Sets × reps", "Level"],
        [
          [ex("chest", "barbell-bench-press", "Barbell bench press"), "Heaviest chest press; easy to progress", "3–4 × 5–8", "Beginner+"],
          [ex("chest", "incline-dumbbell-press", "Incline dumbbell press"), "Emphasises the upper chest; free shoulder path", "3 × 8–12", "Beginner+"],
          [ex("chest", "chest-dips", "Chest dips"), "Deep stretch on the lower chest; bodyweight", "3 × 6–12", "Intermediate"],
          [ex("chest", "push-ups", "Push-ups"), "No equipment; scales from beginner to advanced", "3 × 10–25", "All"],
          [ex("chest", "machine-chest-press", "Machine chest press"), "Stable; safe to push close to failure", "3 × 8–12", "All"],
          [ex("chest", "cable-chest-fly", "Cable chest fly"), "Tension through the full range", "2–3 × 10–15", "All"],
          [ex("chest", "dumbbell-fly", "Dumbbell fly"), "Big stretch at the bottom", "2–3 × 10–15", "Beginner+"],
        ],
      ),

      h2("A simple chest workout"),
      table(
        ["Exercise", "Sets × reps", "Rest"],
        [
          ["Barbell bench press", "3 × 6–8", "2–3 min"],
          ["Incline dumbbell press", "3 × 8–12", "2 min"],
          ["Cable chest fly", "2 × 12–15", "1–2 min"],
        ],
      ),
      p(
        `Do this once a week and get more chest work from a second session — for example, push-ups or machine press on another day. Fitting it into a full week is covered in <a href="${LINK.ppl}">push pull legs for beginners</a> and the <a href="${LINK.threeDay}">beginner 3-day gym workout plan</a>.`,
      ),

      h2("Chest workout at home"),
      ul([
        "Push-ups — 3 sets close to failure",
        "Feet-elevated push-ups for the upper chest — 3 sets",
        "Dips between two sturdy chairs (if your shoulders tolerate them) — 2–3 sets",
        "Slow 3-second lowering to make each rep harder as you get stronger",
      ]),

      h2("Form tips that matter"),
      ul([
        "Pull your shoulder blades back and down, and keep them there.",
        "Lower the bar or dumbbells to the lower chest with elbows at roughly 45° to your body, not flared to 90°.",
        "Control the lowering; don't bounce off the chest.",
        "Keep feet planted and a slight arch — the bench is a full-body lift.",
        "Use a spotter or safety pins when pressing close to failure.",
      ]),
      progression(
        "the smallest jump available, usually 2.5 kg on a barbell or 1–2 kg per dumbbell",
        "On push-ups, progress by adding reps, then elevating your feet or slowing the lowering.",
      ),
      mistakes([
        "Only ever doing flat bench — the upper chest stays under-trained.",
        "Bouncing the bar off the chest and cutting the range short.",
        "Ego-loading so reps get sloppy and shoulders take the strain.",
        "Doing five chest exercises once a week instead of three exercises twice a week.",
      ]),
      VOLUME_NOTE,
      toolCta("/one-rep-max-calculator", "one rep max calculator", "Pick your working weights with the"),
      GUIDE,

      takeaways([
        "Base chest training on a flat press, an incline press and one fly or dip.",
        "10–20 sets a week over two sessions is enough for most people.",
        "Push-ups build real muscle at home when taken close to failure.",
        "Keep shoulder blades back and elbows around 45° to protect your shoulders.",
      ]),
      p(DISCLAIMER),
    ].join("\n"),
  },

  {
    slug: "best-back-exercises",
    title: "Best Back Exercises for a Wider, Thicker Back",
    excerpt:
      "The best back exercises for width and thickness — pull-ups, lat pulldowns, rows and deadlifts — with sets and reps, a back workout, home options and form tips to feel your back working instead of your arms.",
    quickAnswer: `Build your back with one vertical pull (pull-ups or lat pulldowns) for width, one or two rows (barbell, cable or one-arm dumbbell) for thickness, and a hip hinge like the deadlift or Romanian deadlift. Around 10–20 sets a week split over two sessions works for most people. Lead each rep with your elbows and pause briefly at the top to keep the work in your back rather than your biceps. ${DISCLAIMER}`,
    categorySlug: "muscle-building",
    subcategorySlug: "muscle-growth-hypertrophy",
    primaryKeyword: "best back exercises",
    metaTitle: "Best Back Exercises for Width and Thickness",
    metaDescription:
      "The best back exercises: pull-ups, lat pulldowns, rows and deadlifts, with sets and reps, a back workout, home options and cues to feel your back work.",
    tags: ["back exercises", "back workout", "pull-ups", "rows", "lats"],
    topics: ["Muscle Building", "Exercises"],
    featuredImageAlt: "Person doing a seated cable row in a gym",
    relatedSlugs: ["best-chest-exercises", "best-arm-exercises", "push-pull-legs-for-beginners", "how-many-sets-per-muscle-per-week", "what-is-progressive-overload"],
    dayOffset: 9,
    faq: [
      {
        question: "What if I can't do a pull-up yet?",
        answer:
          "Use lat pulldowns, assisted pull-ups (machine or band) and slow negatives — jump to the top and lower yourself over 3–5 seconds. Most beginners get their first pull-up within a few months.",
      },
      {
        question: "Are deadlifts necessary for a big back?",
        answer:
          "No. They are excellent for overall strength, but rows and pulldowns build most of the back's size. Romanian deadlifts are an easier-to-learn alternative for the lower back and hamstrings.",
      },
      {
        question: "Why do I feel rows in my arms, not my back?",
        answer:
          "Think about pulling with your elbows rather than your hands, use a slightly lighter weight, and pause with the shoulder blades squeezed together at the end of each rep.",
      },
    ],
    sources: SOURCES,
    body: [
      p(
        "Your back is a large group of muscles — lats, traps, rhomboids, rear delts and the spinal erectors — so it needs both vertical pulling and horizontal rowing. Get those two patterns right and the rest is detail.",
      ),

      h2("The best back exercises"),
      table(
        ["Exercise", "Main target", "Sets × reps", "Level"],
        [
          [ex("back", "pull-up", "Pull-up"), "Lats (width)", "3 × 5–10", "Intermediate"],
          [ex("back", "lat-pulldown", "Lat pulldown"), "Lats; easy to load for beginners", "3 × 8–12", "All"],
          [ex("back", "barbell-row", "Barbell row"), "Mid-back thickness", "3 × 6–10", "Beginner+"],
          [ex("back", "seated-cable-row", "Seated cable row"), "Mid-back, rhomboids", "3 × 10–12", "All"],
          [ex("back", "single-arm-dumbbell-row", "One-arm dumbbell row"), "Lats; fixes side-to-side imbalances", "3 × 8–12 each", "All"],
          [ex("back", "conventional-deadlift", "Deadlift"), "Whole back and hips; strength", "3 × 3–6", "Intermediate"],
          [ex("back", "face-pull", "Face pull"), "Rear delts, upper back, shoulder health", "2–3 × 12–15", "All"],
        ],
      ),

      h2("A simple back workout"),
      table(
        ["Exercise", "Sets × reps", "Rest"],
        [
          ["Lat pulldown or pull-up", "3 × 6–10", "2 min"],
          ["Barbell or one-arm dumbbell row", "3 × 8–10", "2 min"],
          ["Seated cable row", "2 × 10–12", "1–2 min"],
          ["Face pull", "2 × 12–15", "1 min"],
        ],
      ),
      p(
        `Add a hinge such as the ${ex("legs", "romanian-deadlift", "Romanian deadlift")} on leg day. For weekly structure, see <a href="${LINK.ppl}">push pull legs for beginners</a>.`,
      ),

      h2("Back workout at home"),
      ul([
        "Pull-ups on a doorway bar, or negatives if you can't do full reps yet",
        "Inverted rows under a sturdy table",
        "Backpack or one-arm dumbbell rows",
        "Resistance-band pull-aparts for the upper back",
      ]),

      h2("Form tips that matter"),
      ul([
        "Start each rep by pulling the shoulder blades down (pulldowns) or back (rows).",
        "Drive the elbows toward your hips; your hands are just hooks.",
        "Pause for a second at the end of each rep — no swinging.",
        "Keep a neutral spine on rows and deadlifts; stop the set when your back rounds.",
      ]),
      progression(
        "usually one plate step (2.5–5 kg) on pulldowns and cable rows, or 2 kg on dumbbells",
        "For pull-ups, add reps until you can do 3 × 10, then add a small weight with a belt or backpack.",
      ),
      mistakes([
        "Swinging the torso on rows so momentum, not the back, moves the weight.",
        "Pulling the bar behind the neck on pulldowns — pull to the upper chest instead.",
        "Cutting the stretch short; let the lats lengthen fully between reps.",
        "Doing far more pressing than pulling, which rounds the shoulders over time.",
      ]),
      VOLUME_NOTE,
      toolCta("/one-rep-max-calculator", "one rep max calculator", "Choose loads for rows and deadlifts with the"),
      GUIDE,

      takeaways([
        "Combine a vertical pull for width with rows for thickness.",
        "Lat pulldowns and negatives build up to your first pull-up.",
        "Lead with the elbows and pause each rep to feel your back working.",
        "Deadlifts are useful but optional for back size.",
      ]),
      p(DISCLAIMER),
    ].join("\n"),
  },

  {
    slug: "best-leg-exercises",
    title: "Best Leg Exercises for Size and Strength",
    excerpt:
      "The best leg exercises for quads, hamstrings, glutes and calves — squats, Romanian deadlifts, leg press, lunges and split squats — with sets and reps, a leg workout, home options and form tips.",
    quickAnswer: `The best leg exercises are a squat pattern (back squat or leg press) for the quads, a hip hinge (Romanian deadlift) for the hamstrings and glutes, a single-leg exercise (lunges or Bulgarian split squats), plus leg curls and calf raises. Two leg sessions a week, each with 3–4 of these exercises, builds strong, balanced legs for most people. ${DISCLAIMER}`,
    categorySlug: "muscle-building",
    subcategorySlug: "muscle-growth-hypertrophy",
    primaryKeyword: "best leg exercises",
    metaTitle: "Best Leg Exercises for Size and Strength",
    metaDescription:
      "The best leg exercises for quads, hamstrings and glutes: squats, Romanian deadlifts, leg press, lunges and split squats, plus a leg workout and home options.",
    tags: ["leg exercises", "leg workout", "squats", "glutes", "hamstrings"],
    topics: ["Muscle Building", "Exercises"],
    featuredImageAlt: "Person performing a barbell back squat in a squat rack",
    relatedSlugs: ["best-back-exercises", "beginner-3-day-gym-workout-plan", "how-many-sets-per-muscle-per-week", "what-is-progressive-overload", "strength-training-for-fat-loss"],
    dayOffset: 9,
    faq: [
      {
        question: "Is the leg press as good as squats?",
        answer:
          "For building quad size, the leg press is a very good alternative and easier to push close to failure safely. Squats train more muscles at once and carry over better to strength and sport. Many people do both.",
      },
      {
        question: "Do squats hurt your knees?",
        answer:
          "Done with good form and sensible progression, squats are generally safe for healthy knees and can strengthen them. Knees travelling past the toes is normal. If you have pain or a knee condition, get it assessed and adapt the exercise.",
      },
      {
        question: "How do I grow my glutes?",
        answer:
          "Romanian deadlifts, Bulgarian split squats, deep squats and lunges all train the glutes hard, especially in a stretched position. Train them twice a week with progressive overload.",
      },
    ],
    sources: SOURCES,
    body: [
      p(
        "Legs are the biggest muscle group in your body, which makes leg training the best return on your gym time — for muscle, strength, and calories burned. A few compound lifts done consistently will cover almost everything.",
      ),

      h2("The best leg exercises"),
      table(
        ["Exercise", "Main target", "Sets × reps", "Level"],
        [
          [ex("legs", "back-squat", "Back squat"), "Quads, glutes", "3–4 × 5–8", "Beginner+"],
          [ex("legs", "leg-press", "Leg press"), "Quads; easy to load safely", "3 × 8–12", "All"],
          [ex("legs", "romanian-deadlift", "Romanian deadlift"), "Hamstrings, glutes", "3 × 6–10", "Beginner+"],
          [ex("legs", "bulgarian-split-squat", "Bulgarian split squat"), "Quads, glutes; one leg at a time", "3 × 8–10 each", "Intermediate"],
          [ex("legs", "walking-lunge", "Walking lunge"), "Quads, glutes, balance", "2–3 × 10 each", "All"],
          [ex("legs", "leg-curl", "Leg curl"), "Hamstrings (knee flexion)", "2–3 × 10–15", "All"],
          [ex("legs", "leg-extension", "Leg extension"), "Quads in isolation", "2–3 × 10–15", "All"],
          [ex("legs", "standing-calf-raise", "Standing calf raise"), "Calves", "3 × 10–15", "All"],
        ],
      ),

      h2("Two leg workouts"),
      table(
        ["Day A (squat focus)", "Sets × reps", "Day B (hinge focus)", "Sets × reps"],
        [
          ["Back squat", "3 × 5–8", "Romanian deadlift", "3 × 6–10"],
          ["Walking lunge", "2 × 10 each", "Leg press", "3 × 10–12"],
          ["Leg curl", "3 × 10–12", "Bulgarian split squat", "2 × 8–10 each"],
          ["Standing calf raise", "3 × 10–15", "Leg extension", "2 × 12–15"],
        ],
      ),
      p(
        `Rest 2–3 minutes on squats and Romanian deadlifts, 1–2 minutes on the rest. Both workouts fit into the <a href="${LINK.threeDay}">beginner 3-day gym workout plan</a> or a <a href="${LINK.ppl}">push pull legs split</a>.`,
      ),

      h2("Leg workout at home"),
      ul([
        "Goblet squats with a backpack or water can",
        "Bulgarian split squats with your back foot on a chair",
        "Single-leg Romanian deadlifts",
        "Glute bridges and single-leg calf raises on a step",
      ]),

      h2("Form tips that matter"),
      ul([
        "Squat as deep as you can while keeping a neutral spine and heels down.",
        "Let your knees track in line with your toes; going past the toes is fine.",
        "On Romanian deadlifts, push the hips back with soft knees until you feel a hamstring stretch.",
        "Brace your core before each rep on heavy lifts.",
      ]),
      progression(
        "usually 2.5–5 kg on squats and Romanian deadlifts, and 5–10 kg on the leg press",
        "Lower-body lifts can take bigger jumps than upper-body ones; on lunges and split squats, add reps or hold dumbbells.",
      ),
      mistakes([
        "Half squats with heavy weight instead of deeper squats with a manageable load.",
        "Skipping hamstrings — quads get all the work and knees get less support.",
        "Rounding the lower back on Romanian deadlifts to reach lower.",
        "Training legs once a week, often after skipping it when tired.",
      ]),
      VOLUME_NOTE,
      p(
        `Training legs also burns more calories than smaller muscle groups, which helps if you're losing fat — see <a href="${LINK.strengthFatLoss}">strength training for fat loss</a>.`,
      ),
      toolCta("/one-rep-max-calculator", "one rep max calculator", "Plan your squat and deadlift loads with the"),
      GUIDE,

      takeaways([
        "Cover a squat, a hinge, a single-leg exercise, hamstring curls and calves.",
        "The leg press is a strong alternative to squats for quad size.",
        "Two leg sessions a week beat one long one.",
        "Depth, a neutral spine and gradual progression keep knees and back healthy.",
      ]),
      p(DISCLAIMER),
    ].join("\n"),
  },

  {
    slug: "best-shoulder-exercises",
    title: "Best Shoulder Exercises for Broader Shoulders",
    excerpt:
      "The best shoulder exercises for front, side and rear delts — overhead press, lateral raises, rear-delt flies and face pulls — with sets and reps, a shoulder workout, home options and tips to keep your shoulders healthy.",
    quickAnswer: `For broader shoulders, combine an overhead press (barbell or dumbbell) with lots of lateral raises for the side delts, plus rear-delt flies or face pulls for the back of the shoulder. The front delts already get heavy work from chest pressing, so most people need more side and rear work, not more front raises. About 10–20 sets a week for the side and rear delts is a good target. ${DISCLAIMER}`,
    categorySlug: "muscle-building",
    subcategorySlug: "muscle-growth-hypertrophy",
    primaryKeyword: "best shoulder exercises",
    metaTitle: "Best Shoulder Exercises for Broad Shoulders",
    metaDescription:
      "The best shoulder exercises for front, side and rear delts: overhead press, lateral raises, rear-delt flies and face pulls, with a workout and home options.",
    tags: ["shoulder exercises", "shoulder workout", "lateral raises", "overhead press", "delts"],
    topics: ["Muscle Building", "Exercises"],
    featuredImageAlt: "Person doing dumbbell lateral raises in front of a gym mirror",
    relatedSlugs: ["best-chest-exercises", "best-arm-exercises", "push-pull-legs-for-beginners", "how-many-sets-per-muscle-per-week", "what-is-progressive-overload"],
    dayOffset: 9,
    faq: [
      {
        question: "Do I need front raises?",
        answer:
          "Rarely. Bench press, incline press and overhead press already train the front delts hard. Most people get more benefit from extra lateral raises and rear-delt work.",
      },
      {
        question: "Is the overhead press bad for your shoulders?",
        answer:
          "Not for most healthy shoulders when done with control and a sensible load. If pressing overhead is painful, try a landmine press or a slightly inclined dumbbell press and get persistent pain checked.",
      },
      {
        question: "How heavy should lateral raises be?",
        answer:
          "Light enough to lift with control and no swinging for 10–20 reps. Small muscles respond well to higher reps, and heavy, swung raises shift the work to the traps.",
      },
    ],
    sources: SOURCES,
    body: [
      p(
        "Wide shoulders change your whole frame — and they are mostly built by the side delts, the muscle people tend to under-train. Here's how to train all three heads without overloading the joint.",
      ),

      h2("The best shoulder exercises"),
      table(
        ["Exercise", "Main target", "Sets × reps", "Level"],
        [
          [ex("shoulders", "overhead-press", "Overhead press"), "Front and side delts, triceps; strength", "3 × 5–8", "Beginner+"],
          [ex("shoulders", "dumbbell-shoulder-press", "Dumbbell shoulder press"), "Front and side delts", "3 × 8–12", "All"],
          [ex("shoulders", "lateral-raise", "Lateral raise"), "Side delts (width)", "3–4 × 12–20", "All"],
          [ex("shoulders", "upright-row-cable", "Cable upright row"), "Side delts, traps", "2–3 × 10–15", "Beginner+"],
          [ex("shoulders", "rear-delt-fly", "Rear-delt fly"), "Rear delts", "3 × 12–20", "All"],
          [ex("back", "face-pull", "Face pull"), "Rear delts, upper back, rotator cuff", "2–3 × 12–15", "All"],
          [ex("shoulders", "arnold-press", "Arnold press"), "Front and side delts", "3 × 8–12", "Intermediate"],
          [ex("shoulders", "pike-push-up", "Pike push-up"), "Overhead pressing at home", "3 × 6–12", "All"],
        ],
      ),

      h2("A simple shoulder workout"),
      table(
        ["Exercise", "Sets × reps", "Rest"],
        [
          ["Overhead press or dumbbell shoulder press", "3 × 6–10", "2 min"],
          ["Lateral raise", "3 × 12–20", "1 min"],
          ["Rear-delt fly or face pull", "3 × 12–20", "1 min"],
        ],
      ),
      p(
        `Add 2–3 extra sets of lateral raises on another day — they recover quickly. A <a href="${LINK.ppl}">push pull legs split</a> trains shoulders on push days and rear delts on pull days.`,
      ),

      h2("Shoulder workout at home"),
      ul([
        "Pike push-ups (feet on a chair to make them harder)",
        "Lateral raises with water bottles or a resistance band",
        "Band pull-aparts and band face pulls for rear delts",
        "Slow tempo and higher reps to make light weights challenging",
      ]),

      h2("Keep your shoulders healthy"),
      ul([
        "Warm up with light band work and a couple of light pressing sets.",
        "Raise the dumbbells out to the side, slightly in front of your body, no higher than shoulder height.",
        "Balance pressing with pulling — at least as many back and rear-delt sets as pressing sets.",
        "Stop exercises that cause sharp pain; swap the angle or grip instead of pushing through.",
      ]),
      progression(
        "usually 2.5 kg on the overhead press and 1 kg per dumbbell on raises",
        "Lateral raises progress slowly — add reps for longer before going up in weight, and keep the form strict.",
      ),
      mistakes([
        "Swinging heavy lateral raises so the traps do the work.",
        "Too many front raises and no rear-delt work.",
        "Leaning far back on the overhead press, turning it into an incline press.",
        "Training shoulders hard the day before chest, so both sessions suffer.",
      ]),
      VOLUME_NOTE,
      toolCta("/one-rep-max-calculator", "one rep max calculator", "Pick your overhead press loads with the"),
      GUIDE,

      takeaways([
        "Press overhead for strength; use lateral raises for width.",
        "Most people need more side and rear delt work, not front raises.",
        "Light, controlled, higher-rep raises work best for small delt muscles.",
        "Balance pushing with pulling to keep shoulders healthy.",
      ]),
      p(DISCLAIMER),
    ].join("\n"),
  },

  {
    slug: "best-arm-exercises",
    title: "Best Arm Exercises for Bigger Biceps and Triceps",
    excerpt:
      "The best arm exercises for bigger arms — curls, hammer curls, pushdowns, overhead extensions and close-grip bench — with sets and reps, an arm workout, home options and why triceps matter more than you think.",
    quickAnswer: `For bigger arms, train both biceps and triceps directly two times a week. Good choices are barbell or dumbbell curls and hammer curls for the biceps, and overhead triceps extensions, pushdowns and the close-grip bench press for the triceps. The triceps make up about two-thirds of upper-arm size, so give them at least as much work as your biceps. ${DISCLAIMER}`,
    categorySlug: "muscle-building",
    subcategorySlug: "muscle-growth-hypertrophy",
    primaryKeyword: "best arm exercises",
    metaTitle: "Best Arm Exercises for Biceps and Triceps",
    metaDescription:
      "The best arm exercises for bigger biceps and triceps: curls, hammer curls, pushdowns, overhead extensions and close-grip bench, with an arm workout.",
    tags: ["arm exercises", "biceps", "triceps", "arm workout", "curls"],
    topics: ["Muscle Building", "Exercises"],
    featuredImageAlt: "Person doing dumbbell hammer curls in a gym",
    relatedSlugs: ["best-back-exercises", "best-chest-exercises", "best-shoulder-exercises", "how-long-does-it-take-to-build-muscle", "what-is-progressive-overload"],
    dayOffset: 9,
    faq: [
      {
        question: "Do I need to train arms directly?",
        answer:
          "Rows and pulldowns train the biceps, and pressing trains the triceps, so beginners grow arms without isolation work. Adding a few direct sets a week usually helps arms grow faster, especially after the first few months.",
      },
      {
        question: "How fast can I grow my arms?",
        answer:
          "Arms are small muscles, so changes are gradual — often a few millimetres to a centimetre of arm size over several months for beginners who are eating enough. Measure every 4 weeks rather than daily.",
      },
      {
        question: "Why are overhead triceps extensions recommended?",
        answer:
          "Raising the arm overhead stretches the long head of the triceps, the biggest part of the muscle. Training it in that lengthened position appears to build it well.",
      },
    ],
    sources: SOURCES,
    body: [
      p(
        "Arm training is popular for a reason — arms are what most people see. The secret is not more curls; it is balanced work for biceps and triceps, enough total volume, and steady progression.",
      ),

      h2("The best biceps exercises"),
      table(
        ["Exercise", "Why it works", "Sets × reps"],
        [
          [ex("arms", "barbell-curl", "Barbell curl"), "Heaviest curl; easy to progress", "3 × 8–12"],
          [ex("arms", "hammer-curl", "Hammer curl"), "Brachialis and forearms — adds arm thickness", "3 × 10–12"],
          [ex("arms", "concentration-curl", "Concentration curl"), "Strict, no momentum", "2 × 10–15"],
        ],
      ),

      h2("The best triceps exercises"),
      table(
        ["Exercise", "Why it works", "Sets × reps"],
        [
          [ex("arms", "overhead-triceps-extension", "Overhead triceps extension"), "Stretches the long head, the largest part", "3 × 10–12"],
          [ex("arms", "triceps-pushdown", "Triceps pushdown"), "Easy to learn; great for volume", "3 × 10–15"],
          [ex("arms", "skull-crusher", "Skull crusher"), "Heavy loading with a deep stretch", "3 × 8–12"],
          [ex("arms", "close-grip-bench-press", "Close-grip bench press"), "Heaviest triceps exercise", "3 × 6–10"],
        ],
      ),

      h2("A simple arm workout"),
      table(
        ["Exercise", "Sets × reps", "Rest"],
        [
          ["Close-grip bench press", "3 × 6–10", "2 min"],
          ["Barbell curl", "3 × 8–12", "1–2 min"],
          ["Overhead triceps extension", "3 × 10–12", "1 min"],
          ["Hammer curl", "2 × 10–12", "1 min"],
        ],
      ),
      p(
        `Pair biceps and triceps exercises back to back to save time. Arms also get worked on back and chest days — see <a href="/blog/muscle-building/muscle-growth-hypertrophy/best-back-exercises">the best back exercises</a> and <a href="/blog/muscle-building/muscle-growth-hypertrophy/best-chest-exercises">the best chest exercises</a>.`,
      ),

      h2("Arm workout at home"),
      ul([
        "Curls and hammer curls with a filled backpack or resistance band",
        "Diamond push-ups for the triceps",
        "Bench or chair dips",
        "Overhead triceps extensions with a band or water can",
      ]),

      h2("Form tips that matter"),
      ul([
        "Keep your elbows still on curls — no swinging the body.",
        "Lower slowly through the full range on every rep.",
        "Lock out fully on triceps exercises.",
        "Small muscles need small jumps — add reps first, then weight.",
      ]),
      progression(
        "usually 1 kg per dumbbell or 2.5 kg on a barbell or cable stack",
        "If a jump is too big, stay at the new weight and rebuild reps over a few sessions.",
      ),
      mistakes([
        "Training only biceps and neglecting the larger triceps.",
        "Swinging curls and shortening the range to lift heavier.",
        "Training arms every day — they need recovery to grow like any muscle.",
        "Expecting big arms while eating too little protein and too few calories.",
      ]),
      VOLUME_NOTE,
      p(
        `Arm size also depends on eating enough — see <a href="${LINK.proteinMuscle}">how much protein to build muscle</a> and <a href="${LINK.timeline}">how long it takes to build muscle</a>.`,
      ),
      toolCta("/protein-calculator", "protein calculator", "Make sure you eat enough to grow with the"),
      GUIDE,

      takeaways([
        "Triceps are about two-thirds of the upper arm — train them as much as biceps.",
        "Use a heavy curl, hammer curls, an overhead extension and a pushdown or close-grip press.",
        "Two arm sessions a week with steady progression works best.",
        "Strict form and full range beat heavy, swung reps.",
      ]),
      p(DISCLAIMER),
    ].join("\n"),
  },
];
