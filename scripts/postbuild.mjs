// ============================================
// POSTBUILD
//
// Two jobs, both of which have to happen after React Router has written its
// prerendered output:
//
//   1. Place the 404 page where Vercel will actually serve it.
//   2. Generate sitemap.xml from the canonical URL of every prerendered page.
//
// The sitemap is built by READING each page's own <link rel="canonical">
// rather than from a separate list of routes. That means the sitemap and the
// canonicals cannot disagree — if a page declares the wrong canonical, it goes
// into the sitemap wrong and check-seo.mjs fails the build. Keeping two
// independent lists in sync by hand is exactly how the original bug happened.
// ============================================

import { readFile, writeFile, readdir, copyFile, access } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';

const OUT_DIR = 'dist/client';
const SITE_URL = 'https://www.vishwakalpa.com';

/** Paths excluded from the sitemap. Error pages must never be submitted. */
const SITEMAP_EXCLUDE = new Set(['/404']);

/** Relative importance within this site. Does not affect ranking against
 *  competitors — it only tells Google which of YOUR pages matter most. */
function priorityFor(path) {
    if (path === '/') return '1.0';
    if (path.startsWith('/services/')) return '0.9';
    if (path.startsWith('/projects/')) return '0.8';
    return '0.7';
}

function changefreqFor(path) {
    if (path.startsWith('/projects/')) return 'yearly';
    return 'monthly';
}

async function findHtmlFiles(dir) {
    const found = [];
    for (const entry of await readdir(dir, { withFileTypes: true })) {
        const full = join(dir, entry.name);
        if (entry.isDirectory()) {
            found.push(...(await findHtmlFiles(full)));
        } else if (entry.name.endsWith('.html')) {
            found.push(full);
        }
    }
    return found;
}

/** dist/client/services/machine-layout-design/index.html -> /services/machine-layout-design */
function routePathFor(file) {
    const rel = relative(OUT_DIR, file).split(sep).join('/');
    if (rel === 'index.html') return '/';
    return '/' + rel.replace(/\/index\.html$/, '').replace(/\.html$/, '');
}

function extractCanonical(html) {
    const match = html.match(/<link[^>]+rel=["']canonical["'][^>]*>/i);
    if (!match) return null;
    const href = match[0].match(/href=["']([^"']+)["']/i);
    return href ? href[1] : null;
}

async function exists(path) {
    try {
        await access(path);
        return true;
    } catch {
        return false;
    }
}

// ---------- 1. 404 ----------
//
// React Router prerenders /404 to dist/client/404/index.html. Vercel's static
// hosting serves dist/client/404.html for unmatched URLs, so the file has to be
// copied to that exact name.
//
// This matters more than it looks. The old vercel.json rewrote every URL to
// index.html, so a mistyped address returned the homepage at HTTP 200 — telling
// Google that every bogus URL is a real page. With / prerendered that becomes an
// unlimited duplicate-content generator. Dropping the rewrite and shipping a
// real 404.html is what produces a genuine 404 status instead.
async function place404() {
    const src = join(OUT_DIR, '404', 'index.html');
    const dest = join(OUT_DIR, '404.html');

    if (!(await exists(src))) {
        throw new Error(
            `Expected prerendered 404 at ${src} but it is missing. ` +
            `Check that '/404' is still listed in src/data/siteRoutes.ts.`,
        );
    }

    await copyFile(src, dest);
    console.log(`  404.html      <- ${relative(OUT_DIR, src).split(sep).join('/')}`);
}

// ---------- 2. sitemap ----------
async function generateSitemap() {
    const files = await findHtmlFiles(OUT_DIR);
    const entries = [];
    const problems = [];

    for (const file of files.sort()) {
        const path = routePathFor(file);

        // Skip the SPA fallback React Router emits, and the 404 copy.
        if (path.includes('__spa-fallback') || path === '/404.html' || path === '/404') continue;
        if (SITEMAP_EXCLUDE.has(path)) continue;

        const html = await readFile(file, 'utf8');
        const canonical = extractCanonical(html);

        if (!canonical) {
            problems.push(`${path} has no <link rel="canonical">`);
            continue;
        }

        const expected = path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`;
        if (canonical !== expected) {
            problems.push(`${path} declares canonical "${canonical}", expected "${expected}"`);
            continue;
        }

        entries.push({ loc: canonical, path });
    }

    if (problems.length) {
        console.error('\n  Canonical problems — refusing to write a sitemap:');
        for (const p of problems) console.error(`    · ${p}`);
        throw new Error(`${problems.length} page(s) have a bad or missing canonical.`);
    }

    const lastmod = new Date().toISOString().slice(0, 10);
    const xml = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        ...entries.map(
            ({ loc, path }) =>
                '  <url>\n' +
                `    <loc>${loc}</loc>\n` +
                `    <lastmod>${lastmod}</lastmod>\n` +
                `    <changefreq>${changefreqFor(path)}</changefreq>\n` +
                `    <priority>${priorityFor(path)}</priority>\n` +
                '  </url>',
        ),
        '</urlset>',
        '',
    ].join('\n');

    await writeFile(join(OUT_DIR, 'sitemap.xml'), xml, 'utf8');
    console.log(`  sitemap.xml   <- ${entries.length} prerendered pages`);
    return entries.length;
}

console.log('\nPostbuild');
await place404();
await generateSitemap();
console.log('');
