// ============================================
// SEO BUILD CHECK
//
// Runs over the prerendered output after every build and fails the build if
// anything is wrong. It exists because of one specific bug: the original site
// hardcoded <link rel="canonical" href="https://www.vishwakalpa.com/"> in
// index.html, so every service page declared the homepage as its canonical.
//
// Nothing about that fails visibly. The pages render, the site works, and
// Google quietly drops every service page from the index because it has been
// told they are duplicates. It would have been discovered months later, via
// traffic that never arrived.
//
// This class of bug is invisible to humans and trivial for a machine, which is
// exactly what a check like this is for.
// ============================================

import { readFile, readdir } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';

const OUT_DIR = 'dist/client';
const SITE_URL = 'https://www.vishwakalpa.com';

const failures = [];
const warnings = [];

function fail(page, message) {
    failures.push(`${page}: ${message}`);
}

function warn(page, message) {
    warnings.push(`${page}: ${message}`);
}

async function findHtmlFiles(dir) {
    const found = [];
    for (const entry of await readdir(dir, { withFileTypes: true })) {
        const full = join(dir, entry.name);
        if (entry.isDirectory()) found.push(...(await findHtmlFiles(full)));
        else if (entry.name.endsWith('.html')) found.push(full);
    }
    return found;
}

function routePathFor(file) {
    const rel = relative(OUT_DIR, file).split(sep).join('/');
    if (rel === 'index.html') return '/';
    return '/' + rel.replace(/\/index\.html$/, '').replace(/\.html$/, '');
}

const countTags = (html, re) => (html.match(re) ?? []).length;

function attr(tag, name) {
    const m = tag.match(new RegExp(`${name}=["']([^"']*)["']`, 'i'));
    return m ? m[1] : null;
}

function findMeta(html, attrName, attrValue) {
    const tags = html.match(/<meta\b[^>]*>/gi) ?? [];
    return tags.find((t) => attr(t, attrName)?.toLowerCase() === attrValue.toLowerCase()) ?? null;
}

/** The maintenance page renders a root <div class="maint">. Detecting it from
 *  the output avoids having to read a TypeScript constant from a Node script. */
const isMaintenancePage = (html) => /<div[^>]+class=["'][^"']*\bmaint\b/.test(html);

// ---------- per-page checks ----------
function checkPage(page, html, { isErrorPage, isMaintenance }) {
    // --- title ---
    const titles = countTags(html, /<title[^>]*>/gi);
    if (titles === 0) fail(page, 'no <title>');
    else if (titles > 1) fail(page, `${titles} <title> tags — there must be exactly one`);

    const titleText = html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1]?.trim();
    if (titleText !== undefined) {
        if (!titleText) fail(page, 'empty <title>');
        // Length advice is pointless on a noindex page — it will never appear
        // in a search result to be truncated.
        else if (!isErrorPage && titleText.length > 65) {
            warn(page, `title is ${titleText.length} chars — search results truncate around 60`);
        }
    }

    // --- description ---
    const descTags = (html.match(/<meta\b[^>]*>/gi) ?? []).filter(
        (t) => attr(t, 'name')?.toLowerCase() === 'description',
    );
    if (descTags.length === 0) fail(page, 'no meta description');
    else if (descTags.length > 1) {
        fail(page, `${descTags.length} meta descriptions — there must be exactly one`);
    } else {
        const content = attr(descTags[0], 'content') ?? '';
        if (!content) fail(page, 'empty meta description');
        else if (!isErrorPage && content.length > 165) {
            warn(page, `description is ${content.length} chars — truncates around 160`);
        } else if (!isErrorPage && content.length < 70) {
            warn(page, `description is only ${content.length} chars — room for more`);
        }
    }

    // --- canonical: the bug this whole script exists for ---
    const canonicalTags = (html.match(/<link\b[^>]*>/gi) ?? []).filter(
        (t) => attr(t, 'rel')?.toLowerCase() === 'canonical',
    );
    if (canonicalTags.length === 0) fail(page, 'no canonical link');
    else if (canonicalTags.length > 1) {
        fail(page, `${canonicalTags.length} canonical links — there must be exactly one`);
    } else {
        const href = attr(canonicalTags[0], 'href');
        const expected = page === '/' ? `${SITE_URL}/` : `${SITE_URL}${page}`;
        if (href !== expected) {
            fail(page, `canonical is "${href}" but should be "${expected}" (self-referencing)`);
        }
    }

    // --- og:image must be absolute ---
    const ogImage = (html.match(/<meta\b[^>]*>/gi) ?? []).find(
        (t) => attr(t, 'property')?.toLowerCase() === 'og:image',
    );
    if (!ogImage) fail(page, 'no og:image');
    else {
        const content = attr(ogImage, 'content') ?? '';
        if (!/^https?:\/\//i.test(content)) {
            // Relative og:image is why every WhatsApp/LinkedIn/Slack preview of
            // the old site was blank — social scrapers don't resolve relatives.
            fail(page, `og:image "${content}" is relative — must be an absolute URL`);
        }
    }

    for (const prop of ['og:title', 'og:description', 'og:url', 'og:type']) {
        if (!findMeta(html, 'property', prop)) warn(page, `missing ${prop}`);
    }

    // --- JSON-LD parses ---
    const blocks = html.match(
        /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
    ) ?? [];
    if (blocks.length === 0) warn(page, 'no JSON-LD structured data');

    blocks.forEach((block, i) => {
        const body = block.replace(/^<script[^>]*>/i, '').replace(/<\/script>$/i, '');
        try {
            const parsed = JSON.parse(body);
            for (const node of [parsed].flat()) {
                if (!node || typeof node !== 'object') {
                    fail(page, `JSON-LD block ${i + 1} is not an object`);
                } else if (!node['@type']) {
                    fail(page, `JSON-LD block ${i + 1} has no @type`);
                }
            }
        } catch (err) {
            fail(page, `JSON-LD block ${i + 1} is not valid JSON — ${err.message}`);
        }
    });

    // --- exactly one h1 ---
    const h1s = countTags(html, /<h1\b[^>]*>/gi);
    if (h1s === 0) fail(page, 'no <h1>');
    else if (h1s > 1 && !isMaintenance) {
        warn(page, `${h1s} <h1> tags — one per page is the convention`);
    }

    // --- prerendering actually produced content ---
    // If lazy() sneaks back into a route, the prerendered body collapses to an
    // empty root div and the page ships with no indexable content at all. This
    // catches that immediately rather than months later.
    const bodyText = html
        .replace(/<script[\s\S]*?<\/script>/gi, '')
        .replace(/<style[\s\S]*?<\/style>/gi, '')
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

    // While MAINTENANCE_MODE is on, every prerendered body IS the maintenance
    // page, so a content check would fail on all of them for the wrong reason.
    // Head tags, canonicals and JSON-LD come from the route modules and are
    // unaffected, so everything above still applies.
    if (!isMaintenance) {
        const MIN_WORDS = isErrorPage ? 20 : 120;
        const words = bodyText ? bodyText.split(' ').length : 0;
        if (words < MIN_WORDS) {
            fail(
                page,
                `only ${words} words of rendered text (expected at least ${MIN_WORDS}) — ` +
                `the page may not be prerendering its content`,
            );
        }
    }

    // --- images need dimensions (CLS) ---
    const imgs = html.match(/<img\b[^>]*>/gi) ?? [];
    const undimensioned = imgs.filter((t) => !attr(t, 'width') || !attr(t, 'height'));
    if (undimensioned.length) {
        warn(page, `${undimensioned.length} <img> without width/height — causes layout shift`);
    }
}

