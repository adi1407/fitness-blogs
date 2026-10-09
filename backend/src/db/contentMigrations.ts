import { pool } from "./pool";
import { estimateReadingTime } from "../utils/articleSlug";
import { ARTICLE_REWRITES } from "./intentArticles/rewrites";
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
  "how-to-gain-weight-for-skinny-guys": "muscle-building/bulking",
  "beginner-3-day-gym-workout-plan": "muscle-building/training-programs",
  "how-many-sets-per-muscle-per-week": "muscle-building/muscle-growth-hypertrophy",
  "bulking-on-an-indian-diet": "muscle-building/bulking",
  "push-pull-legs-for-beginners": "muscle-building/training-programs",
  "how-many-days-a-week-should-i-work-out": "muscle-building/beginner-muscle-building",
  "how-many-calories-should-i-eat-per-day": "nutrition/calories-energy",
  "what-is-a-calorie-deficit": "weight-loss/calorie-deficit",
  "1200-calorie-indian-diet-plan": "weight-loss/diet-meal-planning",
  "2000-calorie-indian-diet-plan": "weight-loss/diet-meal-planning",
  "calories-burned-walking-10000-steps": "weight-loss/walking-daily-activity",
  "calories-in-indian-thali": "nutrition/calories-energy",
  "high-protein-vegetarian-indian-breakfast": "nutrition/protein",
  "protein-for-beginners": "nutrition/protein",
  "is-too-much-protein-bad-for-kidneys": "nutrition/protein",
  "soya-chunks-protein": "nutrition/protein",
  "protein-sources-for-eggetarians": "nutrition/protein",
  "paneer-vs-tofu": "nutrition/protein",
  "dal-vs-chicken-for-protein": "nutrition/protein",
  "oats-vs-poha-for-weight-loss": "weight-loss/weight-loss-nutrition",
  "curd-vs-milk": "nutrition/protein",
  "how-many-steps-a-day-to-lose-weight": "weight-loss/walking-daily-activity",
  "strength-training-for-fat-loss": "weight-loss/strength-training-weight-loss",
  "how-to-lose-weight-on-a-vegetarian-diet": "weight-loss/weight-loss-nutrition",
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

async function applyArticleRewrites(): Promise<void> {
  let updated = 0;
  for (const [slug, r] of Object.entries(ARTICLE_REWRITES)) {
    const res = await pool.query(
      `UPDATE articles
          SET body = $1, excerpt = $2, quick_answer = $3,
              faq = $4::jsonb, sources = $5::jsonb, reading_time = $6,
              updated_at = NOW()
        WHERE slug = $7 AND position($8 in body) > 0`,
      [
        r.body,
        r.excerpt,
        r.quickAnswer,
        JSON.stringify(r.faq),
        JSON.stringify(r.sources),
        estimateReadingTime(r.body),
        slug,
        r.originalOpening,
      ],
    );
    updated += res.rowCount ?? 0;
  }
  console.log(`[db] rewrote ${updated} thin articles`);
}

const PILLAR_MARKER = "<strong>Explore the guide:</strong>";

const PROTEIN_GUIDE = `<a href="/nutrition/protein">protein guide</a>`;
const CALORIES_GUIDE = `<a href="/nutrition/calories">calories guide</a>`;
const WEIGHT_LOSS_GUIDE = `<a href="/weight-loss">weight loss guide</a>`;
const MUSCLE_GUIDE = `<a href="/muscle-building">muscle building guide</a>`;
const NUTRITION_GUIDE = `<a href="/nutrition">nutrition guide</a>`;

