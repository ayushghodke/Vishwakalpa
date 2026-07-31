// ============================================
// PREVIEW ACCESS
//
// While MAINTENANCE_MODE is on, visiting any page with ?preview=vk-2026 once
// unlocks the real site for that browser and keeps it unlocked — the token is
// persisted, so navigation and hard refreshes no longer drop back to the
// maintenance page.
//
// Obscurity, not security: anyone with the link gets in. Change the token if it
// ever leaks (clearing PREVIEW_KEY from localStorage locks a browser out).
//
// The typeof window guard matters beyond safety: this runs during prerendering
// in Node, where window and localStorage do not exist. Without it the build
// crashes.
//
// Delete this file at launch, along with the MAINTENANCE_MODE branch in
// src/root.tsx and src/pages/Maintenance.tsx.
// ============================================

const PREVIEW_TOKEN = 'vk-2026';
const PREVIEW_KEY = 'vk-preview';

function readUnlock(): boolean {
    if (typeof window === 'undefined') return false;

    try {
        if (new URLSearchParams(window.location.search).get('preview') === PREVIEW_TOKEN) {
            localStorage.setItem(PREVIEW_KEY, '1');
            return true;
        }
        return localStorage.getItem(PREVIEW_KEY) === '1';
    } catch {
        // Private browsing or blocked storage — fall back to the URL alone, so a
        // fresh ?preview= link still works; it just will not persist.
        return new URLSearchParams(window.location.search).get('preview') === PREVIEW_TOKEN;
    }
}

let cached: boolean | null = null;

/**
 * Client snapshot for useSyncExternalStore.
 *
 * Memoised for two reasons: React may call a snapshot getter several times per
 * render and it must be side-effect free after the first call, and the
 * localStorage write in readUnlock() should happen exactly once.
 */
export function getPreviewSnapshot(): boolean {
    if (cached === null) cached = readUnlock();
    return cached;
}

/**
 * Server/prerender snapshot. Always false, which is what makes the prerendered
 * HTML the locked state for everyone — correct, because the unlock is a
 * per-browser decision that can only be made after hydration.
 */
export function getPreviewServerSnapshot(): boolean {
    return false;
}

/** The unlock cannot change within a page load, so there is nothing to subscribe
 *  to. useSyncExternalStore still requires a subscribe function. */
export function subscribeToPreview(): () => void {
    return () => {};
}
