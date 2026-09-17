# Fitness CMS

React 19 + Vite dashboard for content/admin. Shares the same Express API as the public site.

## Architecture

```
src/
  layouts/             # Shell / chrome
  components/shared/   # Cross-feature UI
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

## Quick start

```bash
cp .env.example .env
npm install
npm run dev
```

Default Vite port: `http://localhost:5173`
API: `VITE_API_URL`
