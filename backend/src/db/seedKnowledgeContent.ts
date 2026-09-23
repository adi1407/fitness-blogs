import { pool } from "./pool";
import type { MuscleGroup } from "../constants/knowledgeContent";
import { KNOWLEDGE_HUB_SLUG } from "../constants/knowledgeContent";

type SeedExercise = {
  muscleGroup: MuscleGroup;
  slug: string;
  title: string;
  excerpt: string;
  quickAnswer: string;
  bodyHtml: string;
  formCues: string[];
  commonMistakes: string[];
  programmingNotes: string;
  equipment: string[];
  difficulty: "beginner" | "intermediate" | "advanced";
  primaryMuscles: string[];
  secondaryMuscles: string[];
  sortOrder: number;
};

type SeedRecipe = {
  slug: string;
  title: string;
  excerpt: string;
  quickAnswer: string;
  bodyHtml: string;
  ingredients: string[];
  steps: string[];
  calories: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
  cuisineTags: string[];
  mealType: string;
  sortOrder: number;
};

type SeedPage = {
  section: "programs" | "reviews";
  slug: string;
  title: string;
  excerpt: string;
  bodyHtml: string;
  sortOrder: number;
};

function p(...paras: string[]): string {
  return paras.map((t) => `<p>${t}</p>`).join("");
}

