// ============================================
// PREVIEW ACCESS
// While MAINTENANCE_MODE is on, /?preview=vk-2026 shows the real site instead
// of the maintenance page. Share that link with the client — anyone visiting
// the plain URL still gets the maintenance page.
//
// Obscurity, not security: anyone with the link gets in. Change the token if
// it ever leaks.
// ============================================
const PREVIEW_TOKEN = 'vk-2026';

export function isPreviewUnlocked(): boolean {
  return new URLSearchParams(window.location.search).get('preview') === PREVIEW_TOKEN;
}
