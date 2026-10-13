import type { MuscleGroup } from "@/lib/api/knowledge";

export type MuscleGroupGuide = {
  /** What the muscles are and what they do. */
  anatomy: string;
  /** How much to train them each week. */
  volume: string;
  /** Sample session: [exercise slug, label, prescription]. */
  session: { slug: string; label: string; dose: string }[];
  tips: string[];
  faq: { q: string; a: string }[];
};

export const MUSCLE_GROUP_GUIDES: Record<MuscleGroup, MuscleGroupGuide> = {
  chest: {
    anatomy:
      "The chest is mainly the pectoralis major, a fan-shaped muscle with an upper (clavicular) part below the collarbone and a larger lower (sternal) part. It pulls the arm across the body and pushes it forward, so every press and fly trains it. The front shoulders and triceps assist in pressing, which is why a strong bench press also builds the arms and shoulders.",
    volume:
      "Most people grow well on about 10–20 hard sets of chest work a week, split over two sessions. Beginners can start at the low end — around 8–10 sets — and add sets only when progress stalls. A good week includes one heavy press, one incline or dumbbell press and one fly.",
    session: [
      { slug: "barbell-bench-press", label: "Barbell bench press", dose: "3 × 6–8" },
      { slug: "incline-dumbbell-press", label: "Incline dumbbell press", dose: "3 × 8–12" },
      { slug: "cable-chest-fly", label: "Cable chest fly", dose: "2 × 12–15" },
      { slug: "push-ups", label: "Push-ups (finisher)", dose: "1 × near failure" },
    ],
    tips: [
      "Keep the shoulder blades pulled back on every press to protect the shoulders.",
      "Match each week's pressing sets with roughly the same number of rowing sets.",
      "Use a full range of motion — the stretched position builds the most muscle.",
      "Progress slowly: add reps first, then small amounts of weight.",
    ],
    faq: [
      { q: "What is the best chest exercise?", a: "There isn't one best exercise. A flat press, an incline press and a fly cover the whole chest. Choose versions that feel good on your shoulders and that you can progress." },
      { q: "Can I build my chest at home?", a: "Yes. Push-ups progressed to decline, paused and backpack-weighted versions, plus dips if you have bars, can build a strong chest." },
    ],
  },
  back: {
    anatomy:
      "The back has several large muscles. The lats (latissimus dorsi) run from the upper arm to the lower back and pull the arms down and back — they create the V-shape. The traps and rhomboids between the shoulder blades pull them together and give the upper back thickness. The spinal erectors along the spine keep you upright when you hinge and lift.",
    volume:
      "Aim for about 10–20 hard sets a week, split between vertical pulls (pull-ups, pulldowns) and horizontal pulls (rows). Add one hinge — a deadlift or Romanian deadlift — for the lower back, and some rear-shoulder work to balance your pressing.",
    session: [
      { slug: "pull-up", label: "Pull-ups or lat pulldown", dose: "3 × 6–10" },
      { slug: "barbell-row", label: "Barbell bent-over row", dose: "3 × 8–10" },
      { slug: "single-arm-dumbbell-row", label: "Single-arm dumbbell row", dose: "2 × 10–12 each side" },
      { slug: "face-pull", label: "Face pull", dose: "2 × 15–20" },
    ],
    tips: [
      "Pull with your elbows, not your hands, to feel the back working instead of the arms.",
      "Let your shoulder blades move — reach forward at the stretch and squeeze at the end.",
      "Use lifting straps when grip fails before your back on heavy rows.",
      "Keep the lower back flat on all bent-over and hinge exercises.",
    ],
    faq: [
      { q: "How do I get a wider back?", a: "Train the lats with pull-ups and pulldowns through a full range, and keep adding weight or reps over months. Lower body fat also makes the V-shape more visible." },
      { q: "Do I need deadlifts?", a: "No, but some hinge exercise helps. Romanian deadlifts are easier to recover from and train the hamstrings and back well." },
    ],
  },
  shoulders: {
    anatomy:
      "The deltoid has three parts: the front (anterior), side (medial) and rear (posterior) heads. Pressing trains the front heavily. The side head makes the shoulders look wider, and the rear head balances the joint and supports posture. Underneath, the small rotator-cuff muscles keep the ball of the shoulder centred in its socket.",
    volume:
      "If you bench and overhead press, your front delts already get plenty of work. Most people benefit from about 8–16 weekly sets of side-delt work (lateral raises) and 6–12 sets of rear-delt work, spread over 2–3 sessions. These muscles recover quickly, so frequent, lighter sessions suit them.",
    session: [
      { slug: "overhead-press", label: "Standing overhead press", dose: "3 × 5–8" },
      { slug: "lateral-raise", label: "Dumbbell lateral raise", dose: "3 × 12–20" },
      { slug: "rear-delt-fly", label: "Rear delt fly", dose: "3 × 15–20" },
      { slug: "arnold-press", label: "Arnold press (optional)", dose: "2 × 10–12" },
    ],
    tips: [
      "Keep lateral raises light and strict — swinging shifts work to the traps.",
      "Do some rear-delt or face-pull work for every two sets of pressing.",
      "Avoid narrow-grip upright rows pulled to the chin.",
      "Stop any exercise that causes a sharp pinch at the top of the shoulder.",
    ],
    faq: [
      { q: "How do I get broader shoulders?", a: "Focus on the side delts with lateral raises 2–3 times a week, alongside an overhead press. Broad-looking shoulders also depend on a developed upper back." },
      { q: "Why do my shoulders hurt when pressing?", a: "Common causes are flared elbows, too much weight or not enough pulling work. Reduce load, adjust form and add rows and rear-delt work. See a professional if pain persists." },
    ],
  },
  arms: {
    anatomy:
      "The biceps on the front of the upper arm bend the elbow and turn the palm up. Under them, the brachialis adds thickness. The triceps on the back of the arm straighten the elbow and make up about two-thirds of upper-arm size — so training triceps matters more for bigger arms than most people realise. The forearm muscles control the wrist and grip.",
    volume:
      "Rows and pull-ups already train the biceps, and presses train the triceps. On top of that, about 6–12 direct sets each for biceps and triceps per week is enough for most people. Supersetting a curl with a triceps exercise saves time.",
    session: [
      { slug: "barbell-curl", label: "Barbell curl", dose: "3 × 8–12" },
      { slug: "overhead-triceps-extension", label: "Overhead triceps extension", dose: "3 × 10–12" },
      { slug: "hammer-curl", label: "Hammer curl", dose: "2 × 10–15" },
      { slug: "triceps-pushdown", label: "Triceps pushdown", dose: "2 × 12–15" },
    ],
    tips: [
      "Keep your elbows still on curls and pushdowns so the arms do the work.",
      "Lower every rep slowly — the stretch is where much of the growth happens.",
      "Train the triceps overhead at least once a week for the long head.",
      "Change grips (straight bar, EZ-bar, rope, neutral) every few weeks.",
    ],
    faq: [
      { q: "How long does it take to grow bigger arms?", a: "Arms grow slowly. With consistent training and enough protein, most beginners notice visible change in 2–3 months, with steady gains over the first year." },
      { q: "Should I train arms every day?", a: "No. Two sessions a week with 3–6 hard sets each is plenty. Arms also need rest to grow." },
    ],
  },
  legs: {
    anatomy:
      "The quadriceps on the front of the thigh straighten the knee and are trained by squats, leg presses, lunges and leg extensions. The hamstrings on the back bend the knee and extend the hip — they need both hinges (Romanian deadlifts) and curls. The glutes are the largest muscles in the body and drive hip extension. The calves lift the heel.",
    volume:
      "A full leg week includes about 10–20 hard sets for the quads, 8–16 for the hamstrings and glutes, and 8–12 for the calves, split over two sessions. Combine one squat or press, one hinge, one single-leg exercise and calf raises.",
    session: [
      { slug: "back-squat", label: "Back squat or leg press", dose: "3 × 6–10" },
      { slug: "romanian-deadlift", label: "Romanian deadlift", dose: "3 × 8–10" },
      { slug: "bulgarian-split-squat", label: "Bulgarian split squat", dose: "2 × 8–12 each leg" },
      { slug: "leg-curl", label: "Leg curl", dose: "2 × 10–15" },
      { slug: "standing-calf-raise", label: "Standing calf raise", dose: "3 × 10–15" },
    ],
    tips: [
      "Squat as deep as you can with a neutral back — depth builds more muscle.",
      "Keep your knees in line with your toes on every squat and lunge.",
      "Don't skip hamstrings: use both a hinge and a curl each week.",
      "Pause in the stretch on calf raises instead of bouncing.",
    ],
    faq: [
      { q: "Can I build legs without squats?", a: "Yes. Leg presses, split squats, lunges and Romanian deadlifts can build strong, muscular legs if you progress them." },
      { q: "How often should I train legs?", a: "Twice a week works well for most people, with at least 48 hours between hard sessions." },
    ],
  },
  core: {
    anatomy:
      "The core includes the six-pack muscle (rectus abdominis), the obliques on the sides, the deep transverse abdominis that wraps around like a belt, and the muscles of the lower back and hips. Its main job is to keep the spine stable — resisting arching, twisting and side-bending — so you can transfer force between the legs and upper body.",
    volume:
      "Heavy squats, deadlifts and carries already train the core. Add 2–3 short sessions a week with one anti-extension exercise, one anti-rotation or side exercise and one flexion exercise, 2–3 sets each.",
    session: [
      { slug: "dead-bug", label: "Dead bug", dose: "2 × 8 each side" },
      { slug: "pallof-press", label: "Pallof press", dose: "2 × 10 each side" },
      { slug: "side-plank", label: "Side plank", dose: "2 × 30 s each side" },
      { slug: "hanging-knee-raise", label: "Hanging knee raise", dose: "2 × 10–12" },
    ],
    tips: [
      "Quality beats duration — hold good positions, not long sagging ones.",
      "Breathe steadily during planks and holds.",
      "Progress by making exercises harder, not just longer.",
      "Visible abs come from lower body fat, which depends on diet.",
    ],
    faq: [
      { q: "Will core exercises give me a six-pack?", a: "They strengthen the abdominal muscles, but visible abs depend on low body fat, which comes from a calorie deficit over time." },
      { q: "Are crunches bad for your back?", a: "Not for most healthy people in moderate amounts. A mix of stability exercises and some flexion work is a balanced approach." },
    ],
  },
  cardio: {
    anatomy:
      "Cardio trains your heart, lungs and blood vessels to deliver oxygen to working muscles. Easy aerobic work (zone 2) improves endurance and recovery; hard intervals improve your top-end fitness. Both burn calories and support heart health, and neither needs to interfere with strength training when planned well.",
    volume:
      "Health guidelines recommend 150–300 minutes of moderate activity or 75–150 minutes of vigorous activity a week, plus strength training twice a week. A practical split is 2–4 easy sessions and 1–2 interval sessions, with daily walking on top.",
    session: [
      { slug: "zone-2-incline-walk", label: "Zone-2 incline walk", dose: "30–45 min" },
      { slug: "stationary-bike-intervals", label: "Bike intervals", dose: "8 × 30 s hard / 90 s easy" },
      { slug: "row-erg-steady", label: "Rowing steady state", dose: "20–30 min" },
      { slug: "farmer-carry", label: "Farmer carry finisher", dose: "4 × 30 m" },
    ],
    tips: [
      "Use the talk test: you should be able to speak in sentences during easy cardio.",
      "Keep hard intervals away from heavy leg days.",
      "Choose low-impact options like cycling, rowing or swimming if your joints ache.",
      "Daily steps matter as much as formal cardio sessions for fat loss.",
    ],
    faq: [
      { q: "Does cardio kill muscle gains?", a: "Not in sensible amounts. Easy cardio and 1–2 interval sessions a week have little effect on muscle growth when protein and calories are adequate." },
      { q: "What is the best cardio for fat loss?", a: "The one you will do consistently. Fat loss depends on a calorie deficit; cardio helps increase what you burn." },
    ],
  },
};
