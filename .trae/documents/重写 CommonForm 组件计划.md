# 重写 CommonForm 组件计划

根据用户需求，参考 `CommonInput` 的架构，使用 Vue 3 + TSX 将 `src/renderer/templates/components/common-form` 重写并迁移至 `src/renderer/components/common-form`。

## 1. 目录结构
在 `src/renderer/components/common-form` 下创建以下文件：

```
common-form/
├── composables/              # 逻辑组合式函数
│   ├── use-form-config.ts    # 配置与 Props 处理
│   ├── use-form-events.ts    # 事件处理 (submit, reset)
│   ├── use-form-registry.ts  # 子组件注册管理
│   ├── use-form-render.ts    # 渲染逻辑与样式类
│   ├── use-form-state.ts     # 表单状态管理
│   └── use-form-validation.ts# 校验逻辑
├── utils/
│   └── index.ts              # 工具函数
├── common-form-item.tsx      # 表单项子组件
├── common-form.scss          # 样式文件 (包含 Form 和 FormItem 样式)
├── common-form.tsx           # 主组件
├── index.ts                  # 导出入口
└── types.ts                  # 类型定义
```

## 2. 核心模块设计

### 2.1 类型定义 (types.ts)
定义 `FormConfig`、`FormItemConfig` 以及组件通信所需的 `FormContext` 接口。
- `FormProps`: 包含 `model` (数据对象), `rules` (校验规则), `labelWidth`, `disabled` 等。
- `FormItemProps`: 包含 `prop` (字段名), `label`, `required`, `showMessage` 等。
- `FormContext`: 提供给子组件的上下文，包含 `registerField`, `unregisterField`, `model` 等。

### 2.2 组合式函数 (Composables)

*   **use-form-registry.ts**:
    *   维护一个 `Map` 或 `Set` 存储所有注册的 `FormItem` 实例（或其暴露的方法）。
    *   提供 `register` 和 `unregister` 方法，供 `CommonFormItem` 在挂载/卸载时调用。
*   **use-form-validation.ts**:
    *   提供 `validate` 方法：遍历注册的字段，调用各自的校验逻辑。
    *   提供 `validateField` 方法：校验指定字段。
    *   提供 `clearValidate` 方法：清除校验状态。
*   **use-form-state.ts**:
    *   管理表单的整体状态（如是否正在提交、是否禁用）。
*   **use-form-config.ts**:
    *   处理 Props 的默认值合并。
    *   提供统一的配置对象供其他模块使用。

### 2.3 组件实现

*   **CommonForm (common-form.tsx)**:
    *   作为容器，使用 `provide` 向下传递上下文（Context）。
    *   暴露 `validate`, `resetFields`, `clearValidate` 等方法给父组件。
    *   渲染 `<form>` 标签和默认插槽。
*   **CommonFormItem (common-form-item.tsx)**:
    *   使用 `inject` 获取父组件上下文。
    *   监听 `model` 中对应 `prop` 的变化（如果需要）。
    *   负责渲染 Label 和 内容容器。
    *   显示校验错误信息（Error Message）。
    *   将自身的 `validate` 方法注册到父组件。

### 2.4 样式 (common-form.scss)
*   使用 BEM 命名规范（如 `common-form`, `common-form__item`, `common-form__label`）。
*   定义 CSS 变量以支持主题定制。

## 3. 实施步骤

1.  **创建基础结构**: 建立目录和所有占位文件。
2.  **定义类型**: 编写 `types.ts`，明确接口契约。
3.  **实现 Composables**:
    *   先实现 Registry 和 State。
    *   再实现 Validation 核心逻辑。
4.  **实现 CommonFormItem**: 完成子组件逻辑，确保能正确注册和显示错误。
5.  **实现 CommonForm**: 完成主组件，集成所有 Composables。
6.  **样式编写**: 迁移并优化原有 CSS 到 SCSS。
7.  **验证**: 确保新组件能正确渲染、校验和提交。

## 4. 规范遵循
*   **Vue**: 使用 `defineComponent`, `setup`, `JSX`。
*   **TS**: 严格类型检查，不使用 `any`。
*   **Naming**: 文件名 kebab-case，变量名 camelCase，私有属性 `_` 前缀。
*   **注释**: 关键逻辑添加中文注释 `/* ... */`。
