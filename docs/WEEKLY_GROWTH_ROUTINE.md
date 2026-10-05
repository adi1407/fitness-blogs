# Weekly growth routine (~1 hour/week)

The site does the technical work automatically (sitemap, structured data, share images, IndexNow pings on publish). This checklist is the human part: reading what search engines and visitors tell us, and turning it into better pages and posts.

One-time Google setup lives in [GOOGLE_SEO_SETUP.md](./GOOGLE_SEO_SETUP.md). Do the one-time steps below first, then repeat the weekly list every Monday.

---

## One-time setup

### Google Search Console

- [ ] Sitemap submitted: `https://fitlives.in/sitemap.xml` (Indexing → Sitemaps). It now includes every calculator and every `/foods/*` page.
- [ ] Request indexing (URL Inspection → Request indexing) for the pages that matter most right now:
  - `/foods/indian`, `/foods/paneer`, `/foods/moong-dal`, `/foods/roti`, `/foods/rice`, `/foods/boiled-egg`, `/foods/chicken-breast`
  - `/calorie-deficit-calculator`, `/body-fat-calculator`, `/one-rep-max-calculator`, `/water-intake-calculator`, `/steps-to-calories-calculator`
  - `/tools`

  Google allows only about 10 requests a day, so spread the list over 2–3 days.

### Bing Webmaster Tools (also powers ChatGPT search, Copilot, DuckDuckGo and Yahoo)

