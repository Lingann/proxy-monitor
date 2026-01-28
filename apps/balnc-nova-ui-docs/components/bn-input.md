# BnInput 输入框组件

BnInput 是一个基础的输入框组件，支持文本输入、占位符、禁用状态等功能。

::: vp-demo-container

## 基础输入框

最基础的输入框使用示例。

<template #render>
  <vp-demo-render src="./demos/bn-input/examples/basic-input/basic-input.tsx" />
</template>

<template #code>
  <vp-demo-code src="./demos/bn-input/examples/basic-input/basic-input.tsx" />
</template>

:::

::: vp-demo-container

## 占位符

通过 placeholder 属性设置占位符文本。

<template #render>
  <vp-demo-render src="./demos/bn-input/examples/input-placeholder/input-placeholder.tsx" />
</template>

<template #code>
  <vp-demo-code src="./demos/bn-input/examples/input-placeholder/input-placeholder.tsx" />
</template>

:::

::: vp-demo-container

## 禁用状态

通过 disabled 属性设置禁用状态。

<template #render>
  <vp-demo-render src="./demos/bn-input/examples/input-disabled/input-disabled.tsx" />
</template>

<template #code>
  <vp-demo-code src="./demos/bn-input/examples/input-disabled/input-disabled.tsx" />
</template>

:::

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| modelValue | 绑定值 | `string \| number` | - |
| placeholder | 占位符文本 | `string` | - |
| disabled | 是否禁用 | `boolean` | `false` |
| clearable | 是否可清空 | `boolean` | `false` |
| type | 输入框类型 | `'text' \| 'password' \| 'number'` | `'text'` |
| block | 是否块级元素 | `boolean` | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:modelValue | 值改变时触发 | `(value: string \| number)` |
| focus | 获得焦点时触发 | `(event: FocusEvent)` |
| blur | 失去焦点时触发 | `(event: FocusEvent)` |
