# fitlives SEO & Growth Plan — Calculators, Clusters, Food Data

> Owner: SEO / growth. Status: **plan — not yet implemented.**
> Companion docs: `SEO_PLAYBOOK.md` (rules), `INFORMATION_ARCHITECTURE.md` (URLs), `CONTENT_MODEL.md`, `BUILD_ROADMAP.md`.
> Principle: **fewer, genuinely excellent pages** that are linked into a connected topic ecosystem — not volume.

---

## 0. Where we are today (audit, 29 Sep 2026)

| Area | Current state | Problem for SEO / users |
|---|---|---|
| Calculator URLs | `/tools/calorie-calculator`, `/tools/tdee-calculator`, `/tools/macro-calculator`, `/tools/protein-calculator`, `/tools/bmr-calculator`, `/tools/bmi-calculator` | Not the root-level URLs we want; `/tools` hub dilutes focus |
| **Sign-in gate** | Every calculator requires Google sign-in before showing a result | **Biggest blocker.** Search visitors bounce; the page can't satisfy "calorie calculator" intent; backlink outreach for a gated tool is near-impossible |
| Calorie calculator | Asks for a TDEE number, then applies a goal % | Doesn't answer "how many calories should I eat" from personal details; overlaps with TDEE tool |
| Calculator page content | Short "How this estimate works" + 1 FAQ | Thin; weak for "how many calories should I eat" style queries |
| Titles | e.g. "Calorie Calculator — Daily Targets by Goal \| fitlives" | Fine structure, but not aligned to the keyword cluster |
| Blog URLs | `/blog/{category}/{subcategory}/{slug}/{articleNumber}` (locked taxonomy) | Good — **keep**. Don't move to flat `/blog/{slug}` (would break 22 live URLs and the locked IA) |
| Existing articles | 22 published intent articles (protein, calories, deficit, Indian foods, walking, progressive overload…) | Strong base — needs cluster linking + calculator CTAs |
| Pillars | `/nutrition`, `/nutrition/protein`, `/weight-loss`, `/muscle-building` | No `/nutrition/calories` pillar yet |
| Foods | `/foods`, `/foods/indian` only | No per-food pages (`/foods/roti`) — big long-tail gap |
| Authors / EEAT | Author shown on articles; `/authors` list; DB has `reviewer_id` | No `/authors/[slug]` profiles; "Reviewed by" not surfaced |
| Search | `/search` exists | Needs to cover foods, tools, exercises; `SearchAction` schema |
| Sitemap / robots | Dynamic sitemap (ISR hourly), robots allow all | Must be updated for new calculator URLs |
| Recently fixed | Doubled "\| fitlives" in article titles; duplicate tag chips; FAQ now an accessible accordion | — |

---

## 1. Decisions needed before build (owner sign-off)

1. **Remove the sign-in gate for results (strongly recommended).**
   Everyone gets the full result instantly. Sign-in becomes an *optional upgrade*: "Save your results & pre-fill next time". This keeps accounts valuable without blocking Google traffic. (Current behaviour — calculators only work when signed in — was built to your earlier brief; this plan recommends changing it.)
2. **Brand casing in titles.** Brand rules say lowercase **fitlives**. Use `| fitlives` in titles (not "FitLives") unless you decide to rebrand.
3. **Calculators hub URL.** Rename `/tools` → **`/calculators`** (301). It stays a lean directory page linking to each dedicated calculator — not a page with everything on it.
4. **Qualified reviewer.** Recruit at least one registered dietitian / nutritionist for "Reviewed by". Until then, never display "Reviewed by".
5. **Navigation vs locked taxonomy.** Blog taxonomy stays 3 categories. The new menu (section 9) groups existing categories/subcategories and pillars — it does **not** add new blog categories.

---

## 2. Target URL map

### Calculators (root-level, one strong page each)

