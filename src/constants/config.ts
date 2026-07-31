// Centralised app-wide constants
export const WEB3FORMS_ACCESS_KEY = '87403c7e-d81c-4e3e-8e68-4b68f6232ab6';
export const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

// ============================================
// MAINTENANCE MODE
//
// OFF locally, ON in every build. `npm run dev` shows the real site; anything
// deployed — production and Vercel previews alike — still shows the maintenance
// page. Nothing needs flipping to work on the site day to day.
//
// This is driven by the environment rather than a hand-edited boolean because
// the boolean is a foot-gun: the site goes live the moment someone commits it
// in the wrong state, and that is a one-character diff nobody notices in review.
//
// OVERRIDE — set VITE_MAINTENANCE_MODE to force either state:
//
//   VITE_MAINTENANCE_MODE=false npm run build   build the REAL site, to verify
//                                               content actually prerenders
//   VITE_MAINTENANCE_MODE=true  npm run dev     work on the maintenance page
//
// GOING LIVE is still a deliberate act, not an env var. See README.md — flip
// the fallback below to `false`, delete the maintenance page and preview gate,
// and remove the X-Robots-Tag header from vercel.json in the SAME commit.
// ============================================
const override = import.meta.env.VITE_MAINTENANCE_MODE;

export const MAINTENANCE_MODE =
    override !== undefined ? override === 'true' : import.meta.env.PROD;