/** Every article links up to its pillar hub; the thinnest-linked ones also gain siblings. */
const PILLAR_LINKS: Record<string, string> = {
  "how-much-protein-do-you-need-per-day": `Everything on protein in one place — targets by goal, the best Indian sources and every related article — is in our ${PROTEIN_GUIDE}.`,
  "100g-chicken-breast-calories-and-protein": `For targets and more sources, see the ${PROTEIN_GUIDE}, and compare chicken with the ${a("best-high-protein-indian-foods", "best high-protein Indian foods")}.`,
  "100g-paneer-calories-and-protein": `For daily targets and every protein article, see the ${PROTEIN_GUIDE}.`,
  "2-eggs-calories-and-protein": `Find out how much protein you need in ${a("how-much-protein-do-you-need-per-day", "how much protein per day")}, see where eggs rank among the ${a("best-high-protein-indian-foods", "best high-protein Indian foods")}, or browse the full ${PROTEIN_GUIDE}.`,
  "best-high-protein-indian-foods": `Targets by goal and every protein article are collected in our ${PROTEIN_GUIDE}.`,
  "is-whey-protein-safe": `Food first? The ${PROTEIN_GUIDE} covers targets and the best Indian protein foods.`,
  "vegetarian-protein-sources-india": `Targets by goal and every protein article are collected in our ${PROTEIN_GUIDE}.`,
  "protein-before-or-after-workout": `For daily targets and food sources, see the ${PROTEIN_GUIDE} and the ${MUSCLE_GUIDE}.`,
  "how-much-protein-to-build-muscle": `See the ${MUSCLE_GUIDE} for training and the ${PROTEIN_GUIDE} for Indian protein foods.`,
  "is-creatine-safe": `Supplements come last — start with training and nutrition in the ${MUSCLE_GUIDE}.`,
  "how-long-does-it-take-to-build-muscle": `Training, nutrition and recovery for beginners are all in the ${MUSCLE_GUIDE}.`,
  "beginner-gym-diet-plan": `For training plans and more nutrition guides, see the ${MUSCLE_GUIDE} and the ${PROTEIN_GUIDE}.`,
  "what-is-progressive-overload": `Put it into a full plan with the ${MUSCLE_GUIDE}.`,
  "maintenance-calories": `Targets by goal and calories in everyday Indian foods are in the ${CALORIES_GUIDE}.`,
  "bmr-vs-tdee": `Targets by goal and calories in everyday Indian foods are in the ${CALORIES_GUIDE}.`,
  "how-many-calories-should-i-eat-to-lose-weight": `See the ${CALORIES_GUIDE} for calories in Indian foods, and the ${WEIGHT_LOSS_GUIDE} for the full plan.`,
  "how-to-calculate-your-calorie-deficit": `See the ${CALORIES_GUIDE} for calorie targets by goal, and the ${WEIGHT_LOSS_GUIDE} for the full plan.`,
  "how-many-calories-should-i-eat-to-lose-10-kg": `See the ${CALORIES_GUIDE} for calories in Indian foods, and the ${WEIGHT_LOSS_GUIDE} for the full plan.`,
  "1500-calorie-indian-diet-plan": `Not sure 1,500 is your number? Check the ${CALORIES_GUIDE}, then see the ${WEIGHT_LOSS_GUIDE}.`,
  "indian-diet-plan-for-weight-loss": `Calories in everyday Indian foods are in the ${CALORIES_GUIDE}; the ${WEIGHT_LOSS_GUIDE} covers training and habits.`,
  "best-breakfast-for-weight-loss": `Plan the whole day with the ${CALORIES_GUIDE} and the ${WEIGHT_LOSS_GUIDE}.`,
  "best-dinner-for-weight-loss": `Plan the whole day with the ${CALORIES_GUIDE} and the ${WEIGHT_LOSS_GUIDE}.`,
  "rice-vs-roti-for-weight-loss": `Rice or roti, portions decide the result. Read ${a("is-rice-good-for-weight-loss", "how much rice to eat for weight loss")}, see the ${a("best-indian-foods-for-weight-loss", "best Indian foods for weight loss")}, set your target with ${a("how-many-calories-should-i-eat-to-lose-weight", "how many calories to eat to lose weight")}, or browse the ${CALORIES_GUIDE}.`,
  "best-indian-foods-for-weight-loss": `The full plan — calories, protein, training and habits — is in the ${WEIGHT_LOSS_GUIDE}.`,
  "is-paneer-good-for-weight-loss": `For the full plan, see the ${WEIGHT_LOSS_GUIDE} and the ${PROTEIN_GUIDE}.`,
  "protein-for-weight-loss": `For the full plan, see the ${WEIGHT_LOSS_GUIDE} and the ${PROTEIN_GUIDE}.`,
  "how-to-lose-belly-fat": `The full plan — calories, protein, training and habits — is in the ${WEIGHT_LOSS_GUIDE}.`,
  "does-walking-help-you-lose-weight": `The full plan — calories, protein, training and habits — is in the ${WEIGHT_LOSS_GUIDE}.`,
  "why-am-i-not-losing-weight": `Go back to basics with the ${CALORIES_GUIDE} and the ${WEIGHT_LOSS_GUIDE}.`,
  "does-intermittent-fasting-work": `Fasting is one tool among many — see the ${WEIGHT_LOSS_GUIDE} and the ${CALORIES_GUIDE}.`,
  "how-much-water-should-you-drink": `Water is one part of your diet: see ${a("maintenance-calories", "how to find your maintenance calories")}, ${a("does-walking-help-you-lose-weight", "whether walking helps you lose weight")}, and the full ${NUTRITION_GUIDE}.`,
  "is-ghee-good-for-you": `See how fats fit your daily calories in the ${CALORIES_GUIDE} and the ${NUTRITION_GUIDE}.`,
};

