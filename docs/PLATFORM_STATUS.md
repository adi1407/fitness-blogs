# fitlives — Platform status

**Brand:** fitlives · **Live site:** [fitlives.in](https://fitlives.in)  
**Snapshot date:** 27 November 2026  
**Audience:** founders, editors, engineers — one place to see what shipped, what is queued, and what is still open.

---

## 1. Executive summary

fitlives is no longer a scaffold. It is a **live fitness knowledge platform** with four working content engines (articles, pillars, calculators, databases), a full editorial CMS, shared Postgres API, Search Console–aware SEO plumbing, and AdSense-ready trust pages.

| Metric (live) | Count |
| --- | ---: |
| URLs in `sitemap.xml` | **220** |
| Published articles (numbered canonical URLs) | **~38** |
| Calculator pages | **11** |
| Food pages (incl. hubs) | **~52** |
| Exercise pages (incl. group hubs) | **~57** |
| Recipes (indexable) | **~8** |
| Programs / reviews | **4 / 3** |
| Trust & legal pages | **10** (all HTTP 200) |
| Articles waiting in CMS (`submitted`) | **~27** (see §6) |

**North star (unchanged):** Search → complete answer → calculator or database → related cluster → subscribe / account → return.

```
Google → landing page → helpful content
      → internal links → tools / foods / exercises
      → email or account → returning user
```

---

## 2. What we are building

| We are | We are not |
| --- | --- |
| A searchable **knowledge platform** for India-first fitness & nutrition | A thin WordPress-style blog |
| Intent-complete articles + pillar hubs + teaching calculators + structured DBs | Keyword-stuffed AI spam |
| Educational content with EEAT and “consult a professional” framing | Medical cure claims or medication advice |
| Performance-aware SEO (ISR, images, clean IA) | Animation-first vanity that tanks Core Web Vitals |

**Locked blog taxonomy**

```
Muscle Building · Weight Loss · Nutrition
        ↓
   subcategory
        ↓
   article
```

Public article URL shape:

```
/blog/{category}/{subcategory}/{slug}/{articleNumber}
```

Pillar marketing hubs stay at `/nutrition`, `/weight-loss`, `/muscle-building` and link into `/blog/...`.

---

## 3. Stack & deployment (built)

| Layer | Folder | Stack | Hosting |
| --- | --- | --- | --- |
| Public site | `frontend/` | Next.js App Router, React 19, Tailwind, Motion | Vercel |
| Shared API | `backend/` | Express, PostgreSQL, one-shot content migrations | Render |
| Editorial CMS | `cms/` | React 19, Vite | Vercel |
| Mobile app (companion) | `app/` | Expo / React Native | — (in progress; not the SEO surface) |

**Architecture rules that already hold**

- One API for site + CMS (no Mongo as primary CMS DB).
- Feature folders with colocated components / hooks / api / types.
- Empty or utility routes stay out of the index (`noindex` and/or `robots.txt`).
- Brand: white `#FFFFFF`, near-black `#0A0A0A`, accent orange `#FF9800`, **Roboto Slab**.

Docs of record: `PRODUCT_VISION.md`, `INFORMATION_ARCHITECTURE.md`, `CONTENT_MODEL.md`, `SEO_PLAYBOOK.md`, `SEO_KEYWORD_MAP.md`, `SEO_SCOREBOARD.md`.

---

## 4. What is built — by product surface

### 4.1 Public site (frontend)

#### Home & discovery

- Magazine-style homepage with guides, tools CTAs, and cluster entry points.
- Global site search at `/search` (**noindex** — intentional).
- Social / bio funnel at `/start` (**noindex**).
- Site chrome: header, footer, breadcrumbs on content, floating patterns for tools.

#### Pillars & guides

| Hub | Role |
| --- | --- |
| `/nutrition` | Nutrition pillar |
| `/nutrition/protein` | Protein cluster hub |
| `/nutrition/calories` | Calories cluster hub |
| `/weight-loss` | Weight-loss pillar (incl. “5 steps” with live article links) |
| `/muscle-building` | Muscle-building pillar |
| `/training` | Training overview |
| `/blog` | Latest published articles |
| `/blog/{cat}/{sub}` | Subcategory listings with unique intros |

`/learn` permanently redirects to `/blog`. `/blog/{nutrition|weight-loss|muscle-building}` permanently redirects to the matching pillar.

#### Articles

- Full article template: quick answer, TOC, body, FAQ, sources, author/EEAT, related cluster links, calculator CTAs.
- Canonical **numbered** URLs; slug-only and wrong-number paths **308** to the live URL.
- Unpublished / missing article paths **308** to the subcategory hub (avoids soft-404 leftovers in GSC).
- ISR / revalidate; publish hooks + optional on-demand revalidation.

#### Calculators (11 live)

| Tool | Path |
| --- | --- |
| Protein | `/protein-calculator` |
| Calorie | `/calorie-calculator` |
| Calorie deficit | `/calorie-deficit-calculator` |
| TDEE | `/tdee-calculator` |
| BMR | `/bmr-calculator` |
| Macro | `/macro-calculator` |
| BMI | `/bmi-calculator` |
| Body fat | `/body-fat-calculator` |
| One-rep max | `/one-rep-max-calculator` |
| Water intake | `/water-intake-calculator` |
| Steps → calories | `/steps-to-calories-calculator` |

Also shipped:

- `/tools` directory.
- Educational long-form on each calculator (worked examples, FAQ, sources, next steps).
- Member save / handoff patterns where enabled.
- Embeddable widgets at `/embed/{calculator}` (**noindex**) with credit-link snippets.
- Legacy `/tools/{name}-calculator` → root calculator **308**.

#### Databases

| Surface | Status |
| --- | --- |
| `/foods`, `/foods/indian`, `/foods/{slug}` | Live IFCT-oriented Indian foods |
| `/foods/indian/protein-ranking` (+ embeddable infographic) | Live linkable asset |
| `/exercises`, `/exercises/{group}`, `/exercises/{group}/{slug}` | Live guides (form, progression, FAQ) |
| `/recipes`, `/recipes/{slug}` | Live; air-fryer batch indexable (photos still improve CTR / rich results) |
| `/programs`, `/programs/{slug}` | Live templates |
| `/reviews`, `/reviews/{slug}` | Live criteria-based buying guides |

#### Trust, legal, membership

| Area | Paths | Notes |
| --- | --- | --- |
| Trust | `/about`, `/editorial-policy`, `/authors`, `/corrections`, `/contact` | Operator named; EEAT |
| Legal | `/privacy`, `/terms`, `/cookie-policy`, `/affiliate-disclosure`, `/medical-disclaimer`, `/nutrition-disclaimer` | AdSense disclosures on privacy |
| Members | `/login`, `/account`, Google auth callback | Blocked from indexing |

#### SEO / crawler plumbing

- Dynamic `sitemap.xml` (excludes `robotsIndex: false`).
- `robots.txt` with intentional disallows: account, login, auth, api, preview, search, unsubscribe, embed, start.
- Canonicals, Open Graph / Twitter cards, JSON-LD where accurate (Article, FAQ, Recipe, breadcrumbs, calculators as WebApplication, etc.).
- www → apex; common guessed paths (`/calculators`, `/guides`, `/articles`) → live hubs.
- GSC export archive under `docs/seo/gsc-exports/`.

---

### 4.2 Backend API

- Express + PostgreSQL schema for articles, taxonomy, foods, exercises, recipes, knowledge pages, authors, redirects, subscribers, product picks, revisions / workflow fields.
- Public routes for the site; authenticated CMS routes with roles (**admin / editor / writer**).
- One-shot `content_migrations` for SEO meta, rewrites, cluster links, recipe times, air-fryer index flags, etc. (idempotent, tracked).
- Intent-article seed pipeline (`intentArticles/batch1`…`batch20`) inserting new work as **`submitted`** (not auto-live).
- Redirect map served to the edge proxy; hit counting for ops.
- IndexNow ping on publish/edit; view beacon that does not inflate crawler counts.

---

### 4.3 Editorial CMS

Working desks and editors (non-exhaustive):

| Area | Capabilities |
| --- | --- |
| Articles | List, rich editor, SEO fields, revisions, publish gates, related articles, share captions, calculator inserts |
| Foods / exercises / recipes / knowledge | List + editors, photo-gap ops for recipes |
| Workflow | Writer / editor / admin desks, assignments, activity log, quality gaps, stale content |
| SEO ops | Indexing insights, SEO performance, redirects, topic clusters |
| Users | Roles, author public profiles, password change |
| Growth | Subscribers, product picks / placements, notifications |

Roles and draft → review → publish are in place; public hubs **hide links** to unpublished slugs so drafts do not 404 from the open web.

---

### 4.4 Brand & design system

- fitlives wordmark / logo assets.
- White canvas, near-black type/CTAs, orange accent (no blue primary).
- Roboto Slab; strategic motion only (heroes, calculators, reveals).
- Shared UI primitives across site and CMS where appropriate.

---

## 5. Content engines — depth of what shipped

### 5.1 Live clusters (high level)

| Cluster | Examples of live coverage |
| --- | --- |
| Protein | How much protein / day, Indian high-protein foods, paneer/eggs/chicken macros, timing, whey safety |
| Weight loss | Deficit how-tos, belly fat, walking, plateaus, IF, Indian diet plan, strength for fat loss, food myths |
| Muscle building | Progressive overload, build-muscle timeline, beginner gym diet, creatine safety |
| Calories / energy | Maintenance calories (and related calorie guides on the calories pillar) |
| Training DB | Muscle-group hubs + individual exercise guides |
| Foods DB | Indian staples + protein ranking asset |
| Recipes | Classic high-protein set + air-fryer batch (indexable) |

Exact ownership of Google queries lives in `SEO_KEYWORD_MAP.md` (one query → one owner URL).

### 5.2 AdSense & quality pass (already done)

After an Oct 2026 “low value content” rejection, the platform received a large depth pass:

- Thin articles rewritten to ~800–1,000+ words where needed.
- Exercise guides rebuilt with setup, cues, tables, progression, safety, FAQ.
- Recipes, programs, reviews, subcategory hubs expanded.
- Trust / privacy / about pages completed for AdSense review readiness.

**Status:** technical + content readiness for **AdSense re-request** is documented in `SEO_SCOREBOARD.md`. Manual ad unit IDs still optional until approval.

---

## 6. Editorial queue — built but not live yet

These articles exist in the CMS as **`submitted`**. Bodies and cluster links are seeded; **hubs hide links until you publish** in the CMS (one-by-one).

### Older allowlist (16)

`bmr-vs-tdee`, `1500-calorie-indian-diet-plan`, `vegetarian-protein-sources-india`, `protein-for-weight-loss`, `how-to-gain-weight-for-skinny-guys`, `beginner-3-day-gym-workout-plan`, `how-many-sets-per-muscle-per-week`, `bulking-on-an-indian-diet`, `push-pull-legs-for-beginners`, `how-many-days-a-week-should-i-work-out`, `how-many-calories-should-i-eat-per-day`, `what-is-a-calorie-deficit`, `1200-calorie-indian-diet-plan`, `2000-calorie-indian-diet-plan`, `calories-burned-walking-10000-steps`, `calories-in-indian-thali`

### Creatine cluster (4)

`creatine-dosage`, `creatine-loading-phase`, `creatine-for-women`, `creatine-monohydrate-vs-hcl`

### Whey cluster (4)

`how-much-whey-protein-per-day`, `whey-protein-concentrate-vs-isolate`, `best-time-to-take-whey-protein`, `whey-protein-for-vegetarians`

### Cardio fat-loss cluster (3) — shipped 25–26 Nov 2026

`how-much-cardio-for-fat-loss`, `hiit-vs-steady-state-for-fat-loss`, `best-cardio-for-weight-loss`  
→ fills empty `cardio-weight-loss` subcategory once published.

**Total in queue ≈ 27 articles.** Publishing these is the single largest near-term organic-growth lever that does not require new engineering.

---

## 7. SEO & indexing — current picture

| Topic | State |
| --- | --- |
| Sitemap health | ~220 URLs; production HEAD checks on sitemap entries were clean (200) |
| Indexed vs not (mid-Nov chart) | ~194 indexed / ~102 not indexed (includes intentional redirects, noindex, robots blocks) |
| Redirect “failures” in GSC | Mostly expected (`www`, legacy `/tools/…`, `/learn`, pillar aliases) |
| robots / noindex utilities | Intentional — do not “validate fix” those |
| 404 leftovers | Softened via subcategory redirects + legacy path aliases (Nov 2026) |
| Air-fryer recipes | Opened to indexing; CMS HTTPS photos still improve rich results / CTR |
| Keyword ownership | Maintained in `SEO_KEYWORD_MAP.md` |
| Monthly ops | Documented in keyword map §6 + `WEEKLY_GROWTH_ROUTINE.md` |

Raw GSC dumps: `docs/seo/gsc-exports/YYYY-MM-DD/`.

---

## 8. What remains — prioritized

### P0 — Operator actions (no code)

1. **CMS publish** the ~27 submitted articles (creatine → whey → cardio → older calories/muscle/protein seeds), checking links and metas as each goes live.
2. **AdSense** — request review if not already pending; after approval, set slot env vars and keep Auto ads’ in-page placements off.
3. **GSC** — keep `sitemap.xml` submitted; validate 404/noindex fixes after crawl; run monthly striking-distance / CTR loop.
4. **Air-fryer photos** — upload HTTPS images + alt in CMS for Recipe rich results.

### P1 — Product / content engineering

| Item | Why it matters |
| --- | --- |
| Next keyword clusters (e.g. body-fat / composition, carbs, fiber) | Empty subcategory shells still need intent-complete owners |
| Deeper internal links to “Discovered – not indexed” URLs | Crawl budget on a young domain |
| CMS photo / media workflow polish | Rich results + social CTR |
| Refresh `BUILD_ROADMAP.md` checkboxes | File is historically stale vs production (this status doc is current) |
| Mobile app (`app/`) parity with web knowledge loop | Companion experience; not required for Google SEO |

### P2 — Later platform (explicitly deferred or gated)

- Forced login to read content.
- Heavy gamification / community day one.
- Dense ad layouts / vignettes.
- Mass thin programmatic SEO pages.
- Calculator variants (`/calorie-calculator/women`, etc.) — only when GSC proves demand.
- Workout generator / meal planner.
- Hindi locales.

### P3 — Measurement gaps

- Fill SEO scoreboard headline metrics from GA4 + GSC Performance exports (clicks, impressions, top-10 queries).
- Register GA4 custom dimensions for calculator / newsletter parameters if not already done.
- Backlink outreach for protein-ranking infographic and embed widgets (process exists; execution is ops).

---

## 9. Suggested next 30 days

```
Week 1  Publish 5–8 highest-intent submitted articles (creatine + whey first)
        Confirm AdSense review state; resubmit sitemap if needed
Week 2  Publish cardio cluster (opens subcategory) + 4 older calorie/muscle seeds
        Upload remaining recipe photos
Week 3  GSC monthly loop (striking distance + low CTR titles)
        5–10 outreach emails for protein-ranking / embeds
Week 4  Brief next cluster from GSC “no owning page” queries
        Spot-check Core Web Vitals on article + calculator templates
```

---

## 10. How to read related docs

| Doc | Use when |
| --- | --- |
| **This file** (`PLATFORM_STATUS.md`) | “What exists vs what is left?” |
| `PRODUCT_VISION.md` | Principles and north star |
| `INFORMATION_ARCHITECTURE.md` | URL and nav rules |
| `CONTENT_MODEL.md` | Fields and entities |
| `SEO_PLAYBOOK.md` | Quality / schema rules |
| `SEO_KEYWORD_MAP.md` | Query ownership + next briefs |
| `SEO_SCOREBOARD.md` | Indexing snapshots + change log |
| `SEO_GROWTH_PLAN.md` | Longer-range SEO strategy |
| `WEEKLY_GROWTH_ROUTINE.md` | Recurring ops checklist |
| `DEPLOY.md` | Render / Vercel deploy steps |
| `BUILD_ROADMAP.md` | Original phase plan (historical; prefer this status doc for “done”) |

---

## 11. One-line verdict

**The platform is built and live.** The remaining work is mostly **editorial publish + measurement + growth loops**, not greenfield product scaffolding — plus deliberate new clusters only when keyword map and GSC say they earn their place.

---

*Last updated: 27 Nov 2026 · Live sitemap count and trust-page checks taken the same day.*
