I will convert the existing rule files in `h:\lingann\proxy-monitor\.trae\rules` into skills in `h:\lingann\proxy-monitor\.trae\skills`, following the format of the existing `vue-code-skill`.

### 1. Create Skill Directories
I will create the following directories in `h:\lingann\proxy-monitor\.trae\skills`:
- `code-style-skill`
- `css-style-skill`
- `focus-skill`
- `js-code-skill`
- `naming-skill`
- `tech-stack-skill`

### 2. Create Skill Files
For each directory, I will create a `SKILL.md` file with the content extracted from the corresponding rule file.

#### `code-style-skill/SKILL.md` (from `code-rules.md`)
- **Description**: 代码编写风格、质量、模块化规范
- **Content**: Rules regarding nesting, guard clauses, comments, imports, modularization, etc.

#### `css-style-skill/SKILL.md` (from `css-rules.md`)
- **Description**: CSS 布局、变量命名、主题、样式规范
- **Content**: Rules for Grid/Flex layout, interaction effects, BEM naming, CSS variables (triptych notation), and theme handling.

#### `focus-skill/SKILL.md` (from `focus-rules.md`)
- **Description**: 开发专注度、用户需求、问题排查、代码更新规范
- **Content**: Rules about focusing on user problems, avoiding over-engineering, cleaning up temporary files, etc.

#### `js-code-skill/SKILL.md` (from `javascript-rules.md`)
- **Description**: JavaScript/TypeScript 组件、页面、模块开发规范
- **Content**: Rules for component/page structure, ES modules, naming, and common directories.

#### `naming-skill/SKILL.md` (from `name-rules.md`)
- **Description**: 文件、目录、工具函数、辅助函数命名规范
- **Content**: Rules for kebab-case naming, semantic naming, and specific suffixes for utilities/helpers/handlers.

#### `tech-stack-skill/SKILL.md` (from `tech-stack-rules.md`)
- **Description**: 项目技术栈、依赖管理、版本控制规范
- **Content**: Rules defining the stack (TS, Electron, Node, PNPM, EJS), dependency management, and versioning.

### 3. Verification
- I will verify that all created `SKILL.md` files follow the correct YAML frontmatter and Markdown structure.
