I will implement the requested features by creating a new Process Manager service, moving network monitoring to a dedicated worker process, and setting up database persistence for traffic statistics.

### **Plan of Action**

1.  **Create Process Management Service** (`src/core/process-manager-service.ts`)
    *   Implement a generic `ProcessManagerService` to handle `fork`/`spawn` of child processes.
    *   Support starting, stopping, and communicating (IPC) with managed processes.
    *   Ensure proper cleanup of processes on application exit.

2.  **Enhance Database Service** (`src/core/database-service.ts`)
    *   Initialize `better-sqlite3` with the following schema:
        *   `global_daily_stats`: Stores daily total RX/TX and averages (retained for 1 year).
        *   `process_daily_stats`: Stores daily RX/TX per process (retained for 1 year).
        *   `recent_traffic`: Stores raw traffic data for the last 10 minutes (for chart initialization).
    *   Implement methods to upsert daily stats and manage the rolling 10-minute window.

3.  **Create Network Monitor Worker** (`src/modules/network-monitor/network-monitor.worker.ts`)
    *   Extract the heavy `systeminformation` and `execa` logic from the main service into this standalone worker.
    *   Implement a polling loop (approx. 1s interval) to fetch network stats.
    *   Send traffic updates to the main process via IPC.

4.  **Refactor Network Monitor Service** (`src/modules/network-monitor/network-monitor-service.ts`)
    *   Replace direct monitoring logic with `ProcessManagerService` integration.
    *   Start the worker process on initialization.
    *   On receiving updates from the worker:
        *   Cache the latest data for the `analyze-connections` IPC handler (non-blocking).
        *   Call `DatabaseService` to persist real-time stats.
    *   Add `getRecentTraffic()` method to retrieve history from the DB.

5.  **Update Main Process & IPC** (`src/main/index.ts`)
    *   Register a new IPC handler `get-recent-traffic` to allow the frontend to fetch the 10-minute history on load.

6.  **Update Frontend** (`src/renderer/monitor.ts` - assumed location)
    *   Modify the chart initialization to call `get-recent-traffic` so the chart isn't empty when opened.

### **Technical Details**
*   **Worker Path**: Will use `path.join(__dirname, 'network-monitor.worker.js')` to ensure it works in the built Electron app.
*   **Persistence Strategy**:
    *   **Daily Stats**: Upsert (Update if exists, Insert if not) for the current date.
    *   **Recent Stats**: Insert new record, then delete records older than 10 minutes.
*   **Dependencies**: `better-sqlite3` (already installed).
