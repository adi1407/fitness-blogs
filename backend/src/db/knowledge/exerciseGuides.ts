import type { MuscleGroup } from "../../constants/knowledgeContent";
import { TRAINING_LINK, type ExerciseExpansion } from "./exerciseGuide";
import { ARM_GUIDES } from "./exercisesArms";
import { BACK_GUIDES } from "./exercisesBack";
import { CARDIO_GUIDES } from "./exercisesCardio";
import { CHEST_GUIDES } from "./exercisesChest";
import { CORE_GUIDES } from "./exercisesCore";
import { LEG_GUIDES } from "./exercisesLegs";
import { SHOULDER_GUIDES } from "./exercisesShoulders";

const a = (href: string, text: string) => `<a href="${href}">${text}</a>`;

const LIFTING_LINKS = `Results come from consistent training over months — see ${a(TRAINING_LINK.timeline, "how long it takes to build muscle")} — and from eating enough protein (${a(TRAINING_LINK.protein, "how much protein to build muscle")}). Plan your meals with the ${a(TRAINING_LINK.gymDiet, "beginner gym diet plan")}, and use the ${a("/one-rep-max-calculator", "one-rep max calculator")} to pick working weights.`;

/** Group-level programming context appended to every exercise in that group. */
const GROUP_CONTEXT: Record<MuscleGroup, { title: string; text: string }> = {
  chest: {
    title: "Building a chest routine",
    text: `Most people grow well on about 10–20 hard sets of chest work a week, split over two sessions. A simple structure is one heavy press (bench or incline dumbbell), one lighter press or dip, and one fly. Keep most sets 1–3 reps short of failure, and match your pressing with roughly equal rowing to keep the shoulders healthy. ${LIFTING_LINKS}`,
  },
  back: {
    title: "Building a back routine",
    text: `Train the back in two directions: a vertical pull (pull-ups or pulldowns) and a horizontal pull (rows). About 10–20 hard sets a week across two sessions suits most people, with one hinge such as the deadlift or Romanian deadlift for the lower back. Add face pulls or rear delt work 2–3 times a week to balance pressing. ${LIFTING_LINKS}`,
  },
  shoulders: {
    title: "Building a shoulder routine",
    text: `Presses train the front shoulders well, so most shoulder programs add direct work for the side and rear heads. A practical week: one overhead press 1–2 times, lateral raises 2–3 times and rear delt flies or face pulls 2–3 times, totalling around 8–16 sets for the side and rear shoulders. ${LIFTING_LINKS}`,
  },
  arms: {
    title: "Building an arm routine",
    text: `Rows and pull-ups already work the biceps, and presses work the triceps, so arms need less direct work than people think — about 6–12 extra sets each for biceps and triceps per week. Pair a curl with a triceps exercise in a superset to save time, and change the grip or angle every few weeks. ${LIFTING_LINKS}`,
  },
  legs: {
    title: "Building a leg routine",
    text: `A complete leg week includes a squat or leg press for the quads, a hinge such as the Romanian deadlift for the hamstrings and glutes, a single-leg exercise like lunges or split squats, and calf raises. Around 10–20 hard sets for quads and 8–16 for hamstrings, split over two sessions, works for most people. ${LIFTING_LINKS}`,
  },
  core: {
    title: "Building a core routine",
    text: `A strong core resists movement as much as it creates it. Choose one anti-extension exercise (plank, dead bug, ab wheel), one anti-rotation or side exercise (Pallof press, side plank, woodchop) and one flexion exercise (hanging knee raise). Two or three short sessions a week, 2–3 sets each, are enough alongside heavy compound lifts. Visible abs also depend on body fat — see ${a(TRAINING_LINK.bellyFat, "how to lose belly fat")}.`,
  },
  cardio: {
    title: "Building a cardio routine",
    text: `Most health guidelines recommend 150–300 minutes of moderate cardio or 75–150 minutes of vigorous cardio a week. A practical mix is 2–4 easy sessions (zone 2 walking, cycling, rowing or swimming) and 1–2 harder interval sessions. Keep hard intervals away from heavy leg days, and remember daily steps matter too — see ${a(TRAINING_LINK.walking, "whether walking helps you lose weight")} and the ${a("/steps-to-calories-calculator", "steps to calories calculator")}.`,
  },
};

const GUIDES: Partial<Record<MuscleGroup, Record<string, ExerciseExpansion>>> = {
  chest: CHEST_GUIDES,
  back: BACK_GUIDES,
  shoulders: SHOULDER_GUIDES,
  arms: ARM_GUIDES,
  legs: LEG_GUIDES,
  core: CORE_GUIDES,
  cardio: CARDIO_GUIDES,
};

function withContext(group: MuscleGroup, guides: Record<string, ExerciseExpansion>) {
  const ctx = GROUP_CONTEXT[group];
  const section = `\n<h2>${ctx.title}</h2>\n<p>${ctx.text}</p>`;
  return Object.fromEntries(
    Object.entries(guides).map(([slug, g]) => [slug, { ...g, bodyHtml: g.bodyHtml + section }]),
  );
}

export const EXERCISE_GUIDES: Partial<Record<MuscleGroup, Record<string, ExerciseExpansion>>> =
  Object.fromEntries(
    Object.entries(GUIDES).map(([group, guides]) => [
      group,
      withContext(group as MuscleGroup, guides ?? {}),
    ]),
  );
