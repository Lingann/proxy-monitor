I will fix the missing imports and remaining hardcoded SVG strings in the `common-table` components.

### 1. Fix `common-table-body.ts`
- Add `import { EMPTY_STATE_ICON } from '../common-icons/index.js';`.

### 2. Fix `common-table-pagination.ts`
- Add `import { PAGINATION_PREV_ICON, PAGINATION_NEXT_ICON } from '../common-icons/index.js';`.
- Replace the hardcoded SVG string for the **Previous** button with `PAGINATION_PREV_ICON`.
- Replace the hardcoded SVG string for the **Next** button with `PAGINATION_NEXT_ICON`.

### 3. Fix `common-table-header.ts`
- Add `import { SORT_ASC_ICON, SORT_DESC_ICON, SORT_DEFAULT_ICON } from '../common-icons/index.js';`.
- Remove the redundant hardcoded SVG assignment (line 63) and ensure `SORT_DEFAULT_ICON` is used for the neutral state.
- Ensure `SORT_ASC_ICON` and `SORT_DESC_ICON` are used for the active sort states (which seem to have been partially replaced or reverted, so I will ensure they are correct).