const EXERCISES: SeedExercise[] = [
  // —— Chest (7)
  {
    muscleGroup: "chest",
    slug: "barbell-bench-press",
    title: "Barbell Bench Press",
    excerpt:
      "The classic horizontal press for building pressing strength and mid-chest thickness.",
    quickAnswer:
      "Lie on a flat bench, plant your feet, unrack with locked elbows, lower the bar to mid-chest with control, then press up without bouncing. Elbows about 45° from your torso—not flared to 90°.",
    bodyHtml: p(
      "After 15+ years of coaching, the bench press is still the first horizontal press I teach once someone can own a push-up. It lets you load progressively and gives honest feedback: if the bar path is sloppy, the lift tells you immediately.",
      "Set your eyes roughly under the bar, pull your shoulder blades into the bench, and keep a mild arch through the upper back—not a circus bridge. The goal is a stable shelf for your shoulders, not ego range of motion.",
      "In Indian gyms where benches are worn or bars spin poorly, slow the eccentric. Control beats bouncing every time for long-term shoulder health.",
    ),
    formCues: [
      "Feet planted; drive lightly through the floor as you press",
      "Shoulder blades packed; chest proud",
      "Bar to mid-chest / nipple line, not the neck",
      "Wrists stacked over elbows at the bottom",
    ],
    commonMistakes: [
      "Flaring elbows to 90° and dumping stress into the front delts",
      "Bouncing the bar off the sternum",
      "Losing foot contact and pressing from a floppy base",
      "Over-arching the low back instead of packing the upper back",
    ],
    programmingNotes:
      "2–4 sets of 5–8 for strength, or 8–12 for hypertrophy. Pair with a row on push days. Deload if shoulders ache—swap to dumbbells or a slight incline for a block.",
    equipment: ["barbell", "flat bench"],
    difficulty: "intermediate",
    primaryMuscles: ["pectoralis major"],
    secondaryMuscles: ["anterior deltoid", "triceps"],
    sortOrder: 1,
  },
  {
    muscleGroup: "chest",
    slug: "incline-dumbbell-press",
    title: "Incline Dumbbell Press",
    excerpt:
      "Upper-chest focused press with independent arms—great when one side lags.",
    quickAnswer:
      "Set the bench to ~30–45°. Press dumbbells up and slightly together, lower until elbows are about level with the torso, then drive back up without shrugging.",
    bodyHtml: p(
      "Incline work fills in the 'shelf' under the collarbones that flat pressing alone often misses. I prefer 30–35° for most people; steeper angles turn into more front-delt work than chest.",
      "Dumbbells expose left-right imbalances. If one side always lags, start with that side and match the reps on the strong side—no hero reps.",
    ),
    formCues: [
      "Soft bend in elbows at the top—don't smash the bells together violently",
      "Lower with control until stretch is comfortable, not painful",
      "Keep ribs down; avoid flaring the ribcage to 'cheat' the press",
    ],
    commonMistakes: [
      "Bench set too steep (60°+) so front delts take over",
      "Banging dumbbells together at lockout",
      "Excessive arch and bouncing out of the bottom",
    ],
    programmingNotes:
      "3–4 × 8–12. Excellent second press after flat work, or primary press for upper-chest emphasis blocks.",
    equipment: ["dumbbells", "incline bench"],
    difficulty: "intermediate",
    primaryMuscles: ["upper pectoralis major"],
    secondaryMuscles: ["anterior deltoid", "triceps"],
    sortOrder: 2,
  },
  {
    muscleGroup: "chest",
    slug: "push-ups",
    title: "Push-Ups",
    excerpt:
      "No-equipment chest staple—scale from knee push-ups to deficit and weighted.",
    quickAnswer:
      "Hands under shoulders, body in a straight line from head to heels. Lower chest toward the floor, then press up. Keep the core braced so hips don't sag.",
    bodyHtml: p(
      "If you only have a floor and gravity, push-ups will still build a respectable chest and triceps—especially if you progress them. Elevate hands to make them easier; elevate feet or add a backpack to make them harder.",
      "Quality beats volume. Twenty clean reps teach more than fifty floppy ones.",
    ),
    formCues: [
      "Glutes and abs lightly braced",
      "Elbows ~45°, not pinned to ribs or flared wide",
      "Full lockout without shrugging into the ears",
    ],
    commonMistakes: [
      "Hips sagging or piking",
      "Only moving the head and neck",
      "Rushing reps with no control at the bottom",
    ],
    programmingNotes:
      "3–5 × near-failure with 1–2 reps in reserve. Use as a finisher or home primary press.",
    equipment: ["bodyweight"],
    difficulty: "beginner",
    primaryMuscles: ["pectoralis major"],
    secondaryMuscles: ["triceps", "anterior deltoid", "core"],
    sortOrder: 3,
  },
  {
    muscleGroup: "chest",
    slug: "cable-chest-fly",
    title: "Cable Chest Fly",
    excerpt:
      "Constant-tension fly for the squeeze and stretch without heavy joint loading.",
    quickAnswer:
      "Set cables at mid or high height. With a soft elbow bend, bring handles together in a wide arc until hands meet in front of the chest, then return with control.",
    bodyHtml: p(
      "Flies are not 'isolation magic'—they're a way to load the pecs through a long stretch with less absolute load than pressing. Cables keep tension where dumbbells go slack at the top.",
      "If your shoulders complain on heavy presses, a cable fly block can keep chest stimulus high while you recover.",
    ),
    formCues: [
      "Soft elbows locked in place—don't turn it into a press",
      "Lead with the chest, not the hands yanking forward",
      "Slight forward lean with a stable stance",
    ],
    commonMistakes: [
      "Straight-arm swinging that irritates the shoulders",
      "Using momentum and shrugging traps",
      "Cutting the stretch short every rep",
    ],
    programmingNotes:
      "3 × 10–15 as a finisher. Pair after compound presses.",
    equipment: ["cable machine"],
    difficulty: "beginner",
    primaryMuscles: ["pectoralis major"],
    secondaryMuscles: ["anterior deltoid"],
    sortOrder: 4,
  },
  {
    muscleGroup: "chest",
    slug: "chest-dips",
    title: "Chest Dips",
    excerpt:
      "Bodyweight or weighted dipping with a slight forward lean for chest emphasis.",
    quickAnswer:
      "Support yourself on parallel bars, lean slightly forward, lower until upper arms are roughly parallel to the floor, then press up. Keep shoulders away from the ears.",
    bodyHtml: p(
      "Dips are brutally effective and easy to mess up. A slight forward lean and flared-but-controlled elbows bias chest; upright torso biases triceps. If you feel sharp front-shoulder pain, stop—regress to bench dips or machine dips.",
      "Many commercial gyms in India have wobbly dip stations. Stabilize first; load later.",
    ),
    formCues: [
      "Shoulders down and back before you descend",
      "Control the bottom—no bouncing",
      "Lean forward a touch for chest bias",
    ],
    commonMistakes: [
      "Going too deep and pinching the shoulder",
      "Kipping with the legs to cheat",
      "Shrugging into the neck at the bottom",
    ],
    programmingNotes:
      "3 × 6–12. Add a dip belt only when bodyweight sets are clean.",
    equipment: ["dip bars"],
    difficulty: "advanced",
    primaryMuscles: ["pectoralis major", "triceps"],
    secondaryMuscles: ["anterior deltoid"],
    sortOrder: 5,
  },
  {
    muscleGroup: "chest",
    slug: "machine-chest-press",
    title: "Machine Chest Press",
    excerpt:
      "Stable pressing path—ideal for beginners, high-rep finishers, or rehab-friendly loading.",
    quickAnswer:
      "Adjust the seat so handles sit at mid-chest. Press out to full extension without shrugging, then return with control until you feel a mild stretch.",
    bodyHtml: p(
      "Machines get snobbery they don't deserve. When you're learning pressing patterns, fatigued at the end of a session, or training around a cranky shoulder, a good chest press machine is a gift.",
      "Set the seat height carefully—wrong height turns this into a weird front-delt raise.",
    ),
    formCues: [
      "Back flat against the pad",
      "Press through mid-chest height",
      "Exhale on the press; don't hold a death-grip breath the whole set",
    ],
    commonMistakes: [
      "Seat too high or too low",
      "Slamming the stack on every rep",
      "Partial range for ego weight",
    ],
    programmingNotes:
      "3–4 × 8–15. Great for drop sets and controlled eccentrics.",
    equipment: ["chest press machine"],
    difficulty: "beginner",
    primaryMuscles: ["pectoralis major"],
    secondaryMuscles: ["triceps", "anterior deltoid"],
    sortOrder: 6,
  },
  {
    muscleGroup: "chest",
    slug: "dumbbell-fly",
    title: "Dumbbell Fly",
    excerpt:
      "Free-weight fly for a deep pec stretch—use moderate loads and honest range.",
    quickAnswer:
      "On a flat or slight-incline bench, open the dumbbells in a wide arc with soft elbows, then hug them back together over the chest.",
    bodyHtml: p(
      "Heavy dumbbell flies are how people irritate shoulders. Think stretch and squeeze, not max load. If you can't control the bottom, the weight is too heavy—period.",
    ),
    formCues: [
      "Elbows soft and fixed",
      "Stop when stretch is deep but comfortable",
      "Hands meet over mid-chest, not over the face",
    ],
    commonMistakes: [
      "Turning the fly into a press with bent elbows that change every rep",
      "Going excessively deep with unstable shoulders",
      "Using momentum from the hips",
    ],
    programmingNotes:
      "2–3 × 10–15 light-to-moderate. Never as a max-effort lift.",
    equipment: ["dumbbells", "bench"],
    difficulty: "intermediate",
    primaryMuscles: ["pectoralis major"],
    secondaryMuscles: ["anterior deltoid"],
    sortOrder: 7,
  },

  // —— Back (7)
  {
    muscleGroup: "back",
    slug: "conventional-deadlift",
    title: "Conventional Deadlift",
    excerpt:
      "Hip hinge king for posterior chain strength—learned patiently, loaded honestly.",
    quickAnswer:
      "Bar over mid-foot, hinge at hips, grip just outside the legs, brace, push the floor away, and stand tall. Lower with control by hinging—don't round-and-drop.",
    bodyHtml: p(
      "Deadlifts build the kind of strength that transfers to life: picking up luggage, moving furniture, surviving monsoon mud with shopping bags. They also punish poor bracing.",
      "I teach the hinge with a broomstick or light trap bar first if the conventional pull looks sketchy. Pride has no place under a loaded bar.",
    ),
    formCues: [
      "Lats tight—'bend the bar' toward you",
      "Push the floor away rather than yanking with the arms",
      "Hips and shoulders rise together",
      "Finish tall without hyperextending the low back",
    ],
    commonMistakes: [
      "Jerking the bar off the floor with a rounded back",
      "Hips shooting up early (stripper deadlift)",
      "Looking at the ceiling and cranking the neck",
    ],
    programmingNotes:
      "1–3 hard sets of 3–5, or lighter technique sets of 5–8. Not every week needs a max—cycle intensity.",
    equipment: ["barbell"],
    difficulty: "advanced",
    primaryMuscles: ["erector spinae", "glutes", "hamstrings"],
    secondaryMuscles: ["lats", "traps", "forearms"],
    sortOrder: 1,
  },
  {
    muscleGroup: "back",
    slug: "pull-up",
    title: "Pull-Up",
    excerpt:
      "Vertical pull for lat width and upper-back strength—scale with bands or negatives.",
    quickAnswer:
      "Hang from a bar with hands slightly outside shoulders, pull chest toward the bar, then lower with control to a full hang (pain-free).",
    bodyHtml: p(
      "If you can do clean pull-ups, celebrate—then add reps or load instead of kipping for Instagram. If you can't yet, band-assisted, foot-assisted, or slow negatives all count as real training.",
    ),
    formCues: [
      "Start the pull by depressing the shoulder blades",
      "Think 'elbows to ribs' more than 'hands to ceiling'",
      "Avoid excessive swinging",
    ],
    commonMistakes: [
      "Chin-only half reps",
      "Shrugging into the traps without lat engagement",
      "Kipping when the goal is strength",
    ],
    programmingNotes:
      "3–5 × max clean reps (leave 1–2 in reserve). Alternate with lat pulldowns in the same week if needed.",
    equipment: ["pull-up bar"],
    difficulty: "intermediate",
    primaryMuscles: ["latissimus dorsi"],
    secondaryMuscles: ["biceps", "rear delts", "mid traps"],
    sortOrder: 2,
  },
  {
    muscleGroup: "back",
    slug: "barbell-row",
    title: "Barbell Bent-Over Row",
    excerpt:
      "Horizontal pull for thickness—hinge, brace, row to the hip/lower ribs.",
    quickAnswer:
      "Hinge to ~45°, brace the trunk, row the bar toward the lower chest/upper abs, squeeze the shoulder blades, then lower under control.",
    bodyHtml: p(
      "Rows balance all the pressing we love. If your shoulders feel cranky from bench volume, check your row volume first—most people are under-pulled.",
    ),
    formCues: [
      "Soft knees; hinge from the hips",
      "Bar path toward the hip, not the neck",
      "Pause briefly at the top without shrugging",
    ],
    commonMistakes: [
      "Turning it into a deadlift bounce",
      "Standing too upright and curling the weight",
      "Rounding the upper back to chase load",
    ],
    programmingNotes:
      "3–4 × 6–10. Pair opposite a press in the same session.",
    equipment: ["barbell"],
    difficulty: "intermediate",
    primaryMuscles: ["latissimus dorsi", "rhomboids"],
    secondaryMuscles: ["biceps", "rear delts", "erectors"],
    sortOrder: 3,
  },
  {
    muscleGroup: "back",
    slug: "seated-cable-row",
    title: "Seated Cable Row",
    excerpt:
      "Stable horizontal pull with constant tension—easy to coach and load.",
    quickAnswer:
      "Sit tall, grab the handle, row toward the belly while driving elbows back, then extend the arms without losing shoulder-blade control.",
    bodyHtml: p(
      "Cable rows forgive less-than-perfect gym equipment and still deliver a great pump and strength stimulus. Neutral grips are shoulder-friendly for many trainees.",
    ),
    formCues: [
      "Chest proud; avoid collapsing forward",
      "Pull elbows past the torso line",
      "Control the return—don't let the stack yank you",
    ],
    commonMistakes: [
      "Rocking the torso for momentum",
      "Shrugging every rep into the ears",
      "Stopping the pull halfway",
    ],
    programmingNotes:
      "3–4 × 8–12. Swap grips (V-bar, wide, single-arm) across mesocycles.",
    equipment: ["cable row"],
    difficulty: "beginner",
    primaryMuscles: ["latissimus dorsi", "mid traps"],
    secondaryMuscles: ["biceps", "rear delts"],
    sortOrder: 4,
  },
  {
    muscleGroup: "back",
    slug: "lat-pulldown",
    title: "Lat Pulldown",
    excerpt:
      "Machine vertical pull—build the pull-up pattern with adjustable load.",
    quickAnswer:
      "Sit locked under the pads, pull the bar to the upper chest, lead with the elbows, then return to a full stretch overhead.",
    bodyHtml: p(
      "Pulldowns are not 'lesser pull-ups.' They're how most people accumulate quality vertical-pull volume while they build toward bodyweight reps.",
    ),
    formCues: [
      "Pull to the chest, not behind the neck",
      "Lean back slightly—don't turn it into a row",
      "Full stretch at the top without pain",
    ],
    commonMistakes: [
      "Behind-the-neck pulldowns under load",
      "Using half range to move the whole stack",
      "Excessive lean and hip thrust",
    ],
    programmingNotes:
      "3–4 × 8–12. Great for slow eccentrics (3–4 seconds down).",
    equipment: ["lat pulldown"],
    difficulty: "beginner",
    primaryMuscles: ["latissimus dorsi"],
    secondaryMuscles: ["biceps", "rear delts"],
    sortOrder: 5,
  },
  {
    muscleGroup: "back",
    slug: "single-arm-dumbbell-row",
    title: "Single-Arm Dumbbell Row",
    excerpt:
      "Unilateral row to fix side-to-side gaps and train a long lat stretch.",
    quickAnswer:
      "Brace one hand and knee on a bench, row the dumbbell toward the hip, then lower until the shoulder feels a stretch—without rotating the torso wildly.",
    bodyHtml: p(
      "One-arm rows let you chase a deep stretch and honest lockout. They're also forgiving when the gym's barbell area is crowded.",
    ),
    formCues: [
      "Hips square; minimize torso twist",
      "Elbow tracks close to the body",
      "Pause at the top without shrugging",
    ],
    commonMistakes: [
      "Rotating like a Russian twist every rep",
      "Yank with the biceps only",
      "Short-stroking the bottom",
    ],
    programmingNotes:
      "3 × 8–12/side. Start with the weaker side.",
    equipment: ["dumbbell", "bench"],
    difficulty: "beginner",
    primaryMuscles: ["latissimus dorsi"],
    secondaryMuscles: ["biceps", "rear delts", "core"],
    sortOrder: 6,
  },
  {
    muscleGroup: "back",
    slug: "face-pull",
    title: "Face Pull",
    excerpt:
      "Rear-delt and external-rotation friendly pull—shoulder insurance work.",
    quickAnswer:
      "Set a rope high on a cable. Pull toward the face, externally rotate so fists end near the temples, then return slowly.",
    bodyHtml: p(
      "Face pulls are the 'eat your vegetables' of upper-body training. They won't make headlines, but people who do them consistently usually keep shoulders happier through heavy press blocks.",
    ),
    formCues: [
      "Lead with the elbows high",
      "Finish with knuckles toward the ceiling",
      "Light-to-moderate load—feel the rear delts",
    ],
    commonMistakes: [
      "Turning it into a heavy upright row",
      "No external rotation at the end",
      "Using so much weight that the low back heaves",
    ],
    programmingNotes:
      "3–4 × 12–20 at the end of push or pull days.",
    equipment: ["cable", "rope"],
    difficulty: "beginner",
    primaryMuscles: ["rear delts", "external rotators"],
    secondaryMuscles: ["mid traps", "rhomboids"],
    sortOrder: 7,
  },

  // —— Shoulders (7)
  {
    muscleGroup: "shoulders",
    slug: "overhead-press",
    title: "Standing Overhead Press",
    excerpt:
      "Strict vertical press for delts and upper-body strength—bracing is everything.",
    quickAnswer:
      "Bar at collarbone height, brace the core, press overhead to locked elbows, head through at the top, then lower with control.",
    bodyHtml: p(
      "A strong overhead press is a resume for trunk stability. Soft midsections leak force; belts help advanced lifters, but learning to brace matters more than the belt.",
    ),
    formCues: [
      "Glutes squeezed; ribs down",
      "Press up and slightly back into the plane of the ears",
      "Don't lean back into a standing incline bench",
    ],
    commonMistakes: [
      "Excessive layback turning it into a chest press",
      "Pressing forward of the face and losing the bar path",
      "Flaring ribs and dumping into the low back",
    ],
    programmingNotes:
      "3–5 × 5–8. If wrists or shoulders complain, try a neutral-grip dumbbell press.",
    equipment: ["barbell"],
    difficulty: "intermediate",
    primaryMuscles: ["anterior deltoid", "medial deltoid"],
    secondaryMuscles: ["triceps", "upper chest", "core"],
    sortOrder: 1,
  },
  {
    muscleGroup: "shoulders",
    slug: "dumbbell-shoulder-press",
    title: "Seated Dumbbell Shoulder Press",
    excerpt:
      "Independent-arm overhead press with a back support for focus on the delts.",
    quickAnswer:
      "Sit with back support, dumbbells at shoulder height, press to lockout without banging the bells, then lower to about ear level.",
    bodyHtml: p(
      "Seated DB presses are forgiving when your low back is tired from squats or deadlifts. They also reveal if one arm is freeloading.",
    ),
    formCues: [
      "Wrists stacked over elbows",
      "Full lockout without shrugging",
      "Control the bottom—don't crash into the shoulders",
    ],
    commonMistakes: [
      "Arching off the pad to chase load",
      "Partial lockouts every set",
      "Flaring elbows randomly between reps",
    ],
    programmingNotes:
      "3–4 × 8–12. Alternate with barbell OHP across weeks.",
    equipment: ["dumbbells", "bench"],
    difficulty: "beginner",
    primaryMuscles: ["deltoids"],
    secondaryMuscles: ["triceps"],
    sortOrder: 2,
  },
  {
    muscleGroup: "shoulders",
    slug: "lateral-raise",
    title: "Dumbbell Lateral Raise",
    excerpt:
      "Side-delt builder—light weights, honest arcs, no swinging from the hips.",
    quickAnswer:
      "Raise dumbbells out to the sides until hands are roughly at shoulder height, lead with the elbows, then lower slowly.",
    bodyHtml: p(
      "If your side delts only grow when you cheat with traps and momentum, your laterals are too heavy. Ego weight here is a trap—literally.",
    ),
    formCues: [
      "Soft elbows; pinkies slightly high",
      "Stop at shoulder height for most sets",
      "Lean slightly forward if it helps you feel the medial delts",
    ],
    commonMistakes: [
      "Swinging with the torso",
      "Shrugging the traps to lift the weight",
      "Going way above the head every rep",
    ],
    programmingNotes:
      "3–4 × 12–20. Perfect for rest-pause or slow eccentrics.",
    equipment: ["dumbbells"],
    difficulty: "beginner",
    primaryMuscles: ["medial deltoid"],
    secondaryMuscles: ["traps"],
    sortOrder: 3,
  },
  {
    muscleGroup: "shoulders",
    slug: "rear-delt-fly",
    title: "Rear Delt Fly",
    excerpt:
      "Posterior shoulder work for balanced delts and healthier pressing.",
    quickAnswer:
      "Hinge or sit on a machine, open the arms out to the sides with soft elbows, squeeze the rear delts, then return.",
    bodyHtml: p(
      "Front delts get plenty from pressing. Rear delts need intentional work—especially if you desk-slouch half the day.",
    ),
    formCues: [
      "Think 'reach the elbows to the walls'",
      "Keep the neck long; don't crane forward",
      "Moderate load, full control",
    ],
    commonMistakes: [
      "Using mid-back rows instead of rear-delt isolation",
      "Yanked, short-range reps",
      "Heavy loads that turn into shrugs",
    ],
    programmingNotes:
      "3 × 12–20 on pull days or after presses.",
    equipment: ["dumbbells", "machine"],
    difficulty: "beginner",
    primaryMuscles: ["rear delts"],
    secondaryMuscles: ["rhomboids"],
    sortOrder: 4,
  },
  {
    muscleGroup: "shoulders",
    slug: "arnold-press",
    title: "Arnold Press",
    excerpt:
      "Rotating dumbbell press that hits front and side delts through a long range.",
    quickAnswer:
      "Start with palms facing you at shoulder height, press up while rotating palms forward, then reverse on the way down.",
    bodyHtml: p(
      "Arnold presses are a useful variation when straight presses feel stale—not a mandatory lift. If the rotation bothers your shoulders, skip it and stick to neutral presses.",
    ),
    formCues: [
      "Smooth rotation—no sudden twists under load",
      "Full lockout overhead",
      "Controlled descent with the reverse rotation",
    ],
    commonMistakes: [
      "Rushing the rotation",
      "Excessive arch",
      "Using loads you can't control at the bottom",
    ],
    programmingNotes:
      "3 × 8–12 as a secondary press.",
    equipment: ["dumbbells"],
    difficulty: "intermediate",
    primaryMuscles: ["deltoids"],
    secondaryMuscles: ["triceps"],
    sortOrder: 5,
  },
  {
    muscleGroup: "shoulders",
    slug: "upright-row-cable",
    title: "Cable Upright Row (Wide)",
    excerpt:
      "Wide-grip cable pull to the chest for medial delts—skip if shoulders pinch.",
    quickAnswer:
      "Pull a straight bar or rope up the body to about lower-chest height with elbows high, then lower slowly. Keep the grip wider than shoulder width.",
    bodyHtml: p(
      "Narrow upright rows irritate a lot of shoulders. A wider grip and stopping at chest height keeps this useful for some trainees. If it pinches, replace with laterals and face pulls—no ego.",
    ),
    formCues: [
      "Elbows lead the movement",
      "Stop around chest height",
      "Light-moderate load",
    ],
    commonMistakes: [
      "Pulling to the chin with a narrow grip",
      "Rolling the shoulders forward",
      "Using momentum from the hips",
    ],
    programmingNotes:
      "2–3 × 12–15 only if pain-free. Otherwise substitute laterals.",
    equipment: ["cable"],
    difficulty: "intermediate",
    primaryMuscles: ["medial deltoid", "traps"],
    secondaryMuscles: ["biceps"],
    sortOrder: 6,
  },
  {
    muscleGroup: "shoulders",
    slug: "pike-push-up",
    title: "Pike Push-Up",
    excerpt:
      "Bodyweight vertical-press pattern—bridge toward handstand push-ups.",
    quickAnswer:
      "From a downward-dog position, bend the elbows to lower the head toward the floor, then press back up. Keep hips high.",
    bodyHtml: p(
      "Pike push-ups teach overhead pressing without a rack. Elevate the feet later if you want more load. Wrists sore? Use parallettes or fists on a mat.",
    ),
    formCues: [
      "Hips high; head moves between the hands",
      "Elbows ~45°",
      "Full lockout at the top",
    ],
    commonMistakes: [
      "Turning it into a regular push-up with flat hips",
      "Flared elbows and collapsed shoulders",
      "Tiny range of motion",
    ],
    programmingNotes:
      "3–4 × 6–12. Progress to elevated feet when ready.",
    equipment: ["bodyweight"],
    difficulty: "intermediate",
    primaryMuscles: ["deltoids"],
    secondaryMuscles: ["triceps", "upper chest"],
    sortOrder: 7,
  },

  // —— Arms (7)
  {
    muscleGroup: "arms",
    slug: "barbell-curl",
    title: "Barbell Curl",
    excerpt:
      "Classic biceps mass builder—strict torso, full stretch, controlled squeeze.",
    quickAnswer:
      "Stand tall, curl the bar to about shoulder height without swinging, squeeze, then lower to full elbow extension.",
    bodyHtml: p(
      "Curls don't need chaos. If you have to heave your lower back to move the bar, it's not a curl anymore—it's a poorly loaded hinge.",
    ),
    formCues: [
      "Elbows close to the ribs",
      "Wrists neutral-ish—not excessively bent back",
      "Full stretch at the bottom",
    ],
    commonMistakes: [
      "Hip thrust every rep",
      "Cutting the range short",
      "Rushing the eccentric",
    ],
    programmingNotes:
      "3 × 8–12 after compound pulls. EZ-bar if wrist comfort needs it.",
    equipment: ["barbell"],
    difficulty: "beginner",
    primaryMuscles: ["biceps brachii"],
    secondaryMuscles: ["brachialis", "forearms"],
    sortOrder: 1,
  },
  {
    muscleGroup: "arms",
    slug: "hammer-curl",
    title: "Hammer Curl",
    excerpt:
      "Neutral-grip curl for brachialis and forearms—thickens the upper arm.",
    quickAnswer:
      "Curl dumbbells with palms facing each other, keep elbows pinned, lower under control.",
    bodyHtml: p(
      "Hammer curls often feel better than supinated curls when the elbows are cranky. They also help the 'side' of the arm look thicker in a T-shirt.",
    ),
    formCues: [
      "Thumbs up the whole time",
      "No swinging",
      "Equal tempo up and down",
    ],
    commonMistakes: [
      "Letting the elbows drift forward excessively",
      "Partial reps with ego load",
      "Twisting mid-rep without intent",
    ],
    programmingNotes:
      "3 × 10–15. Great paired with triceps extensions.",
    equipment: ["dumbbells"],
    difficulty: "beginner",
    primaryMuscles: ["brachialis", "biceps"],
    secondaryMuscles: ["forearms"],
    sortOrder: 2,
  },
  {
    muscleGroup: "arms",
    slug: "triceps-pushdown",
    title: "Triceps Pushdown",
    excerpt:
      "Cable extension for the triceps—easy to load and control for high-quality volume.",
    quickAnswer:
      "Elbows pinned to your sides, push the handle down to full extension, squeeze the triceps, then return without letting the elbows flare wildly.",
    bodyHtml: p(
      "Pushdowns are the reliable workhorse. Rope, bar, or V-bar—all fine. Pick the attachment that lets you lock out without elbow pain.",
    ),
    formCues: [
      "Ribs down; don't turn it into a crunch",
      "Full lockout with intent",
      "Control the return to ~90° elbow bend",
    ],
    commonMistakes: [
      "Leaning over and pressing with the chest",
      "Elbows flaring and wandering forward",
      "Bouncing out of the bottom",
    ],
    programmingNotes:
      "3–4 × 10–15 as a primary or secondary triceps move.",
    equipment: ["cable"],
    difficulty: "beginner",
    primaryMuscles: ["triceps"],
    secondaryMuscles: [],
    sortOrder: 3,
  },
  {
    muscleGroup: "arms",
    slug: "overhead-triceps-extension",
    title: "Overhead Triceps Extension",
    excerpt:
      "Long-head biased triceps stretch—dumbbell, cable, or EZ-bar.",
    quickAnswer:
      "Hold a weight overhead, bend the elbows to lower behind the head, then extend back to lockout without flaring the ribs.",
    bodyHtml: p(
      "Overhead extensions load the long head nicely because of the shoulder position. Start light—shoulders and elbows will tell you if the setup is wrong.",
    ),
    formCues: [
      "Upper arms stay close to the ears",
      "Soft knees; braced core",
      "Full lockout without slamming",
    ],
    commonMistakes: [
      "Elbows flaring wide",
      "Arching to move heavier loads",
      "Cutting the stretch short",
    ],
    programmingNotes:
      "3 × 10–15. Cable versions keep nicer tension at the top.",
    equipment: ["dumbbell", "cable"],
    difficulty: "intermediate",
    primaryMuscles: ["triceps long head"],
    secondaryMuscles: ["core"],
    sortOrder: 4,
  },
  {
    muscleGroup: "arms",
    slug: "skull-crusher",
    title: "Skull Crusher (Lying Triceps Extension)",
    excerpt:
      "Lying extension for triceps mass—lower behind the head slightly for a safer stretch.",
    quickAnswer:
      "Lie on a bench, lower an EZ-bar toward the forehead or just behind the head by bending the elbows, then extend to lockout.",
    bodyHtml: p(
      "Despite the name, you do not need to aim for your skull. Lowering slightly behind the head often feels better on the elbows and keeps tension on the triceps.",
    ),
    formCues: [
      "Upper arms mostly vertical",
      "Wrists firm",
      "Control both directions",
    ],
    commonMistakes: [
      "Flaring elbows and turning it into a pullover",
      "Dropping the bar too fast",
      "Excessive load with broken form",
    ],
    programmingNotes:
      "3 × 8–12. Warm elbows with lighter pushdowns first.",
    equipment: ["EZ-bar", "bench"],
    difficulty: "intermediate",
    primaryMuscles: ["triceps"],
    secondaryMuscles: [],
    sortOrder: 5,
  },
  {
    muscleGroup: "arms",
    slug: "concentration-curl",
    title: "Concentration Curl",
    excerpt:
      "Strict single-arm curl to chase a peak contraction without cheating.",
    quickAnswer:
      "Sit, brace the upper arm against the inner thigh, curl the dumbbell up, squeeze, and lower slowly.",
    bodyHtml: p(
      "These won't replace compound curls, but they're excellent for slow eccentrics and mind-muscle focus when you want quality over load.",
    ),
    formCues: [
      "Upper arm glued to the thigh",
      "No torso lean to finish the rep",
      "Full stretch at the bottom",
    ],
    commonMistakes: [
      "Swinging the torso",
      "Short range",
      "Rushing both phases",
    ],
    programmingNotes:
      "2–3 × 10–15/arm as a finisher.",
    equipment: ["dumbbell"],
    difficulty: "beginner",
    primaryMuscles: ["biceps"],
    secondaryMuscles: [],
    sortOrder: 6,
  },
  {
    muscleGroup: "arms",
    slug: "close-grip-bench-press",
    title: "Close-Grip Bench Press",
    excerpt:
      "Compound triceps strength builder that still trains the chest.",
    quickAnswer:
      "Grip just inside shoulder width, lower the bar to the lower chest with elbows closer to the body, then press up.",
    bodyHtml: p(
      "This is how you get triceps strong for lockouts without living on isolation work alone. Don't go ultra-narrow—that's wrists, not triceps.",
    ),
    formCues: [
      "Grip just inside shoulders",
      "Elbows tuck naturally",
      "Bar to lower chest",
    ],
    commonMistakes: [
      "Hands nearly touching (wrist hell)",
      "Flaring like a wide bench press",
      "Bouncing off the chest",
    ],
    programmingNotes:
      "3–4 × 6–10 on upper or arm days.",
    equipment: ["barbell", "bench"],
    difficulty: "intermediate",
    primaryMuscles: ["triceps"],
    secondaryMuscles: ["chest", "front delts"],
    sortOrder: 7,
  },

  // —— Legs (8)
  {
    muscleGroup: "legs",
    slug: "back-squat",
    title: "Back Squat",
    excerpt:
      "Foundational knee and hip dominant strength—depth you can own, not depth for show.",
    quickAnswer:
      "Bar on the upper back, brace, break at hips and knees, descend as deep as you can keep a neutral spine, then drive up through mid-foot.",
    bodyHtml: p(
      "Squats build legs and character. Depth should be the deepest position you can control without the low back rounding or the heels lifting. Parallel is great; ATG is optional, not moral.",
    ),
    formCues: [
      "Brace before you unlock the knees",
      "Knees track over mid-toes",
      "Chest proud without excessive forward collapse",
    ],
    commonMistakes: [
      "Knees caving hard without control",
      "Good-morninging out of the hole",
      "Heels rising every rep",
    ],
    programmingNotes:
      "3–5 × 5–8. Cycle intensity; technique beats weekly PRs.",
    equipment: ["barbell", "squat rack"],
    difficulty: "intermediate",
    primaryMuscles: ["quads", "glutes"],
    secondaryMuscles: ["adductors", "core", "erectors"],
    sortOrder: 1,
  },
  {
    muscleGroup: "legs",
    slug: "romanian-deadlift",
    title: "Romanian Deadlift",
    excerpt:
      "Hamstring and glute hinge with a soft knee—stretch under control.",
    quickAnswer:
      "From standing, push the hips back with a soft knee bend, slide the bar down the thighs until you feel a strong hamstring stretch, then drive the hips forward to stand.",
    bodyHtml: p(
      "RDLs teach the hinge without the complexity of pulling from the floor every time. They're also excellent for people who 'can't feel' their hamstrings on machines.",
    ),
    formCues: [
      "Bar stays close to the legs",
      "Hips back, not knees forward",
      "Neutral spine—stop before rounding",
    ],
    commonMistakes: [
      "Turning it into a squat",
      "Rounding to chase depth",
      "Yanked lockouts with hyperextension",
    ],
    programmingNotes:
      "3–4 × 6–10. Pair with a squat or lunge pattern.",
    equipment: ["barbell"],
    difficulty: "intermediate",
    primaryMuscles: ["hamstrings", "glutes"],
    secondaryMuscles: ["erectors", "forearms"],
    sortOrder: 2,
  },
  {
    muscleGroup: "legs",
    slug: "leg-press",
    title: "Leg Press",
    excerpt:
      "Machine squat pattern for high-quality leg volume with less axial fatigue.",
    quickAnswer:
      "Feet mid-platform, lower until knees are deeply bent without the low back peeling off the pad, then press to soft lockout.",
    bodyHtml: p(
      "Leg presses aren't cheating—they're a tool. Use them when your spine is cooked from heavy squats or when you're learning to push hard without a bar on your back.",
    ),
    formCues: [
      "Low back stays glued to the pad",
      "Full range you can control",
      "Don't slam into lockout",
    ],
    commonMistakes: [
      "Going so deep the pelvis tucks hard",
      "Tiny partials with the whole stack",
      "Feet placement so high you only hinge",
    ],
    programmingNotes:
      "3–4 × 8–15. Foot position bias: lower = more quads; higher = more glutes/hams.",
    equipment: ["leg press"],
    difficulty: "beginner",
    primaryMuscles: ["quads", "glutes"],
    secondaryMuscles: ["hamstrings"],
    sortOrder: 3,
  },
  {
    muscleGroup: "legs",
    slug: "walking-lunge",
    title: "Walking Lunge",
    excerpt:
      "Unilateral leg builder and stability challenge—great for real-world strength.",
    quickAnswer:
      "Step forward, lower the back knee toward the floor, then drive through the front foot into the next step. Keep the torso tall.",
    bodyHtml: p(
      "Lunges expose imbalances fast. Shorter steps bias quads; longer steps bias glutes. Hold dumbbells when bodyweight becomes easy.",
    ),
    formCues: [
      "Front knee tracks over mid-foot",
      "Back knee kisses toward the floor with control",
      "Ribs stacked over pelvis",
    ],
    commonMistakes: [
      "Slamming the back knee",
      "Wobbly sideways steps",
      "Leaning too far forward every step",
    ],
    programmingNotes:
      "3 × 8–12/leg. Use as a secondary after squats.",
    equipment: ["dumbbells", "bodyweight"],
    difficulty: "intermediate",
    primaryMuscles: ["quads", "glutes"],
    secondaryMuscles: ["hamstrings", "core"],
    sortOrder: 4,
  },
  {
    muscleGroup: "legs",
    slug: "bulgarian-split-squat",
    title: "Bulgarian Split Squat",
    excerpt:
      "Rear-foot elevated split squat—brutal, honest, highly effective.",
    quickAnswer:
      "Rear foot on a bench, front foot planted, lower until the front thigh is roughly parallel, then stand. Hold dumbbells at your sides.",
    bodyHtml: p(
      "These have a reputation for being miserable because they work. Start bodyweight. Most people need a few sessions just to balance before loading.",
    ),
    formCues: [
      "Most weight on the front foot",
      "Slight forward torso lean is fine",
      "Control the bottom",
    ],
    commonMistakes: [
      "Front foot too close—no room to descend",
      "Pushing mostly through the back foot",
      "Rushing and losing balance every rep",
    ],
    programmingNotes:
      "3 × 6–10/leg. Alternate with lunges across weeks.",
    equipment: ["dumbbells", "bench"],
    difficulty: "advanced",
    primaryMuscles: ["quads", "glutes"],
    secondaryMuscles: ["core"],
    sortOrder: 5,
  },
  {
    muscleGroup: "legs",
    slug: "leg-curl",
    title: "Lying or Seated Leg Curl",
    excerpt:
      "Direct hamstring isolation—balance all the quad-dominant work.",
    quickAnswer:
      "Curl the pad by bending the knees through a full range, squeeze the hamstrings, then lower slowly.",
    bodyHtml: p(
      "Hamstrings deserve more than leftover energy. Leg curls are simple insurance against imbalances—especially if you sprint, play football, or hinge heavy.",
    ),
    formCues: [
      "Hips stay down on lying curls",
      "Full stretch at the start",
      "Slow eccentric",
    ],
    commonMistakes: [
      "Yanking with momentum",
      "Short range both sides",
      "Cranking the low back to finish reps",
    ],
    programmingNotes:
      "3 × 10–15 on lower days.",
    equipment: ["leg curl machine"],
    difficulty: "beginner",
    primaryMuscles: ["hamstrings"],
    secondaryMuscles: ["calves"],
    sortOrder: 6,
  },
  {
    muscleGroup: "legs",
    slug: "leg-extension",
    title: "Leg Extension",
    excerpt:
      "Quad isolation with constant tension—great pump and knee-friendly loading when set up well.",
    quickAnswer:
      "Align the knee with the machine's pivot, extend to lockout, squeeze the quads, then lower under control.",
    bodyHtml: p(
      "Leg extensions aren't evil. High loads with angry knees? Maybe dial back. Controlled mid-high rep work is fine for most healthy trainees.",
    ),
    formCues: [
      "Pad on the lower shin, not the foot",
      "Full extension without hyping the pelvis",
      "Pause briefly at the top",
    ],
    commonMistakes: [
      "Swinging the weight stack",
      "Seat set so poorly the hips lift",
      "Only doing tiny top-range pulses",
    ],
    programmingNotes:
      "3 × 10–15 as a finisher or warm-up primer.",
    equipment: ["leg extension"],
    difficulty: "beginner",
    primaryMuscles: ["quads"],
    secondaryMuscles: [],
    sortOrder: 7,
  },
  {
    muscleGroup: "legs",
    slug: "standing-calf-raise",
    title: "Standing Calf Raise",
    excerpt:
      "Gastrocnemius-focused calf work—full stretch, full squeeze, patience.",
    quickAnswer:
      "Rise onto the balls of the feet to a hard squeeze, then lower into a full stretch at the bottom. Pause both ends.",
    bodyHtml: p(
      "Calves grow for people who treat them like real muscles: full ROM, progressive overload, consistency. Half-reps forever won't cut it.",
    ),
    formCues: [
      "Full stretch at the bottom",
      "Big squeeze at the top",
      "Knees soft but not bent into a squat",
    ],
    commonMistakes: [
      "Bouncing out of the bottom",
      "Tiny mid-range pulses only",
      "Rushing every set",
    ],
    programmingNotes:
      "3–4 × 10–15; occasionally heavier 6–8. Train 2×/week if calves are stubborn.",
    equipment: ["calf raise machine", "step"],
    difficulty: "beginner",
    primaryMuscles: ["gastrocnemius"],
    secondaryMuscles: ["soleus"],
    sortOrder: 8,
  },

  // —— Core (7)
  {
    muscleGroup: "core",
    slug: "plank",
    title: "Front Plank",
    excerpt:
      "Anti-extension staple—brace hard for quality seconds, not floppy minutes.",
    quickAnswer:
      "Forearms and toes on the floor, body in a straight line, ribs down, glutes lightly on. Breathe while bracing.",
    bodyHtml: p(
      "A two-minute sagging plank teaches bad habits. Aim for shorter, harder sets where the hips don't drop and the low back doesn't scream.",
    ),
    formCues: [
      "Ribs toward pelvis",
      "Squeeze glutes gently",
      "Push the floor away with the forearms",
    ],
    commonMistakes: [
      "Hips sagging",
      "Hips too high (pike)",
      "Holding the breath until failure",
    ],
    programmingNotes:
      "3–4 × 20–40 quality seconds. Progress with longer levers or reaches.",
    equipment: ["bodyweight"],
    difficulty: "beginner",
    primaryMuscles: ["rectus abdominis", "transverse abdominis"],
    secondaryMuscles: ["glutes", "shoulders"],
    sortOrder: 1,
  },
  {
    muscleGroup: "core",
    slug: "dead-bug",
    title: "Dead Bug",
    excerpt:
      "Core control drill that teaches bracing while moving the limbs.",
    quickAnswer:
      "Lie on your back, ribs down, arms up, knees bent 90°. Extend opposite arm and leg without letting the low back arch, then return.",
    bodyHtml: p(
      "Dead bugs look easy until you do them honestly. They're gold for people who 'can't feel' their abs on crunches or who arch hard under load.",
    ),
    formCues: [
      "Low back gently pressed toward the floor",
      "Exhale as you extend",
      "Slow and symmetrical",
    ],
    commonMistakes: [
      "Arching as soon as the leg moves",
      "Rushing",
      "Holding the breath",
    ],
    programmingNotes:
      "3 × 6–10/side. Use as warm-up or finisher.",
    equipment: ["bodyweight"],
    difficulty: "beginner",
    primaryMuscles: ["deep core"],
    secondaryMuscles: ["hip flexors"],
    sortOrder: 2,
  },
  {
    muscleGroup: "core",
    slug: "cable-woodchop",
    title: "Cable Woodchop",
    excerpt:
      "Anti-rotation / rotational core work for athletic trunk strength.",
    quickAnswer:
      "Set a cable high or mid. Rotate the handle across the body with mostly trunk turn, hips stable, arms relatively straight.",
    bodyHtml: p(
      "Woodchops train the core the way life uses it—resisting and creating rotation. Keep the hips quieter than the ribcage.",
    ),
    formCues: [
      "Arms soft-straight; power from the trunk",
      "Feet planted",
      "Control both directions",
    ],
    commonMistakes: [
      "Squatting and curling the weight",
      "Twisting only the arms",
      "Using momentum",
    ],
    programmingNotes:
      "3 × 8–12/side after compounds.",
    equipment: ["cable"],
    difficulty: "intermediate",
    primaryMuscles: ["obliques"],
    secondaryMuscles: ["deep core", "shoulders"],
    sortOrder: 3,
  },
  {
    muscleGroup: "core",
    slug: "hanging-knee-raise",
    title: "Hanging Knee Raise",
    excerpt:
      "Lower-abs focused raise—posteriorly tilt the pelvis, don't just swing the legs.",
    quickAnswer:
      "Hang from a bar, brace, curl the pelvis to lift the knees toward the chest, then lower without swinging.",
    bodyHtml: p(
      "If you only swing like a pendulum, you're training grip and momentum more than abs. Think 'tailbone toward the bar.'",
    ),
    formCues: [
      "Hollow the abs before the knees move",
      "Minimize swing",
      "Full control on the way down",
    ],
    commonMistakes: [
      "Kipping every rep",
      "Only lifting the thighs without pelvic curl",
      "Holding breath and turning red for no reason",
    ],
    programmingNotes:
      "3 × 8–15. Regress to lying leg raises if hanging is too hard.",
    equipment: ["pull-up bar"],
    difficulty: "intermediate",
    primaryMuscles: ["rectus abdominis"],
    secondaryMuscles: ["hip flexors", "grip"],
    sortOrder: 4,
  },
  {
    muscleGroup: "core",
    slug: "ab-wheel-rollout",
    title: "Ab Wheel Rollout",
    excerpt:
      "Advanced anti-extension—earn it with planks and dead bugs first.",
    quickAnswer:
      "From knees, roll the wheel forward while keeping ribs down, then pull back to the start without sagging the hips.",
    bodyHtml: p(
      "Rollouts are excellent and easy to butcher. If your low back hangs every rep, shorten the range or regress. Full standing rollouts are advanced—no rush.",
    ),
    formCues: [
      "Ribs down the whole time",
      "Glutes lightly engaged",
      "Only go as far as you can control",
    ],
    commonMistakes: [
      "Sagging into lumbar extension",
      "Rolling onto the face with no plan",
      "Going to full stretch on day one",
    ],
    programmingNotes:
      "3 × 6–10 from knees. Progress range before standing.",
    equipment: ["ab wheel"],
    difficulty: "advanced",
    primaryMuscles: ["rectus abdominis", "deep core"],
    secondaryMuscles: ["lats", "shoulders"],
    sortOrder: 5,
  },
  {
    muscleGroup: "core",
    slug: "side-plank",
    title: "Side Plank",
    excerpt:
      "Anti-lateral-flexion core work for obliques and hip stability.",
    quickAnswer:
      "Stack the feet, forearm under the shoulder, lift the hips into a straight line, hold with quality breathing.",
    bodyHtml: p(
      "Side planks balance all the front-facing ab work. If one side collapses, that's information—train the weak side first next session.",
    ),
    formCues: [
      "Hips high enough for a straight line",
      "Shoulder packed over the elbow",
      "Neck neutral",
    ],
    commonMistakes: [
      "Hips sagging toward the floor",
      "Rolling forward or back",
      "Holding the breath",
    ],
    programmingNotes:
      "3 × 20–40s/side. Add hip dips later for variety.",
    equipment: ["bodyweight"],
    difficulty: "beginner",
    primaryMuscles: ["obliques"],
    secondaryMuscles: ["glute medius", "shoulders"],
    sortOrder: 6,
  },
  {
    muscleGroup: "core",
    slug: "pallof-press",
    title: "Pallof Press",
    excerpt:
      "Anti-rotation press with a cable or band—simple and highly effective.",
    quickAnswer:
      "Stand sideways to a cable, hold the handle at the chest, press arms straight out, resist the pull that wants to rotate you, then return.",
    bodyHtml: p(
      "Pallof presses teach your trunk to stay quiet under rotational force. Athletes and desk workers both benefit. Keep the load moderate so you can own the position.",
    ),
    formCues: [
      "Square the hips and shoulders",
      "Press straight out and hold 1–2 seconds",
      "Ribs down",
    ],
    commonMistakes: [
      "Twisting with the cable",
      "Standing too close with no challenge",
      "Shrugging through the set",
    ],
    programmingNotes:
      "3 × 8–12/side with a short pause at full extension.",
    equipment: ["cable", "band"],
    difficulty: "beginner",
    primaryMuscles: ["deep core", "obliques"],
    secondaryMuscles: ["shoulders"],
    sortOrder: 7,
  },

  // —— Cardio (7)
  {
    muscleGroup: "cardio",
    slug: "zone-2-incline-walk",
    title: "Zone-2 Incline Walk",
    excerpt:
      "Low-impact aerobic base builder—conversation pace on an incline treadmill.",
    quickAnswer:
      "Walk on an incline at a pace where you can speak in full sentences. Aim for 20–45 minutes. Nose breathing optional; panic gasping means too hard.",
    bodyHtml: p(
      "Zone-2 isn't flashy, but it's how you build an engine that recovers between hard sets and hard weeks. Incline walking is joint-friendly and doable in crowded gyms.",
    ),
    formCues: [
      "Upright posture; light hand support only",
      "Smooth stride—don't overstride",
      "Keep heart rate in an easy aerobic zone",
    ],
    commonMistakes: [
      "Holding the rails and turning it into a lean",
      "Going so steep you hike with terrible posture",
      "Turning every walk into a HIIT session",
    ],
    programmingNotes:
      "2–4 sessions/week, 20–45 min. Pair with lifting days or separate easy days.",
    equipment: ["treadmill"],
    difficulty: "beginner",
    primaryMuscles: ["cardiovascular system", "calves", "glutes"],
    secondaryMuscles: ["core"],
    sortOrder: 1,
  },
  {
    muscleGroup: "cardio",
    slug: "stationary-bike-intervals",
    title: "Stationary Bike Intervals",
    excerpt:
      "Hard/easy cycling intervals for conditioning without pounding the joints.",
    quickAnswer:
      "Warm up 5 minutes, then alternate 30–60 seconds hard with 60–90 seconds easy for 10–20 minutes. Cool down.",
    bodyHtml: p(
      "Bike intervals are perfect when knees dislike running. Keep 'hard' honestly hard—but not so hard that form collapses or you can't complete the set.",
    ),
    formCues: [
      "Cadence smooth on hard bouts",
      "Sit tall; don't collapse the chest",
      "Ease into the first interval",
    ],
    commonMistakes: [
      "No warm-up",
      "All-out on interval one, dead thereafter",
      "Skipping cool-down",
    ],
    programmingNotes:
      "1–2×/week. Separate from heavy lower-body days if possible.",
    equipment: ["exercise bike"],
    difficulty: "intermediate",
    primaryMuscles: ["quads", "cardiovascular system"],
    secondaryMuscles: ["glutes", "hamstrings"],
    sortOrder: 2,
  },
  {
    muscleGroup: "cardio",
    slug: "row-erg-steady",
    title: "Rowing Machine Steady State",
    excerpt:
      "Full-body cardio with a strong posterior-chain bias—learn the stroke first.",
    quickAnswer:
      "Legs drive, then hips, then arms; recover in reverse. Keep strokes smooth at an easy-moderate pace for 10–25 minutes.",
    bodyHtml: p(
      "Rowing rewards technique. Yanking with the arms early is the classic mistake. Watch a form video, then earn your longer pieces.",
    ),
    formCues: [
      "Legs → hips → arms on the drive",
      "Arms → hips → legs on the recovery",
      "Neutral spine; don't collapse at the catch",
    ],
    commonMistakes: [
      "Arm-pulling before the legs drive",
      "Rounded spine under fatigue",
      "Stroke rate so high that power disappears",
    ],
    programmingNotes:
      "1–3×/week steady pieces, or occasional intervals once technique is solid.",
    equipment: ["rower"],
    difficulty: "intermediate",
    primaryMuscles: ["legs", "back", "cardiovascular system"],
    secondaryMuscles: ["core", "arms"],
    sortOrder: 3,
  },
  {
    muscleGroup: "cardio",
    slug: "jump-rope",
    title: "Jump Rope",
    excerpt:
      "Coordination and conditioning in a tiny footprint—start with short sets.",
    quickAnswer:
      "Jump just high enough to clear the rope, land soft on the midfoot, keep elbows close, and turn from the wrists.",
    bodyHtml: p(
      "Rope work is fantastic when space is limited. If you're new, do 20–40 second bouts with rest. Calves and Achilles need gradual exposure.",
    ),
    formCues: [
      "Light bounce; quiet landings",
      "Wrists turn the rope, not giant arm circles",
      "Eyes forward",
    ],
    commonMistakes: [
      "Jumping too high",
      "Double-jumping every turn",
      "Hard heel-slamming landings",
    ],
    programmingNotes:
      "8–12 rounds of 20–45s. Progress time before speed tricks.",
    equipment: ["jump rope"],
    difficulty: "beginner",
    primaryMuscles: ["calves", "cardiovascular system"],
    secondaryMuscles: ["shoulders", "forearms"],
    sortOrder: 4,
  },
  {
    muscleGroup: "cardio",
    slug: "farmer-carry",
    title: "Farmer Carry",
    excerpt:
      "Loaded walk for grip, trunk, and conditioning—simple and brutally honest.",
    quickAnswer:
      "Pick up heavy dumbbells or kettlebells, stand tall, and walk with short controlled steps. Set down carefully when form fades.",
    bodyHtml: p(
      "Carries build the kind of conditioning that feels useful: you can hold things and keep moving. They're also a core workout in disguise.",
    ),
    formCues: [
      "Tall posture; pack the shoulders",
      "Ribs down",
      "Even strides—don't lean to one side",
    ],
    commonMistakes: [
      "Shrugging the whole time",
      "Waddling with a twisted torso",
      "Dropping weights carelessly",
    ],
    programmingNotes:
      "4–6 carries of 20–40m. Use as a finisher on full-body days.",
    equipment: ["dumbbells", "kettlebells"],
    difficulty: "beginner",
    primaryMuscles: ["grip", "core", "traps"],
    secondaryMuscles: ["glutes", "cardiovascular system"],
    sortOrder: 5,
  },
  {
    muscleGroup: "cardio",
    slug: "assault-bike-sprints",
    title: "Assault / Air Bike Sprints",
    excerpt:
      "Short, nasty intervals on an air bike—high output, low skill barrier.",
    quickAnswer:
      "Warm up, then sprint 10–20 seconds all-out, recover 40–90 seconds easy. Repeat for 8–15 rounds. Cool down.",
    bodyHtml: p(
      "Air bikes humble everyone. Keep sprints short enough that power stays high. This is seasoning, not every-day training.",
    ),
    formCues: [
      "Drive arms and legs together",
      "Stay seated unless you intentionally stand",
      "Recover enough to quality-sprint again",
    ],
    commonMistakes: [
      "Making every interval a 2-minute grind",
      "No warm-up",
      "Programming them daily",
    ],
    programmingNotes:
      "1×/week max for most lifters. Avoid the day before heavy squats if possible.",
    equipment: ["air bike"],
    difficulty: "advanced",
    primaryMuscles: ["cardiovascular system", "legs"],
    secondaryMuscles: ["arms", "core"],
    sortOrder: 6,
  },
  {
    muscleGroup: "cardio",
    slug: "swim-easy",
    title: "Easy Swim Continuous",
    excerpt:
      "Joint-friendly aerobic work—continuous easy laps or unbroken time in the pool.",
    quickAnswer:
      "Swim at a pace you can sustain with rhythmic breathing for 10–30 minutes. Focus on relaxed strokes, not race speed.",
    bodyHtml: p(
      "If you have access to a pool, easy swimming is elite recovery-cardio: heart work without pounding. Technique matters—less splash, more glide.",
    ),
    formCues: [
      "Long, relaxed strokes",
      "Exhale in the water; don't panic-breathe",
      "Consistent easy effort",
    ],
    commonMistakes: [
      "Only swimming all-out intervals",
      "Poor breathing leading to early panic",
      "Skipping a light warm-up on deck",
    ],
    programmingNotes:
      "1–3×/week as easy aerobic. Combine with gym work on separate sessions when possible.",
    equipment: ["pool"],
    difficulty: "beginner",
    primaryMuscles: ["cardiovascular system", "lats", "shoulders"],
    secondaryMuscles: ["core", "legs"],
    sortOrder: 7,
  },
];