function insertPillarLinks(): Promise<void> {
  return insertMarkedParagraphs(PILLAR_MARKER, PILLAR_LINKS, "pillar hub links");
}

const TRAINING_PLAN_MARKER = "<strong>Training plan:</strong>";

/** Inbound links to the October muscle-building articles. */
const TRAINING_PLAN_LINKS: Record<string, string> = {
  "how-much-protein-to-build-muscle": `Protein needs a surplus and a plan to work: see ${a("bulking-on-an-indian-diet", "bulking on an Indian diet")} or, if you are very thin, ${a("how-to-gain-weight-for-skinny-guys", "how to gain weight for skinny guys")}. Start training with the ${a("beginner-3-day-gym-workout-plan", "beginner 3-day gym workout plan")}.`,
  "what-is-progressive-overload": `Apply it with the ${a("beginner-3-day-gym-workout-plan", "beginner 3-day gym workout plan")} or ${a("push-pull-legs-for-beginners", "push pull legs")}, and set your weekly volume with ${a("how-many-sets-per-muscle-per-week", "how many sets per muscle per week")}.`,
  "how-long-does-it-take-to-build-muscle": `Get the basics right from day one: ${a("how-many-days-a-week-should-i-work-out", "how many days a week to work out")}, the ${a("beginner-3-day-gym-workout-plan", "beginner 3-day gym workout plan")} and ${a("how-many-sets-per-muscle-per-week", "how many sets per muscle per week")}.`,
  "beginner-gym-diet-plan": `Pair this diet with the ${a("beginner-3-day-gym-workout-plan", "beginner 3-day gym workout plan")}. Struggling to gain? Read ${a("how-to-gain-weight-for-skinny-guys", "how to gain weight for skinny guys")} or ${a("bulking-on-an-indian-diet", "bulking on an Indian diet")}.`,
  "protein-before-or-after-workout": `Need a routine to go with it? Try the ${a("beginner-3-day-gym-workout-plan", "beginner 3-day gym workout plan")} or ${a("push-pull-legs-for-beginners", "push pull legs for beginners")}.`,
  "is-creatine-safe": `Creatine helps most with a solid plan and a calorie surplus — see ${a("bulking-on-an-indian-diet", "bulking on an Indian diet")} and ${a("push-pull-legs-for-beginners", "push pull legs for beginners")}.`,
};

function insertTrainingPlanLinks(): Promise<void> {
  return insertMarkedParagraphs(TRAINING_PLAN_MARKER, TRAINING_PLAN_LINKS, "training plan links");
}

const CALORIE_GUIDES_MARKER = "<strong>More on calories:</strong>";