| New URL | Old URL (301 →) | Launch phase |
|---|---|---|
| `/calorie-calculator` | `/tools/calorie-calculator` | 1 (flagship) |
| `/tdee-calculator` | `/tools/tdee-calculator` | 1 |
| `/protein-calculator` | `/tools/protein-calculator` | 1 |
| `/macro-calculator` | `/tools/macro-calculator` | 1 |
| `/bmi-calculator` | `/tools/bmi-calculator` | 1 |
| `/bmr-calculator` | `/tools/bmr-calculator` | 1 |
| `/calculators` | `/tools` | 1 (hub) |
| `/calorie-deficit-calculator` | — | 4 |
| `/ideal-weight-calculator` | — | 4 |
| `/body-fat-calculator` | — | 4 |
| `/water-intake-calculator` | — | 4 |
| `/one-rep-max-calculator` | — | 4 |
| `/calories-burned-walking-calculator` (steps → calories) | — | 4 |

Later candidates (only with demand proven in Search Console): carbohydrate, fat intake, fiber, running pace, workout volume.

### Pillars & clusters

| URL | Type |
|---|---|
| `/nutrition/calories` | **New pillar**: Complete Guide to Calories |
| `/nutrition/protein` | Existing pillar — upgrade |
| `/weight-loss`, `/muscle-building`, `/nutrition` | Existing hubs — add calculator + cluster blocks |
| `/blog/{category}/{subcategory}/{slug}` | Cluster articles (unchanged structure) |
| `/foods/{slug}` | **New** food pages (e.g. `/foods/roti`, `/foods/paneer`) |
| `/authors/{slug}` | **New** author profiles |

**Rule:** keep food pages under `/foods/…` (not root `/roti-calories`) — consistent IA, one template, one sitemap section.

### Migration checklist (calculator move)

- [ ] Move route folders `app/tools/*-calculator` → `app/*-calculator`; `app/tools` → `app/calculators`
- [ ] Permanent redirects in `next.config.ts` (`/tools/:slug` → `/:slug`, `/tools` → `/calculators`)
- [ ] Update canonicals, sitemap `STATIC_PATHS`, footer, header, `calcHandoff` links, article/tool CTAs (grep every `/tools/`)
- [ ] Update seeded article bodies that link `/tools/...` (redirects cover them, but update source for clean links)
- [ ] GSC: submit new sitemap, inspect the six new URLs, monitor "Page with redirect" for old ones
- [ ] Keep redirects forever

---

## 3. Calculator product spec (applies to every calculator)

A calculator page = **interactive tool + complete result + substantial explanatory content**.

### Page template (top → bottom)

1. Breadcrumb: Home › Calculators › Calorie Calculator
2. **H1** (exact tool name) + one-sentence promise directly under it
3. **The calculator** (above the fold on desktop; within first scroll on mobile)
4. **Result panel** (see below) with "Recalculate" and next-tool CTAs
5. Educational sections (H2s mapped to the keyword cluster)
6. Worked example (a named persona with real numbers)
7. Formula / methodology + sources
8. FAQ (5–8 real questions) — `FaqAccordion`, FAQPage schema
9. Related calculators + related articles (cluster links)
10. Written by / Reviewed by (when real) / Last updated
11. Disclaimer: *"This calculator provides an estimate and isn't a substitute for individualised medical or dietary advice."*

### Inputs (calorie / TDEE / BMR / macro family)

- Age, sex, height, weight, activity level (with plain-language descriptions)
- **Units toggle:** kg/lb, cm/ft-in (India uses both)
- Optional: body-fat % → switches BMR to Katch–McArdle
- Goal (lose / maintain / gain) and pace (gentle / moderate)
- Inputs never go in the URL except deliberate hand-off params (already stripped after read)

### Complete result (example: calorie calculator)

| Block | Content |
|---|---|
| BMR | e.g. **1,720 kcal/day** (Mifflin–St Jeor) |
| Maintenance (TDEE) | e.g. **2,540 kcal/day** |
| Weight loss | Gentle (−10%) and moderate (−20%) ranges, e.g. **2,040–2,290 kcal**, with expected weekly change |
| Muscle gain | +5–10%, e.g. **2,670–2,790 kcal** |
| Suggested macros | Protein (1.6–2.2 g/kg), fat (20–30% kcal), carbs (remainder) in grams |
| Safety floors | Warn below ~1,200 kcal (women) / ~1,500 kcal (men); never auto-suggest under the floor |
| Explanation | "These are estimates based on the information you provided. Individual requirements vary." |
| Next steps | → Macro calculator (prefilled) · → Protein calculator · → "How many calories should I eat?" article |

