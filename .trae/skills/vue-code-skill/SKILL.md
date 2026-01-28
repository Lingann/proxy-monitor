---
name: vue-code-skill
description: 必须遵守vue组件/页面创建、开发、编写、优化、修复、改进、完善、重构、测试、示例、样式、代码、组织、约束、规范、质量、维护、扩展、样式、scss、vue、tsx、typescript
---

# Vue 3 TSX & Clean Code Skill

## 1. 核心架构与工程约束 (Core Architecture)

* **包管理器**：项目采用 PNPM 作为包管理器，严禁使用 Yarn 或 npm。
* **技术栈限制**：仅限 **Vue 3.x + TSX** + **TypeScript**。严禁使用 `.vue` 单文件组件 (SFC)、`render` 渲染函数及 `any` 类型。
* **模块规范**：全量采用 **ES Modules**；禁止使用 CommonJS。
* **独立沙箱模式**：每个组件/页面必须拥有独立目录，包含专属的 `composables/`、`helpers/`、`styles/`、 `sub-components/`和`variant-components/`。通用功能必须抽离至全局 `shared/`或`utils/` 目录。
* **导出一致性**：每个目录必须包含 `index.ts` 进行统一导出。禁止重复导出（index.ts 导出后，子模块不再单独导出）。
* **依赖完整性**：所有资源（变量、函数、样式）必须显式 `import`。严禁隐式全局变量，代码仅适配现代浏览器，无需考虑向后兼容。
* **代码整洁**：及时清理不再需要的模块、变量、函数，保持代码整洁。

## 2. 命名与文件系统 (Naming & Filesystem)

* **全量中划线 (Kebab-case)**：所有目录名、TSX 文件名、样式文件名、Composables 文件名必须使用中划线。严禁使用驼峰命名（CamelCase/PascalCase）。
* **命名映射法则**：**目录名 = 文件名 = 组件名**（例如：目录 `user-profile/` -> `user-profile.tsx` -> `export const UserProfile = ...`）。
* **单一职责原则**：**一个文件仅包含一个核心函数或类**。
* **Composables 命名**：必须具备明确业务含义且长度 >=3 个单词（如 `use-network-monitor.ts`），严禁 `use-common.ts` 或 `use-logic.ts` 等模糊命名。
* **Ref 变量命名**：所有 `ref`、`computed`、`shallowRef` 等响应式变量必须以 `Ref` 作为后缀（如 `userIdRef`、`statusRef`、`isLoadingRef`）。严禁定义不带 `Ref` 后缀的响应式变量。
* **文件名称/目录名称**：必须直观，能够清晰地表达其功能或内容，避免简写或过于概况。

## 3. 组件开发与交互规范 (Component Patterns)

* **组件定义**：使用 `defineComponent` 或函数式组件。
* **事件通信**：严格区分双向绑定事件与普通事件。
  * **双向绑定事件**：`onUpdate:xxxXxx` 等遵循 Vue 双向绑定规范的事件名，必须使用 `emits` 选项定义，并通过 `$emit` 调用。
  * **普通事件**：其他所有事件必须使用 Props 回调模式（例如：使用 `props.onClick` 代替 `$emit('click')`）。
  * 禁止混合使用两种模式。
* **交互限制**：禁止使用位移、缩放等改变元素位置的 hover 效果。
* **交互引导**：优先使用阴影、字体加重、背景颜色变化来实现交互反馈。
* **国际化 (i18n)**：强制使用 `useI18n`。严禁在 TSX 模版或逻辑中硬编码任何中/英文字符串。
* **资源清理**：组件逻辑必须包含显式的销毁步骤（如 `onUnmounted` 中清理定时器、监听器等），严防内存泄漏。

## 4. 逻辑层与 Composables (Logic & State)

* **逻辑下沉**：TSX 仅负责视图组装，严禁在 TSX 顶层编写复杂业务逻辑，必须抽离至 `composables`。
* **扁平调度**：Composables 之间 **禁止相互调用**。所有逻辑依赖必须由组件层（Component）进行统一调度和数据传递，杜绝深层耦合。

## 4.1 Composables 命名精要

### 核心规范

* **格式**：`use-功能-领域.ts`（例如：`use-input-render.ts`）
* **字数**：单词量 ，严禁 `common` / `logic` 等模糊词汇。
* **原则**：**职责单一**，命名即文档，直观描述业务含义。
* **动作导向**：如果该 Composable 主要是为了“执行”某事，后缀可以用 `executor`、`handler` 或 `runner`。
* **数据导向**：如果是为了“获取”并“持有”数据，后缀常用 `provider`、`store` 或 `fetcher`。
* **禁止模糊**：`use-helper`、`use-utils`、`use-logic`（不知道干嘛的）需要避免使用，因为它们的职责不明确。
* **推荐具体**：`use-permission-check`、`use-network-monitor`（看名知意）

