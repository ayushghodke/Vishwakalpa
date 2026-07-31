import type { Config } from '@react-router/dev/config';
import { prerenderPaths } from './src/data/siteRoutes';

// ============================================
// REACT ROUTER 7 — FRAMEWORK MODE, PRERENDERED
//
// ssr: false + prerender() produces real static HTML for every URL at build
// time. Still deploys to Vercel as plain static files — no server, no
// functions, no change in hosting cost.
//
// Why this matters for SEO:
//   · Google renders JS, but on a delayed second pass. Static HTML is indexed
//     immediately and reliably.
//   · AI crawlers (GPTBot, PerplexityBot, ClaudeBot) mostly do NOT execute JS.
//     Previously they received an empty <div id="root">.
//   · Social scrapers (WhatsApp, LinkedIn, Slack, Facebook) never run JS, so
//     link previews were dead on every URL regardless of what the tags said.
//   · Each route now carries its own <head>. Previously every service page
//     declared the homepage as its canonical, which would have silently
//     deindexed all of them.
//
// appDirectory: 'src' keeps the existing project layout — no forced app/ move.
// ============================================

export default {
    appDirectory: 'src',

    // React Router defaults to 'build'. Kept as 'dist' so vercel.json's
    // outputDirectory ("dist/client") and the existing .gitignore both stay
    // correct. Note the /client suffix: React Router emits to
    // <buildDirectory>/client, and pointing Vercel at the wrong directory means
    // it serves nothing at all.
    buildDirectory: 'dist',

    ssr: false,
    prerender: () => prerenderPaths,
} satisfies Config;
