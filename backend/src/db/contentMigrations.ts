import { pool } from "./pool";

/**
 * One-off editorial changes to live article bodies. Each migration runs once
 * per database (tracked in `content_migrations`), so later CMS edits — including
 * removing the inserted text — are never overwritten.
 */

const PATHS: Record<string, string> = {
  "how-much-protein-do-you-need-per-day": "nutrition/protein",
  "100g-chicken-breast-calories-and-protein": "nutrition/protein",
  "100g-paneer-calories-and-protein": "nutrition/protein",
  "2-eggs-calories-and-protein": "nutrition/protein",
  "best-high-protein-indian-foods": "nutrition/protein",
  "how-much-water-should-you-drink": "nutrition/hydration",
  "protein-before-or-after-workout": "nutrition/sports-nutrition",
  "how-many-calories-should-i-eat-to-lose-weight": "weight-loss/calorie-deficit",
  "how-to-calculate-your-calorie-deficit": "weight-loss/calorie-deficit",
  "how-many-calories-should-i-eat-to-lose-10-kg": "weight-loss/calorie-deficit",
  "rice-vs-roti-for-weight-loss": "weight-loss/weight-loss-nutrition",
  "best-indian-foods-for-weight-loss": "weight-loss/weight-loss-nutrition",
  "is-paneer-good-for-weight-loss": "weight-loss/weight-loss-nutrition",
  "how-to-lose-belly-fat": "weight-loss/fat-loss-basics",
  "is-rice-good-for-weight-loss": "weight-loss/weight-loss-myths",
  "best-breakfast-for-weight-loss": "weight-loss/diet-meal-planning",
  "best-dinner-for-weight-loss": "weight-loss/diet-meal-planning",
  "does-walking-help-you-lose-weight": "weight-loss/walking-daily-activity",
  "why-am-i-not-losing-weight": "weight-loss/weight-loss-plateaus",
  "how-much-protein-to-build-muscle": "muscle-building/muscle-building-nutrition",
  "how-long-does-it-take-to-build-muscle": "muscle-building/muscle-growth-hypertrophy",
  "beginner-gym-diet-plan": "muscle-building/beginner-muscle-building",
  "what-is-progressive-overload": "muscle-building/training-programs",
};

/** Un-numbered on purpose: `normalizeAllArticleLinks` rewrites them to live URLs. */
function a(slug: string, text: string): string {
  return `<a href="/blog/${PATHS[slug]}/${slug}">${text}</a>`;
}

function calc(tool: string, text: string): string {
  return `<a href="/${tool}">${text}</a>`;
}

const READ_NEXT_MARKER = "<strong>Where to go next:</strong>";

function readNext(sentence: string): string {
  return `<p>${READ_NEXT_MARKER} ${sentence}</p>`;
}