### 补充分类示例

| 类别 | 命名思路 | 代表示例 | 职责说明 |
| --- | --- | --- | --- |
| **渲染样式** | `use-领域-render/classes` | `use-table-render`, `use-size-classes` | 处理 UI 渲染逻辑、动态属性计算与样式类名 |
| **状态管理** | `use-领域-state` | `use-form-state`, `use-checkbox-state` | 管理组件内部响应式状态、选中态及复杂逻辑状态 |
| **数据校验** | `use-领域-validation` | `use-input-validation`, `use-password-strength` | 处理输入内容的合法性检测、格式校验与强度评估 |
| **事件交互** | `use-领域-event` | `use-drag-event`, `use-keyboard-event` | 监听并响应 DOM 事件、拖拽交互或快捷键操作 |
| **持久存储** | `use-领域-storage` | `use-local-storage`, `use-session-cache` | 封装原生 Storage API，实现持久化数据的响应式同步 |
| **业务逻辑** | `use-领域-业务` | `use-user-auth`, `use-permission-check` | 处理核心业务流程，如权限控制、认证状态、工作流 |
| **数据通讯** | `use-领域-fetch/data` | `use-data-fetch`, `use-network-monitor` | 负责 API 请求、并发控制、缓存管理及网络状态监控 |
| **文件媒体** | `use-领域-media/file` | `use-file-upload`, `use-video-player` | 处理流媒体播放控制、文件分片上传及资源预加载 |
| **交互反馈** | `use-领域-control/notify` | `use-modal-control`, `use-toast-notify` | 调度全局提示、弹窗显隐控制及交互动画序列 |
| **系统适配** | `use-领域-context/mode` | `use-device-detect`, `use-dark-mode` | 感知设备环境、系统主题切换及屏幕响应式适配 |
| **底层生命周期** | `use-功能-setup/cleanup` | `use-observer-setup`, `use-resource-cleanup` | 挂载/卸载观察器、定时器控制及手动资源释放 |
| **三方集成** | `use-品牌-service` | `use-google-maps`, `use-stripe-payment` | 封装第三方 SDK 的初始化、配置及功能接口调用 |

## 5. 样式\布局与CSS变量规范 (Styling & Design)

* **BEM 命名法**：CSS 类名必须严格遵循 **BEM (Block Element Modifier)** 规范。
* **样式隔离**：组件独立样式文件优先，全局变量仅限引用 `style/global.css` 定义的 CSS Variables。
* **CSS Variables 命名**：变量命名推荐采用“三段式命名法”（Triptych Notation），格式为：`namespace-value-type-variable-name`:
  * 必须使用 kebab-case，包含命名空间（全局变量如 system-）。
  * 必须包含值类型（如 -color-, -font-size-）.
* **语义化变量**：区分“基于值”（常量范围，如 --system-color-cherry-red）与“基于用途”（接口概念，如 --system-color-text-primary）。
* **主题适配**：编写样式必须同时考虑浅色与深色模式。
* **布局原则**：优先使用 Grid 或 Flex 布局，严禁使用 float 或 inline-block。

## 6. 代码风格与排版 (Code Style & Layout)

* **呼吸感排版**：执行 **“一行代码 + 一行空格”** 原则。在函数调用、变量定义、关键执行语句后必须插入空行。
* **扁平化书写**：代码追求极简嵌套。能单行完成的逻辑（如简单的赋值、if 判断）优先单行书写。
* **时序原则**：严禁在声明前调用变量或函数。
* **流程控制**：优先使用 **卫语句 (Guard Clauses)** 和 **提前返回 (Early Returns)**。
* **禁止深层 `if/else` 嵌套**：避免使用深层 `if/else` 嵌套。
* **尽量避免 `try-catch` 块**：在可能的情况下，避免使用 `try-catch` 块来处理异常，而是使用更细粒度的错误处理机制。
* **保持逻辑流的线性同步感**：确保代码的逻辑流是线性的，避免复杂的控制流程。
* **极简调用规范**：
  * 对于 nextTick、setTimeout、setInterval 或自定义指令等单个执行语句，严禁强制换行。
  * 禁止冗余大括号：若逻辑只有单行，优先不使用大括号（如：nextTick(() => doSomething())）。
  * 拒绝括号换行：即便保留大括号，也必须单行书写，禁止将大括号拆分到多行。
  * 如果是多个执行逻辑，保留多行，每个逻辑之间用空行隔开。

