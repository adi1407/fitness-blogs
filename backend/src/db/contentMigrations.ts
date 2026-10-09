import { pool } from "./pool";
import { SEO_META, SEO_META_REWRITES } from "./intentArticles/seoMeta";
import { INTENT_ARTICLES } from "./seedIntentArticles";

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
  "is-whey-protein-safe": "nutrition/protein",
  "is-ghee-good-for-you": "nutrition/dietary-fats",
  "is-creatine-safe": "muscle-building/muscle-building-nutrition",
  "does-intermittent-fasting-work": "weight-loss/intermittent-fasting",
  "maintenance-calories": "nutrition/calories-energy",
  "bmr-vs-tdee": "nutrition/calories-energy",
  "1500-calorie-indian-diet-plan": "weight-loss/diet-meal-planning",
  "indian-diet-plan-for-weight-loss": "weight-loss/diet-meal-planning",
  "vegetarian-protein-sources-india": "nutrition/protein",
  "protein-for-weight-loss": "weight-loss/weight-loss-nutrition",
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

/** Articles published after the first read-next pass. */
const READ_NEXT_NEWEST: Record<string, string> = {
  "is-whey-protein-safe": readNext(
    `Work out how much protein you actually need with the ${calc("protein-calculator", "protein calculator")} and ${a("how-much-protein-do-you-need-per-day", "how much protein per day")}. Prefer food first? Start with the ${a("best-high-protein-indian-foods", "best high-protein Indian foods")}, and if you train, read ${a("is-creatine-safe", "is creatine safe?")}`,
  ),
  "is-ghee-good-for-you": readNext(
    `Fit ghee into a daily target with the ${calc("calorie-calculator", "calorie calculator")}. Trying to lose weight? See the ${a("best-indian-foods-for-weight-loss", "best Indian foods for weight loss")} and ${a("is-paneer-good-for-weight-loss", "whether paneer is good for weight loss")}.`,
  ),
  "is-creatine-safe": readNext(
    `Creatine works best with training that keeps progressing — read ${a("what-is-progressive-overload", "what progressive overload is")} and track your lifts with the ${calc("one-rep-max-calculator", "one rep max calculator")}. Then cover the basics: ${a("how-much-protein-to-build-muscle", "how much protein builds muscle")} and ${a("is-whey-protein-safe", "is whey protein safe?")}`,
  ),
  "why-am-i-not-losing-weight": readNext(
    `Recheck your numbers with the ${calc("tdee-calculator", "TDEE calculator")} and the ${calc("calorie-deficit-calculator", "calorie deficit calculator")}, then read ${a("how-to-calculate-your-calorie-deficit", "how to calculate your calorie deficit")}. Daily steps help more than most people expect: ${a("does-walking-help-you-lose-weight", "does walking help you lose weight?")}`,
  ),
  "does-intermittent-fasting-work": readNext(
    `Fasting only works if it creates a deficit — get your target from the ${calc("calorie-deficit-calculator", "calorie deficit calculator")} and read ${a("how-many-calories-should-i-eat-to-lose-weight", "how many calories to eat to lose weight")}. Plan your eating window with the ${a("best-breakfast-for-weight-loss", "best breakfasts")} and ${a("best-dinner-for-weight-loss", "best dinners for weight loss")}.`,
  ),
};

