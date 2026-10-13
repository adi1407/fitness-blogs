import { buildExerciseGuide, OVERLOAD_NOTE, type ExerciseExpansion } from "./exerciseGuide";

const X = (slug: string) => `/exercises/shoulders/${slug}`;

export const SHOULDER_GUIDES: Record<string, ExerciseExpansion> = {
  "overhead-press": buildExerciseGuide({
    intro:
      "The standing overhead press pushes a barbell from your shoulders to straight arms overhead. It trains the front and side shoulders and the triceps, while the core, glutes and upper back work to keep you stable. It is the best test of overhead strength. It suits lifters who can raise their arms fully overhead without arching the lower back.",
    setup: [
      "Set the bar in a rack at about upper-chest height.",
      "Grip just outside shoulder width with wrists straight and forearms vertical.",
      "Unrack with the bar resting on your front shoulders and elbows slightly in front of the bar.",
      "Stand with feet hip width, squeeze your glutes and brace your stomach.",
    ],
    steps: [
      "Move your head back slightly so the bar can pass your chin.",
      "Press the bar straight up.",
      "Once it passes your forehead, move your head forward under the bar.",
      "Finish with the bar over your mid-foot, arms locked and biceps near your ears.",
      "Lower the bar back to your shoulders under control.",
    ],
    breathing:
      "Breathe in and brace at the bottom, press while holding your breath, and breathe out at the top. Lower in about 2 seconds. Squeezing the glutes during the press stops you from leaning back.",
    variations: [
      { name: "Seated dumbbell shoulder press", href: X("dumbbell-shoulder-press"), note: "back support and a freer path for each arm." },
      { name: "Arnold press", href: X("arnold-press"), note: "a rotating dumbbell press with a longer range." },
      { name: "Landmine press", note: "an angled press that is easier on stiff shoulders." },
      { name: "Pike push-up", href: X("pike-push-up"), note: "the bodyweight option." },
    ],
    dosage: [
      ["Strength", "3–5", "3–6", "2–3 min"],
      ["Muscle growth", "3–4", "6–10", "2 min"],
    ],
    progression: `The overhead press progresses slowly. Use small plates (1.25 kg each side) and add reps before weight. A 1 kg jump each week or two is excellent progress after the first few months. ${OVERLOAD_NOTE}`,
    safety:
      "Avoid leaning back into a standing incline press — that strains the lower back. If you can't get your arms overhead without arching, work on the dumbbell or landmine press instead. Stop with any pinching pain at the top.",
    faq: [
      { q: "Standing or seated press?", a: "Standing trains more of the core and whole body; seated lets you focus on the shoulders. Both build shoulder muscle." },
      { q: "Why is my overhead press so weak?", a: "It is normal: most people overhead press about 60–70% of their bench press. Progress is slower, so small weight jumps are important." },
    ],
    formCues: [
      "Forearms vertical under the bar",
      "Glutes squeezed, ribs down",
      "Head back, then through",
      "Bar finishes over mid-foot",
      "Biceps by your ears at lockout",
      "Lower with control to the shoulders",
    ],
    commonMistakes: [
      "Leaning back excessively",
      "Pressing the bar forward around the face",
      "Flaring the elbows out wide at the start",
      "Not locking out overhead",
      "Bending the wrists back",
    ],
    programmingNotes:
      "Use it as the main shoulder press 1–2 times a week, early in the session. If you also bench heavy on the same day, do the overhead press with fewer sets.",
  }),

  "dumbbell-shoulder-press": buildExerciseGuide({
    intro:
      "The seated dumbbell shoulder press trains the front and side shoulders and the triceps with your back supported. Each arm moves independently, so you can find a comfortable path and fix imbalances. It is a great first overhead exercise for beginners and a reliable muscle builder for everyone.",
    setup: [
      "Set an adjustable bench to upright (about 80–90°).",
      "Sit with dumbbells on your thighs, then kick them up to shoulder height one at a time.",
      "Hold the dumbbells just outside your shoulders, palms facing forward or slightly in.",
      "Keep your back against the pad and feet flat on the floor.",
    ],
    steps: [
      "Brace your core and keep your ribs down.",
      "Press the dumbbells up and slightly in.",
      "Stop just short of them touching at the top.",
      "Lower slowly until the dumbbells are about level with your ears or a little lower.",
      "Press again without bouncing at the bottom.",
    ],
    breathing:
      "Breathe out as you press and in as you lower. Take 2 seconds on the way down and press steadily.",
    variations: [
      { name: "Standing overhead press", href: X("overhead-press"), note: "the barbell version for maximum strength." },
      { name: "Arnold press", href: X("arnold-press"), note: "rotating the palms for a longer range." },
      { name: "Machine shoulder press", note: "a fixed path for beginners or high-rep work." },
      { name: "Standing dumbbell press", note: "more core demand." },
    ],
    dosage: [
      ["Beginner", "3", "8–12", "90 s"],
      ["Muscle growth", "3–4", "8–12", "90 s–2 min"],
    ],
    progression: `Dumbbells jump in 2–2.5 kg steps per hand, which is a big change for shoulders. Reach the top of your rep range on all sets before moving up, and accept lower reps at first. ${OVERLOAD_NOTE}`,
    safety:
      "Get heavy dumbbells into position with a knee kick. Lower only as far as your shoulders feel comfortable. Keep the back against the pad instead of arching away from it.",
    faq: [
      { q: "How low should I lower the dumbbells?", a: "To about ear level or slightly below. Going much lower can strain the shoulders without adding much benefit." },
      { q: "Dumbbell or barbell press?", a: "Dumbbells are often more comfortable and fix imbalances; the barbell lets you load more. Both build shoulders well." },
    ],
    formCues: [
      "Back against the pad",
      "Ribs down, core braced",
      "Press up and slightly in",
      "Soft lockout",
      "Lower to about ear level",
      "Forearms vertical",
    ],
    commonMistakes: [
      "Arching the lower back off the bench",
      "Clashing dumbbells at the top",
      "Half reps with too much weight",
      "Elbows drifting far forward",
      "Dropping the dumbbells at the bottom",
    ],
    programmingNotes:
      "Use it as the main shoulder press for beginners or as a second press after bench. 3–4 sets, 1–2 times a week.",
  }),

  "lateral-raise": buildExerciseGuide({
    intro:
      "The lateral raise isolates the side shoulder (medial deltoid), the part that makes shoulders look wider. Presses barely train this area, so lateral raises are one of the most useful accessories for upper-body size. They suit everyone and work with light dumbbells, cables or bands.",
    setup: [
      "Stand tall with a light dumbbell in each hand by your sides.",
      "Bend your elbows slightly and keep that bend fixed.",
      "Lean forward a few degrees from the hips.",
      "Relax your neck and keep shoulders down.",
    ],
    steps: [
      "Raise the dumbbells out to the sides, leading with your elbows.",
      "Lift until your arms are about parallel to the floor.",
      "Keep your hands level with or slightly below your elbows.",
      "Pause briefly at the top.",
      "Lower slowly to your sides.",
    ],
    breathing:
      "Breathe out as you raise and in as you lower. Use about 1 second up and 2–3 seconds down. Swinging the weight up removes most of the benefit.",
    variations: [
      { name: "Cable lateral raise", note: "constant tension, done one arm at a time." },
      { name: "Machine lateral raise", note: "easy to learn and to push close to failure." },
      { name: "Cable upright row (wide)", href: X("upright-row-cable"), note: "a heavier compound option for the side shoulders." },
      { name: "Lean-away lateral raise", note: "holding a post and leaning out for more stretch." },
    ],
    dosage: [
      ["Muscle growth", "3–4", "12–20", "60–90 s"],
      ["High-volume finisher", "2–3", "20–30", "45–60 s"],
    ],
    progression:
      "Side shoulders respond well to lots of sets with light weights. Add reps first, then move up the smallest dumbbell increment. Many lifters train lateral raises 2–3 times a week to accumulate 10–20 sets.",
    safety:
      "Keep the weight light and stop at shoulder height. If you feel pinching at the top, raise slightly forward of your body (about 30° in front), which gives the shoulder joint more room.",
    faq: [
      { q: "Why don't I feel lateral raises in my shoulders?", a: "Usually the weight is too heavy, so the traps and momentum take over. Drop the weight, slow down and lead with your elbows." },
      { q: "How heavy should lateral raises be?", a: "Light. Most people use 4–10 kg dumbbells even when they press much more. Choose a weight you can control for 12–20 reps." },
    ],
    formCues: [
      "Lead with the elbows",
      "Slight forward lean",
      "Raise to shoulder height",
      "Hands level with elbows",
      "Neck relaxed",
      "Slow lowering",
    ],
    commonMistakes: [
      "Swinging the body to lift heavy dumbbells",
      "Shrugging the traps up",
      "Raising above shoulder height",
      "Leading with the hands so the elbows bend more",
      "Rushing reps",
    ],
    programmingNotes:
      "Add 3–4 sets to 2–3 sessions a week, at the end of push, upper or shoulder days. Pair with rear delt work for balanced shoulders.",
  }),

  "rear-delt-fly": buildExerciseGuide({
    intro:
      "The rear delt fly trains the back of the shoulders and the upper-back muscles between the shoulder blades. The rear shoulders are often undertrained compared with the front, so this exercise improves balance, appearance and shoulder health. It suits everyone and works with dumbbells, cables or a reverse pec deck machine.",
    setup: [
      "Hold light dumbbells and hinge forward until your torso is nearly parallel to the floor (or lie face down on an incline bench).",
      "Let the dumbbells hang below your chest, palms facing each other.",
      "Bend your elbows slightly and keep that bend fixed.",
      "Keep your neck neutral and back flat.",
    ],
    steps: [
      "Raise the dumbbells out to the sides in a wide arc.",
      "Lead with your elbows and keep the movement in the shoulders.",
      "Lift until your arms are about level with your body.",
      "Pause briefly without squeezing the shoulder blades hard together.",
      "Lower slowly to the start.",
    ],
    breathing:
      "Breathe out as you raise and in as you lower. Use slow, controlled reps with a short pause at the top.",
    variations: [
      { name: "Reverse pec deck", note: "the machine version — easiest to learn and to load." },
      { name: "Face pull", href: "/exercises/back/face-pull", note: "adds outward rotation for shoulder health." },
      { name: "Cable rear delt fly", note: "crossed cables give constant tension." },
      { name: "Chest-supported fly", note: "lying on an incline bench removes body swing." },
    ],
    dosage: [
      ["Muscle growth", "3–4", "12–20", "60–90 s"],
      ["Shoulder health", "2–3", "15–25", "60 s"],
    ],
    progression:
      "Progress with reps and slow tempo before weight. Use the smallest dumbbell jumps available. Rear shoulders recover quickly, so 2–3 sessions a week work well.",
    safety:
      "Low-risk with light weights. Keep your back flat when bent over, or use chest support if your lower back tires.",
    faq: [
      { q: "Do I need rear delt work if I do rows?", a: "Rows train the rear shoulders somewhat, but direct work makes a visible difference to the back of the shoulders and helps balance a lot of pressing." },
      { q: "Machine or dumbbells?", a: "The reverse pec deck is easiest to do well. Dumbbells work anywhere. Both are effective." },
    ],
    formCues: [
      "Hinge to near parallel",
      "Fixed soft elbows",
      "Lead with the elbows",
      "Raise wide, not back",
      "Light weight, slow reps",
      "Neutral neck",
    ],
    commonMistakes: [
      "Using too much weight and swinging",
      "Squeezing the shoulder blades so it becomes a row",
      "Standing too upright",
      "Shrugging",
      "Rushing the lowering",
    ],
    programmingNotes:
      "Add 2–4 sets to 2–3 sessions a week, after pressing or rowing. Aim to roughly match your weekly side-shoulder sets.",
  }),

  "arnold-press": buildExerciseGuide({
    intro:
      "The Arnold press is a seated dumbbell press that starts with palms facing you and rotates to palms forward as you press. The rotation adds range and more front and side shoulder work. It suits lifters already comfortable with a regular dumbbell shoulder press.",
    setup: [
      "Sit on an upright bench with back supported.",
      "Hold dumbbells in front of your shoulders, palms facing you, elbows in front.",
      "Feet flat, core braced.",
      "Start with the dumbbells at about chin height.",
    ],
    steps: [
      "Start pressing up while opening your elbows out to the sides.",
      "Rotate your palms to face forward as the dumbbells pass your face.",
      "Finish with arms straight overhead, palms forward.",
      "Reverse the movement on the way down, rotating back to palms facing you.",
      "Keep the rotation smooth, not jerky.",
    ],
    breathing:
      "Breathe out as you press and in as you lower. A slightly slower tempo (2 seconds down) keeps the rotation controlled.",
    variations: [
      { name: "Seated dumbbell shoulder press", href: X("dumbbell-shoulder-press"), note: "the standard version without rotation." },
      { name: "Standing overhead press", href: X("overhead-press"), note: "the heavier barbell version." },
      { name: "Half-kneeling single-arm press", note: "one arm at a time with more core demand." },
    ],
    dosage: [
      ["Muscle growth", "3–4", "8–12", "90 s–2 min"],
    ],
    progression: `Use lighter dumbbells than your normal shoulder press — about 10–20% less. Add reps before weight. ${OVERLOAD_NOTE}`,
    safety:
      "The rotation can bother sensitive shoulders. If it pinches, use a regular dumbbell press. Keep the weight moderate and avoid bouncing out of the bottom.",
    faq: [
      { q: "Is the Arnold press better than a normal shoulder press?", a: "Not necessarily. It adds range and variety but uses less weight. Both build the shoulders; choose the one that feels best." },
      { q: "Can I do it standing?", a: "Yes, but seated with back support makes it easier to keep strict form." },
    ],
    formCues: [
      "Start palms facing you",
      "Open elbows as you press",
      "Rotate smoothly",
      "Finish palms forward overhead",
      "Reverse the path on the way down",
      "Back supported",
    ],
    commonMistakes: [
      "Rushing the rotation",
      "Using as much weight as a normal press",
      "Arching away from the bench",
      "Bouncing at the bottom",
      "Partial range at the top",
    ],
    programmingNotes:
      "Use it as a second shoulder press or as the main press in a dumbbell-only program. 3–4 sets once a week is plenty.",
  }),

  "upright-row-cable": buildExerciseGuide({
    intro:
      "The wide-grip cable upright row trains the side shoulders and upper traps. A wide grip and pulling only to about chest height keep it shoulder-friendly while letting you use more weight than lateral raises. It suits intermediate lifters with healthy shoulders.",
    setup: [
      "Attach a straight bar to a low cable.",
      "Grip the bar wider than shoulder width, palms facing you.",
      "Stand close to the pulley with arms straight in front of your thighs.",
      "Stand tall with core braced.",
    ],
    steps: [
      "Pull the bar up along your body, leading with your elbows.",
      "Raise your elbows out to the sides until they are about shoulder height.",
      "Keep the bar below chest height — your hands stay lower than your elbows.",
      "Pause for a moment.",
      "Lower the bar slowly to your thighs.",
    ],
    breathing:
      "Breathe out as you pull and in as you lower. Use a controlled 1-second pull and 2-second lowering.",
    variations: [
      { name: "Dumbbell lateral raise", href: X("lateral-raise"), note: "the isolation option with no grip demand." },
      { name: "Dumbbell upright row", note: "a free path for each arm." },
      { name: "Cable Y-raise", note: "a lighter overhead-angle raise for the side shoulders." },
    ],
    dosage: [
      ["Muscle growth", "3", "10–15", "90 s"],
    ],
    progression: `Add reps first, then weight. Keep the elbows as the highest point of the arm; if your hands pass your elbows, the weight is too heavy. ${OVERLOAD_NOTE}`,
    safety:
      "Narrow-grip upright rows pulled high can pinch the shoulder. Use a wide grip, stop at shoulder height and skip the exercise if you feel pinching even with good form.",
    faq: [
      { q: "Are upright rows bad for the shoulders?", a: "Narrow grips pulled to the chin can irritate some shoulders. A wide grip and stopping at shoulder height makes them tolerable for most people." },
      { q: "Upright rows or lateral raises?", a: "Lateral raises are safer and isolate the side shoulders well. Upright rows let you load more. Many people use both." },
    ],
    formCues: [
      "Wide grip",
      "Lead with the elbows",
      "Elbows to shoulder height",
      "Bar stays below the chest",
      "Stand tall",
      "Slow lowering",
    ],
    commonMistakes: [
      "Narrow grip",
      "Pulling the bar to the chin",
      "Swinging the torso",
      "Shrugging hard at the top",
      "Using too much weight",
    ],
    programmingNotes:
      "Use it once a week as a heavier side-shoulder exercise, alongside lateral raises on another day.",
  }),

  "pike-push-up": buildExerciseGuide({
    intro:
      "The pike push-up is a bodyweight shoulder press. With your hips high, your body forms an upside-down V, which shifts the push-up's work onto the shoulders and triceps. It suits home training and is the main progression toward handstand push-ups.",
    setup: [
      "Start in a push-up position, hands slightly wider than shoulders.",
      "Walk your feet toward your hands and lift your hips high.",
      "Straighten your legs as much as comfortable; your head should point toward the floor.",
      "Spread your fingers and press the floor.",
    ],
    steps: [
      "Bend your elbows and lower the top of your head toward a spot just in front of your hands.",
      "Keep your elbows angled back at about 45°, not flared.",
      "Lower until your head nearly touches the floor.",
      "Press back up to straight arms.",
      "Keep your hips high throughout.",
    ],
    breathing:
      "Breathe in on the way down and out as you press. Use 2 seconds down and 1 second up.",
    variations: [
      { name: "Elevated pike push-up", note: "feet on a bench or chair to make it harder." },
      { name: "Wall handstand push-up", note: "the advanced progression." },
      { name: "Push-ups", href: "/exercises/chest/push-ups", note: "build these first." },
      { name: "Seated dumbbell shoulder press", href: X("dumbbell-shoulder-press"), note: "the gym equivalent." },
    ],
    dosage: [
      ["Beginner", "3", "5–8", "90 s"],
      ["Muscle growth", "3–4", "8–15", "90 s"],
    ],
    progression:
      "Go from pike push-ups on the floor, to feet on a low step, to feet on a bench, then to wall handstand push-ups. Move up once you can do 3 sets of 12.",
    safety:
      "Start slowly — lowering head-first can feel strange. Keep the movement controlled, and avoid this exercise if inverted positions cause dizziness or if you have high blood pressure, glaucoma or a neck problem.",
    faq: [
      { q: "Can pike push-ups build shoulders?", a: "Yes. When you progress them by elevating the feet, they load the shoulders heavily and are an effective home shoulder exercise." },
      { q: "Where should my head go?", a: "Slightly in front of your hands, so head and hands form a triangle. This keeps the shoulders in a stronger position." },
    ],
    formCues: [
      "Hips high",
      "Head forms a triangle with the hands",
      "Elbows back at 45°",
      "Lower under control",
      "Full lockout",
      "Press the floor away",
    ],
    commonMistakes: [
      "Hips dropping so it becomes a normal push-up",
      "Flaring the elbows wide",
      "Short reps",
      "Head landing between the hands",
      "Rushing",
    ],
    programmingNotes:
      "Use as the main shoulder press in a home routine, 2 times a week for 3–4 sets, alongside push-ups and rows.",
  }),
};
