# fitlives social media design brief (Instagram + Facebook)

This is the one file to send to the designer. Numbers come from the live articles and calculators on [fitlives.in](https://fitlives.in). The persona examples in section 2 are the exact outputs of the site's calculator math (`frontend/src/features/tools/lib/calcMath.ts`).

---

## 0. Goal and traffic loop

Social post, then a calculator on fitlives.in, then related articles, then a follow or return visit.

Every post ends with one clear action ("Calculate yours: link in bio") and points to one specific page.

---

## 1. Global design system (applies to every post)

### Brand

- **Wordmark:** lowercase **fitlives**.
- **Logo:** `frontend/public/brand/logofitness.png`. It's a black mark, so always place it on white or light grey. On dark photos, put it on a white rounded tile. Keep it small, in the same corner on every post (bottom-left recommended).
- **Colors:**
  - White `#FFFFFF`: background.
  - Near-black `#0A0A0A`: type and CTA buttons.
  - Orange `#FF9800`: highlights only (key numbers, underlines, arrows, stickers).
  - Neutrals `#F5F5F5` / `#E5E5E5`: cards and dividers.
  - **No blue anywhere** (including icons, links and charts).
- **Font:** Roboto Slab. Headlines in Bold/ExtraBold, body in Regular.
  - On a 1080px-wide canvas: body at least 28px, headlines at least 64px, the hero number 160px or larger.
  - Maximum of about 25 words per slide.
- **Style:** clean, editorial, data-first, lots of white space.
  - Use real Indian food photography: dal, paneer, roti, rice, eggs, chicken, curd, sprouts.
  - Show the calculator UI inside a phone frame.
- **One idea and one big number per slide.** The number is the hero, in orange.

### Formats and sizes

| Placement | Size | Notes |
| --- | --- | --- |
| IG and FB feed / carousel | 1080x1350 (4:5) | Keep headlines inside the center 1080x1080 so the profile grid crop never cuts them |
| Reels and Stories | 1080x1920 (9:16) | Keep text out of the top 250px and bottom 350px (app UI covers them) |
| Reel cover | 1080x1920 | Title must also read inside the center 1080x1350 crop |
| FB link preview | 1200x630 | Auto-generated from article OG images; design only if boosting |

- **Carousels:** 6 to 10 slides. Slide 1 is the hook, the middle slides give value, the last slide is the CTA.
- **Exports:**
  - PNG for text-heavy slides.
  - JPG at 85-90% for photo-heavy slides.
  - Everything in sRGB.
  - Reels as MP4 (H.264, 30fps), with burned-in captions, because most people watch muted.

### Reusable templates (build once, in Figma or Canva, editable text)

1. Carousel cover: hook plus big number.
2. Inner info slide.
3. Stat card: one big number plus label.
4. Myth vs fact split.
5. Food nutrition card: food photo plus kcal and protein per portion.
6. Calculator phone mockup slide.
7. CTA end slide: "Calculate yours free at fitlives.in", logo, "link in bio", and a "Save / Share" nudge.
8. Story poll and quiz template.
9. Reel cover.
10. Highlight covers: Calculators, Protein, Weight Loss, Indian Food, Muscle.
11. Shareable "My numbers" story card (see C11).

### Compliance (Meta policy and trust)

- **Disclaimer:** value slides carry a small footer: "Educational only, not medical advice." Keep it outside the Story/Reel danger zones.
- **Content rules:**
  - No before/after body photos.
  - No body shaming or "problem area" zoom-ins.
  - No "lose 10 kg in 10 days" style claims.
  - No medication or supplement cure claims.
  - Meta rejects ads that break these rules, and organic reach suffers too.
- **People:** show diverse, realistic Indian people (men and women, 20s to 40s, different body types).
- **Accessibility:**
  - Contrast at least 4.5:1. Black on white passes; never put white text on orange.
  - Every post ships with alt text (use the hook plus the key numbers).

### Links and tracking

- Add UTM tags to every link:
  - Instagram: `?utm_source=instagram&utm_medium=social&utm_campaign=<campaign>&utm_content=<post-id>`
  - Facebook: the same, with `utm_source=facebook`.
  - Campaign names: `calc_launch` (phase 1), `articles` (phase 2).
- GA4 is live on the site, so every post's clicks can be measured.
- **File naming:** `fl_<campaign>_<post-id>_<format>_s<slide>_v<version>.png`, for example `fl_calc_C01_carousel_s1_v1.png`.

---

## 2. Phase 1: calculator campaign (post first, weeks 1-2)

### Live tools

| Tool | URL |
| --- | --- |
| All calculators | https://fitlives.in/tools |
| Calorie calculator | https://fitlives.in/calorie-calculator |
| TDEE (maintenance) calculator | https://fitlives.in/tdee-calculator |
| Protein calculator | https://fitlives.in/protein-calculator |
| Macro calculator | https://fitlives.in/macro-calculator |
| BMR calculator | https://fitlives.in/bmr-calculator |
| BMI calculator | https://fitlives.in/bmi-calculator |

### How the site calculates (so posts match the tool)

- **BMR:** Mifflin-St Jeor.
- **Maintenance (TDEE):** BMR multiplied by activity:
  - Sedentary: 1.2
  - Lightly active: 1.375
  - Moderately active (3-5 training days): 1.55
  - Very active: 1.725
- **Calorie targets:**
  - Fat loss: 20% below maintenance.
  - Muscle gain: 10% above maintenance.
- **Protein:** general health 1.2 g/kg, fat loss 1.8 g/kg, muscle building 2.0 g/kg. The tool also shows a range of plus or minus 0.2 g/kg.
- **Macros:** protein from g/kg, fat at 25% of calories, and carbs take the rest.
- **BMI:** standard screening categories: under 18.5, 18.5-24.9, 25-29.9, and 30 or more.

### Example personas (use them consistently across posts)

**Priya**: 28, female, 60 kg, 160 cm, lightly active (desk job plus walks), goal fat loss.

| Output | Value |
| --- | --- |
| BMR | 1,299 kcal |
| Maintenance (TDEE) | 1,786 kcal |
| Fat-loss target (20% below) | 1,429 kcal |
| Protein (fat loss, 1.8 g/kg) | 108 g (range 96-120 g) |
| Macros at 1,429 kcal | Protein 108 g, carbs 159 g, fat 40 g |
| BMI | 23.4 (normal range on the standard screening) |

**Rahul**: 25, male, 75 kg, 175 cm, moderately active (gym 4 days a week), goal muscle.

| Output | Value |
| --- | --- |
| BMR | 1,724 kcal |
| Maintenance (TDEE) | 2,672 kcal |
| Lean-gain target (10% above) | 2,939 kcal |
| Fat-loss target (20% below) | 2,138 kcal |
| Protein (muscle, 2.0 g/kg) | 150 g (range 135-165 g) |
| Macros at 2,672 kcal | Protein 150 g, carbs 352 g, fat 74 g |
| BMI | 24.5 |

Before exporting, spot-check one persona on the live tool. If the calculator changes, these numbers must change too.

---

### C01: Launch carousel, "3 numbers every Indian should know" (pin to the top of the grid)

- **Slides:**
  1. Hook: "Stop guessing. Know these 3 numbers."
  2. **Maintenance calories:** "What your body burns in a day. Priya: 1,786 kcal."
  3. **Fat-loss calories:** "About 20% below maintenance. Priya: 1,429 kcal."
  4. **Daily protein:** "Priya: 108 g a day."
  5. Phone mockup of the calculator with a result on screen.
  6. "Takes 30 seconds. Free. No signup."
  7. CTA: "Calculate yours: link in bio."
- **Visual:** three big orange numbers on white; phone mockup.
- **Link:** https://fitlives.in/tools
- **Alt text:** "Carousel explaining maintenance calories, fat-loss calories and daily protein, with the free fitlives calculator."

### C02: Maintenance calories (TDEE) carousel

- **Hook:** "Eating 'less' but not losing? You don't know your maintenance."
- **Slides:**
  1. Hook.
  2. What maintenance means: the fuel-tank analogy ("what you burn = what keeps weight stable").
  3. Simple diagram: BMR plus daily activity equals TDEE.
  4. Activity levels, each with an Indian everyday icon:
     - Desk job: sedentary.
     - Walks plus light workouts: lightly active.
     - Gym 3-5 days: moderately active.
     - Hard training most days: very active.
  5. Priya: BMR 1,299, so maintenance 1,786 kcal.
  6. Rahul: BMR 1,724, so maintenance 2,672 kcal.
  7. CTA.
- **Link:** https://fitlives.in/tdee-calculator

### C03: Calorie calculator carousel, "Why 1,200 kcal is not your number"

- **Format:** myth vs fact.
- **Slides:**
  1. Myth: "Everyone should eat 1,200 kcal to lose weight."
  2. Fact: "Your target depends on YOUR maintenance."
  3. Priya: 1,786, so 1,429 kcal for fat loss.
  4. Rahul: 2,672, so 2,138 kcal for fat loss.
  5. "Too low means hunger, lost muscle and quitting in week 3."
  6. CTA.
- **Link:** https://fitlives.in/calorie-calculator

### C04: Protein calculator carousel, "How much protein do YOU need?"

- **Slides:**
  1. Hook.
  2. Two ranges: 0.8-1.2 g/kg if mostly sedentary, 1.6-2.2 g/kg if training.
  3. Body-weight ladder (grams per day):

     | Body weight | Sedentary (0.8-1.2 g/kg) | Training (1.6-2.2 g/kg) |
     | --- | --- | --- |
     | 50 kg | 40-60 g | 80-110 g |
     | 60 kg | 48-72 g | 96-132 g |
     | 70 kg | 56-84 g | 112-154 g |
     | 80 kg | 64-96 g | 128-176 g |

  4. "What protein looks like in Indian food" plate grid:
     - 2 eggs: about 12-13 g.
     - 100 g paneer: about 18-21 g.
     - 100 g chicken breast: about 22-31 g.
     - Plus dal and curd. Pull their numbers from the high-protein foods article.
  5. "Spread it across 3-4 meals."
  6. CTA.
- **Link:** https://fitlives.in/protein-calculator

### C05: Macro calculator carousel

- **Hook:** "Calories set the size. Macros set the quality."
- **Slides:**
  1. Hook.
  2. Protein, carbs and fat as three plate sections.
  3. How the tool splits them: protein from your weight, fat at 25%, carbs fill the rest.
  4. Rahul at 2,672 kcal: 150 g protein, 352 g carbs, 74 g fat.
  5. An Indian thali mapped to macros (dal and paneer as protein, rice or roti as carbs, ghee and oil as fat).
  6. CTA.
- **Link:** https://fitlives.in/macro-calculator

### C06: BMR single post plus story

- **Hook:** "Your body burns about 1,300-1,700 kcal a day doing NOTHING."
- **Visual:** big orange number range with a calm resting or sleeping illustration.
- **Supporting line:** "That's your BMR, the energy just to stay alive."
- **Link:** https://fitlives.in/bmr-calculator

### C07: BMI carousel, with honest framing

- **Hook:** "BMI is a starting point, not a verdict."
- **Slides:**
  1. Hook.
  2. What BMI is: weight divided by height squared, a screening number.
  3. The standard ranges the tool shows (neutral colors, no red alarm styling).
  4. Why muscular people "break" BMI.
  5. Pair it with waist size, strength and energy.
  6. CTA.
- **Optional:** a note on lower Asian cut-offs. Only include it once the writer confirms the figures and a source, because the site's tool uses the standard ranges.
- **Tone:** no shaming, no scary colors.
- **Link:** https://fitlives.in/bmi-calculator

### C08: Reel, "Calculate with me" (15-30 seconds)

- **Content:**
  - Screen-record a phone filling in the calorie calculator: age, height, weight, activity, then the result.
  - Add an on-screen text step for each field and zoom in on the result number.
  - Use trending audio and burned-in captions.
- **Cover text:** "Your calories in 20 seconds."
- **Link:** https://fitlives.in/calorie-calculator

### C09: Reel, "Maintenance vs deficit vs surplus"

- **Visual:** three plates of the same Indian meal (for example dal, rice, sabzi, roti) in different portions, labelled with example kcal totals.
- **Closing line:** "Same food. Different number. Find yours."
- **Link:** https://fitlives.in/tdee-calculator

### C10: Story set (repeat weekly)

- **Frame 1, poll:** "Do you know your maintenance calories?" Yes / No.
- **Frame 2, quiz:** "How much protein does a 60 kg person who lifts need per day?" 50 g / about 100-130 g / 250 g. Correct answer: about 100-130 g (1.6-2.2 g/kg).
- **Frame 3:** the answer, with a link sticker to the protein calculator.
- **Afterwards:** save the set to the "Calculators" highlight.

### C11: Shareable "My numbers" story card

- **Content:** a fill-in story card with three lines:
  - "My maintenance: ____ kcal"
  - "My fat-loss target: ____ kcal"
  - "My protein: ____ g"
  - fitlives logo plus "Calculated free at fitlives.in".
- **Use:** people screenshot or add their numbers and share, tagging the account.
- **Deliver as:** a story template (1080x1920) and a blank PNG.

---

## 3. Phase 2: article posts (week 3 onward, one per article)

Every article post ends with the CTA slide plus the related calculator ("Calculate yours"). Links point to the article URL plus UTM tags. The key numbers come from each article's Quick Answer.

### Weight loss

**A01. How many calories should I eat to lose weight?**
- Link: https://fitlives.in/blog/weight-loss/calorie-deficit/how-many-calories-should-i-eat-to-lose-weight/793576630
- Format: carousel.
- Hook: "Don't jump to 1,200."
- Key content: find maintenance first, then eat about 10-20% below it (often 300-500 kcal a day).
- Visual: a maintenance bar next to a shorter deficit bar.
- Tool: calorie calculator.

**A02. How to calculate your calorie deficit**
- Link: https://fitlives.in/blog/weight-loss/calorie-deficit/how-to-calculate-your-calorie-deficit/635175506
- Format: step-by-step carousel.
- Steps:
  1. Estimate TDEE.
  2. Subtract 300-500 kcal (about 10-20%).
  3. Confirm with 2-3 weeks of weight averages.
- Visual: a formula card, "Deficit = maintenance - intake".
- Tool: TDEE calculator.

**A03. How many calories should I eat to lose 10 kg?**
- Link: https://fitlives.in/blog/weight-loss/calorie-deficit/how-many-calories-should-i-eat-to-lose-10-kg/185338238
- Format: carousel.
- Hook: "10 kg is months, not weeks."
- Key content: a moderate 300-500 kcal deficit, high protein and training; about 0.5-1% of body weight per week is a sustainable pace.
- Visual: a calm month-by-month timeline, no body photos.
- Tool: calorie calculator.

**A04. How to lose belly fat**
- Link: https://fitlives.in/blog/weight-loss/fat-loss-basics/how-to-lose-belly-fat/355528441
- Format: myth-buster carousel.
- Hook: "100 crunches won't do it."
- Key content: you can't spot-reduce. Fat comes off overall through five pillars: calorie deficit, high protein, strength training, daily walking, sleep.
- Visual: five pillar icons.
- Tool: calorie calculator.

**A05. Does walking help you lose weight?**
- Link: https://fitlives.in/blog/weight-loss/walking-daily-activity/does-walking-help-you-lose-weight/727382084
- Format: Reel (a walking B-roll clip) or carousel.
- Key content: yes, when it creates a consistent deficit. 30-60 minutes of brisk walking most days is sustainable, but it won't cancel a big food surplus.
- Visual: the existing walking cover image (the article's main image).
- Tool: TDEE calculator (the activity level changes your maintenance).

**A06. Is rice good for weight loss?**
- Link: https://fitlives.in/blog/weight-loss/weight-loss-myths/is-rice-good-for-weight-loss/811984222
- Format: myth vs fact.
- Key content: rice isn't inherently fattening. Portions that fit your target matter; pair measured rice with protein and vegetables.
- Visual: a measured rice bowl beside dal and sabzi.
- Tool: calorie calculator.

**A07. Rice vs roti for weight loss**
- Link: https://fitlives.in/blog/weight-loss/weight-loss-nutrition/rice-vs-roti-for-weight-loss/785934834
- Format: split-screen comparison carousel.
- Key content: neither is fattening by default. Total calories and protein decide the result. Pick the one you can portion and enjoy.
- Visual: rice on the left and roti on the right, with an "It's a tie" reveal slide.
- Tool: macro calculator.

**A08. Is paneer good for weight loss?**
- Link: https://fitlives.in/blog/weight-loss/weight-loss-nutrition/is-paneer-good-for-weight-loss/284837231
- Format: food card carousel.
- Key content: yes, it's protein-rich and filling but calorie-dense, so keep portions measured (often 100-150 g per meal).
- Visual: paneer cubes on a plate with a portion guide.
- Tool: protein calculator.

**A09. Best Indian foods for weight loss**
- Link: https://fitlives.in/blog/weight-loss/weight-loss-nutrition/best-indian-foods-for-weight-loss/676191478
- Format: 8-slide food grid (saveable).
- Key content: dals, vegetables, eggs, low-to-moderate fat dairy, lean meat and fish, sprouts, measured roti or rice.
- Visual: one food per slide, plus a "Spice more, fry less" stamp.
- Tool: calorie calculator.

**A10. Best breakfast for weight loss**
- Link: https://fitlives.in/blog/weight-loss/diet-meal-planning/best-breakfast-for-weight-loss/222776708
- Format: "Swap this for this" carousel.
- Key content: high protein, some fiber, and within your calorie budget. Good options are eggs, chilla, hung curd bowls and dal-based dishes. Avoid sugary cereal and tea-only mornings.
- Visual: a before/after swap of *plates*, never bodies.
- Tool: protein calculator.

**A11. Best dinner for weight loss**
- Link: https://fitlives.in/blog/weight-loss/diet-meal-planning/best-dinner-for-weight-loss/537956711
- Format: plate-builder carousel.
- Key content: build the plate around protein (dal, paneer, eggs, chicken, fish), add vegetables, and plan the carb portion.
- Visual: a top-down plate diagram showing half vegetables, a quarter protein and a quarter carbs.
- Tool: macro calculator.

### Nutrition and protein

**A12. How much protein do you need per day?**
- Link: https://fitlives.in/blog/nutrition/protein/how-much-protein-do-you-need-per-day/210790133
- Format: carousel.
- Key content: 1.6-2.2 g/kg for active adults who train hard, 0.8-1.2 g/kg if sedentary; spread it across meals.
- Visual: the body-weight ladder from C04.
- Tool: protein calculator.

**A13. Best high-protein Indian foods**
- Link: https://fitlives.in/blog/nutrition/protein/best-high-protein-indian-foods/414579475
- Format: 10-slide saveable ranking.
- Key content: eggs, paneer, chicken, fish, dals, curd and hung curd, soy chunks, sprouts, milk. Combine several across the day.
- Visual: one food per slide with protein grams per portion, taken from the article.
- CTA: "Save this for your next grocery run."
- Tool: protein calculator.

**A14. 2 eggs: calories and protein**
- Link: https://fitlives.in/blog/nutrition/protein/2-eggs-calories-and-protein/730841068
- Format: single stat post.
- Key content: two large eggs have about 140-160 kcal and 12-13 g protein.
- Visual: two eggs with two giant orange numbers.
- Tool: protein calculator.

**A15. 100 g paneer: calories and protein**
- Link: https://fitlives.in/blog/nutrition/protein/100g-paneer-calories-and-protein/529252149
- Format: stat post.
- Key content: about 265-320 kcal and 18-21 g protein, depending on milk fat and brand.
- Visual: paneer on a kitchen food scale showing 100 g.
- Tool: protein calculator.

**A16. 100 g chicken breast: calories and protein**
- Link: https://fitlives.in/blog/nutrition/protein/100g-chicken-breast-calories-and-protein/229426015
- Format: stat post or 3-slide carousel.
- Key content: about 110-165 kcal and 22-31 g protein. Raw vs cooked weight explains the range.
- Visual: a "Raw vs cooked" split with a food scale.
- Tool: protein calculator.

**A17. How much water should you drink?**
- Link: https://fitlives.in/blog/nutrition/hydration/how-much-water-should-you-drink/225187540
- Format: carousel.
- Key content: about 30-40 ml per kg as a starting range, adjusted for heat and training. Use thirst, urine colour and energy as checks.
- Visual:
  - Bottle icons by body weight: 50 kg is 1.5-2.0 L; 60 kg is 1.8-2.4 L; 70 kg is 2.1-2.8 L; 80 kg is 2.4-3.2 L.
  - A neutral urine-colour chart (no blue: use pale yellow to amber).
- Myth slide: "Extra water doesn't melt fat."
- Tool: none; the link goes to the article.

**A18. Protein before or after workout?**
- Link: https://fitlives.in/blog/nutrition/sports-nutrition/protein-before-or-after-workout/887645991
- Format: myth vs fact.
- Key content: both work. Total daily protein matters more than the exact minute; a protein meal within a few hours before or after training is enough.
- Visual: a clock graphic with a wide "good window".
- Tool: protein calculator.

### Muscle building

**A19. How much protein to build muscle?**
- Link: https://fitlives.in/blog/muscle-building/muscle-building-nutrition/how-much-protein-to-build-muscle/418755868
- Format: carousel.
- Key content: about 1.6-2.2 g/kg a day, plus progressive strength training and enough calories.
- Visual: Rahul's example, 150 g a day (range 135-165 g), and what that looks like across 4 Indian meals.
- Tool: protein calculator.

**A20. How long does it take to build muscle?**
- Link: https://fitlives.in/blog/muscle-building/muscle-growth-hypertrophy/how-long-does-it-take-to-build-muscle/739011960
- Format: timeline carousel.
- Key content: beginners see strength and some size in 8-12 weeks; a meaningful physique change takes months to years, and progress slows with experience.
- Visual: a milestone roadmap (week 4, week 12, month 6, year 1). No before/after photos.
- Tool: macro calculator.

**A21. Beginner gym diet plan**
- Link: https://fitlives.in/blog/muscle-building/beginner-muscle-building/beginner-gym-diet-plan/912245706
- Format: saveable "1 day of eating" carousel.
- Key content: a protein target of about 1.6 g/kg or more, enough calories to train, mostly whole foods, 3-4 solid meals, and "12 weeks of consistency beats perfect macros."
- Visual: a sample Indian day, meal by meal, with the protein in each.
- Tool: macro and protein calculators.

### Per-article asset kit (for each of the 21)

- 1 feed carousel or post (1080x1350).
- 1 story version (1080x1920) with space for a link sticker.
- 1 Reel cover, if the post is made as a Reel.
- Alt text and a caption hook (the caption's first line repeats the slide 1 hook).

---

## 4. Posting calendar (suggested)

| Week | Feed posts | Stories |
| --- | --- | --- |
| 1 | C01 launch (pin), C02 maintenance, C08 Reel, C04 protein | C10 set daily; C11 card after each post |
| 2 | C03 calorie myth, C05 macros, C09 Reel, C06 BMR, C07 BMI (pin C04) | C10 set; reshare the best-performing post |
| 3+ | 4-5 article posts a week, rotating weight loss, nutrition and muscle; at least 1 Reel a week | A link-sticker story for every feed post |

- Every 2 weeks, repeat one calculator post with a fresh persona (for example a 45-year-old, or a vegetarian).
- **Pinned on IG:** C01, C04, plus the best-performing article.
- **Facebook:** use the same assets, and put the clickable link directly in the post text. On IG, use "link in bio" plus the story link sticker.
- **Suggested article order** (strongest search demand first): A01, A12, A14, A07, A04, A13, A02, A05, A15, A16, then the rest.

---

## 5. Captions and hashtags (for whoever writes captions)

- **Structure:**
  1. Hook line (the same as slide 1).
  2. 2-3 value lines.
  3. "Calculate yours free: link in bio."
  4. "Educational only, not medical advice."
- **Hashtags:** use 5-8 per post and rotate:
  #fitlives #caloriedeficit #indianfood #highprotein #weightlossindia #proteinintake #fitnessindia #gymdiet #healthyindianfood #macros #indiandiet #fatloss

---

## 6. Designer handoff checklist

- [ ] Brand kit: logo (PNG, plus a white-tile version for dark backgrounds), hex codes, Roboto Slab font files.
- [ ] 11 master templates (section 1) in Figma or Canva, with editable text.
- [ ] 11 calculator assets (C01-C11).
- [ ] 21 article kits (A01-A21).
- [ ] 5 highlight covers, plus a profile picture (the logo mark on white, readable at 110px).
- [ ] Phone mockup frame with mobile screenshots of each calculator from fitlives.in.
- [ ] Numbers checked against section 2 and the live articles before export.
- [ ] One tracking sheet: post ID, link with UTM tags, caption, alt text, publish date.
- [ ] Exports: feed PNG/JPG at 1080x1350, story 1080x1920, Reels MP4 with captions.
- [ ] Final QA on every asset:
  - Safe zones clear.
  - Contrast at least 4.5:1.
  - Disclaimer present.
  - No before/after body photos.
  - No blue.
  - Logo in the same corner.
