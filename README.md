# Vishwakalpa

Website for **Vishwakalpa Design Planning and Management Private Limited** — a boutique
industrial design consultancy in Pune specialising in foundries, factories and
manufacturing campuses.

React Router 7 (framework mode) + Vite + TypeScript, prerendered to static HTML and
deployed to Vercel.

---

## ⚠️ The site is currently dark

Maintenance mode is **off locally and on in every build** — see
[`src/constants/config.ts`](src/constants/config.ts):

| | Maintenance page | Why |
|---|---|---|
| `npm run dev` | **off** | work on the real site, no token needed |
| `npm run build` | **on** | production and Vercel previews stay dark |

It is driven by `import.meta.env.PROD` rather than a hand-edited boolean, because the
boolean is a foot-gun: the site goes live the moment someone commits it in the wrong
state, and that is a one-character diff nobody notices in review.

Force either state when you need to:

```bash
VITE_MAINTENANCE_MODE=false npm run build   # build the real site, to verify content
VITE_MAINTENANCE_MODE=true npm run dev      # work on the maintenance page
```

**On the deployed site**, visit any page once with the preview token to see the real site:

```
https://www.vishwakalpa.com/?preview=vk-2026
```

The unlock is stored in `localStorage`, so it survives navigation, refreshes and closing
the tab. Clear `vk-preview` from localStorage to lock the browser again.

### Going live — one commit, both halves together

Going live is a deliberate act, not an env var:

1. In `src/constants/config.ts`, replace the whole expression with
   `export const MAINTENANCE_MODE = false`
2. Delete `src/utils/preview.ts`, `src/pages/Maintenance.tsx`, `src/pages/Maintenance.css`,
   and the `MAINTENANCE_MODE` branch in `src/root.tsx`
3. Remove the `X-Robots-Tag` header block from [`vercel.json`](vercel.json)

Steps 1 and 3 must ship in the **same deploy**. Publishing without removing the header
leaves the site live but invisible to Google; removing the header first would expose the
maintenance page to indexing.

---

## Commands

```bash
npm run dev          # dev server on :5173
npm run build        # prerender + sitemap + SEO checks
npm run typecheck    # route typegen + tsc
npm run lint
```

`npm run build` fails if any SEO check fails. That is deliberate — see below.

---

## Architecture

### Prerendering

`ssr: false` + `prerender()` in [`react-router.config.ts`](react-router.config.ts) emits
real static HTML for every URL at build time. Still plain static files on Vercel — no
server, no functions, no change in hosting cost.

This matters because the site's entire purpose is search visibility:

- Google renders JavaScript, but on a delayed second pass. Static HTML is indexed
  immediately.
- **AI crawlers (GPTBot, ClaudeBot, PerplexityBot) mostly do not execute JavaScript.**
  They previously received an empty `<div id="root">`.
- Social scrapers never run JS, so link previews were dead on every URL.

**Never wrap a route's content in `lazy()`.** React renders the Suspense fallback when a
lazy component suspends, so the prerendered page would ship empty. `check-seo.mjs` has a
minimum-word-count assertion specifically to catch this.

### Routes

| File | Purpose |
|---|---|
| [`src/routes.ts`](src/routes.ts) | Route config (patterns) |
| [`src/data/siteRoutes.ts`](src/data/siteRoutes.ts) | Concrete URLs to prerender |
| [`src/root.tsx`](src/root.tsx) | Document shell — replaced `index.html` |

Adding a service or project to `src/data/services.ts` / `projects.ts` automatically adds
its URL to the prerender list and the sitemap. Nothing else to update.

### Data layer

| File | Purpose |
|---|---|
| `src/data/company.ts` | **NAP single source** — name, address, phone, hours, socials |
| `src/data/services.ts` | Six service pages with SEO meta and FAQs |
| `src/data/team.ts` | Ten profiles |
| `src/data/projects.ts` | Two case studies |
| `src/data/sectors.ts` | Twelve industry sectors (homepage section) |

`company.ts` exists because the company name and address were previously duplicated across
`index.html`, `content.json` and `Footer.tsx` — and all three had drifted apart. Google
matches a business by comparing the **exact characters** of its name, address and phone
against the Google Business Profile, so a mismatch can split local ranking. **Do not
hardcode these values anywhere else.**

### Placeholder images

`sectors.ts`, `team.ts` and `projects.ts` all use `image: string | null`, where `null`
renders a branded placeholder. To add a real image, drop the file into `public/images/…`
and set the path — nothing else changes.

Currently all ten team photos and both project images are placeholders.

---

## SEO checks

`scripts/check-seo.mjs` runs after every build and **fails the build** on:

- missing, empty or duplicated `<title>`, description or canonical
- a canonical that is not self-referencing
- a relative `og:image`
- sitemap ↔ prerendered file mismatch in either direction
- `/404` appearing in the sitemap
- JSON-LD that does not parse or has no `@type`
- a page with too little rendered text (catches accidental `lazy()`)

It exists because of one specific bug: the original `index.html` hardcoded
`<link rel="canonical" href="https://www.vishwakalpa.com/">`, so every service page
declared the **homepage** as its canonical. Nothing about that fails visibly — the pages
render, the site works, and Google quietly drops every service page from the index because
it has been told they are duplicates. This class of bug is invisible to humans and trivial
for a machine.

`scripts/postbuild.mjs` generates `sitemap.xml` by reading each page's own canonical, so
the two cannot disagree. It also copies the prerendered `/404` to `404.html`, which is the
filename Vercel serves for unmatched URLs.

---

## Content constraints

These are factual constraints set by the company, not style preferences. They are
documented in `src/data/services.ts` and must survive any copy edit:

1. **MEP is not in-house.** It is delivered through a consultant partner. Always
   "coordinated MEP design", never "our in-house MEP team".
2. **Nestlé / Campa Cola / Everest / Havmor** are the founding team's *pre-Vishwakalpa*
   experience. Always "our team has delivered", never "Vishwakalpa has delivered".
3. **The firm does not manage approvals.** It produces drawings and documentation that
   *support* the client's own MIDC / factory licence / pollution NOC applications. Never
   claim to run the approval process.
4. **The company was incorporated in 2025.** Do not reintroduce claims about years in
   business — lead with combined team experience, which is derived from `team.ts`.
5. **Client names are anonymised** in both case studies. Set `clientName` in `projects.ts`
   only once written clearance exists.

## Outstanding

See [`SEO-QUESTIONS-OUTSTANDING.md`](SEO-QUESTIONS-OUTSTANDING.md) — Google Business
Profile actions, Search Console access, team and project photos, and the hero headline
choice.
