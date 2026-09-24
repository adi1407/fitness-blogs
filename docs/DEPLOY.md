# Deploy FitKnowledge (Render API + Vercel site/CMS)

Target layout:

| App | Host | Root dir |
|-----|------|----------|
| Postgres + Express API | **Render** | `backend/` |
| Public site | **Vercel** (existing) | `frontend/` |
| CMS | **Vercel** (new project) | `cms/` |

Health check after API is up: `GET https://YOUR-API.onrender.com/health`

---

## A. Push this repo

Deploy configs live in git:

- `render.yaml` — Render Blueprint (Postgres + API)
- `cms/vercel.json` — SPA rewrites for CMS
- `frontend/.env.example` / `cms/.env.example` — env templates

Commit and push `main` (or your deploy branch) to GitHub before applying the Blueprint.

---

## B. Render — Blueprint (Postgres + API)

1. Open [Render Dashboard](https://dashboard.render.com) → **New** → **Blueprint**.
2. Connect the GitHub repo `adi1407/fitness-blogs`.
3. Select branch `main`, confirm it picks up `render.yaml`.
4. When prompted for **`CORS_ORIGINS`**, enter temporary values (update later):

   ```text
   https://YOUR-FRONTEND.vercel.app,https://YOUR-CMS.vercel.app
   ```

   If you do not know the CMS URL yet, put the frontend URL only, then edit the env after CMS deploys.

5. Apply Blueprint. Wait until:
   - `fitness-db` is available
   - `fitness-api` build succeeds and health is green

6. Copy the API public URL, e.g. `https://fitness-api-xxxx.onrender.com`.

### API env vars (already wired by Blueprint)

| Key | Notes |
|-----|--------|
| `DATABASE_URL` | From `fitness-db` |
| `JWT_SECRET` | Auto-generated — keep secret |
| `NODE_ENV` | `production` |
| `CORS_ORIGINS` | Must include live frontend + CMS origins (no trailing slash) |

### First CMS logins (seeded on boot)

Change these immediately after first login:

| Role | Email | Password |
|------|-------|----------|
| Admin | `admin@fitknowledge.local` | `ChangeMeAdmin123!` |
| Editor | `editor@fitknowledge.local` | `ChangeMeEditor123!` |
| Writer | `writer@fitknowledge.local` | `ChangeMeWriter123!` |

Schema + taxonomy seed run automatically via `ensureCmsSchema()` on startup.

### Free tier note

Free web services **sleep**. First hit after idle can take ~30–60s. Prefer a paid always-on plan for production CMS use.

---

## C. Vercel — Frontend (existing project)

1. Project → **Settings** → **Environment Variables** (Production):

   ```text
   NEXT_PUBLIC_API_URL=https://YOUR-API.onrender.com/api/v1
   NEXT_PUBLIC_SITE_URL=https://YOUR-FRONTEND.vercel.app
   ```

2. Confirm **Root Directory** = `frontend`.
3. **Deployments** → Redeploy (required — `NEXT_PUBLIC_*` is build-time).

### Google OAuth consent screen (required for public sign-in)

After the frontend is live, in Google Cloud Console → **OAuth consent screen**, set:

- Privacy policy: `https://YOUR-FRONTEND.vercel.app/privacy`
- Terms of service: `https://YOUR-FRONTEND.vercel.app/terms`

Production example: `https://fitness-blogs-liard.vercel.app/privacy` and `/terms`.

These pages are educational-site policy templates, not a licensed legal opinion.

---

## D. Vercel — CMS (new project)

1. **Add New Project** → same GitHub repo.
2. Configure:

   | Setting | Value |
   |---------|--------|
   | Root Directory | `cms` |
   | Framework | Vite (auto) |
   | Build Command | `npm run build` |
   | Output Directory | `dist` |

   `cms/vercel.json` already sets SPA fallback rewrites.

3. Environment Variables (Production):

   ```text
   VITE_API_URL=https://YOUR-API.onrender.com/api/v1
   VITE_PUBLIC_SITE_URL=https://YOUR-FRONTEND.vercel.app
   ```

4. Deploy. Copy the CMS URL (e.g. `https://fitknowledge-cms.vercel.app`).

---

## E. Final CORS wire-up

1. Render → `fitness-api` → **Environment** → set:

   ```text
   CORS_ORIGINS=https://YOUR-FRONTEND.vercel.app,https://YOUR-CMS.vercel.app
   ```

2. Save → service restarts.
3. Smoke test:
   - Open CMS → login as admin
   - Create / publish an article
   - Confirm it appears on the live frontend blog routes

---

## F. Custom domains (optional)

| App | Example |
|-----|---------|
| Frontend | `www.fitknowledge.com` |
| CMS | `cms.fitknowledge.com` |
| API | `api.fitknowledge.com` (Render custom domain) |

After custom domains: update `CORS_ORIGINS`, `NEXT_PUBLIC_SITE_URL`, `VITE_PUBLIC_SITE_URL`, and redeploy frontends.

Google Analytics 4 + Search Console: see [`docs/GOOGLE_SEO_SETUP.md`](./GOOGLE_SEO_SETUP.md).

---

## Manual Render (if Blueprint is unavailable)

**Postgres:** New → PostgreSQL → copy Internal Database URL.

**Web Service:**

| Field | Value |
|-------|--------|
| Root Directory | `backend` |
| Build | `npm ci && npm run build` |
| Start | `npm start` |
| Health | `/health` |

Env: same as Blueprint table above. SSL is already enabled in `backend/src/db/pool.ts` when `NODE_ENV=production`.

---

## Local CLI (optional)

```bash
# Frontend / CMS — requires `vercel login` once
cd frontend && npx vercel --prod
cd cms && npx vercel --prod
```

Render has no reliable non-interactive free CLI path here; use the dashboard Blueprint.
