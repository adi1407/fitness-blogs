# fitlives SEO Keyword Map

> Single source of truth for **which page owns which Google query**. Before writing a title, meta description, H1 or internal link anchor, check this file.
> Companion docs: `SEO_PLAYBOOK.md` (rules), `SEO_GROWTH_PLAN.md` (roadmap), `INFORMATION_ARCHITECTURE.md` (URLs).

---

## 1. Rules

1. **One query, one owner.** Every primary query below has exactly one owning URL. No other page puts that query in its `<title>` or H1.
2. **Link to the owner with the query as anchor.** When any other page mentions the topic, it links to the owner using the primary query (or a close variant) as anchor text — e.g. "use the [protein calculator](/protein-calculator)".
3. **Win long-tail first.** For a young domain, India-modified and question queries ("protein calculator india", "is creatine safe for kidneys") are winnable in months; head terms ("weight loss") follow as the cluster earns links.
4. **Title formula.** `{Primary query}{: or ?} {differentiator}` — ≤ 49 characters before the layout adds ` | fitlives` (≤ 60 total). Never add the brand manually.
5. **Meta description formula.** 140–160 characters: query in the first clause → concrete benefit → Indian angle or proof → soft CTA ("free, no sign-up").
6. **H1** = the primary query in natural form. **First sentence** under H1 answers the query and contains it.
7. **No cannibalisation.** If Search Console shows two of our URLs ranking for one query, fix with internal links + retitle the non-owner (don't delete content).

---

## 2. Calculators (transactional / "do it for me" intent)

| URL | Primary query | Secondary / long-tail |
|---|---|---|
| `/protein-calculator` | protein calculator | protein intake calculator, how much protein do i need calculator, protein calculator india, vegetarian protein calculator |
| `/calorie-calculator` | calorie calculator | daily calorie calculator, how many calories should i eat calculator, calorie calculator india |
| `/calorie-deficit-calculator` | calorie deficit calculator | weight loss calculator, calories to lose weight calculator |
| `/tdee-calculator` | tdee calculator | maintenance calorie calculator, total daily energy expenditure |
| `/bmr-calculator` | bmr calculator | basal metabolic rate calculator, mifflin st jeor calculator |
| `/macro-calculator` | macro calculator | macros calculator india, protein carbs fat calculator |
| `/bmi-calculator` | bmi calculator | bmi calculator india, asian bmi calculator, body mass index |
| `/body-fat-calculator` | body fat calculator | body fat percentage calculator, navy body fat calculator |
| `/one-rep-max-calculator` | one rep max calculator | 1rm calculator, max lift calculator |
| `/water-intake-calculator` | water intake calculator | how much water should i drink calculator, daily water calculator |
| `/steps-to-calories-calculator` | steps to calories calculator | calories burned walking, 10000 steps calories |
| `/tools` | free fitness calculators | fitness calculators india, health calculators |

---

## 3. Pillar hubs (broad informational intent)

| URL | Primary query | Secondary |
|---|---|---|
| `/weight-loss` | weight loss guide | how to lose weight, weight loss diet plan india, fat loss tips |
| `/muscle-building` | how to build muscle | muscle building guide, muscle building diet india |
| `/nutrition` | nutrition guide | indian nutrition guide, healthy eating india |
| `/nutrition/protein` | protein guide | protein foods india, protein sources vegetarian (**not** "how much protein per day" — the article owns that) |
| `/foods/indian` | indian food calories | indian food nutrition chart, calories in indian food |
| `/exercises` | exercise library | gym exercises with form cues |
| `/blog/{category}/{subcategory}` | "{subcategory} guides" | Listing pages; unique intro per subcategory lives in `frontend/src/lib/blogTaxonomy.ts` (`intro`). Empty subcategories stay `noindex`. |
| `/authors/{slug}` | author name | E-E-A-T only; not a ranking target. Bio/credentials edited in CMS → Users → Public profile. |

Each pillar server-renders **every** published article in its cluster (`PillarGuides`, with CollectionPage + ItemList JSON-LD), so a new article gets a crawlable link from its hub automatically within 10 minutes. Blog nav and `/about` link straight to the pillars, never to `/blog/{category}` (which canonicalises to the pillar).

---

## 4. Articles (question / informational intent)

| Slug | Primary query (owner) | Meta title (≤ 49 chars, brand added by layout) |
|---|---|---|
| how-much-protein-do-you-need-per-day | how much protein per day | How Much Protein Per Day? Simple Guide by Goal |
| 100g-chicken-breast-calories-and-protein | 100g chicken breast protein | 100g Chicken Breast: Protein & Calories |
| 100g-paneer-calories-and-protein | 100g paneer protein | 100g Paneer: Calories, Protein & Fat |
| 2-eggs-calories-and-protein | 2 eggs protein | 2 Eggs: Calories & Protein (Whole vs Whites) |
| best-high-protein-indian-foods | high protein indian foods | Best High Protein Indian Foods (With Servings) |
| is-whey-protein-safe | is whey protein safe | Is Whey Protein Safe? Side Effects & Kidney Myths |
| protein-before-or-after-workout | protein before or after workout | Protein Before or After Workout? What Matters |
| how-much-water-should-you-drink | how much water should you drink | How Much Water Should You Drink a Day? |
| is-ghee-good-for-you | is ghee good for you | Is Ghee Good for You? Heart Health & Weight Loss |
| how-much-protein-to-build-muscle | protein to build muscle | How Much Protein to Build Muscle? (g/kg Guide) |
| is-creatine-safe | is creatine safe | Is Creatine Safe? Side Effects, Kidneys & Dosage |
| how-long-does-it-take-to-build-muscle | how long to build muscle | How Long Does It Take to Build Muscle? |
| beginner-gym-diet-plan | beginner gym diet plan | Beginner Gym Diet Plan (Indian-Friendly) |
| what-is-progressive-overload | what is progressive overload | What Is Progressive Overload? Beginner Guide |
| how-many-calories-should-i-eat-to-lose-weight | calories to lose weight | How Many Calories to Eat to Lose Weight? |
| how-to-calculate-your-calorie-deficit | how to calculate calorie deficit | How to Calculate Your Calorie Deficit |
| how-many-calories-should-i-eat-to-lose-10-kg | calories to lose 10 kg | How Many Calories to Lose 10 kg? Timeline & Plan |
| how-to-lose-belly-fat | how to lose belly fat | How to Lose Belly Fat: What Actually Works |
| rice-vs-roti-for-weight-loss | rice vs roti for weight loss | Rice vs Roti for Weight Loss: Which Is Better? |
| best-indian-foods-for-weight-loss | best indian foods for weight loss | Best Indian Foods for Weight Loss (Diet List) |
| is-paneer-good-for-weight-loss | is paneer good for weight loss | Is Paneer Good for Weight Loss? Portions & Tips |
| is-rice-good-for-weight-loss | is rice good for weight loss | Is Rice Good for Weight Loss? Portions That Work |
| best-breakfast-for-weight-loss | best breakfast for weight loss | Best Breakfast for Weight Loss: Indian Ideas |
| best-dinner-for-weight-loss | best dinner for weight loss | Best Dinner for Weight Loss: Indian Meal Ideas |
| does-walking-help-you-lose-weight | does walking help you lose weight | Does Walking Help You Lose Weight? |
| why-am-i-not-losing-weight | why am i not losing weight | Why Am I Not Losing Weight? Reasons & Fixes |
| does-intermittent-fasting-work | does intermittent fasting work | Does Intermittent Fasting Work? 16:8 Evidence |
| maintenance-calories | maintenance calories | What Are Maintenance Calories? How to Find Yours |

The live values (with 140–160 character meta descriptions) are in `backend/src/db/intentArticles/seoMeta.ts`, applied by the `2026-10-07-seo-meta` content migration. CMS edits win: the migration only replaces values that still equal the seeded text.

### Known overlaps and how they're resolved

| Query | Owner | Non-owners (must link to owner, never retarget) |
|---|---|---|
| how much protein per day | article `how-much-protein-do-you-need-per-day` | `/protein-calculator` (owns "protein calculator"), `/nutrition/protein` (owns "protein guide") |
| calories to lose weight | article `how-many-calories-should-i-eat-to-lose-weight` | `/calorie-deficit-calculator`, `/weight-loss` |
| protein to build muscle | article `how-much-protein-to-build-muscle` | `/muscle-building`, `/protein-calculator` |
| maintenance calories | article `maintenance-calories` | `/tdee-calculator` (owns "tdee calculator" and "maintenance calorie calculator") |
| how much water should you drink | article `how-much-water-should-you-drink` | `/water-intake-calculator` (owns the "calculator" variant) |

---

## 5. Next content to write (priority order)

Write only when the page can be genuinely better than what ranks today. Clusters are ordered by how much each one strengthens pages we already have: the calories cluster feeds four calculators, creatine supports an article that already gets impressions, and so on. Finish a cluster before starting the next; three thin articles across three clusters help less than three solid ones in one.

### Every new article must have

- **One primary query** from the tables below, used in the slug, meta title, H1 and first sentence (rules in section 1). Add the row to section 4 when it's published.
- **Quick answer** (2–3 sentences that fully answer the query), then depth: a table or worked example, Indian food context, and a "who should be careful" note where health is involved.
- **Calculator CTA** matching the topic (the subcategory mapping in `frontend/src/lib/api/blog.ts` picks it automatically).
- **Links:** at least 3 contextual links to sibling articles and 1 to the owning calculator, using each target's primary query as anchor. Then add a link **to** the new article from 2 existing articles (CMS edit or a `contentMigrations.ts` entry). The pillar list links it automatically.
- **Sources:** 3+ primary sources (guidelines, meta-analyses, position stands) in the Sources field. No claim in the meta description that the body doesn't support.
- **Real FAQ only:** questions people actually ask (Search Console queries, Google's "People also ask"), not padding.
- **Reviewer:** if an editor/admin genuinely checks it, credit them in the CMS "Reviewed by" picker; otherwise leave it empty.

### 5.1 Calories cluster (feeds the calorie, TDEE, BMR and deficit calculators)

| Primary query | Working title (≤ 49 chars) | Category / subcategory | Calculator CTA | Must link to |
|---|---|---|---|---|
| ~~maintenance calories~~ (published, `maintenance-calories`) | What Are Maintenance Calories? How to Find Yours | nutrition / calories-energy | `/tdee-calculator` | calories to lose weight, how to calculate calorie deficit, BMR vs TDEE |
| bmr vs tdee | BMR vs TDEE: What's the Difference? | nutrition / calories-energy | `/bmr-calculator` | maintenance calories, `/tdee-calculator`, calories to lose weight |
| 1500 calorie diet plan indian | 1500 Calorie Indian Diet Plan (Veg & Non-Veg) | weight-loss / diet-meal-planning | `/calorie-calculator` | best breakfast / best dinner for weight loss, high protein indian foods, calories to lose weight |

Angle to beat the current results: worked examples for a typical Indian adult (e.g. 70 kg office worker), and a full day of real Indian meals with gram weights from `/foods`. Suggested sources: Mifflin-St Jeor equation paper (1990), ICMR-NIN *Dietary Guidelines for Indians* (2024).

### 5.2 Creatine cluster (supports `is-creatine-safe`)

| Primary query | Working title (≤ 49 chars) | Category / subcategory | Calculator CTA | Must link to |
|---|---|---|---|---|
| creatine dosage | How Much Creatine Per Day? (Dose by Weight) | muscle-building / muscle-building-nutrition | `/protein-calculator` | is creatine safe, creatine loading, protein to build muscle |
| creatine loading phase | Creatine Loading Phase: Is It Necessary? | muscle-building / muscle-building-nutrition | `/one-rep-max-calculator` | creatine dosage, is creatine safe |
| creatine for women | Creatine for Women: Benefits, Dose & Myths | muscle-building / muscle-building-nutrition | `/protein-calculator` | creatine dosage, is creatine safe, how to lose belly fat |
| creatine monohydrate vs hcl | Creatine Monohydrate vs HCl: Which Is Better? | muscle-building / muscle-building-nutrition | `/protein-calculator` | creatine dosage, is whey protein safe (fake-supplement section) |

Angle: Indian buying advice (third-party tested brands, price per effective gram) alongside the science. Suggested sources: ISSN position stand on creatine (Kreider et al., 2017); Smith-Ryan et al. on creatine in women's health (2021). Keep the existing "consult a doctor if you have kidney disease" framing.

### 5.3 Weight-loss head-term support (pushes `/weight-loss`)

| Primary query | Working title (≤ 49 chars) | Category / subcategory | Calculator CTA | Must link to |
|---|---|---|---|---|
| weight loss diet plan india | Indian Diet Plan for Weight Loss (7-Day Veg) | weight-loss / diet-meal-planning | `/calorie-deficit-calculator` | 1500 calorie diet plan, best indian foods for weight loss, rice vs roti |
| strength training for fat loss | Strength Training for Fat Loss: Beginner Plan | weight-loss / strength-training-weight-loss | `/body-fat-calculator` | what is progressive overload, does walking help you lose weight, calories to lose weight |

These two give `/weight-loss` its strongest supporting links; once published, add them to the "How to lose weight in 5 steps" section on the pillar (`frontend/src/app/weight-loss/page.tsx`).

### 5.4 Protein cluster

| Primary query | Working title (≤ 49 chars) | Category / subcategory | Calculator CTA | Must link to |
|---|---|---|---|---|
| vegetarian protein sources india | Vegetarian Protein Sources: Best Indian Foods | nutrition / protein | `/protein-calculator` | high protein indian foods, 100g paneer protein, `/nutrition/protein` |
| protein for weight loss | Protein for Weight Loss: How Much Per Day? | weight-loss / weight-loss-nutrition | `/protein-calculator` | how much protein per day, is paneer good for weight loss, calories to lose weight |

Watch for overlap: "vegetarian protein sources" sits next to the `/nutrition/protein` hub ("protein foods india"). The article goes deep on vegetarian-only meal building; the hub stays the broad overview and links to it.

---

## 6. Monthly Search Console routine

Run on the first working day of each month. Allow about 30 minutes. Use **Performance → Search results**, date range **last 28 days**, compare to the **previous 28 days**, and enable all four metrics.

### 6.1 Striking distance (biggest wins)

1. **Pages** tab → sort by impressions. Add filter **Position: greater than 4.9** (Search Console has no range filter, so read positions by eye up to about 20).
2. For each page with **> 100 impressions at position 5–20**, click it, then open the **Queries** tab to see what it ranks for.
3. If the top query matches the page's owner query: expand the section that answers it (add a table, example or missing subtopic), sharpen the title toward that exact phrasing, and add 2 internal links to the page from related articles using the query as anchor.
4. If the top query belongs to another page in section 4: that is a wrong-page problem; go to 6.3.

### 6.2 Low click-through rate

1. **Queries** tab → filter **Position: smaller than 5.1**.
2. Any query with **CTR below ~3%** gets a title/meta test on its owning page: add a number, the India angle, or the concrete benefit ("free", "with Indian foods").
3. Change **one page at a time** and log it below, so the effect can be attributed. Wait 4 weeks before judging.

### 6.3 Wrong page ranking (cannibalisation)

1. **Queries** tab → click a query → **Pages** tab. If two fitlives URLs appear, or a non-owner appears, act.
2. Add a contextual link from the non-owner to the owner, with the query as anchor text.
3. Remove the query wording from the non-owner's title and H1. Never delete or redirect content just to fix this.

### 6.4 Indexing health

1. **Indexing → Pages.** Check "Crawled – currently not indexed" and "Discovered – currently not indexed".
2. For each URL: add depth or internal links if it's useful; set `robots_index = false` in the CMS if it's genuinely thin.
3. **Sitemaps:** confirm `https://fitlives.in/sitemap.xml` reads "Success" and the discovered count is rising as content ships.
4. **URL Inspection → Request indexing** for any page you materially changed this month (limit to the important ones).

### 6.5 Rich results and Core Web Vitals

1. **Enhancements**: Breadcrumbs, FAQ and Recipes should show 0 invalid items. Fix errors before warnings.
2. **Core Web Vitals**: any URL group in "Poor" gets priority over new content. Pages are cached (ISR), so a regression usually means a heavy new image or script.
3. After changing structured data, test one URL of each template in Google's Rich Results Test (article, calculator, recipe, pillar, author).

### 6.6 New query opportunities

1. **Queries** tab → export to Sheets.
2. Find queries with impressions but **no owning page** in sections 2–4. If several share a topic, that's a new article candidate: add it to section 5 in the right cluster rather than writing it immediately.

### Change log

| Date | Page | Change | Result after 4 weeks |
|---|---|---|---|
| 2026-10 | 11 calculators | Titles, metas and intros rewritten for owner queries (PR #50) | |
| 2026-10 | 27 articles | Meta titles/descriptions from `seoMeta.ts`, cluster links (PR #52) | |
| 2026-10 | 4 pillars + subcategories | Retargeted titles/H1s, expanded copy, full cluster lists (PR #54) | |
| 2026-10 | Articles, authors, recipes | Real reviewers only, author pages, Recipe schema, ISR (PR #56) | |
| 2026-10 | `maintenance-calories` (new) | First calories-cluster article; linked from the two calorie-deficit articles; opens `/blog/nutrition/calories-energy` for indexing | |

---

## 6b. Operational settings

- **Instant updates after publishing:** set the same random `REVALIDATE_SECRET` on Render (API service) and Vercel (site). Without it, article and hub pages still refresh within 5–10 minutes.
- **IndexNow** (Bing and others) is pinged automatically on publish and edit; Google relies on the sitemap and internal links.
- **Views** are counted by a beacon after the page renders (`POST /public/articles/:id/view`), so crawlers and cached renders don't inflate them.

### GA4 key events

Every `trackEvent()` call goes to both OpenPanel and GA4 (`frontend/src/lib/analytics/openpanel.ts`). New events show up in **GA4 Admin → Data display → Events** about 24 hours after they first fire. Mark these as key events with the star toggle:

| Event | Fires when | Mark as key event |
|---|---|---|
| `calc_complete` | A calculator shows a result (`tool` parameter) | Yes |
| `newsletter_signup` | Someone joins the email list (`source` parameter) | Yes |
| `sign_up` | A new member finishes Google sign-in | Yes |
| `article_read` | 75% of an article body scrolled, or 45 s visible (`trigger` = scroll/time) | Yes |
| `login` | A returning member signs in | No (track only) |
| `cta_click` | Calculator card or next-step link clicked (`placement`, `href`) | No (track only) |
| `article_open`, `calc_open`, `share_click`, `hub_click`, `site_search`, `food_view` | Navigation and engagement detail | No |

To see parameters such as `tool` or `source` in reports, register them under **Admin → Custom definitions → Create custom dimension** (event scope).

### Social links and UTM tags

- **Link in bio** (Instagram, Facebook): `https://fitlives.in/start?utm_source=instagram&utm_medium=social&utm_campaign=bio` (use `facebook` as the source on Facebook). `/start` is noindex and leads with the TDEE calculator, popular articles, topic tiles and the email form.
- **Reel, story or post about one topic:** link straight to the matching page and name the campaign after the topic, lowercase with hyphens: `https://fitlives.in/tdee-calculator?utm_source=instagram&utm_medium=social&utm_campaign=tdee-reel`.
- Keep `utm_medium=social` for every organic social link so GA4 groups them under Organic Social. Never add UTM tags to internal links on the site.

---

## 7. Off-page (honest only)

- Share calculators and food data where they genuinely help: Indian fitness subreddits, Quora answers, gym/dietitian communities.
- Pitch data-driven pieces (e.g. protein per ₹ across Indian foods from `/foods`) to Indian health/fitness publications.
- Guest posts only on relevant, editorial sites. **Never buy links** or join link schemes.
