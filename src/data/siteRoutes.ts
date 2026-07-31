// ============================================
// SITE ROUTES — SINGLE SOURCE OF TRUTH FOR URLS
//
// Both the prerenderer and the sitemap generator read from here:
//   react-router.config.ts  → prerender()   (which URLs get static HTML)
//   scripts/generate-sitemap.mjs → sitemap.xml
//
// One list means the two can never drift apart. A sitemap listing a URL that
// was never prerendered is a 404 handed straight to Google; a prerendered page
// missing from the sitemap is a page Google may never find.
// scripts/check-seo.mjs asserts parity in both directions after every build.
//
// IMPORTANT: this file is imported by react-router.config.ts, which runs in
// Node outside the browser bundle. Import only pure data from here — no React,
// no lucide-react, no browser globals. services.ts and projects.ts are safe;
// sectors.ts is NOT (it imports icon components).
// ============================================

import { serviceSlugs } from './services';
import { projectSlugs } from './projects';

export interface SiteRoute {
    path: string;
    /** Sitemap priority, 0.0–1.0. Relative importance within this site only. */
    priority: number;
    changefreq: 'daily' | 'weekly' | 'monthly' | 'yearly';
    /** Excluded from sitemap.xml — error pages must never be submitted */
    excludeFromSitemap?: boolean;
}

export const siteRoutes: SiteRoute[] = [
    { path: '/', priority: 1.0, changefreq: 'monthly' },

    // Service pages. Foundry is the highest-value target — lowest competition,
    // highest intent — but priority only ranks pages against each other within
    // this sitemap; it does not raise you against competitors.
    ...serviceSlugs.map((slug) => ({
        path: `/services/${slug}`,
        priority: 0.9,
        changefreq: 'monthly' as const,
    })),

    // Case studies. Real project detail is what earns trust from both search
    // engines and the factory owners actually reading it.
    ...projectSlugs.map((slug) => ({
        path: `/projects/${slug}`,
        priority: 0.8,
        changefreq: 'yearly' as const,
    })),

    { path: '/team', priority: 0.7, changefreq: 'monthly' },

    // Prerendered so Vercel can serve a real branded 404, but deliberately kept
    // out of the sitemap.
    { path: '/404', priority: 0.0, changefreq: 'yearly', excludeFromSitemap: true },
];

/** Every path to prerender, including /404. */
export const prerenderPaths = siteRoutes.map((r) => r.path);

/** Everything that belongs in sitemap.xml. */
export const sitemapRoutes = siteRoutes.filter((r) => !r.excludeFromSitemap);