## 7. 注释与文档 (Documentation)

* **格式要求**：统一使用单行块注释 `/* ... */`，严禁使用 `//`。
* **语言要求**：注释内容必须使用 **中文**。
* **覆盖要求**：在函数、类、变量、常量定义处应尽可能提供详尽注释，注释必须 **独占一行**，禁止尾随代码。

## 8. 事件处理规范详解

### 8.1 事件处理模式选择

**核心原则**：
- **双向绑定事件**（如 `update:modelValue`）：必须使用 `emits` 选项定义，通过 `$emit` 调用
- **普通事件**（如 `click`、`change`、`focus`）：必须使用 Props 回调模式（`props.onClick`）
- **禁止混合使用**：同一事件类型只能选择一种模式

**✅ 正确示例：混合使用 emits（双向绑定）和 Props 回调（普通事件）**
```tsx
import { PropType } from 'vue'

export const GoodComponent = defineComponent({
  props: {
    /** v-model 绑定值 */
    modelValue: String,

    /** 普通事件回调：以 on 开头，明确类型 */
    onChange: Function as PropType<(value: string) => void>,
    /** 事件回调：点击事件 */
    onClick: Function as PropType<(event: MouseEvent) => void>,
    /** 事件回调：焦点事件 */
    onFocus: Function as PropType<(event: FocusEvent) => void>,
    /** 事件回调：失焦事件 */ 
    onBlur: Function as PropType<(event: FocusEvent) => void>
  },

  /* 双向绑定事件：必须使用 emits */
  emits: ['update:modelValue'],

  setup(props, { emit }) {
    /* 普通事件：直接调用 props 中的回调函数 */
    const handleClick = (event: MouseEvent) => props.onClick?.(event)

    const handleInput = (event: Event) => {
      const target = event.target as HTMLInputElement

      const value = target.value

      /* 双向绑定事件：使用 emit 触发 */
      emit('update:modelValue', value)

      /* 普通事件：调用 Props 回调 */
      props.onChange?.(value)
    }

    /** 处理焦点事件 */
    const handleFocus = (event: FocusEvent) => props.onFocus?.(event)

    /** 处理失焦事件 */
    const handleBlur = (event: FocusEvent) => props.onBlur?.(event)

    return () => (
      <input
        value={props.modelValue}
        onClick={handleClick}
        onInput={handleInput}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    )
  }
})
```

### 8.2 Props 事件定义规范

**Props 文件示例（props/button-props.ts）**
```tsx
import { ExtractPropTypes, PropType } from 'vue'

/* 事件类型定义 */
export interface ButtonEvents {
  click: MouseEvent
  focus: FocusEvent
  blur: FocusEvent
}

/* Props 定义函数 */
export function createButtonProps() {
  return {
    /** 基础属性：禁用状态 */
    disabled: Boolean,
    /** 基础属性：加载状态 */
    loading: Boolean,

    /** 事件回调：必须以 on 开头 */
    onClick: Function as PropType<(event: MouseEvent) => void>,
    /** 事件回调：焦点事件 */
    onFocus: Function as PropType<(event: FocusEvent) => void>,
    /** 事件回调：失焦事件 */
    onBlur: Function as PropType<(event: FocusEvent) => void>
  } as const
}

/* 导出 Props 类型 */
export type ButtonProps = ExtractPropTypes<ReturnType<typeof createButtonProps>>
```

### 8.3 Composables 中的事件处理

**use-button-event.ts**
```tsx
import { ComputedRef } from 'vue'
import { ButtonProps } from '../props'

export function useButtonEvent(config: ComputedRef<ButtonProps>) {
  /* 处理点击事件 */
  const handleClick = (event: MouseEvent) => {
    /* 禁用状态下阻止事件 */
    if (config.value.disabled || config.value.loading) return event.preventDefault()

    /* 调用 Props 中的回调 */
    config.value.onClick?.(event)
  }

  /** 处理焦点事件 */
  const handleFocus = (event: FocusEvent) => config.value.onFocus?.(event)

  /** 处理失焦事件 */
  const handleBlur = (event: FocusEvent) => config.value.onBlur?.(event)

  return {
    handleClick,
    handleFocus,
    handleBlur
  }
}
```

### 8.4 父组件调用示例

