# fitlives app — store listing kit

Copy for Google Play and the App Store, the screenshot plan, and the privacy answers. Character counts are checked against each store's limit; recount if you edit.

Content numbers (live API, Oct 2026): 29 articles, 50 Indian foods, 50 exercises across 7 muscle groups, 8 recipes, 11 calculators. Update the descriptions when these grow; never round up.

---

## Fix before submitting

These will get the app rejected (or pulled) as it stands today.

1. **In-app account deletion (both stores).** Apple guideline 5.1.1(v) and Google Play's account-deletion policy require anyone who can create an account to be able to start deleting it inside the app, and Play also needs a public web URL for deletion requests. Today the app only offers "email a deletion request", and the backend has no delete-account endpoint. Needed: `DELETE /public/me` (deletes the member, bookmarks, upvotes, calculator profile and results), a "Delete account" button in Account with a confirmation, and a `fitlives.in/delete-account` page.
2. **Sign in with Apple (iOS).** Guideline 4.8: an app that offers Google sign-in must also offer an equivalent login that limits data to name and email and lets people hide their email — in practice Sign in with Apple. The app works fully without an account, but sign-in is still a primary account option, so expect this to be raised in review.
3. **Store-only assets.** Play needs a 1024 × 500 feature graphic; both stores need the screenshots below.

---

## Google Play

| Field | Limit | Text |
| --- | --- | --- |
| App name | 30 | fitlives: Indian Fitness Guide |
| Short description | 80 | Calorie & protein calculators, Indian food values and evidence-based guides |

**Full description** (limit 4,000)

```
Know what to eat and how to train — with numbers that fit Indian food.

fitlives turns fitness and nutrition questions into clear answers you can act on. Work out your calories and protein, look up what's really in dal, paneer and roti, and read guides that explain the why, not just the what.

CALCULATORS THAT EXPLAIN THEMSELVES
11 free calculators: calorie, calorie deficit, TDEE, BMR, macros, protein, BMI (with Asian-Indian cut-offs), body fat, water intake, one-rep max and steps to calories. Enter your details once and every calculator uses them. Each result tells you what to do next — the next calculator, a guide or the food database.

INDIAN FOOD DATABASE
50 everyday Indian foods with calories, protein, carbs and fat from India's national food composition tables (IFCT 2017). Filter by vegetarian, eggetarian or non-veg, sort by protein per calorie, change the serving size, and compare foods side by side.

EXERCISE LIBRARY
50 exercises across 7 muscle groups, each with form cues, common mistakes and programming notes you can use on a busy gym floor.

GUIDES WRITTEN TO ANSWER THE QUESTION
Articles on weight loss, muscle building and nutrition — quick answer first, then the detail, with sources listed. Plus training programs, buyer's guides and high-protein recipes with macros per serving.

SAVE WHAT MATTERS (OPTIONAL)
Sign in to bookmark articles, upvote what helped, save calculator results and keep your body profile in sync with fitlives.in. Everything else works without an account.

BUILT FOR INDIA
Indian portions, Indian foods and Indian BMI cut-offs — not copy-pasted Western defaults.

Educational information only — not medical advice. Talk to a doctor or registered dietitian before major changes to your diet or training, especially if you have a health condition, are pregnant or take medication.
```

| Setting | Value |
| --- | --- |
| Category | Health & Fitness |
| Tags | Fitness, Nutrition, Diet, Calorie counter, Weight loss |
| Contact email | aditiya236choudhary@gmail.com |
| Website | https://fitlives.in |
| Privacy policy | https://fitlives.in/privacy |
| Content rating | Complete the IARC questionnaire: no violence, no user-to-user content, no purchases → expected "Everyone" / "3+" |
| Ads | No |
| Health apps declaration | Fitness and nutrition information; not a medical device; no diagnosis or treatment |

---

## App Store

| Field | Limit | Text |
| --- | --- | --- |
| Name | 30 | fitlives: Fitness & Nutrition |
| Subtitle | 30 | Indian food & calorie tools |
| Keywords | 100 | protein,tdee,bmi,macro,diet plan,weight loss,gym,workout,paneer,dal,deficit,bmr,recipes,muscle |
| Promotional text | 170 | 11 free calculators, 50 Indian foods with real nutrition data, and guides that answer the question first. Every result shows you the next step. |

