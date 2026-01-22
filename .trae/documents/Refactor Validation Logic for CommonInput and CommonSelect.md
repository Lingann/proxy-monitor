I will improve the validation logic for `CommonInput` and `CommonSelect` components as requested.

### 1. Update Type Definitions
**Files:**
- `src/renderer/templates/components/common-input/common-input-types.ts`
- `src/renderer/templates/components/common-select/common-select-types.ts`

**Changes:**
- Define `ValidateTrigger` type as `'change' | 'blur' | 'focus'`.
- Define `ValidationResult` interface as `{ isValid: boolean; message?: string }`.
- Define `Validator` interface (e.g., `InputValidator`, `SelectValidator`) containing:
  - `trigger`: `ValidateTrigger | ValidateTrigger[]`
  - `validate`: `(value: T) => ValidationResult | Promise<ValidationResult>`
- Update `InputConfig` and `SelectConfig`:
  - Replace `validateTrigger` and the old `validator` callback with the new `validator` object.
  - Remove `errorMessage` from config (as it's now returned by the validator).

### 2. Refactor CommonInput Logic
**File:** `src/renderer/templates/components/common-input/common-input.ts`

**Changes:**
- Update `bindEvents` to support:
  - Array of triggers (e.g., `['blur', 'change']`).
  - New `focus` trigger event.
- Update `validate` method to:
  - Use the new `validator.validate` function.
  - Handle the returned `{ isValid, message }` object.
  - Support async validation.
- Add public methods:
  - `setError(message: string)`: Manually set error state and message.
  - `clearError()`: Clear error state and message.

### 3. Refactor CommonSelect Logic
**File:** `src/renderer/templates/components/common-select/common-select.ts`

**Changes:**
- Update `bindEvents` to support array of triggers and `focus` event on the trigger element.
- Update `validate` method to match the new validation structure.
- Add public methods `setError(message: string)` and `clearError()`.
- Update usage of `validateValue` (likely removing the utility function in favor of in-class logic to handle the new structure).

### 4. Cleanup
**File:** `src/renderer/templates/components/common-select/common-select-utils.ts`
- Remove `validateValue` helper function if it's no longer used.