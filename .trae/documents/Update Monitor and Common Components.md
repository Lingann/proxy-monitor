# Plan: Update Monitor Page, CommonSelect, and CommonTable

I will implement the requested changes to the Monitor page, CommonSelect component, and CommonTable pagination.

## 1. Remove Selector from Monitor Page
**Goal**: Remove the test "Common Select" instance from the Monitor page.
- **File**: `src/renderer/templates/pages/monitor/monitor.ejs`
  - Remove the `<div id="test-select-container">` and its surrounding markup.
- **File**: `src/renderer/templates/pages/monitor/monitor.ts`
  - Remove the initialization code for `test-select-container` in `initMonitor`.

## 2. Add Size Support to CommonSelect
**Goal**: Support 'small', 'medium', and 'large' sizes in `CommonSelect`.
- **File**: `src/renderer/templates/components/common-select/common-select-types.ts`
  - Update `SelectConfig` interface to include optional `size: 'small' | 'medium' | 'large'`.
- **File**: `src/renderer/templates/components/common-select/common-select.ts`
  - In the constructor, apply a modifier class (e.g., `is-small`, `is-medium`, `is-large`) to the wrapper element based on the config.
- **File**: `src/renderer/templates/components/common-select/common-select.css`
  - Add CSS variables and rules for the size modifiers:
    - **Small**: Height 24px, Font 12px
    - **Medium (Default)**: Height 32px, Font 14px
    - **Large**: Height 40px, Font 16px

## 3. Update CommonTable Pagination
**Goal**: Use `CommonSelect` for page size, move it to the far right, and clear the left side.
- **File**: `src/renderer/templates/components/common-table/common-table-pagination.ts`
  - Import `CommonSelect`.
  - Refactor `render` method:
    - Remove the "Info Text" (e.g., "1-10 / 100").
    - Remove the native `<select>` element.
    - Set the main container to `justify-content: flex-end` (align right).
    - Render the **Pagination Controls** (Prev/Numbers/Next) first.
    - Render the **Page Size Selector** using `CommonSelect` (with 'small' or 'medium' size) to the right of the controls.
    - Ensure proper spacing between controls and selector.
- **File**: `src/renderer/templates/components/common-table/common-table.css`
  - Adjust pagination styles if necessary to support the new layout (e.g., `gap`).

## Verification
- Verify the Monitor page no longer shows the test selector.
- Verify the Table Pagination:
  - Is aligned to the right.
  - Has no text on the left.
  - Uses the custom `CommonSelect` dropdown for page size.
  - Changes page size correctly when selected.