const RECIPES: SeedRecipe[] = [
  {
    slug: "paneer-bhurji-high-protein",
    title: "High-Protein Paneer Bhurji",
    excerpt:
      "Spiced scrambled paneer with peas and onions—fast, desi, and protein-dense.",
    quickAnswer:
      "Crumble 200g paneer into a masala of onion, tomato, turmeric, and cumin. Soft-scramble 5–7 minutes. ~35–40g protein per serving.",
    bodyHtml: p(
      "Paneer bhurji is weeknight gold: one pan, familiar flavors, and enough protein to actually move the needle. Pair with two rotis or a cup of rice depending on your calorie target.",
      "If you're cutting, go heavier on paneer and veggies and lighter on oil—one tablespoon is plenty when the pan is hot.",
    ),
    ingredients: [
      "200g paneer, crumbled",
      "1 small onion, chopped",
      "1 tomato, chopped",
      "1/2 cup green peas (optional)",
      "1 tsp cumin seeds",
      "1/2 tsp turmeric, chili to taste",
      "1 tbsp oil or ghee",
      "Salt, coriander leaves",
    ],
    steps: [
      "Heat oil, crackle cumin, sauté onion until soft.",
      "Add tomato and spices; cook until pulpy.",
      "Stir in peas, then paneer. Scramble 5–7 minutes.",
      "Finish with coriander. Serve hot.",
    ],
    calories: 420,
    proteinG: 38,
    carbsG: 14,
    fatG: 26,
    cuisineTags: ["indian", "vegetarian", "high-protein"],
    mealType: "lunch-dinner",
    sortOrder: 1,
  },
  {
    slug: "dal-rice-protein-plate",
    title: "Dal-Rice Protein Plate",
    excerpt:
      "Comfort dal tadka with measured rice and a side of curd for a complete plate.",
    quickAnswer:
      "Cook moong or masoor dal with a simple tadka. Serve with 150–200g cooked rice and 100g curd. Add a salad for volume.",
    bodyHtml: p(
      "Dal-rice isn't 'incomplete' if you portion it intentionally. Lentils bring protein and fiber; rice brings training fuel; curd adds another protein bump and makes the meal satisfying.",
      "This is the plate I recommend to busy clients who refuse complicated meal prep—because they will actually eat it.",
    ),
    ingredients: [
      "1 cup cooked masoor/moong dal",
      "150–200g cooked rice",
      "100g low-fat curd",
      "Tadka: 1 tsp ghee, cumin, garlic, chili",
      "Cucumber-tomato salad",
    ],
    steps: [
      "Pressure-cook dal with turmeric and salt until soft.",
      "Prepare a quick tadka and pour over dal.",
      "Plate rice, dal, curd, and salad.",
    ],
    calories: 520,
    proteinG: 28,
    carbsG: 78,
    fatG: 10,
    cuisineTags: ["indian", "vegetarian"],
    mealType: "lunch-dinner",
    sortOrder: 2,
  },
  {
    slug: "egg-bhurji-roti",
    title: "Egg Bhurji with Roti",
    excerpt:
      "Masala scrambled eggs with two rotis—cheap, fast muscle-building food.",
    quickAnswer:
      "Scramble 3 eggs with onion-tomato masala. Eat with 2 rotis and a spoon of pickle if you like heat.",
    bodyHtml: p(
      "Eggs remain one of the best protein-per-rupee options in Indian kitchens. Bhurji beats boiled eggs for adherence because it tastes like dinner, not homework.",
    ),
    ingredients: [
      "3 eggs",
      "1/2 onion, 1 tomato",
      "Green chili, turmeric, salt",
      "1 tsp oil",
      "2 whole-wheat rotis",
    ],
    steps: [
      "Sauté onion and tomato with spices.",
      "Add beaten eggs; scramble soft.",
      "Serve with hot rotis.",
    ],
    calories: 480,
    proteinG: 28,
    carbsG: 42,
    fatG: 20,
    cuisineTags: ["indian", "high-protein"],
    mealType: "breakfast-dinner",
    sortOrder: 3,
  },
  {
    slug: "greek-yogurt-fruit-bowl",
    title: "Greek Yogurt Protein Bowl",
    excerpt:
      "Thick yogurt, fruit, and a crunch topping—breakfast or post-workout snack.",
    quickAnswer:
      "Bowl 200–250g Greek yogurt (or hung curd), add fruit, 1 tsp honey if needed, and a sprinkle of nuts/seeds.",
    bodyHtml: p(
      "If commercial Greek yogurt is pricey, hung curd is the homegrown twin. Strain regular curd 1–2 hours and you're most of the way there.",
    ),
    ingredients: [
      "250g Greek yogurt or hung curd",
      "1 cup mixed fruit",
      "1 tbsp roasted peanuts or seeds",
      "Optional: 1 tsp honey",
    ],
    steps: [
      "Add yogurt to a bowl.",
      "Top with fruit and crunch.",
      "Drizzle honey only if you need the carbs/palate.",
    ],
    calories: 320,
    proteinG: 30,
    carbsG: 28,
    fatG: 10,
    cuisineTags: ["high-protein", "vegetarian"],
    mealType: "breakfast-snack",
    sortOrder: 4,
  },
  {
    slug: "chicken-stir-fry-veggies",
    title: "Chicken Stir-Fry with Veggies",
    excerpt:
      "Lean chicken and mixed vegetables in a light soy-garlic sauce over rice or millet.",
    quickAnswer:
      "Stir-fry 150–180g chicken pieces with mixed veggies, garlic, and light soy. Serve with 150g cooked rice or foxtail millet.",
    bodyHtml: p(
      "This is the template meal: protein + volume vegetables + controlled carbs. Swap chicken for tofu or paneer if you don't eat meat.",
    ),
    ingredients: [
      "170g chicken breast, sliced",
      "2 cups mixed vegetables",
      "2 garlic cloves",
      "1 tbsp light soy sauce",
      "1 tsp oil",
      "150g cooked rice (optional)",
    ],
    steps: [
      "Sear chicken in a hot pan; set aside.",
      "Stir-fry veggies and garlic.",
      "Return chicken, add soy, toss, serve.",
    ],
    calories: 450,
    proteinG: 42,
    carbsG: 40,
    fatG: 10,
    cuisineTags: ["high-protein"],
    mealType: "lunch-dinner",
    sortOrder: 5,
  },
  {
    slug: "moong-chilla-stack",
    title: "Moong Dal Chilla Stack",
    excerpt:
      "Savory lentil pancakes stuffed with paneer or veggies—protein breakfast hero.",
    quickAnswer:
      "Blend soaked moong dal into a batter, cook like pancakes, fill with paneer bhurji or veggies. Two chillas make a solid meal.",
    bodyHtml: p(
      "Chillas are underrated meal-prep: batter lasts in the fridge, and cooking takes minutes. Great for people who are bored of eggs but still need morning protein.",
    ),
    ingredients: [
      "1 cup soaked moong dal (batter)",
      "Spices: cumin, chili, salt",
      "100g paneer crumb or veggie mix for filling",
      "1 tsp oil for cooking",
    ],
    steps: [
      "Blend dal with water and spices to a pourable batter.",
      "Cook thin chillas on a tawa.",
      "Add filling, fold, serve with mint chutney.",
    ],
    calories: 400,
    proteinG: 32,
    carbsG: 36,
    fatG: 12,
    cuisineTags: ["indian", "vegetarian", "high-protein"],
    mealType: "breakfast",
    sortOrder: 6,
  },
  {
    slug: "sprout-chaat-bowl",
    title: "Sprout Chaat Bowl",
    excerpt:
      "Crunchy moong sprouts chaat with onion, tomato, lemon, and sev sparingly.",
    quickAnswer:
      "Toss 1.5–2 cups sprouted moong with onion, tomato, cucumber, lemon, chaat masala, and a few roasted peanuts.",
    bodyHtml: p(
      "Sprout chaat is how you get fiber and plant protein without feeling like you're on a 'diet.' Go easy on fried sev if fat loss is the goal.",
    ),
    ingredients: [
      "2 cups sprouted moong",
      "Onion, tomato, cucumber",
      "Lemon, chaat masala, salt",
      "1 tbsp roasted peanuts",
      "Optional: 1 tbsp curd",
    ],
    steps: [
      "Chop veggies.",
      "Toss with sprouts, lemon, and spices.",
      "Top with peanuts (and curd if using).",
    ],
    calories: 280,
    proteinG: 20,
    carbsG: 36,
    fatG: 6,
    cuisineTags: ["indian", "vegetarian", "high-fiber"],
    mealType: "snack-lunch",
    sortOrder: 7,
  },
  {
    slug: "peanut-chikki-protein-snack",
    title: "Peanut Jaggery Energy Bites",
    excerpt:
      "Homemade peanut-jaggery bites for training snacks—portion consciously.",
    quickAnswer:
      "Melt jaggery, mix roasted peanuts, set in a tray, cut into small squares. One or two pieces is a snack—not the whole tray.",
    bodyHtml: p(
      "Chikki energy is real—and so is the calorie density. I like these around training when carbs + fats + a bit of protein help, not as mindless desk grazing.",
    ),
    ingredients: [
      "1 cup roasted peanuts",
      "1/2 cup jaggery",
      "Optional: pinch of cardamom",
    ],
    steps: [
      "Melt jaggery with a splash of water to a soft-ball stage.",
      "Mix peanuts quickly.",
      "Press into a tray, cool, cut small pieces.",
    ],
    calories: 180,
    proteinG: 6,
    carbsG: 16,
    fatG: 11,
    cuisineTags: ["indian", "snack"],
    mealType: "snack",
    sortOrder: 8,
  },
];

