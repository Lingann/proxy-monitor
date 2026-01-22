I will reorganize the icons into a dedicated `components/common-icons/` directory as requested.

### 1. Create Directory
- `src/renderer/templates/components/common-icons/`

### 2. Extract Icons to New Files
I will create the following files in `common-icons/`, each containing a single exported icon constant:

**From `common-input-utils.ts`:**
- `input-clear-icon.ts` (was `DEFAULT_CLEAR_ICON`)
- `account-icon.ts` (was `ACCOUNT_ICON`)
- `password-icon.ts` (was `PASSWORD_ICON`)
- `eye-icon.ts` (was `EYE_ICON`)
- `eye-off-icon.ts` (was `EYE_OFF_ICON`)

**From `common-search-input-render.ts`:**
- `search-icon.ts`
- `search-clear-icon.ts`

**From `common-table-pagination.ts`:**
- `pagination-prev-icon.ts`
- `pagination-next-icon.ts`

**From `common-table-body.ts`:**
- `empty-state-icon.ts`

**From `common-table-header.ts`:**
- `sort-asc-icon.ts`
- `sort-desc-icon.ts`
- `sort-default-icon.ts`

### 3. Create Barrel File
- Create `src/renderer/templates/components/common-icons/index.ts` to export all icons for convenient usage.

### 4. Update References
I will update the following files to import icons from the new `common-icons` directory and remove the old inline definitions:
- `common-input/common-input-utils.ts` (remove definitions)
- `common-input/common-account-input.ts` (update import)
- `common-input/common-password-input.ts` (update import)
- `common-input/common-input-render.ts` (update import)
- `common-search-input/common-search-input-render.ts`
- `common-table/common-table-pagination.ts`
- `common-table/common-table-body.ts`
- `common-table/common-table-header.ts`