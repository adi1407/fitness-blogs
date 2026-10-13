import { KNOWLEDGE_HUB_SLUG } from "../../constants/knowledgeContent";
import { TRAINING_LINK } from "./exerciseGuide";

/** Long-form bodies for `/programs` pages, keyed by slug (`KNOWLEDGE_HUB_SLUG` = hub). */

export const a = (href: string, text: string) => `<a href="${href}">${text}</a>`;
export const h2 = (t: string) => `<h2>${t}</h2>`;
export const h3 = (t: string) => `<h3>${t}</h3>`;
export const p = (...paras: string[]) => paras.map((t) => `<p>${t}</p>`).join("");
export const ul = (items: string[]) => `<ul>${items.map((i) => `<li>${i}</li>`).join("")}</ul>`;
export const table = (headers: string[], rows: string[][]) =>
  `<table><thead><tr>${headers.map((h) => `<th>${h}</th>`).join("")}</tr></thead><tbody>${rows
    .map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join("")}</tr>`)
    .join("")}</tbody></table>`;
export const faq = (items: { q: string; a: string }[]) =>
  [h2("FAQ"), ...items.map((f) => `${h3(f.q)}<p>${f.a}</p>`)].join("");

const ex = (path: string, name: string) => a(`/exercises/${path}`, name);
const WORKOUT_HEADERS = ["Exercise", "Sets × reps", "Rest", "Notes"];

const PROGRAM = (slug: string, name: string) => a(`/programs/${slug}`, name);

const RECOVERY = p(
  `<strong>Food and sleep decide most of your results.</strong> Eat enough protein every day — see ${a(TRAINING_LINK.protein, "how much protein you need to build muscle")} — and aim for 7–9 hours of sleep. If you're new to planning meals around training, start with the ${a(TRAINING_LINK.gymDiet, "beginner gym diet plan")}.`,
  `On rest days, a 20–40 minute walk helps recovery and adds to your daily activity without affecting the next session.`,
);

const HUB = [
  p(
    "These programs are templates you can follow as written or adjust to your schedule. Each one lists exact exercises, sets, reps and rest times, and explains how to progress week by week. Pick the one that matches the number of days you can train consistently — not the one that looks most impressive.",
  ),
  h2("Which program should you choose?"),
  table(
    ["Your situation", "Days per week", "Start with"],
    [
      ["New to lifting, or back after 6+ months off", "3", PROGRAM("beginner-3-day-full-body", "Beginner 3-day full body")],
      ["Training 6+ months and recovering well", "4", PROGRAM("upper-lower-4-day", "Upper / lower 4-day split")],
      ["Back after illness, travel or a 2–6 week break", "4–5 light days", PROGRAM("return-to-gym-week", "Return-to-gym reboot")],
      ["No gym — bodyweight, a backpack and bands", "3", PROGRAM("home-minimal-equipment", "Home minimal-equipment plan")],
    ],
  ),
  h2("What every program here has in common"),
  ul([
    `<strong>Progressive overload.</strong> You add reps first, then weight. Without it, no program works — read ${a(TRAINING_LINK.overload, "what progressive overload is")}.`,
    "<strong>Compound lifts first.</strong> Squats, hinges, presses and rows come at the start of each session when you're freshest.",
    "<strong>Reps in reserve.</strong> Most sets end with 1–3 reps left in the tank. Training to failure every set adds fatigue faster than results.",
    "<strong>Realistic volume.</strong> Roughly 10–20 hard sets per muscle per week for most people, less when starting out.",
  ]),
  h2("How to run a program"),
  p(
    "Follow one program for at least 8–12 weeks before judging it. Write down every set — the weight and the reps — so you know exactly what to beat next time. If you miss a session, do the next one in order rather than doubling up. Change exercises only when one causes pain or you can no longer progress it for several weeks.",
    `Expect visible changes to take months rather than weeks — see ${a(TRAINING_LINK.timeline, "how long it takes to build muscle")}. For exercise technique, every movement in these plans links to a step-by-step guide in our ${a("/exercises", "exercise library")}.`,
  ),
  p(
    "Educational only — not medical advice. If you have pain, an injury or a medical condition, get cleared by a qualified professional before starting a new training program.",
  ),
].join("");

