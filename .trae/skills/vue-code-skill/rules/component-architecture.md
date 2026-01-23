# 组件架构规范 (Component Architecture)

本文件定义了 Vue 组件的内部架构和逻辑组织方式。

## 规则列表

### 1. 国际化 (i18n)
**规则**: 组件/页面必须使用国际化字符串（如 `vue-i18n` 的 composition API `useI18n`），禁止在 `.tsx` 的渲染函数中直接硬编码中文/英文。

**示例**:
```tsx
/* 推荐 */
import { defineComponent } from 'vue';

import { useI18n } from 'vue-i18n';

export default defineComponent({

  setup() {

    const { t } = useI18n();

    return () => <button>{t('common.submit')}</button>;

  }

});
```

### 2. 工具函数 (Utils)
**规则**: 组件/页面目录下都有自己的 `utils` 目录，用于存放私有的工具函数。
**指南**: 如果工具函数具有通用性，应提升至全局 `utils`。

### 3. 子组件拆分
**规则**: 组件/页面如果比较复杂，建议将其拆分成多个子组件/页面，每个子组件/页面都有自己的目录。
**目录示例**: `components/user-dashboard/sub-components/user-stats/`

### 4. 代码简洁性
**规则**: 代码能用一行就写一行，避免写太多块级代码，保持代码的高可阅读性，减少代码嵌套。

### 5. Props 代替 Emits
**规则**: 不要定义 emits 事件，所有的事件都通过 props 来传递。
**指南**: 这种方式更符合 React/TSX 的习惯，且类型推断更自然。

**示例**:
```tsx
/* Props 定义 */
interface Props {

  modelValue: string;

  onChange?: (value: string) => void;

}

/* 使用 */
props.onChange?.(newValue);
```
