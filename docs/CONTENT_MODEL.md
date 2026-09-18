# Content Model & CMS / Database

PostgreSQL is the primary store (relational content graph). Mongo is not the default CMS DB.

## Core entities

```
users (admin | editor | writer)
categories (exactly 3: muscle-building, weight-loss, nutrition)
subcategories (FK category_id, unique per category slug)
articles
  - article_number (unique 9-digit)
  - category_id, subcategory_id (required for submit/publish)
  - tags TEXT[], topics TEXT[], views INT
audit_events
```

Future: authors/reviewer profiles, foods, exercises, recipes, calculators, redirects, revisions.

## Locked taxonomy

Category → Subcategory → Article only. Topics and tags are metadata, not nested categories. Do not auto-index tag landing pages.

## Article fields (MVP)

| Field | Notes |
|-------|--------|
| title, slug, excerpt, body | Required for submit/publish |
| article_number | Random 9-digit on create |
| category_id, subcategory_id | Must match (sub belongs to category) |
| tags[], topics[] | Free tags + curated topic labels |
| views | Incremented on public read |
| featuredImage, ogImage | URLs |
| author_id, reviewer_id, published_by | EEAT / workflow |
| status | draft → submitted → published \| rejected |
| publishedAt, updatedAt | Display honesty |
| readingTime | Estimated from body |
| primaryKeyword, metaTitle, metaDescription, metaKeywords | SEO |
| quickAnswer | Featured answer box |
| reject_reason | Editor feedback |

Public path: `/blog/{categorySlug}/{subcategorySlug}/{slug}`

## Food / exercise / calculator fields

Unchanged product intent — see BUILD_ROADMAP for phased delivery.

## CMS roles

| Role | Powers |
|------|--------|
| Admin | All articles, activity log |
| Editor | Create/edit/publish/reject; review queue |
| Writer | Own drafts/rejected; submit for review; writer desk (views on live) |

## Editorial pipeline (MVP)

```
Draft → Submit → Editor publish | Reject → (revise) Draft
```

Unpublish returns to draft. Support revision history and redirects in a later pass.

## Tags policy

Do **not** auto-index every tag.  
Categories + subcategories = architecture. Topics = relationships.  
Only index topic pages with curated value.

## Search (product)

Unified search across Articles · Foods · Exercises · Recipes · Calculators.  
Start: Postgres FTS. Later: Typesense / Meilisearch if scale demands.
