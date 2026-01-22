I will address the missing internationalization in `monitor.ejs` by replacing hardcoded strings with translation keys and updating the locale files.

### 1. Update Locale Files
Add the `cpu` translation key to the `monitor` section in both English and Chinese locale files.
- **File:** `src/locales/en.json`
  - Add `"cpu": "CPU Usage"` under the `monitor` object.
- **File:** `src/locales/zh.json`
  - Add `"cpu": "CPU 占用"` under the `monitor` object.

### 2. Update Monitor Template
Replace hardcoded strings with `<%= t('...') %>` calls in `src/renderer/templates/pages/monitor/monitor.ejs`.
- **CPU Label (Line 75):** Change `<strong>CPU:</strong>` to `<strong><%= t('monitor.cpu') %>:</strong>`.
- **Dropdown Items (Lines 111-115):**
  - `View Details` → `<%= t('actions.view_details') %>`
  - `Limit Speed` → `<%= t('actions.limit_speed') %>`
  - `End Process` → `<%= t('actions.end_process') %>`
  - `Locate File` → `<%= t('actions.locate_file') %>`
  - `Properties` → `<%= t('actions.properties') %>`

This ensures all UI elements in the monitor page are properly localized.