Quality bar: works without JS failing silently (clear validation), no layout shift when results appear, keyboard + screen-reader accessible, results announced (`aria-live`), reduced-motion respected, mobile-first, INP < 200 ms.

### Structured data

`BreadcrumbList` + `FAQPage` + `WebApplication` (`applicationCategory: HealthApplication`, `offers.price: 0`). **No fake ratings.**

---

## 4. Keyword clusters & page briefs (Phase 1 calculators)

One strong page per cluster. **Do not** create near-duplicate pages per phrase.

### 4.1 `/calorie-calculator` — flagship

- **Title (≤60 chars):** `Calorie Calculator: Daily Calorie Needs & Targets | fitlives`
  (your longer version "Calorie Calculator – Calculate Your Daily Calorie Needs | fitlives" is fine but may truncate on mobile)
- **Meta description:** Calculate your daily calorie needs with the fitlives Calorie Calculator. Estimate BMR, TDEE, maintenance calories and targets for weight loss or muscle gain.
- **H1:** Calorie Calculator
- **Intro line:** Calculate your estimated daily calorie needs based on age, sex, height, weight and activity level.
- **Cluster covered:** calorie calculator · daily calorie calculator · calories calculator · how many calories should I eat · daily calorie intake calculator · calories needed per day · calorie intake calculator · calories to lose weight · calorie calculator for weight loss · calorie calculator for men · calorie calculator for women · maintenance calorie calculator · calorie deficit calculator
- **H2s:** What Are Calories? · How Many Calories Should I Eat Per Day? (table by age/sex/activity) · Calories for Weight Loss · Calories for Muscle Gain · Calorie Needs for Men vs Women · How TDEE Is Calculated · BMR vs TDEE · Worked Example (Priya & Rahul — reuse verified numbers from `SOCIAL_MEDIA_DESIGN_BRIEF.md`) · Frequently Asked Questions
- **Links out:** TDEE, macro, protein calculators; calorie-deficit article; `/nutrition/calories` pillar; Indian foods

### 4.2 `/tdee-calculator`
- Title: `TDEE Calculator: Total Daily Energy Expenditure | fitlives`
- Cluster: tdee calculator · maintenance calories · total daily energy expenditure · how many calories do I burn a day · activity multiplier
- H2s: What Is TDEE? · The 4 Parts of TDEE (BMR, TEF, NEAT, exercise) · Activity Levels Explained · TDEE vs BMR · Why Your TDEE Changes When You Lose Weight · FAQ
- Differentiator vs calorie page: energy *expenditure* & activity (NEAT, steps, job type), not goal targets

### 4.3 `/protein-calculator`
- Title: `Protein Calculator: How Much Protein Per Day? | fitlives`
- Cluster: protein calculator · how much protein do I need · protein per day · protein intake calculator · protein for muscle gain · protein for weight loss · protein per kg · vegetarian protein
- H2s: How Much Protein Do You Need? · Protein for Muscle Gain · Protein for Weight Loss · Vegetarian & Indian Protein Sources (table) · Spreading Protein Across Meals · Is Too Much Protein Harmful? · FAQ
- Result extras: per-meal split (3–4 meals) and an Indian food example day

### 4.4 `/macro-calculator`
- Title: `Macro Calculator: Protein, Carbs & Fat Grams | fitlives`
- Cluster: macro calculator · macros for weight loss · macros for muscle gain · IIFYM · carb calculator · fat intake
- H2s: What Are Macros? · Macros for Weight Loss · Macros for Muscle Gain · How We Split Your Macros · Indian Diet Example Day · FAQ

### 4.5 `/bmi-calculator`
- Title: `BMI Calculator: Check Your Body Mass Index | fitlives`
- Cluster: bmi calculator · bmi calculator India · healthy bmi · bmi for men/women · bmi chart
- **Must include Asian cut-offs** (WHO Asia-Pacific / Indian guidance: overweight ≥23, obese ≥25) alongside international ranges, plus limitations (muscle, age, waist)
- H2s: What Is BMI? · BMI Chart · BMI for Indians & South Asians · Limitations of BMI · Waist-to-Height Ratio · FAQ

