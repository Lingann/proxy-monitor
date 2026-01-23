---
name: naming-skill
description: 文件、目录、工具函数、辅助函数命名规范
---

## 技能描述 (Description)

本技能定义了项目中文件、目录以及各类功能模块的命名规范。统一的命名规范有助于开发者快速识别文件用途，减少认知负荷，并避免命名冲突。

## 核心原则 (Core Principles)

1.  **一致性 (Consistency)**: 全局强制使用 kebab-case。
2.  **描述性 (Descriptiveness)**: 拒绝简写和模糊的通用词（如 `utils`, `common`），必须精确描述功能。
3.  **类型化 (Typing)**: 文件名应包含其角色后缀（如 `-utility`, `-handler`, `-validator`），做到“望文生义”。

## 指南步骤 (Guide)

请根据你正在创建的文件类型，参考下表中的规则文件：

| 场景/类别 | 规则文件 | 关键点 |
| :--- | :--- | :--- |
| **基础文件/目录** | [文件与目录命名规范](rules/file-directory-naming.md) | kebab-case、禁止单单词、禁止通用名 |
| **工具/辅助函数** | [函数与工具命名规范](rules/function-naming.md) | `-utility` vs `-helper` |
| **功能模块** | [模块后缀规范](rules/module-suffix-naming.md) | `-handler`, `-parser`, `-validator` 等 |

## 使用场景举例 (Usage Examples)

| 场景 | 行为 |
| :--- | :--- |
| **新建一个数据验证文件** | 命名为 `user-input-validator.ts`，而不是 `validate.ts` 或 `userValidator.ts`。 |
| **新建一个日期处理工具** | 命名为 `date-format-utility.ts`，而不是 `dateUtils.ts` 或 `common.ts`。 |
| **新建一个 React/Vue 组件目录** | 命名为 `user-profile-card`，而不是 `UserProfileCard` 或 `userProfile`。 |
| **定义一个 CSS 变量** | 命名为 `--primary-button-background-color`，而不是 `--btn-bg` 或 `--red`。 |

## 快速检查清单 (Quick Checklist)

- [ ] 文件名是否全是小写且用短横线分隔？
- [ ] 文件名是否至少包含两个单词（`index.ts` 除外）？
- [ ] 是否避免了使用了 `utils.ts` 这种名字，而是用了 `date-format-utility.ts`？
- [ ] 如果是验证逻辑，文件名是否以 `-validator.ts` 结尾？
- [ ] 如果是数据处理逻辑，文件名是否以 `-handler.ts` 或 `-transformer.ts` 结尾？
