# 函数与工具命名规范 (Function & Utility Naming)

本文件定义了工具函数和辅助函数的命名格式。

## 规则列表

### 1. 工具函数 (Utility)
**规则**: 工具函数文件使用 `xxx-utility` 格式。
**指南**: 这类函数通常是纯函数，无状态，可在多处复用。

**示例**:
- `get-ip-utility.ts`
- `parse-json-utility.ts`

### 2. 辅助函数 (Helper)
**规则**: 辅助函数文件使用 `xxx-helper` 格式。
**指南**: 这类函数通常服务于特定的业务逻辑或组件。

**示例**:
- `format-ip-helper.ts`
- `render-chart-helper.ts`
