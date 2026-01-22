I will fix the CommonTable pagination issues by refactoring the `CommonTablePagination` component to persist the page size selector during updates and adjusting its size to match the buttons.

### 1. Fix Page Size Selector Closing on Refresh
The issue occurs because the entire pagination component is re-rendered (destroyed and recreated) whenever the table data updates. I will refactor `CommonTablePagination` to:
- Separate the DOM structure into permanent containers: one for **controls** (buttons) and one for the **select** dropdown.
- Initialize these containers in the constructor instead of the `render` method.
- In the `render` method:
    - Only rebuild the **controls** (buttons) since they change based on current page/total data.
    - **Persist** the `CommonSelect` instance. If it already exists, simply update its value using `setValue()` instead of destroying it. This ensures the dropdown state (open/closed) remains intact during data refreshes.

### 2. Fix Height Mismatch
The pagination buttons have a fixed height of `32px`, but the `CommonSelect` is currently initialized with `size: 'small'` (which is `24px`).
- I will change the `CommonSelect` initialization in `CommonTablePagination` to use `size: 'medium'` (default, `32px`).
- This will ensure the dropdown height matches the `32px` height of the pagination buttons.

### Implementation Steps
1.  **Refactor `src/renderer/templates/components/common-table/common-table-pagination.ts`**:
    - Add `controlsWrapper` and `selectWrapper` properties.
    - Initialize structure in `constructor`.
    - Modify `render` to update controls and preserve the select instance.
    - Change `CommonSelect` config to `size: 'medium'`.
