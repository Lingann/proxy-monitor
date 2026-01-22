# Refactor CommonTable Component Plan

I will refactor the `CommonTable` component to be modular, functional, and strictly follow the project's coding and styling rules.

## 1. Directory Structure & File Split

The component will be split into multiple files within `src/renderer/templates/components/common-table/` to separate responsibilities:

-   **`index.ts`**: Entry point, exports the main `CommonTable` class and types.
-   **`common-table.ts`**: Main coordinator class. Initializes the component and orchestrates sub-modules.
-   **`common-table-types.ts`**: Definition of interfaces (`Column`, `TableOptions`, `TableState`, etc.).
-   **`common-table-header.ts`**: Handles rendering and events for the table header (Sorting, Filtering, Drag & Drop).
-   **`common-table-body.ts`**: Handles rendering of the table body (Rows, Cells, Custom Renderers, Empty State).
-   **`common-table-pagination.ts`**: Handles rendering and events for pagination.
-   **`common-table-data-processor.ts`**: Pure functions for data manipulation (Sorting, Filtering, Pagination logic).
-   **`common-table.css`**: Styles using strict kebab-case CSS variables and BEM naming.

## 2. Technical Implementation Details

### A. Functional Programming & Data Processing
-   **`common-table-data-processor.ts`** will contain pure functions:
    -   `filterData<T>(data: T[], filters: Record<string, string>): T[]`
    -   `sortData<T>(data: T[], sortState: SortState): T[]`
    -   `paginateData<T>(data: T[], page: number, pageSize: number): T[]`
-   This ensures logic is testable and isolated from the UI.

### B. Modular Renderers
-   **Header**: Will manage `<thead>`.
    -   Supports **Fixed Header** via `position: sticky`.
    -   Implements **Column Drag & Drop** using the native Drag and Drop API, encapsulated in this module.
    -   Renders **Filter Inputs** and **Sort Icons**.
-   **Body**: Will manage `<tbody>`.
    -   Supports **Custom Cell Rendering** (`render` callback).
    -   Supports **Loading State** (Skeleton UI or Spinner).
    -   Handles Row Click events.
-   **Pagination**: Will manage the footer pagination controls.
    -   Renders standard Next/Prev/Page Info controls.

### C. Theme & Styling
-   **CSS Variables**: Will use strict "Triptych Notation" (e.g., `--common-table-color-bg`, `--common-table-size-font`).
-   **Theme Adaptation**: Variables will be defined to work with the system's light/dark modes (relying on global theme classes or media queries if necessary, but primarily consuming global theme variables).
-   **BEM Naming**: Strictly follow BEM (e.g., `common-table__header`, `common-table__cell--active`).

### D. Features
1.  **Generic Configuration**: Fully typed `TableOptions<T>`.
2.  **Fixed Header**: CSS implementation.
3.  **Loading**: Overlay with Spinner or Skeleton rows.
4.  **I18n**: Integration with `../../../utils/i18n-helper.js`.
5.  **ESNext**: Use of ES Modules, Arrow Functions, etc.

## 3. Implementation Steps

1.  **Create `common-table-types.ts`**: Define all interfaces.
2.  **Create `common-table-data-processor.ts`**: Implement pure data logic.
3.  **Create Render Modules**:
    -   `common-table-pagination.ts`
    -   `common-table-header.ts` (with DnD logic)
    -   `common-table-body.ts`
4.  **Rewrite `common-table.ts`**: Assemble the modules.
5.  **Update `common-table.css`**: Apply new naming conventions and styles.
6.  **Verify**: Ensure no regressions and all new features work.

