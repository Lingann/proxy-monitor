# Composables 规范 (Composables Rules)

本文件定义了 Vue Composition API (Hooks) 的编写规范。

## 规则列表

### 1. 目录位置
**规则**: 组件/页面目录下都有自己的 `composables` 目录，用于存放组件/页面的逻辑代码。

### 2. 命名规范
**规则**:
- 必须按照用途拆分，禁止使用过于通用的命名。
- 必须使用超过 2 个单词的命名。
- 格式：`use-xxx-yyy.ts`。

**示例**:
- ✅ `use-network-monitor.ts`
- ✅ `use-http-client-utils.ts`
- ❌ `use-common.ts`

### 3. 禁止相互调用
**规则**: 禁止 composables 之间相互调用，只能在组件/页面中调用。
**指南**: 保持 composables 的独立性和纯粹性，避免复杂的依赖网。

### 4. 明确用途
**规则**: 禁止直接为组件/页面创建不具备明确含义的 composables。
**指南**: 不允许创建 `use-common-input.ts` 这种“大杂烩”，必须根据具体用途创建，如 `use-input-validation.ts`。

### 5. 逻辑抽离
**规则**: 禁止在 tsx 文件中放入太多的代码逻辑，必须将复杂的逻辑放到 composables 中。
**指南**: TSX 只负责 UI 渲染和简单的事件绑定，业务逻辑应全部下沉到 composables。

**示例**:
```tsx
/* component.tsx */
import { defineComponent } from 'vue';

import { useFormLogic } from './composables/use-form-logic';

import { useFormValidation } from './composables/use-form-validation';

export default defineComponent({

  setup() {

    const { formState, submit } = useFormLogic();

    const { validationErrors } = useFormValidation(formState);

    return () => (

      <form onSubmit={submit}>
        ...
      </form>

    );

  }

});
```