const BEGINNER = [
  h2("Who this program is for"),
  p(
    "This plan suits people in their first year of lifting, people returning after a long break, and anyone who can reliably train only three days a week. Each session trains the whole body, so every muscle gets worked three times a week — the frequency that tends to work best for learning technique and gaining early strength.",
  ),
  h2("Weekly schedule"),
  table(
    ["Day", "Session"],
    [
      ["Monday", "Workout A"],
      ["Tuesday", "Rest or a 30-minute walk"],
      ["Wednesday", "Workout B"],
      ["Thursday", "Rest or a 30-minute walk"],
      ["Friday", "Workout C"],
      ["Saturday–Sunday", "Rest, walking or sport"],
    ],
  ),
  p("Any three non-consecutive days work — Tuesday, Thursday and Saturday is fine. Each session takes 45–60 minutes."),
  h2("Warm-up (every session, 8–10 minutes)"),
  p(
    "Do 5 minutes of easy cardio, then 2–3 lighter warm-up sets of your first exercise — for example, an empty bar for 10 reps, then about 50% and 75% of your working weight for 5 and 3 reps.",
  ),
  h2("Workout A"),
  table(WORKOUT_HEADERS, [
    [ex("legs/back-squat", "Back squat") + " (or goblet squat)", "3 × 8–10", "2–3 min", "Main lift — add weight when all sets hit 10"],
    [ex("chest/barbell-bench-press", "Bench press") + " or " + ex("chest/push-ups", "push-ups"), "3 × 8–10", "2 min", "Shoulder blades pulled back"],
    [ex("back/seated-cable-row", "Seated cable row"), "3 × 10–12", "90 s", "Pause with elbows back"],
    [ex("core/plank", "Plank"), "3 × 30–45 s", "60 s", "Squeeze glutes, ribs down"],
  ]),
  h2("Workout B"),
  table(WORKOUT_HEADERS, [
    [ex("legs/romanian-deadlift", "Romanian deadlift"), "3 × 8–10", "2–3 min", "Hips back, flat back"],
    [ex("shoulders/dumbbell-shoulder-press", "Dumbbell shoulder press"), "3 × 8–12", "2 min", "Ribs down, no arching"],
    [ex("back/lat-pulldown", "Lat pulldown"), "3 × 10–12", "90 s", "Pull elbows to your sides"],
    [ex("core/side-plank", "Side plank"), "2 × 20–30 s each side", "45 s", "Straight line head to heels"],
    [ex("arms/barbell-curl", "Curls") + " and " + ex("arms/triceps-pushdown", "pushdowns"), "2 × 12–15 each", "60 s", "Optional"],
  ]),
  h2("Workout C"),
  table(WORKOUT_HEADERS, [
    [ex("legs/bulgarian-split-squat", "Split squat"), "3 × 8–10 each leg", "90 s", "Hold dumbbells when bodyweight is easy"],
    [ex("chest/incline-dumbbell-press", "Incline dumbbell press"), "3 × 8–12", "2 min", "Low incline, 15–30°"],
    [ex("back/single-arm-dumbbell-row", "Single-arm dumbbell row"), "3 × 10–12 each", "90 s", "No twisting"],
    [ex("back/face-pull", "Face pull"), "2 × 15", "60 s", "Shoulder health"],
    [ex("cardio/farmer-carry", "Farmer carry"), "3 × 30–40 m", "60 s", "Tall posture, slow steps"],
  ]),
  h2("How to progress"),
  p(
    `Use <strong>double progression</strong>. Pick a weight you can lift for the bottom of the rep range with good form. Each session, try to add a rep or two. When every set reaches the top of the range, add the smallest weight jump available — about 2.5 kg on lower-body lifts and 1–2.5 kg on upper-body lifts — and work back up. This is the simplest form of ${a(TRAINING_LINK.overload, "progressive overload")}.`,
  ),
  table(
    ["Weeks", "Focus", "Effort"],
    [
      ["1–2", "Learn technique, find starting weights", "Stop 3–4 reps before failure"],
      ["3–8", "Add reps, then weight, every week or two", "Stop 2–3 reps before failure"],
      ["9–12", "Keep progressing; add a 4th set on squats and presses if recovering well", "Stop 1–2 reps before failure"],
    ],
  ),
  h2("Missed sessions and plateaus"),
  p(
    "If you miss a day, do the next workout in order — don't try to fit two sessions into one. If a lift stalls for three sessions in a row, reduce the weight by about 10% and build back up. If everything feels heavy and sleep is poor, take an easy week at about half the sets.",
  ),
  h2("Tracking your workouts"),
  p(
    "Write down the exercise, weight and reps for every working set — in a notebook or a notes app. Before each session, look at what you did last time and aim to beat it by one rep or a small amount of weight on at least one exercise. Without a log, most people end up lifting the same weights for months.",
  ),
  h2("Common beginner mistakes"),
  ul([
    "<strong>Starting too heavy.</strong> Your first two weeks should feel easy. Technique learned with light weights carries over to heavy ones.",
    "<strong>Changing the program every few weeks.</strong> Progress comes from repeating the same lifts and slowly adding weight.",
    "<strong>Skipping the lower body.</strong> Squats and hinges build the most muscle per session — don't swap them for extra arm work.",
    "<strong>Rushing rest periods.</strong> Rest 2–3 minutes on the main lifts so you can repeat your best effort.",
    "<strong>Not eating enough.</strong> Beginners can build muscle quickly, but only with enough protein and calories.",
  ]),
  h2("Recovery and nutrition"),
  RECOVERY,
  h2("When to move on"),
  p(
    `After 3–6 months, when progress slows even with good sleep and food, you're ready for more weekly volume. The natural next step is the ${PROGRAM("upper-lower-4-day", "upper / lower 4-day split")}.`,
  ),
  faq([
    { q: "Can I add more exercises?", a: "Keep the plan as written for the first 4–6 weeks. After that, adding 2–3 sets of arms or calves at the end of a session is fine if you're recovering well." },
    { q: "Can I do cardio on this plan?", a: "Yes. Walking on rest days or 15–20 minutes of easy cardio after lifting won't interfere with progress for most people." },
    { q: "What if my gym doesn't have a squat rack?", a: "Use goblet squats with a dumbbell, or the leg press. Both train the same muscles; just keep adding reps and weight over time." },
  ]),
].join("");

