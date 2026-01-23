I will refactor the `CommonTable` component to follow the `CommonInput` architecture, ensuring strict typing, logic separation, and code style compliance.

### 1. File Structure
The `src/renderer/components/common-table` directory will be reorganized:
- `types.ts`: Definitions for `TableColumn`, `TableConfig`, `TablePagination`, etc.
- `composables/`:
  - `use-table-config.ts`: Handles default props and configuration merging.
  - `use-table-state.ts`: Manages sorting state (`sortKey`, `sortDirection`) and pagination state (`currentPage`, `pageSize`).
  - `use-table-data.ts`: Handles data processing (sorting and pagination logic).
  - `use-table-events.ts`: Manages event handlers (`handleSort`, pagination updates).
- `common-table.tsx`: Main component file wiring the composables.
- `common-table.scss`: Styles using BEM naming and CSS variables.

### 2. Implementation Details

#### **Types (`types.ts`)**
- Define generic `TableColumn<T>` and `TableConfig<T>`.
- Strict typing for sort directions and pagination options.

#### **Composables**
- **`use-table-config`**: Merges default props (e.g., default pagination settings) with user-provided props.
- **`use-table-state`**:
  - Manages `sortKey` and `sortDirection`.
  - Manages `currentPage` and `pageSize` (syncing with props if needed).
- **`use-table-data`**:
  - `processedData`: Computes sorted data based on state.
  - `paginatedData`: Slices data based on pagination state.
- **`use-table-events`**:
  - `handleSort`: Toggles sort direction or changes sort key.
  - `handlePageChange`: Updates current page.

#### **Component (`common-table.tsx`)**
- Use `defineComponent` with TSX.
- Integrate all composables.
- Replace `emit` with prop callbacks (if any new events are added, though current implementation relies on internal state/props).
- Maintain existing functionality: Sorting, Pagination, Custom Column Rendering.

#### **Styles (`common-table.scss`)**
- Ensure all CSS variables follow the kebab-case convention (e.g., `--common-table-bg`).
- Use BEM methodology for class names.

### 3. Verification
- Verify that sorting works as expected.
- Verify that pagination works correctly.
- Ensure strict type safety without `any` (where possible).
