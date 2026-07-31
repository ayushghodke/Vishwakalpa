import { reactRouter } from '@react-router/dev/vite'
import { defineConfig } from 'vite'

// @vitejs/plugin-react is deliberately absent. @react-router/dev ships its own
// babel and react-refresh handling, and having both registered conflicts.
//
// manualChunks is also gone: React Router owns the Rollup output config in
// framework mode and splits chunks per route, which is a better split than the
// hand-written vendor/router/icons grouping it replaces.

export default defineConfig({
    plugins: [reactRouter()],
    server: {
        // Vite does not read PORT on its own — without this it silently picks
        // the next free port, so any tooling that assigns one gets a dead URL.
        port: Number(process.env.PORT) || 5173,
    },
    build: {
        target: 'es2020',
        sourcemap: false,
    },
})
