import { buildExerciseGuide, OVERLOAD_NOTE, type ExerciseExpansion } from "./exerciseGuide";

const X = (slug: string) => `/exercises/arms/${slug}`;

export const ARM_GUIDES: Record<string, ExerciseExpansion> = {
  "barbell-curl": buildExerciseGuide({
    intro:
      "The barbell curl is the classic biceps exercise. Both arms lift together, so you can use more weight than with dumbbells, and the fixed grip keeps the biceps under steady load. It also works the brachialis (the muscle under the biceps) and the forearms. It suits all levels; an EZ-bar is a good swap if a straight bar strains your wrists.",
    setup: [
      "Stand tall with feet hip width apart.",
      "Grip the bar at shoulder width with palms facing forward.",
      "Let the bar hang at arm's length against your thighs.",
      "Pin your elbows lightly to your sides and brace your core.",
    ],
    steps: [
      "Curl the bar up by bending only at the elbows.",
      "Keep your upper arms still — elbows stay by your sides.",
      "Lift until the bar is near shoulder height and your biceps are fully contracted.",
      "Squeeze for a moment at the top.",
      "Lower slowly until your arms are completely straight.",
    ],
    breathing:
      "Breathe out as you curl and in as you lower. Use about 1 second up and 2–3 seconds down. The lowering phase does a lot of the muscle-building work, so don't let the bar drop.",
    variations: [
      { name: "EZ-bar curl", note: "an angled grip that is easier on the wrists and elbows." },
      { name: "Hammer curl", href: X("hammer-curl"), note: "palms facing in for the brachialis and forearms." },
      { name: "Concentration curl", href: X("concentration-curl"), note: "one arm at a time with strict form." },
      { name: "Incline dumbbell curl", note: "lying back on an incline bench for a deeper stretch." },
    ],
    dosage: [
      ["Muscle growth", "3–4", "8–12", "90 s"],
      ["Lighter pump work", "2–3", "12–15", "60 s"],
    ],
    progression: `Add reps until you hit 12 on all sets, then add the smallest weight possible (1–2.5 kg total). Biceps grow slowly; steady small jumps work better than swinging heavier weights. ${OVERLOAD_NOTE}`,
    safety:
      "Keep your lower back still — leaning back to heave the bar shifts stress to the spine. If the elbows or wrists ache, switch to an EZ-bar or dumbbells.",
    faq: [
      { q: "Barbell or dumbbell curls?", a: "Both build the biceps. Barbells allow more weight; dumbbells let each wrist rotate freely and fix imbalances. Using both over a training block is ideal." },
      { q: "How many sets of curls do I need?", a: "If you already do rows and pull-ups, about 6–10 direct biceps sets a week is enough for most people." },
    ],
    formCues: [
      "Elbows pinned to your sides",
      "Torso still — no swinging",
      "Full stretch at the bottom",
      "Squeeze at the top",
      "Slow lowering",
      "Wrists straight",
    ],
    commonMistakes: [
      "Swinging the hips to lift the bar",
      "Elbows drifting forward at the top",
      "Cutting the range short at the bottom",
      "Dropping the bar on the way down",
      "Bending the wrists back",
    ],
    programmingNotes:
      "Do 3–4 sets after your back exercises, 1–2 times a week. Superset with a triceps exercise to save time.",
  }),

  "hammer-curl": buildExerciseGuide({
    intro:
      "The hammer curl uses a neutral grip with palms facing each other. That shifts more work to the brachialis and the brachioradialis (a large forearm muscle), which adds thickness to the arm. It is often more comfortable than standard curls for people with cranky elbows or wrists.",
    setup: [
      "Stand tall holding a dumbbell in each hand at your sides.",
      "Turn your palms to face your thighs.",
      "Keep your elbows close to your body.",
      "Brace your core and relax your shoulders.",
    ],
    steps: [
      "Curl the dumbbells up, keeping your thumbs pointing up.",
      "Move only at the elbows.",
      "Lift until your forearms are nearly vertical.",
      "Pause briefly at the top.",
      "Lower under control to straight arms.",
    ],
    breathing:
      "Breathe out as you lift and in as you lower. Keep an even tempo — about 1 second up, 2 seconds down. You can curl both arms together or alternate.",
    variations: [
      { name: "Cross-body hammer curl", note: "curl each dumbbell toward the opposite shoulder." },
      { name: "Rope cable hammer curl", note: "constant tension on a low cable." },
      { name: "Barbell curl", href: X("barbell-curl"), note: "the palms-up version for the biceps." },
      { name: "Reverse curl", note: "palms down for the forearms." },
    ],
    dosage: [
      ["Muscle growth", "3", "8–15", "60–90 s"],
    ],
    progression: `Add reps, then move up to the next dumbbell. Hammer curls usually allow slightly heavier weights than regular dumbbell curls. ${OVERLOAD_NOTE}`,
    safety:
      "Low-risk. Avoid swinging, and keep the weight under control at the bottom to protect the elbow tendons.",
    faq: [
      { q: "Do hammer curls make arms look bigger?", a: "They build the brachialis, which sits under the biceps and pushes it up, and the forearm. Together, that adds visible thickness to the arm." },
      { q: "Should I do both hammer and regular curls?", a: "It's a good idea. Use one main curl and one variation, or alternate between them every few weeks." },
    ],
    formCues: [
      "Thumbs up the whole time",
      "Elbows by your sides",
      "No swinging",
      "Even tempo",
      "Full range",
      "Shoulders relaxed",
    ],
    commonMistakes: [
      "Elbows drifting forward",
      "Partial reps with heavy dumbbells",
      "Rotating the wrists mid-rep",
      "Leaning back",
      "Rushing the lowering",
    ],
    programmingNotes:
      "Use as a second biceps exercise, 2–3 sets once or twice a week, or as the main curl if regular curls bother your elbows.",
  }),

  "triceps-pushdown": buildExerciseGuide({
    intro:
      "The triceps pushdown isolates the triceps on a cable. The triceps make up about two-thirds of the upper arm, so they matter more for arm size than the biceps. Pushdowns are easy to learn, easy on the elbows and suit all levels.",
    setup: [
      "Attach a straight bar, V-bar or rope to a high cable.",
      "Grip the attachment and stand close to the machine.",
      "Pin your elbows to your sides with forearms about parallel to the floor.",
      "Lean forward slightly from the hips with a braced core.",
    ],
    steps: [
      "Push the attachment down by straightening your elbows.",
      "Keep your upper arms still.",
      "Lock out fully and squeeze the triceps.",
      "With a rope, spread the ends apart at the bottom.",
      "Let the attachment rise until your forearms are just above parallel, then repeat.",
    ],
    breathing:
      "Breathe out as you push down and in as you let the bar rise. Use a 1-second squeeze and a 2-second return.",
    variations: [
      { name: "Rope pushdown", note: "spreading the rope at the bottom gives a stronger squeeze." },
      { name: "Overhead triceps extension", href: X("overhead-triceps-extension"), note: "stretches the long head of the triceps." },
      { name: "Single-arm pushdown", note: "one side at a time with a handle." },
      { name: "Close-grip bench press", href: X("close-grip-bench-press"), note: "a heavy compound triceps exercise." },
    ],
    dosage: [
      ["Muscle growth", "3–4", "10–15", "60–90 s"],
      ["Finisher", "2", "15–20", "60 s"],
    ],
    progression: `Add reps until you reach the top of your range, then increase one plate. Keep the elbows fixed as the weight goes up. ${OVERLOAD_NOTE}`,
    safety:
      "Low-risk. If your elbows ache, switch to a rope or lighter weights with higher reps.",
    faq: [
      { q: "Rope, straight bar or V-bar?", a: "All work. Ropes allow a longer range and stronger squeeze; bars let you use more weight. Pick the one that feels best on your elbows." },
      { q: "Should my elbows move?", a: "No. Keep your upper arms pinned at your sides so the triceps do the work." },
    ],
    formCues: [
      "Elbows pinned to your sides",
      "Slight forward lean",
      "Full lockout at the bottom",
      "Spread the rope at the bottom",
      "Controlled return",
      "Shoulders down",
    ],
    commonMistakes: [
      "Elbows flaring or moving forward",
      "Leaning over the bar and using bodyweight",
      "Short reps without lockout",
      "Letting the weight yank the arms up",
      "Shrugging",
    ],
    programmingNotes:
      "Do 3–4 sets after your pressing, 1–2 times a week. Combine with an overhead extension for complete triceps work.",
  }),

  "overhead-triceps-extension": buildExerciseGuide({
    intro:
      "The overhead triceps extension trains the triceps with your arms overhead, which stretches the long head — the largest part of the triceps. Research suggests training the triceps in this stretched position produces more growth than pushdowns alone. It suits intermediate lifters and works with a dumbbell or a cable.",
    setup: [
      "Sit on a bench with back support or stand tall.",
      "Hold one dumbbell with both hands under the top plate, or face away from a cable with a rope.",
      "Raise the weight overhead with arms straight.",
      "Keep your elbows pointing forward and your ribs down.",
    ],
    steps: [
      "Lower the weight behind your head by bending only your elbows.",
      "Go down until you feel a deep stretch in the triceps.",
      "Keep your elbows close to your head — not flared wide.",
      "Extend your arms back to the top.",
      "Squeeze at lockout and repeat.",
    ],
    breathing:
      "Breathe in as you lower and out as you extend. Take 2–3 seconds on the way down and pause briefly in the stretch.",
    variations: [
      { name: "Cable overhead extension", note: "rope on a low cable, facing away — smooth and joint-friendly." },
      { name: "Skull crusher", href: X("skull-crusher"), note: "a lying version with an EZ-bar." },
      { name: "Single-arm dumbbell extension", note: "one side at a time." },
      { name: "Triceps pushdown", href: X("triceps-pushdown"), note: "the easier, short-stretch option." },
    ],
    dosage: [
      ["Muscle growth", "3", "8–15", "90 s"],
    ],
    progression: `Add reps first. Dumbbell jumps are large relative to triceps strength, so a cable is useful for smaller steps. ${OVERLOAD_NOTE}`,
    safety:
      "The deep stretch can stress the elbows. Warm up with a light set, use a controlled tempo and reduce depth if the elbows hurt. Keep the ribs down to avoid arching the lower back.",
    faq: [
      { q: "Why train triceps overhead?", a: "The long head of the triceps is stretched when the arm is overhead. Training it in that stretched position appears to produce more growth." },
      { q: "Seated or standing?", a: "Seated with back support makes it easier to keep the lower back neutral, especially with heavier dumbbells." },
    ],
    formCues: [
      "Elbows point forward",
      "Ribs down",
      "Deep, controlled stretch",
      "Move only at the elbows",
      "Full lockout overhead",
      "Grip the dumbbell securely",
    ],
    commonMistakes: [
      "Elbows flaring wide",
      "Arching the lower back",
      "Short range that skips the stretch",
      "Going too heavy for the elbows",
      "Bouncing out of the bottom",
    ],
    programmingNotes:
      "Pair with pushdowns: one overhead and one pushdown exercise covers the triceps well. 2–4 sets once or twice a week.",
  }),

  "skull-crusher": buildExerciseGuide({
    intro:
      "The skull crusher, or lying triceps extension, lowers a bar toward your forehead while lying on a bench. It trains all three heads of the triceps with heavier loads than most isolation exercises. It suits intermediate lifters; an EZ-bar is easiest on the wrists.",
    setup: [
      "Lie on a flat bench holding an EZ-bar with a narrow grip.",
      "Press the bar up over your chest with straight arms.",
      "Tilt your arms back slightly so the bar is over your forehead or just behind.",
      "Plant your feet and keep your back flat on the bench.",
    ],
    steps: [
      "Bend your elbows to lower the bar toward your forehead or just behind your head.",
      "Keep your upper arms still and elbows pointing up.",
      "Stop when you feel a deep stretch, a few centimetres from your head.",
      "Extend your arms to return to the start.",
      "Keep the slight backward tilt at the top so the triceps stay loaded.",
    ],
    breathing:
      "Breathe in as you lower and out as you extend. Lower slowly — about 2–3 seconds — because control is essential with a bar near your head.",
    variations: [
      { name: "Dumbbell skull crusher", note: "palms facing in, easier on the wrists." },
      { name: "Overhead triceps extension", href: X("overhead-triceps-extension"), note: "seated or standing with more stretch." },
      { name: "Close-grip bench press", href: X("close-grip-bench-press"), note: "a heavier compound triceps lift." },
      { name: "Triceps pushdown", href: X("triceps-pushdown"), note: "easier on the elbows." },
    ],
    dosage: [
      ["Muscle growth", "3", "8–12", "90 s"],
    ],
    progression: `Add reps, then the smallest weight increase available. If the elbows ache, lighten the load and use higher reps rather than forcing heavy sets. ${OVERLOAD_NOTE}`,
    safety:
      "Use a weight you fully control and consider a spotter on heavier sets. Warm up the elbows first. If you feel elbow pain, switch to dumbbells or cables.",
    faq: [
      { q: "Should I lower to the forehead or behind the head?", a: "Lowering just behind the head keeps more tension on the triceps and is usually kinder to the elbows." },
      { q: "Are skull crushers bad for the elbows?", a: "They can irritate elbows when done heavy and fast. Moderate weights, slow lowering and an EZ-bar make them comfortable for most people." },
    ],
    formCues: [
      "Elbows point to the ceiling",
      "Upper arms tilted slightly back",
      "Lower slowly",
      "Stop a few centimetres from your head",
      "Full extension at the top",
      "Feet planted",
    ],
    commonMistakes: [
      "Elbows flaring out",
      "Moving the upper arms so it becomes a press",
      "Lowering too fast",
      "Going too heavy",
      "Bringing the bar straight over the chest at the top, removing tension",
    ],
    programmingNotes:
      "Use as the main triceps isolation exercise once a week for 3 sets, or rotate with overhead extensions every few weeks.",
  }),

  "concentration-curl": buildExerciseGuide({
    intro:
      "The concentration curl is a seated, one-arm biceps curl with the elbow braced against your inner thigh. The support removes body swing, so it is a strict way to train the biceps with a strong squeeze. It suits all levels as a finishing exercise.",
    setup: [
      "Sit on the end of a bench with feet wide.",
      "Hold a dumbbell in one hand and rest the back of that upper arm against your inner thigh.",
      "Let the arm hang straight down.",
      "Place your free hand on your other knee for support.",
    ],
    steps: [
      "Curl the dumbbell toward your shoulder.",
      "Keep your upper arm pressed against your thigh.",
      "Turn your little finger slightly up at the top for a stronger squeeze.",
      "Pause for 1 second.",
      "Lower slowly until your arm is fully straight.",
    ],
    breathing:
      "Breathe out as you curl and in as you lower. A slow 2–3 second lowering and a 1-second squeeze at the top make light weights very effective.",
    variations: [
      { name: "Preacher curl", note: "a bench pad supports the arm in a similar way." },
      { name: "Cable concentration curl", note: "constant tension." },
      { name: "Barbell curl", href: X("barbell-curl"), note: "the heavier two-arm option." },
    ],
    dosage: [
      ["Muscle growth", "2–3", "10–15 each arm", "60 s"],
    ],
    progression: `Add reps on both arms, then move up a dumbbell. Start with your weaker arm and match reps with the stronger arm. ${OVERLOAD_NOTE}`,
    safety:
      "Very low-risk. Keep the lowering controlled to protect the elbow.",
    faq: [
      { q: "Do concentration curls build the biceps peak?", a: "No exercise targets the peak alone — biceps shape is mostly genetic. Concentration curls build the biceps with strict form and a strong contraction." },
      { q: "Should they be my main biceps exercise?", a: "Usually not. Use them after a heavier curl as a finisher." },
    ],
    formCues: [
      "Upper arm pressed to the thigh",
      "Curl to the shoulder",
      "Turn the little finger up at the top",
      "Squeeze for a second",
      "Full stretch at the bottom",
      "Weaker arm first",
    ],
    commonMistakes: [
      "Lifting the elbow off the thigh",
      "Swinging the torso back",
      "Partial range",
      "Fast lowering",
    ],
    programmingNotes:
      "Use 2–3 sets at the end of a pull or arm session, once or twice a week.",
  }),

  "close-grip-bench-press": buildExerciseGuide({
    intro:
      "The close-grip bench press is a bench press with hands about shoulder width apart. The narrower grip shifts more work to the triceps while the chest and front shoulders still help. It lets you load the triceps more heavily than any isolation exercise, making it a great compound triceps builder for intermediate lifters.",
    setup: [
      "Lie on a flat bench with eyes under the bar.",
      "Grip the bar about shoulder width apart — not touching in the middle.",
      "Pull your shoulder blades back and plant your feet.",
      "Unrack and bring the bar over your shoulders.",
    ],
    steps: [
      "Lower the bar to your lower chest.",
      "Keep your elbows tucked close to your sides.",
      "Touch lightly without bouncing.",
      "Press up, focusing on straightening your elbows.",
      "Lock out fully over your shoulders.",
    ],
    breathing:
      "Breathe in and brace before lowering, hold through the rep, breathe out at lockout. Lower in about 2 seconds.",
    variations: [
      { name: "Barbell bench press", href: "/exercises/chest/barbell-bench-press", note: "the standard grip for the chest." },
      { name: "Close-grip push-ups", note: "hands under the shoulders — the bodyweight version." },
      { name: "Skull crusher", href: X("skull-crusher"), note: "an isolation option for the triceps." },
      { name: "Dips (upright torso)", href: "/exercises/chest/chest-dips", note: "staying upright biases the triceps." },
    ],
    dosage: [
      ["Strength", "3–4", "5–8", "2–3 min"],
      ["Muscle growth", "3", "8–12", "2 min"],
    ],
    progression: `Use double progression as with the bench press — reps first, then 2.5 kg. Expect to lift about 85–90% of your regular bench. ${OVERLOAD_NOTE}`,
    safety:
      "Very narrow grips strain the wrists; shoulder width is enough. Use safety pins or a spotter on heavy sets.",
    faq: [
      { q: "How close should my grip be?", a: "About shoulder width. A grip with hands touching adds wrist strain without extra triceps benefit." },
      { q: "Is it a chest or triceps exercise?", a: "Both, but the narrower grip and tucked elbows make it one of the best compound triceps exercises." },
    ],
    formCues: [
      "Shoulder-width grip",
      "Elbows tucked",
      "Bar to the lower chest",
      "Shoulder blades back",
      "Full lockout",
      "Wrists straight",
    ],
    commonMistakes: [
      "Grip too narrow",
      "Elbows flaring out",
      "Bouncing off the chest",
      "Partial reps",
      "Lifting without safeties",
    ],
    programmingNotes:
      "Use as the main triceps exercise or a second press on push day, 3 sets once a week.",
  }),
};