const READ_NEXT: Record<string, string> = {
  "how-much-protein-do-you-need-per-day": readNext(
    `Turn your target into real meals with the ${a("best-high-protein-indian-foods", "best high-protein Indian foods")}. Training for size? See ${a("how-much-protein-to-build-muscle", "how much protein you need to build muscle")} and whether to have it ${a("protein-before-or-after-workout", "before or after your workout")}.`,
  ),
  "how-many-calories-should-i-eat-to-lose-weight": readNext(
    `Once you have a number, pick foods that make it easy with the ${a("best-indian-foods-for-weight-loss", "best Indian foods for weight loss")}, and add steps — ${a("does-walking-help-you-lose-weight", "walking helps more than most people think")}. If the scale stalls after a few weeks, read ${a("why-am-i-not-losing-weight", "why you might not be losing weight")}.`,
  ),
  "how-to-calculate-your-calorie-deficit": readNext(
    `Planning a bigger goal? See ${a("how-many-calories-should-i-eat-to-lose-10-kg", "how many calories to eat to lose 10 kg")}. Keep protein high to protect muscle (${a("how-much-protein-do-you-need-per-day", "how much protein you need per day")}), and if progress stops, work through ${a("why-am-i-not-losing-weight", "the 9 reasons weight loss stalls")}.`,
  ),
  "how-much-protein-to-build-muscle": readNext(
    `Protein only builds muscle if training gives it a reason — start with ${a("what-is-progressive-overload", "progressive overload")}. For full meal ideas, see the ${a("beginner-gym-diet-plan", "beginner gym diet plan")} and the ${a("best-high-protein-indian-foods", "best high-protein Indian foods")}.`,
  ),
  "100g-chicken-breast-calories-and-protein": readNext(
    `Work out how much protein you need with the ${calc("protein-calculator", "protein calculator")}, then compare chicken with ${a("100g-paneer-calories-and-protein", "100 g of paneer")} and ${a("2-eggs-calories-and-protein", "two eggs")}. For the bigger picture, read ${a("how-much-protein-do-you-need-per-day", "how much protein you need per day")}.`,
  ),
  "100g-paneer-calories-and-protein": readNext(
    `Check your daily target with the ${calc("protein-calculator", "protein calculator")}. Trying to lose weight? Read ${a("is-paneer-good-for-weight-loss", "whether paneer is good for weight loss")}, compare it with ${a("100g-chicken-breast-calories-and-protein", "100 g of chicken breast")}, or browse more ${a("best-high-protein-indian-foods", "high-protein Indian foods")}.`,
  ),
  "2-eggs-calories-and-protein": readNext(
    `See where eggs fit in your day with the ${calc("protein-calculator", "protein calculator")}. For vegetarian swaps, compare ${a("100g-paneer-calories-and-protein", "100 g of paneer")}, and for egg-based meal ideas, try the ${a("best-breakfast-for-weight-loss", "best breakfasts for weight loss")}.`,
  ),
  "rice-vs-roti-for-weight-loss": readNext(
    `Portions matter more than the grain — get your daily number from the ${calc("calorie-calculator", "calorie calculator")}. Then read ${a("is-rice-good-for-weight-loss", "whether rice is good for weight loss")} and build a lighter evening plate with the ${a("best-dinner-for-weight-loss", "best dinners for weight loss")}.`,
  ),
  "best-indian-foods-for-weight-loss": readNext(
    `Put these foods into a day of eating with the ${a("best-breakfast-for-weight-loss", "best breakfasts")} and ${a("best-dinner-for-weight-loss", "best dinners for weight loss")}. Eating well but not losing? These are ${a("why-am-i-not-losing-weight", "the most common reasons the scale gets stuck")}.`,
  ),
  "best-high-protein-indian-foods": readNext(
    `Get the exact numbers for favourites like ${a("100g-paneer-calories-and-protein", "paneer")} and ${a("2-eggs-calories-and-protein", "eggs")}, and if you’re training, see ${a("how-much-protein-to-build-muscle", "how much protein builds muscle")}.`,
  ),
  "how-to-lose-belly-fat": readNext(
    `Set a realistic daily target with the ${calc("calorie-calculator", "calorie calculator")}. Add ${a("does-walking-help-you-lose-weight", "daily walking")} and strength training with ${a("what-is-progressive-overload", "progressive overload")}, and if your waist stops shrinking, read ${a("why-am-i-not-losing-weight", "why weight loss stalls")}.`,
  ),
  "how-many-calories-should-i-eat-to-lose-10-kg": readNext(
    `Learn how to set and adjust the deficit in ${a("how-to-calculate-your-calorie-deficit", "how to calculate your calorie deficit")}, fill your plate with the ${a("best-indian-foods-for-weight-loss", "best Indian foods for weight loss")}, and keep this handy for the inevitable slow weeks: ${a("why-am-i-not-losing-weight", "why am I not losing weight?")}`,
  ),
  "how-much-water-should-you-drink": readNext(
    `Water can also hide fat loss on the scale for a week or two — here’s ${a("why-am-i-not-losing-weight", "how to tell a real plateau from water")}. For the food side, see the ${a("best-indian-foods-for-weight-loss", "best Indian foods for weight loss")} and get a daily target from the ${calc("calorie-calculator", "calorie calculator")}.`,
  ),
  "is-rice-good-for-weight-loss": readNext(
    `Compare the two staples in ${a("rice-vs-roti-for-weight-loss", "rice vs roti for weight loss")}, see how rice fits into the ${a("best-dinner-for-weight-loss", "best dinners for weight loss")}, and check how much you can eat with the ${calc("calorie-calculator", "calorie calculator")}.`,
  ),
  "is-paneer-good-for-weight-loss": readNext(
    `See the full numbers in ${a("100g-paneer-calories-and-protein", "100 g paneer calories and protein")}, find your daily target with the ${calc("protein-calculator", "protein calculator")}, and try paneer in the ${a("best-dinner-for-weight-loss", "best dinners for weight loss")}.`,
  ),
  "best-breakfast-for-weight-loss": readNext(
    `Plan the rest of the day with the ${a("best-dinner-for-weight-loss", "best dinners for weight loss")}, see how ${a("2-eggs-calories-and-protein", "two eggs")} add up, and get your calorie target from the ${calc("calorie-calculator", "calorie calculator")}.`,
  ),
  "best-dinner-for-weight-loss": readNext(
    `Start the day right with the ${a("best-breakfast-for-weight-loss", "best breakfasts for weight loss")}, settle the ${a("rice-vs-roti-for-weight-loss", "rice vs roti")} question, and if dinners are on point but the scale isn’t moving, read ${a("why-am-i-not-losing-weight", "why weight loss stalls")}. Your daily target comes from the ${calc("calorie-calculator", "calorie calculator")}.`,
  ),
  "protein-before-or-after-workout": readNext(
    `Timing matters less than your daily total — see ${a("how-much-protein-to-build-muscle", "how much protein builds muscle")}. Then make every session count with ${a("what-is-progressive-overload", "progressive overload")} and a simple ${a("beginner-gym-diet-plan", "beginner gym diet plan")}.`,
  ),
  "how-long-does-it-take-to-build-muscle": readNext(
    `Speed up the timeline the right way with ${a("what-is-progressive-overload", "progressive overload")}, ${a("how-much-protein-to-build-muscle", "enough protein")}, and a ${a("beginner-gym-diet-plan", "beginner gym diet plan")}. Get your protein target from the ${calc("protein-calculator", "protein calculator")}.`,
  ),
  "beginner-gym-diet-plan": readNext(
    `Pair this plan with training that keeps progressing — read ${a("what-is-progressive-overload", "what progressive overload is")}. Build meals around the ${a("best-high-protein-indian-foods", "best high-protein Indian foods")}, and see whether to have protein ${a("protein-before-or-after-workout", "before or after your workout")}.`,
  ),
  "does-walking-help-you-lose-weight": readNext(
    `Walking every day but the scale won’t move? Read ${a("why-am-i-not-losing-weight", "the 9 real reasons weight loss stalls")}, and see ${a("how-to-lose-belly-fat", "how to lose belly fat")} for the full plan.`,
  ),
};

