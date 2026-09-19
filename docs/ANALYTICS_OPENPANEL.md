# OpenPanel analytics for FitKnowledge

OpenPanel ([AGPL-3.0](https://github.com/Openpanel-dev/openpanel)) is the product-analytics stack for FitKnowledge. It stays a **separate service** so AGPL does not apply to the FitKnowledge monorepo.

Pinned commit (optional local clone): `3060ca10213693cf0385be2713c8743d16733a2b`  
Local clone: [`openpanel/`](../openpanel/) (gitignored; optional sibling for self-host experiments).

## What OpenPanel gives us

- Event stream, funnels, profiles, traffic dashboards
- Browser track API for the public site and CMS
- Cloud hosted at [dashboard.openpanel.dev](https://dashboard.openpanel.dev) (production default)

## What stays in FitKnowledge

| Data | Owner | Used by |
|------|--------|---------|
| `audit_events` | Express API | Admin Activity log + CMS analytics tiles |
| Article `views` | Express API | Writer desk / editor |
| Marketing page views, CTA clicks, calculator completes | OpenPanel | Admin OpenPanel dashboard + funnels |

## Production (Vercel) — OpenPanel Cloud

**Default for live site + CMS.** Do not point Production at `localhost`.

1. Sign up / sign in at [dashboard.openpanel.dev](https://dashboard.openpanel.dev).
2. Create a project → **Settings → Clients** → copy the **Client ID** (UUID; safe for browsers).
3. Set Vercel **Production** env (then redeploy — `NEXT_PUBLIC_*` / `VITE_*` are build-time):

### Frontend (Next.js on Vercel)

```bash
NEXT_PUBLIC_OPENPANEL_CLIENT_ID=<uuid-from-openpanel>
NEXT_PUBLIC_OPENPANEL_API_URL=https://api.openpanel.dev
NEXT_PUBLIC_OPENPANEL_DASHBOARD_URL=https://dashboard.openpanel.dev
```

### CMS (Vite on Vercel)

```bash
VITE_OPENPANEL_CLIENT_ID=<uuid-from-openpanel>
VITE_OPENPANEL_API_URL=https://api.openpanel.dev
VITE_OPENPANEL_DASHBOARD_URL=https://dashboard.openpanel.dev
```

Use the **same Client ID** for site + CMS if both should feed one OpenPanel project.

When Client ID is empty, tracking is a no-op. Dashboard URL alone enables the CMS “Open OpenPanel” deep link.

## Self-host (local, optional)

Prerequisites: Docker, Docker Compose, Node, pnpm.

```bash
cd openpanel
# git checkout --detach 3060ca10213693cf0385be2713c8743d16733a2b
pnpm install
cp .env.example .env
pnpm dock:up
pnpm codegen
pnpm migrate:deploy
pnpm dev
```

Typical self-host URLs:

- Dashboard: `http://localhost:3000`
- API: `http://localhost:3333`

Then set local env to those URLs instead of the cloud hosts above.

## Local env files

### Frontend (`frontend/.env.local`) — cloud defaults

```bash
NEXT_PUBLIC_OPENPANEL_CLIENT_ID=
NEXT_PUBLIC_OPENPANEL_API_URL=https://api.openpanel.dev
NEXT_PUBLIC_OPENPANEL_DASHBOARD_URL=https://dashboard.openpanel.dev
```

### CMS (`cms/.env`) — cloud defaults

```bash
VITE_OPENPANEL_CLIENT_ID=
VITE_OPENPANEL_API_URL=https://api.openpanel.dev
VITE_OPENPANEL_DASHBOARD_URL=https://dashboard.openpanel.dev
```

## Event taxonomy (FitKnowledge)

| Event | Where | Properties |
|-------|--------|------------|
| `page_view` | Frontend (auto) | `path`, `title` |
| `article_open` | Article page | `slug`, `category`, `subcategory` |
| `share_click` | Article share buttons | `channel` (`x` / `facebook` / `linkedin` / `copy`), `url` |
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
