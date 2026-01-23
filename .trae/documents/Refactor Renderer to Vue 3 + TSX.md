# Vue 3 Refactoring Plan

I will refactor the renderer process to use **Vue 3 + TypeScript + TSX** as requested, using `setup` and `defineComponent`. This involves introducing **Vite** as the build tool, as the current "no-bundler" approach is insufficient for modern Vue/TSX development.

## 1. Project Initialization & Configuration
- **Install Dependencies**: `vue`, `vue-router`, `vue-i18n`, `vite`, `@vitejs/plugin-vue`, `@vitejs/plugin-vue-jsx`, `sass`, `echarts`.
- **Configure Vite**: Create `vite.config.ts` with alias support (`@/` -> `src/renderer/`) and build output targeting `dist/renderer`.
- **Update Scripts**: Modify `package.json` to include `dev` (concurrently run vite and electron) and `build` scripts.

## 2. Main Process Updates
- **Remove EJS**: Strip `electron-ejs` dependency and configuration from `src/main/index.ts`.
- **Window Loading**:
  - **Dev**: Load `http://localhost:5173`.
  - **Prod**: Load `file://${__dirname}/../renderer/index.html`.

## 3. Renderer Architecture (New Structure)
I will reorganize `src/renderer` into a standard Vue structure:
- `main.ts`: Entry point (mounts App, uses Router & I18n).
- `App.tsx`: Root component with layout.
- `router/index.ts`: Vue Router configuration.
- `views/`: Page components (`Monitor`, `Settings`, `ComponentLibrary`).
- `components/`: Reusable UI components (`CommonInput`, `CommonTable`, etc.).
- `hooks/`: Reusable logic (e.g., `useI18n`, `useChart`).
- `styles/`: Global styles (migrated from `app-styles.css`).

## 4. Component Refactoring (Vue 3 + TSX)
I will rewrite existing class-based components into functional Vue components using `defineComponent` and `setup`:
- **Core Components**:
  - `CommonInput`: Use `v-model` and computed props for validation.
  - `CommonSelect`: Custom dropdown with reactive state.
  - `CommonTable`: Reactive data prop, sorting/pagination logic in `setup`.
  - `CommonSearchInput`: Integrate `fuse.js` with reactive search.
- **Layout**:
  - `Sidebar`: Convert to use `RouterLink`.

## 5. Page Migration
- **Monitor Page**:
  - Convert `monitor.ts` logic to `Monitor.tsx`.
  - Use `onMounted` for polling `electronAPI.analyzeConnections`.
  - Replace manual DOM updates with reactive data binding.
  - Integrate ECharts using a Vue-friendly approach (ref + `onMounted`).
- **Settings Page**: Bind form directly to `config` object.

## 6. Verification
- Verify application startup in Dev and Prod modes.
- Check all interactive features: Chart rendering, Data polling, Table sorting/pagination, Settings saving.
