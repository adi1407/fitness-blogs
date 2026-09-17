# Product Vision — Fitness Knowledge Platform

> We are **not** building “a blog with posts.”  
> We are building a **searchable fitness knowledge platform** optimized for Google traffic, helpful depth, tools, and structured databases.

## North star

A user lands from search → gets a complete answer → uses a calculator → explores related foods/exercises → reads the next guide → optionally saves/subscribes → returns.

```
Google → Query → SEO landing page → Helpful content
      → Internal links → Related content → Tools/calculators
      → Email / account → Returning user
```

## Product identity

**What we are**
- Evidence-informed fitness, nutrition, and training platform
- Strong **Indian nutrition / lifestyle** differentiator
- Four content engines: **Articles · Guides · Tools · Structured databases**

**What we are not**
- A thin WordPress-style blog
- Keyword-stuffed AI spam
- Medical advice / cure claims
- Animation-first vanity site that tanks Core Web Vitals

## Four content types (mandatory)

| Type | Example | Purpose |
|------|---------|---------|
| Articles | How much protein per day? | Intent-focused answers |
| Guides / pillars | Complete guide to weight loss | Topic hubs + clusters |
| Tools | Protein / TDEE / Macro calculators | Repeat visits + conversion |
| Databases | Foods, exercises, recipes | Programmatic SEO done carefully |

## Platform map (target IA)

```
FITNESS PLATFORM
├── HOME
├── LEARN
│   ├── Nutrition
│   ├── Weight Loss
│   ├── Muscle Building
│   ├── Training
│   ├── Cardio
│   ├── Recovery
│   ├── Supplements
│   ├── Sports Nutrition
│   └── Women's Fitness
├── PROGRAMS
│   ├── Beginner / Fat Loss / Muscle Gain / Strength / Athletic
├── TOOLS (calculator hub)
├── EXERCISES (by muscle + individual exercise pages)
├── FOODS (incl. Indian foods)
├── RECIPES
├── REVIEWS
├── AUTHORS
└── ABOUT (+ trust pages)
```

## Traffic model principle

SEO is **architecture-first**, not “add later.”

Every important page should:
1. Match **search intent**
2. Answer the full problem (not just a keyword)
3. Link into the **topic cluster**
4. Offer a **tool** or **database** next step when relevant
5. Stay **mobile-first**, fast, and accessible

## Design & brand (current project tokens)

Do **not** ignore the established brand in code:

| Token | Value |
|-------|--------|
| Background | `#FFFFFF` |
| Blue scale | `#E1F5FE` → `#29B6F6` (primary) |
| Orange scale | `#FFE0B2` → `#FF9800` (accent) |
| Type | **Roboto Slab** (primary); Diet = display utility |

Premium feel = **clarity + trust + speed**, not max animation.  
Motion: hero subtlety, card hover, reveal, calculator transitions only.

## Stack (locked)

| Layer | Choice |
|-------|--------|
| Frontend | Next.js (App Router) + TS + Tailwind + Motion |
| Backend | Express + PostgreSQL (shared by site + CMS) |
| CMS | React 19 dashboard |
| Search (later) | Postgres FTS → Typesense/Meilisearch |
| Deploy | Frontend/CMS as needed; API + Postgres on Render |

## Build order (do not skip)

### Phase 0 — Foundations (current)
- Monorepo: `frontend` / `backend` / `cms`
- SEO shell: metadata, robots, sitemap, JSON-LD helpers
- Color + font schema
- IA docs + Cursor rules

### Phase 1 — Content engine MVP
- Article + category models (Postgres)
- CMS draft → review → publish
- Public article route with: breadcrumb, quick answer, TOC, FAQ, sources, author, related
- Internal linking fields

### Phase 2 — Tools hub
- `/tools` index + 8–15 calculators
- Output that explains results + links to guides/foods

### Phase 3 — Databases
- Foods (esp. Indian) + nutrients
- Exercises (muscles, cues, variations)
- Recipes with macros

### Phase 4 — Clusters at depth
- Protein, Weight Loss, Muscle Building pillars
- Supporting articles + cross-links

### Phase 5 — Platform layer
- Accounts (optional): save, macros, progress
- Search across articles/foods/exercises/tools
- Newsletter
- SEO / editorial dashboards

## Non‑negotiable quality bar

- No medical “cure / stop your medication” claims
- Sources for health claims; distinguish Written / Reviewed / Fact-checked
- Trust pages: About, Editorial, Disclaimers, Privacy, Terms, Affiliate
- Thin pages are not indexable until they have real value
- Schema only when it matches real content
- Performance: image sizes, lazy media, minimal JS, strong LCP/INP/CLS

## Success metrics

Organic clicks, impressions, CTR, position, engagement, calculator usage, internal-link clicks, newsletter conversion, pages/session — not vanity page count.

See also:
- [INFORMATION_ARCHITECTURE.md](./INFORMATION_ARCHITECTURE.md)
- [CONTENT_MODEL.md](./CONTENT_MODEL.md)
- [SEO_PLAYBOOK.md](./SEO_PLAYBOOK.md)
- [BUILD_ROADMAP.md](./BUILD_ROADMAP.md)
