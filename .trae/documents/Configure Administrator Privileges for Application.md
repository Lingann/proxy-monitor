I will configure the application to run with administrator privileges by default through two methods: build configuration (for the production installer) and runtime code checks (for development and double-safety).

### 1. Build Configuration (Production)
Update `package.json` to configure `electron-builder`. This ensures that the installed application (.exe) automatically requests administrator privileges (UAC) from the Operating System when launched.
- **File**: `package.json`
- **Change**: Add `"requestedExecutionLevel": "requireAdministrator"` to the `build.win` configuration.

### 2. Runtime Elevation Logic (Development & Runtime)
Implement a runtime check that attempts to acquire administrator privileges every time the application starts. If the application is not running as admin, it will restart itself with a UAC prompt.
- **New File**: `src/main/elevation.ts`
  - Implement `isAdmin()` using `net session`.
  - Implement `ensureElevation()` using PowerShell's `Start-Process -Verb RunAs`.
- **File**: `src/main/index.ts`
  - Import and call `ensureElevation()` at the very beginning of the application startup lifecycle.

### 3. Implementation Steps
1.  Modify `package.json` to add the `requestedExecutionLevel` setting.
2.  Create `src/main/elevation.ts` with the elevation logic.
3.  Update `src/main/index.ts` to integrate the elevation check.
