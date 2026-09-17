# Fitness Knowledge Platform

> Not a basic blog — a **searchable fitness knowledge platform** (articles, guides, tools, databases) built for Google traffic and returning users.

## Apps

| Folder | Role | Stack |
|--------|------|--------|
| `frontend/` | Public platform | Next.js App Router, React 19, Tailwind, Motion |
| `backend/` | Shared API | Express, PostgreSQL (Docker local / Render) |
| `cms/` | Editorial CMS | React 19, Vite |

## Product docs (read first)

| Doc | Purpose |
|-----|---------|
| [docs/PRODUCT_VISION.md](./docs/PRODUCT_VISION.md) | North star & principles |
| [docs/INFORMATION_ARCHITECTURE.md](./docs/INFORMATION_ARCHITECTURE.md) | URLs, nav, clusters |
| [docs/CONTENT_MODEL.md](./docs/CONTENT_MODEL.md) | CMS fields & Postgres entities |
| [docs/SEO_PLAYBOOK.md](./docs/SEO_PLAYBOOK.md) | Intent, schema, quality |
| [docs/BUILD_ROADMAP.md](./docs/BUILD_ROADMAP.md) | Phased delivery |

Cursor rule: `.cursor/rules/fitness-platform.mdc` (always on).

## Brand

- Background: white `#FFFFFF`
- Primary blue: `#E1F5FE` → `#29B6F6`
- Accent orange: `#FFE0B2` → `#FF9800`
- Type: **Roboto Slab**

## Local development

```bash
# API + DB
cd backend && cp .env.example .env && npm install && npm run db:up && npm run dev

# Site
cd frontend && cp .env.example .env.local && npm install && npm run dev

# CMS
cd cms && cp .env.example .env && npm install && npm run dev
```

## Architecture rules

- One API for site + CMS
- Feature folders with colocated `components` / `hooks` / `api` / `types`
- SEO-first routes; empty hubs stay `noindex` until valuable
- Indian nutrition as a differentiator
- Calculators that teach + link into content clusters
