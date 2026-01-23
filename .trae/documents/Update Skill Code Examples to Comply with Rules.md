I will update the code examples in the skill definition files to strictly adhere to the defined rules, particularly the **Code Style Rules** (Chinese comments, `/* ... */` format, and double-spacing) and **Vue Rules**.

### 1. Update `vue-code-skill` Examples
I will modify the following files to ensure TSX examples use Chinese comments, correct spacing, and strictly follow the "Props instead of Emits" and "Composition API" rules.
- `rules/basic-setup-rules.md`: Update `defineComponent` and `defineAsyncComponent` examples.
- `rules/component-architecture.md`: Update `i18n` and Props examples.
- `rules/composables-rules.md`: Update logic separation examples.

### 2. Update `code-style-skill` Examples
I will modify `rules/general-rules.md` to ensure the "Good" examples actually demonstrate the strict spacing (one blank line per code line) and comment styles they advocate.
- Convert `// Good` / `// Bad` to `/* 推荐 */` / `/* 不推荐 */`.
- Add blank lines between code statements in "Good" examples.
- Translate any English comments to Chinese.

### 3. Update `js-code-skill` & `css-style-skill` Examples
I will scan and update examples in:
- `js-code-skill/rules/naming-conventions.md`: Ensure BEM examples are correct.
- `css-style-skill/rules/*.md`: Ensure CSS examples use kebab-case variables and proper formatting.

**Key Style Changes to Apply:**
- **Comments**: `// comment` -> `/* 注释内容 */` (Chinese).
- **Spacing**: Add a blank line after every line of code in "Good" examples (Rule 15).
- **Imports**: Add missing imports where appropriate to satisfy "No undefined variables" (Rule 11).
