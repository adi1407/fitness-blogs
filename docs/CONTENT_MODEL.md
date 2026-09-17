# Content Model & CMS / Database

PostgreSQL is the primary store (relational content graph). Mongo is not the default CMS DB.

## Core entities

```
users, authors, reviewers
articles, categories, topics, tags
article_topics, article_categories, article_sources
foods, food_nutrients
exercises, exercise_muscles
recipes, recipe_ingredients
calculators
comments, likes, bookmarks
newsletter_subscribers
redirects, article_revisions
```

## Article fields (minimum)

| Field | Notes |
|-------|--------|
| title, slug, excerpt, content | Required |
| featuredImage | Optimized variants |
| authorId, reviewerId | EEAT |
| categoryId / topics | Architecture |
| status | draft → research → writing → seo → fact_check → expert_review → editor → publish |
| publishedAt, updatedAt | Display honesty |
| lastFactCheckedAt, nextReviewDate | Freshness engine |
| readingTime, difficulty | UX |
| primaryKeyword, secondaryKeywords, searchIntent | SEO ops |
| canonicalUrl, metaTitle, metaDescription, ogImage | Overridable |
| schemaType | article / faq / howTo only if true |
| sources[], faq[] | Credibility |
| relatedArticleIds | Manual + suggested |
| quickAnswer | HTML/markdown box |

## Food page fields

name, slug, cuisineRegion (e.g. indian), servingSize, calories, protein, carbs, fat, fiber, micros, aliases, relatedFoodIds, relatedArticleIds, recipes[]

## Exercise page fields

name, slug, primaryMuscle, secondaryMuscles[], equipment, difficulty, movementPattern, instructions[], cues[], mistakes[], setsRepsRest defaults, progressions, regressions, variations[], video, relatedExerciseIds

## Calculator fields

slug, name, description, inputs schema, formula notes, output templates, relatedArticleIds, relatedToolIds

## CMS roles

| Role | Powers |
|------|--------|
| Admin | All |
| Editor | Create/edit/publish/review |
| Author | Own drafts |
| Reviewer | Approve/reject |
| SEO Manager | Metadata, links, redirects, sitemaps |

## Editorial pipeline

```
Draft → Research → Writing → Technical SEO → Fact check
  → Expert review → Editor review → Publish → Scheduled update
```

Support **revision history** and **301 redirect manager**.

## Tags policy

Do **not** auto-index every tag.  
Categories = architecture. Topics/entities = relationships.  
Only index topic pages with curated value.

## Search (product)

Unified search across Articles · Foods · Exercises · Recipes · Calculators.  
Start: Postgres FTS. Later: Typesense / Meilisearch if scale demands.

## Trust / legal pages (required before scaling health content)

About · Editorial Policy · Medical Disclaimer · Nutrition Disclaimer · Corrections · Advertising · Affiliate · Privacy · Terms · Contact