```tsx
export const ParentComponent = defineComponent({
  setup() {
    const inputValueRef = ref('')

    /* 事件处理函数 */
    const handleInputChange = (value: string) => {
      console.log('输入值变化:', value)

      inputValueRef.value = value
    }

    const handleClick = (event: MouseEvent) => console.log('按钮被点击', event)

    return () => (
      <div>
        {/* 使用 v-model：自动处理 update:modelValue 事件 */}
        <GoodComponent
          v-model={inputValueRef.value}
          onChange={handleInputChange}
          onClick={handleClick}
        />

        {/* 或使用 modelValue + onUpdate:modelValue 手动绑定 */}
        <GoodComponent
          modelValue={inputValueRef.value}
          onUpdate:modelValue={(val) => inputValueRef.value = val}
          onChange={handleInputChange}
          onClick={handleClick}
        />
      </div>
    )
  }
})
```

### 8.5 常见事件命名规范

| 事件类型 | 处理模式 | Props/Emits 命名 | 参数类型 | 说明 |
|---------|---------|-----------------|---------|------|
| v-model 更新 | emits | `update:modelValue` | `(value: T) => void` | 双向绑定值更新，必须使用 emits |
| 输入事件 | Props | `onInput` | `(value: string, event: Event) => void` | 实时输入 |
| 变更事件 | Props | `onChange` | `(value: T, ...args) => void` | 值确认变更 |
| 点击事件 | Props | `onClick` | `(event: MouseEvent) => void` | 鼠标点击 |
| 焦点事件 | Props | `onFocus` | `(event: FocusEvent) => void` | 获得焦点 |
| 失焦事件 | Props | `onBlur` | `(event: FocusEvent) => void` | 失去焦点 |
| 清除事件 | Props | `onClear` | `() => void` | 清空内容 |
| 搜索事件 | Props | `onSearch` | `(value: string) => void` | 触发搜索 |
| 鼠标悬停 | Props | `onMouseenter` | `(event: MouseEvent) => void` | 鼠标进入 |
| 鼠标离开 | Props | `onMouseleave` | `(event: MouseEvent) => void` | 鼠标离开 |
| 提交事件 | Props | `onSubmit` | `(data: T) => void` | 表单提交 |
| 重置事件 | Props | `onReset` | `() => void` | 表单重置 |


## 9. 最佳实践示例

按照规范，该示例展示了 呼吸感排版、卫语句、极简调用、事件处理模式（emits + Props 回调） 以及 TSX 极致扁平化：

```tsx
/* 引入样式：BEM 命名与中划线文件名 */
import './styles/user-status-card.css'

/* 引入依赖：显式 import */
import { defineComponent, nextTick, onUnmounted, PropType } from 'vue'

/* 引入业务逻辑：中划线命名且长度 >2 词 */
import { useUserStatusMonitor } from './composables/use-user-status-monitor'

/* 类型定义 */
interface StatusChangeEvent {
  userId: string
  status: string
  timestamp: number
}

/* 目录名 = 文件名 = 组件名 (PascalCase 导出) */
export const UserStatusCard = defineComponent({
  /* 声明 Props：普通事件使用 Props 回调模式，双向绑定事件使用 emits */
  props: {
    /** 用户ID */
    userId: { type: String, required: true },

    /** 事件回调：以 on 开头，明确类型 */
    onStateChange: Function as PropType<(event: StatusChangeEvent) => void>,

    /** 点击事件：普通事件使用 Props 回调模式 */
    onClick: Function as PropType<(event: MouseEvent) => void>
  },

  setup(props) {
    /* 逻辑下沉至 Composable，组件层负责调度 */
    const { statusRef, updateTimestampRef, clearTimer } = useUserStatusMonitor(props.userId)

    /* 卫语句：处理异常边界 */
    if (!props.userId) return () => <div class="user-status-card" />

    /* 事件处理：直接调用 props 中的回调 */
    const handleRefresh = (event: MouseEvent) => {
      nextTick(() => console.log('DOM updated'))

      props.onClick?.(event)
    }

    const handleStatusChange = () => props.onStateChange?.({ userId: props.userId, status: statusRef.value, timestamp: updateTimestampRef.value })

    /* 资源清理：防止内存泄漏 */
    onUnmounted(() => clearTimer())

    /* 渲染函数：一行代码 + 一行空格，保持呼吸感 */
    return () => (
      { /* 使用 BEM 命名法 */ }
      <div class="user-status-card user-status-card--active">

       { /* 国际化：严禁硬编码中文 */ }
        <span class="user-status-card__label">{ t('status.label') }</span>

        { /* 呼吸感：关键节点空行 */ }
        <div class="user-status-card__value" onClick={handleRefresh}>
          { statusRef.value }
        </div>

        <button class="user-status-card__action" onClick={handleStatusChange}>
          { t('status.refresh') }
        </button>

      </div>
    )
  }
})
```