async function insertReadNextLinks(): Promise<void> {
  const slugs = Object.keys(READ_NEXT);
  const res = await pool.query<{ id: string; slug: string; body: string }>(
    `SELECT id, slug, body FROM articles WHERE slug = ANY($1::text[])`,
    [slugs],
  );
  let updated = 0;
  for (const row of res.rows) {
    if (!row.body || row.body.includes(READ_NEXT_MARKER)) continue;
    const block = READ_NEXT[row.slug];
    const anchor = row.body.indexOf("<h2>Key takeaways</h2>");
    const body =
      anchor >= 0
        ? `${row.body.slice(0, anchor)}${block}\n${row.body.slice(anchor)}`
        : `${row.body}\n${block}`;
    await pool.query(`UPDATE articles SET body = $1 WHERE id = $2`, [body, row.id]);
    updated++;
  }
  console.log(`[db] read-next links added to ${updated} articles`);
}

/** Calculators moved from `/tools/{x}-calculator` to `/{x}-calculator` (old URLs 308 on the site). */
async function rootCalculatorLinks(): Promise<void> {
  const res = await pool.query(
    `UPDATE articles
        SET body = regexp_replace(body, '/tools/([a-z]+-calculator)', '/\\1', 'g'),
            quick_answer = regexp_replace(quick_answer, '/tools/([a-z]+-calculator)', '/\\1', 'g'),
            faq = regexp_replace(faq::text, '/tools/([a-z]+-calculator)', '/\\1', 'g')::jsonb
      WHERE body ~ '/tools/[a-z]+-calculator'
         OR quick_answer ~ '/tools/[a-z]+-calculator'
         OR faq::text ~ '/tools/[a-z]+-calculator'`,
  );
  console.log(`[db] calculator links moved to root URLs in ${res.rowCount ?? 0} articles`);
}

const MIGRATIONS: { id: string; run: () => Promise<void> }[] = [
  { id: "2026-09-29-read-next-links", run: insertReadNextLinks },
  { id: "2026-10-05-root-calculator-links", run: rootCalculatorLinks },
];

export async function applyContentMigrations(): Promise<void> {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS content_migrations (
      id TEXT PRIMARY KEY,
      applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
  for (const m of MIGRATIONS) {
    const done = await pool.query(`SELECT 1 FROM content_migrations WHERE id = $1`, [m.id]);
    if (done.rowCount) continue;
    await m.run();
    await pool.query(
      `INSERT INTO content_migrations (id) VALUES ($1) ON CONFLICT (id) DO NOTHING`,
      [m.id],
    );
  }
}
