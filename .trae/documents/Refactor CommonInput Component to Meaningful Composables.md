I will refactor the `common-input` component to comply with Rule 18 and Rule 19 by extracting complex logic into specific, meaningful composables.

### Plan

1.  **Create `composables/use-input-config.ts`**:
    *   Extract the configuration merging logic and validation trigger computation.
    *   **Goal**: Separate configuration logic from the component view.

2.  **Create `composables/use-input-state.ts`**:
    *   Manage `inputRef` and `isFocused` state.
    *   Expose `focus` and `blur` methods.
    *   **Goal**: Isolate DOM ref and focus state management.

3.  **Create `composables/use-input-events.ts`**:
    *   Implement event handlers: `handleInput`, `handleFocus`, `handleBlur`, `handleKeydown`, `handleClear`.
    *   Handle interactions like emitting events, triggering validation, and trimming values.
    *   **Goal**: Move complex event handling logic out of the TSX file.

4.  **Refactor `common-input.tsx`**:
    *   Import and use the new composables.
    *   Keep the component focused on rendering and wiring up the composables.
    *   Ensure all functionality (validation, events, rendering) remains consistent.

### Verification

*   I will verify that the component logic is correctly distributed across the composables.
*   I will ensure no "generic" composables (like `use-common-input.ts`) are created, strictly following Rule 18.
*   I will ensure composables do not call each other, following Rule 17.