const UPPER_LOWER = [
  h2("Who this program is for"),
  p(
    "This split suits lifters with at least 6 months of consistent training who can train four days a week and recover well. Splitting the body into upper and lower days lets you do more sets per muscle while each muscle still gets trained twice a week.",
  ),
  h2("Weekly schedule"),
  table(
    ["Day", "Session"],
    [
      ["Monday", "Upper A (strength focus)"],
      ["Tuesday", "Lower A (strength focus)"],
      ["Wednesday", "Rest or walking"],
      ["Thursday", "Upper B (volume focus)"],
      ["Friday", "Lower B (volume focus)"],
      ["Saturday–Sunday", "Rest, walking or sport"],
    ],
  ),
  p("Sessions take 60–75 minutes including warm-ups. The A days use heavier weights and lower reps; the B days use moderate weights and higher reps."),
  h2("Upper A"),
  table(WORKOUT_HEADERS, [
    [ex("chest/barbell-bench-press", "Bench press"), "4 × 5–7", "3 min", "Main press"],
    [ex("back/barbell-row", "Barbell row"), "4 × 6–8", "2–3 min", "Flat back, pull to lower ribs"],
    [ex("shoulders/overhead-press", "Overhead press"), "3 × 6–8", "2–3 min", "Glutes tight"],
    [ex("back/pull-up", "Pull-ups") + " or " + ex("back/lat-pulldown", "pulldown"), "3 × 6–10", "2 min", "Full hang to chin over bar"],
    [ex("arms/skull-crusher", "Skull crusher"), "2 × 8–12", "90 s", "Elbows stay pointed up"],
    [ex("arms/hammer-curl", "Hammer curl"), "2 × 10–12", "90 s", "No swinging"],
  ]),
  h2("Lower A"),
  table(WORKOUT_HEADERS, [
    [ex("legs/back-squat", "Back squat"), "4 × 5–7", "3 min", "Main lift"],
    [ex("legs/romanian-deadlift", "Romanian deadlift"), "3 × 6–8", "2–3 min", "Stretch the hamstrings"],
    [ex("legs/walking-lunge", "Walking lunge"), "3 × 8–10 each leg", "2 min", "Long steps"],
    [ex("legs/standing-calf-raise", "Standing calf raise"), "3 × 8–12", "90 s", "Pause at the bottom"],
    [ex("core/ab-wheel-rollout", "Ab wheel rollout"), "3 × 6–10", "90 s", "Ribs down"],
  ]),
  h2("Upper B"),
  table(WORKOUT_HEADERS, [
    [ex("chest/incline-dumbbell-press", "Incline dumbbell press"), "3 × 8–12", "2 min", "Controlled lowering"],
    [ex("back/seated-cable-row", "Seated cable row"), "3 × 10–12", "90 s", "Pause at the chest"],
    [ex("shoulders/lateral-raise", "Lateral raise"), "3 × 12–20", "60 s", "Light, strict"],
    [ex("back/lat-pulldown", "Lat pulldown"), "3 × 10–12", "90 s", "Full stretch at the top"],
    [ex("chest/cable-chest-fly", "Cable chest fly"), "2 × 12–15", "60 s", "Soft elbows"],
    [ex("back/face-pull", "Face pull"), "2 × 15–20", "60 s", "Shoulder health"],
  ]),
  h2("Lower B"),
  table(WORKOUT_HEADERS, [
    [ex("legs/leg-press", "Leg press"), "3 × 10–12", "2 min", "Full depth you can control"],
    [ex("legs/bulgarian-split-squat", "Bulgarian split squat"), "3 × 8–12 each leg", "90 s", "Torso slightly forward for glutes"],
    [ex("legs/leg-curl", "Leg curl"), "3 × 10–15", "90 s", "Slow lowering"],
    [ex("legs/leg-extension", "Leg extension"), "2 × 12–15", "60 s", "Squeeze at the top"],
    [ex("core/hanging-knee-raise", "Hanging knee raise"), "3 × 10–15", "60 s", "No swinging"],
  ]),
  h2("Weekly sets per muscle"),
  table(
    ["Muscle", "Hard sets per week"],
    [
      ["Chest", "12"],
      ["Back", "16"],
      ["Shoulders", "12 (including pressing and raises)"],
      ["Quads", "13"],
      ["Hamstrings and glutes", "12"],
      ["Arms", "4 direct, plus pressing and pulling"],
    ],
  ),
  p("These numbers sit in the middle of the 10–20 sets range that suits most intermediate lifters. Add sets to lagging muscles one or two at a time, not all at once."),
  h2("How to progress"),
  p(
    `On A days, add 2.5 kg to the main lifts whenever you hit the top of the rep range on every set. On B days, use double progression — add reps, then weight. Keep 1–3 reps in reserve on most sets and go closer to failure only on the last set of isolation exercises. Read more about ${a(TRAINING_LINK.overload, "progressive overload")}.`,
  ),
  table(
    ["Weeks", "Plan"],
    [
      ["1–4", "Build up: add reps or weight each week"],
      ["5", "Deload: same weights, about half the sets"],
      ["6–9", "Build up again from slightly higher starting weights"],
      ["10", "Deload, then reassess exercise choices"],
    ],
  ),
  h2("Exercise substitutions"),
  table(
    ["If you can't do…", "Use instead", "Why"],
    [
      ["Back squat", ex("legs/leg-press", "Leg press") + " or goblet squat", "Same muscles, less back loading"],
      ["Barbell row", ex("back/single-arm-dumbbell-row", "Dumbbell row") + " or " + ex("back/seated-cable-row", "cable row"), "Easier on the lower back"],
      ["Overhead press", ex("shoulders/dumbbell-shoulder-press", "Dumbbell shoulder press"), "More shoulder-friendly path"],
      ["Pull-ups", ex("back/lat-pulldown", "Lat pulldown"), "Adjustable load"],
      ["Bench press", ex("chest/machine-chest-press", "Machine chest press") + " or dumbbell press", "No spotter needed"],
    ],
  ),
  h2("Common mistakes on this split"),
  ul([
    "<strong>Treating every set as a max.</strong> The B days are for quality volume — save the heavy efforts for the A days.",
    "<strong>Adding too many extras.</strong> More exercises rarely help if you're not progressing the ones already in the plan.",
    "<strong>Skipping deloads.</strong> A planned easy week every 4–6 weeks lets fatigue drop so you can keep progressing.",
    "<strong>Short-changing lower days.</strong> Leg sessions are hard; resist the urge to cut them short or skip them.",
  ]),
  h2("Adjusting for busy weeks"),
  p(
    "If sleep drops or work gets heavy, cut the accessory exercises first and keep the first two lifts of each day. If you can only train three days in a week, rotate the sessions in order — the week simply runs into the next.",
  ),
  h2("Recovery and nutrition"),
  RECOVERY,
  faq([
    { q: "Is upper / lower better than a bro split?", a: "For most people, training each muscle twice a week works better than once. Upper / lower achieves this in four days, which a one-muscle-per-day split can't." },
    { q: "Can I train five days?", a: "You can repeat Upper A on the fifth day, but only if you're recovering well. Most people progress fine on four days." },
    { q: "Can I use this program to lose fat?", a: "Yes. Keep the program the same and create a calorie deficit through diet. You may progress more slowly on the main lifts, which is normal while dieting." },
  ]),
].join("");

