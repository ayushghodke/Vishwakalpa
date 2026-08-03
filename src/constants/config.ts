// Centralised app-wide constants
export const WEB3FORMS_ACCESS_KEY = '87403c7e-d81c-4e3e-8e68-4b68f6232ab6';
export const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

// ============================================
// MAINTENANCE MODE — THE SWITCH
//
//   true   every route shows the maintenance page
//   false  the real site is live
//
// This one line is the whole control. It applies everywhere — `npm run dev`,
// production, and Vercel preview deployments alike.
//
// To work on the real site locally without flipping it, open any page once with
// the preview token and it stays unlocked in that browser:
//     http://localhost:5173/?preview=vk-2026
//
// WHEN GOING LIVE, do all of this in the SAME commit, or the site ends up
// public but invisible to Google:
//   1. set MAINTENANCE_MODE = false below
//   2. delete src/utils/preview.ts, src/pages/Maintenance.tsx + .css, and the
//      MAINTENANCE_MODE branch in src/root.tsx
//   3. remove the X-Robots-Tag header block from vercel.json
    // 4. true, false
// ============================================
export const MAINTENANCE_MODE = false;
