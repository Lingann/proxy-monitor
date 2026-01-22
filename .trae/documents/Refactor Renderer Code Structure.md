I will refactor the renderer code to modularize it by component and page, as requested.

### 1. Create Shared Utility
*   **Create** `src/renderer/utils/i18n-helper.ts`:
    *   Move the translation function `t()` here to be shared across modules.

### 2. Modularize Components & Pages
*   **Create** `src/renderer/templates/components/sidebar/sidebar.ts`:
    *   Move the navigation and sidebar logic here.
    *   Export an `initSidebar()` function.
*   **Create** `src/renderer/templates/pages/monitor/monitor.ts`:
    *   Move the network monitor logic, including `analyzeConnections`, `updateProcessTable`, and event handlers.
    *   Export an `initMonitor()` function.
*   **Create** `src/renderer/templates/pages/settings/settings.ts`:
    *   Move the settings loading and saving logic here.
    *   Export an `initSettings()` function.

### 3. Update Entry Point
*   **Update** `src/renderer/renderer-entry.ts`:
    *   Remove the moved logic.
    *   Import and call `initSidebar()`, `initMonitor()`, and `initSettings()`.

### 4. Verification
*   I will verify that all imports are correct and that the application structure follows the new modular design.
