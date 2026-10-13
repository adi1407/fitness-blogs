import { buildExerciseGuide, OVERLOAD_NOTE, TRAINING_LINK, type ExerciseExpansion } from "./exerciseGuide";

const X = (slug: string) => `/exercises/chest/${slug}`;

export const CHEST_GUIDES: Record<string, ExerciseExpansion> = {
  "barbell-bench-press": buildExerciseGuide({
    intro:
      "The bench press trains the chest (pectoralis major), the front of the shoulders and the triceps in one movement. It is the most loadable horizontal press, which makes it the standard test of upper-body pushing strength. It suits anyone who can already do 10 clean push-ups and has access to a rack or a spotter. Beginners can start with the empty 20 kg bar.",
    setup: [
      "Lie on the bench with your eyes directly under the bar and feet flat on the floor.",
      "Grip the bar slightly wider than shoulder width so your forearms are vertical at the bottom.",
      "Pull your shoulder blades back and down into the bench and keep a small arch in the upper back.",
      "Unrack with straight arms and bring the bar over your shoulders before the first rep.",
    ],
    steps: [
      "Take a breath and brace your stomach.",
      "Lower the bar under control to the lower chest, around nipple height, with elbows about 45° from your body.",
      "Touch the chest lightly — no bounce.",
      "Press up and slightly back so the bar finishes over your shoulders.",
      "Lock out without letting your shoulder blades lift off the bench, then start the next rep.",
    ],
    breathing:
      "Breathe in at the top, hold it while you lower and press, and breathe out at lockout. Lower the bar in about 2 seconds and press with intent. A controlled descent protects the shoulders and builds more muscle than dropping the bar onto your chest.",
    variations: [
      { name: "Incline dumbbell press", href: X("incline-dumbbell-press"), note: "more upper chest and a freer shoulder path." },
      { name: "Push-ups", href: X("push-ups"), note: "the bodyweight regression and a good warm-up." },
      { name: "Machine chest press", href: X("machine-chest-press"), note: "a fixed path for beginners or high-rep work." },
      { name: "Close-grip bench press", href: "/exercises/arms/close-grip-bench-press", note: "a narrower grip that shifts work to the triceps." },
    ],
    dosage: [
      ["Strength", "3–5", "3–6", "2–3 min"],
      ["Muscle growth", "3–4", "6–10", "2 min"],
      ["Beginner technique", "3", "8–10 with an easy weight", "90 s"],
    ],
    progression: `Use double progression: pick a rep range such as 6–10, add reps each session until you hit the top of the range on all sets, then add 2.5 kg and start again at the bottom. Small plates (1.25 kg each side) help a lot once progress slows. ${OVERLOAD_NOTE}`,
    safety:
      "Bench inside a rack with safety pins set just below chest height, or use a spotter for heavy sets. Never use a thumbless grip. If the front of your shoulder hurts, narrow your grip slightly, tuck the elbows more and switch to dumbbells for a few weeks.",
    faq: [
      { q: "How much should I bench as a beginner?", a: "There is no required number. Start with a weight you can lift for 10 smooth reps — often the empty 20 kg bar — and add weight steadily. Most beginners can add weight every week or two for several months." },
      { q: "Should my feet be on the bench?", a: "No. Feet on the floor give you a stable base and let you drive through the legs. If your feet do not reach, place plates or a step under them." },
      { q: "Flat or incline bench for chest size?", a: "Both work. Flat bench trains the whole chest with the most load; incline adds more upper-chest work. Most programs use one as the main press and the other as a second exercise." },
    ],
    formCues: [
      "Eyes under the bar before you unrack",
      "Shoulder blades pinned back and down for the whole set",
      "Elbows about 45° from your sides, not flared to 90°",
      "Bar to the lower chest, then press back over the shoulders",
      "Feet planted and pushing lightly into the floor",
      "Wrists stacked over elbows at the bottom",
    ],
    commonMistakes: [
      "Flaring the elbows wide, which loads the front of the shoulder",
      "Bouncing the bar off the chest",
      "Lifting the hips off the bench to finish a rep",
      "Lowering the bar to the neck or upper chest",
      "Benching heavy without safeties or a spotter",
      "Letting the shoulder blades roll forward at lockout",
    ],
    programmingNotes:
      "Do it first in a push or full-body session, 1–2 times a week. Pair with a row or pulldown so pulling volume matches pressing volume. Leave 1–2 reps in reserve on most sets, and deload by cutting sets in half every 6–8 weeks or when shoulders feel beaten up.",
  }),

  "incline-dumbbell-press": buildExerciseGuide({
    intro:
      "The incline dumbbell press shifts more of the work to the upper (clavicular) chest and the front shoulders. Because each arm works on its own, it exposes and fixes left-right strength differences. It suits beginners and experienced lifters alike, and is often more comfortable for the shoulders than a barbell because your hands can move into a natural path.",
    setup: [
      "Set the bench to 30–45°; around 30° keeps the focus on the chest.",
      "Sit with the dumbbells standing on your thighs.",
      "Lie back and kick the dumbbells up one at a time using your knees.",
      "Start with the dumbbells over your shoulders, palms facing forward or slightly inward.",
    ],
    steps: [
      "Pull your shoulder blades back into the bench and brace.",
      "Lower the dumbbells out and down until your elbows are about level with the bench or you feel a good chest stretch.",
      "Keep forearms vertical and elbows about 45° from your body.",
      "Press up and slightly inward so the dumbbells finish over your upper chest.",
      "Stop just short of the dumbbells touching, then repeat.",
    ],
    breathing:
      "Breathe in as you lower, breathe out as you press through the hardest part. Take about 2–3 seconds on the way down; the stretch at the bottom is where much of the muscle-building stimulus comes from.",
    variations: [
      { name: "Barbell bench press", href: X("barbell-bench-press"), note: "the flat, heavier main press." },
      { name: "Low-incline machine press", note: "a fixed path if dumbbells feel unstable." },
      { name: "Cable chest fly", href: X("cable-chest-fly"), note: "set cables low and fly upwards for an upper-chest finisher." },
      { name: "Incline push-ups", href: X("push-ups"), note: "hands on a bench; the home version." },
    ],
    dosage: [
      ["Strength", "3–4", "6–8", "2 min"],
      ["Muscle growth", "3–4", "8–12", "90 s–2 min"],
      ["Second press after bench", "2–3", "10–12", "90 s"],
    ],
    progression: `Most gyms jump 2–2.5 kg per dumbbell, which is a big relative increase. Stay at one weight until you reach the top of your rep range on every set, then move up and accept fewer reps. ${OVERLOAD_NOTE}`,
    safety:
      "Getting heavy dumbbells into position is the riskiest part — use the knee kick-up and ask for a hand-off if needed. To finish a set, bring the dumbbells to your chest and sit up using your knees, rather than dropping them out to the sides.",
    faq: [
      { q: "What angle is best for the upper chest?", a: "About 30° works for most people. Above 45°, the front shoulders do more of the work and the chest less." },
      { q: "Is it better than incline barbell?", a: "Neither is better for growth. Dumbbells allow a deeper stretch and a more natural path; the barbell lets you load more. Use whichever feels better on your shoulders." },
    ],
    formCues: [
      "Bench at about 30°, not steeper than 45°",
      "Ribs down, small upper-back arch",
      "Forearms vertical under the dumbbells",
      "Lower into a comfortable stretch",
      "Press up and slightly in",
      "Soft lockout — don't clash the dumbbells",
    ],
    commonMistakes: [
      "Setting the bench too steep so it becomes a shoulder press",
      "Banging the dumbbells together at the top",
      "Cutting the range short with too much weight",
      "Shrugging the shoulders up toward the ears",
      "Dropping the dumbbells sideways at the end of a set",
    ],
    programmingNotes:
      "Use it as the main press on an upper-chest day or as the second press after flat bench. 6–10 hard sets of chest work per week across all presses and flies is a solid starting point for growth.",
  }),

  "push-ups": buildExerciseGuide({
    intro:
      "Push-ups train the chest, triceps and front shoulders while the core works to keep your body straight. They need no equipment, scale from complete beginner to advanced, and build real muscle when you progress them. They are ideal for home training, warm-ups and high-rep finishers.",
    setup: [
      "Place your hands slightly wider than shoulder width, directly under or just outside your shoulders.",
      "Step your feet back so your body forms a straight line from head to heels.",
      "Squeeze your glutes and brace your stomach as if about to be poked.",
      "Spread your fingers and grip the floor lightly.",
    ],
    steps: [
      "Lower your chest toward the floor with elbows about 45° from your body.",
      "Keep your head in line with your spine — look at the floor just ahead of your hands.",
      "Go down until your chest is a fist's height from the floor or touches it lightly.",
      "Push the floor away until your arms are straight.",
      "At the top, push slightly further so your shoulder blades spread apart, then repeat.",
    ],
    breathing:
      "Breathe in on the way down and out as you push up. Use about 2 seconds down and 1 second up. Pausing for a second at the bottom makes each rep harder without any equipment.",
    variations: [
      { name: "Incline push-ups", note: "hands on a bench or wall — the easiest regression for beginners." },
      { name: "Knee push-ups", note: "reduce the load while keeping the same pattern." },
      { name: "Decline push-ups", note: "feet on a bench for more upper-chest and shoulder work." },
      { name: "Chest dips", href: X("chest-dips"), note: "the next step up in bodyweight pressing." },
    ],
    dosage: [
      ["Beginner (incline or knee)", "3", "8–12", "60–90 s"],
      ["Muscle growth", "3–4", "10–20, 1–2 reps short of failure", "90 s"],
      ["Endurance or finisher", "2–3", "As many good reps as possible", "60 s"],
    ],
    progression:
      "Progress in this order: incline push-ups at a lower height, full push-ups, tempo or paused push-ups, decline push-ups, then add weight with a backpack holding books or a plate. Once you can do 20+ clean reps, extra reps add more endurance than muscle — make the push-up harder instead.",
    safety:
      "Push-ups are low-risk. If your wrists hurt, use push-up handles or dumbbells to keep the wrists straight, or do them on your fists on a soft surface. Stop if you feel sharp shoulder pain.",
    faq: [
      { q: "Can push-ups build a big chest?", a: "Yes, if you keep progressing them. Weighted and decline push-ups taken close to failure can build chest muscle comparably to bench pressing with similar effort." },
      { q: "How many push-ups a day should I do?", a: "Focus on weekly hard sets rather than a daily number. Around 3–4 sets close to failure, 2–3 times a week, works better than hundreds of easy daily reps." },
    ],
    formCues: [
      "Straight line from head to heels",
      "Glutes and stomach braced",
      "Elbows about 45°, not flared",
      "Chest — not the chin — leads toward the floor",
      "Full lockout at the top",
      "Control the bottom position",
    ],
    commonMistakes: [
      "Hips sagging toward the floor",
      "Piking the hips up to make it easier",
      "Half reps that stop well above the floor",
      "Poking the head forward",
      "Flaring the elbows straight out",
      "Doing endless easy reps instead of harder variations",
    ],
    programmingNotes:
      "At home, use push-ups as your main press: 3–4 sets 2–3 times a week, progressing the variation every few weeks. In the gym, use them as a warm-up before benching or as a finisher after presses.",
  }),

  "cable-chest-fly": buildExerciseGuide({
    intro:
      "The cable fly isolates the chest through a wide hugging motion. Cables keep tension on the muscle at both the stretch and the squeeze, where dumbbell flies go slack. It suits all levels as a second or third chest exercise and is easy on the joints because loads stay moderate.",
    setup: [
      "Set both pulleys around shoulder height (or high for lower chest, low for upper chest).",
      "Grab a handle in each hand and take one step forward into a split stance.",
      "Lean forward slightly from the hips with a neutral spine.",
      "Start with arms out to the sides, elbows slightly bent, feeling a light chest stretch.",
    ],
    steps: [
      "Keep the elbow bend fixed throughout the rep.",
      "Bring your hands together in a wide arc in front of your chest, as if hugging a large tree.",
      "Squeeze your chest for a moment when the hands meet.",
      "Open the arms slowly back to the stretch position.",
      "Stop when you feel a good stretch — not when your shoulders roll forward.",
    ],
    breathing:
      "Breathe out as you bring the handles together and in as you open up. Use a slow 2–3 second return; the controlled stretch is the main benefit of the exercise.",
    variations: [
      { name: "Dumbbell fly", href: X("dumbbell-fly"), note: "the free-weight version, with most tension at the bottom." },
      { name: "Low-to-high cable fly", note: "pulleys low, hands rise to chin height for the upper chest." },
      { name: "Pec deck machine", note: "a fixed path that is easy to learn." },
      { name: "Machine chest press", href: X("machine-chest-press"), note: "if you want a press instead of a fly." },
    ],
    dosage: [
      ["Muscle growth", "2–4", "10–15", "60–90 s"],
      ["Finisher", "2", "15–20", "60 s"],
    ],
    progression: `Weight stacks often jump in big steps. Add reps first, then move up one plate and work back up the rep range. Pausing for a second at the squeeze also makes the same weight harder. ${OVERLOAD_NOTE}`,
    safety:
      "Keep loads moderate and the elbow bend fixed. If you feel a pinch in the front of the shoulder at the stretch, shorten the range slightly. Stand stable so the cables cannot pull you backwards.",
    faq: [
      { q: "Do cable flies build the inner chest?", a: "You cannot isolate the inner chest, but flies train the whole chest through a full range and give a strong squeeze, which many people like for chest development." },
      { q: "Cables or dumbbells for flies?", a: "Cables keep tension through the whole movement and are easier to control. Dumbbells load the stretch more. Both work; cables are usually friendlier on the shoulders." },
    ],
    formCues: [
      "Fixed, soft elbow bend",
      "Hug a big tree",
      "Chest up, slight forward lean",
      "Squeeze for a second when hands meet",
      "Slow return to the stretch",
      "Split stance for balance",
    ],
    commonMistakes: [
      "Bending and straightening the elbows so it becomes a press",
      "Using too much weight and swinging the torso",
      "Letting the shoulders roll forward at the stretch",
      "Shrugging the traps up",
      "Rushing the return",
    ],
    programmingNotes:
      "Do it after your main presses, 1–2 times a week. 2–4 sets in the 10–15 range taken close to failure is enough. Change pulley height between sessions to vary the angle.",
  }),

  "chest-dips": buildExerciseGuide({
    intro:
      "Dips train the lower chest, triceps and front shoulders with your full bodyweight. Leaning forward puts more work on the chest; staying upright shifts it to the triceps. They are an advanced exercise: build up to 15+ good push-ups first, and skip them if deep shoulder positions are painful for you.",
    setup: [
      "Use parallel bars about shoulder width apart; check the station is stable.",
      "Jump or step up to support yourself with straight arms.",
      "Pull your shoulders down away from your ears.",
      "Bend your knees and cross your ankles, then lean your torso slightly forward.",
    ],
    steps: [
      "Lower yourself by bending the elbows, keeping the slight forward lean.",
      "Let the elbows travel back and slightly out.",
      "Stop when your upper arms are about parallel to the floor, or earlier if your shoulders feel strained.",
      "Press back up to straight arms without swinging your legs.",
      "Keep the shoulders down throughout.",
    ],
    breathing:
      "Breathe in on the way down and out as you press up. Lower in 2–3 seconds; dropping fast into the bottom is the main cause of dip-related shoulder pain.",
    variations: [
      { name: "Assisted dips", note: "use a dip machine or a band to reduce the load." },
      { name: "Bench dips", note: "an easier triceps-focused option; keep the range short." },
      { name: "Push-ups", href: X("push-ups"), note: "the prerequisite and a safe alternative." },
      { name: "Weighted dips", note: "add a dip belt only after 3 sets of 12 clean reps." },
    ],
    dosage: [
      ["Building up (assisted)", "3", "6–10", "2 min"],
      ["Muscle growth", "3–4", "6–12", "2 min"],
      ["Weighted strength", "3–4", "5–8", "2–3 min"],
    ],
    progression:
      "Start with assisted dips, then bodyweight sets of 5–6, building to 3 sets of 12. After that, add 2.5–5 kg on a dip belt or a dumbbell held between your feet. Increase depth only as far as your shoulders tolerate.",
    safety:
      "Dips place the shoulder in a deep, loaded position. Do not go below parallel if it causes pain, avoid bouncing, and stop immediately with sharp pain in the front of the shoulder. People with past shoulder injuries should use push-ups or machine presses instead.",
    faq: [
      { q: "Are dips bad for your shoulders?", a: "Not for most people with controlled depth. Problems usually come from going too deep, bouncing or dipping on unstable bars. If they hurt even with good form, choose a different press." },
      { q: "How do I make dips more chest-focused?", a: "Lean your torso forward, let the elbows flare slightly and use bars a bit wider than shoulder width." },
    ],
    formCues: [
      "Shoulders down before you descend",
      "Slight forward lean for chest focus",
      "Control the lowering",
      "Stop around parallel",
      "No leg kicking",
      "Full lockout at the top",
    ],
    commonMistakes: [
      "Going too deep and straining the front of the shoulder",
      "Kicking the legs to finish reps",
      "Shrugging up toward the ears at the bottom",
      "Using wobbly bars",
      "Adding weight before bodyweight reps are clean",
    ],
    programmingNotes:
      "Use dips as the second press in a push session, or the main press for home training with a dip station. 2–4 sets once or twice a week is plenty alongside other pressing.",
  }),

  "machine-chest-press": buildExerciseGuide({
    intro:
      "The machine chest press trains the chest, triceps and front shoulders on a fixed path. Because you don't need to balance anything, you can focus on effort and push close to failure safely. It suits beginners learning to press, lifters training around a sore shoulder, and anyone wanting extra chest work without a spotter.",
    setup: [
      "Adjust the seat so the handles line up with your mid-chest.",
      "Sit with your back flat against the pad and feet on the floor.",
      "Grip the handles with wrists straight.",
      "If there is a foot lever, use it to bring the handles forward before starting.",
    ],
    steps: [
      "Pull your shoulder blades back against the pad.",
      "Press the handles forward until your arms are straight but not locked hard.",
      "Keep your shoulders down — don't let them roll forward.",
      "Return slowly until you feel a light stretch across the chest.",
      "Stop just before the weight stack touches, then press again.",
    ],
    breathing:
      "Breathe out as you press and in as you return. Take 2–3 seconds on the return. A brief pause at the stretch makes a light machine much harder.",
    variations: [
      { name: "Barbell bench press", href: X("barbell-bench-press"), note: "the free-weight progression." },
      { name: "Incline machine press", note: "same idea with more upper-chest work." },
      { name: "Single-arm machine press", note: "one side at a time to fix imbalances." },
      { name: "Push-ups", href: X("push-ups"), note: "the home alternative." },
    ],
    dosage: [
      ["Beginner", "3", "10–12", "90 s"],
      ["Muscle growth", "3–4", "8–15", "90 s–2 min"],
      ["Finisher or drop set", "1–2", "12–20", "60 s"],
    ],
    progression: `Add reps until you hit the top of the range on all sets, then move up one plate. Machines are well suited to drop sets: finish a set, drop the weight by about 20–30% and continue to near failure. ${OVERLOAD_NOTE}`,
    safety:
      "One of the safest presses. Set the seat height correctly — too low or too high strains the shoulders. Let the weight down under control rather than letting the stack slam.",
    faq: [
      { q: "Is the machine press as good as the bench press?", a: "For building chest muscle, studies show machines and free weights produce similar growth when effort is similar. The bench press builds more barbell-specific strength." },
      { q: "Can beginners start with machines?", a: "Yes. Machines are a good way to learn the pressing motion and build strength before moving to the barbell." },
    ],
    formCues: [
      "Handles at mid-chest height",
      "Back flat against the pad",
      "Shoulder blades back",
      "Press to straight arms without shrugging",
      "Controlled return",
      "Don't let the stack touch between reps",
    ],
    commonMistakes: [
      "Seat set at the wrong height",
      "Slamming the stack every rep",
      "Cutting the range short to lift more",
      "Rolling the shoulders forward at the end",
      "Arching off the back pad",
    ],
    programmingNotes:
      "Use as the main press for beginners for the first 2–3 months, or as a second press after bench or dumbbells. 3–4 sets close to failure, 1–2 times a week.",
  }),

  "dumbbell-fly": buildExerciseGuide({
    intro:
      "The dumbbell fly isolates the chest with a wide arc that gives a deep stretch at the bottom. It works best as an accessory after your presses, with moderate weights you can control. It suits intermediate lifters; beginners usually get more from presses and cable flies first.",
    setup: [
      "Lie on a flat or slightly inclined bench with a dumbbell in each hand.",
      "Press the dumbbells up over your chest, palms facing each other.",
      "Bend your elbows slightly and keep that bend fixed.",
      "Plant your feet and pull your shoulder blades back.",
    ],
    steps: [
      "Open your arms in a wide arc, lowering the dumbbells out to the sides.",
      "Stop when your upper arms are about level with the bench and you feel a strong stretch.",
      "Hug the dumbbells back up in the same arc.",
      "Bring them together over your mid-chest, not over your face.",
      "Pause briefly and repeat.",
    ],
    breathing:
      "Breathe in as you open and out as you bring the dumbbells together. Lower over about 3 seconds — control at the bottom is the whole point of the exercise.",
    variations: [
      { name: "Cable chest fly", href: X("cable-chest-fly"), note: "constant tension and easier on the shoulders." },
      { name: "Incline dumbbell fly", note: "bench at 30° for more upper chest." },
      { name: "Pec deck", note: "a fixed path for beginners." },
      { name: "Incline dumbbell press", href: X("incline-dumbbell-press"), note: "a press that also gives a deep stretch." },
    ],
    dosage: [
      ["Muscle growth", "2–3", "10–15", "60–90 s"],
      ["Light pump work", "2", "15–20", "60 s"],
    ],
    progression:
      "Progress slowly with reps and control rather than weight. Only increase the dumbbells once you can do 15 controlled reps with a full stretch on every set. Flies should never be a max-weight exercise.",
    safety:
      "Heavy flies with an uncontrolled stretch strain the shoulder and chest tendon. Keep weights moderate, stop at a comfortable stretch and never let the elbows drop far below the bench.",
    faq: [
      { q: "Are dumbbell flies necessary?", a: "No. Presses can build a full chest on their own. Flies are a useful extra for more chest work with less load on the triceps and joints." },
      { q: "Why do I feel flies in my shoulders?", a: "Usually the weight is too heavy, the range too deep or the shoulder blades are not pulled back. Lighten the load and shorten the range." },
    ],
    formCues: [
      "Fixed, soft elbow bend",
      "Wide arc out and back",
      "Stretch, don't strain",
      "Dumbbells meet over mid-chest",
      "Shoulder blades pulled back",
      "Slow lowering",
    ],
    commonMistakes: [
      "Bending the elbows more each rep so it becomes a press",
      "Going too deep with heavy weights",
      "Using momentum from the hips",
      "Clashing the dumbbells at the top",
      "Treating it as a strength lift",
    ],
    programmingNotes:
      "Do it last in a chest session, 2–3 sets once or twice a week. If you already do cable flies, you don't need both in the same workout.",
  }),
};
