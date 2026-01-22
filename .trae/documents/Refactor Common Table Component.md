I will improve the `common-table` component by implementing the requested UI/UX fixes and enhancements.

### 1. Header Refactoring (`common-table-header.ts`)
*   **Remove Drag & Drop**: Eliminate the column dragging functionality.
*   **Remove Filter Inputs**: Remove the text input boxes from column headers.
*   **Implement Column Resizing**:
    *   Add resize handles (`div`) to each column header.
    *   Implement mouse event logic (`mousedown`, `mousemove`, `mouseup`) to allow adjusting column widths.
*   **Enhance Sort UI**: Replace text arrows with modern SVG icons for sorting states (Ascending/Descending).

### 2. Empty State Enhancement (`common-table-body.ts`)
*   **Add SVG Illustration**: Replace the plain "No Data" text with a centered SVG icon and styled text for a better visual experience when the table is empty.

### 3. Pagination Upgrade (`common-table-pagination.ts`)
*   **Modern UI**: Redesign the pagination control.
*   **Numeric Page Links**: Implement a page number list (e.g., `1, 2, 3 ... 10`) to replace the simple "Prev/Next" only interface.
*   **Icon Controls**: Use SVG icons for Previous/Next buttons.

### 4. Style Improvements (`common-table.css`)
*   **Row Hover**: Enable background color change on hover for **all rows** (previously only for clickable rows).
*   **New Styles**: Add CSS for:
    *   Column Resizers (cursor, hover effect).
    *   Empty State (SVG styling, layout).
    *   Modern Pagination (active states, button styling).
    *   Sort Icons.

### 5. Cleanup
*   Remove unused drag-and-drop styles and logic.
