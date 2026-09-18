# Fitness Backend (shared API)

Express + TypeScript API shared by the **frontend** (Next.js) and **cms** (React 19).

## Stack

- Node.js + Express
- PostgreSQL (Docker locally, Render in production)
- Zod for env validation
- Helmet + CORS + Morgan

## Quick start

```bash
cp .env.example .env
npm install
npm run db:up
npm run dev
```

- Health: `GET http://localhost:4000/health`
- API root: `GET http://localhost:4000/api/v1`
- Public articles: `GET http://localhost:4000/api/v1/public/articles`
- Auth (CMS): `POST /api/v1/auth/login`

Schema + seed staff users run on boot (`ensureCmsSchema`). See `cms/README.md` for roles and passwords.

## Production notes

- Point `DATABASE_URL` at your Render Postgres instance
- Deploy this service on Render (Docker or native Node)
- Keep CORS origins limited to the deployed frontend + CMS URLs
