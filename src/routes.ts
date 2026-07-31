import { type RouteConfig, index, route } from '@react-router/dev/routes';

// ============================================
// ROUTE CONFIG
//
// The concrete URLs prerendered from these patterns live in
// src/data/siteRoutes.ts, which also feeds the sitemap. Adding a service or
// project there is enough — no change is needed here.
// ============================================

export default [
    index('pages/Home.tsx'),
    route('services/:slug', 'pages/ServiceDetail.tsx'),
    route('projects/:slug', 'pages/ProjectDetail.tsx'),
    route('team', 'pages/Team.tsx'),

    // Prerendered to dist/client/404/index.html, then copied to 404.html by the
    // postbuild step so Vercel serves it with a real 404 status.
    route('404', 'pages/NotFound.tsx'),

    // Client-side only. Static hosting serves 404.html for unknown URLs, so this
    // covers in-app navigation to a bad path.
    route('*', 'pages/NotFound.tsx', { id: 'catch-all' }),
] satisfies RouteConfig;
