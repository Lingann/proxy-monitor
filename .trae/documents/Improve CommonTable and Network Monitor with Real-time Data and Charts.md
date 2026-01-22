# Implementation Plan

## 1. Install Dependencies
- Install `echarts` using pnpm.

## 2. Enhance CommonTable Component
### Pagination Improvements
- **File**: `src/renderer/templates/components/common-table/common-table-pagination.ts`
  - Add a `<select>` dropdown to the pagination controls.
  - Options: 10, 20, 50, 100.
  - Bind the `change` event to update the page size.
- **File**: `src/renderer/templates/components/common-table/common-table.ts`
  - Handle page size changes: update internal state and re-render.
  - Modify `setData` to optionally preserve the current page (to prevent jumping to page 1 on every auto-refresh).
  - Add `refresh()` and `reset()` public methods.
  - `refresh()`: Triggers a re-render or calls an optional external data fetcher.
  - `reset()`: Clears filters, sorting, and resets pagination to default.

## 3. Create Chart Helper
- **File**: `src/renderer/lib/echarts-theme.ts` (New File)
  - Define a Notion-style color palette and theme configuration for ECharts.
  - Export a helper function to initialize charts with this theme.

## 4. Update Network Monitor Page
### UI Updates
- **File**: `src/renderer/templates/pages/monitor/monitor.ejs`
  - Add a "Network Overview" section at the top.
  - Display "Total Upload Speed" and "Total Download Speed" with large, clear numbers.
  - Add a container `div` for the real-time traffic chart.

### Logic Updates
- **File**: `src/renderer/templates/pages/monitor/monitor.ts`
  - Import `echarts` and the theme helper.
  - Initialize the traffic chart.
  - Maintain a data buffer (e.g., last 60 seconds) for the chart.
  - Implement a polling mechanism:
    - Use `setInterval` (1000ms) to call `analyzeConnections` (or a more efficient stats API if available).
    - Update the Total Speed display.
    - Update the Chart data.
    - Update the `CommonTable` instances with new process data (preserving pagination state).
  - Handle cleanup (clearInterval) when the page might be unloaded (though this seems to be a single-page app style, good to be safe).

## 5. Verification
- Verify the pagination dropdown works and updates the table.
- Verify the table refreshes data every second without UI glitches.
- Verify the chart displays real-time network traffic with the correct theme.
- Verify the total speed indicators are accurate and updating.
