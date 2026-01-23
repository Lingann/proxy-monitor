# Refactor CommonSearchInput Component

I will refactor `src/renderer/components/common-search-input` to match the architecture of `common-input`, improving maintainability, type safety, and code separation.

## Directory Structure
```
src/renderer/components/common-search-input/
├── composables/
│   ├── use-search-input-config.ts    # Config merging and defaults
│   ├── use-search-input-state.ts     # UI state (open, active index, refs)
│   ├── use-search-input-data.ts      # Fuse.js logic and option filtering
│   └── use-search-input-events.ts    # Event handlers (input, keydown, clear)
├── utils/
│   └── index.ts                      # Helpers (e.g., renderIcon)
├── types.ts                          # Type definitions
├── common-search-input.scss          # Styles (existing)
└── common-search-input.tsx           # Main component (assembly)
```

## Implementation Steps

### 1. Define Types
Create `types.ts` to define `SearchInputOption`, `SearchInputConfig`, and `SearchInputProps`.
- Extract interfaces from the current file.
- Align `prefixIcon` type with `CommonInput` (`Component | VNode`).
- Remove callback functions from `SearchInputConfig` (prefer Props).

### 2. Create Utilities
Create `utils/index.ts`.
- Implement `renderIcon` helper (similar to `common-input`) to support flexible icon rendering.

### 3. Implement Composables
- **`use-search-input-config.ts`**: Handle `props.config` merging with defaults (width, size, clearable, etc.).
- **`use-search-input-state.ts`**: Manage `isOpen`, `activeOptionIndex`, `query` (sync with `modelValue`), `inputRef`, and `containerRef`. Handle click-outside logic here.
- **`use-search-input-data.ts`**: Initialize `Fuse.js` based on options. Provide reactive `filteredOptions` based on the current `query`.
- **`use-search-input-events.ts`**: Implement interaction logic:
    - `handleInput`: Update query, trigger search.
    - `handleKeydown`: Navigate dropdown (Up/Down/Enter/Esc).
    - `handleSelect`: Select option, update model, close dropdown.
    - `handleClear`: Clear query and model.

### 4. Assemble Component
Refactor `common-search-input.tsx`:
- Import all composables.
- Setup logic using the "Composition API" pattern.
- Keep the JSX clean, focusing on layout and binding.
- Ensure `useI18n` is used for localization.

### 5. Cleanup
- Remove the old monolithic implementation.
- Ensure strict typing and linting compliance.