### 4.6 `/bmr-calculator`
- Title: `BMR Calculator: Basal Metabolic Rate | fitlives`
- Cluster: bmr calculator · basal metabolic rate · calories at rest · Mifflin St Jeor · Harris Benedict
- H2s: What Is BMR? · BMR Formulas Compared · BMR vs RMR vs TDEE · Can You Raise BMR? · FAQ

### 4.7 `/calculators` (hub)
- Title: `Free Fitness & Nutrition Calculators | fitlives`
- Short intro, grouped cards (Nutrition · Body · Training), "Which calculator should I use?" guide. No calculator embedded.

---

## 5. Pillar + cluster architecture

### 5.1 Calories cluster — pillar `/nutrition/calories` ("Complete Guide to Calories")

| Page | Status | URL |
|---|---|---|
| Calorie Calculator | rebuild | `/calorie-calculator` |
| How Many Calories Should I Eat Per Day? | **new** | `/blog/nutrition/calories-energy/how-many-calories-should-i-eat-per-day` |
| How Many Calories Should I Eat to Lose Weight? | ✅ live | `/blog/weight-loss/calorie-deficit/how-many-calories-should-i-eat-to-lose-weight` |
| How to Calculate Your Calorie Deficit | ✅ live | `/blog/weight-loss/calorie-deficit/how-to-calculate-your-calorie-deficit` |
| What Is a Calorie Deficit? | **new** | `/blog/weight-loss/calorie-deficit/what-is-a-calorie-deficit` |
| How Many Calories to Lose 10 kg | ✅ live | `/blog/weight-loss/calorie-deficit/...lose-10-kg` |
| What Are Maintenance Calories? | **new** | `/blog/nutrition/calories-energy/maintenance-calories` |
| BMR vs TDEE | **new** | `/blog/nutrition/calories-energy/bmr-vs-tdee` |
| 1200 / 1500 / 2000 Calorie Indian Diet Plan | **new ×3** | `/blog/weight-loss/diet-meal-planning/1500-calorie-indian-diet-plan` etc. (1200 page must lead with who it is **not** for + safety) |
| Calories in 1 Roti | **new** | `/foods/roti` (food page, not an article) |
| Calories in Rice (1 katori) | **new** | `/foods/rice` |
| Calories in Chicken Breast | ✅ article live → also `/foods/chicken-breast` | |
| Rice vs Roti for Weight Loss | ✅ live | |
| How Many Calories Do I Burn Walking 10,000 Steps? | **new** | `/blog/weight-loss/walking-daily-activity/calories-burned-walking-10000-steps` |

### 5.2 Protein cluster — pillar `/nutrition/protein`

| Page | Status |
|---|---|
| Protein Calculator | rebuild |
| How Much Protein Do You Need Per Day? | ✅ live |
| How Much Protein to Build Muscle | ✅ live |
| Protein Before or After Workout | ✅ live |
| Best High-Protein Indian Foods | ✅ live |
| 100 g Chicken / 100 g Paneer / 2 Eggs | ✅ live |
| Protein for Weight Loss | **new** |
| Protein for Vegetarians (Indian) | **new** |
| Protein for Beginners | **new** |
| Is Too Much Protein Bad for Your Kidneys? | **new** (careful, evidence-based, consult-a-doctor framing) |

### 5.3 Muscle building cluster — pillar `/muscle-building`
Live: progressive overload, how long to build muscle, beginner gym diet. New: beginner workout plan (3-day), how many sets per muscle, creatine basics, bulking on an Indian diet.

### 5.4 Weight loss cluster — pillar `/weight-loss`
Live: belly fat, walking, breakfast, dinner, Indian foods, rice/paneer myths. New: weight-loss plateau, how many steps to lose weight, strength training for fat loss, intermittent fasting (Indian context).

### 5.5 Internal linking rules (enforced in editorial checklist)

- Every cluster article: **≥1 calculator CTA** near the Quick Answer + **≥3 in-body links** to siblings + link to pillar.
- Every calculator: links to its pillar, 3–5 cluster articles, and the *next* calculator in the journey.
- Pillars link to every cluster page (grouped table of contents).
- Anchor text = descriptive ("calculate your protein target"), never "click here".
- Journey chain: **Article → Calorie → TDEE/Macro → Protein → Muscle Building guide → High-protein foods**.
- New articles: set `relatedSlugs`; older siblings get the new article added in the CMS (seed only fills empty related lists).

