# Vue 组件开发规范

## 目录结构

```
button/
├── composables/     # 组合式函数 - 遵循函数式编程原则
│   ├── use-button-class.ts    # 类名处理
│   ├── use-button-event.ts    # 事件处理
│   ├── use-button-preset.ts   # 预设配置
│   └── use-button-effect.ts   # 特效处理
├── styles/         # 样式文件 - 使用SCSS模块化
│   ├── index.scss          # 主样式文件
│   ├── variants.scss       # 变体样式
│   └── effects.scss        # 特效样式
├── types/          # 类型定义 - 严格类型安全
│   ├── index.ts           # 类型导出
│   ├── button.ts       # 组件类型
│   └── preset.ts          # 预设类型
├── props/          # Props定义 - 类型驱动开发
│   ├── index.ts           # Props导出
│   └── button.ts       # 组件Props
├── utils/          # 工具函数 - 纯函数实现
│   ├── index.ts           # 工具函数导出
│   ├── class.ts           # 类名工具
│   └── effect.ts          # 特效工具
├── button.tsx   # 组件实现 - 主文件
└── index.ts        # 导出文件 - 统一导出
```

## 类型安全体系

### 基础类型定义

```typescript
// types/button.ts

// 1. 定义基础类型
export type ButtonSize = 'small' | 'medium' | 'large'
export type ButtonColor = 'default' | 'primary' | 'danger' | 'success' | 'warning'
export type ButtonVariant = 'outlined' | 'solid' | 'dashed' | 'soft' | 'text' | 'link'
export type ButtonState = 'default' | 'hover' | 'active' | 'disabled' | 'loading'

// 2. 定义事件接口
export interface ButtonEmits {
  (e: 'click', event: MouseEvent): void
}
```

## Props 定义规范

### Props 工厂函数

```typescript
// props/button.ts
import { createVueProps } from '../../../utils/create-vue-props'
import type { PropType } from 'vue'

import type { ButtonColor, ButtonSize, ButtonVariant } from '../types'

export const createButtonProps = createVueProps('button', {
  // 基础属性
  size: {
    type: String as PropType<ButtonSize>,
    default: 'medium'
  },
  color: {
    type: String as PropType<ButtonColor>,
    default: 'default'
  },
  variant: {
    type: String as PropType<ButtonVariant>,
    default: 'solid'
  },
  
  // 状态属性
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  }
  // 组件特定属性
  // ...
} as const)

// ==================================================
// #region Props 类型定义
// ==================================================

/**
 * 按钮组件 Props 类型
 */
export type ButtonProps = Partial<ExtractPropTypes<ReturnType<typeof createButtonProps>>>

// #endregion
// ==================================================

```

## 组合式函数规范

### 类名处理

```typescript
// composables/use-button-class.ts
import { computed } from 'vue'

import type { ButtonProps } from '../props'
import { createButtonClass } from '../utils/class'

export function useButtonClass(props: ButtonProps) {
  const buttonClass = computed(() => {
    return createButtonClass(props)
  })

  return { buttonClass }
}
```

### 事件处理

```typescript
// composables/use-button-event.ts
import type { ButtonEmits, ButtonProps } from '../types'

export function useButtonEvent(
  props: ButtonProps,
  emit: ButtonEmits
) {
  const handleChange = (value: string | number | boolean | null) => {
    if (props.disabled || props.loading) return
    emit('update:modelValue', value)
    emit('change', value)
  }

  const handleFocus = (e: FocusEvent) => {
    emit('focus', e)
  }

  const handleBlur = (e: FocusEvent) => {
    emit('blur', e)
  }

  return {
    handleChange,
    handleFocus,
    handleBlur
  }
}
```

## 工具函数规范

### 类名工具

```typescript
// utils/class.ts
import type { ButtonProps } from '../props'

export function createButtonClass(props: ButtonProps): string[] {
  const classes: string[] = ['bn-button']

  // 添加基础类名
  if (props.size) classes.push(`bn-button--${props.size}`)
  if (props.color) classes.push(`bn-button--${props.color}`)
  if (props.variant) classes.push(`bn-button--${props.variant}`)

  // 添加状态类名
  if (props.disabled) classes.push('bn-button--disabled')
  if (props.loading) classes.push('bn-button--loading')

  return classes
}
```

## 样式规范

### SCSS 模块化

```scss
// styles/index.scss
@use 'variants' as *;
@use 'effects' as *;

.bn-button {
  // 基础样式
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  // 尺寸样式
  &--small {
    font-size: 12px;
  }
  
  &--medium {
    font-size: 14px;
  }
  
  &--large {
    font-size: 16px;
  }
  
  // 状态样式
  &--disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
  
  &--loading {
    cursor: wait;
  }
  
  // 子元素样式
  &__content {
    // 内容样式
  }
  
  &__prefix {
    // 前缀样式
  }
  
  &__suffix {
    // 后缀样式
  }
}
```

## 组件实现规范

### 主组件实现

```typescript
// button.tsx
import { defineComponent } from 'vue'
import { createButtonProps } from './props'
import { useButtonClass } from './composables/use-button-class'
import { useButtonEvent } from './composables/use-button-event'
import { useButtonEffect } from './composables/use-button-effect'
import type { ButtonEmits } from './types'
import type { ButtonProps } from './props'

import './styles/index.scss'

export const BnButton = defineComponent({
  name: 'BnButton',
  
  props: createButtonProps(),
  
  emits: ['click'] as ButtonEmits,
  
  setup(props: ButtonProps, { emit, slots }) {    
    // 处理类名
    const { buttonClass } = useButtonClass(props)
    
    // 处理事件
    const { handleClick } = useButtonEvent(
      props,
      emit
    )
    
    // 处理特效
    const { EffectButton } = useButtonEffect(props)
    
    return () => (
      <div
        class={buttonClass.value}
        onClick={handleClick}
      >
        {/* 防御式渲染 */}
        {slots.prefix && <div class="bn-button__prefix">{slots.prefix()}</div>}
        {slots.default && <div class="bn-button__content">{slots.default()}</div>}
        {slots.suffix && <div class="bn-button__suffix">{slots.suffix()}</div>}
        {EffectButton && <EffectButton />}
      </div>
    )
  }
})
```

### 组件导出

```typescript
// index.ts
import { BnButton } from './button'
import type { ButtonProps } from './props'  
import type { ButtonEmits } from './types'

export { BnButton }
export type {
  ButtonProps,
  ButtonEmits 
}

export default BnButton
```

## 防御式编程规范

### 1. 参数校验

```typescript
function validateButtonProps(props: unknown): ButtonProps {
  if (!isButtonProps(props)) {
    throw new Error('[validateButtonProps] 无效的按钮属性')
  }
  return props
}
```

### 2. 安全访问控制

```typescript
function safeButtonAction(props: ButtonProps) {
  if (props.disabled) return
  if (props.loading) return
  // 执行操作逻辑
}
```

### 3. 异常处理

```typescript
function handleButtonError(error: unknown) {
  if (error instanceof Error) {
    console.error(`[BnButton] ${error.message}`)
  }
  return null
}
```