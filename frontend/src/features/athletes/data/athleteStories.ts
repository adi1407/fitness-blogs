import type { SlideshowSlide } from "@/components/ui/slideshow";

export type AthleteSection = {
  id: string;
  heading: string;
  paragraphs: string[];
};

export type AthleteFaq = {
  question: string;
  answer: string;
};

export type AthleteRelatedLink = {
  href: string;
  label: string;
  blurb: string;
};

export type AthleteStory = {
  slug: string;
  name: string;
  sport: string;
  title: string;
  excerpt: string;
  updatedAt: string;
  readingMinutes: number;
  cardImage: string;
  lessonOneLiner: string;
  quickAnswer: string;
  slides: SlideshowSlide[];
  sections: AthleteSection[];
  takeaways: string[];
  faqs: AthleteFaq[];
  related: AthleteRelatedLink[];
};

export const ATHLETE_AFFILIATION_NOTE =
  "fitlives is not affiliated with, endorsed by, or sponsored by any athlete, team, federation, or brand named on these pages. Names appear only for educational commentary. This is not a biography, interview transcript, or training prescription.";

export const ATHLETE_STORIES: AthleteStory[] = [
  {
    slug: "virat-kohli",
    name: "Virat Kohli",
    sport: "Cricket",
    title: "Virat Kohli's Fitness Philosophy: What Can We Learn From It?",
    excerpt:
      "Public conversations around Kohli’s career often return to consistency, conditioning, and staying match-ready across long seasons — themes any recreational athlete can translate carefully.",
    updatedAt: "2026-09-22",
    readingMinutes: 8,
    cardImage:
      "https://images.unsplash.com/photo-1530549387789-4c1017266635?q=80&w=1200&auto=format&fit=crop",
    lessonOneLiner: "Consistency and conditioning beat sporadic intensity.",
    quickAnswer:
      "What stands out in publicly discussed habits around Kohli’s career is long-term consistency: conditioning that supports skill, nutrition that supports training, and recovery that protects longevity — not short bursts of extreme effort.",
    slides: [
      {
        img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1600&auto=format&fit=crop",
        text: ["CONSISTENCY", "OVER INTENSITY"],
      },
      {
        img: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1600&auto=format&fit=crop",
        text: ["CONDITIONING", "SUPPORTS SKILL"],
      },
      {
        img: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1600&auto=format&fit=crop",
        text: ["FUEL THAT", "MATCHES WORK"],
      },
      {
        img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1600&auto=format&fit=crop",
        text: ["RECOVER TO", "REPEAT"],
      },
      {
        img: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1600&auto=format&fit=crop",
        text: ["LONGEVITY", "IS THE GOAL"],
      },
    ],
    sections: [
      {
        id: "public-themes",
        heading: "Themes that show up in public discussions",
        paragraphs: [
          "Across years of coverage and public appearances, Kohli’s fitness story is often framed around staying athletic for cricket’s calendar: travel, heat, multi-format seasons, and the need to sprint, field, and bat under fatigue. We are not repeating any interview or claiming insider detail. We are extracting durable themes that recreational athletes already recognize.",
          "Those themes usually cluster around (1) consistent training instead of on-off spikes, (2) conditioning that serves sport skill rather than gym aesthetics alone, and (3) treating body composition as a performance variable — useful only when it still leaves energy for practice and recovery.",
        ],
      },
      {
        id: "what-to-apply",
        heading: "What a recreational athlete can apply",
        paragraphs: [
          "Translate “consistency” into a weekly schedule you can keep for twelve weeks: two or three strength sessions, two conditioning sessions that resemble your sport demands, and at least one full rest or easy day. Missing a day is normal; abandoning the plan for a month is the real setback.",
          "Conditioning for cricket-like efforts means short bursts with recovery built in — intervals, shuttle runs, or bike sprints — plus enough aerobic base that you recover between efforts. Pure marathon volume is not required for field sports.",
          "Strength work can stay simple: hinge, squat pattern, push, pull, and core bracing. Progress load slowly. Elite athletes have coaches and medical teams; you need progressive overload that still lets you sleep and go to work.",
        ],
      },
      {
        id: "indian-context",
        heading: "Indian kitchens and real schedules",
        paragraphs: [
          "Protein targets still matter when meals are dal, paneer, eggs, curd, chicken, or soya. You do not need imported products to support training — you need portions that match your protein calculator target across the day.",
          "Travel and late workdays derail many plans. Keep a minimum viable session (20–30 minutes of strength or intervals) for busy weeks so the habit survives, then expand volume when the calendar opens.",
        ],
      },
      {
        id: "boundaries",
        heading: "Boundaries for this commentary",
        paragraphs: [
          "This page is fitlives editorial commentary. It is not Kohli’s training program, not medical advice, and not an official biography. Individual needs differ by age, injury history, and sport. Consult a qualified professional before major changes.",
        ],
      },
    ],
    takeaways: [
      "Prefer a repeatable weekly template over heroic one-off workouts.",
      "Conditioning should support skill and match demands, not punish you.",
      "Nutrition supports training — start with a protein target you can hit with familiar foods.",
      "Recovery (sleep, rest days) is part of the plan, not a reward after burnout.",
      "Elite context ≠ your exact dosages; scale volume and intensity to your life.",
    ],
    faqs: [
      {
        question: "Is this Virat Kohli’s official training plan?",
        answer:
          "No. This is independent educational commentary on themes that appear in public discussions of his career. fitlives is not affiliated with him or any cricket board.",
      },
      {
        question: "How many days a week should I train if I want consistency?",
        answer:
          "Most recreational athletes do well with 3–5 total sessions mixing strength and conditioning, plus rest. Consistency means weeks completed — not seven hard days every week.",
      },
      {
        question: "Do I need a very low body fat percentage?",
        answer:
          "Not for general health or recreational sport. Body composition can matter for some performance goals, but aggressive cuts often hurt training quality. Prioritize strength, skill, and sustainable habits first.",
      },
    ],
    related: [
      {
        href: "/tools/protein-calculator",
        label: "Protein calculator",
        blurb: "Set a daily protein target you can hit with Indian staples.",
      },
      {
        href: "/exercises",
        label: "Exercise library",
        blurb: "Build simple full-body strength sessions by muscle group.",
      },
      {
        href: "/blog/muscle-building",
        label: "Muscle building guides",
        blurb: "Progressive overload and recovery fundamentals.",
      },
      {
        href: "/training",
        label: "Training hub",
        blurb: "Programming principles that connect to exercises.",
      },
    ],
  },
  {
    slug: "neeraj-chopra",
    name: "Neeraj Chopra",
    sport: "Javelin / athletics",
    title: "Neeraj Chopra and Explosive Strength: Lessons for Everyday Training",
    excerpt:
      "Public athletic stories around Chopra highlight strength, technique, and explosive power — ideas you can adapt carefully without copying elite throwing programs.",
    updatedAt: "2026-09-22",
    readingMinutes: 7,
    cardImage:
      "https://images.unsplash.com/photo-1461896836934-ffe607ba6851?q=80&w=1200&auto=format&fit=crop",
    lessonOneLiner: "Strength plus intent beats random max-effort throwing.",
    quickAnswer:
      "Themes around Chopra’s public athletic profile often include building strength that transfers to explosive movement, respecting technique, and periodizing hard work — useful frames for gym athletes who want power without reckless volume.",
    slides: [
      {
        img: "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?q=80&w=1600&auto=format&fit=crop",
        text: ["STRENGTH", "WITH INTENT"],
      },
      {
        img: "https://images.unsplash.com/photo-1434682881908-b43d0467b798?q=80&w=1600&auto=format&fit=crop",
        text: ["EXPLOSIVE", "NOT CHAOTIC"],
      },
      {
        img: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=1600&auto=format&fit=crop",
        text: ["TECHNIQUE", "BEFORE LOAD"],
      },
      {
        img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1600&auto=format&fit=crop",
        text: ["POWER NEEDS", "RECOVERY"],
      },
      {
        img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1600&auto=format&fit=crop",
        text: ["BUILD", "THEN EXPRESS"],
      },
    ],
    sections: [
      {
        id: "public-themes",
        heading: "Public themes around explosive athletics",
        paragraphs: [
          "Javelin and similar field events reward force produced quickly through a coordinated chain: legs, trunk, and arm. Public narratives around Chopra’s career often stress gym strength that supports throwing, not strength as an end in itself. Again, this is thematic commentary — not a thrower’s program.",
          "Explosive work also demands recovery. You cannot max-effort jump, sprint, and lift heavy every day and expect progress. Elite programs periodize; recreational athletes should too, even in a simpler form.",
        ],
      },
      {
        id: "what-to-apply",
        heading: "What you can apply in a normal gym",
        paragraphs: [
          "Prioritize hinge and squat patterns, single-leg work, and upper-body pushing/pulling with clean technique. Add low-volume jumps or medicine-ball throws only after you can land softly and brace your trunk.",
          "If your goal is general athleticism, two strength days and one power-focused day (lighter loads, faster intent) is a safer starting template than daily max throws or Olympic lifts without coaching.",
          "Mobility for hips, thoracic spine, and shoulders supports long levers and overhead patterns — but stretch after training needs, not as a substitute for strength.",
        ],
      },
      {
        id: "indian-context",
        heading: "Access and progression in Indian settings",
        paragraphs: [
          "Many gyms have dumbbells, cables, and a rack — enough for a strong base. Fancy implements help specialists; they are not prerequisites for becoming stronger and more powerful as a general athlete.",
          "Youth athletes especially should emphasize coaching, gradual loading, and school/work balance. Copying elite competition schedules is a common path to overuse injuries.",
        ],
      },
      {
        id: "boundaries",
        heading: "Boundaries for this commentary",
        paragraphs: [
          "fitlives is not affiliated with Neeraj Chopra, Athletics Federation of India, or any sponsor. This page does not prescribe throwing volumes or competition peaking. Seek a qualified coach for sport-specific training.",
        ],
      },
    ],
    takeaways: [
      "Build strength that you can express quickly — then practice intent with low volume.",
      "Technique and landing quality come before adding jump or throw volume.",
      "Schedule hard power work with easy days around it.",
      "Specialist equipment is optional; progressive strength is not.",
      "Youth and novices need coaching more than maximal loading.",
    ],
    faqs: [
      {
        question: "Should I start Olympic lifts to become more explosive?",
        answer:
          "Only if you have competent coaching. Many athletes develop useful power with jumps, throws, and fast concentric lifts using safer patterns. Technique risk rises quickly with complex lifts.",
      },
      {
        question: "How often should I do explosive sessions?",
        answer:
          "For most recreational athletes, one to two focused power sessions per week is enough when combined with strength training and rest.",
      },
    ],
    related: [
      {
        href: "/exercises/legs",
        label: "Leg exercises",
        blurb: "Hinge and squat patterns that support athletic strength.",
      },
      {
        href: "/tools/tdee-calculator",
        label: "TDEE calculator",
        blurb: "Fuel training days without guessing calories blindly.",
      },
      {
        href: "/muscle-building",
        label: "Muscle building hub",
        blurb: "Hypertrophy and strength fundamentals.",
      },
      {
        href: "/training",
        label: "Training hub",
        blurb: "Volume, recovery, and progressive overload.",
      },
    ],
  },
  {
    slug: "pv-sindhu",
    name: "P.V. Sindhu",
    sport: "Badminton",
    title: "P.V. Sindhu: Power, Recovery, and Career Length",
    excerpt:
      "Public discussions of Sindhu’s career often highlight explosive court work balanced with recovery — a useful model for high-intensity sports and busy lives.",
    updatedAt: "2026-09-22",
    readingMinutes: 7,
    cardImage:
      "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=1200&auto=format&fit=crop",
    lessonOneLiner: "High intensity needs planned recovery to last.",
    quickAnswer:
      "Themes around Sindhu’s long career at elite intensity often include repeatable power, footwork conditioning, and recovery practices that let hard sessions stack across seasons — not endless grinding without rest.",
    slides: [
      {
        img: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=1600&auto=format&fit=crop",
        text: ["POWER ON", "THE COURT"],
      },
      {
        img: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1600&auto=format&fit=crop",
        text: ["FOOTWORK", "IS FITNESS"],
      },
      {
        img: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1600&auto=format&fit=crop",
        text: ["INTENSITY", "WITH LIMITS"],
      },
      {
        img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1600&auto=format&fit=crop",
        text: ["RECOVERY", "EXTENDS CAREERS"],
      },
      {
        img: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1600&auto=format&fit=crop",
        text: ["EAT TO", "REPEAT"],
      },
    ],
    sections: [
      {
        id: "public-themes",
        heading: "What longevity at high intensity usually requires",
        paragraphs: [
          "Badminton demands repeated accelerations, lunges, and overhead power. Public commentary on long careers in the sport often credits more than talent: conditioning that matches rallies, strength that protects joints, and recovery that prevents chronic overload.",
          "For fitlives readers, the transferable idea is simple: if your sport or training is high intensity, recovery is not optional. Sleep, rest days, and managing weekly hard-session count matter as much as the sessions themselves.",
        ],
      },
      {
        id: "what-to-apply",
        heading: "Practical applications",
        paragraphs: [
          "Include lateral movement, single-leg strength, and calf/Achilles resilience work if you play racquet sports. Progress lunges and deceleration drills gradually.",
          "Limit max-effort HIIT to a few sessions weekly. Pair hard days with easy aerobic or mobility days. Track soreness and sleep — if both crash for a week, cut volume before you “push through.”",
          "Strength two days per week (lower emphasis + upper pulling/pushing) supports stroke power and landing control without requiring bodybuilding volume.",
        ],
      },
      {
        id: "indian-context",
        heading: "Training around Indian schedules",
        paragraphs: [
          "Club courts and office hours often force late sessions. Keep a non-negotiable wind-down: hydrate, a protein-containing meal, and enough sleep. Late caffeine and skipped meals quietly erode recovery.",
          "Heat and humidity raise fluid needs. Conditioning outdoors should respect heat — shorter intervals, shade, and salt/fluid awareness beat heroic midday sessions.",
        ],
      },
      {
        id: "boundaries",
        heading: "Boundaries for this commentary",
        paragraphs: [
          "fitlives is not affiliated with P.V. Sindhu, Badminton Association of India, or any sponsor. This is educational commentary, not a coaching plan or medical guidance.",
        ],
      },
    ],
    takeaways: [
      "High-intensity sports need scheduled easy days.",
      "Single-leg strength and landing control protect busy joints.",
      "Weekly hard-session count is a dial you can turn down.",
      "Sleep and meals after late training are part of performance.",
      "Heat changes how hard you should push outdoors.",
    ],
    faqs: [
      {
        question: "Can I copy elite badminton footwork drills at home?",
        answer:
          "You can use simplified ladder or cone patterns for general agility, but sport-specific volumes should be coached. Start low volume and prioritize landing soft and tall posture.",
      },
      {
        question: "How do I know if I am under-recovering?",
        answer:
          "Rising resting fatigue, falling performance, poor sleep, and lingering joint pain are common signals. Reduce intensity for several days and reassess. Persistent pain needs professional care.",
      },
    ],
    related: [
      {
        href: "/exercises/legs",
        label: "Legs & landing strength",
        blurb: "Support lunges, cuts, and court movement.",
      },
      {
        href: "/tools/calorie-calculator",
        label: "Calorie calculator",
        blurb: "Rough energy needs for active weeks.",
      },
      {
        href: "/weight-loss",
        label: "Weight loss hub",
        blurb: "If fat loss is a goal, protect training quality.",
      },
      {
        href: "/blog/nutrition",
        label: "Nutrition guides",
        blurb: "Fuel and recovery-oriented reading.",
      },
    ],
  },
  {
    slug: "mary-kom",
    name: "Mary Kom",
    sport: "Boxing",
    title: "Mary Kom: Discipline and Longevity Across a Long Career",
    excerpt:
      "Public narratives around Mary Kom’s career emphasize sustained discipline across years — a reminder that fitness is a long game of habits, not a single peak week.",
    updatedAt: "2026-09-22",
    readingMinutes: 7,
    cardImage:
      "https://images.unsplash.com/photo-1549719386-91aea5bc4ba8?q=80&w=1200&auto=format&fit=crop",
    lessonOneLiner: "Discipline is the habit that outlasts motivation.",
    quickAnswer:
      "Themes around Mary Kom’s long public career often highlight durable discipline: showing up across seasons, balancing hard combat training with recovery, and treating fitness as a multi-year craft rather than a short challenge.",
    slides: [
      {
        img: "https://images.unsplash.com/photo-1549719386-91aea5bc4ba8?q=80&w=1600&auto=format&fit=crop",
        text: ["DISCIPLINE", "OVER MOTIVATION"],
      },
      {
        img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1600&auto=format&fit=crop",
        text: ["YEARS NOT", "WEEKS"],
      },
      {
        img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1600&auto=format&fit=crop",
        text: ["HARD WORK", "PLUS REST"],
      },
      {
        img: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=1600&auto=format&fit=crop",
        text: ["SIMPLE FUEL", "DONE OFTEN"],
      },
      {
        img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1600&auto=format&fit=crop",
        text: ["IDENTITY", "AS A TRAINEE"],
      },
    ],
    sections: [
      {
        id: "public-themes",
        heading: "Discipline as a public theme",
        paragraphs: [
          "Combat sports careers that span many years are rarely about a single highlight moment. Public storytelling around Mary Kom often returns to persistence: training through changing life stages, protecting skill work, and treating preparation as routine.",
          "For everyday readers, “discipline” is less about toughness theater and more about systems: a calendar, a minimum session, and rules for sleep and food that survive busy weeks.",
        ],
      },
      {
        id: "what-to-apply",
        heading: "Building discipline without burning out",
        paragraphs: [
          "Define a floor, not only a ceiling: the smallest training dose that still counts (for example, 20 minutes of strength or shadow skill work). Floors keep identity alive when motivation dips.",
          "Separate skill, strength, and conditioning so one bad day does not erase all progress. Rotate emphasis across the week.",
          "Longevity requires saying no: not every sparring idea, challenge, or social media workout belongs in your plan. Progress is selective stress plus recovery.",
        ],
      },
      {
        id: "indian-context",
        heading: "Community gyms and home setups",
        paragraphs: [
          "Many Indian trainees train in shared gyms or with limited equipment. Consistency still wins: bodyweight strength, jump rope, road work, and basic free weights cover a large share of general fitness needs.",
          "Family and work obligations are real constraints. Plan training like appointments, and involve household routines (earlier dinners, shared walks) when possible so fitness is not an isolated battle.",
        ],
      },
      {
        id: "boundaries",
        heading: "Boundaries for this commentary",
        paragraphs: [
          "fitlives is not affiliated with Mary Kom or any boxing federation or brand. We do not provide fight camps, weight-cut advice, or medical guidance. Combat sports carry injury risk — train under qualified coaches.",
        ],
      },
    ],
    takeaways: [
      "Build a minimum viable session for low-motivation days.",
      "Think in years of habits, not seven-day transformations.",
      "Hard work without recovery is not discipline — it is debt.",
      "Simple equipment is enough for a strong general base.",
      "Combat sports need coaching; do not self-direct sparring volume.",
    ],
    faqs: [
      {
        question: "How do I stay consistent when motivation disappears?",
        answer:
          "Shrink the session, keep the streak, and protect sleep. Motivation follows action more often than the reverse. Revisit goals weekly, not hourly.",
      },
      {
        question: "Is road work required for fitness like boxers?",
        answer:
          "Steady aerobic work helps recovery and work capacity, but it does not have to be long runs. Brisk walking, cycling, or easy jogging can fill the same role for many people.",
      },
    ],
    related: [
      {
        href: "/exercises/core",
        label: "Core exercises",
        blurb: "Trunk strength that supports athletic movement.",
      },
      {
        href: "/tools/bmi-calculator",
        label: "BMI calculator",
        blurb: "One limited screening number — not a full health picture.",
      },
      {
        href: "/blog/weight-loss",
        label: "Weight loss guides",
        blurb: "If body weight is a goal, keep it sustainable.",
      },
      {
        href: "/about",
        label: "About fitlives",
        blurb: "How we approach educational fitness content.",
      },
    ],
  },
];

export function getAthleteStory(slug: string): AthleteStory | undefined {
  return ATHLETE_STORIES.find((s) => s.slug === slug);
}

export function getAllAthleteSlugs(): string[] {
  return ATHLETE_STORIES.map((s) => s.slug);
}
