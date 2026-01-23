根据 `vue-rules.md` 第 21 条规则（"不要定义 emits 事件， 所有的事件都通过props来传递"），我制定了以下重构计划，将所有组件的 `emits` 替换为 Props 回调。

### 重构计划

#### 1. CommonInput 组件
- **目标文件**:
    - `src/renderer/components/common-input/common-input.tsx`
    - `src/renderer/components/common-input/composables/use-input-events.ts`
- **修改内容**:
    - 移除 `emits` 选项。
    - 添加 Props: `onUpdateModelValue`, `onChange`, `onFocus`, `onBlur`, `onEnter`, `onClear`。
    - 更新 `useInputEvents`，使其直接调用 Props 传入的回调函数，而不是使用 `emit`。

#### 2. CommonTablePagination 组件
- **目标文件**: `src/renderer/components/common-table-pagination/common-table-pagination.tsx`
- **修改内容**:
    - 移除 `emits` 选项。
    - 添加 Props: `onUpdateCurrentPage`, `onUpdatePageSize`, `onChange`。
    - 将 `emit('update:currentPage', val)` 改为 `props.onUpdateCurrentPage?.(val)`。
    - 将 `emit('update:pageSize', val)` 改为 `props.onUpdatePageSize?.(val)`。

#### 3. CommonSelect 组件
- **目标文件**: `src/renderer/components/common-select/common-select.tsx`
- **修改内容**:
    - 移除 `emits` 选项。
    - 添加 Props: `onUpdateModelValue`, `onChange`, `onFocus`, `onBlur`。
    - 替换所有 `emit` 调用为对应的 Props 调用。

#### 4. CommonSearchInput 组件
- **目标文件**: `src/renderer/components/common-search-input/common-search-input.tsx`
- **修改内容**:
    - 移除 `emits` 选项。
    - 添加 Props: `onUpdateModelValue`, `onChange`, `onSearch`。
    - 替换所有 `emit` 调用为对应的 Props 调用。

#### 5. CommonTable 组件 (消费者更新)
- **目标文件**: `src/renderer/components/common-table/common-table.tsx`
- **修改内容**:
    - 更新 `<CommonTablePagination>` 的调用方式。
    - 将 `onUpdate:currentPage` 和 `onUpdate:pageSize` 替换为显式的 Props `onUpdateCurrentPage` 和 `onUpdatePageSize`。

### 验证方式
- 确认所有组件文件无 TypeScript 类型错误。
- 检查 `CommonTable` 对 `CommonTablePagination` 的引用是否正确。
