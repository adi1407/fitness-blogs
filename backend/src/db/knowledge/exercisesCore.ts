import { buildExerciseGuide, type ExerciseExpansion } from "./exerciseGuide";

const X = (slug: string) => `/exercises/core/${slug}`;

export const CORE_GUIDES: Record<string, ExerciseExpansion> = {
  plank: buildExerciseGuide({
    intro:
      "The front plank holds your body in a straight line on your forearms and toes. It trains the core to resist your lower back sagging (anti-extension), using the deep abdominal muscles, the six-pack muscle and the glutes. It is the foundation core exercise for beginners and a useful warm-up for everyone.",
    setup: [
      "Place your forearms on the floor with elbows directly under your shoulders.",
      "Step your feet back so your body is straight from head to heels.",
      "Set your feet hip width apart.",
      "Look at the floor just in front of your hands.",
    ],
    steps: [
      "Squeeze your glutes.",
      "Pull your ribs down toward your hips, slightly tucking your pelvis.",
      "Push the floor away with your forearms so your upper back doesn't sag.",
      "Hold the position while breathing steadily.",
      "Stop the set when your hips start to sag or your back arches.",
    ],
    breathing:
      "Breathe normally through the hold — short, controlled breaths while keeping the stomach tight. Holding your breath limits how long you can hold good form.",
    variations: [
      { name: "Knee plank", note: "knees down to make it easier for beginners." },
      { name: "Side plank", href: X("side-plank"), note: "trains the obliques and side of the hip." },
      { name: "Dead bug", href: X("dead-bug"), note: "the same anti-extension skill, lying on your back." },
      { name: "Ab wheel rollout", href: X("ab-wheel-rollout"), note: "a much harder dynamic progression." },
    ],
    dosage: [
      ["Beginner", "3", "20–30 s holds", "60 s"],
      ["Intermediate", "3", "30–60 s holds", "60 s"],
      ["Advanced (harder variation)", "3", "10–20 s hard holds", "60 s"],
    ],
    progression:
      "Once you can hold 60 seconds with perfect form, longer holds add little. Make it harder instead: squeeze everything maximally for 10–20 seconds, lift one foot or one arm, place a plate on your back, or move to the ab wheel.",
    safety:
      "Low-risk. If your lower back aches, your hips have sagged — stop the set. People with high blood pressure should avoid breath holding and very long maximal holds.",
    faq: [
      { q: "How long should I hold a plank?", a: "30–60 seconds with good form is plenty. Multiple quality holds beat one long, sagging hold." },
      { q: "Do planks burn belly fat?", a: "No exercise burns fat from one area. Planks strengthen the core; losing belly fat depends on an overall calorie deficit." },
    ],
    formCues: [
      "Elbows under the shoulders",
      "Glutes squeezed",
      "Ribs pulled down",
      "Straight line head to heels",
      "Push the floor away",
      "Breathe steadily",
    ],
    commonMistakes: [
      "Hips sagging toward the floor",
      "Hips piked high",
      "Holding the breath",
      "Holding for minutes with poor form",
      "Looking up and straining the neck",
    ],
    programmingNotes:
      "Use 2–3 sets at the end of 2–3 sessions a week, or as part of a warm-up before squats and deadlifts.",
  }),

  "dead-bug": buildExerciseGuide({
    intro:
      "The dead bug is done lying on your back, slowly extending opposite arm and leg while keeping your lower back pressed to the floor. It trains the deep core to stop your back arching while your limbs move — the same skill used in lifting and running. It is ideal for beginners and anyone with back sensitivity.",
    setup: [
      "Lie on your back with arms pointing straight up to the ceiling.",
      "Lift your legs with knees bent 90° over your hips.",
      "Press your lower back gently into the floor.",
      "Breathe out fully to set your ribs down.",
    ],
    steps: [
      "Slowly lower your right arm overhead and straighten your left leg toward the floor.",
      "Keep your lower back in contact with the floor.",
      "Stop just before your back starts to arch.",
      "Return to the start.",
      "Repeat with the left arm and right leg, alternating sides.",
    ],
    breathing:
      "Breathe out as you extend the arm and leg, and in as you return. Moving slowly — 2–3 seconds out and back — is what makes this exercise work.",
    variations: [
      { name: "Heel taps", note: "keep the arms still and tap one heel at a time — easier." },
      { name: "Banded or weighted dead bug", note: "holding a light dumbbell or a band overhead." },
      { name: "Front plank", href: X("plank"), note: "the face-down anti-extension exercise." },
      { name: "Pallof press", href: X("pallof-press"), note: "anti-rotation work standing up." },
    ],
    dosage: [
      ["Beginner", "2–3", "6–8 each side", "45–60 s"],
      ["Intermediate", "3", "8–12 each side", "60 s"],
    ],
    progression:
      "Progress by extending further, moving slower, adding a 2-second pause at full extension, or holding a light weight in your hands.",
    safety:
      "Very low-risk and often used in back rehabilitation. If your lower back lifts, shorten the range.",
    faq: [
      { q: "Why is the dead bug so hard when it looks easy?", a: "Keeping the lower back down while the limbs move far away demands strong deep core control. Slow, strict reps reveal weakness quickly." },
      { q: "Is it good for back pain?", a: "It is commonly used in back-friendly programs, but get advice from a physiotherapist or doctor for ongoing pain." },
    ],
    formCues: [
      "Lower back stays on the floor",
      "Opposite arm and leg",
      "Move slowly",
      "Exhale as you extend",
      "Ribs down",
      "Stop before the back arches",
    ],
    commonMistakes: [
      "Arching the lower back",
      "Moving too fast",
      "Holding the breath",
      "Moving the same-side arm and leg",
    ],
    programmingNotes:
      "Use 2–3 sets in your warm-up or at the end of a session, 2–3 times a week.",
  }),

  "cable-woodchop": buildExerciseGuide({
    intro:
      "The cable woodchop pulls a cable diagonally across your body, from high to low or low to high. It trains the obliques and deep core to transfer force through a rotation while the hips and shoulders work together — useful for sports like cricket, tennis and kabaddi. It suits intermediate lifters.",
    setup: [
      "Set a cable to shoulder height or higher with a handle or rope.",
      "Stand side-on to the machine, feet wider than shoulder width.",
      "Grab the handle with both hands, arms nearly straight.",
      "Brace your core and bend your knees slightly.",
    ],
    steps: [
      "Pull the handle diagonally down and across your body toward the opposite hip.",
      "Rotate through your hips and upper back together, pivoting the back foot.",
      "Keep your arms long — the power comes from the trunk.",
      "Pause briefly at the end.",
      "Return slowly along the same path, then finish all reps before switching sides.",
    ],
    breathing:
      "Breathe out as you chop and in as you return. Move smoothly with control rather than yanking the cable.",
    variations: [
      { name: "Low-to-high woodchop", note: "cable set low, pulling up and across." },
      { name: "Horizontal cable rotation", note: "a straight rotation at chest height." },
      { name: "Pallof press", href: X("pallof-press"), note: "the anti-rotation version." },
      { name: "Medicine ball rotational throw", note: "an explosive option." },
    ],
    dosage: [
      ["Core strength", "3", "8–12 each side", "60 s"],
    ],
    progression:
      "Add reps, then weight. Prioritise smooth control; if your lower back twists instead of your hips and upper back, reduce the load.",
    safety:
      "Rotate through the hips and upper back, not the lower back alone. Start light, especially if you have back problems.",
    faq: [
      { q: "Do woodchops slim the waist?", a: "No exercise spot-reduces fat. Woodchops strengthen the obliques; a smaller waist comes from overall fat loss." },
      { q: "High-to-low or low-to-high?", a: "Both train the same muscles in different directions. Rotate between them." },
      { q: "Can I do woodchops without a cable machine?", a: "Yes. Anchor a resistance band to a door or pole, or hold a dumbbell or medicine ball with both hands and chop diagonally across your body with the same hip-and-shoulder rotation." },
    ],
    formCues: [
      "Rotate hips and shoulders together",
      "Pivot the back foot",
      "Arms long",
      "Smooth, controlled pull",
      "Pause at the end",
      "Brace throughout",
    ],
    commonMistakes: [
      "Twisting only from the lower back",
      "Bending the arms to pull",
      "Using too much weight",
      "Rushing the return",
    ],
    programmingNotes:
      "Add 2–3 sets each side once or twice a week, at the end of a session.",
  }),

  "hanging-knee-raise": buildExerciseGuide({
    intro:
      "The hanging knee raise lifts your knees toward your chest while hanging from a bar. It trains the lower part of the abdominal muscles to curl the pelvis, along with the hip flexors and grip. It suits intermediate lifters who can hang for 20–30 seconds.",
    setup: [
      "Grip a pull-up bar slightly wider than shoulder width.",
      "Hang with straight arms and shoulders slightly pulled down.",
      "Let your legs hang still.",
      "Brace your core to stop swinging.",
    ],
    steps: [
      "Raise your knees toward your chest.",
      "At the top, curl your pelvis up so your hips tilt toward you.",
      "Pause for a moment.",
      "Lower slowly until your legs are straight.",
      "Stop any swing before the next rep.",
    ],
    breathing:
      "Breathe out as you lift and in as you lower. Use a slow 2–3 second lowering to prevent swinging.",
    variations: [
      { name: "Captain's chair knee raise", note: "forearms supported — easier on grip." },
      { name: "Lying leg raise", note: "on the floor for beginners." },
      { name: "Hanging leg raise", note: "straight legs — much harder." },
      { name: "Ab wheel rollout", href: X("ab-wheel-rollout"), note: "a different advanced core exercise." },
    ],
    dosage: [
      ["Beginner", "3", "6–10", "60–90 s"],
      ["Intermediate", "3", "10–15", "60–90 s"],
    ],
    progression:
      "Progress from lying leg raises to captain's chair, then hanging knee raises, then straight-leg raises. Add a light dumbbell between your feet once you can do 3 sets of 15.",
    safety:
      "Avoid swinging. If your grip fails first, use straps or a captain's chair. People with shoulder injuries should be careful with long hangs.",
    faq: [
      { q: "Do knee raises work the lower abs?", a: "They train the whole abdominal wall, with more emphasis on curling the pelvis — which many people feel in the lower abs." },
      { q: "How do I stop swinging?", a: "Lower slowly, pause at the bottom and keep your shoulders slightly engaged." },
      { q: "My grip gives out before my abs. What should I do?", a: "Use lifting straps or ab straps that hold your upper arms, or switch to the captain's chair. Train grip separately with farmer carries and dead hangs." },
    ],
    formCues: [
      "Shoulders slightly down",
      "Knees to the chest",
      "Curl the pelvis at the top",
      "Slow lowering",
      "No swinging",
      "Pause at the bottom",
    ],
    commonMistakes: [
      "Swinging to lift the legs",
      "Only lifting the knees to hip height",
      "Dropping the legs fast",
      "Hanging with relaxed shoulders",
    ],
    programmingNotes:
      "Add 2–3 sets at the end of pull or core sessions, 1–2 times a week.",
  }),

  "ab-wheel-rollout": buildExerciseGuide({
    intro:
      "The ab wheel rollout rolls a wheel forward from your knees while keeping your back from arching, then pulls back. It is one of the hardest anti-extension core exercises and also works the lats and shoulders. It suits advanced trainees who can hold a solid 60-second plank.",
    setup: [
      "Kneel on a mat with the wheel on the floor under your shoulders.",
      "Grip the handles with straight arms.",
      "Tuck your pelvis slightly and squeeze your glutes.",
      "Pull your ribs down.",
    ],
    steps: [
      "Roll the wheel forward slowly, letting your hips follow.",
      "Keep your back flat — no sagging.",
      "Go only as far as you can without arching.",
      "Pull the wheel back toward your knees using your abs and lats.",
      "Return to the start with your hips under you.",
    ],
    breathing:
      "Breathe in as you roll out and out as you pull back. Roll out over 2–3 seconds.",
    variations: [
      { name: "Wall-stop rollout", note: "roll toward a wall that stops you at a safe distance." },
      { name: "Plank", href: X("plank"), note: "the prerequisite." },
      { name: "Barbell rollout", note: "using a barbell with round plates." },
      { name: "Standing rollout", note: "an elite-level progression." },
    ],
    dosage: [
      ["Building up", "3", "5–8 partial reps", "90 s"],
      ["Advanced", "3", "8–12 full reps", "90 s"],
    ],
    progression:
      "Increase range gradually. A wall in front of you limits how far you roll. Add reps only once you can reach full range with a flat back.",
    safety:
      "Arching the lower back at the far end strains it. Only roll as far as you can control. Avoid if you have current back pain.",
    faq: [
      { q: "Why do I feel the ab wheel in my lower back?", a: "You're rolling further than you can control. Shorten the range and keep your ribs down and glutes squeezed." },
      { q: "Is the ab wheel good for beginners?", a: "Usually not as a first exercise. Build up with planks and dead bugs, then use short-range rollouts." },
    ],
    formCues: [
      "Glutes squeezed",
      "Ribs down",
      "Flat back throughout",
      "Roll only as far as you control",
      "Pull back with the abs",
      "Slow roll-out",
    ],
    commonMistakes: [
      "Lower back sagging",
      "Rolling too far too soon",
      "Leading with the hips on the way back",
      "Rushing",
    ],
    programmingNotes:
      "Use 2–3 sets once or twice a week, at the end of a session. Pair with an anti-rotation exercise.",
  }),

  "side-plank": buildExerciseGuide({
    intro:
      "The side plank holds your body sideways on one forearm. It trains the obliques and the side of the hip (glute medius), which keep the pelvis and spine stable when you walk, run or carry something in one hand. It suits all levels and is widely used for back health.",
    setup: [
      "Lie on your side with your elbow directly under your shoulder.",
      "Stack your feet, or stagger them for more balance.",
      "Keep your body in a straight line from head to feet.",
      "Place your top hand on your hip.",
    ],
    steps: [
      "Lift your hips off the floor so your body forms a straight line.",
      "Push the floor away with your forearm.",
      "Keep your hips pushed forward — don't let them drift back.",
      "Hold while breathing steadily.",
      "Lower, then switch sides.",
    ],
    breathing:
      "Breathe steadily through the hold. Stop when your hips start to drop.",
    variations: [
      { name: "Knee side plank", note: "knees bent for beginners." },
      { name: "Side plank with leg lift", note: "raise the top leg for more glute work." },
      { name: "Copenhagen plank", note: "top leg on a bench — targets the inner thigh." },
      { name: "Front plank", href: X("plank"), note: "the front-facing version." },
    ],
    dosage: [
      ["Beginner", "2–3", "15–20 s each side", "45 s"],
      ["Intermediate", "3", "30–45 s each side", "45–60 s"],
    ],
    progression:
      "Go from knees to feet, then add a top-leg lift or reach-throughs. Once 45 seconds is easy, make it harder rather than longer.",
    safety:
      "Low-risk. If your shoulder hurts, try the knee version or a hand-supported version.",
    faq: [
      { q: "Do side planks help back pain?", a: "Side planks are part of many back-health programs because they strengthen the trunk with little spine stress. Seek professional advice for ongoing pain." },
      { q: "Which side should I start with?", a: "Start with your weaker side and match the time on the other." },
      { q: "Should I feel side planks in my hips?", a: "Yes. The glute medius on the side of the hip works with the obliques to hold you up. Feeling both is normal and useful for walking and single-leg exercises." },
    ],
    formCues: [
      "Elbow under the shoulder",
      "Straight line head to feet",
      "Hips pushed forward",
      "Push the floor away",
      "Breathe steadily",
      "Weaker side first",
    ],
    commonMistakes: [
      "Hips sagging",
      "Hips drifting backward",
      "Shoulder shrugging up",
      "Holding the breath",
    ],
    programmingNotes:
      "Add 2–3 sets each side at the end of 2–3 sessions a week.",
  }),

  "pallof-press": buildExerciseGuide({
    intro:
      "The Pallof press holds a cable or band in front of your chest and presses it straight out while resisting the sideways pull. It trains the core to resist rotation (anti-rotation), working the obliques and deep core muscles. It is gentle on the back and suits all levels.",
    setup: [
      "Set a cable or band at chest height.",
      "Stand side-on to the anchor, about an arm's length away.",
      "Hold the handle with both hands at your chest.",
      "Feet shoulder width, knees slightly bent, core braced.",
    ],
    steps: [
      "Press the handle straight out in front of your chest.",
      "Resist the cable pulling you toward the anchor.",
      "Hold for 1–2 seconds with arms straight.",
      "Bring the handle back to your chest.",
      "Finish all reps on one side, then switch.",
    ],
    breathing:
      "Breathe out as you press and in as you return. Holding the extended position is the key part.",
    variations: [
      { name: "Half-kneeling Pallof press", note: "one knee down — more hip stability." },
      { name: "Pallof press with overhead reach", note: "raise the arms overhead at the end." },
      { name: "Cable woodchop", href: X("cable-woodchop"), note: "the rotational version." },
      { name: "Band Pallof press", note: "a home version with a resistance band." },
    ],
    dosage: [
      ["Core strength", "2–3", "8–12 each side with 2 s holds", "45–60 s"],
    ],
    progression:
      "Increase hold time, step further from the anchor or add weight. If your torso rotates, the load is too heavy.",
    safety:
      "Very low-risk. Good for people who find crunches uncomfortable for the back.",
    faq: [
      { q: "What does anti-rotation mean?", a: "It means your core resists being twisted. This protects the spine during lifting, running and sports." },
      { q: "Can I do it at home?", a: "Yes — anchor a resistance band to a door or pole at chest height." },
      { q: "How heavy should the Pallof press be?", a: "Light enough that your torso stays perfectly square for the whole hold. Most people use far less weight than they expect; stepping further from the anchor is an easy way to make it harder." },
    ],
    formCues: [
      "Stand side-on",
      "Press straight out from the chest",
      "Don't let the cable turn you",
      "Hold 1–2 seconds",
      "Braced core",
      "Soft knees",
    ],
    commonMistakes: [
      "Torso rotating toward the anchor",
      "Pressing at an angle",
      "Too much weight",
      "Rushing the hold",
    ],
    programmingNotes:
      "Add 2–3 sets each side in warm-ups or at the end of sessions, 2–3 times a week.",
  }),
};
