I will implement the `CommonAccountInput` and `CommonPasswordInput` components by extending the existing `CommonInput` class.

### 1. Refactor `CommonInput`
- **File**: `src/renderer/templates/components/common-input/common-input.ts`
- **Change**: Modify the access modifiers of internal DOM elements (`input`, `wrapper`, `container`, etc.) and the `init` method from `private` to `protected`.
- **Reason**: To allow the new subclasses (`CommonAccountInput`, `CommonPasswordInput`) to access and manipulate the underlying elements (e.g., toggling input type for password).

### 2. Add Icon Assets
- **File**: `src/renderer/templates/components/common-input/common-input-utils.ts`
- **Action**: Add new SVG constants:
  - `ACCOUNT_ICON`: User/Profile icon.
  - `PASSWORD_ICON`: Lock icon.
  - `EYE_ICON`: Open eye icon (for showing password).
  - `EYE_OFF_ICON`: Slashed eye icon (for hiding password).

### 3. Implement `CommonAccountInput`
- **File**: `src/renderer/templates/components/common-input/common-account-input.ts`
- **Features**:
  - Extends `CommonInput`.
  - Default configuration: `type: 'text'`, `prefixIcon: ACCOUNT_ICON`, `clearable: true`.
  - Provides a simplified setup for account fields.

### 4. Implement `CommonPasswordInput`
- **File**: `src/renderer/templates/components/common-input/common-password-input.ts`
- **Features**:
  - Extends `CommonInput`.
  - Default configuration: `type: 'password'`, `prefixIcon: PASSWORD_ICON`, `suffixIcon: EYE_OFF_ICON`.
  - **Toggle Visibility**: Adds a click event listener to the suffix icon (eye) to toggle the input type between `password` and `text` and switch the icon accordingly.

### 5. Export Components
- **File**: `src/renderer/templates/components/common-input/index.ts`
- **Action**: Export the new components so they can be imported elsewhere in the application.