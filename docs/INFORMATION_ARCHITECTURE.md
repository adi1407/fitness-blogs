# Information Architecture & URL Map

Clean, hierarchical URLs. No `?id=` blogs. Prefer no date in path unless editorial model requires it.

## Public routes (target)

```
/
/learn                              → Learning hub (or redirect to pillars)
/nutrition
/nutrition/[topic]                  e.g. protein, calories
/nutrition/[topic]/[slug]          e.g. how-much-protein-do-i-need

/weight-loss
/weight-loss/[slug]

/muscle-building
/muscle-building/[slug]

/training
/training/[slug]

/programs
/programs/[slug]

/tools
/tools/[calculator]                 e.g. protein-calculator, tdee-calculator

/exercises
/exercises/[group]                  e.g. chest, back, legs
/exercises/[group]/[slug]          e.g. bench-press

/foods
/foods/indian
/foods/[slug]                       e.g. chicken-breast, paneer

/recipes
/recipes/[slug]

/reviews
/reviews/[category]/[slug]

/authors
/authors/[slug]

/about
/editorial-policy
/medical-disclaimer
/nutrition-disclaimer
/corrections
/privacy
/terms
/affiliate-disclosure
/contact

/search                             → site-wide knowledge search
```

## Navigation (product)

```
Logo | Learn ▾ | Tools ▾ | Exercises | Foods | Recipes | Search | Calculate CTA
```

**Learn** children: Nutrition, Weight Loss, Muscle Building, Training, Recovery, Supplements  
**Tools** children: Calorie, Macro, Protein, BMI, TDEE (+ more)

Mobile: Logo · Search · Menu

## Footer blocks

Explore · Tools · Resources (About, Authors, Editorial, Sources) · Legal · Social

## Breadcrumbs (required on content)

`Home > Nutrition > Protein > How Much Protein Do I Need`

## Topic clusters (first three)

### 1. Protein
Pillar → requirements → muscle → fat loss → timing → foods → Indian foods → vegetarian → whey/plant → **Protein Calculator** → food DB + recipes

### 2. Weight loss
Pillar → calorie deficit → TDEE/BMR → protein/fiber → walking/strength/cardio → mistakes → **TDEE / Calorie / Macro / BMI**

### 3. Muscle building
Pillar → hypertrophy → overload → volume → protein/calories → bulk/cut → recovery → programs → **1RM / Protein / TDEE**

## Internal linking pattern

Prefer intentional chains over random “related posts”:

```
Weight Loss → Calorie Deficit → TDEE Calculator → Calorie Calculator
  → Protein Calculator → High Protein Foods → Indian High Protein → Recipes
```

## Homepage sections (order)

1. Navbar  
2. Hero (product statement + CTAs: Explore Guides · Calculate Calories)  
3. Featured calculators  
4. Trending / featured guides  
5. Explore pillars (Nutrition, Training, Weight Loss, Muscle, Indian Nutrition)  
6. Exercise library teaser  
7. Food database teaser  
8. Latest articles  
9. Authors  
10. Newsletter  
11. Footer  

## Indexation rule

Scaffold / empty hubs: `robots: { index: false }` until they have real curated content.