---

## 6. Programmatic SEO (careful, data-led)

Allowed **only** where the page is genuinely different:

| URL | Unique value | Gate to launch |
|---|---|---|
| `/calorie-calculator/women` | Female formula notes, pregnancy/breastfeeding caveats, menstrual-cycle weight swings, female persona examples | Base page ranking top 30 + GSC shows "women" queries |
| `/calorie-calculator/men` | Male personas, muscle-gain emphasis | Same |
| `/calorie-calculator/weight-loss` | Deficit sizing, rate-of-loss table, floors, plateau guidance | Same |
| `/calorie-calculator/muscle-gain` | Surplus sizing, lean-bulk rate, protein emphasis | Same |
| `/foods/{slug}` | Unique nutrition data per food + Indian serving sizes | Data verified per food |

**Never:** `/calorie-calculator/22-years/87kg/174cm` style permutations, city pages, or near-duplicates. Each variant has a self-canonical, its own H2s, and ≥600 words of distinct content; otherwise it doesn't ship.

---

## 7. Food & calorie database (`/foods/{slug}`)

- **Data sources:** IFCT 2017 (NIN, Indian Food Composition Tables) first; USDA FoodData Central for non-Indian items. Store the source per food.
- **Template:** H1 "Roti Calories & Nutrition" · Quick answer ("1 medium roti (40 g) ≈ 120 kcal") · table per 100 g **and** per household serving (piece, katori, cup) · macros + fiber · how it fits weight loss / muscle gain · comparisons (roti vs rice) · related foods · calculator CTA · sources.
- **Title pattern:** `Roti Calories: Nutrition per Piece & 100 g | fitlives`
- **v1 launch (50 foods):** roti, rice, dal, paneer, egg, chicken breast, curd, milk, banana, oats, poha, upma, idli, dosa, aloo paratha, rajma, chole, besan chilla, peanut butter, almonds, soya chunks, whey protein, apple, sweet potato, chapati w/ ghee, biryani, khichdi, sprouts, tofu, fish curry…
- **Programmatic but not thin:** each page must have verified data + serving sizes + one genuinely useful comparison/insight; ship in batches of 10 with QA.
- Link from articles ("100 g paneer") and the Indian foods hub; add a `/foods` search/filter.

---

## 8. Site search (`/search`)

- Postgres full-text across articles, foods, calculators, exercises, recipes; typo tolerance via trigram.
- Grouped results: "Paneer" → Paneer calories (food) · Paneer for weight loss (article) · High-protein Indian foods · Protein calculator.
- Header search icon (desktop + mobile), `WebSite` + `SearchAction` JSON-LD, `noindex` on result pages.
- Log zero-result queries → content backlog.

---

## 9. Navigation (maps to the locked taxonomy)

```
Home | Calculators ▾ | Nutrition ▾ | Fitness ▾ | Weight Loss ▾ | Blog | About     [Search]

Calculators: Calorie · TDEE · BMR · Macro · Protein · BMI · (Body Fat later) · All calculators
Nutrition:   Calories (pillar) · Protein (pillar) · Carbohydrates · Fats · Vitamins & Minerals · Hydration · Indian Foods
Fitness:     Muscle Building (pillar) · Training Programs · Strength · Exercises library · Programs · Recovery
Weight Loss: Weight Loss guide · Calorie Deficit · Fat Loss Basics · Walking & Activity · Weight Maintenance
```

- Items point to existing pillars / `/blog/{category}/{subcategory}` pages — no new categories.
- Hubs with thin content stay `noindex` until populated (existing rule).
- "Health & Wellness" (sleep, hydration, recovery) appears only once there are ≥3 quality articles each; until then those links live under Nutrition/Fitness.
- Mobile: accordion menu; keep the horizontal category strip.
- Footer mirrors the menu; breadcrumbs on every content page (already in place).

---

## 10. Titles & meta descriptions

**Patterns**

