# 重构 CommonInput 组件计划

本计划旨在将 Vue 组件 `src/renderer/components/common-input` 按照项目规范进行重构，并与原生 TS 模板 `src/renderer/templates/components/common-input` 保持功能和架构的一致性。

## 目录结构变更

重构后的组件目录结构如下：

```
src/renderer/components/common-input/
├── common-input.tsx      // 组件视图与 Props 定义
├── common-input.scss     // 样式文件（保持现有，需微调）
├── types.ts              // 类型定义（新增，对齐模板）
└── use-common-input.ts   // 逻辑钩子（新增，负责状态与验证）
```

## 实施步骤

### Phase 1: 类型定义 (types.ts)
1.  创建 `types.ts`。
2.  定义 `InputSize`, `ValidateTrigger`, `ValidationResult`, `InputValidator` 等基础类型。
3.  定义 `InputConfig`，确保包含 `container` (可选), `size`, `clearable`, `trim`, `validator` 等所有配置项。
4.  定义组件 Props 类型，确保 `modelValue` 和 `config` 的类型安全。

### Phase 2: 逻辑抽离 (use-common-input.ts)
1.  创建 `use-common-input.ts`。
2.  实现 `useCommonInput` Composable 函数。
    -   **状态管理**：`isValid`, `errorMessage`, `isFocused`, `currentValue`。
    -   **事件处理**：`handleInput`, `handleFocus`, `handleBlur`, `handleClear`, `handleKeydown`。
    -   **验证逻辑**：实现 `validate` 方法，支持多触发器（change/blur/focus）和异步验证。
    -   **手动控制**：暴露 `setError` 和 `clearError` 方法。
    -   **辅助功能**：实现 `trim` 逻辑和 `maxLength` 处理。

### Phase 3: 组件视图重构 (common-input.tsx)
1.  重写 `common-input.tsx`。
2.  引入 `useCommonInput`。
3.  使用 JSX 渲染组件结构，保持 DOM 结构与模板版一致（Wrapper + Input + Icons + ErrorMsg）。
4.  使用 `expose` 将 `focus`, `blur`, `validate`, `setError`, `clearError` 暴露给父组件。
5.  集成 `lucide-vue-next` 图标（`X` 用于清除按钮）。

### Phase 4: 样式规范化 (common-input.scss)
1.  检查 CSS 变量命名，确保严格遵循 `kebab-case`（如 `--input-height`）。
2.  确保状态类名（`.is-focused`, `.is-error`）与逻辑层一致。
3.  对齐模板版的样式细节（如内边距、过渡动画）。

## 验证计划
1.  **功能验证**：
    -   输入值更新是否正常。
    -   验证器是否在指定触发器（blur/change）下工作。
    -   错误状态是否正确显示和清除。
    -   清除按钮是否有效。
    -   `trim` 功能是否在 blur 时生效。
2.  **类型检查**：确保所有 Props 和 Config 类型无 TypeScript 错误。
