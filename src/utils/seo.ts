// ============================================
// PER-ROUTE HEAD TAGS
//
// Every route calls buildMeta() from its meta() export. This is what fixes the
// single most damaging bug in the old site: index.html hardcoded
// <link rel="canonical" href="https://www.vishwakalpa.com/"> and every route
// inherited it, so all five service pages declared the homepage as their
// canonical. Google reads that as "this page is a duplicate of the homepage,
// do not index it" — silently dropping every service page from search.
//
// scripts/check-seo.mjs asserts after every build that each page has exactly
// one canonical and that it points at that page's own URL.
// ============================================

import type { MetaDescriptor } from 'react-router';
import { SITE_URL, company, absoluteUrl } from '../data/company';

const DEFAULT_OG_IMAGE = '/images/hero/mmlp-new.webp';

export interface SeoInput {
    title: string;
    description: string;
    /** Site-relative, e.g. '/services/foundry-design' */
    path: string;
    /** Site-relative. Made absolute automatically. */
    image?: string;
    /** 'website' for landing pages, 'article' for case studies */
    type?: 'website' | 'article';
    noindex?: boolean;
}

/**
 * Open Graph images MUST be absolute URLs.
 *
 * The old index.html used a relative path, which is why every WhatsApp,
 * LinkedIn and Slack preview of this site was broken — social scrapers do not
 * resolve relative paths, and none of them execute JS either.
 */
function absoluteImage(image?: string): string {
    const path = image ?? DEFAULT_OG_IMAGE;
    return path.startsWith('http') ? path : `${SITE_URL}${path}`;
}

export function buildMeta({
    title,
    description,
    path,
    image,
    type = 'website',
    noindex = false,
}: SeoInput): MetaDescriptor[] {
    const url = absoluteUrl(path);
    const ogImage = absoluteImage(image);

    const tags: MetaDescriptor[] = [
        { title },
        { name: 'description', content: description },

        // Self-referencing canonical. RR7 emits link tags from meta() via
        // tagName, which keeps title, description and canonical defined together
        // in one place per route rather than split across two exports.
        { tagName: 'link', rel: 'canonical', href: url },

        { property: 'og:type', content: type },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:url', content: url },
        { property: 'og:image', content: ogImage },
        { property: 'og:site_name', content: company.shortName },
        { property: 'og:locale', content: 'en_IN' },

        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: description },
        { name: 'twitter:image', content: ogImage },
    ];

    if (noindex) {
        tags.push({ name: 'robots', content: 'noindex, follow' });
    }

    return tags;
}

/** Appends the brand to a page title, keeping the distinctive part first —
 *  search results truncate from the right. */
export function withBrand(title: string): string {
    return `${title} | ${company.shortName}`;
}
