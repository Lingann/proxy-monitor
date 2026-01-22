I will implement a non-intrusive Form system and a Component Library page to demonstrate it.

### 1. Create CommonForm Components
I will create a new directory `src/renderer/templates/components/common-form` containing:

- **`common-form-types.ts`**: Define interfaces for `FormControl` (the shape of Input/Select), `FormConfig`, and `FormItemConfig`.
- **`common-form.ts`**: The main container class.
    - Manages a collection of form items.
    - `validate()`: Triggers validation on all registered controls.
    - `getValues()`: Collects values from all controls based on their `prop`.
    - `setValues(data)`: Updates control values.
    - `reset()`: Resets all controls.
- **`common-form-item.ts`**: A wrapper component.
    - Renders a Label and a content container.
    - Accepts a `prop` (field name) and `label`.
    - Methods to register a `FormControl` (like `CommonInput` or `CommonSelect`) into it.
- **`common-form.css`**: Basic styling for the form layout (grid or flex).

**Design Philosophy**:
- The Form acts as an orchestrator.
- Validation logic remains inside `CommonInput` / `CommonSelect` (Distributed Validation).
- `CommonFormItem` links a "prop" key to a specific Control instance.

### 2. Create Component Library Page
I will create a new module `src/renderer/templates/pages/component-library` to demonstrate the form:

- **`component-library.ejs`**: Template with a container for the demo form and action buttons (Validate, Reset, etc.).
- **`component-library.ts`**:
    - Instantiates `CommonForm`.
    - Creates `CommonFormItem`s for "Username" (Input), "Password" (Input), and "Role" (Select).
    - Configures validation rules directly on the Inputs/Selects.
    - Binds buttons to Form methods.
- **`component-library.css`**: Styling for the demo page.

### 3. Register the Module
To make the new page accessible:

- **`src/modules/component-library/component-library-module.ts`**: Define the module metadata (ID: `component-library`, Name: `Component Library`).
- **`src/main/index.ts`**: Register the new module in the `ModuleManager`.
- **`src/renderer/renderer-entry.ts`**: Import and initialize the `component-library` script.
- **`src/renderer/templates/components/sidebar/sidebar.ejs`**: (Already dynamic, no change needed if module is registered).
- **Internationalization**: Add translation keys for the new module title.

### 4. Verification
- I will verify that the new page appears in the sidebar.
- I will test the Form's `validate`, `reset`, and `getValues` methods on the new page.
