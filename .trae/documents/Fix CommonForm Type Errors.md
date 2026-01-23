I have identified the issues causing errors in `common-form.tsx` and `component-library.tsx`:

1.  **Type Mismatch in `FormContext`**: The `validateField` method signature in `FormContext` (in `types.ts`) does not match the implementation in `useFormValidation`.
    -   `FormContext`: `(prop: string, trigger?: string) => void`
    -   `useFormValidation`: `(prop: string, cb?: (isValid: boolean, message?: string) => void) => void`
    This causes a type error in `provide(FormContextKey, ...)` in `common-form.tsx`.

2.  **Missing Properties in `FormItemRule`**: The `component-library.tsx` (via `useDemoState`) uses validation rules like `min` and `type`, which are not defined in the `FormItemRule` interface in `types.ts`. This causes type errors when passing `rules`.

3.  **Strict Emit Type in `useFormEvents`**: The `emit` parameter in `useFormEvents` might have a stricter type than what Vue's `setup` context provides, potentially causing a type mismatch.

My plan to fix these errors is:

1.  **Update `src/renderer/components/common-form/types.ts`**:
    -   Correct `FormContext.validateField` signature to match the implementation.
    -   Add `min`, `max`, `type`, `pattern`, `len` properties to `FormItemRule` interface to support standard rules (and silence type errors).

2.  **Update `src/renderer/components/common-form/composables/use-form-events.ts`**:
    -   Relax the `emit` parameter type to `(event: string, ...args: any[]) => void` to ensure compatibility.

3.  **Update `src/renderer/components/common-form/common-form-item.tsx`**:
    -   (Optional improvement) Add basic support for `min` and `max` validation rules to `CommonFormItem` so the demo works as expected, or at least ensure it doesn't crash with the new rule properties.
    -   *Note: I will primarily focus on fixing the type errors first.*

I will proceed with these changes.