// ---------- sitemap parity ----------
async function checkSitemap(pages) {
    let xml;
    try {
        xml = await readFile(join(OUT_DIR, 'sitemap.xml'), 'utf8');
    } catch {
        failures.push('sitemap.xml: not found — did scripts/postbuild.mjs run?');
        return;
    }

    const inSitemap = new Set(
        [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) =>
            m[1] === `${SITE_URL}/` ? '/' : m[1].replace(SITE_URL, ''),
        ),
    );

    const indexable = pages.filter((p) => p !== '/404');

    // A prerendered page missing from the sitemap is a page Google may never find.
    for (const page of indexable) {
        if (!inSitemap.has(page)) failures.push(`sitemap.xml: missing ${page}`);
    }

    // A sitemap URL with no prerendered file is a 404 handed straight to Google.
    for (const loc of inSitemap) {
        if (!indexable.includes(loc)) {
            failures.push(`sitemap.xml: lists ${loc}, which was not prerendered`);
        }
    }

    if (inSitemap.has('/404')) {
        failures.push('sitemap.xml: contains /404 — error pages must never be submitted');
    }
}

// ---------- run ----------
console.log('\nSEO checks');

const files = await findHtmlFiles(OUT_DIR);
const pages = [];
let maintenancePages = 0;

for (const file of files.sort()) {
    const rel = relative(OUT_DIR, file).split(sep).join('/');

    if (rel.includes('__spa-fallback')) continue;

    // 404.html is the copy postbuild.mjs makes of 404/index.html for Vercel to
    // serve. Both normalise to the route path "/404", so it has to be skipped
    // by FILENAME — skipping by route path would never match, and every finding
    // about the 404 page would be reported twice.
    if (rel === '404.html') continue;

    const page = routePathFor(file);
    pages.push(page);
    const html = await readFile(file, 'utf8');
    const isMaintenance = isMaintenancePage(html);
    if (isMaintenance) maintenancePages++;
    checkPage(page, html, { isErrorPage: page === '/404', isMaintenance });
}

await checkSitemap(pages);

console.log(`  checked ${pages.length} prerendered pages`);

if (maintenancePages > 0) {
    console.log(
        `\n  NOTE: MAINTENANCE_MODE is ON — ${maintenancePages} page(s) prerendered\n` +
        `  the maintenance body instead of their real content. Head tags, canonicals\n` +
        `  and JSON-LD were still verified; body content checks were skipped.\n` +
        `\n  To verify real content prerenders, build with the override:\n` +
        `      VITE_MAINTENANCE_MODE=false npm run build`,
    );
}

if (warnings.length) {
    console.log(`\n  ${warnings.length} warning(s):`);
    for (const w of warnings) console.log(`    · ${w}`);
}

if (failures.length) {
    console.error(`\n  ${failures.length} FAILURE(S):`);
    for (const f of failures) console.error(`    ✗ ${f}`);
    console.error('');
    process.exit(1);
}

console.log('  all checks passed\n');
