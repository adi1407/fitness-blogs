# Fitness Frontend

Next.js (App Router) public site — SEO-first, responsive across mobile / tablet / laptop / monitor.

## Architecture

```
src/
  app/                 # Routes + metadata (SEO surface)
  components/
    shared/            # Cross-feature UI
    seo/               # Structured data helpers
  features/
    <feature>/
      components/
      hooks/
      api/
      types/
  lib/api/             # Shared backend client
  hooks/
  types/
```

## SEO foundations (initiated)

- `metadata` + `viewport` in root layout
- `robots.ts`, `sitemap.ts`, `manifest.ts`
- `JsonLd` helper for structured data
- Mobile-first fluid layout primitives

## Quick start

```bash
cp .env.example .env.local
npm install
npm run dev
```

Talks to the shared backend at `NEXT_PUBLIC_API_URL`.