| Page type | Title pattern | Example |
|---|---|---|
| Calculator | `{Tool}: {Primary benefit} \| fitlives` | Protein Calculator: How Much Protein Per Day? \| fitlives |
| Pillar | `{Topic}: Complete Guide \| fitlives` | Calories: The Complete Guide \| fitlives |
| Article | `{Exact question}? \| fitlives` | How Many Calories Should I Eat Per Day? \| fitlives |
| Food | `{Food} Calories: Nutrition per {Serving} & 100 g \| fitlives` | Paneer Calories: Nutrition per 100 g \| fitlives |

Rules: ≤60 characters where possible; primary keyword first; brand once (the layout template appends it — don't include it in CMS meta titles); unique per page.
Meta descriptions: 140–160 characters, state the result the user gets, one clear benefit, no stuffing.

**CTR loop:** every 4 weeks, GSC → pages with high impressions & CTR below the position average → rewrite title/description → annotate the date → compare after 28 days.

---

## 11. Technical SEO checklist

| Check | Action |
|---|---|
| Indexing | GSC Pages report weekly; fix "Crawled – not indexed" by improving content, not by resubmitting |
| robots.txt | Keep allow-all; block `/account`, `/login`, `/auth`, `/preview`, `/search?` result pages |
| Sitemap | Replace `/tools/*` with new URLs; add `/nutrition/calories`, `/foods/*`, `/authors/*`; only indexable 200 URLs |
| Canonicals | Self-canonical everywhere; article canonical includes the article number — **308-redirect the number-less article URL** to it instead of serving a duplicate 200 |
| noindex | Scaffold hubs, search results, preview, account |
| 404 / redirects | Custom 404 with search + popular calculators; all moves are 301/308; no redirect chains |
| LCP | Hero images via `next/image` with correct `sizes`; replace raw `<img>` of 2 MB PNGs in hub components (halo reel, scroll-morph, masonry) with optimised images; preload only the true LCP image |
| INP | Calculators compute synchronously and cheaply; avoid heavy animation on input |
| CLS | Reserve result-panel height; fixed image aspect ratios |
| JavaScript | Keep calculator pages mostly server-rendered content; client JS only for the form; audit animation-heavy home bands |
| Fonts | Roboto Slab via `next/font`, `display: swap`, subset |
| Mobile | Test 360 px, 390 px, tablet, landscape on every template |
| HTTPS / host | Apex `fitlives.in` canonical, www → apex (done) |
| Semantic HTML | One H1, ordered H2/H3, tables with headers, lists |
| Structured data | Article, BreadcrumbList, FAQPage, WebApplication (calculators), Person (authors), Organization, WebSite+SearchAction; validate in Rich Results Test |

---

## 12. EEAT & trust

- **Every article & calculator:** Written by · Reviewed by (only when real) · Last updated (only when actually reviewed) · Sources.
- **Author profiles** `/authors/{slug}`: photo, bio, real credentials/experience, social links, articles list, `Person` schema. Add a "fitlives Editorial Team" author for collaborative pages.
- **Reviewer workflow:** surface existing `reviewer_id` in CMS; show "Reviewed by {name}, {credential}" with review date.
- **Calculator methodology section** on each tool: formula, assumptions, limitations, sources (Mifflin–St Jeor 1990; ISSN protein position stand; WHO BMI & Asia-Pacific cut-offs; ICMR-NIN).
- **Language rules:** no guarantees ("will lose 10 kg"), no cure claims, no medication advice; always "estimates" + "consult a professional"; special care for 1200-kcal, kidney, diabetes, pregnancy topics.
- Trust pages already live (editorial policy, corrections, disclaimers) — link them from calculators.

---

## 13. Content production process (no mass AI publishing)

For every page:

1. **Research** — GSC queries (once available) + People Also Ask + competitor top 5 gap review
2. **Brief** — intent, primary + supporting keywords, H2 outline, unique angle (Indian context / worked example / data), links in/out, calculator CTA
3. **Draft** — humanised, experienced voice; real examples; tables
4. **Evidence check** — every number sourced; sources verified to exist and match claims
5. **Expert review** (health/nutrition pages)
6. **SEO QA** — title/meta length, one H1, internal links ≥3, FAQ real, schema valid, images optimised with alt text
7. **Publish** → add to sitemap automatically → request indexing for priority pages
8. **Measure** at 4 / 8 / 12 weeks → refresh

Cadence: **2–3 excellent pages per week**, not 20 thin ones.

---

## 14. Backlinks (earned, relevant)

**Linkable assets:** the 6 calculators (ungated), Indian Food Calorie Database, 7-Day High-Protein Indian Meal Plan (PDF), Calorie Deficit Guide, Beginner Gym Guide.

**Outreach targets:** Indian fitness/nutrition bloggers, gyms & trainers (free embeddable calculator widget with attribution link), college fitness clubs and nutrition departments, wellness communities, podcasts, HARO-style journalist requests, relevant resource pages.

**Tactics:** original data posts (e.g. "Protein in 50 Indian foods ranked"), infographics via the social design brief, guest posts on genuinely relevant sites, broken-link replacement for dead calculator links.

**Never:** bought link packages, PBNs, spammy directories, exact-match anchor manipulation.

---

## 15. Measurement — Search Console as the dashboard

- **GSC:** weekly Performance review (queries, pages, CTR, position); Pages/indexing; Core Web Vitals; Enhancements (breadcrumbs, FAQ).
- **GA4 / OpenPanel events:** `calc_view`, `calc_submit`, `calc_result_view`, `calc_next_tool_click`, `article_calc_cta_click`, `signup_from_calc`, `search_query`.
- **KPIs (targets to review quarterly):**
  - Calculator completion rate ≥ 60% of views
  - ≥ 25% of calculator users click a next step (tool/article)
  - Pages per session from organic ≥ 1.8
  - Organic clicks to calculators month-over-month growth
  - Queries in top 10 / top 3 count
- **Monthly loop:** queries ranking 8–20 → improve that page (content depth, internal links, title) · queries with no matching page → brief a new page · high impressions + low CTR → rewrite title/meta.

---

## 16. Phased roadmap

| Phase | Weeks | Deliverables | Done when |
|---|---|---|---|
| **0 — Foundations** | 1 | Section 1 decisions signed off; GSC property + sitemap verified; analytics events defined; baseline export of GSC/GA4 | Baseline dashboard exists |
| **1 — Flagship calculators** | 1–4 | URL migration + redirects; ungated results; rebuild **Calorie** (full result spec), then TDEE, Protein, Macro, BMI (Asian cut-offs), BMR; each with full content template, 5–8 FAQs, schema; `/calculators` hub | All 6 live, Rich Results valid, CWV green on mobile, old URLs 301 |
| **2 — Clusters** | 3–8 | `/nutrition/calories` pillar; 8 new calorie-cluster pages; 4 new protein pages; internal-link pass on all 22 existing articles (calculator CTAs + sibling links) | Every cluster page has ≥3 sibling links + calculator CTA |
| **3 — Platform & trust** | 6–10 | New navigation + search upgrade; `/authors/{slug}` profiles; reviewer display; food DB v1 (50 foods, batches of 10) | Search covers foods/tools; 50 food pages QA'd |
| **4 — Expansion (data-led)** | 10–16 | Calorie deficit, ideal weight, body fat, water intake, 1RM, walking/steps calories calculators; programmatic variants (men/women/weight-loss/muscle-gain) **only if GSC shows demand**; linkable assets + outreach | Each new page meets the calculator/content spec |
| **Ongoing** | — | 2–3 pages/week; monthly GSC loop; quarterly content refresh; backlink outreach | KPIs trending up |

---

## 17. Definition of done (per calculator page)

- [ ] Root-level URL, self-canonical, in sitemap, old URL 301s
- [ ] Title ≤60 chars, meta 140–160 chars, one H1 = tool name, promise line under H1
- [ ] Works signed-out; complete result (BMR/TDEE/targets/macros as relevant), units toggle, validation, safety floors
- [ ] ≥1,200 words of genuinely useful content, worked example, methodology + sources
- [ ] 5–8 real FAQs (accordion + FAQPage), BreadcrumbList, WebApplication schema
- [ ] Links: pillar + 3–5 cluster articles + next calculator; ≥3 existing articles link to it
- [ ] Mobile 360 px / tablet / desktop checked; LCP < 2.5 s, INP < 200 ms, CLS < 0.1
- [ ] Written by / Last updated; disclaimer; no guarantee language
- [ ] Analytics events firing
