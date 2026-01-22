I will resolve the `Uncaught ReferenceError: require is not defined` and implement the ES module specification as requested by converting the project to use native ES Modules (ESM).

### 1. Configure Project for ESM
- **Update `package.json`**: Add `"type": "module"` to treat all `.js` files as ES modules.
- **Update `tsconfig.json`**: Change `"module"` and `"moduleResolution"` to `"NodeNext"` to ensure TypeScript emits correct ESM code and enforces extension usage.

### 2. Update Renderer Process (Frontend)
- **Update `index.ejs`**:
    - Change `<script src="../renderer-entry.js">` to `<script type="module" src="../renderer-entry.js">`.
    - Remove the CommonJS shim (`var exports = {}`).
- **Refactor Renderer Code**:
    - Update imports in `src/renderer/renderer-entry.ts` and other renderer files to include `.js` extensions (required for native browser ESM).
    - Example: `import ... from './templates/components/sidebar'` → `import ... from './templates/components/sidebar.js'`.

### 3. Update Main Process (Backend)
- **Refactor `src/main/index.ts`**:
    - Replace `const ejs = require('electron-ejs')` with `import`.
    - Replace `__dirname` with the ESM equivalent using `import.meta.url`.
    - Update all local imports to include `.js` extensions.

### 4. Update Core & Shared Modules
- Scan and update imports in `src/core`, `src/modules`, `src/preload`, and `src/shared` to include `.js` extensions to ensure they work in the ESM environment.
