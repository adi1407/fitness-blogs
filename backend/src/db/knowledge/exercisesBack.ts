import { buildExerciseGuide, OVERLOAD_NOTE, type ExerciseExpansion } from "./exerciseGuide";

const X = (slug: string) => `/exercises/back/${slug}`;

export const BACK_GUIDES: Record<string, ExerciseExpansion> = {
  "conventional-deadlift": buildExerciseGuide({
    intro:
      "The deadlift lifts a loaded bar from the floor to standing. It trains the glutes, hamstrings and the muscles along the spine, with the lats, upper back and grip working hard to hold the bar close. It builds more total-body pulling strength than almost any other lift. It suits lifters who can already hinge well with a lighter weight — learn the Romanian deadlift or a kettlebell deadlift first if you're new.",
    setup: [
      "Stand with feet about hip width, the bar over the middle of your feet (about 3 cm from your shins).",
      "Bend down and grip the bar just outside your legs with both palms facing you.",
      "Bend your knees until your shins touch the bar, keeping hips higher than knees.",
      "Lift your chest and pull the slack out of the bar so your back is flat and your arms are straight.",
    ],
    steps: [
      "Take a big breath into your stomach and brace hard.",
      "Push the floor away with your legs, keeping the bar touching your legs.",
      "Once the bar passes your knees, drive your hips forward to stand tall.",
      "Finish standing straight with glutes squeezed — don't lean back.",
      "Lower by pushing the hips back first, then bending the knees once the bar passes them.",
    ],
    breathing:
      "Breathe in and brace before each rep, hold your breath through the lift and breathe out at the top or back on the floor. Lift with steady speed; lower under control in 1–2 seconds rather than dropping or slowly grinding down.",
    variations: [
      { name: "Romanian deadlift", href: "/exercises/legs/romanian-deadlift", note: "starts from the top and trains the hinge with less load — the best way to learn the pattern." },
      { name: "Trap-bar deadlift", note: "a more upright position that many beginners find easier on the back." },
      { name: "Sumo deadlift", note: "a wide stance that shortens the range and uses more legs." },
      { name: "Kettlebell deadlift", note: "a light, home-friendly version for learning." },
    ],
    dosage: [
      ["Strength", "2–4", "3–5", "3 min"],
      ["Muscle growth", "2–3", "5–8", "2–3 min"],
      ["Learning the lift", "3", "5 with a light weight", "2 min"],
    ],
    progression: `Beginners can often add 5 kg a week for the first couple of months. When that stalls, add 2.5 kg at a time, and keep most sets 2–3 reps short of failure — grinding ugly reps adds fatigue, not strength. ${OVERLOAD_NOTE}`,
    safety:
      "Keep the bar close and your back flat; if your lower back rounds, the weight is too heavy. Lift on a flat surface with bumper plates if possible, and avoid maxing out without experience. If you have a history of back pain, start with trap-bar or Romanian deadlifts and get coaching on your form.",
    faq: [
      { q: "Are deadlifts bad for your back?", a: "No — done with good form and sensible loads, they strengthen the back. Problems usually come from lifting too heavy too soon, rounding the lower back or jerking the bar off the floor." },
      { q: "Should I use a belt or straps?", a: "Not as a beginner. A belt can help on heavy sets later; straps are useful when grip fails before your back and legs on high-rep sets." },
      { q: "How often should I deadlift?", a: "Once a week is enough for most people because heavy deadlifts are tiring. Add Romanian deadlifts on another day if you want more hinge practice." },
    ],
    formCues: [
      "Bar over mid-foot before you start",
      "Pull the slack out before lifting",
      "Brace like you're about to be punched",
      "Push the floor away",
      "Bar stays in contact with the legs",
      "Stand tall — don't lean back at the top",
    ],
    commonMistakes: [
      "Starting with the bar too far from the shins",
      "Rounding the lower back",
      "Hips shooting up first so it becomes a stiff-leg pull",
      "Jerking the bar off the floor",
      "Leaning back excessively at lockout",
      "Maxing out too often",
    ],
    programmingNotes:
      "Train deadlifts once a week at the start of a lower-body or pull day. 2–4 work sets after a few lighter warm-up sets is plenty. Don't put heavy deadlifts and heavy squats in the same session as a beginner.",
  }),

  "pull-up": buildExerciseGuide({
    intro:
      "The pull-up lifts your whole body to a bar. It trains the lats — the wide muscles that give the back its V-shape — along with the biceps, rear shoulders and mid-back. It is one of the best upper-body exercises you can do with minimal equipment. Beginners usually need assistance or negatives at first, and that is normal.",
    setup: [
      "Grip the bar slightly wider than shoulder width with palms facing away.",
      "Hang with straight arms and your feet off the floor.",
      "Pull your shoulders slightly down away from your ears.",
      "Brace your core and keep your legs together, slightly in front of you.",
    ],
    steps: [
      "Start the pull by driving your elbows down toward your back pockets.",
      "Pull until your chin is above the bar and your chest is close to it.",
      "Keep your body still — no swinging or kicking.",
      "Lower under control to a full hang.",
      "Reset your shoulders before the next rep.",
    ],
    breathing:
      "Breathe out as you pull up and in as you lower. Take 2–3 seconds to lower: the lowering phase builds strength fast, which is why negatives work so well for beginners.",
    variations: [
      { name: "Lat pulldown", href: X("lat-pulldown"), note: "the machine version — use it to build strength toward your first pull-up." },
      { name: "Band-assisted pull-up", note: "a resistance band under the knees or feet takes off some bodyweight." },
      { name: "Negative pull-up", note: "jump to the top and lower yourself in 3–5 seconds." },
      { name: "Chin-up", note: "palms facing you — more biceps and usually easier." },
    ],
    dosage: [
      ["Building to the first pull-up", "3–4", "3–5 negatives or assisted reps", "2 min"],
      ["Muscle growth", "3–4", "6–12", "2 min"],
      ["Weighted strength", "3–5", "3–6", "2–3 min"],
    ],
    progression:
      "Go from negatives or band-assisted reps, to sets of 1–3 bodyweight pull-ups, then add reps each week. Once you can do 3 sets of 10, start adding 2.5–5 kg with a dip belt or a dumbbell between your feet.",
    safety:
      "Avoid kipping or swinging, which strains the shoulders. Lower all the way under control rather than dropping. If your elbows hurt, try a neutral grip (palms facing each other) or reduce volume.",
    faq: [
      { q: "How can I do my first pull-up?", a: "Train 2–3 times a week with negatives, band-assisted pull-ups and lat pulldowns. Losing excess body fat also helps. Most people get their first rep within 4–12 weeks of consistent practice." },
      { q: "Pull-ups or chin-ups for a wider back?", a: "Both train the lats well. Pull-ups use a little more lat and less biceps; chin-ups are slightly easier. Use whichever you can do with better form." },
    ],
    formCues: [
      "Start from a full hang",
      "Pull your elbows down to your pockets",
      "Chest toward the bar",
      "Body still — no swinging",
      "Lower slowly",
      "Shoulders away from your ears",
    ],
    commonMistakes: [
      "Half reps that never reach a full hang",
      "Kicking or swinging to finish reps",
      "Craning the chin over the bar instead of pulling higher",
      "Shrugging the shoulders up at the bottom",
      "Dropping fast instead of lowering",
    ],
    programmingNotes:
      "Use pull-ups as your main vertical pull, 1–2 times a week for 3–4 sets. Pair with a horizontal row so the back gets both pulling directions.",
  }),

  "barbell-row": buildExerciseGuide({
    intro:
      "The barbell bent-over row trains the lats, rhomboids, mid-traps and rear shoulders, with the lower back working to hold the bent-over position. It is one of the most loadable rows and builds back thickness. It suits lifters who can hinge with a flat back; if holding the position is hard, start with chest-supported or seated cable rows.",
    setup: [
      "Stand with feet hip width, bar over mid-foot.",
      "Grip just outside shoulder width, palms facing you.",
      "Hinge at the hips with soft knees until your torso is about 30–45° above horizontal.",
      "Let the bar hang at arm's length below your shoulders, back flat.",
    ],
    steps: [
      "Brace your core and keep your torso angle fixed.",
      "Pull the bar toward your lower ribs or upper stomach.",
      "Drive your elbows back and squeeze your shoulder blades together.",
      "Pause briefly when the bar touches or nearly touches your body.",
      "Lower the bar to straight arms without letting your back round.",
    ],
    breathing:
      "Breathe in and brace before the pull, breathe out as the bar reaches your body. Pull fast but controlled and lower over 1–2 seconds. If you have to jerk the bar up with your hips, the weight is too heavy.",
    variations: [
      { name: "Seated cable row", href: X("seated-cable-row"), note: "removes the lower-back demand." },
      { name: "Single-arm dumbbell row", href: X("single-arm-dumbbell-row"), note: "supported, one side at a time." },
      { name: "Pendlay row", note: "each rep starts from the floor with a flatter back — more explosive." },
      { name: "Chest-supported row", note: "lying face down on an incline bench removes all body English." },
    ],
    dosage: [
      ["Strength", "3–4", "5–8", "2–3 min"],
      ["Muscle growth", "3–4", "8–12", "2 min"],
    ],
    progression: `Add reps within your range, then 2.5 kg. Keep the torso angle the same as the weight goes up — standing more upright is a hidden way of cheating. ${OVERLOAD_NOTE}`,
    safety:
      "The lower back works hard to hold the position. Keep it flat, and switch to a supported row if your lower back fatigues before your upper back. Avoid this exercise on days with heavy deadlifts if your back feels tired.",
    faq: [
      { q: "Underhand or overhand grip?", a: "Overhand is standard and puts slightly more work on the upper back. Underhand lets you lift a little more and uses more biceps. Both work." },
      { q: "How bent over should I be?", a: "About 30–45° above horizontal for most people. More upright lets you lift more but turns it partly into a shrug." },
    ],
    formCues: [
      "Flat back, hinge from the hips",
      "Pull to the lower ribs",
      "Elbows back, not out",
      "Squeeze the shoulder blades",
      "Keep the torso angle fixed",
      "Lower with control",
    ],
    commonMistakes: [
      "Standing up more with each rep",
      "Using the hips to swing the weight",
      "Rounding the lower back",
      "Pulling to the chest with flared elbows",
      "Short, jerky reps",
    ],
    programmingNotes:
      "Use it as the main horizontal pull, 1–2 times a week. Pair with a vertical pull (pull-ups or pulldowns) for a complete back session.",
  }),

  "seated-cable-row": buildExerciseGuide({
    intro:
      "The seated cable row trains the lats, mid-back and rear shoulders while you sit with your chest up. The pad and cable remove most of the lower-back load, so it is a great row for beginners and for extra back volume. A close neutral handle (V-handle) is the most common choice.",
    setup: [
      "Attach a V-handle and sit on the bench with feet on the platform, knees slightly bent.",
      "Reach forward and grab the handle, then sit up tall.",
      "Start with arms straight and a slight forward reach so you feel the back stretch.",
      "Keep your chest up and shoulders relaxed.",
    ],
    steps: [
      "Pull the handle toward your stomach, driving the elbows back close to your body.",
      "Finish with your torso upright — don't lean far back.",
      "Squeeze your shoulder blades together for a moment.",
      "Let the handle travel forward slowly until your arms are straight.",
      "Allow your shoulders to reach forward slightly at the stretch, then repeat.",
    ],
    breathing:
      "Breathe out as you pull and in as you return. A 1-second squeeze and a 2–3 second return make this exercise far more effective than fast, swinging reps.",
    variations: [
      { name: "Barbell bent-over row", href: X("barbell-row"), note: "a heavier free-weight version." },
      { name: "Wide-grip cable row", note: "a wider bar pulled to the chest — more upper back." },
      { name: "Single-arm cable row", note: "one side at a time with a bit of rotation." },
      { name: "Single-arm dumbbell row", href: X("single-arm-dumbbell-row"), note: "the free-weight unilateral option." },
    ],
    dosage: [
      ["Beginner", "3", "10–12", "90 s"],
      ["Muscle growth", "3–4", "8–15", "90 s–2 min"],
    ],
    progression: `Add reps, then one plate. Keep your torso still as you add weight; leaning back further each rep is a sign the weight is too heavy. ${OVERLOAD_NOTE}`,
    safety:
      "Low-risk. Keep a slight bend in the knees and your back neutral. Don't round your lower back to reach forward — the stretch should come from the shoulder blades, not the spine.",
    faq: [
      { q: "Which handle is best?", a: "The V-handle is easiest to learn. A wide bar works more of the upper back and rear shoulders. Rotate between them if you like." },
      { q: "Should I lean back?", a: "Only slightly. Sit tall and finish upright. A big lean back turns it into a body swing." },
    ],
    formCues: [
      "Sit tall, chest up",
      "Elbows drive back past the body",
      "Squeeze the shoulder blades",
      "Slow return",
      "Reach forward with the shoulders, not the spine",
      "Feet pressed into the platform",
    ],
    commonMistakes: [
      "Rocking the torso back and forth",
      "Shrugging the shoulders up",
      "Cutting the stretch short",
      "Rounding the lower back at the front",
      "Letting the weight snap forward",
    ],
    programmingNotes:
      "Use it as the main row for beginners or as a second row after barbell or dumbbell rows. 3–4 sets, 1–2 times a week.",
  }),

  "lat-pulldown": buildExerciseGuide({
    intro:
      "The lat pulldown trains the lats, biceps and rear shoulders by pulling a bar down to your upper chest. It mimics the pull-up with adjustable weight, which makes it ideal for beginners building toward pull-ups and for extra back volume for everyone.",
    setup: [
      "Adjust the thigh pad so your legs are locked under it.",
      "Grip the bar slightly wider than shoulder width, palms facing away.",
      "Sit down with arms straight overhead.",
      "Lean back slightly (about 10–15°) with your chest up.",
    ],
    steps: [
      "Pull your shoulders down first, then drive your elbows down and back.",
      "Bring the bar to your upper chest.",
      "Squeeze your lats briefly at the bottom.",
      "Let the bar rise slowly until your arms are fully straight.",
      "Feel the stretch at the top before the next rep.",
    ],
    breathing:
      "Breathe out as you pull and in as the bar rises. Use a 2–3 second return; the stretch at the top is valuable for lat growth.",
    variations: [
      { name: "Pull-up", href: X("pull-up"), note: "the bodyweight version and the long-term goal." },
      { name: "Close-grip or neutral-grip pulldown", note: "often more comfortable for the shoulders and elbows." },
      { name: "Single-arm cable pulldown", note: "a longer range and great mind-muscle connection." },
      { name: "Straight-arm pulldown", note: "isolates the lats with no biceps involvement." },
    ],
    dosage: [
      ["Beginner", "3", "10–12", "90 s"],
      ["Muscle growth", "3–4", "8–15", "90 s–2 min"],
    ],
    progression: `Add reps until the top of your range, then add a plate. If you can pulldown about your bodyweight for 8 reps, you are usually close to a strict pull-up. ${OVERLOAD_NOTE}`,
    safety:
      "Always pull to the front, not behind the neck — behind-the-neck pulldowns strain the shoulders for no extra benefit. Control the bar on the way up.",
    faq: [
      { q: "Is the lat pulldown as good as pull-ups?", a: "For building the back, yes — similar muscles do similar work. Pull-ups add more core and body control; pulldowns make it easy to adjust the weight." },
      { q: "Wide or close grip?", a: "Both train the lats. Use slightly wider than shoulder width as default; go closer if wide grips hurt your shoulders." },
    ],
    formCues: [
      "Thighs locked under the pad",
      "Shoulders down first",
      "Elbows drive down to your sides",
      "Bar to the upper chest",
      "Slow return to a full stretch",
      "Chest up, small lean back",
    ],
    commonMistakes: [
      "Leaning far back and rowing the weight down",
      "Pulling behind the neck",
      "Letting the bar fly up",
      "Using momentum from the torso",
      "Pulling with the hands instead of the elbows",
    ],
    programmingNotes:
      "Use it as the main vertical pull until you can do 8+ pull-ups, then as extra volume. 3–4 sets, 1–2 times a week, paired with a row.",
  }),

  "single-arm-dumbbell-row": buildExerciseGuide({
    intro:
      "The single-arm dumbbell row trains the lats, mid-back and rear shoulders one side at a time, with a bench supporting your body. The support takes stress off the lower back, and working one arm at a time fixes left-right imbalances. It suits every level and needs only a dumbbell and a bench.",
    setup: [
      "Place one knee and the same-side hand on a flat bench.",
      "Put the other foot on the floor, a little out to the side.",
      "Hold the dumbbell in the free hand with your arm hanging straight below your shoulder.",
      "Keep your back flat and roughly parallel to the floor.",
    ],
    steps: [
      "Pull the dumbbell toward your hip, not your chest.",
      "Keep your elbow close to your body as it travels back.",
      "Squeeze at the top without twisting your torso.",
      "Lower slowly until your arm is straight and you feel a stretch.",
      "Finish all reps on one side, then switch.",
    ],
    breathing:
      "Breathe out as you pull and in as you lower. Pull in about 1 second, pause, and lower in 2 seconds.",
    variations: [
      { name: "Seated cable row", href: X("seated-cable-row"), note: "two arms on a cable." },
      { name: "Chest-supported dumbbell row", note: "both arms, lying face down on an incline bench." },
      { name: "Kroc row", note: "heavier, higher-rep rows with a little body movement — advanced." },
      { name: "Barbell bent-over row", href: X("barbell-row"), note: "the two-arm barbell version." },
    ],
    dosage: [
      ["Strength", "3–4", "6–8 each side", "2 min"],
      ["Muscle growth", "3–4", "8–15 each side", "90 s"],
    ],
    progression: `Add reps until the top of your range on both sides, then move up a dumbbell. Start each set with your weaker side and match reps on the stronger side. ${OVERLOAD_NOTE}`,
    safety:
      "Keep your back flat and avoid twisting to heave the weight. If your grip fails first on heavy sets, use lifting straps.",
    faq: [
      { q: "Should I pull to my chest or my hip?", a: "Toward your hip. That path keeps the elbow close and puts more work on the lats." },
      { q: "Can I do it without a bench?", a: "Yes — brace one hand on a chair, sofa arm or your knee in a staggered stance." },
    ],
    formCues: [
      "Flat back supported on the bench",
      "Pull to your hip",
      "Elbow close to the body",
      "No torso twisting",
      "Full stretch at the bottom",
      "Weaker side first",
    ],
    commonMistakes: [
      "Rotating the torso to heave the weight",
      "Pulling straight up to the chest with a flared elbow",
      "Short reps that skip the stretch",
      "Rounding the back",
      "Shrugging the shoulder up",
    ],
    programmingNotes:
      "A great row for home and gym. Use 3–4 sets once or twice a week, either as the main row or after pulldowns.",
  }),

  "face-pull": buildExerciseGuide({
    intro:
      "The face pull trains the rear shoulders, the small rotator-cuff muscles that rotate the arm outward, and the mid-back. These muscles are often undertrained compared with the chest and front shoulders. Face pulls help balance pressing work and support healthy shoulders, making them useful for everyone.",
    setup: [
      "Attach a rope to a cable set at upper-chest or face height.",
      "Grip the rope ends with palms facing down or toward each other.",
      "Step back until your arms are straight and there is tension on the cable.",
      "Stand tall with a slight bend in the knees.",
    ],
    steps: [
      "Pull the rope toward your face, splitting the ends apart.",
      "Drive your elbows out and back, keeping them at shoulder height.",
      "Finish with your hands beside your ears, as if flexing in a double-biceps pose.",
      "Pause for a second.",
      "Return slowly to straight arms.",
    ],
    breathing:
      "Breathe out as you pull and in as you return. Use light weight, a 1-second hold at the end and a 2-second return.",
    variations: [
      { name: "Rear delt fly", href: "/exercises/shoulders/rear-delt-fly", note: "dumbbells or machine for the rear shoulders." },
      { name: "Band pull-apart", note: "a home version with a resistance band." },
      { name: "High cable row with rope", note: "heavier, more upper-back focused." },
    ],
    dosage: [
      ["Shoulder health", "2–3", "15–20", "60 s"],
      ["Muscle growth", "3", "12–20", "60–90 s"],
    ],
    progression:
      "Progress slowly with reps and pauses rather than weight. If you have to lean back to complete reps, the weight is too heavy.",
    safety:
      "Very low-risk. Keep the weight light enough to finish in the externally rotated position (hands by ears). Stop if you feel pinching in the shoulder.",
    faq: [
      { q: "Do face pulls fix rounded shoulders?", a: "Posture depends on many things, but strengthening the rear shoulders and upper back helps balance a lot of pressing work and may make an upright posture easier to hold." },
      { q: "How often should I do face pulls?", a: "2–3 times a week works well because they are light and recover quickly. Add them at the end of push or pull days." },
    ],
    formCues: [
      "Rope at face height",
      "Split the rope apart",
      "Elbows high and wide",
      "Hands finish beside your ears",
      "Pause at the end",
      "Light weight, slow return",
    ],
    commonMistakes: [
      "Using too much weight and leaning back",
      "Elbows dropping so it becomes a row",
      "Not rotating the hands back at the end",
      "Shrugging the shoulders up",
      "Rushing the reps",
    ],
    programmingNotes:
      "Add 2–3 sets at the end of 2–3 sessions a week. A simple rule: do a set of face pulls or rear delt work for every 2 sets of pressing.",
  }),
};
