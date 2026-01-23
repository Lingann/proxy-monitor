I will refactor the skill documentation in `h:\lingann\proxy-monitor\.trae\skills\` by creating a `rules` directory for each skill, splitting the `SKILL.md` content into categorized rule files with code examples, and updating `SKILL.md` to serve as a guide.

### 1. `code-style-skill`
- **Create Directory:** `code-style-skill/rules/`
- **Create Files:**
    - `rules/general-rules.md`: Nesting, guard clauses, loops, cleanup, compatibility, etc.
    - `rules/comment-rules.md`: Comment format, language, frequency.
    - `rules/import-export-rules.md`: Import usage, no duplicate exports, index.ts.
    - `rules/modularization-rules.md`: Single responsibility, clear logic, clean modules.
- **Update:** `SKILL.md` with a guide table and core principles.

### 2. `css-style-skill`
- **Create Directory:** `css-style-skill/rules/`
- **Create Files:**
    - `rules/layout-interaction-rules.md`: Grid/Flex, no hover displacement.
    - `rules/variable-naming-rules.md`: Triptych Notation, kebab-case, detailed variable naming rules.
    - `rules/theme-rules.md`: Dark mode and theme considerations.
    - `rules/style-guide.md`: Notion-like style.
- **Update:** `SKILL.md` with a guide table and core principles.

### 3. `focus-skill`
- **Create Directory:** `focus-skill/rules/`
- **Create Files:**
    - `rules/workflow-rules.md`: No auto test/build, focus on current problem, cleanup.
    - `rules/interaction-rules.md`: User interaction and responsiveness.
    - `rules/troubleshooting-rules.md`: Generalizing problems (Rule 5).
    - `rules/update-rules.md`: Syncing updates (Rule 6).
- **Update:** `SKILL.md` with a guide table and core principles.

### 4. `js-code-skill`
- **Create Directory:** `js-code-skill/rules/`
- **Create Files:**
    - `rules/component-structure-rules.md`: Component styles, entry files, directories.
    - `rules/module-loading-rules.md`: ES modules, script tags.
    - `rules/project-structure-rules.md`: Global styles, common components.
    - `rules/naming-conventions.md`: BEM naming.
    - `rules/i18n-rules.md`: Internationalization.
- **Update:** `SKILL.md` with a guide table and core principles.

### 5. `naming-skill`
- **Create Directory:** `naming-skill/rules/`
- **Create Files:**
    - `rules/file-directory-naming.md`: Kebab-case, descriptive names.
    - `rules/function-naming.md`: Utility and helper naming.
    - `rules/module-suffix-naming.md`: Suffix rules (create, constructor, etc.).
- **Update:** `SKILL.md` with a guide table and core principles.

### 6. `tech-stack-skill`
- **Create Directory:** `tech-stack-skill/rules/`
- **Create Files:**
    - `rules/stack-definition.md`: Core stack and default dependencies.
    - `rules/dependency-management.md`: Modern deps, LTS, PNPM.
- **Update:** `SKILL.md` with a guide table and core principles.

### 7. `vue-code-skill`
- **Create Directory:** `vue-code-skill/rules/`
- **Create Files:**
    - `rules/basic-setup-rules.md`: TSX, Vue 3, No render fn.
    - `rules/naming-file-structure.md`: File/Directory naming, BEM.
    - `rules/style-rules.md`: Component styles, CSS variables.
    - `rules/component-architecture.md`: Utils, sub-components, Props vs Emits.
    - `rules/composables-rules.md`: Composables naming, structure, and logic extraction.
- **Update:** `SKILL.md` with a guide table and core principles.

Each rule file will include:
- **Rule Description**: Clear statement of the rule.
- **Context/Guide**: When and how to apply it.
- **Code Examples**: Good vs. Bad examples.
- **Notes**: Important considerations.