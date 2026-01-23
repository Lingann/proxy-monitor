I will fix the TypeScript errors preventing the build and update the start script to ensure the main process is compiled.

1.  **Fix TypeScript Errors**
    *   **CommonSelect Types**: Add `onUpdateModelValue` and `onChange` to `CommonSelectProps` in `src/renderer/components/common-select/types.ts` to match the usage in event handling.
    *   **Icon Import**: Fix the import statement in `src/renderer/views/monitor/composables/use-monitor-table.tsx` to use the default import for the `Icon` component.

2.  **Fix Build Configuration**
    *   **Update `package.json`**: Modify the `dev` script to run `tsc` (TypeScript Compiler) before starting the Electron app. This ensures that `src/main/index.ts` is compiled to `dist/main/index.js`, resolving the "Cannot find module" error.

3.  **Verify Fix**
    *   I will verify the fix by running the build command and ensuring the application can be launched.