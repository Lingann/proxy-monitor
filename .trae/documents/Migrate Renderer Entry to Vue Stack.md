I will migrate the renderer entry point to use the Vue stack by performing the following steps:

1.  **Update `src/renderer/renderer-entry.ts`**:
    *   Replace the existing legacy template initialization code with Vue bootstrapping logic.
    *   Import `createApp` from `vue`, `App` from `./App`, `router` from `./router`, and `createI18n` from `vue-i18n`.
    *   Import locales from `../locales/*.json` and styles from `./app-styles.css`.
    *   Implement the async initialization function to fetch settings (locale) from `window.electronAPI`.
    *   Initialize `i18n` and mount the Vue application to `#app`.

2.  **Update `src/renderer/index.html`**:
    *   Change the entry script reference from `/src/renderer/main.ts` to `/src/renderer/renderer-entry.ts`.

3.  **Cleanup**:
    *   Delete `src/renderer/main.ts` as its logic will be moved to `renderer-entry.ts`.

This will completely replace the old `templates`-based rendering with the new Vue 3 + TSX architecture using `App.tsx` and the views in `src/renderer/views`.