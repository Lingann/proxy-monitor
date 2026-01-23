# 重构 CommonSelect 组件计划

我们将按照 `CommonInput` 的架构风格重构 `CommonSelect` 组件，将其拆分为多个功能单一的 Composables，以提高代码的可维护性和可读性。

## 目录结构变更

目标结构如下：
```text
src/renderer/components/common-select/
├── common-select.scss       # 现有样式文件 (保持不变)
├── common-select.tsx        # 主组件入口 (重写)
├── types.ts                 # 类型定义 (提取)
├── utils/                   # 工具函数
│   └── index.ts
└── composables/             # 逻辑拆分
    ├── use-select-config.ts     # 配置合并与默认值
    ├── use-select-state.ts      # 开关状态与 DOM 引用
    ├── use-select-validation.ts # 验证逻辑
    ├── use-select-events.ts     # 事件处理 (点击、选择、外部点击)
    └── use-select-render.ts     # 渲染逻辑 (Class 计算、选项显示)
```

## 实施步骤

### 1. 提取类型定义 (types.ts)
将 `SelectOption`、`SelectConfig` 等接口移至 `types.ts`，并补充 `CommonSelectProps`。

### 2. 拆分逻辑至 Composables

- **use-select-config.ts**:
  - 接收 `props`。
  - 负责合并默认配置 (`mergedConfig`)。
  - 解析验证触发器 (`triggers`)。

- **use-select-state.ts**:
  - 管理 `isOpen` (下拉框开关状态)。
  - 管理 `dropdownPosition` (下拉框位置 top/bottom)。
  - 管理 DOM 引用 (`containerRef`, `dropdownRef`)。
  - 提供 `open`, `close`, `toggle` 方法（包含位置计算逻辑）。

- **use-select-validation.ts**:
  - 复用类似的验证逻辑。
  - 管理 `isValid`, `errorMessage`。
  - 提供 `validate`, `setError`, `clearError` 方法。

- **use-select-events.ts**:
  - 处理 `handleClickOutside` (点击外部关闭)。
  - 处理 `handleSelect` (选择选项)。
  - 整合验证逻辑（在特定事件触发时验证）。

- **use-select-render.ts**:
  - 计算 `containerClasses`。
  - 计算 `selectedOption` (根据 modelValue 查找)。
  - 处理下拉框样式和动画类。

### 3. 重组主组件 (common-select.tsx)
- 引入上述 Composables。
- 组合逻辑。
- 保持 JSX 结构清晰，逻辑与视图分离。
- 暴露 `validate`, `setError`, `clearError` 等方法。

## 验证
- 确保重构后的组件功能与原有逻辑一致。
- 确保 TypeScript 类型检查通过。
