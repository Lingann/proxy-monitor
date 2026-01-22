# Create Common Table Component

I will create a reusable, feature-rich Table component using native TypeScript and DOM APIs, following the project's existing architectural patterns.

## 1. Create Component Directory
Location: `src/renderer/templates/components/common-table/`
- `index.ts`: Entry point.
- `common-table.ts`: Main logic class.
- `common-table.css`: Component styles.

## 2. Implement `CommonTable` Class
The class will support the following features:
- **Configuration**:
  - `columns`: Array defining key, title, width, sortable, render function.
  - `data`: Initial data array.
  - `pagination`: Page size, current page, total count.
  - `rowKey`: Unique key for rows.
- **Features**:
  - **Theming**: Use CSS variables (`--bg-primary`, etc.) to support light/dark modes automatically.
  - **Fixed Header**: CSS `sticky` positioning.
  - **Sorting**: Click handlers on headers.
  - **Column Resizing/Reordering**: HTML5 Drag & Drop API.
  - **Loading State**: Overlay with skeleton or spinner.
  - **Custom Rendering**: Support returning HTML string or DOM nodes in column `render` function.
  - **Internationalization**: Accept translated strings or keys for headers.

## 3. Style Implementation
- Use `common-table.css` to define styles using BEM naming convention (e.g., `.common-table`, `.common-table__header`, `.common-table__row`).
- Ensure full responsiveness and theme adaptability.

## 4. Integration Example (Optional)
- I will provide the code for the component but I will not replace the existing logic in `monitor.ts` unless requested, to avoid breaking the current stable version during this refactoring task. However, I will ensure the component is ready to be imported and used.

## Technical Details
- **Language**: TypeScript (ESNext).
- **Module System**: ES Modules (as per project config).
- **No 3rd Party UI Libs**: Pure implementation to keep it lightweight.
