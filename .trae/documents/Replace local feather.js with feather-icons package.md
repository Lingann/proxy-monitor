I will replace the manual inclusion of `feather.min.js` with the `feather-icons` NPM package to resolve the source map errors and follow best practices.

### Implementation Steps

1.  **Install Dependencies**
    *   Install `feather-icons` as a runtime dependency.
    *   Install `@types/feather-icons` as a development dependency for TypeScript support.

2.  **Update Entry Point (`src/renderer/renderer-entry.ts`)**
    *   Import `feather` from `feather-icons`.
    *   Call `feather.replace()` to initialize icons (replacing the inline script in EJS).

3.  **Clean up Template (`src/renderer/templates/index.ejs`)**
    *   Remove the `<script src="../lib/feather.min.js"></script>` tag.
    *   Remove the `feather.replace()` call from the inline script (keeping `window.translations`).

4.  **Remove Legacy File**
    *   Delete `src/renderer/lib/feather.min.js`.

### Verification
*   The application should build and run without the "Failed to load source map" error.
*   Icons in the sidebar (rendered by EJS) should still appear correctly.
