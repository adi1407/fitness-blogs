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

---

## 4. Articles (question / informational intent)

| Slug | Primary query (owner) | Meta title (≤ 49 chars, brand added by layout) |
|---|---|---|
| how-much-protein-do-you-need-per-day | how much protein per day | How Much Protein Per Day? Simple Guide by Goal |
| 100g-chicken-breast-calories-and-protein | 100g chicken breast protein | 100g Chicken Breast: Protein & Calories |
| 100g-paneer-calories-and-protein | 100g paneer protein | 100g Paneer: Calories, Protein & Fat |
| 2-eggs-calories-and-protein | 2 eggs protein | 2 Eggs Calories & Protein (Boiled, Whole) |
| best-high-protein-indian-foods | high protein indian foods | High Protein Indian Foods: Veg & Non-Veg List |
| is-whey-protein-safe | is whey protein safe | Is Whey Protein Safe? Side Effects & Kidney Myths |
| protein-before-or-after-workout | protein before or after workout | Protein Before or After Workout? What Matters |
| how-much-water-should-you-drink | how much water should you drink | How Much Water Should You Drink a Day? |
| is-ghee-good-for-you | is ghee good for you | Is Ghee Good for You? Heart Health & Weight Loss |
| how-much-protein-to-build-muscle | protein to build muscle | How Much Protein to Build Muscle? (g/kg Guide) |
| is-creatine-safe | is creatine safe | Is Creatine Safe? Side Effects, Kidneys & Dosage |
| how-long-does-it-take-to-build-muscle | how long to build muscle | How Long Does It Take to Build Muscle? |
| beginner-gym-diet-plan | beginner gym diet plan | Beginner Gym Diet Plan (Indian Veg & Non-Veg) |
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

### Known overlaps and how they're resolved

| Query | Owner | Non-owners (must link to owner, never retarget) |
|---|---|---|
| how much protein per day | article `how-much-protein-do-you-need-per-day` | `/protein-calculator` (owns "protein calculator"), `/nutrition/protein` (owns "protein guide") |
| calories to lose weight | article `how-many-calories-should-i-eat-to-lose-weight` | `/calorie-deficit-calculator`, `/weight-loss` |
| protein to build muscle | article `how-much-protein-to-build-muscle` | `/muscle-building`, `/protein-calculator` |
| how much water should you drink | article `how-much-water-should-you-drink` | `/water-intake-calculator` (owns the "calculator" variant) |

---

## 5. Next content to write (priority order)

Write only when the page can be genuinely better than what ranks today. Each new article gets: a primary query from this list, a calculator CTA, ≥ 3 sibling links, and a link from its pillar.

1. **Calories cluster** (feeds the calorie/TDEE calculators)
   - maintenance calories — "What Are Maintenance Calories?"
   - bmr vs tdee — "BMR vs TDEE: What's the Difference?"
   - 1500 calorie diet plan indian — "1500 Calorie Indian Diet Plan (Veg)"
2. **Creatine cluster** (supports `is-creatine-safe`)
   - creatine dosage — "How Much Creatine Per Day?"
   - creatine loading phase — "Creatine Loading: Is It Necessary?"
   - creatine for women — "Creatine for Women: Benefits & Myths"
   - creatine monohydrate vs hcl — "Creatine Monohydrate vs HCl"
3. **Weight-loss head-term support** (pushes `/weight-loss`)
   - weight loss diet plan india — "Indian Diet Plan for Weight Loss"
   - strength training for fat loss — "Strength Training for Fat Loss"
4. **Protein cluster**
   - vegetarian protein sources india — "Vegetarian Protein Sources (Indian)"
   - protein for weight loss — "Protein for Weight Loss: How Much?"

---

## 6. Monthly Search Console routine

Run on the first working day of each month (Search Console → Performance → last 28 days vs previous).

1. **Striking distance:** filter pages with average position **5–20** and > 100 impressions. For each: rewrite title toward the top query, expand the section answering it, add 2 internal links from related pages with that query as anchor.
2. **Low CTR:** queries in positions 1–5 with CTR below ~3%: test a sharper title/meta (numbers, India angle, "free"). Change one page at a time; note the date in the table below.
3. **Wrong page ranking:** if a non-owner ranks for an owner's query, add a contextual link from the non-owner to the owner and remove the query from the non-owner's title.
4. **Indexing:** Pages → "Crawled – currently not indexed" / "Discovered – not indexed": improve depth or internal links; noindex if genuinely thin.
5. **New queries:** export queries with impressions but no owning page → candidates for section 5.

| Date | Page | Change | Result after 4 weeks |
|---|---|---|---|
| | | | |

---

## 7. Off-page (honest only)

- Share calculators and food data where they genuinely help: Indian fitness subreddits, Quora answers, gym/dietitian communities.
- Pitch data-driven pieces (e.g. protein per ₹ across Indian foods from `/foods`) to Indian health/fitness publications.
- Guest posts only on relevant, editorial sites. **Never buy links** or join link schemes.
