# Architecture Refactoring & Enhancement Plan

This plan addresses all 7 requirements by introducing a modular architecture, EJS templating, and a Notion-like UI.

## 1. Foundation & Dependencies
- **Install `ejs` & `electron-ejs`**: Enable EJS template support in Electron.
- **Project Structure Update**:
  - `src/core/`: Core logic (Config, I18n, EventBus).
  - `src/modules/`: Feature modules (Network Monitor, Settings).
  - `src/renderer/templates/`: EJS views and partials.
  - `src/locales/`: Internationalization files.

## 2. Core Implementation (`src/core`)
- **`ConfigManager`**: Handles persistent user configuration (language, filters) using a JSON file.
- **`I18nService`**: Loads locale files (`en.json`, `zh.json`) and provides translation helper.
- **`ModuleManager`**: A lightweight system to register and load functional modules (plugins).

## 3. Modularization
- **Network Monitor Module**: Refactor existing `NetworkAnalyzer` into a standalone module in `src/modules/network-monitor`.
- **Settings Module**: Create a new module in `src/modules/settings` for application configuration.
- **Common Interface**: All modules will implement a simple interface (init, render, destroy) to ensure consistency.

## 4. UI/UX Overhaul (Notion-like)
- **EJS Templates**:
  - `index.ejs`: Main layout shell.
  - `sidebar.ejs`: Common sidebar with navigation.
  - `views/`: Module-specific templates.
- **Styling**:
  - Implement a clean, minimalist design inspired by Notion.
  - Use CSS variables for theming and consistent spacing.
  - **Sidebar**: Collapsible/Fixed common sidebar for navigation.

## 5. Implementation Steps
1.  **Setup**: Install dependencies and update `package.json` scripts to handle `.ejs` files.
2.  **Core**: Implement `ConfigManager` and `I18nService`.
3.  **Modules**: Migrate network logic and create the settings module.
4.  **Renderer**: Implement the main `renderer.ts` as a module loader/controller.
5.  **Main Process**: Update `index.ts` to support EJS rendering and IPC handlers for config/i18n.
6.  **Verification**: Test switching languages, navigating between modules, and persistent settings.
