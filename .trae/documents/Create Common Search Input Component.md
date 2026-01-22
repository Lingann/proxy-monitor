# Create Common Search Input Component

I will create a new `common-search-input` component in `src/renderer/templates/components/common-search-input` that meets all your requirements, including Fuse.js integration, modern styling, and modular architecture.

## 1. Preparation
1.  **Download Fuse.js**: Download the ESM version of Fuse.js (`fuse.esm.min.js`) to `src/renderer/lib/` so it can be imported directly as a module.

## 2. Component Structure (`src/renderer/templates/components/common-search-input/`)
I will create the following files:
*   **`common-search-input-types.ts`**: Define interfaces for `SearchInputConfig`, `SearchOption`, `SearchState`, etc.
*   **`common-search-input.css`**: Styles following BEM naming, with variables for easy customization (height, colors, shadows). Includes animations for the dropdown.
*   **`common-search-input-render.ts`**: Pure functions to create DOM elements (Container, Input Wrapper, Icons, Dropdown, Option items).
*   **`common-search-input-utils.ts`**: Helper functions for positioning (reusing the logic from `common-select`), debouncing, and highlighting search results.
*   **`common-search-input.ts`**: The main class that orchestrates everything. It will handle:
    *   Fuse.js initialization.
    *   Event listeners (input, focus, blur, click outside).
    *   State management (open/close, selected index).
    *   Search logic (debounced execution, results rendering).
*   **`index.ts`**: Export the component.

## 3. Implementation Details
*   **Modern Design**:
    *   Use CSS variables consistent with `common-select` (e.g., `--search-height`, `--search-bg`).
    *   Add transitions for border colors, box-shadows on focus.
    *   Implement "Slide Down/Up" animations for the dropdown.
*   **Functionality**:
    *   **Input**: Standard input with placeholder.
    *   **Icons**: Support `prefixIcon` (HTML string or Element) and `clearIcon` (visible on hover when value exists).
    *   **Dropdown**:
        *   Only shows if `searchable` is true (default can be false or true based on config).
        *   Auto-positioning (Top/Bottom) based on available space.
        *   Scrollbar for overflow (max-height).
    *   **Search**:
        *   Use Fuse.js for fuzzy search.
        *   Ignore leading/trailing spaces.
        *   **Highlighting**: Wrap matched characters in `<span class="is-highlight">`.
*   **Usage**:
    *   The component will be instantiated like `new CommonSearchInput(container, config)`.

## 4. Verification
*   I will verify the component creation.
*   (Optional) I can add a temporary test in `monitor.ts` to ensure it renders correctly if you wish, or just leave it ready for integration.

## 5. Next Steps
*   After confirmation, I will proceed with downloading the library and writing the code.
