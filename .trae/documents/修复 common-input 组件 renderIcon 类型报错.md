# 修复 `renderIcon` 类型定义问题

## 问题分析
当前 `renderIcon` 函数的参数类型定义为 `Component | VNode`，但在 `common-input.tsx` 中调用时传入的 `mergedConfig.value.prefixIcon` 类型可能为 `undefined`（因为 `InputConfig` 中该属性是可选的）。这导致了 TypeScript 类型不匹配错误。

## 修复方案
修改 `src/renderer/components/common-input/utils/index.ts` 文件中 `renderIcon` 函数的签名，使其允许接收 `undefined` 或 `null`。

### 步骤
1.  **修改 `src/renderer/components/common-input/utils/index.ts`**:
    *   将 `renderIcon` 的参数类型从 `(icon: Component | VNode)` 更新为 `(icon?: Component | VNode | null)`。
    *   这与函数内部已有的 `if (!icon) return null;` 逻辑保持一致，且能正确处理可选的图标配置。

该修复将同时解决 `prefixIcon` 和 `suffixIcon` 的潜在类型报错。
