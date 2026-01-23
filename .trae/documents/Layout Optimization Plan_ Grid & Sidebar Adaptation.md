I will optimize the layout of `src/renderer/App.tsx` and `src/renderer/app-styles.css` to use CSS Grid, ensuring a robust structure with a fixed-width sidebar and a fluid main content area.

### Plan Steps
1.  **Analyze & Fix Class Mismatch**:
    *   Identify that `App.tsx` uses the class `.main-content`, but `app-styles.css` defines `.content-area`.
    *   **Decision**: Update `app-styles.css` to use `.main-content` to match the component's semantic naming.

2.  **Implement Grid Layout**:
    *   Modify `.app-container` in `src/renderer/app-styles.css` to use `display: grid`.
    *   Set `grid-template-columns: var(--sidebar-width) 1fr` to strictly define the sidebar width and let the content area fill the remaining space.
    *   This ensures the "width contrast" and adaptability requested.

3.  **Clean up Styles**:
    *   Remove the explicit `width` property from `.sidebar` in `app-styles.css` (as it's now controlled by the Grid container).
    *   Ensure `.main-content` retains `overflow-y: auto` for independent scrolling.

### Verification
*   The layout will be verified by code review of the changes, ensuring the structure matches standard CSS Grid patterns for Sidebar + Content layouts.
