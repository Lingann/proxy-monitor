I will refactor the `CommonTablePagination` component to follow the architecture of `CommonInput`, including file splitting, logic extraction to composables, and strict TypeScript typing.

### Directory Structure
```
src/renderer/components/common-table-pagination/
├── common-table-pagination.tsx       # Main component (View)
├── common-table-pagination.scss      # Styles (Existing)
├── types.ts                          # Type definitions
└── composables/                      # Logic extraction
    ├── use-pagination-state.ts       # Computed state (totalPages)
    └── use-pagination-events.ts      # Event handlers (page/size changes)
```

### Implementation Steps

1.  **Create `types.ts`**:
    *   Define `PaginationProps` interface matching the existing props.
    *   Define event callback types.

2.  **Create `composables/use-pagination-state.ts`**:
    *   Extract the `totalPages` computation logic.
    *   Return `totalPages` as a computed ref.

3.  **Create `composables/use-pagination-events.ts`**:
    *   Extract `handlePageChange` and `handleSizeChange` logic.
    *   Accept `props` and `totalPages` as dependencies.
    *   Implement boundary checks and callback invocations (`onUpdateCurrentPage`, `onChange`, etc.).

4.  **Refactor `common-table-pagination.tsx`**:
    *   Update the component to use the new composables.
    *   Maintain the existing JSX structure and class names.
    *   Ensure strict type safety and add Chinese comments `/* ... */` following the project norms.
    *   Keep `CommonSelect` integration for page size selection.

5.  **Review & Verify**:
    *   Ensure all functionality (navigation, size change, disabling buttons) is preserved.
    *   Verify code style matches `CommonInput` (imports, spacing, comments).
