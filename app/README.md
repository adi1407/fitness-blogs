# fitlives mobile app

Expo (SDK 57) + Expo Router + TypeScript app with full parity with [fitlives.in](https://fitlives.in), backed by the same live API on Render.

## What's inside

| Area | Screens |
| --- | --- |
| Home | Hero search, featured carousel, calculators rail, pillar tiles, exercise of the day, protein picks, recipes, latest articles |
| Learn | Pillar hubs (`/hub/[category]`, subcategories), all articles with search and category chips, programs and buyer's guides |
| Reader | `/article/[number]` — parallax hero, quick answer, table of contents, FAQ, sources, related; upvote, bookmark and share |
| Tools | All 11 calculators (calorie, deficit, TDEE, BMR, macro, protein, BMI, body fat, water, 1RM, steps) with animated results; save results when signed in |
| Library | Indian food database (diet filters, sorting, compare), exercise library (7 muscle groups, 50 lifts), high-protein recipes (servings scaler) |
| Search | Global search across articles, foods, exercises, recipes, tools and guides with recent searches |
| Account | Google sign-in, bookmarks, upvotes, saved calculator results, body-profile sync, settings, About and trust pages |

Links to fitlives.in inside articles (articles, foods, exercises, recipes, programs, reviews, About) open the native screen; everything else opens in the in-app browser.

## Run it

```bash
cd app
npm install
npx expo start
```

Scan the QR code with **Expo Go** (Android) or the Camera app (iOS), or press `a` for an Android emulator. Expo Go must be the version that supports SDK 57 — update it from the store if you see errors like `Cannot find native module 'ExpoAsset'`.

The first request can take ~15 s while the Render API wakes up; screens show skeletons and retry once. Content is cached offline for 7 days (member data is never persisted).

## Configuration

Copy `.env.example` to `.env` to override defaults:

| Variable | Default |
| --- | --- |
| `EXPO_PUBLIC_API_URL` | `https://fitness-blogs-xkec.onrender.com/api/v1` |
| `EXPO_PUBLIC_SITE_URL` | `https://fitlives.in` |

`EXPO_PUBLIC_*` values are inlined into the JS bundle — never put secrets in this app.

### Google sign-in

The app opens `GET /public/auth/google?app_redirect=<deep link>` in an auth session; the backend sends the member token back to that link. Allowed links are configured on the backend:

| Backend env | Purpose |
| --- | --- |
| `MOBILE_AUTH_REDIRECTS` | Comma-separated allowlist, default `fitlives://auth` (production/dev builds) |
| `ALLOW_EXPO_GO_AUTH` | `true` to also allow `exp://…/--/auth` while testing in Expo Go. Keep `false` in production |

The token is stored in `expo-secure-store` and validated with `/public/auth/me`.

## Structure

```
src/
  app/                    Expo Router routes
    (tabs)/               Home, Learn, Tools, Library, Account (floating tab bar)
    article/[number]      Reader
    hub/[category]/…      Pillar hubs and subcategories
    calculator/[tool]     11 calculators
    foods, food/[slug], compare
    exercises/…, exercise/[group]/[slug]
    recipes, recipe/[slug]
    guides/[section]/…    Programs and buyer's guides
    search, about, settings, auth (deep-link landing)
  api/                    fetch client (20 s timeout, bearer auth) + endpoint modules
  calculators/            calculator screens + shared result UI
  components/             design system (PressableScale, GradientHero, RingChart, CountUp, …)
  hooks/                  usePersistentState (AsyncStorage)
  lib/                    calc math, auth, engagement, search, link routing, React Query client
  theme/                  brand colours, gradients, shadows, motion, Roboto Slab
```

`src/lib/calc.ts` and `src/lib/calcMore.ts` are copied from `frontend/src/features/tools/lib/` — keep them in sync when formulas change.

## Checks

```bash
npx expo start          # once, to generate typed routes (.expo/types/router.d.ts)
npx tsc --noEmit
npx expo lint
npx expo export --platform android
npx expo-doctor
```

On some Windows machines the Hermes compiler can't be spawned locally (`spawn UNKNOWN`); add `--no-bytecode` to validate the bundle. EAS builds are unaffected. `expo export` can leave stale typed routes behind — re-run `npx expo start` before `tsc` if route types look wrong.

## Accessibility

- Dynamic Type is honoured with per-variant caps so headings don't break layouts.
- Headers, tabs, buttons, links and checkboxes expose accessibility roles and states; result cards read as one summary.
- Count-up and entrance animations respect the system Reduce Motion setting.
- Layouts adapt below 360 pt width (compact heroes and result numbers).

## Builds (EAS)

Bundle id / package: `in.fitlives.app`, deep-link scheme `fitlives`.

```bash
npm install -g eas-cli
eas login
eas build:configure                     # first time: links the project
eas build --profile development         # dev client (expo-dev-client), iOS simulator
eas build --profile preview -p android  # installable APK for testers
eas build --profile production          # store builds (auto-incremented versions)
eas submit --profile production
```
