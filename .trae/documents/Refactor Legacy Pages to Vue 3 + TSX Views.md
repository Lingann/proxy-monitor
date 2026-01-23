I will refactor the legacy pages from `src/renderer/templates/pages` into modern Vue 3 + TSX views in `src/renderer/views`, following the project's strict coding and naming conventions.

### 1. Infrastructure Setup
-   **Router Setup**: Create `src/renderer/router/index.ts` to configure `vue-router` with routes for `monitor`, `settings`, and `component-library`.
-   **Root Component**: Create `src/renderer/app.tsx` as the main entry component containing the `<RouterView />` and global layout structure.
-   **Entry Point Update**: Modify `src/renderer/renderer-entry.ts` to mount the Vue application instead of executing legacy `init` functions.

### 2. Page Refactoring (Vue + TSX)
I will recreate the following pages in `src/renderer/views` using the "Component + Composables" architecture:

#### A. Monitor Page (`src/renderer/views/monitor/`)
-   **View**: `monitor.tsx` (Replaces `monitor.ejs`)
    -   Implements the dashboard layout.
    -   Integrates `CommonTable` for the process list.
    -   Integrates `CommonSearchInput` for filtering.
    -   Uses a `div` ref for the ECharts container.
-   **Logic (Composables)**:
    -   `composables/use-monitor-data.ts`: Handles data fetching from `electronAPI`.
    -   `composables/use-monitor-chart.ts`: Manages ECharts initialization and updates.
    -   `composables/use-monitor-table.ts`: Manages table columns and state.
-   **Styles**: `monitor.module.scss` (Migrated from `monitor.css`).

#### B. Settings Page (`src/renderer/views/settings/`)
-   **View**: `settings.tsx` (Replaces `settings.ejs`)
    -   Implements the settings form layout.
    -   Uses `CommonSelect` for language selection.
-   **Logic (Composables)**:
    -   `composables/use-settings-state.ts`: Handles loading and saving settings via `electronAPI`.
-   **Styles**: `settings.module.scss`.

#### C. Component Library Page (`src/renderer/views/component-library/`)
-   **View**: `component-library.tsx` (Replaces `component-library.ejs`)
    -   Demonstrates all refactored components (`CommonForm`, `CommonInput`, `CommonSelect`, `CommonTable`).
-   **Logic (Composables)**:
    -   `composables/use-demo-state.ts`: Manages the state for interactive demos.
-   **Styles**: `component-library.module.scss`.

### 3. Implementation Details & Standards
-   **Vue**: Use `defineComponent` and TSX for all components.
-   **State**: Use `ref`/`reactive` within composables; keep views stateless where possible.
-   **Naming**: Strictly follow `kebab-case` for files and directories.
-   **Styles**: Use CSS Modules (`.module.scss`) and BEM naming convention.
-   **Cleanup**: Remove the old `src/renderer/templates/pages` directory after verification.