const KNOWLEDGE_PAGES: SeedPage[] = [
  {
    section: "programs",
    slug: KNOWLEDGE_HUB_SLUG,
    title: "Training Programs",
    excerpt:
      "Simple, progressive plans you can actually stick to—built like a coach who has seen busy calendars wreck perfect spreadsheets.",
    bodyHtml: p(
      "Programs here are templates, not commandments. Adjust volume for your recovery, sleep, and life stress. The best program is the one you'll train for the next 12 weeks.",
      "Educational only—not medical advice. If you have pain or a clinical condition, get cleared by a qualified professional before hard training.",
    ),
    sortOrder: 0,
  },
  {
    section: "programs",
    slug: "beginner-3-day-full-body",
    title: "Beginner 3-Day Full Body",
    excerpt:
      "Three full-body sessions per week with squats, hinges, pushes, and pulls—perfect for the first 8–12 weeks.",
    bodyHtml: p(
      "<strong>Who it's for:</strong> New lifters, returners after a long break, or anyone who can only train three days.",
      "<strong>Weekly layout:</strong> Day A / rest / Day B / rest / Day C / rest / rest (or light walk).",
      "<strong>Day A:</strong> Squat pattern · Bench or push-ups · Row · Plank · Easy incline walk 10–15 min.",
      "<strong>Day B:</strong> Hinge (RDL) · Overhead or dumbbell press · Lat pulldown/pull-up regress · Side plank · Optional curls/triceps.",
      "<strong>Day C:</strong> Lunge or split squat · Incline press · Seated row · Face pulls · Farmer carries.",
      "Start with 2–3 sets of 8–12. Add a rep or a small load when all sets feel controlled. Missed a day? Do the next session—don't 'make up' by doubling volume.",
    ),
    sortOrder: 1,
  },
  {
    section: "programs",
    slug: "upper-lower-4-day",
    title: "Upper / Lower 4-Day Split",
    excerpt:
      "Four days for intermediate lifters who recover well and want more weekly volume per muscle.",
    bodyHtml: p(
      "<strong>Schedule example:</strong> Upper / Lower / rest / Upper / Lower / rest / rest.",
      "<strong>Upper days:</strong> Horizontal press · Vertical press or raise work · Horizontal pull · Vertical pull · Arms accessory · Face pulls.",
      "<strong>Lower days:</strong> Squat or leg press · Hinge · Lunge/split squat · Leg curl · Calves · Core anti-extension.",
      "Keep 1–3 reps in reserve on most sets. If sleep tanks for a week, cut accessories first—not your main compounds.",
    ),
    sortOrder: 2,
  },
  {
    section: "programs",
    slug: "return-to-gym-week",
    title: "Return-to-Gym Reboot (7 Days)",
    excerpt:
      "A gentle week to rebuild the habit after travel, illness, or a long break—without ego loading.",
    bodyHtml: p(
      "Day 1–2: Full-body light technique (RPE 5–6), walks. Day 3: Rest or yoga/mobility. Day 4: Upper focus light. Day 5: Lower focus light. Day 6: Easy conditioning. Day 7: Rest.",
      "Leave the gym wanting a little more. The win is showing up with quality—not matching your old PRs on day one.",
    ),
    sortOrder: 3,
  },
  {
    section: "programs",
    slug: "home-minimal-equipment",
    title: "Home Minimal-Equipment Plan",
    excerpt:
      "Push-ups, rows (bag/bands), hinges, squats, and carries—train hard without a full gym.",
    bodyHtml: p(
      "Three days: Push-pull-legs style full body. Use a backpack for load, a towel for isometric rows if needed, and a chair for split squats.",
      "Progress by adding reps, slowing eccentrics, elevating feet on push-ups, or adding household load. Consistency beats fancy gear.",
    ),
    sortOrder: 4,
  },
  {
    section: "reviews",
    slug: KNOWLEDGE_HUB_SLUG,
    title: "Buyer's Guides & Reviews",
    excerpt:
      "How to judge fitness products without falling for label hype—evidence-oriented, coach-practical.",
    bodyHtml: p(
      "These pages teach you how to evaluate products. We focus on criteria, red flags, and tradeoffs—not hype cycles. Educational content only; we don't prescribe supplements as medicine.",
    ),
    sortOrder: 0,
  },
  {
    section: "reviews",
    slug: "how-to-choose-protein-powder",
    title: "How to Choose a Protein Powder",
    excerpt:
      "Protein per scoop, ingredients you actually need, digestion comfort, and when powder even makes sense.",
    bodyHtml: p(
      "Food first. Powder is a convenience tool for hitting protein when appetite, schedule, or travel get in the way.",
      "<strong>Check:</strong> protein per serving (often 20–25g+), short ingredient lists, sweetener tolerance, and third-party testing when possible.",
      "<strong>Red flags:</strong> proprietary blends that hide doses, miracle fat-loss claims, and 'hormone' drama marketing.",
      "Whey isolate suits many lactose-sensitive folks; plant blends work if you match amino profile and total protein. Taste is adherence—pick what you'll use.",
    ),
    sortOrder: 1,
  },
  {
    section: "reviews",
    slug: "how-to-choose-training-shoes",
    title: "How to Choose Training Shoes",
    excerpt:
      "Flat and stable for lifting, cushioned for running—don't force one shoe to do every job forever.",
    bodyHtml: p(
      "For barbell work, a firm, low-stack shoe (or dedicated lifter) beats a soft running shoe that squishes under load. For zone-2 walks and runs, cushioning and fit matter more.",
      "Try shoes later in the day when feet are slightly swollen. If you pronate heavily or have pain history, a specialist fitting beats influencer lists.",
    ),
    sortOrder: 2,
  },
  {
    section: "reviews",
    slug: "lifting-belt-when-and-why",
    title: "Lifting Belts: When They Help",
    excerpt:
      "Belts can improve bracing on heavy compounds—they are not a substitute for core training or good technique.",
    bodyHtml: p(
      "Use a belt for hard sets on squats, deadlifts, and overhead work once your bracing basics exist. Breathe into the belt 360°, don't just suck in and cinch.",
      "Skip living in a belt for every warm-up set and curl. Train your trunk; use the belt as a tool, not a crutch.",
    ),
    sortOrder: 3,
  },
];

