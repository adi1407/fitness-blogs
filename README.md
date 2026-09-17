# Fitness Monorepo

Three apps, one shared backend.

| Folder | Role | Stack |
|--------|------|--------|
| `frontend/` | Public site | Next.js (App Router), React 19, Tailwind — SEO + responsive first |
| `backend/` | Shared API | Node.js, Express, PostgreSQL (Docker local / Render prod) |
| `cms/` | Admin dashboard | React 19, Vite |

```
┌────────────┐     ┌─────────────────┐     ┌────────────┐
│  frontend  │────▶│     backend     │◀────│    cms     │
│  Next.js   │     │ Express + PG    │     │  React 19  │
└────────────┘     └────────┬────────┘     └────────────┘
                            │
                     PostgreSQL (Render)
```

## Local development

1. **Database + API**
   ```bash
   cd backend
   cp .env.example .env
   npm install
   npm run db:up
   npm run dev
   ```

2. **Public site**
   ```bash
   cd frontend
   cp .env.example .env.local
   npm install
   npm run dev
   ```

3. **CMS**
   ```bash
   cd cms
   cp .env.example .env
   npm install
   npm run dev
   ```

## Design principles (initiated, not built out)

- **One API** for site + CMS (`/api/v1`)
- **Feature folders** with colocated `components`, `hooks`, `api`, `types`
- **Shared components** for cross-feature UI
- **SEO foundations** on the Next.js site (metadata, robots, sitemap, manifest, JSON-LD helper)
- **Responsive-first** layout primitives from day one

Scaffold only — product features intentionally not implemented yet.
