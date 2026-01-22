I will implement the requested features for `CommonInput` and `CommonSelect` components.

### CommonInput
I will update the `CommonInput` component to support `maxLength`, `trim`, and ensure manual control methods are available.

1.  **Update Types** (`common-input-types.ts`):
    *   Add `maxLength?: number` to `InputConfig`.
    *   Add `trim?: boolean` to `InputConfig` (default false).

2.  **Update Renderer** (`common-input-render.ts`):
    *   In `createInputElement`, set the `maxLength` attribute on the input element if it is defined in the configuration.

3.  **Update Logic** (`common-input.ts`):
    *   In `bindEvents`, modify the `blur` event handler:
        *   If `config.trim` is enabled, automatically trim whitespace from the input value on blur.
        *   If the value changes due to trimming, update the state and trigger the `onChange` callback.
    *   (Note: `setValue` and `clear` methods already exist in `CommonInput` and will work as requested).

### CommonSelect
I will update the `CommonSelect` component to support manual clearing.

1.  **Update Logic** (`common-select.ts`):
    *   Add a new public method `clear()`:
        *   This method will call `this.setValue(null)` to reset the selection to the placeholder state.
    *   (Note: `setValue` method already exists in `CommonSelect` and works as requested).

### Verification
*   I will verify that `maxLength` prevents typing beyond the limit.
*   I will verify that `trim` removes whitespace on blur.
*   I will verify that `setValue` and `clear` work programmatically for both components.