async function upsertExercise(ex: SeedExercise): Promise<void> {
  await pool.query(
    `INSERT INTO exercises (
      muscle_group, slug, title, excerpt, quick_answer, body_html,
      form_cues, common_mistakes, programming_notes, equipment, difficulty,
      primary_muscles, secondary_muscles, meta_title, meta_description,
      status, robots_index, sort_order, published_at
    ) VALUES (
      $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,
      'published', TRUE, $16, NOW()
    )
    ON CONFLICT (muscle_group, slug) DO UPDATE SET
      title = EXCLUDED.title,
      excerpt = EXCLUDED.excerpt,
      quick_answer = EXCLUDED.quick_answer,
      body_html = EXCLUDED.body_html,
      form_cues = EXCLUDED.form_cues,
      common_mistakes = EXCLUDED.common_mistakes,
      programming_notes = EXCLUDED.programming_notes,
      equipment = EXCLUDED.equipment,
      difficulty = EXCLUDED.difficulty,
      primary_muscles = EXCLUDED.primary_muscles,
      secondary_muscles = EXCLUDED.secondary_muscles,
      meta_title = EXCLUDED.meta_title,
      meta_description = EXCLUDED.meta_description,
      status = 'published',
      robots_index = TRUE,
      sort_order = EXCLUDED.sort_order,
      published_at = COALESCE(exercises.published_at, NOW()),
      updated_at = NOW()`,
    [
      ex.muscleGroup,
      ex.slug,
      ex.title,
      ex.excerpt,
      ex.quickAnswer,
      ex.bodyHtml,
      ex.formCues,
      ex.commonMistakes,
      ex.programmingNotes,
      ex.equipment,
      ex.difficulty,
      ex.primaryMuscles,
      ex.secondaryMuscles,
      `${ex.title} — Form, Cues & Programming | fitlives`,
      ex.excerpt,
      ex.sortOrder,
    ],
  );
}

