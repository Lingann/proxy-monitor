I will implement the `common-search-input` component as requested.

### 1. Download Fuse.js Library
- Download `fuse.js` (v7.1.0) from `https://cdn.jsdelivr.net/npm/fuse.js@7.1.0/dist/fuse.min.js`
- Save it to `src/renderer/lib/fuse.js`.

### 2. Create Component Structure
I will create a new directory `src/renderer/templates/components/common-search-input` with the following files:

- **`common-search-input-types.ts`**: Define interfaces for `SearchInputConfig` (options, placeholder, styles, callbacks) and `SearchInputOption` (label, value, original data).
- **`common-search-input-utils.ts`**: 
    - Implement a `FuseWrapper` class to handle Fuse.js initialization and searching.
    - Add utility functions for positioning the dropdown (auto-detect up/down direction).
- **`common-search-input-render.ts`**: 
    - Implement DOM generation for the input container, search icon, clear icon, and dropdown list.
    - Handle HTML escaping and highlighting of search terms in results.
- **`common-search-input.ts`**: 
    - Main class orchestrating the component.
    - Manage state (open/closed, loading, active option).
    - Bind events (input, focus, blur, click outside, clear button).
    - Integrate `FuseWrapper` to filter results based on input.
- **`common-search-input.css`**: 
    - Style the input box with modern hover/focus effects.
    - Style the dropdown with scrollbars, item hover states, and "no results" state.
    - Ensure responsive sizing based on configuration.
- **`index.ts`**: Export the module.

### 3. Implementation Details
- **Features**:
    - **Search**: Real-time fuzzy search using Fuse.js, ignoring leading/trailing spaces.
    - **Dropdown**: Auto-positioning (up/down), scrollable list with max height.
    - **UI/UX**: Search icon (left), Clear icon (right, shows on hover + content), Highlighted matches.
    - **Events**: Expose `onSearch`, `onSelect`, `onClear` callbacks.
    - **Configuration**: Allow setting `width`, `height`, `maxItems`, `fuseOptions`.

### 4. Verification
- Since I cannot run the UI to verify visually, I will ensure the code compiles without errors and strictly follows the project's structure and naming conventions.
- I will verify the file existence and content after creation.