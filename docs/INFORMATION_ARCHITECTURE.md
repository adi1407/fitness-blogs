# Information Architecture & URL Map

Clean, hierarchical URLs. No `?id=` blogs. Prefer no date in path unless editorial model requires it.

## Locked blog taxonomy

Exactly **3 primary categories** → **subcategories** → **articles** (no deeper nesting).

| Category slug | Label |
|---------------|--------|
| `muscle-building` | Muscle Building |
| `weight-loss` | Weight Loss |
| `nutrition` | Nutrition |

Article URLs:

```
/blog/{category}/{subcategory}/{slug}
```

Short resolve (redirects to canonical path): `/blog/{9-digit-article-number}`

Pillar marketing hubs (`/nutrition`, `/weight-loss`, `/muscle-building`) stay as hub pages and link into `/blog/...`.

## Public routes (target)

```
/
/blog
/blog/[category]
/blog/[category]/[subcategory]
/blog/[category]/[subcategory]/[slug]

/learn                              → Learning hub (links into /blog)
/nutrition                          → hub → /blog/nutrition/...
/nutrition/protein                  → cluster hub (links into blog)
/weight-loss                        → hub → /blog/weight-loss/...
/muscle-building                    → hub → /blog/muscle-building/...

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
Logo (left) | Home | Categories ▾ | Tools | Learn | About
```

**Categories** mega menu: three columns (Muscle Building, Weight Loss, Nutrition) listing subcategories → `/blog/{cat}/{sub}`.

Mobile: Logo · Menu drawer with expandable Categories.

## Footer blocks

Explore · Tools · Resources (About, Authors, Editorial, Sources) · Legal · Social

## Breadcrumbs (required on content)

`Home > Blog > Nutrition > Protein > How Much Protein Do I Need`

## Topic clusters (first three)

### 1. Protein
Hub intent: how much / best sources / timing / vegetarian / Indian foods  
Internal links: protein calculator, Indian foods, muscle building basics

### 2. Weight loss
Hub intent: deficit, sustainability, plateaus, myths  
Internal links: TDEE/calorie tools, walking, strength for fat loss

### 3. Muscle building
Hub intent: hypertrophy, progressive overload, beginners, nutrition  
Internal links: protein cluster, training programs, recovery

## Scaffold / empty hubs

Until a hub has valuable content: `robots: { index: false }`.
