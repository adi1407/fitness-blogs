/**
 * Long-form exercise guides. `buildExerciseGuide` turns structured sections into
 * the `body_html` rendered above the form cues / mistakes / programming notes.
 */

export type ExerciseVariation = {
  name: string;
  /** Sibling exercise path, e.g. `/exercises/chest/push-ups`. */
  href?: string;
  note: string;
};

export type ExerciseGuide = {
  quickAnswer?: string;
  /** What it trains and who it suits. */
  intro: string;
  setup: string[];
  steps: string[];
  breathing: string;
  variations: ExerciseVariation[];
  /** Rows matching `dosageHeaders` (default: goal, sets, reps, rest). */
  dosage: string[][];
  dosageHeaders?: string[];
  progression: string;
  safety: string;
  faq: { q: string; a: string }[];
  formCues: string[];
  commonMistakes: string[];
  programmingNotes: string;
};

export type ExerciseExpansion = {
  quickAnswer?: string;
  bodyHtml: string;
  formCues: string[];
  commonMistakes: string[];
  programmingNotes: string;
};

/** Published articles only — exercise bodies are served without the unpublished-link guard. */
export const TRAINING_LINK = {
  overload: "/blog/muscle-building/training-programs/what-is-progressive-overload/399232323",
  timeline:
    "/blog/muscle-building/muscle-growth-hypertrophy/how-long-does-it-take-to-build-muscle/739011960",
  protein:
    "/blog/muscle-building/muscle-building-nutrition/how-much-protein-to-build-muscle/418755868",
  gymDiet: "/blog/muscle-building/beginner-muscle-building/beginner-gym-diet-plan/912245706",
  walking: "/blog/weight-loss/walking-daily-activity/does-walking-help-you-lose-weight/727382084",
  bellyFat: "/blog/weight-loss/fat-loss-basics/how-to-lose-belly-fat/355528441",
};

const a = (href: string, text: string) => `<a href="${href}">${text}</a>`;

const DEFAULT_DOSAGE_HEADERS = ["Goal", "Sets", "Reps", "Rest"];

function variationItem(v: ExerciseVariation): string {
  const name = v.href ? a(v.href, v.name) : v.name;
  return `<li><strong>${name}</strong> — ${v.note}</li>`;
}

export function buildExerciseGuide(g: ExerciseGuide): ExerciseExpansion {
  const body = [
    `<h2>What it trains and who it's for</h2>`,
    `<p>${g.intro}</p>`,
    `<h2>Setup</h2>`,
    `<ol>${g.setup.map((s) => `<li>${s}</li>`).join("")}</ol>`,
    `<h2>How to do it</h2>`,
    `<ol>${g.steps.map((s) => `<li>${s}</li>`).join("")}</ol>`,
    `<h2>Breathing and tempo</h2>`,
    `<p>${g.breathing}</p>`,
    `<h2>Variations and alternatives</h2>`,
    `<ul>${g.variations.map(variationItem).join("")}</ul>`,
    `<h2>${g.dosageHeaders ? "How much and how often" : "Sets, reps and rest"}</h2>`,
    `<table><thead><tr>${(g.dosageHeaders ?? DEFAULT_DOSAGE_HEADERS).map((h) => `<th>${h}</th>`).join("")}</tr></thead><tbody>${g.dosage
      .map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join("")}</tr>`)
      .join("")}</tbody></table>`,
    `<h2>How to progress</h2>`,
    `<p>${g.progression}</p>`,
    `<h2>Safety</h2>`,
    `<p>${g.safety}</p>`,
    `<h2>FAQ</h2>`,
    ...g.faq.map((f) => `<h3>${f.q}</h3><p>${f.a}</p>`),
  ].join("\n");

  return {
    quickAnswer: g.quickAnswer,
    bodyHtml: body,
    formCues: g.formCues,
    commonMistakes: g.commonMistakes,
    programmingNotes: g.programmingNotes,
  };
}

export const OVERLOAD_NOTE = `Log every session and add reps before weight — see ${a(TRAINING_LINK.overload, "what progressive overload is")}.`;