async function insertReadNextLinks(blocks: Record<string, string> = READ_NEXT): Promise<void> {
  const slugs = Object.keys(blocks);
  const res = await pool.query<{ id: string; slug: string; body: string }>(
    `SELECT id, slug, body FROM articles WHERE slug = ANY($1::text[])`,
    [slugs],
  );
  let updated = 0;
  for (const row of res.rows) {
    if (!row.body || row.body.includes(READ_NEXT_MARKER)) continue;
    const block = blocks[row.slug];
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

function food(slug: string, text: string): string {
  return `<a href="/foods/${slug}">${text}</a>`;
}

const FOOD_DATA_MARKER = "<strong>Food data:</strong>";
const FOOD_CHART = food("indian", "Indian food calories &amp; protein chart");

const FOOD_DATA: Record<string, string> = {
  "best-high-protein-indian-foods": `Compare exact values per serving for ${food("paneer", "paneer")}, ${food("chicken-breast", "chicken breast")}, ${food("boiled-egg", "eggs")}, ${food("soybean", "soybean")}, ${food("kala-chana", "kala chana")} and ${food("moong-dal", "moong dal")}, or filter the full ${FOOD_CHART} by high protein.`,
  "how-much-protein-do-you-need-per-day": `See how much protein your usual foods give per katori, roti or piece in our ${FOOD_CHART}.`,
  "100g-paneer-calories-and-protein": `Use the serving calculator on our ${food("paneer", "paneer nutrition page")} to get calories and protein for any amount, from 1 cube to 200 g.`,
  "100g-chicken-breast-calories-and-protein": `Work out calories and protein for your exact portion on our ${food("chicken-breast", "chicken breast nutrition page")}, or compare it with ${food("chicken-thigh", "chicken thigh")}.`,
  "2-eggs-calories-and-protein": `Get values for any number of eggs on our ${food("boiled-egg", "boiled egg nutrition page")}, and see how ${food("egg-white", "egg whites")} compare.`,
  "rice-vs-roti-for-weight-loss": `Check calories per katori and per roti for ${food("rice", "rice")}, ${food("brown-rice", "brown rice")} and ${food("roti", "roti")}.`,
  "is-rice-good-for-weight-loss": `See calories per katori for ${food("rice", "white rice")} and ${food("brown-rice", "brown rice")}, or compare both with ${food("roti", "roti")}.`,
  "is-paneer-good-for-weight-loss": `Calculate calories and protein for your portion on our ${food("paneer", "paneer nutrition page")}.`,
  "best-indian-foods-for-weight-loss": `Look up calories per serving for dals, grains, fruit and vegetables in our ${FOOD_CHART} — filter by low calorie to find high-volume foods.`,
  "beginner-gym-diet-plan": `Swap foods in and out of this plan using the macros in our ${FOOD_CHART}.`,
};

/** Links articles that discuss specific foods to the matching /foods pages. */
async function insertFoodDataLinks(): Promise<void> {
  const slugs = Object.keys(FOOD_DATA);
  const res = await pool.query<{ id: string; slug: string; body: string }>(
    `SELECT id, slug, body FROM articles WHERE slug = ANY($1::text[])`,
    [slugs],
  );
  let updated = 0;
  for (const row of res.rows) {
    if (!row.body || row.body.includes(FOOD_DATA_MARKER)) continue;
    const block = `<p>${FOOD_DATA_MARKER} ${FOOD_DATA[row.slug]}</p>`;
    const anchor = row.body.indexOf("<h2>Key takeaways</h2>");
    const body =
      anchor >= 0
        ? `${row.body.slice(0, anchor)}${block}\n${row.body.slice(anchor)}`
        : `${row.body}\n${block}`;
    await pool.query(`UPDATE articles SET body = $1 WHERE id = $2`, [body, row.id]);
    updated++;
  }
  console.log(`[db] food data links added to ${updated} articles`);
}

/**
 * Search-intent meta titles/descriptions (docs/SEO_KEYWORD_MAP.md). Each field is
 * only replaced while it still holds the original seeded value, so CMS edits win.
 */
async function applySeoMeta(): Promise<void> {
  let titles = 0;
  let descriptions = 0;
  for (const def of INTENT_ARTICLES) {
    const meta = SEO_META[def.slug];
    if (!meta) continue;
    const t = await pool.query(
      `UPDATE articles SET meta_title = $1
        WHERE slug = $2 AND (COALESCE(meta_title, '') = '' OR meta_title = $3)`,
      [meta.metaTitle, def.slug, def.metaTitle],
    );
    const d = await pool.query(
      `UPDATE articles SET meta_description = $1
        WHERE slug = $2 AND (COALESCE(meta_description, '') = '' OR meta_description = $3)`,
      [meta.metaDescription, def.slug, def.metaDescription],
    );
    titles += t.rowCount ?? 0;
    descriptions += d.rowCount ?? 0;
  }
  console.log(`[db] SEO meta applied: ${titles} titles, ${descriptions} descriptions`);
}

async function applySeoMetaRewrites(): Promise<void> {
  let updated = 0;
  for (const [slug, { from, to }] of Object.entries(SEO_META_REWRITES)) {
    if (to.metaTitle) {
      const r = await pool.query(
        `UPDATE articles SET meta_title = $1 WHERE slug = $2 AND meta_title = $3`,
        [to.metaTitle, slug, from.metaTitle],
      );
      updated += r.rowCount ?? 0;
    }
    if (to.metaDescription) {
      const r = await pool.query(
        `UPDATE articles SET meta_description = $1 WHERE slug = $2 AND meta_description = $3`,
        [to.metaDescription, slug, from.metaDescription],
      );
      updated += r.rowCount ?? 0;
    }
  }
  console.log(`[db] SEO meta rewrites applied: ${updated} fields`);
}

/**
 * Publishing used to stamp the publisher as reviewer, which showed "Reviewed by"
 * without a real review. Clear only those auto-set values.
 */
async function clearAutoReviewers(): Promise<void> {
  const res = await pool.query(
    `UPDATE articles SET reviewer_id = NULL
      WHERE reviewer_id IS NOT NULL AND reviewer_id = published_by`,
  );
  console.log(`[db] cleared auto-set reviewer on ${res.rowCount ?? 0} articles`);
}

const AUTHOR_BIOS: Record<string, string> = {
  "Aditya Choudhary":
    "Aditya Choudhary writes fitlives' guides on nutrition, weight loss and muscle building, with a focus on everyday Indian food. His articles are built from published research and official guidelines, and every guide lists its sources so you can check the evidence yourself.",
};

async function seedAuthorBios(): Promise<void> {
  for (const [name, bio] of Object.entries(AUTHOR_BIOS)) {
    await pool.query(
      `UPDATE users SET bio = $1 WHERE name = $2 AND COALESCE(bio, '') = ''`,
      [bio, name],
    );
  }
}

const MAINTENANCE_MARKER = "<strong>Not sure of your maintenance?</strong>";

const MAINTENANCE_LINKS: Record<string, string> = {
  "how-many-calories-should-i-eat-to-lose-weight": `Every deficit starts from that number — learn ${a("maintenance-calories", "what maintenance calories are and how to find yours")}, including how to check the calculator’s estimate against two weeks of weigh-ins.`,
  "how-to-calculate-your-calorie-deficit": `A deficit is only as accurate as the number it comes from. See ${a("maintenance-calories", "how to find your maintenance calories")} and confirm them before you subtract anything.`,
};

/**
 * Adds one `<p><strong>marker</strong> sentence</p>` per article, just before
 * "Key takeaways" (or at the end). Skips articles that already contain the marker.
 */
async function insertMarkedParagraphs(
  marker: string,
  sentences: Record<string, string>,
  label: string,
): Promise<void> {
  const res = await pool.query<{ id: string; slug: string; body: string }>(
    `SELECT id, slug, body FROM articles WHERE slug = ANY($1::text[])`,
    [Object.keys(sentences)],
  );
  let updated = 0;
  for (const row of res.rows) {
    if (!row.body || row.body.includes(marker)) continue;
    const block = `<p>${marker} ${sentences[row.slug]}</p>`;
    const anchor = row.body.indexOf("<h2>Key takeaways</h2>");
    const body =
      anchor >= 0
        ? `${row.body.slice(0, anchor)}${block}\n${row.body.slice(anchor)}`
        : `${row.body}\n${block}`;
    await pool.query(`UPDATE articles SET body = $1 WHERE id = $2`, [body, row.id]);
    updated++;
  }
  console.log(`[db] ${label} added to ${updated} articles`);
}

/** Inbound links to the maintenance-calories article from its two closest siblings. */
function insertMaintenanceLinks(): Promise<void> {
  return insertMarkedParagraphs(MAINTENANCE_MARKER, MAINTENANCE_LINKS, "maintenance-calories links");
}

const PLAN_MARKER = "<strong>Put it into practice:</strong>";

/** Inbound links to the October calories, diet-plan and protein articles. */
const PLAN_LINKS: Record<string, string> = {
  "maintenance-calories": `Calculators show two numbers — here is ${a("bmr-vs-tdee", "BMR vs TDEE and which one to use")}. Ready to eat below maintenance? Start with our ${a("1500-calorie-indian-diet-plan", "1500 calorie Indian diet plan")}.`,
  "how-many-calories-should-i-eat-to-lose-weight": `Turn your number into meals with the ${a("1500-calorie-indian-diet-plan", "1500 calorie Indian diet plan")}, or follow a full week with our ${a("indian-diet-plan-for-weight-loss", "7-day Indian diet plan for weight loss")}. Mixing up the calculator’s numbers? Read ${a("bmr-vs-tdee", "BMR vs TDEE")}.`,
  "best-breakfast-for-weight-loss": `See how these breakfasts fit a whole day in our ${a("1500-calorie-indian-diet-plan", "1500 calorie Indian diet plan")} and the ${a("indian-diet-plan-for-weight-loss", "7-day Indian diet plan for weight loss")}.`,
  "best-dinner-for-weight-loss": `Plan the rest of the week with our ${a("indian-diet-plan-for-weight-loss", "7-day Indian diet plan for weight loss")}, or see a full day with gram weights in the ${a("1500-calorie-indian-diet-plan", "1500 calorie Indian diet plan")}.`,
  "best-indian-foods-for-weight-loss": `Build these foods into a week of meals with our ${a("indian-diet-plan-for-weight-loss", "Indian diet plan for weight loss")}, and keep protein high with ${a("protein-for-weight-loss", "how much protein you need for weight loss")}.`,
  "best-high-protein-indian-foods": `Vegetarian? Our guide to ${a("vegetarian-protein-sources-india", "vegetarian protein sources in India")} ranks every option by protein per calorie. Cutting calories? See ${a("protein-for-weight-loss", "protein for weight loss")}.`,
  "how-much-protein-do-you-need-per-day": `Losing weight? Targets are a little higher in a deficit — read ${a("protein-for-weight-loss", "protein for weight loss")}. Vegetarian? See the ${a("vegetarian-protein-sources-india", "best vegetarian protein sources in India")}.`,
  "is-paneer-good-for-weight-loss": `Paneer is one way to protect muscle in a deficit — here is ${a("protein-for-weight-loss", "how much protein you need for weight loss")} and how to spread it across your meals.`,
  "100g-paneer-calories-and-protein": `See how paneer compares with soya, dals and rajma in our ranking of ${a("vegetarian-protein-sources-india", "vegetarian protein sources in India")}.`,
};

function insertPlanLinks(): Promise<void> {
  return insertMarkedParagraphs(PLAN_MARKER, PLAN_LINKS, "diet-plan and protein links");
}

const NEXT_STEP_MARKER = "<strong>Your next step:</strong>";

/** Journey links on the two top-traffic articles, pointing at tools and the newest guides. */
const NEXT_STEP_LINKS: Record<string, string> = {
  "why-am-i-not-losing-weight": `Start by confirming your ${a("maintenance-calories", "maintenance calories")} — most stalls come from an estimate that was never checked. Then make sure ${a("protein-for-weight-loss", "protein is high enough for a deficit")}, see what your daily walking is worth with the ${calc("steps-to-calories-calculator", "steps to calories calculator")}, and if meals are the problem, follow our ${a("indian-diet-plan-for-weight-loss", "7-day Indian diet plan for weight loss")}.`,
  "is-creatine-safe": `Creatine only helps if training and protein are in place. Get your daily target from the ${calc("protein-calculator", "protein calculator")} — vegetarians can hit it with these ${a("vegetarian-protein-sources-india", "vegetarian protein sources")}. Expecting the early water weight? Track whether you are gaining muscle or fat with the ${calc("body-fat-calculator", "body fat calculator")}, and set a fluid target with the ${calc("water-intake-calculator", "water intake calculator")}.`,
};

function insertNextStepLinks(): Promise<void> {
  return insertMarkedParagraphs(NEXT_STEP_MARKER, NEXT_STEP_LINKS, "next-step journey links");
}

const PORTION_MARKER = "<strong>Check your portions:</strong>";

/** Diet articles that name staples but never linked their /foods pages. */
const PORTION_LINKS: Record<string, string> = {
  "best-breakfast-for-weight-loss": `See calories and protein per serving for ${food("boiled-egg", "eggs")}, ${food("moong-dal", "moong dal")} (for chilla), ${food("paneer", "paneer")}, ${food("poha", "poha")} and ${food("roti", "roti")}, and scale them to your own portion.`,
  "best-dinner-for-weight-loss": `Measure the carb portion with calories per roti and per katori on our ${food("roti", "roti")} and ${food("rice", "rice")} pages, and size your protein with ${food("paneer", "paneer")}, ${food("chicken-breast", "chicken breast")} or ${food("moong-dal", "moong dal")}.`,
  "best-indian-foods-for-weight-loss": `Compare the everyday staples side by side: ${food("roti", "roti")}, ${food("rice", "rice")}, ${food("paneer", "paneer")}, ${food("moong-dal", "moong dal")} and ${food("kala-chana", "kala chana")} — each page has a serving calculator.`,
};

function insertPortionLinks(): Promise<void> {
  return insertMarkedParagraphs(PORTION_MARKER, PORTION_LINKS, "food portion links");
}

/**
 * The CMS used to split multi-word tags on save ("weight loss" → "weight", "loss").
 * Restore the seeded tags only where the stored value is exactly that split, so
 * tags edited on purpose are left alone.
 */
async function restoreSplitTags(): Promise<void> {
  let restored = 0;
  for (const def of INTENT_ARTICLES) {
    if (!def.tags.some((t) => /\s/.test(t))) continue;
    const split = def.tags.flatMap((t) => t.split(/\s+/)).filter(Boolean);
    const res = await pool.query(
      `UPDATE articles SET tags = $1 WHERE slug = $2 AND tags = $3::text[]`,
      [def.tags, def.slug, split],
    );
    restored += res.rowCount ?? 0;
  }
  console.log(`[db] restored multi-word tags on ${restored} articles`);
}

const MIGRATIONS: { id: string; run: () => Promise<void> }[] = [
  { id: "2026-09-29-read-next-links", run: () => insertReadNextLinks() },
  { id: "2026-10-05-root-calculator-links", run: rootCalculatorLinks },
  { id: "2026-10-06-food-data-links", run: insertFoodDataLinks },
  { id: "2026-10-07-seo-meta", run: applySeoMeta },
  { id: "2026-10-07-read-next-newest", run: () => insertReadNextLinks(READ_NEXT_NEWEST) },
  { id: "2026-10-08-clear-auto-reviewers", run: clearAutoReviewers },
  { id: "2026-10-08-author-bios", run: seedAuthorBios },
  { id: "2026-10-09-maintenance-calories-links", run: insertMaintenanceLinks },
  { id: "2026-10-09-restore-split-tags", run: restoreSplitTags },
  { id: "2026-10-10-diet-plan-protein-links", run: insertPlanLinks },
  { id: "2026-10-11-next-step-links", run: insertNextStepLinks },
  { id: "2026-10-11-food-portion-links", run: insertPortionLinks },
  { id: "2026-10-12-seo-meta-rewrites", run: applySeoMetaRewrites },
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
