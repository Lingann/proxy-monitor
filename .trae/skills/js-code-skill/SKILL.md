---
name: js-code-skill
description: JavaScript/TypeScript 组件、页面、模块开发规范
---

## 技能描述 (Description)

本技能定义了基于 JavaScript/TypeScript 的 Web 项目开发规范，涵盖了组件结构、模块加载、项目组织、命名习惯以及国际化处理。遵循这些规则可以确保前端项目的结构清晰、易于扩展和维护。

## 核心原则 (Core Principles)

1.  **结构化 (Structured)**: 每个组件/页面拥有独立的目录和文件，不混杂。
2.  **标准化 (Standardized)**: 使用 ES Modules 标准进行模块加载。
3.  **语义化 (Semantic)**: 类名遵循 BEM 规范，清晰表达结构与状态。
4.  **全球化 (Globalized)**: 文本内容必须国际化，禁止硬编码。

## 指南步骤 (Guide)

请根据你的具体开发场景，参考下表中的规则文件：

| 场景/类别 | 规则文件 | 关键点 |
| :--- | :--- | :--- |
| **组件开发** | [组件结构规范](rules/component-structure-rules.md) | 独立目录、同名样式/入口文件 |
| **模块引入** | [模块加载规范](rules/module-loading-rules.md) | 使用 `<script type="module">` |
| **项目组织** | [项目结构规范](rules/project-structure-rules.md) | 全局样式、公共组件、CSS 变量 |
| **样式命名** | [命名规范](rules/naming-conventions.md) | 严格遵循 BEM |
| **文本处理** | [国际化规范](rules/i18n-rules.md) | 禁止硬编码字符串 |

## 使用场景举例 (Usage Examples)

| 场景 | 行为 |
| :--- | :--- |
| **创建一个新的工具函数** | 在 `utils` 目录下创建独立文件（如 `date-format-utility.ts`），并确保通过 `index.ts` 导出。 |
| **编写复杂的业务逻辑** | 将逻辑拆分为多个小的、单一职责的函数，避免单个函数过长。使用 TypeScript 接口定义数据结构。 |
| **处理用户界面文本** | 遇到硬编码的中文/英文字符串时，立即使用国际化工具（如 `t('key')`）替换，并在语言文件中添加对应条目。 |
| **引入第三方库** | 检查该库是否支持 ES Modules。如果是 CommonJS 库，尝试寻找替代品或使用兼容层。 |

## 快速检查清单 (Quick Checklist)

- [ ] 新建的组件是否放在了独立的目录下？
- [ ] 目录中是否包含了同名的 `.ts` 和 `.css` 文件？
- [ ] 是否使用了 BEM 命名法（如 `block__element--modifier`）？
- [ ] 所有的中文/英文文案是否都替换为了 `t('key')`？
- [ ] 是否通过 ES Module 方式引入了脚本？
