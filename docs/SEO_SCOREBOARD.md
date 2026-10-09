# fitlives SEO scoreboard

Monthly snapshot of organic search health. Add a new column each month; never overwrite past numbers.
Plan: 12-week SEO traffic plan (Oct–Dec 2026). Rules: `SEO_PLAYBOOK.md`, roadmap: `SEO_GROWTH_PLAN.md`.

## How to update (first week of each month, ~30 minutes)

1. **Search Console → Performance → Search results**, last 28 days, export (Queries, Pages, Devices).
2. **Search Console → Pages**: record indexed / not indexed, and export each "Why pages aren't indexed" reason.
3. **GA4 → Reports → Acquisition → Traffic acquisition**, last 28 days: users by channel.
4. **Search Console → Links → Top linking sites**: count referring domains.
5. Fill in the tables below, then run the monthly loop (bottom of this file).

## Headline numbers

| Metric | Baseline (4–8 Oct 2026) | Month 1 | Month 2 | Month 3 | 12-week target |
| --- | --- | --- | --- | --- | --- |
| Organic users (GA4, 28 days) | 7 | | | | 300+ |
| All users (GA4) | 54 | | | | — |
| Organic Social users (GA4) | 33 | | | | — |
| GSC clicks (28 days) | needs export | | | | — |
| GSC impressions (28 days) | needs export | | | | 5× baseline |
| Queries in top 10 | needs export | | | | 30+ |
| Queries in top 3 | needs export | | | | — |
| Pages indexed | needs export | | | | all sitemap URLs |
| Referring domains | 0 known | | | | 10+ |
| Published articles | 33 (41 live on 9 Oct; 16 more seeded and awaiting review) | | | | 57+ |
| Calculator users clicking a next step | not measured yet | | | | 25%+ |

## Indexing baseline (GSC Pages report, data from 4 Oct 2026)

| Reason (not indexed) | Pages | Diagnosis | Action |
| --- | --- | --- | --- |
| Crawled – currently not indexed | 34 | Mostly food pages (`/foods/roti`, `/foods/moong-dal`…) and calculators (`/calorie-calculator`, `/protein-calculator`, `/bmr-calculator`…). Pages are new, have few internal links, and the site has no external links yet. Content itself is substantial (calculator pages ~2,200 words). | Internal links from articles, pillar and hubs; `/nutrition/calories` pillar; backlinks. Do **not** just resubmit. |
| Discovered – currently not indexed | 19 | Exercise pages and 4 articles Google has not crawled yet (crawl budget of a new site). | Internal links; link exercises from new muscle-building articles. |
| Excluded by `noindex` | 18 | `/login?next=…` URLs found through the header "Sign in" link, plus `/authors` and the search-box template URL. Correctly noindexed. | Sign-in links now `rel="nofollow"`; `/login` already blocked in robots.txt. |
| Page with redirect | 21 | `www.` and `http://` variants and old number-less article URLs. Expected. | None — redirects are correct. |
| Duplicate without user-selected canonical | 7 | Numbered article URLs. The live pages now all have a self-canonical. | Search Console → "Validate fix". |
| Duplicate, Google chose different canonical | 1 | `is-rice-good-for-weight-loss` treated as a duplicate of `rice-vs-roti-for-weight-loss` — both short and covering the same advice. | Rewrite the rice article around a distinct intent (rice types, portions by goal, cooking). |

## Performance baseline (needs your export)

The Queries/Pages export was not in Downloads. Export **Performance → last 3 months → Queries and Pages** to fill:

- **Striking distance** (position 8–30, sorted by impressions): improve these first.
- **Low CTR** (impressions ≥ 50, CTR below 2%): rewrite title and description.
- **No matching page** (queries where the ranking URL doesn't answer the query): brief a new article.

Until that export exists, titles were tuned for the pages with the highest commercial intent (calculators and the most-linked articles) — see the change log.

## Change log

| Date | Change | Pages | Expected effect | Check on |
| --- | --- | --- | --- | --- |
| 9 Oct 2026 | Sign-in links `rel="nofollow"` | site-wide header | Fewer `/login` URLs discovered | 6 Nov |
| 9 Oct 2026 | Baseline recorded | — | — | — |
| 9 Oct 2026 | Calculator titles matched to query wording ("how many calories per day", "how much protein per day", "litres per day", "calories burned", "at rest") | calorie, protein, water-intake, steps-to-calories, BMR calculators | Higher CTR once indexed | 6 Nov |
| 9 Oct 2026 | Article titles sharpened (example, steps, timeline, litres, research) via migration `2026-10-12-seo-meta-rewrites` | calorie-deficit how-to, walking, build-muscle timeline, water, protein timing | Higher CTR | 6 Nov |
| 9 Oct 2026 | 221 KB logo → 4 KB WebP on page; next/image on hub cards | site-wide | Faster LCP on mobile | 6 Nov (PageSpeed) |
| 9 Oct 2026 | Pillar-hub link in all 33 articles; extra sibling links where an article had fewer than 3 (migration `2026-10-12-pillar-links`) | all articles | Hubs gain internal links; more crawl paths | 20 Nov |
| 9 Oct 2026 | `is-rice-good-for-weight-loss` rewritten (185 → ~1,150 words): portions by goal, rice types, cooking, regional plates — distinct from rice vs roti | rice article | Google stops treating it as a duplicate of rice-vs-roti | 20 Nov |
| 9 Oct 2026 | New `/nutrition/calories` pillar; Calories + Protein guides linked from the site-wide footer | calories cluster | Ranking for "how many calories do I need"; more internal links to calculators and food pages | 20 Nov |
| 9 Oct 2026 | Muscle-building cluster: 6 articles (skinny gain, 3-day plan, sets per muscle, Indian bulking, PPL, days per week) + inbound links | muscle building | Rankings for beginner training queries | 20 Nov |
| 9 Oct 2026 | Calories cluster: 6 articles (calories per day, calorie deficit, 1,200 / 2,000 kcal plans, 10,000 steps, thali) + inbound links | calories | Fills the new pillar; long-tail diet-plan queries | 20 Nov |
| 9 Oct 2026 | Protein cluster: 9 articles (veg breakfast, beginners, kidneys, soya chunks, eggetarians, paneer vs tofu, dal vs chicken, oats vs poha, curd vs milk) + inbound links | protein | "X vs Y" and Indian protein queries | 20 Nov |
| 9 Oct 2026 | Weight-loss articles: steps a day, strength training for fat loss, vegetarian Indian diet + inbound links | weight loss | Rankings for core weight-loss queries | 20 Nov |
| 9 Oct 2026 | Article API unwraps links to unpublished articles at serve time | all articles | No internal links to 404s while drafts are in review | — |
| 9 Oct 2026 | Linkable asset `/foods/indian/protein-ranking` + infographic (`/foods/indian/protein-ranking/infographic.png`) with embed and citation code; linked from 5 protein articles | foods | Backlinks; image search; "protein in Indian foods" queries | 4 Dec |
| 9 Oct 2026 | Embeddable calculators `/embed/{calculator}` (noindex) with credit-link snippet on every calculator page; `frame-ancestors 'self'` everywhere else | calculators | Backlinks from gyms/bloggers; clickjacking protection | 4 Dec |
| 9 Oct 2026 | Refreshed `protein-before-or-after-workout` (177 → ~850 words) and `how-long-does-it-take-to-build-muscle` (185 → ~750 words) via migration `2026-10-14-article-rewrites` | 2 articles | Leave "Crawled – not indexed"; rank for timing/timeline queries | 20 Nov |

## Content status

16 seeded articles are not published (status changed in the CMS) and return 404 until republished. Their inbound links are hidden automatically and reappear when each one is published:

- **Older:** `bmr-vs-tdee`, `1500-calorie-indian-diet-plan`, `vegetarian-protein-sources-india`, `protein-for-weight-loss` — also linked from calculator pages, `/weight-loss` and `/nutrition/calories` (static links that 404 until published).
- **Muscle building:** `how-to-gain-weight-for-skinny-guys`, `beginner-3-day-gym-workout-plan`, `how-many-sets-per-muscle-per-week`, `bulking-on-an-indian-diet`, `push-pull-legs-for-beginners`, `how-many-days-a-week-should-i-work-out`.
- **Calories:** `how-many-calories-should-i-eat-per-day`, `what-is-a-calorie-deficit`, `1200-calorie-indian-diet-plan`, `2000-calorie-indian-diet-plan`, `calories-burned-walking-10000-steps`, `calories-in-indian-thali`.

Other thin early articles to refresh next (body words): `is-paneer-good-for-weight-loss` (197), `how-much-water-should-you-drink` (207), `2-eggs-calories-and-protein` (226), `best-high-protein-indian-foods` (243).

## Backlink assets

| Asset | Share it with | Measure |
| --- | --- | --- |
| `/foods/indian/protein-ranking` + infographic | Indian fitness/nutrition bloggers, dietitians, gym Instagram pages, Reddit (r/IndianFitness) | GSC → Links → top linking sites; GA4 referrals to the page |
| `/embed/{calculator}` | Gyms, personal trainers, coaching websites | GA4 sessions with `utm_source=embed` (link clicks from widgets); GSC links to calculator pages |

Outreach template: one-line intro, why the asset helps their readers (IFCT data, free, no sign-up), the embed code, and a request to keep the credit link.

## Monthly loop

1. Striking-distance queries (8–20): deepen the ranking page (missing subtopic, table, FAQ), add 2–3 internal links to it, sharpen the title.
2. High impressions + CTR below the position's average: rewrite title/description; log the date here; compare after 28 days.
3. Queries without a matching page: add a brief to the content backlog (`SEO_GROWTH_PLAN.md` §13 process).
4. Refresh two older articles: update numbers, add a section answering a query from GSC, update `updated_at` only when the content really changed.
5. Pages still "Crawled – not indexed" after 6 weeks: improve content and inbound links, then request indexing once.
6. Revisit gated work only with GSC demand: calculator variants (`/calorie-calculator/women`), Hindi pages (month 3).
7. Publish or delete anything listed under "Content status"; send 5–10 outreach emails for the backlink assets and record new referring domains.

Refreshes ship as entries in `backend/src/db/intentArticles/rewrites.ts` plus a new migration id that runs `applyArticleRewrites` (each rewrite applies only while the live body still has its original opening, so CMS edits are never overwritten).