/** Inbound links to the October calories-cluster articles. */
const CALORIE_GUIDES_LINKS: Record<string, string> = {
  "maintenance-calories": `See typical numbers by age and activity in ${a("how-many-calories-should-i-eat-per-day", "how many calories you should eat per day")}, and what a restaurant meal costs you in ${a("calories-in-indian-thali", "calories in an Indian thali")}.`,
  "bmr-vs-tdee": `Turn your TDEE into a daily target with ${a("how-many-calories-should-i-eat-per-day", "how many calories to eat per day")}, then see ${a("what-is-a-calorie-deficit", "what a calorie deficit is")} if you want to lose weight.`,
  "how-to-calculate-your-calorie-deficit": `New to the idea? Start with ${a("what-is-a-calorie-deficit", "what a calorie deficit is")}, and see how many steps can add to it in ${a("calories-burned-walking-10000-steps", "calories burned walking 10,000 steps")}.`,
  "how-many-calories-should-i-eat-to-lose-weight": `Pick a ready-made day: the ${a("2000-calorie-indian-diet-plan", "2,000 calorie Indian diet plan")} suits many men, and smaller women can read the ${a("1200-calorie-indian-diet-plan", "1,200 calorie plan")} — including who should not follow it.`,
  "1500-calorie-indian-diet-plan": `Need a different target? See the ${a("2000-calorie-indian-diet-plan", "2,000 calorie Indian diet plan")} or the ${a("1200-calorie-indian-diet-plan", "1,200 calorie plan")} (and who it is not for).`,
  "does-walking-help-you-lose-weight": `See the numbers for your body weight in ${a("calories-burned-walking-10000-steps", "calories burned walking 10,000 steps")}.`,
  "why-am-i-not-losing-weight": `Eating out often? Check ${a("calories-in-indian-thali", "calories in an Indian thali")}. Unsure your deficit is real? Read ${a("what-is-a-calorie-deficit", "what a calorie deficit is")}.`,
  "best-indian-foods-for-weight-loss": `See how a full plate adds up in ${a("calories-in-indian-thali", "calories in an Indian thali")}.`,
};

function insertCalorieGuideLinks(): Promise<void> {
  return insertMarkedParagraphs(CALORIE_GUIDES_MARKER, CALORIE_GUIDES_LINKS, "calorie guide links");
}

const PROTEIN_GUIDES_MARKER = "<strong>Compare protein foods:</strong>";

/** Inbound links to the October protein-cluster and food-comparison articles. */
const PROTEIN_GUIDES_LINKS: Record<string, string> = {
  "how-much-protein-do-you-need-per-day": `Just starting out? Read ${a("protein-for-beginners", "protein for beginners")}. Worried about your kidneys? See ${a("is-too-much-protein-bad-for-kidneys", "whether too much protein is bad for your kidneys")}.`,
  "best-high-protein-indian-foods": `Head-to-head: ${a("paneer-vs-tofu", "paneer vs tofu")}, ${a("dal-vs-chicken-for-protein", "dal vs chicken")} and ${a("curd-vs-milk", "curd vs milk")}. The cheapest option per gram is covered in ${a("soya-chunks-protein", "soya chunks protein")}.`,
  "vegetarian-protein-sources-india": `Start the day right with a ${a("high-protein-vegetarian-indian-breakfast", "high-protein vegetarian Indian breakfast")}, or see ${a("protein-sources-for-eggetarians", "protein sources for eggetarians")} if you eat eggs.`,
  "100g-paneer-calories-and-protein": `Comparing options? Read ${a("paneer-vs-tofu", "paneer vs tofu")}.`,
  "100g-chicken-breast-calories-and-protein": `Vegetarian at home? See ${a("dal-vs-chicken-for-protein", "dal vs chicken for protein")}.`,
  "2-eggs-calories-and-protein": `Build a full day around eggs with ${a("protein-sources-for-eggetarians", "protein sources for eggetarians")}.`,
  "is-whey-protein-safe": `Concerned about high intakes? Read ${a("is-too-much-protein-bad-for-kidneys", "is too much protein bad for your kidneys")}.`,
  "best-breakfast-for-weight-loss": `Choosing between two staples? See ${a("oats-vs-poha-for-weight-loss", "oats vs poha for weight loss")}, or try a ${a("high-protein-vegetarian-indian-breakfast", "high-protein vegetarian breakfast")}.`,
  "is-paneer-good-for-weight-loss": `See how it stacks up in ${a("paneer-vs-tofu", "paneer vs tofu")}.`,
};