async function upsertRecipe(r: SeedRecipe): Promise<void> {
  await pool.query(
    `INSERT INTO recipes (
      slug, title, excerpt, quick_answer, body_html, ingredients, steps,
      calories, protein_g, carbs_g, fat_g, cuisine_tags, meal_type,
      meta_title, meta_description, status, robots_index, sort_order, published_at
    ) VALUES (
      $1,$2,$3,$4,$5,$6::jsonb,$7::jsonb,$8,$9,$10,$11,$12,$13,$14,$15,
      'published', TRUE, $16, NOW()
    )
    ON CONFLICT (slug) DO UPDATE SET
      title = EXCLUDED.title,
      excerpt = EXCLUDED.excerpt,
      quick_answer = EXCLUDED.quick_answer,
      body_html = EXCLUDED.body_html,
      ingredients = EXCLUDED.ingredients,
      steps = EXCLUDED.steps,
      calories = EXCLUDED.calories,
      protein_g = EXCLUDED.protein_g,
      carbs_g = EXCLUDED.carbs_g,
      fat_g = EXCLUDED.fat_g,
      cuisine_tags = EXCLUDED.cuisine_tags,
      meal_type = EXCLUDED.meal_type,
      meta_title = EXCLUDED.meta_title,
      meta_description = EXCLUDED.meta_description,
      status = 'published',
      robots_index = TRUE,
      sort_order = EXCLUDED.sort_order,
      published_at = COALESCE(recipes.published_at, NOW()),
      updated_at = NOW()`,
    [
      r.slug,
      r.title,
      r.excerpt,
      r.quickAnswer,
      r.bodyHtml,
      JSON.stringify(r.ingredients),
      JSON.stringify(r.steps),
      r.calories,
      r.proteinG,
      r.carbsG,
      r.fatG,
      r.cuisineTags,
      r.mealType,
      `${r.title} | fitlives Recipes`,
      r.excerpt,
      r.sortOrder,
    ],
  );
}

