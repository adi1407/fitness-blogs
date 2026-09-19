# OpenPanel analytics for FitKnowledge

OpenPanel ([AGPL-3.0](https://github.com/Openpanel-dev/openpanel)) is the product-analytics stack for FitKnowledge. It stays a **separate service** so AGPL does not apply to the FitKnowledge monorepo.

Pinned commit: `3060ca10213693cf0385be2713c8743d16733a2b`  
Local clone: [`openpanel/`](../openpanel/) (gitignored from product secrets; optional sibling).

## What OpenPanel gives us

- Event stream, funnels, profiles, traffic dashboards
- Web SDK for the public site and CMS
- Self-hosted Postgres + ClickHouse + Redis (see upstream README)

## What stays in FitKnowledge

| Data | Owner | Used by |
|------|--------|---------|
| `audit_events` | Express API | Admin Activity log + CMS analytics tiles |
| Article `views` | Express API | Writer desk / editor |
| Marketing page views, CTA clicks, calculator completes | OpenPanel | Admin OpenPanel dashboard + funnels |

## Self-host (local)

Prerequisites: Docker, Docker Compose, Node, pnpm.

```bash
cd openpanel
# if not checked out yet:
# git checkout --detach 3060ca10213693cf0385be2713c8743d16733a2b
pnpm install
cp .env.example .env
# Follow upstream: API_URL for apps/start, dock:up, migrate, codegen, dev
pnpm dock:up
pnpm codegen
pnpm migrate:deploy
pnpm dev
```

Typical URLs (upstream defaults):

- Dashboard: `https://localhost:3000` or `http://localhost:3000`
- API: `http://localhost:3333`

Create a project + client ID in OpenPanel UI, then set env below.

## FitKnowledge env

### Frontend (`frontend/.env.local`)

```bash
NEXT_PUBLIC_OPENPANEL_CLIENT_ID=
NEXT_PUBLIC_OPENPANEL_API_URL=http://localhost:3333
NEXT_PUBLIC_OPENPANEL_DASHBOARD_URL=http://localhost:3000
```

### CMS (`cms/.env`)

```bash
VITE_OPENPANEL_CLIENT_ID=
VITE_OPENPANEL_API_URL=http://localhost:3333
VITE_OPENPANEL_DASHBOARD_URL=http://localhost:3000
```

When client ID is empty, tracking is a no-op (safe for local/dev).

## Event taxonomy (FitKnowledge)

| Event | Where | Properties |
|-------|--------|------------|
| `page_view` | Frontend (auto) | `path`, `title` |
| `article_open` | Article page | `slug`, `category`, `subcategory` |
| `calc_open` | Calculator tool page | `tool` (tdee-calculator, protein-calculator, …) |
| `calc_complete` | Educational ack → show results | `tool` |
| `hub_click` | Pillar hub primary CTAs | `href`, `label` |
| `cms_login` | CMS login | `role` |
| `cms_article_submit` | CMS editor | `articleId` |
| `cms_article_publish` | CMS editor | `articleId` |
| `cms_article_reject` | CMS editor | `articleId` |

Suggested funnel: `page_view` → `article_open` / `hub_click` → `calc_open` → `calc_complete`.

## CMS entry points

| Role | Route / UI |
|------|------------|
| admin | `/admin/analytics` — OpenPanel deep link + audit summary |
| editor | Dashboard analytics cards (queue + publish rates) |
| writer | Dashboard live views + OpenPanel link when configured |

## License note

Do **not** copy OpenPanel source into `cms/` or `frontend/`. Link or iframe the OpenPanel dashboard; instrument with the public SDK / HTTP track API only.
