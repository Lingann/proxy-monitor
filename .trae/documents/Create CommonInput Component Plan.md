# Create CommonInput Component

I will create a new `CommonInput` component in `src/renderer/templates/components/common-input/` that mirrors the architecture and style of `CommonSearchInput` and `CommonSelect`.

## Directory Structure
- `src/renderer/templates/components/common-input/`
  - `index.ts`: Export file.
  - `common-input.ts`: Main class controller.
  - `common-input-types.ts`: TypeScript interfaces.
  - `common-input-render.ts`: DOM creation functions.
  - `common-input-utils.ts`: Utility helpers.
  - `common-input.css`: Styles using BEM and CSS variables.

## Technical Implementation

### 1. Types (`common-input-types.ts`)
Define interfaces for configuration and state:
- `InputSize`: 'small' | 'medium' | 'large'
- `InputConfig`:
  - `placeholder?`: string
  - `disabled?`: boolean
  - `size?`: InputSize
  - `clearable?`: boolean
  - `prefixIcon?`: string (SVG HTML)
  - `suffixIcon?`: string (SVG HTML)
  - `defaultValue?`: string
  - `type?`: 'text' | 'password' | 'number'
  - `validator?`: (value: string) => boolean | Promise<boolean>
  - `errorMessage?`: string
  - `onChange?`: (value: string) => void
  - `onFocus?`: (e: FocusEvent) => void
  - `onBlur?`: (e: FocusEvent) => void
  - `onEnter?`: (value: string) => void

### 2. Render Logic (`common-input-render.ts`)
Pure functions to generate DOM elements:
- `createContainer()`: Main wrapper.
- `createInputWrapper()`: Container for input and icons.
- `createIcon(html, type)`: Helper for prefix/suffix/clear icons.
- `createInputElement()`: The actual `<input>` tag.
- `createErrorMessage()`: Container for validation errors.

### 3. Controller (`common-input.ts`)
The `CommonInput` class will manage:
- **Initialization**: Render initial state, bind events.
- **State Management**: Track value, focus state, validity.
- **Events**:
  - `input`: Update value, toggle clear icon visibility, trigger `onChange`.
  - `focus`/`blur`: Toggle `.is-focused` class, trigger callbacks.
  - `keydown`: Listen for Enter key.
  - `click` (on clear icon): Clear value.
- **Validation**: Implement `validate()` method to check value against `validator` and show/hide error message.
- **Public API**: `setValue`, `getValue`, `setDisabled`, `validate`, `focus`, `blur`.

### 4. Styles (`common-input.css`)
- Use CSS variables for theming (consistent with existing components).
- Support sizes (`small`, `medium`, `large`).
- States: `:hover`, `:focus-within`, `.is-error`, `.is-disabled`.
- Layout: Flexbox for icon and input alignment.

## Verification
1.  **Static Analysis**: Ensure strict type checking and no lint errors.
2.  **Manual Verification**: I will create a temporary test snippet in the plan to demonstrate how to instantiate it, ensuring all features (icons, validation, events) work as expected.