function insertProteinGuideLinks(): Promise<void> {
  return insertMarkedParagraphs(PROTEIN_GUIDES_MARKER, PROTEIN_GUIDES_LINKS, "protein guide links");
}

const WEIGHT_LOSS_GUIDES_MARKER = "<strong>Keep going:</strong>";

/** Inbound links to the October weight-loss articles. */
const WEIGHT_LOSS_GUIDES_LINKS: Record<string, string> = {
  "does-walking-help-you-lose-weight": `Set a realistic target with ${a("how-many-steps-a-day-to-lose-weight", "how many steps a day to lose weight")}, and add ${a("strength-training-for-fat-loss", "strength training for fat loss")} to protect muscle.`,
  "calories-burned-walking-10000-steps": `Not sure 10,000 is right for you? Read ${a("how-many-steps-a-day-to-lose-weight", "how many steps a day to lose weight")}.`,
  "how-to-lose-belly-fat": `Build the training side with ${a("strength-training-for-fat-loss", "strength training for fat loss")} and ${a("how-many-steps-a-day-to-lose-weight", "a daily step target")}.`,
  "why-am-i-not-losing-weight": `Losing muscle instead of fat? See ${a("strength-training-for-fat-loss", "strength training for fat loss")}.`,
  "beginner-3-day-gym-workout-plan": `Training to lose fat rather than bulk? See ${a("strength-training-for-fat-loss", "strength training for fat loss")}.`,
  "protein-for-weight-loss": `Vegetarian? Read ${a("how-to-lose-weight-on-a-vegetarian-diet", "how to lose weight on a vegetarian Indian diet")}.`,
  "indian-diet-plan-for-weight-loss": `The principles behind this plan — plate method, protein and swaps — are in ${a("how-to-lose-weight-on-a-vegetarian-diet", "how to lose weight on a vegetarian Indian diet")}.`,
  "best-indian-foods-for-weight-loss": `Put them together with ${a("how-to-lose-weight-on-a-vegetarian-diet", "how to lose weight on a vegetarian Indian diet")}.`,
};

const RANKING_MARKER = "<strong>See the data:</strong>";
const RANKING = `<a href="/foods/indian/protein-ranking">protein in Indian foods, ranked</a>`;

/** Inbound links to the protein-ranking data page. */
const RANKING_LINKS: Record<string, string> = {
  "best-high-protein-indian-foods": `Every food in our database sorted per serving, per calorie and per 100 g: ${RANKING}.`,
  "how-much-protein-do-you-need-per-day": `Find foods that fit your target in ${RANKING}.`,
  "soya-chunks-protein": `Compare soya with 49 other foods in ${RANKING}.`,
  "dal-vs-chicken-for-protein": `How every dal, meat and dairy food compares: ${RANKING}.`,
  "paneer-vs-tofu": `See where paneer ranks among 50 Indian foods in ${RANKING}.`,
};

function insertRankingLinks(): Promise<void> {
  return insertMarkedParagraphs(RANKING_MARKER, RANKING_LINKS, "protein ranking links");
}

function insertWeightLossGuideLinks(): Promise<void> {
  return insertMarkedParagraphs(WEIGHT_LOSS_GUIDES_MARKER, WEIGHT_LOSS_GUIDES_LINKS, "weight loss guide links");
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
  { id: "2026-10-12-article-rewrites", run: applyArticleRewrites },
  { id: "2026-10-12-pillar-links", run: insertPillarLinks },
  { id: "2026-10-13-training-plan-links", run: insertTrainingPlanLinks },
  { id: "2026-10-13-calorie-guide-links", run: insertCalorieGuideLinks },
  { id: "2026-10-13-protein-guide-links", run: insertProteinGuideLinks },
  { id: "2026-10-13-weight-loss-guide-links", run: insertWeightLossGuideLinks },
  { id: "2026-10-14-article-rewrites", run: applyArticleRewrites },
  { id: "2026-10-14-protein-ranking-links", run: insertRankingLinks },
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
