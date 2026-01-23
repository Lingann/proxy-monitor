---
name: vue-code-skill
description: vue组件创建、开发、编写、优化、修复、改进、完善、重构
---

## 技能描述 (Description)

本技能定义了基于 Vue 3 + TSX 的组件开发规范。它强调了逻辑与视图的分离（通过 Composables）、组件的模块化结构、以及类型安全的实践。

## 核心原则 (Core Principles)

1.  **TSX First**: 全面使用 TSX 替代 .vue 文件，获得更强的类型支持和灵活性。
2.  **逻辑抽离 (Logic Extraction)**: 视图层（TSX）应尽可能薄，业务逻辑全部封装在 Composables 中。
3.  **模块化 (Modularity)**: 组件即目录，包含自身的样式、逻辑、测试和子组件。
4.  **Props 驱动 (Props Driven)**: 使用 Props 回调替代 Emits，统一数据流向。

## 指南步骤 (Guide)

请根据你的具体开发场景，参考下表中的规则文件：

| 场景/类别 | 规则文件 | 关键点 |
| :--- | :--- | :--- |
| **项目初始化** | [基础设置规范](rules/basic-setup-rules.md) | TSX、Vue 3、ES Modules |
| **文件创建** | [命名与结构规范](rules/naming-file-structure.md) | Kebab-case、BEM、独立目录 |
| **样式编写** | [样式规范](rules/style-rules.md) | CSS Modules、全局变量 |
| **组件逻辑** | [组件架构规范](rules/component-architecture.md) | i18n、Props 回调、Utils |
| **状态管理** | [Composables 规范](rules/composables-rules.md) | 逻辑抽离、禁止相互调用、描述性命名 |

## 使用场景举例 (Usage Examples)

| 场景 | 行为 |
| :--- | :--- |
| **开发一个新的表单组件** | 创建 `components/my-form` 目录，包含 `my-form.tsx` 和 `my-form.module.scss`。将表单逻辑（验证、提交）提取到 `composables/use-form-logic.ts`。 |
| **父子组件通信** | 子组件定义 `props.onSubmit` 回调，而不是 `emit('submit')`。父组件通过 `<Child onSubmit={handler} />` 传递逻辑。 |
| **处理组件样式** | 使用 CSS Modules (`classes.container`)，避免全局样式污染。类名使用 BEM 规范（如 `my-form__submit-btn`）。 |
| **复用业务逻辑** | 发现两个组件有相似的筛选逻辑，将其提取为 `composables/use-list-filter.ts` 并共享。 |

## 快速检查清单 (Quick Checklist)

- [ ] 我是否使用了 `.tsx` 而不是 `.vue`？
- [ ] 我是否为组件创建了独立的目录？
- [ ] 我是否将复杂的逻辑提取到了 `composables/use-xxx.ts` 中？
- [ ] Composables 的文件名是否至少包含了 3 个单词（如 `use-form-submit`）？
- [ ] 我是否使用了 `props.onChange` 而不是 `emit('change')`？
- [ ] 组件类名是否符合 BEM 规范？