async function upsertKnowledgePage(page: SeedPage): Promise<void> {
  await pool.query(
    `INSERT INTO knowledge_pages (
      section, slug, title, excerpt, body_html,
      meta_title, meta_description, status, robots_index, sort_order, published_at
    ) VALUES (
      $1,$2,$3,$4,$5,$6,$7,'published', TRUE, $8, NOW()
    )
    ON CONFLICT (section, slug) DO UPDATE SET
      title = EXCLUDED.title,
      excerpt = EXCLUDED.excerpt,
      body_html = EXCLUDED.body_html,
      meta_title = EXCLUDED.meta_title,
      meta_description = EXCLUDED.meta_description,
      status = 'published',
      robots_index = TRUE,
      sort_order = EXCLUDED.sort_order,
      published_at = COALESCE(knowledge_pages.published_at, NOW()),
      updated_at = NOW()`,
    [
      page.section,
      page.slug,
      page.title,
      page.excerpt,
      page.bodyHtml,
      `${page.title} | fitlives`,
      page.excerpt,
      page.sortOrder,
    ],
  );
}

/** Idempotent seed of exercises, recipes, and knowledge pages. */
export async function seedKnowledgeContent(): Promise<void> {
  for (const ex of EXERCISES) {
    await upsertExercise(ex);
  }
  for (const recipe of RECIPES) {
    await upsertRecipe(recipe);
  }
  for (const page of KNOWLEDGE_PAGES) {
    await upsertKnowledgePage(page);
  }
  console.log(
    `[db] knowledge seed: ${EXERCISES.length} exercises, ${RECIPES.length} recipes, ${KNOWLEDGE_PAGES.length} knowledge pages`,
  );
}