Keywords skip words already in the name and subtitle (Apple indexes those anyway) and contain no spaces after commas.

**Description** (limit 4,000): use the Google Play full description above unchanged. It has no Play-specific wording.

| Setting | Value |
| --- | --- |
| Primary category | Health & Fitness |
| Secondary category | Food & Drink |
| Age rating | 4+ (no objectionable content) |
| Support URL | https://fitlives.in/contact |
| Marketing URL | https://fitlives.in |
| Privacy policy URL | https://fitlives.in/privacy |
| Devices | iPhone only (`supportsTablet: false`) |
| Encryption | Standard HTTPS only — already declared in `app.json` |
| Review notes | "Sign-in is optional; every screen except Account works without it. To test sign-in, use any Google account." |

---

## Screenshots

**Sizes**

- App Store: 6.9" iPhone, 1320 × 2868 portrait (the store scales it down for smaller iPhones). Minimum 3, up to 10.
- Google Play: phone, 1080 × 1920 or larger at 9:16. Minimum 2, up to 8. Plus the 1024 × 500 feature graphic.

**Style** (matches the brand): white background, a near-black caption of 1–2 short lines in Roboto Slab above the device, one orange (#FF9800) word or underline per caption, no device frames needed. Use real content, signed in as a test account with a filled-in body profile.

| # | Screen | Caption | What to show |
| --- | --- | --- | --- |
| 1 | Calorie calculator result | Your calories, worked out | Daily target filled in, ring chart, and the "Your next step" list below |
| 2 | Indian food database | Real nutrition for Indian food | Foods list with the "High protein" filter on, sorted by protein per calorie |
| 3 | Food page (paneer) | Every serving, every macro | Quick answer + serving calculator set to "1 cup" |
| 4 | Article reader | The answer first, then the detail | Quick answer box and table of contents of a weight-loss guide |
| 5 | Tools tab | 11 free calculators | Calculator grid grouped by section |
| 6 | Exercise page | Form cues for every lift | Squat or deadlift page, cues and common mistakes visible |
| 7 | Compare foods | Compare before you choose | Two or three foods side by side |
| 8 | Account (signed in) | Save guides and results | Saved tab with a few bookmarks |

**Feature graphic (Play, 1024 × 500):** white background, fitlives mark on the left, "Fitness answers for Indian food" in near-black Roboto Slab, a thin orange underline. Leave the outer 15% clear of text (Play may crop it).

**Capturing:** run a dev build on a 6.9" iPhone simulator (Cmd+S saves full-resolution screenshots) and a Pixel 8 Pro emulator; add captions in Figma at the sizes above.

---

## Privacy answers

What the app actually sends (checked against `app/src/api`). The app has no analytics, ads or tracking SDKs, and everything goes over HTTPS.

| Data | When | Purpose | Linked to the user |
| --- | --- | --- | --- |
| Name, email, profile photo | Google sign-in | Account | Yes |
| Bookmarks, upvotes | Signed in, when tapped | App functionality | Yes |
| Height, weight, age, sex, activity level | Signed in (synced on sign-in and from Account) | Calculator profile sync | Yes |
| Saved calculator results | Signed in, "Save this result" | App functionality | Yes |
| Email address | Newsletter signup (no account needed) | Product updates by email | No account link |

**App Store privacy label:** Contact Info (Name, Email Address), User Content (Photos — profile photo only; Other User Content — bookmarks), Health & Fitness (Fitness — height, weight, activity), Usage Data: none. "Used to track you": No.

**Play Data safety:** collects Personal info (Name, Email address), Health and fitness (Fitness info), App activity (Other actions — bookmarks, upvotes). Not shared with third parties. Encrypted in transit: Yes. Users can request deletion: Yes — once blocker 1 is done, give the in-app path and `https://fitlives.in/delete-account`.

Body stats entered without signing in stay on the device only and are not collected.
