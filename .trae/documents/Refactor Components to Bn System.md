I will refactor the `CommonForm` and `CommonFormItem` components to follow the requested strict modularization, composable-based architecture, and event handling standards.

### 1. Structure Reorganization

* **New Directory**: Create `src/renderer/components/common-form/sub-components/` to house `CommonFormItem`.

* **New Directory**: Create `src/renderer/components/common-form/composables/item/` for `CommonFormItem` specific logic.

### 2. Logic Extraction (Composables)

I will extract logic from `CommonFormItem.tsx` into dedicated composables to reduce component complexity:

* **`use-form-item-config.ts`**: Handles context injection (`FormContextKey`) and basic prop resolution.

* **`use-form-item-state.ts`**: Manages `validateState`, `validateMessage`, and computes `fieldValue`.

* **`use-form-item-validation.ts`**: Contains `getRules`, `validate`, `resetField`, `clearValidate`, and lifecycle registration/unregistration.

* **`use-form-item-render.ts`**: Computes styles (`labelStyle`), classes, and display logic (`isRequired`, `shouldShowError`).

### 3. Refactoring `CommonForm` (Removing Emits)

* **Props Update**: Add `onSubmit` and `onReset` props to `CommonForm`.

* **Logic Update**: Modify `use-form-events.ts` to accept these callbacks directly instead of using `emit`.

* **Component Update**: Remove `emits` option from `CommonForm.tsx`.

### 4. Refactoring `CommonFormItem`

* **Move File**: Move `common-form-item.tsx` to `sub-components/common-form-item.tsx`.

* **Implementation**: Rewrite the component to use the new composables, resulting in a clean, declarative view layer.

### 5. Cleanup

* Update `src/renderer/components/common-form/index.ts` to export `CommonFormItem` from its new location.

