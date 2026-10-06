# fitlives mobile app

Expo (SDK 57) + Expo Router + TypeScript app for fitlives — articles, the Indian food database and calculators, backed by the same public API as [fitlives.in](https://fitlives.in).

## Run it

```bash
cd app
npm install
npx expo start
```

Scan the QR code with **Expo Go** (Android) or the Camera app (iOS). Press `a` for an Android emulator.

The first request can take ~15 s while the Render API wakes up; the app shows a loading state and retries once.

## Configuration

Copy `.env.example` to `.env` to override defaults:

| Variable | Default |
| --- | --- |
| `EXPO_PUBLIC_API_URL` | `https://fitness-blogs-xkec.onrender.com/api/v1` |
| `EXPO_PUBLIC_SITE_URL` | `https://fitlives.in` |

`EXPO_PUBLIC_*` values are inlined into the JS bundle — never put secrets in this app.

## Structure

```
src/
  app/                  Expo Router routes
    (tabs)/             Home, Articles, Foods, Calculators
    article/[number]    Article (CMS HTML rendered in a WebView)
    food/[slug]         Food detail with serving picker
    calculator/[tool]   protein | calorie | bmi
  api/                  fetch client (20 s timeout) + articles/foods endpoints
  calculators/          calculator forms
  components/           shared UI (Text, Card, Chip, StatBox, states…)
  hooks/                usePersistentState (AsyncStorage)
  lib/                  calc math, nutrition helpers, link routing, React Query client
  theme/                brand colours, spacing, Roboto Slab
```

`src/lib/calc.ts` is copied from `frontend/src/features/tools/lib/calcMath.ts` — keep them in sync when formulas change.

## Checks

```bash
npx tsc --noEmit
npx expo lint
npx expo export --platform android
```

On some Windows machines the Hermes compiler can't be spawned locally (`spawn UNKNOWN`); add `--no-bytecode` to validate the bundle. EAS builds are unaffected.

## Builds

Bundle id / package: `in.fitlives.app`. Production builds will use [EAS Build](https://docs.expo.dev/build/introduction/) (`npx eas-cli build`), not set up yet.
