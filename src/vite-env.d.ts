/// <reference types="vite/client" />

interface ImportMetaEnv {
    /**
     * Forces maintenance mode either way, overriding the DEV/PROD default.
     * Values are strings — Vite injects env vars verbatim.
     *
     *   VITE_MAINTENANCE_MODE=false npm run build   build the real site to verify content
     *   VITE_MAINTENANCE_MODE=true  npm run dev     work on the maintenance page
     *
     * See src/constants/config.ts.
     */
    readonly VITE_MAINTENANCE_MODE?: 'true' | 'false';
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
