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
| Published articles | 33 | | | | 57+ |
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
| 9 Oct 2026 | New `/nutrition/calories` pillar; Calories + Protein guides linked from the site-wide footer | calories cluster | Ranking for "how many calories do I need"; more internal links to calculators and food pages | 20 Nov |

## Monthly loop

1. Striking-distance queries (8–20): deepen the ranking page (missing subtopic, table, FAQ), add 2–3 internal links to it, sharpen the title.
2. High impressions + CTR below the position's average: rewrite title/description; log the date here; compare after 28 days.
3. Queries without a matching page: add a brief to the content backlog (`SEO_GROWTH_PLAN.md` §13 process).
4. Refresh two older articles: update numbers, add a section answering a query from GSC, update `updated_at` only when the content really changed.
5. Pages still "Crawled – not indexed" after 6 weeks: improve content and inbound links, then request indexing once.
6. Revisit gated work only with GSC demand: calculator variants (`/calorie-calculator/women`), Hindi pages (month 3).
