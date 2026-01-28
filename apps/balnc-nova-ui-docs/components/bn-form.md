# BnForm 表单组件

BnForm 是一个功能强大的表单容器组件，提供数据验证、表单重置、数据获取等功能。

::: vp-demo-container

## 基础表单

最基础的表单使用示例，包含输入框和选择器。

<template #render>
  <vp-demo-render src="./demos/bn-form/examples/basic-form/basic-form.tsx" />
</template>

<template #code>
  <vp-demo-code src="./demos/bn-form/examples/basic-form/basic-form.tsx" />
</template>

:::

::: vp-demo-container

## 表单验证

通过 rules 属性配置表单验证规则。

<template #render>
  <vp-demo-render src="./demos/bn-form/examples/form-validation/form-validation.tsx" />
</template>

<template #code>
  <vp-demo-code src="./demos/bn-form/examples/form-validation/form-validation.tsx" />
</template>

:::

::: vp-demo-container

## 表单操作

支持验证、重置、获取和设置表单数据。

<template #render>
  <vp-demo-render src="./demos/bn-form/examples/form-actions/form-actions.tsx" />
</template>

<template #code>
  <vp-demo-code src="./demos/bn-form/examples/form-actions/form-actions.tsx" />
</template>

:::

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| model | 表单数据对象 | `object` | - |
| rules | 验证规则对象 | `object` | - |
| label-width | 表单项标签宽度 | `string \| number` | - |
| label-position | 标签位置 | `'left' \| 'right' \| 'top'` | `'right'` |

### Methods

| 方法名 | 说明 | 参数 |
|--------|------|------|
| validate | 验证整个表单 | - |
| validateField | 验证指定字段 | `prop: string` |
| resetFields | 重置表单字段 | - |
| clearValidate | 清除验证状态 | - |
