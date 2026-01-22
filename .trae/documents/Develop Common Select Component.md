I will develop a new `CommonSelect` component in `src/renderer/templates/components/common-select/` to replace the existing dropdown mechanism. This component will be built using TypeScript and native DOM APIs, strictly following the project's modularization and naming rules.

### Directory Structure
`src/renderer/templates/components/common-select/`
- `index.ts`: Entry point exporting the module.
- `common-select.ts`: Main component class (Controller).
- `common-select-types.ts`: TypeScript interfaces and types.
- `common-select-utils.ts`: Pure functions for logic (validation, positioning calculation).
- `common-select-render.ts`: Functional modules for DOM element creation (View).
- `common-select.css`: Styles and animations.

### Implementation Details

1.  **Functional & Modular Design**:
    -   **State & Logic**: Separated into `common-select-utils.ts` (e.g., `validateValue`, `calculatePosition`).
    -   **Rendering**: DOM creation logic split into `common-select-render.ts` using pure functions like `createTrigger`, `createOption`.
    -   **Controller**: `CommonSelect` class orchestrates state, events, and DOM updates.

2.  **Key Features**:
    -   **Data-Driven**: Accepts `options: { label, value, ... }[]`.
    -   **Interactive**: Custom styled trigger with hover/active states, and a dropdown list.
    -   **Smart Positioning**: Automatically detects available space to open upwards or downwards.
    -   **Validation**: Built-in support for custom validation functions. Displays error states and messages visually.
    -   **Configurable**: Supports `width`, `maxHeight` (via max items), and custom styles.
    -   **Events**: Emits `change`, `focus`, `blur` events.

3.  **Visuals (CSS)**:
    -   Use CSS variables for theming.
    -   Implement transition animations for the dropdown (fade/slide).
    -   Custom scrollbar for the options list.

4.  **Verification**:
    -   I will verify the component by creating a temporary test code in the `monitor.ts` page (or a dedicated test file if preferred, but usually manual verification in a page is faster for UI) to demonstrate the dropdown's functionality (rendering, selection, validation).

### Step-by-Step Plan
1.  **Define Types**: Create `common-select-types.ts` to define `SelectConfig`, `SelectOption`, etc.
2.  **Implement Logic**: Create `common-select-utils.ts` for functional logic and `common-select-render.ts` for DOM generation.
3.  **Style**: Create `common-select.css` with modern styling and variables.
4.  **Assemble**: Implement the `CommonSelect` class in `common-select.ts`.
5.  **Export**: Create `index.ts`.
