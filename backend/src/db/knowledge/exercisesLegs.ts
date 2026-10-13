import { buildExerciseGuide, OVERLOAD_NOTE, type ExerciseExpansion } from "./exerciseGuide";

const X = (slug: string) => `/exercises/legs/${slug}`;

export const LEG_GUIDES: Record<string, ExerciseExpansion> = {
  "back-squat": buildExerciseGuide({
    intro:
      "The back squat places a barbell on your upper back while you sit down and stand up. It trains the quadriceps and glutes hardest, with the adductors (inner thighs), lower back and core working to stay stable. It is one of the best exercises for leg size and total-body strength. It suits anyone who can bodyweight squat to at least parallel with heels down.",
    setup: [
      "Set the bar in a rack at about mid-chest height.",
      "Step under and rest it on your upper traps (not your neck), hands just outside shoulder width.",
      "Stand up to unrack and take 2–3 small steps back.",
      "Set feet about shoulder width with toes turned out 15–30°.",
    ],
    steps: [
      "Take a big breath into your stomach and brace.",
      "Sit down by bending hips and knees together, knees tracking over your toes.",
      "Keep your chest up and heels on the floor.",
      "Descend until your hip crease is at or below the top of your knee, or as deep as you can with a neutral back.",
      "Drive up through the whole foot to standing.",
    ],
    breathing:
      "Breathe in and brace at the top, hold your breath through the descent and the hardest part of the rise, then breathe out at the top. Lower in about 2 seconds and stand up with intent.",
    variations: [
      { name: "Goblet squat", note: "holding a dumbbell at the chest — the best way to learn squatting." },
      { name: "Leg press", href: X("leg-press"), note: "trains the same muscles without balancing a bar." },
      { name: "Front squat", note: "the bar in front keeps you more upright and works the quads more." },
      { name: "Bulgarian split squat", href: X("bulgarian-split-squat"), note: "a single-leg option with light weights." },
    ],
    dosage: [
      ["Strength", "3–5", "3–6", "3 min"],
      ["Muscle growth", "3–4", "6–10", "2–3 min"],
      ["Learning", "3", "8 with a light bar", "2 min"],
    ],
    progression: `Beginners can often add 2.5–5 kg each session for several weeks. When progress slows, use double progression in a rep range like 6–10. Keep 1–3 reps in reserve on most sets. ${OVERLOAD_NOTE}`,
    safety:
      "Always squat inside a rack with safety pins set just below your lowest point. If your lower back rounds at the bottom, stop slightly higher. Knees moving forward past the toes is normal and safe — just keep them in line with your feet.",
    faq: [
      { q: "How deep should I squat?", a: "Aim for hip crease at or just below knee height. Deeper squats build more muscle if you can keep a neutral back; don't force depth you can't control." },
      { q: "Are squats bad for the knees?", a: "No — well-performed squats strengthen the knees. Pain usually comes from load jumps that are too big or knees caving in." },
      { q: "Should I wear lifting shoes?", a: "Not required. Flat, stable shoes are fine. Lifting shoes with a raised heel can help people with stiff ankles stay upright." },
    ],
    formCues: [
      "Bar on the upper traps, not the neck",
      "Big breath and brace",
      "Knees follow the toes",
      "Whole foot on the floor",
      "Chest up",
      "Drive up through mid-foot",
    ],
    commonMistakes: [
      "Knees caving inward",
      "Heels lifting",
      "Squatting too shallow with too much weight",
      "Rounding the lower back at the bottom",
      "Squatting without safety pins",
      "Letting the hips shoot up first",
    ],
    programmingNotes:
      "Squat 1–2 times a week as the first exercise of a lower-body session. Avoid heavy squats and heavy deadlifts in the same session while you're learning.",
  }),

  "romanian-deadlift": buildExerciseGuide({
    intro:
      "The Romanian deadlift (RDL) is a hip hinge that lowers a bar from standing to just below the knees. It trains the hamstrings and glutes through a long stretch, which makes it one of the best hamstring builders. It also teaches the hinge pattern used in deadlifts. It suits beginners and advanced lifters alike.",
    setup: [
      "Stand tall holding a barbell (or dumbbells) in front of your thighs, hands just outside your legs.",
      "Set feet hip width apart.",
      "Unlock your knees slightly.",
      "Pull your shoulders back and brace your core.",
    ],
    steps: [
      "Push your hips back as if closing a car door with your bum.",
      "Let the bar slide down your thighs, staying close to your legs.",
      "Keep the slight knee bend fixed and your back flat.",
      "Stop when you feel a strong hamstring stretch — usually just below the knee.",
      "Drive your hips forward to stand tall and squeeze your glutes.",
    ],
    breathing:
      "Breathe in and brace at the top, lower over 2–3 seconds, and breathe out as you stand. The slow, stretched lowering is where the RDL does its best work.",
    variations: [
      { name: "Dumbbell RDL", note: "easier to learn and good for home." },
      { name: "Single-leg RDL", note: "one leg at a time, also challenges balance." },
      { name: "Conventional deadlift", href: "/exercises/back/conventional-deadlift", note: "starts from the floor and uses more load." },
      { name: "Lying or seated leg curl", href: X("leg-curl"), note: "isolates the hamstrings." },
    ],
    dosage: [
      ["Strength", "3–4", "5–8", "2–3 min"],
      ["Muscle growth", "3–4", "8–12", "2 min"],
    ],
    progression: `Add reps first, then 2.5–5 kg. Grip often limits heavy RDLs — use lifting straps when your hands give out before your hamstrings. ${OVERLOAD_NOTE}`,
    safety:
      "Keep your back flat and the bar close. If your lower back rounds before you feel the hamstrings, shorten the range. Don't lock your knees straight — that strains the back of the knee.",
    faq: [
      { q: "How low should I go?", a: "Only as far as you can with a flat back — for most people, mid-shin or just below the knee. More depth isn't better if your back rounds." },
      { q: "RDL or regular deadlift?", a: "The RDL is better for hamstring growth and easier to recover from; the conventional deadlift builds more total strength. Many programs use both." },
    ],
    formCues: [
      "Hips back, not down",
      "Soft, fixed knees",
      "Bar close to the legs",
      "Flat back",
      "Feel the hamstring stretch",
      "Squeeze the glutes at the top",
    ],
    commonMistakes: [
      "Bending the knees so it becomes a squat",
      "Rounding the back to reach lower",
      "Letting the bar drift forward",
      "Locking the knees straight",
      "Rushing the lowering",
    ],
    programmingNotes:
      "Use as the main hamstring exercise once or twice a week, after squats or on a separate lower day.",
  }),

  "leg-press": buildExerciseGuide({
    intro:
      "The leg press trains the quadriceps and glutes by pushing a weighted sled with your legs while your back stays supported. Because there's no bar on your back, you can push close to failure safely. It suits beginners, people training around back issues and anyone wanting extra leg volume after squats.",
    setup: [
      "Sit with your back and hips flat against the pad.",
      "Place feet shoulder width apart in the middle of the platform.",
      "Push the platform up and release the safety handles.",
      "Hold the side handles and brace.",
    ],
    steps: [
      "Lower the platform by bending your knees toward your chest.",
      "Keep knees in line with your toes.",
      "Go as deep as you can without your lower back lifting off the pad.",
      "Press back up through your whole foot.",
      "Stop just short of locking your knees.",
    ],
    breathing:
      "Breathe in on the way down and out as you push. Lower in 2–3 seconds; bouncing at the bottom loads the lower back.",
    variations: [
      { name: "Back squat", href: X("back-squat"), note: "the free-weight version." },
      { name: "High-foot leg press", note: "feet higher on the platform for more glutes and hamstrings." },
      { name: "Single-leg press", note: "one leg at a time to fix imbalances." },
      { name: "Hack squat", note: "a machine squat with your back supported." },
    ],
    dosage: [
      ["Muscle growth", "3–4", "8–15", "2 min"],
      ["High-rep finisher", "2", "15–25", "90 s"],
    ],
    progression: `Add reps, then weight. Don't chase huge numbers with tiny range — a deep rep with less weight builds more muscle. ${OVERLOAD_NOTE}`,
    safety:
      "Keep your lower back and hips on the pad at the bottom; if your hips curl up, reduce depth. Never lock your knees hard at the top, and always use the safety stops.",
    faq: [
      { q: "Is the leg press as good as squats?", a: "For building the quads and glutes, it can be — research shows similar growth when effort is similar. Squats add more core and balance demand." },
      { q: "Where should my feet go?", a: "Middle of the platform at shoulder width is standard. Lower feet work the quads more; higher feet work the glutes and hamstrings more." },
    ],
    formCues: [
      "Back and hips flat on the pad",
      "Knees track over toes",
      "Deep, controlled lowering",
      "Push through the whole foot",
      "Don't lock the knees",
      "Use the safety stops",
    ],
    commonMistakes: [
      "Short reps with very heavy weight",
      "Hips lifting off the pad at the bottom",
      "Knees caving in",
      "Locking the knees hard",
      "Bouncing at the bottom",
    ],
    programmingNotes:
      "Use as the main quad exercise for beginners, or after squats for extra volume. 3–4 sets once or twice a week.",
  }),

  "walking-lunge": buildExerciseGuide({
    intro:
      "The walking lunge steps forward into a lunge with each rep, alternating legs as you travel. It trains the quadriceps and glutes one leg at a time and challenges balance and coordination. It suits beginners with bodyweight and advanced lifters with dumbbells.",
    setup: [
      "Stand tall with dumbbells at your sides, or hands on hips for bodyweight.",
      "Make sure you have a clear path of 10–15 metres.",
      "Brace your core.",
      "Look straight ahead.",
    ],
    steps: [
      "Take a long step forward with one leg.",
      "Lower until your back knee nearly touches the floor and your front thigh is about parallel.",
      "Keep your front knee in line with your toes.",
      "Push through your front foot to bring the back leg forward into the next step.",
      "Continue alternating legs for the set.",
    ],
    breathing:
      "Breathe in as you lower and out as you push forward. Move steadily — about 1–2 seconds down and a smooth drive up.",
    variations: [
      { name: "Reverse lunge", note: "stepping backward is easier on the knees and better for balance." },
      { name: "Bulgarian split squat", href: X("bulgarian-split-squat"), note: "a stationary, harder single-leg exercise." },
      { name: "Stationary split squat", note: "no stepping, easier to balance." },
      { name: "Bodyweight lunge", note: "the starting point for beginners." },
    ],
    dosage: [
      ["Beginner", "2–3", "8–10 steps each leg", "90 s"],
      ["Muscle growth", "3", "10–12 steps each leg", "2 min"],
    ],
    progression: `Start with bodyweight, then hold dumbbells. Add steps before weight. Longer steps work the glutes more; shorter steps work the quads more. ${OVERLOAD_NOTE}`,
    safety:
      "Use a clear, non-slip path. If balance is a problem, start with reverse or stationary lunges. Stop if you feel sharp knee pain.",
    faq: [
      { q: "Can lunges replace squats?", a: "They train similar muscles one leg at a time and can be a main leg exercise at home, though heavy squats allow more total load." },
      { q: "Do lunges work the glutes?", a: "Yes, especially with a longer step and a slight forward lean of the torso." },
    ],
    formCues: [
      "Long, controlled step",
      "Back knee nearly touches the floor",
      "Front knee over the toes",
      "Tall torso",
      "Push through the front foot",
      "Steady rhythm",
    ],
    commonMistakes: [
      "Steps too short",
      "Front knee caving in",
      "Banging the back knee into the floor",
      "Leaning far forward",
      "Rushing",
    ],
    programmingNotes:
      "Use after your main squat or press as a second leg exercise, 2–3 sets once or twice a week.",
  }),

  "bulgarian-split-squat": buildExerciseGuide({
    intro:
      "The Bulgarian split squat is a single-leg squat with the back foot raised on a bench. It trains the quadriceps and glutes hard with light weights and demands balance and hip mobility. It is one of the most effective leg exercises for home and gym, especially for people whose backs dislike heavy squats.",
    setup: [
      "Stand about one long stride in front of a bench.",
      "Place the top of your back foot on the bench.",
      "Hold dumbbells at your sides or bodyweight to start.",
      "Check that your front foot is far enough forward that the knee stays roughly over the foot at the bottom.",
    ],
    steps: [
      "Lower straight down by bending your front knee.",
      "Keep most of your weight on the front foot.",
      "Descend until your front thigh is about parallel to the floor.",
      "Push through the front heel and mid-foot to stand.",
      "Finish all reps on one leg, then switch.",
    ],
    breathing:
      "Breathe in as you lower and out as you stand. Lower in 2–3 seconds; the controlled descent makes the exercise both safer and more effective.",
    variations: [
      { name: "Stationary split squat", note: "both feet on the floor — the easier regression." },
      { name: "Walking lunge", href: X("walking-lunge"), note: "a dynamic alternative." },
      { name: "Front-foot-elevated split squat", note: "front foot on a plate for more depth." },
      { name: "Back squat", href: X("back-squat"), note: "the bilateral strength builder." },
    ],
    dosage: [
      ["Beginner (bodyweight)", "2–3", "8–10 each leg", "90 s"],
      ["Muscle growth", "3", "8–12 each leg", "2 min"],
    ],
    progression: `Master bodyweight first, then hold dumbbells. Add reps, then weight. Torso upright works the quads more; a slight forward lean works the glutes more. ${OVERLOAD_NOTE}`,
    safety:
      "Balance is the main challenge — stand near a rack or wall when learning. If the front of your back hip feels overstretched, move your front foot slightly back.",
    faq: [
      { q: "Why are Bulgarian split squats so hard?", a: "Each leg handles most of your bodyweight plus the dumbbells, and balance adds difficulty. That's why they work so well with light weights." },
      { q: "How far should my front foot be?", a: "Far enough that your front shin is fairly vertical to slightly forward at the bottom. Experiment with small adjustments until it feels stable." },
    ],
    formCues: [
      "Most weight on the front leg",
      "Lower straight down",
      "Front knee in line with toes",
      "Controlled descent",
      "Push through the front foot",
      "Weaker leg first",
    ],
    commonMistakes: [
      "Front foot too close to the bench",
      "Pushing off the back foot",
      "Knee caving inward",
      "Shallow reps",
      "Rushing and losing balance",
    ],
    programmingNotes:
      "Use as the main leg exercise in home training or as a second leg exercise after squats. 3 sets once or twice a week.",
  }),

  "leg-curl": buildExerciseGuide({
    intro:
      "The leg curl isolates the hamstrings by bending the knee against a machine pad, lying or seated. It trains the knee-bending role of the hamstrings, which hinges like the Romanian deadlift do not fully cover. Seated leg curls in particular stretch the hamstrings and appear to build more muscle. It suits everyone.",
    setup: [
      "Adjust the machine so your knees line up with the pivot point.",
      "Position the ankle pad just above your heels.",
      "For seated curls, lock the thigh pad down firmly.",
      "Hold the handles and keep your hips still.",
    ],
    steps: [
      "Curl your heels toward your bum by bending the knees.",
      "Squeeze the hamstrings at the end of the range.",
      "Keep your hips pressed down (lying) or back (seated).",
      "Pause briefly.",
      "Return slowly until your legs are almost straight.",
    ],
    breathing:
      "Breathe out as you curl and in as you return. Use a 2–3 second return — hamstrings respond well to controlled lowering.",
    variations: [
      { name: "Seated leg curl", note: "the stretched position may build more muscle." },
      { name: "Nordic curl", note: "a very hard bodyweight option — start with assisted versions." },
      { name: "Romanian deadlift", href: X("romanian-deadlift"), note: "the hinge exercise for the hamstrings." },
      { name: "Swiss-ball leg curl", note: "a home option." },
    ],
    dosage: [
      ["Muscle growth", "3", "10–15", "60–90 s"],
    ],
    progression: `Add reps, then one plate. Add a 1-second squeeze at the top before increasing weight. ${OVERLOAD_NOTE}`,
    safety:
      "Low-risk. Avoid jerking the weight up, and keep the hips down so the lower back doesn't arch. Cramping is common — reduce weight and stretch between sets.",
    faq: [
      { q: "Do I need leg curls if I do RDLs?", a: "They complement each other. RDLs train the hip end of the hamstrings; curls train the knee end. Doing both gives more complete development." },
      { q: "Seated or lying?", a: "Both work. Seated curls train the hamstrings in a more stretched position, which research suggests may lead to more growth." },
    ],
    formCues: [
      "Knees aligned with the machine pivot",
      "Pad just above the heels",
      "Hips stay down",
      "Squeeze at the top",
      "Slow return",
      "Full range",
    ],
    commonMistakes: [
      "Lifting the hips to cheat",
      "Short range",
      "Letting the weight drop",
      "Machine set up incorrectly",
      "Using momentum",
    ],
    programmingNotes:
      "Add 3 sets once or twice a week, after squats or RDLs.",
  }),

  "leg-extension": buildExerciseGuide({
    intro:
      "The leg extension isolates the quadriceps by straightening the knee against a pad. It is particularly good for the rectus femoris, the quad muscle that squats train less. It suits everyone as a finisher, and is often used in rehab with light weights under professional guidance.",
    setup: [
      "Sit with your back against the pad and knees in line with the machine pivot.",
      "Place the ankle pad on the front of your lower shins.",
      "Hold the side handles.",
      "Adjust the starting position so your knees are bent about 90° or slightly more.",
    ],
    steps: [
      "Straighten your legs by lifting the pad.",
      "Squeeze your quads hard at the top.",
      "Pause for 1 second.",
      "Lower slowly to the start.",
      "Keep your hips on the seat throughout.",
    ],
    breathing:
      "Breathe out as you lift and in as you lower. A 1-second pause and 2–3 second lowering make moderate weights very effective.",
    variations: [
      { name: "Single-leg extension", note: "one side at a time." },
      { name: "Reverse Nordic", note: "a bodyweight quad exercise." },
      { name: "Leg press", href: X("leg-press"), note: "a compound quad exercise." },
      { name: "Spanish squat", note: "a band-assisted squat often used for knee-friendly quad work." },
    ],
    dosage: [
      ["Muscle growth", "2–3", "10–15", "60–90 s"],
      ["Finisher", "2", "15–20", "60 s"],
    ],
    progression: `Add reps, then weight. Leaning back slightly stretches the rectus femoris more. ${OVERLOAD_NOTE}`,
    safety:
      "Leg extensions are safe for healthy knees when done with control. If your knees hurt, use lighter weights and higher reps, or a shorter range. Seek professional advice for existing knee injuries.",
    faq: [
      { q: "Are leg extensions bad for your knees?", a: "No — for healthy knees, they are safe with controlled reps. They are commonly used in knee rehabilitation." },
      { q: "Do I need them if I squat?", a: "Not required, but they add quad volume with little fatigue and train a quad muscle that squats work less." },
    ],
    formCues: [
      "Knees in line with the pivot",
      "Pad on the lower shins",
      "Full extension",
      "Pause and squeeze",
      "Slow lowering",
      "Hips on the seat",
    ],
    commonMistakes: [
      "Kicking the weight up",
      "Short reps",
      "Hips lifting off the seat",
      "Dropping the weight",
    ],
    programmingNotes:
      "Add 2–3 sets at the end of a leg session, once or twice a week.",
  }),

  "standing-calf-raise": buildExerciseGuide({
    intro:
      "The standing calf raise lifts your heels against resistance, training the gastrocnemius — the large calf muscle that shows when you walk — with the soleus underneath. Calves respond best to a full range of motion and a pause in the stretch. This exercise suits everyone and can be done with a machine, a step or a single dumbbell.",
    setup: [
      "Stand on the edge of a step or calf-raise platform with the balls of your feet on the edge.",
      "Let your heels hang off.",
      "Use the machine pads on your shoulders, or hold a dumbbell with a hand on a wall for balance.",
      "Keep your knees straight but not locked.",
    ],
    steps: [
      "Lower your heels as far as possible for a deep stretch.",
      "Pause for 1–2 seconds at the bottom.",
      "Rise up onto your toes as high as you can.",
      "Squeeze the calves at the top for a second.",
      "Lower slowly and repeat.",
    ],
    breathing:
      "Breathe normally — out on the way up, in on the way down. The pause at the bottom removes the bounce from your Achilles tendon so the muscle does the work.",
    variations: [
      { name: "Seated calf raise", note: "bent knees target the soleus." },
      { name: "Single-leg calf raise", note: "bodyweight on one leg — very effective at home." },
      { name: "Leg press calf raise", note: "pushing the platform with your toes." },
    ],
    dosage: [
      ["Muscle growth", "3–4", "10–15", "60–90 s"],
      ["Endurance or pump", "2", "20–30", "60 s"],
    ],
    progression: `Add reps and pause length before weight. Single-leg bodyweight raises with a dumbbell can be as hard as most machines. ${OVERLOAD_NOTE}`,
    safety:
      "Low-risk. Move slowly in the stretch, especially if you have a history of Achilles problems. Stop with sharp pain.",
    faq: [
      { q: "Why won't my calves grow?", a: "Genetics play a role, but most people bounce through short reps. Full range, a pause in the stretch and 10+ hard sets a week usually help." },
      { q: "Should my knees be straight or bent?", a: "Straight (standing) trains the gastrocnemius more; bent (seated) trains the soleus more. Use both." },
    ],
    formCues: [
      "Deep stretch at the bottom",
      "Pause — no bounce",
      "Rise as high as possible",
      "Squeeze at the top",
      "Knees straight but soft",
      "Slow lowering",
    ],
    commonMistakes: [
      "Bouncing at the bottom",
      "Short half reps",
      "Bending the knees to push the weight",
      "Rushing",
    ],
    programmingNotes:
      "Train calves 2–3 times a week with 3–4 sets each time. They recover quickly.",
  }),
};
