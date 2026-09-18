# FitKnowledge CMS

Editorial app ported from news-kothari patterns (roles, slug/SEO metadata, TipTap editor, admin activity log, collapsible SessionNavBar). Uses Postgres via the Express API — not Mongo.

## Run

```bash
# from backend/  (requires Docker Desktop)
docker compose up -d
npm run dev

# from cms/
npm run dev
```

Open http://localhost:5173

### Seed users (created on API boot)

| Email | Password | Role |
|-------|----------|------|
| `admin@fitknowledge.local` | `ChangeMeAdmin123!` | admin |
| `editor@fitknowledge.local` | `ChangeMeEditor123!` | editor |
| `writer@fitknowledge.local` | `ChangeMeWriter123!` | writer |

Set `VITE_API_URL=http://localhost:4000/api/v1` if not using the Vite proxy (see `.env.example`).

## Roles

| Role   | Articles                                      | Activity log |
|--------|-----------------------------------------------|--------------|
| admin  | create / edit / publish / unpublish / reject  | yes          |
| editor | create / edit / publish / unpublish / reject  | no           |
| writer | create / edit / submit own drafts             | no           |

## Taxonomy

Locked tree: **Muscle Building** · **Weight Loss** · **Nutrition** → subcategory → article.

Public URLs: `/blog/{category}/{subcategory}/{slug}` (9-digit `article_number` assigned on create).

## Features

- SessionNavBar sidebar (role-aware)
- Writer desk: drafts / in review / live + views
- TipTap rich text editor
- Category → subcategory, tags, topics
- Auto slug from title + unique slug check
- SEO fields: meta title/description/keywords, primary keyword, OG/featured image, quick answer
- Workflow: draft → submit → publish | reject (plus unpublish)
- Admin activity log with search, action filter, and 24h summary
- Public API: `GET /api/v1/public/taxonomy`, `GET /api/v1/public/articles`