const RETURN_WEEK = [
  h2("Who this plan is for"),
  p(
    "Use this week when you're coming back after 2–6 weeks away — because of travel, exams, a busy period or a minor illness you've fully recovered from. Returning at your old weights straight away often leads to extreme soreness, poor technique or a strain. This plan rebuilds the habit and lets your joints, muscles and heart readjust before you push again.",
    "If you've been ill with a fever, chest infection or anything that affected your heart or lungs, or you're returning from an injury, get advice from a doctor or physiotherapist first.",
  ),
  h2("Effort guide"),
  p(
    "Every session this week uses <strong>RPE 5–6</strong> on a 10-point scale: you finish each set feeling you could have done 4–5 more reps. Use about 50–60% of the weights you used before your break. If you don't remember them, start with weights that feel easy.",
  ),
  h2("The 7-day plan"),
  table(
    ["Day", "Session", "Time"],
    [
      ["1", "Full body A: squat, push-up or bench, row, plank — 2 sets each", "30–40 min"],
      ["2", "Walk 30–40 minutes at a comfortable pace", "30–40 min"],
      ["3", "Full body B: Romanian deadlift, shoulder press, pulldown, side plank — 2 sets each", "30–40 min"],
      ["4", "Rest, or 15–20 minutes of mobility", "—"],
      ["5", "Full body A again — 3 sets each if day 1 felt easy", "40 min"],
      ["6", "Easy cardio: incline walk, bike or swim", "20–30 min"],
      ["7", "Rest", "—"],
    ],
  ),
  h2("Full body A"),
  table(WORKOUT_HEADERS, [
    [ex("legs/back-squat", "Squat") + " (or goblet squat)", "2–3 × 8", "2 min", "Comfortable depth"],
    [ex("chest/push-ups", "Push-ups") + " or " + ex("chest/barbell-bench-press", "bench press"), "2–3 × 8–10", "90 s", "Smooth reps"],
    [ex("back/seated-cable-row", "Seated cable row"), "2–3 × 10", "90 s", "Squeeze at the chest"],
    [ex("core/plank", "Plank"), "2 × 30 s", "60 s", "Easy hold"],
  ]),
  h2("Full body B"),
  table(WORKOUT_HEADERS, [
    [ex("legs/romanian-deadlift", "Romanian deadlift"), "2 × 8", "2 min", "Light, focus on the hinge"],
    [ex("shoulders/dumbbell-shoulder-press", "Dumbbell shoulder press"), "2 × 10", "90 s", "Controlled"],
    [ex("back/lat-pulldown", "Lat pulldown"), "2 × 10", "90 s", "Full range"],
    [ex("core/side-plank", "Side plank"), "2 × 20 s each side", "45 s", "Steady breathing"],
  ]),
  h2("What to expect"),
  ul([
    "<strong>Some soreness is normal</strong> for 1–3 days after the first sessions. It should be less after the second session of each type.",
    "<strong>Strength comes back quickly.</strong> Muscle and strength lost during a short break usually return faster than they were first built.",
    "<strong>Fitness may lag.</strong> Your breathing and heart rate may feel harder than the weights do. Keep cardio easy this week.",
    "<strong>Sharp or joint pain is a stop sign.</strong> Muscle tiredness is fine; sharp, pinching or worsening pain is not.",
  ]),
  h2("Rules for the week"),
  ul([
    "Leave every session feeling you could have done more.",
    "No testing maxes, no sets to failure.",
    "Sleep 7–9 hours and eat normally — this isn't the week to start an aggressive diet.",
    `Walk on most days — even 20–30 minutes helps. See ${a(TRAINING_LINK.walking, "whether walking helps you lose weight")} for why daily steps matter.`,
  ]),
  h2("Common mistakes when returning"),
  ul([
    "<strong>Trying to make up for lost time.</strong> Extra sessions or extra sets in the first week mostly add soreness.",
    "<strong>Testing your old maxes.</strong> Strength returns over 2–3 weeks; testing it on day one is when strains happen.",
    "<strong>Crash dieting at the same time.</strong> Get the training habit back first, then adjust your food.",
    "<strong>Skipping the warm-up.</strong> Your joints need a few extra minutes after time away.",
  ]),
  h2("If you've been away longer"),
  p(
    `After more than 6–8 weeks off, repeat this reboot week, then follow the ${PROGRAM("beginner-3-day-full-body", "beginner 3-day full body")} for a month with weights you can lift comfortably. Treat it as a fresh start — most of your previous strength returns within the first couple of months.`,
  ),
  h2("Recovery and nutrition"),
  RECOVERY,
  h2("Week 2 and beyond"),
  p(
    `In week 2, raise the weights to about 70–80% of your old numbers and go back to your normal sets. By week 3 most people are back to — or close to — their previous training. Then return to your usual plan, or pick the ${PROGRAM("beginner-3-day-full-body", "beginner 3-day full body")} if you've been away for months, or the ${PROGRAM("upper-lower-4-day", "upper / lower 4-day split")} if you were training regularly before.`,
  ),
  faq([
    { q: "How long can I take off before I lose muscle?", a: "Most people keep their muscle through 2–3 weeks off, and much of what's lost after longer breaks returns faster than it was first built. Small strength drops in the first weeks are mostly about skill and the nervous system, not muscle." },
    { q: "Should I return to my old weights immediately?", a: "No. Starting at 50–60% for a week costs you very little and greatly reduces the risk of a strain or extreme soreness." },
    { q: "Can I use this week after an injury?", a: "Only with your physiotherapist's or doctor's approval, and with any exercises they've told you to avoid removed or replaced." },
  ]),
].join("");

