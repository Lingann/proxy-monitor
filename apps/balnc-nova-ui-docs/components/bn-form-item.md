# BnFormItem 表单项组件

BnFormItem 是表单中的表单项组件，用于包装表单控件，提供标签、验证规则等功能。

::: vp-demo-container

## 基础表单项

最基础的表单项使用示例。

<template #render>
  <vp-demo-render src="./demos/bn-form-item/examples/basic-form-item/basic-form-item.tsx" />
</template>

<template #code>
  <vp-demo-code src="./demos/bn-form-item/examples/basic-form-item/basic-form-item.tsx" />
</template>

:::

::: vp-demo-container

## 自定义标签

通过 label 属性设置表单项标签。

<template #render>
  <vp-demo-render src="./demos/bn-form-item/examples/form-item-label/form-item-label.tsx" />
</template>

<template #code>
  <vp-demo-code src="./demos/bn-form-item/examples/form-item-label/form-item-label.tsx" />
</template>

:::

::: vp-demo-container

## 必填项

通过 required 属性标记必填项。

<template #render>
  <vp-demo-render src="./demos/bn-form-item/examples/form-item-required/form-item-required.tsx" />
</template>

<template #code>
  <vp-demo-code src="./demos/bn-form-item/examples/form-item-required/form-item-required.tsx" />
</template>

:::

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| label | 标签文本 | `string` | - |
| prop | 对应表单字段属性名 | `string` | - |
| required | 是否必填 | `boolean` | `false` |
| rules | 验证规则 | `array` | - |
| label-width | 标签宽度 | `string \| number` | - |