- [ ] Sign in at [bing.com/webmasters](https://www.bing.com/webmasters). The fastest option is **Import from Google Search Console**, which copies the site and sitemap.
- [ ] If you verify with a meta tag instead: copy the `msvalidate.01` code into Vercel as `NEXT_PUBLIC_BING_SITE_VERIFICATION`, redeploy, then click Verify.
- [ ] Sitemap submitted: `https://fitlives.in/sitemap.xml`.

### IndexNow (automatic, just confirm once)

- Publishing or republishing an article in the CMS pings IndexNow (Bing, Yandex, Seznam, Naver). That usually gets the URL crawled within hours.
- It only runs when Render has `NODE_ENV=production` **and** `PUBLIC_SITE_URL=https://fitlives.in`. Check both are set in the Render environment.
- The key file is served at `https://fitlives.in/4fe32676c077552c0a3ff77ed9b99db5.txt`. Opening it should show the key.
- Food pages and calculators are not pinged (they ship with code deploys, not CMS publishes). Bing finds them through the sitemap. To speed up a new batch, paste the URLs into Bing Webmaster → **URL Submission**.

---

## Every week (Monday, ~45 min)

### 1. Search Console → Performance (last 28 days, compare to previous 28) — 20 min

Work through these three filters and write the findings into the week's note (template below).

- [ ] **Striking distance: queries ranking 8–20.** Sort by impressions, filter Position > 7.9 and < 20.1. These pages are on page 2 and a small improvement moves them to page 1. Pick the top 5 and improve the matching page: add a direct answer near the top, a table, an FAQ that matches the query wording, and 2–3 internal links from related pages.
- [ ] **High impressions, low CTR.** Filter CTR < 2% with 200+ impressions. The page ranks but people don't click, so the title or description is the problem. Rewrite the meta title so it contains the exact query and a concrete promise, e.g. "Paneer Calories: 129 kcal per 50 g (+ Protein Chart)". Change at most 5 titles a week so you can see what worked.
- [ ] **New queries we have no page for.** Look for queries with impressions where the ranking page is only loosely related. Each one is a candidate article or food page.

### 2. Search Console → Pages (indexing) — 10 min

- [ ] **"Crawled – currently not indexed"**: Google saw the page and judged it not useful enough yet. Improve it (more depth, better internal links) rather than re-requesting indexing straight away.
- [ ] **"Discovered – currently not indexed"**: Google knows the URL but hasn't crawled it. Add links to it from 2–3 strong pages (home, `/tools`, a pillar article).
- [ ] **Not found (404) / redirect errors**: fix or add a redirect. Old `/tools/*-calculator` URLs redirecting with 308 is expected and fine.
- [ ] **Core Web Vitals** (Experience → Core Web Vitals): note any URL group marked "Poor" on mobile.

### 3. Bing Webmaster — 5 min

- [ ] Search Performance: same striking-distance check. Bing often ranks new pages sooner than Google, so it's an early signal.
- [ ] Site Scan / Recommendations: fix anything marked high severity.

### 4. OpenPanel (analytics) — 10 min

Check these events for the last 7 days:

| Event | What it tells you |
| --- | --- |
| `calc_open`, `calc_complete` | Which calculators get used, and how many visitors finish them |
| `calc_share_result` (`method`) | Which calculators people share; native share vs download vs copy link |
| `food_view`, `food_serving_change` | Which foods get traffic and whether visitors use the serving calculator |
| `food_filter` | What people filter by on `/foods/indian` (diet, category, high protein, search terms) |
| `site_search` (`query`, `results`) | **Searches with `results: 0` are content requests.** Add them to the content backlog. |
| `article_open`, `share_click` | Top articles and how they get shared |
| `social_follow_click` | Which placements send people to social profiles |

- [ ] Filter visits by `utm_source` (instagram, facebook, whatsapp, share) to see which posts brought traffic.

---

## Social: 3–4 posts a week

Every new food page or calculator is ready-made content. One page becomes one post.

**Formats that work**

- **Reel / short (15–30 s):** a hook question, then 3 quick numbers, then a call to action. E.g. "How much protein is in 1 katori of moong dal?" → 7 g protein, 98 kcal, how it compares with masoor dal → "Full chart: link in bio".
- **Carousel (5–7 slides):** a comparison. E.g. "Roti vs rice vs poha: calories per serving", "6 Indian foods with the most protein per calorie".
- **Story:** a calculator result share card (the "Share my result" button makes these) with a link sticker to the calculator.

**Weekly mix**

1. One food comparison (from `/foods/*` compare tables)
2. One calculator explainer (pick the calculator with the most `calc_open` events)
3. One article-based myth/fact post
4. Optional: a reshare of a follower's result card

**Always tag links** so OpenPanel can attribute visits:

```
https://fitlives.in/foods/paneer?utm_source=instagram&utm_medium=social&utm_campaign=paneer-reel
https://fitlives.in/calorie-deficit-calculator?utm_source=facebook&utm_medium=social&utm_campaign=deficit-carousel
https://fitlives.in/foods/indian?utm_source=instagram&utm_medium=bio
```

Use lowercase, hyphenated campaign names and keep `utm_source` to one of `instagram`, `facebook`, `whatsapp`, `youtube`, `x`. Calculator shares from the site are already tagged `utm_source=share&utm_medium=calculator`.

**Rules**

- Numbers in posts must match the page (the site is the source of truth; food values come from IFCT 2017).
- No medical claims ("cures", "treats", "reverses"). Educational wording only.
- Use the site's share images (`/og` cards) or brand colours: white, near-black `#0A0A0A`, orange `#FF9800`.

---

## Weekly note template

Copy this into your notes each Monday and send the "For the developer" section along when you want pages improved.

```
Week of: YYYY-MM-DD

Search Console (28 days vs previous)
- Clicks: ___ (±__%)   Impressions: ___ (±__%)   Indexed pages: ___
- Striking-distance queries (8–20):
  1. "query" — position __ — page /...
  2.
- Low-CTR pages (title rewrites):
  1. /... — CTR __% — new title: "..."
- Not indexed: __ crawled-not-indexed, __ discovered-not-indexed

Bing: clicks ___, notable queries: ...

OpenPanel (7 days)
- Top calculators: ...
- Top foods: ...
- Zero-result searches: ...
- Best social post (utm_campaign): ...

Social: posts published __/4

For the developer
- Pages to strengthen: ...
- New pages to create: ...
```

---

## What "working" looks like after 8 weeks

- Indexed pages up from ~60 to ~130 (calculators + 50 food pages + articles).
- Calculators and food pages bring in most organic visits.
- Mobile LCP under 2.5 s on articles (Search Console → Core Web Vitals).
- At least a few striking-distance queries moved onto page 1 each month.
