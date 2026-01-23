# 重构 CommonInput Composables 计划

根据 `vue-rules.md` 的要求（特别是 Rule 13 和 Rule 16），将对 `src/renderer/components/common-input` 的 Composables 进行目录结构调整和逻辑拆分。

## 目标
1.  **创建 Composables 目录**：建立 `src/renderer/components/common-input/composables/`。
2.  **拆分逻辑**：将原 `use-common-input.ts` 拆分为：
    *   `use-input-validation.ts`: 专门负责验证逻辑（Rule 16: 按用途拆分）。
    *   `use-common-input.ts`: 主逻辑，整合验证与事件处理。
3.  **修复引用**：更新组件和新文件的导入路径。

## 实施步骤

### 1. 创建验证逻辑 Composable
新建 `src/renderer/components/common-input/composables/use-input-validation.ts`：
-   **功能**：管理 `isValid`, `errorMessage` 状态，提供 `validate`, `setError`, `clearError` 方法。
-   **输入**：当前值获取函数、配置项（响应式）。
-   **输出**：验证状态与方法。

### 2. 重构主 Composable
新建 `src/renderer/components/common-input/composables/use-common-input.ts`：
-   **功能**：组件核心逻辑，包括 `config` 合并、DOM 引用、事件处理（Focus/Blur/Input/Clear）。
-   **引用**：内部调用 `useInputValidation` 获取验证能力。
-   **输出**：暴露给 Vue 组件的所有状态和方法。

### 3. 更新组件入口
修改 `src/renderer/components/common-input/common-input.tsx`：
-   更新引用路径为 `./composables/use-common-input`。

### 4. 清理旧文件
删除 `src/renderer/components/common-input/use-common-input.ts`。

## 验证
-   确保组件功能（输入、验证、清除、Focus状态）不受影响。
-   确保 TypeScript 类型检查通过。
-   确保目录结构符合 `vue-rules.md`。
