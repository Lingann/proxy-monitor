---
name: code-style-skill
description: 代码编写风格、质量、模块化规范
---

## 技能描述 (Description)

本技能定义了项目中的 TypeScript/JavaScript 代码编写风格、质量标准和模块化规范。遵循这些规则可以确保代码库的一致性、可读性和可维护性，减少 bug 的产生，并提高团队协作效率。

## 核心原则 (Core Principles)

1.  **简洁至上 (Simplicity)**: 避免过度设计和复杂的逻辑嵌套。
2.  **可读性 (Readability)**: 代码应该像文章一样易于阅读，通过良好的命名、格式和注释来表达意图。
3.  **模块化 (Modularity)**: 职责单一，高内聚低耦合，易于复用。
4.  **类型安全 (Type Safety)**: 充分利用 TypeScript 的类型系统，拒绝 `any`。

## 指南步骤 (Guide)

请根据你的具体开发场景，参考下表中的规则文件：

| 场景/类别 | 规则文件 | 关键点 |
| :--- | :--- | :--- |
| **通用编码** | [通用代码规范](rules/general-rules.md) | 避免嵌套、卫语句、提前返回、无 `any`、代码留白 |
| **注释编写** | [注释规范](rules/comment-rules.md) | 使用 `/* ... */`、中文注释、全覆盖 |
| **导入/导出** | [导入导出规范](rules/import-export-rules.md) | ES Modules、`index.ts` 导出、无 CommonJS |
| **模块设计** | [模块化规范](rules/modularization-rules.md) | 单一职责、文件拆分、通用模块抽离 |

## 使用场景举例 (Usage Examples)

| 场景 | 行为 |
| :--- | :--- |
| **编写条件判断** | 使用卫语句（Guard Clauses）提前返回，例如 `if (!isValid) return;`，避免深层嵌套的 `if-else`。 |
| **定义函数参数** | 如果参数超过 3 个，使用对象参数模式，并定义接口类型。例如 `function createUser({ name, age, role }: CreateUserOptions)`。 |
| **注释代码** | 为复杂的算法或业务逻辑添加中文注释，解释“为什么”这样做，而不仅仅是“做了什么”。使用 `/* ... */` 格式。 |
| **清理代码** | 删除未使用的 import 语句、变量和注释掉的代码块。保持代码整洁。 |

## 快速检查清单 (Quick Checklist)

- [ ] 是否消除了多层 `if` 嵌套？
- [ ] 变量和函数是否都有中文注释？
- [ ] 是否使用了 ES6 模块语法 (`import`/`export`)？
- [ ] 是否避免使用了 `any` 类型？
- [ ] 文件是否只包含单一职责的内容？
- [ ] 代码行之间是否有适当的空行？
