I will refactor the components in `src/renderer/components` to follow the project rules (kebab-case naming, directory structure, self-contained styles, and i18n).

### 1. Structure & Files
I will move and rename the files as follows:

- `src/renderer/components/CommonInput.tsx` → `src/renderer/components/common-input/common-input.tsx`
- `src/renderer/components/CommonSearchInput.tsx` → `src/renderer/components/common-search-input/common-search-input.tsx`
- `src/renderer/components/CommonSelect.tsx` → `src/renderer/components/common-select/common-select.tsx`
- `src/renderer/components/CommonTable.tsx` → `src/renderer/components/common-table/common-table.tsx`
- `src/renderer/components/CommonTablePagination.tsx` → `src/renderer/components/common-table-pagination/common-table-pagination.tsx`
- `src/renderer/components/Icon.tsx` → `src/renderer/components/icon/icon.tsx`

For each component, I will also create a corresponding `.scss` file (e.g., `common-input.scss`) containing the styles migrated from `src/renderer/templates/components/...`.

### 2. Internationalization (I18n)
I will update `src/locales/en.json` and `src/locales/zh.json` to include missing keys:
- `common.loading`
- `common.no_results`
- `common.please_select`
- `common.no_options`
- `common.total`

Then I will update the components to use `useI18n()` instead of hardcoded strings.

### 3. Code Updates
- **Imports**: Fix relative imports between components (e.g., `CommonTable` importing `CommonTablePagination`).
- **Styles**: Import the new `.scss` files in each component.
- **Naming**: Ensure component names in `defineComponent` match the file name (optional but good practice).

### 4. Cleanup
- Remove the old files from `src/renderer/components`.
