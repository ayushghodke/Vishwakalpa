import { useSyncExternalStore } from 'react';
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';
import type { LinksFunction } from 'react-router';
import { MAINTENANCE_MODE } from './constants/config';
import {
    getPreviewSnapshot,
    getPreviewServerSnapshot,
    subscribeToPreview,
} from './utils/preview';
import { organizationSchema } from './utils/schema';
import Maintenance from './pages/Maintenance';
import stylesheet from './index.css?url';

// ============================================
// ROOT — the document shell
//
// Replaces the old index.html. Everything that was static in <head> now lives
// either here (things true of every page) or in each route's meta() export
// (title, description, canonical, Open Graph — things that differ per page).
//
// The old index.html hardcoded a single canonical pointing at the homepage,
// which every route then inherited. That alone would have deindexed all five
// service pages on the day the site went live.
// ============================================

export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: stylesheet },
    { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/images/favicon-32.png' },
    { rel: 'apple-touch-icon', sizes: '180x180', href: '/images/apple-touch-icon.png' },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
    {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap',
    },
];

export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="theme-color" content="#1a1a1a" />
                <Meta />
                <Links />
                {/* Site-wide organisation identity. Page-specific schema (Service,
                    Person, BreadcrumbList) is emitted by the individual routes. */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }}
                />
            </head>
            <body>
                {children}
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
}

export default function Root() {
    // The preview unlock reads localStorage, which does not exist during
    // prerendering — so every prerendered page ships the maintenance body. If we
    // read it during the first client render, an unlocked browser would produce
    // different markup than the HTML it is hydrating, and React would throw a
    // hydration mismatch.
    //
    // useSyncExternalStore exists for exactly this: it renders the server
    // snapshot during hydration, then re-renders with the client snapshot. The
    // first paint therefore matches the prerendered HTML exactly. An unlocked
    // visitor sees a brief flash of the maintenance page, which is a fine trade
    // for a preview mechanism.
    const unlocked = useSyncExternalStore(
        subscribeToPreview,
        getPreviewSnapshot,
        getPreviewServerSnapshot,
    );

    if (MAINTENANCE_MODE && !unlocked) {
        return <Maintenance />;
    }

    return <Outlet />;
}
