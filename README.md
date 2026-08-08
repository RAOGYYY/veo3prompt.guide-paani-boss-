# Paani Boss — veo3prompt.guide

Marketing and information site for **Paani Boss**, an operations platform for RO
(reverse osmosis) water purifier service businesses in India.

The Android application is published on Google Play under the package
`com.roservice.manager`. This repository contains the public website only — it
does not contain the mobile application source.

## Stack

Static site, no build step and no third-party runtime dependencies.

| Path | What it is |
| ---- | ---------- |
| `index.html` | single-page site: problem, product, workflow, app screens, stage, founder, contact |
| `privacy-policy.html` | privacy policy covering customer, location, photo and billing data |
| `terms-of-service.html` | terms covering website and application use |
| `css/style.css` | design system: light premium theme, responsive, reduced-motion aware |
| `js/script.js` | footer year, sticky header state, scroll reveal, screenshot slideshow |
| `assets/` | app icon, banner, founder photo, Play Store screenshots |
| `robots.txt`, `sitemap.xml` | crawl and indexing |

No web fonts, analytics scripts or CDN requests are loaded, so the page makes no
third-party network calls.

## Run locally

```bash
python3 -m http.server 8090 --bind 127.0.0.1
# then open http://127.0.0.1:8090/
```

## Product stage

| Area | State |
| ---- | ----- |
| Android application | live on Google Play |
| Owner / technician web panels | in development |
| Pricing, subscriptions, team accounts | not started |
| Planned public launch | March 2027 |

## Page structure

1. Hero — what it is, plus current build state
2. Problem
3. Product capabilities
4. Service job workflow
5. App evidence (Play Store screenshots)
6. Build status — live / in development / not started
7. Roadmap to the March 2027 launch
8. Founder
9. Pilot and partnership contact

## Content rules

The site deliberately publishes no invented customer counts, revenue figures,
testimonials or partnerships. Product claims describe the shipped Android
application, unfinished work is labelled as in development, and operating metrics
are added only when they exist and can be supported.

## Founder

Dilshad — <contact@veo3prompt.guide>
