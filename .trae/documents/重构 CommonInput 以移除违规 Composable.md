# 重构 CommonInput 组件以符合 Vue 规范

## 目标
修复 `common-input` 组件违反 `vue-rules.md` 中第 17 和 18 条规则的问题。

## 问题分析
1.  **违反规则 18**: 存在 `use-common-input.ts` 文件，这是一个不具备明确含义的 composable，且主要用于存放组件逻辑。
2.  **违反规则 17**: `use-common-input.ts` 内部调用了 `use-input-validation.ts`，违反了 composables 之间禁止相互调用的规则。

## 实施计划

### 1. 重构 `common-input.tsx`
将 `use-common-input.ts` 中的所有逻辑迁移回 `common-input.tsx` 组件内部，包括：
-   状态管理 (`inputRef`, `isFocused`)
-   配置合并逻辑 (`mergedConfig`)
-   验证逻辑触发 (`triggers`, `validate`)
-   事件处理函数 (`handleInput`, `handleFocus`, `handleBlur`, `handleKeydown`, `handleClear`)
-   直接在组件中引入并使用 `useInputValidation` composable。

### 2. 删除违规文件
-   删除 `h:\lingann\proxy-monitor\src\renderer\components\common-input\composables\use-common-input.ts`。

### 3. 验证
-   确保组件功能（输入、验证、清除、事件触发）保持不变。
-   确保代码结构符合规范，无 composable 嵌套调用。
