import { buildExerciseGuide, type ExerciseExpansion } from "./exerciseGuide";

const X = (slug: string) => `/exercises/cardio/${slug}`;

export const CARDIO_GUIDES: Record<string, ExerciseExpansion> = {
  "zone-2-incline-walk": buildExerciseGuide({
    intro:
      "A zone-2 incline walk is a brisk walk on a treadmill set to an incline, at an effort where you can still talk in full sentences. Zone 2 is easy-to-moderate intensity — roughly 60–70% of your maximum heart rate. It builds aerobic fitness and burns calories with very little stress on the joints or recovery, making it ideal for beginners, people losing weight and lifters who want cardio that won't affect strength training.",
    setup: [
      "Set the treadmill to a comfortable speed, around 4.5–5.5 km/h.",
      "Set the incline to 5–10% to start.",
      "Stand tall without holding the handrails.",
      "Optionally wear a heart rate monitor.",
    ],
    steps: [
      "Walk with a natural stride, arms swinging.",
      "Raise the incline until you're breathing harder but can still talk.",
      "Hold that effort steadily for the session.",
      "Keep your posture tall — don't lean on the console.",
      "Cool down with 2–3 minutes at a flat, slow pace.",
    ],
    breathing:
      "Breathe through your nose if possible, or a relaxed mouth-and-nose pattern. A simple test: you should be able to talk, but not sing. If you can't talk, slow down or lower the incline.",
    variations: [
      { name: "Outdoor hill walk", note: "the same effort outdoors on hilly terrain." },
      { name: "Stationary bike, easy", href: X("stationary-bike-intervals"), note: "pedal steadily at zone 2." },
      { name: "Rowing machine steady state", href: X("row-erg-steady"), note: "zone 2 with upper-body work." },
      { name: "Easy swim", href: X("swim-easy"), note: "joint-free zone 2." },
    ],
    dosageHeaders: ["Level", "How often", "Session"],
    dosage: [
      ["Beginner", "2–3 sessions a week", "20–30 min"],
      ["General fitness", "3–4 sessions a week", "30–45 min"],
      ["Fat-loss support", "3–5 sessions a week", "30–60 min"],
    ],
    progression:
      "Increase session time first, then incline, then speed. Over a few weeks, you'll find the same heart rate needs a higher incline — a sign your fitness is improving.",
    safety:
      "Don't hold the handrails — it reduces the work and changes your posture. Start at a lower incline if your calves or Achilles are tight. People with heart conditions should get medical clearance before starting new cardio.",
    faq: [
      { q: "How many calories does an incline walk burn?", a: "Roughly 250–450 kcal an hour for most adults, depending on body weight, speed and incline. Heavier people burn more for the same effort." },
      { q: "Is incline walking better than running for fat loss?", a: "Running burns more per minute, but incline walking is easier to recover from and to sustain. For fat loss, the best cardio is the one you do consistently alongside a calorie deficit." },
    ],
    formCues: [
      "Tall posture",
      "No handrails",
      "Natural arm swing",
      "Talk-test effort",
      "Steady pace",
      "Cool down at the end",
    ],
    commonMistakes: [
      "Holding the handrails at a steep incline",
      "Going so hard you can't talk",
      "Starting at a very steep incline",
      "Skipping the cool-down",
    ],
    programmingNotes:
      "Schedule 2–4 sessions a week after weight training or on separate days. Zone 2 recovers quickly, so it rarely interferes with lifting.",
  }),

  "stationary-bike-intervals": buildExerciseGuide({
    intro:
      "Stationary bike intervals alternate short hard efforts with easy pedalling. They improve aerobic capacity and the ability to sustain hard efforts, using mainly the quads and glutes. The bike is low-impact, so it is a safe way to do intervals for most people, including those with knee or back sensitivity.",
    setup: [
      "Adjust the seat so your knee is slightly bent at the bottom of the pedal stroke.",
      "Set the handlebars at a comfortable height.",
      "Warm up with 5–10 minutes of easy pedalling.",
      "Know how to change resistance quickly.",
    ],
    steps: [
      "Increase resistance and pedal hard for the work interval (e.g. 30–60 seconds).",
      "The effort should be hard — about 8 out of 10.",
      "Drop resistance and pedal easily for the recovery interval.",
      "Repeat for the planned number of rounds.",
      "Cool down for 5 minutes at an easy pace.",
    ],
    breathing:
      "Breathing will be heavy during the work intervals — that's expected. Use the recovery period to slow your breathing before the next effort.",
    variations: [
      { name: "Assault / air bike sprints", href: X("assault-bike-sprints"), note: "a harder full-body version." },
      { name: "Zone-2 incline walk", href: X("zone-2-incline-walk"), note: "the easy-cardio counterpart." },
      { name: "Hill sprints", note: "outdoor intervals — higher impact." },
    ],
    dosageHeaders: ["Level", "How often", "Session"],
    dosage: [
      ["Beginner", "6–8 rounds", "30 s hard / 90 s easy"],
      ["Intermediate", "8–10 rounds", "40 s hard / 80 s easy"],
      ["Longer intervals", "4–5 rounds", "3 min hard / 3 min easy"],
    ],
    progression:
      "Add rounds, then lengthen the hard interval or shorten the recovery. Keep intervals to 1–2 sessions a week, because hard efforts take longer to recover from than easy cardio.",
    safety:
      "Warm up properly. Intervals are very demanding — people with heart conditions, high blood pressure or other health concerns should get medical clearance first. Stop if you feel dizzy or chest pain.",
    faq: [
      { q: "Are intervals better than steady cardio for fat loss?", a: "Not by much. Intervals burn calories in less time, but steady cardio can be done more often. A mix of both works well." },
      { q: "How often should I do intervals?", a: "1–2 times a week. More often tends to hurt recovery for strength training." },
    ],
    formCues: [
      "Seat at the right height",
      "Warm up first",
      "Hard work intervals, easy recoveries",
      "Steady upper body",
      "Track rounds and resistance",
      "Cool down",
    ],
    commonMistakes: [
      "Skipping the warm-up",
      "Going too easy on the hard intervals",
      "Doing intervals every day",
      "Seat too low",
    ],
    programmingNotes:
      "Use 1–2 sessions a week, away from heavy leg days. Combine with 2–3 zone 2 sessions.",
  }),

  "row-erg-steady": buildExerciseGuide({
    intro:
      "Steady rowing on a rowing machine (erg) is a full-body, low-impact cardio exercise. Each stroke uses the legs, back and arms, which makes it efficient for aerobic fitness and calorie burn. Steady state means a moderate pace you can hold for 20–40 minutes. It suits most people once the technique is learned.",
    setup: [
      "Strap your feet in with the strap over the widest part of the foot.",
      "Set the damper to about 3–5 (higher is not better).",
      "Sit tall and hold the handle with a relaxed grip.",
      "Start with shins vertical, arms straight, leaning slightly forward.",
    ],
    steps: [
      "Push with your legs first.",
      "As your legs straighten, lean back slightly.",
      "Finally pull the handle to your lower ribs.",
      "Return in reverse: arms out, lean forward, then bend the knees.",
      "Keep a smooth, steady rhythm of about 20–24 strokes per minute.",
    ],
    breathing:
      "Breathe out on the drive and in on the recovery. At steady state, you should be able to talk in short sentences.",
    variations: [
      { name: "Rowing intervals", note: "e.g. 8 × 250 m with rest — a hard session." },
      { name: "Zone-2 incline walk", href: X("zone-2-incline-walk"), note: "a simpler steady option." },
      { name: "Easy swim", href: X("swim-easy"), note: "another full-body steady option." },
    ],
    dosageHeaders: ["Level", "How often", "Session"],
    dosage: [
      ["Beginner", "2–3 sessions a week", "10–20 min"],
      ["General fitness", "2–4 sessions a week", "20–40 min"],
    ],
    progression:
      "Increase time, then aim to hold a slightly faster split (time per 500 m) at the same effort.",
    safety:
      "Learn the sequence — legs, back, arms — to protect your lower back. Don't round your back at the catch. Keep the damper moderate.",
    faq: [
      { q: "What damper setting should I use?", a: "Around 3–5 for most people. Higher settings feel heavier but don't make the workout better and can tire the back." },
      { q: "Is rowing good for weight loss?", a: "Yes, it burns a good number of calories with low joint stress. Fat loss still depends on a calorie deficit." },
    ],
    formCues: [
      "Legs, then back, then arms",
      "Arms, back, then legs on return",
      "Relaxed grip",
      "Tall spine",
      "Damper 3–5",
      "Steady rhythm",
    ],
    commonMistakes: [
      "Pulling with the arms first",
      "Rounding the back",
      "Damper set at 10",
      "Rushing the recovery",
    ],
    programmingNotes:
      "Use as one of your 2–4 weekly cardio sessions, after lifting or on separate days.",
  }),

  "jump-rope": buildExerciseGuide({
    intro:
      "Jumping rope is a cheap, portable cardio exercise that builds coordination, calf strength and aerobic fitness. It can be easy or very hard depending on pace. It suits most people without joint problems, and a rope fits in any bag — useful for travel or home training.",
    setup: [
      "Choose a rope length where the handles reach your armpits when you stand on the middle.",
      "Wear supportive shoes and use a flat surface (wood, rubber or a mat if possible).",
      "Hold the handles at hip height with elbows close to your sides.",
      "Stand tall.",
    ],
    steps: [
      "Turn the rope with your wrists, not your shoulders.",
      "Jump just high enough for the rope to pass — about 2–3 cm.",
      "Land softly on the balls of your feet.",
      "Keep a steady rhythm.",
      "Rest when your form breaks down.",
    ],
    breathing:
      "Breathe steadily. Start with short intervals until your coordination and calves adapt.",
    variations: [
      { name: "Alternate-foot step", note: "like jogging in place — easier on the calves." },
      { name: "Double-unders", note: "the rope passes twice per jump — advanced." },
      { name: "Low-impact rope (no jumping)", note: "swing a rope beside you while stepping." },
    ],
    dosageHeaders: ["Level", "How often", "Session"],
    dosage: [
      ["Beginner", "5–10 rounds", "30 s on / 30 s off"],
      ["Intermediate", "5 rounds", "2 min on / 1 min off"],
      ["Warm-up", "1–2 rounds", "1–2 min"],
    ],
    progression:
      "Build total time gradually, then increase speed or add double-unders. Increase in small steps to avoid calf and shin soreness.",
    safety:
      "Jump rope is high-impact. Build up slowly, especially if you are heavier or new to impact. People with knee, ankle or Achilles problems should use low-impact cardio instead.",
    faq: [
      { q: "Is jump rope good for weight loss?", a: "It burns many calories per minute, but most beginners can only do short bouts. It's a useful addition, not a fat-loss shortcut." },
      { q: "Why do my shins hurt?", a: "Usually too much too soon or jumping too high. Reduce volume, jump lower and use a softer surface." },
    ],
    formCues: [
      "Turn with the wrists",
      "Elbows close to the body",
      "Small jumps",
      "Land softly on the balls of the feet",
      "Tall posture",
      "Steady rhythm",
    ],
    commonMistakes: [
      "Jumping too high",
      "Turning the rope with the shoulders",
      "Rope the wrong length",
      "Doing too much too soon",
    ],
    programmingNotes:
      "Use as a warm-up or a short cardio finisher, 2–3 times a week.",
  }),

  "farmer-carry": buildExerciseGuide({
    intro:
      "The farmer carry means walking while holding heavy weights at your sides. It builds grip strength, upper-back and trap strength, and core stability, while raising your heart rate. It's simple, safe and transfers directly to real-life tasks like carrying shopping, luggage or water cans.",
    setup: [
      "Choose dumbbells or kettlebells you can hold for 30–40 metres.",
      "Place them by your feet.",
      "Squat or hinge down with a flat back and grip them firmly.",
      "Stand up tall with shoulders back.",
    ],
    steps: [
      "Walk forward with short, controlled steps.",
      "Keep your torso upright — don't lean.",
      "Squeeze the handles hard.",
      "Walk for the set distance or time.",
      "Put the weights down by squatting with a flat back.",
    ],
    breathing:
      "Breathe in short, controlled breaths while keeping the core braced. Don't hold your breath for the entire walk.",
    variations: [
      { name: "Suitcase carry", note: "one weight on one side — more oblique work." },
      { name: "Front-rack carry", note: "kettlebells held at the chest." },
      { name: "Trap-bar carry", note: "allows heavier loads." },
    ],
    dosageHeaders: ["Level", "How often", "Session"],
    dosage: [
      ["Grip and core", "3–4", "30–40 m or 30–45 s", "90 s"],
      ["Conditioning", "4–6", "20 m back and forth", "60 s"],
    ],
    progression:
      "Add distance, then weight. A common target is carrying half your bodyweight in each hand for 30 metres.",
    safety:
      "Pick up and put down the weights with a flat back. Keep a clear path. Stop if your grip is about to fail rather than dropping weights near your feet.",
    faq: [
      { q: "Is the farmer carry cardio or strength?", a: "Both. Heavy carries build grip and core strength, while longer or repeated carries raise the heart rate." },
      { q: "What weight should I start with?", a: "A weight you can carry for 30 metres with good posture — for many beginners, 10–20 kg per hand." },
      { q: "Can I do farmer carries at home?", a: "Yes. Carry full water cans, filled buckets or loaded shopping bags with the same tall posture. Keep the path clear and the load even on both sides." },
    ],
    formCues: [
      "Tall posture",
      "Shoulders back",
      "Short steps",
      "Crush the handles",
      "Braced core",
      "Flat-back pick-up",
    ],
    commonMistakes: [
      "Leaning to one side",
      "Shrugging the shoulders up",
      "Long, bouncy steps",
      "Rounding the back when picking up",
    ],
    programmingNotes:
      "Add 3–4 carries at the end of a lower-body or full-body session, 1–2 times a week.",
  }),

  "assault-bike-sprints": buildExerciseGuide({
    intro:
      "Air bike (assault bike) sprints are short, all-out efforts on a bike that uses both arms and legs, with resistance increasing the harder you go. They are one of the most demanding forms of interval training and build anaerobic and aerobic capacity in very little time. They suit fit, healthy trainees.",
    setup: [
      "Adjust the seat so your knee is slightly bent at the bottom.",
      "Hold the handles with a firm grip.",
      "Warm up for 5–10 minutes with easy pedalling.",
      "Plan your work and rest intervals before starting.",
    ],
    steps: [
      "Sprint hard by pushing and pulling the handles while pedalling.",
      "Keep your posture tall and core braced.",
      "Hold the sprint for the set time.",
      "Pedal slowly during recovery.",
      "Repeat for the planned rounds and cool down.",
    ],
    breathing:
      "Breathing will be very heavy — focus on deep breaths during the recovery.",
    variations: [
      { name: "Stationary bike intervals", href: X("stationary-bike-intervals"), note: "a less intense option." },
      { name: "Rowing sprints", note: "similar effort on a rower." },
      { name: "Zone-2 incline walk", href: X("zone-2-incline-walk"), note: "the easy-cardio balance." },
    ],
    dosageHeaders: ["Level", "How often", "Session"],
    dosage: [
      ["Intermediate", "6–8 rounds", "15–20 s sprint / 60–90 s easy"],
      ["Advanced", "8–10 rounds", "20–30 s sprint / 60 s easy"],
    ],
    progression:
      "Increase rounds, then sprint length. Keep these sessions to once a week, as they are very demanding.",
    safety:
      "These sprints are extremely intense. Get medical clearance if you have any heart condition, high blood pressure or other health concerns. Stop if you feel dizzy, sick or have chest pain. Beginners should start with normal bike intervals.",
    faq: [
      { q: "How many calories do air bike sprints burn?", a: "A short session burns relatively few calories in total; the main benefit is fitness improvement in little time." },
      { q: "How often should I do them?", a: "Once a week is plenty alongside lifting and easier cardio." },
      { q: "What if my gym has no air bike?", a: "Use a normal stationary bike with high resistance, a rowing machine or hill sprints with the same short-sprint, long-rest structure." },
    ],
    formCues: [
      "Warm up properly",
      "Push and pull with the arms",
      "Tall, braced posture",
      "All-out on work intervals",
      "Easy pedalling during recovery",
      "Cool down",
    ],
    commonMistakes: [
      "Skipping the warm-up",
      "Sprints too long to maintain intensity",
      "Doing them too often",
      "Poor seat setup",
    ],
    programmingNotes:
      "Use once a week, away from heavy leg training.",
  }),

  "swim-easy": buildExerciseGuide({
    intro:
      "Easy continuous swimming is low-impact cardio that works the whole body while the water supports your weight. It builds aerobic fitness with almost no joint stress, making it excellent for heavier people, those with joint pain and anyone recovering from hard training. It requires basic swimming skill.",
    setup: [
      "Choose a lane suited to your speed.",
      "Use goggles and, if you like, a swimming cap.",
      "Warm up with 2–4 easy lengths, mixing strokes.",
      "Plan to swim at a pace you can maintain.",
    ],
    steps: [
      "Swim at an easy, steady pace — you should be able to keep going without stopping often.",
      "Focus on long, smooth strokes.",
      "Breathe regularly (every 2–3 strokes in freestyle).",
      "Rest briefly at the wall if needed.",
      "Cool down with a few slow lengths.",
    ],
    breathing:
      "Exhale steadily into the water and inhale when you turn your head. Holding your breath leads to fatigue quickly.",
    variations: [
      { name: "Pool walking or aqua jogging", note: "for non-swimmers or rehab." },
      { name: "Kickboard sets", note: "focus on the legs." },
      { name: "Zone-2 incline walk", href: X("zone-2-incline-walk"), note: "a land-based steady option." },
    ],
    dosageHeaders: ["Level", "How often", "Session"],
    dosage: [
      ["Beginner", "2–3 sessions a week", "15–20 min with rests"],
      ["General fitness", "2–4 sessions a week", "30–45 min"],
    ],
    progression:
      "Increase total continuous time, then reduce rests. Consider a few lessons to improve technique — better technique makes swimming much more efficient.",
    safety:
      "Swim in supervised pools where possible. Don't swim alone in open water. People with heart conditions should get medical clearance.",
    faq: [
      { q: "Is swimming good for weight loss?", a: "It burns a good number of calories with little joint stress, though some people feel hungrier afterwards. Fat loss still depends on your total calories." },
      { q: "Which stroke is best?", a: "Any stroke you can do continuously. Freestyle is usually the most efficient." },
      { q: "Can swimming replace strength training?", a: "No. Swimming builds aerobic fitness and some muscular endurance, but it doesn't load muscles and bones the way lifting does. Combine 2–3 strength sessions a week with your swims." },
    ],
    formCues: [
      "Long, smooth strokes",
      "Regular breathing",
      "Steady pace",
      "Relaxed shoulders",
      "Warm up and cool down",
    ],
    commonMistakes: [
      "Starting too fast",
      "Holding the breath",
      "Head too high",
      "Skipping the warm-up",
    ],
    programmingNotes:
      "Use as 1–3 of your weekly cardio sessions, especially on recovery days.",
  }),
};
