# 基础设置规范 (Basic Setup Rules)

本文件定义了 Vue 组件开发的基础技术选型和语法规范。

## 规则列表

### 1. 强制 TSX
**规则**: Vue 组件必须使用 TSX 语法，不允许使用 Vue 单文件组件（.vue）。
**指南**: TSX 提供了更好的类型推断和灵活性，特别是在处理复杂逻辑时。

**示例**:
```tsx
/* 推荐 */
import { defineComponent } from 'vue';

export default defineComponent({

  setup() {

    return () => <div>Hello</div>;

  }

});
```

### 2. Vue 3.x
**规则**: 组件必须使用 Vue 3.x 版本。
**指南**: 充分利用 Composition API 和其他新特性。

### 3. 渲染函数
**规则**: 不允许直接使用 `h` 函数（render function）手动构建虚拟 DOM，除非极特殊情况。
**指南**: 坚持使用 JSX/TSX 语法，因为它更具可读性。

### 4. 模块规范
**规则**: 使用 ES Module 规范（`import`/`export`）来组织代码。
**指南**:
- 对于异步组件，使用 Vue 3 的 `defineAsyncComponent` 配合动态 `import()` 实现懒加载。
- 禁止使用 `require` 方式引入。

**示例**:
```typescript
/* 推荐 */
import { defineAsyncComponent } from 'vue';

const AsyncComp = defineAsyncComponent(() =>

  import('./components/AsyncComp.tsx')

);
```
