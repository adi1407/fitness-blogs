# Google Analytics + Search Console (fitlives.in)

Wire traffic analytics and Google’s SEO crawl tools for the live site.

Already in the codebase:

- XML sitemap → `https://fitlives.in/sitemap.xml`
- `robots.txt` → points at that sitemap
- Meta / OG / canonicals / JSON-LD on key pages
- **GA4** loads only after cookie **Accept** (`NEXT_PUBLIC_GA_MEASUREMENT_ID`)
- **Search Console** HTML meta verification (`NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`)

---

## 1. Google Analytics 4

1. Open [Google Analytics](https://analytics.google.com/) → create an account (or use existing).
2. Create a **GA4 property** named `fitlives`.
3. Add a **Web** data stream:
   - URL: `https://fitlives.in`
   - Stream name: `fitlives web`
4. Copy the **Measurement ID** (`G-XXXXXXXXXX`).
5. Vercel → **fitness-blogs** → **Settings → Environment Variables** (Production):

```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SITE_URL=https://fitlives.in
```

6. **Redeploy** Production (required for `NEXT_PUBLIC_*`).
7. On the live site: **Accept cookies** → open a few pages → GA4 **Reports → Realtime** should show you.

GA does **not** run if the visitor chooses Reject (same consent as OpenPanel).

---

## 2. Google Search Console

1. Open [Google Search Console](https://search.google.com/search-console).
2. **Add property** → choose **URL prefix** → `https://fitlives.in`
3. Verification method → **HTML tag**.
4. Copy only the `content="…"` token (not the whole `<meta>` tag).
5. Vercel Production env:

```bash
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=paste_token_here
```

6. Redeploy → click **Verify** in Search Console.
7. Also add `https://www.fitlives.in` if you want both prefixes (or use a **Domain** property with DNS TXT at GoDaddy).

### Sitemap

In Search Console → **Sitemaps** → submit:

```text
https://fitlives.in/sitemap.xml
```

Confirm in a browser first — you should see XML with many `<url>` entries (not an error page).  
If status is **Couldn't fetch**, wait a few minutes after DNS/deploy settles, open the URL yourself, then use **Resubmit**. Google often fails while the domain is still parking or mid-propagation.

`robots.txt` already advertises the same sitemap URL.
### Optional DNS verification (Domain property)

GoDaddy DNS → **TXT** `@` → value Google shows (e.g. `google-site-verification=…`).  
Domain property covers apex + www in one place.

---

## 3. After connect checklist

| Item | Action |
|------|--------|
| Site URL | `NEXT_PUBLIC_SITE_URL=https://fitlives.in` on Vercel |
| CORS | Render `CORS_ORIGINS` includes `https://fitlives.in` (+ www if needed) |
| CMS | `VITE_PUBLIC_SITE_URL=https://fitlives.in` |
| OpenPanel | Still optional product analytics — see `docs/ANALYTICS_OPENPANEL.md` |
| Indexing | Search Console → URL Inspection → request indexing for homepage + key hubs |
| Performance | Search Console → Core Web Vitals / Page experience (after data accumulates) |

---

## 4. What you do *not* need for launch

- Google Tag Manager (optional later)
- Google Ads / AdSense (not part of this SEO stack)
- Bing Webmaster (nice later: import from Search Console)

---

## 5. Smoke test

1. View source on `https://fitlives.in` → look for  
   `google-site-verification` meta (after deploy with verification env).
2. Accept cookies → Network tab → requests to `googletagmanager.com` / `google-analytics.com`.
3. Reject cookies → those scripts should **not** load.
4. Open `https://fitlives.in/sitemap.xml` and `https://fitlives.in/robots.txt`.
