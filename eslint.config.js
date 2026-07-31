import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist', 'build', '.react-router', '.claude']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
  {
    // React Router 7 route modules export meta/links/loader/ErrorBoundary
    // alongside the default component — that is the framework contract, not an
    // accident. The react-refresh rule assumes a plain Vite SPA where a file
    // exporting anything but components breaks fast refresh, so it needs to be
    // told which named exports are legitimate here.
    files: ['src/root.tsx', 'src/routes.ts', 'src/pages/**/*.tsx'],
    rules: {
      'react-refresh/only-export-components': [
        'warn',
        {
          allowExportNames: [
            'meta',
            'links',
            'headers',
            'loader',
            'clientLoader',
            'action',
            'clientAction',
            'ErrorBoundary',
            'HydrateFallback',
            'Layout',
            'shouldRevalidate',
            'handle',
          ],
        },
      ],
    },
  },
  {
    // Build scripts run in Node, not the browser.
    files: ['scripts/**/*.mjs'],
    languageOptions: {
      globals: globals.node,
    },
  },
])
