I will implement the Network Monitoring Module enhancements as follows:

## 1. Dependency Management
- **Install**: `systeminformation` (for robust system/network stats) and `execa` (for better command execution).
- **Goal**: Replace brittle `tasklist`/`netstat` commands with cross-platform libraries.

## 2. Backend Logic (Main Process)
- **File**: `src/modules/network-monitor/network-monitor-service.ts`
- **Changes**:
    - Refactor `NetworkMonitor` class to use `systeminformation` APIs.
    - **Data Collection**:
        - Use `si.processes()` for process details (CPU, Mem).
        - Use `si.networkConnections()` for accurate connection mapping.
    - **New Fields**: Populate `downloadSpeed` and `uploadSpeed` (Note: Windows per-process speed is limited, will default to 0/placeholder) and `category` (System/Third-party).
    - **Action Handlers**: Prepare methods/IPC handlers for `killProcess`, `locateFile`, etc.

## 3. Shared Types
- **File**: `src/shared/common-types.ts`
- **Update**: Extend `ProcessInfo` interface to include:
    - `downloadSpeed`: number
    - `uploadSpeed`: number
    - `category`: 'System' | 'Third-party'

## 4. Frontend UI (Renderer)
- **File**: `src/renderer/templates/pages/monitor/monitor.ejs` & `monitor.css`
- **View Architecture**:
    - Implement a **Single-Page View Switcher**: Toggle between `<div id="monitor-list">` and `<div id="monitor-details">` to support the "Back" navigation requirement without full page reloads.
- **Table Upgrade**:
    - Add columns: `Process`, `Program Name`, `Category`, `Down Speed`, `Up Speed`, `Connections`, `Actions`.
- **Actions UI**:
    - Default buttons: **View Details** (icon), **Limit Speed**.
    - Dropdown menu (`...`): **End Process**, **Locate File**, **Properties**.
- **Details View**:
    - Add a **Back Button** (Icon) at the top.
    - Display detailed connection lists and process stats.

## 5. Implementation Steps
1.  Install dependencies.
2.  Update TypeScript interfaces.
3.  Refactor backend service.
4.  Rewrite frontend template and styles.
5.  Verify functionality (View switching, Data display).