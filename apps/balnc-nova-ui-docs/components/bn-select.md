# BnSelect 选择器组件

BnSelect 是一个选择器组件，支持下拉选择、禁用状态、可清空等功能。

::: vp-demo-container

## 基础选择器

最基础的选择器使用示例。

<template #render>
  <vp-demo-render src="./demos/bn-select/examples/basic-select/basic-select.tsx" />
</template>

<template #code>
  <vp-demo-code src="./demos/bn-select/examples/basic-select/basic-select.tsx" />
</template>

:::

::: vp-demo-container

## 禁用状态

通过 disabled 属性设置禁用状态。

<template #render>
  <vp-demo-render src="./demos/bn-select/examples/select-disabled/select-disabled.tsx" />
</template>

<template #code>
  <vp-demo-code src="./demos/bn-select/examples/select-disabled/select-disabled.tsx" />
</template>

:::

::: vp-demo-container

## 可清空

通过 clearable 属性设置可清空。

<template #render>
  <vp-demo-render src="./demos/bn-select/examples/select-clearable/select-clearable.tsx" />
</template>

<template #code>
  <vp-demo-code src="./demos/bn-select/examples/select-clearable/select-clearable.tsx" />
</template>

:::

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| modelValue | 绑定值 | `string \| number \| array` | - |
| options | 选项数组 | `array` | - |
| placeholder | 占位符文本 | `string` | - |
| disabled | 是否禁用 | `boolean` | `false` |
| clearable | 是否可清空 | `boolean` | `false` |
| block | 是否块级元素 | `boolean` | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:modelValue | 值改变时触发 | `(value: string \| number \| array)` |
| change | 选项改变时触发 | `(value: string \| number \| array)` |