const HOME = [
  h2("Who this plan is for"),
  p(
    "This plan is for people who train at home with little or no equipment. Bodyweight exercises can build real muscle and strength as long as you make them harder over time — by adding reps, slowing down the lowering, changing leverage or adding load with a backpack.",
  ),
  h2("Equipment"),
  ul([
    "<strong>Essential:</strong> floor space, a sturdy chair or bench, and a backpack you can fill with books or water bottles.",
    "<strong>Very useful:</strong> a resistance band set and a doorway pull-up bar.",
    "<strong>Optional:</strong> one or two adjustable dumbbells, a jump rope.",
  ]),
  h2("Weekly schedule"),
  table(
    ["Day", "Session"],
    [
      ["Monday", "Day A"],
      ["Wednesday", "Day B"],
      ["Friday", "Day C"],
      ["Other days", "Walking, jump rope or rest"],
    ],
  ),
  h2("Day A"),
  table(WORKOUT_HEADERS, [
    [ex("chest/push-ups", "Push-ups"), "3 × 8–15", "90 s", "Elevate hands to make easier, feet to make harder"],
    ["Backpack squat", "3 × 12–20", "90 s", "Hug the backpack to your chest; see " + ex("legs/back-squat", "squat technique")],
    ["Band or towel row", "3 × 10–15", "90 s", "Squeeze shoulder blades together"],
    [ex("core/dead-bug", "Dead bug"), "3 × 8 each side", "60 s", "Lower back stays on the floor"],
  ]),
  h2("Day B"),
  table(WORKOUT_HEADERS, [
    [ex("legs/bulgarian-split-squat", "Bulgarian split squat") + " (rear foot on chair)", "3 × 8–12 each leg", "90 s", "Hold a backpack when easy"],
    [ex("shoulders/pike-push-up", "Pike push-up"), "3 × 6–12", "90 s", "Hips high, head to the floor between hands"],
    [ex("back/pull-up", "Pull-ups") + " or band pulldown", "3 × max (stop 1–2 short)", "2 min", "Use a band for help"],
    [ex("core/side-plank", "Side plank"), "2 × 30 s each side", "45 s", "Straight line"],
  ]),
  h2("Day C"),
  table(WORKOUT_HEADERS, [
    ["Backpack Romanian deadlift", "3 × 12–15", "90 s", "See " + ex("legs/romanian-deadlift", "Romanian deadlift form")],
    ["Decline push-up (feet on chair)", "3 × 6–12", "90 s", "Upper-chest emphasis"],
    ["Single-arm backpack row", "3 × 10–15 each", "60 s", "Brace on the chair, like a " + ex("back/single-arm-dumbbell-row", "dumbbell row")],
    ["Chair dips", "2 × 8–15", "60 s", "Shoulders down, stop if they ache"],
    [ex("cardio/jump-rope", "Jump rope") + " or fast marching", "5 × 1 min", "1 min", "Optional finisher"],
  ]),
  h2("How to make exercises harder"),
  table(
    ["Exercise", "Easier", "Standard", "Harder"],
    [
      ["Push-up", "Hands on a table", "Floor push-up", "Feet elevated, 3-second lowering, backpack"],
      ["Squat", "Squat to a chair", "Bodyweight squat", "Backpack, 3-second lowering, pause at the bottom"],
      ["Split squat", "Both feet on the floor", "Rear foot on chair", "Backpack, deficit, slower lowering"],
      ["Row", "Band, light tension", "Towel row on a door", "Heavier band, pause at the top"],
      ["Pull-up", "Band-assisted or negatives", "Full pull-up", "Backpack, slow lowering"],
    ],
  ),
  h2("How to progress"),
  p(
    `When you reach the top of the rep range on every set, move to a harder version or add load. A 3-second lowering phase makes almost any exercise harder without new equipment. Track your reps in a notebook — the principle is the same as in the gym; see ${a(TRAINING_LINK.overload, "what progressive overload is")}. Most people can progress steadily for 8–12 weeks before needing heavier equipment.`,
  ),
  h2("Sample 4-week progression"),
  table(
    ["Week", "Push-ups", "Split squats", "Rows"],
    [
      ["1", "3 × 8 (hands elevated if needed)", "3 × 8 each leg, bodyweight", "3 × 10, light band"],
      ["2", "3 × 10", "3 × 10 each leg", "3 × 12"],
      ["3", "3 × 12, 3-second lowering", "3 × 12 each leg", "3 × 12, pause at the top"],
      ["4", "3 × 8, feet on a chair", "3 × 8 each leg, with backpack", "3 × 10, heavier band"],
    ],
  ),
  p("Notice that week 4 drops the reps because the exercises get harder. Then build the reps back up and repeat the cycle."),
  h2("Common mistakes at home"),
  ul([
    "<strong>Doing easy reps forever.</strong> If you can do 30+ reps, the exercise is too easy to build much muscle — make it harder.",
    "<strong>No pulling.</strong> Home routines are often all push-ups and squats. Rows and pull-ups balance the shoulders.",
    "<strong>Random workouts.</strong> Repeating the same plan lets you see progress; random videos make that difficult.",
    "<strong>Rushing.</strong> Controlled reps with a slow lowering are harder and more effective than fast ones.",
  ]),
  h2("Recovery and nutrition"),
  RECOVERY,
  h2("When to move to the gym"),
  p(
    `If your sets regularly pass 25–30 reps even on the hardest versions, you'll make faster progress with heavier loads. At that point, the ${PROGRAM("beginner-3-day-full-body", "beginner 3-day full body")} is a good gym starting point.`,
  ),
  faq([
    { q: "Can you build muscle at home without weights?", a: "Yes. Muscle grows when sets are hard and you keep making them harder. Bodyweight progressions, slow lowering and a loaded backpack can provide that for many months." },
    { q: "How long should each session take?", a: "About 35–45 minutes including a 5-minute warm-up. Rest periods matter — don't rush between sets." },
    { q: "Is this plan good for weight loss?", a: "Strength training helps you keep muscle while you lose fat, but fat loss itself comes from a calorie deficit. Pair the plan with daily walking and a measured diet." },
  ]),
].join("");

export const PROGRAM_BODIES: Record<string, string> = {
  [KNOWLEDGE_HUB_SLUG]: HUB,
  "beginner-3-day-full-body": BEGINNER,
  "upper-lower-4-day": UPPER_LOWER,
  "return-to-gym-week": RETURN_WEEK,
  "home-minimal-equipment": HOME,
};
