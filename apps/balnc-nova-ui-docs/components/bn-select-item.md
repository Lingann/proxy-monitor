# BnSelectItem 选择项组件

BnSelectItem 是一个选择项组件，用于选择下拉项，支持点击、悬停等触发方式。

::: vp-demo-container

## 基础选择项

最基础的选择项使用示例。

<template #render>
  <vp-demo-render src="./demos/bn-select-item/examples/basic-item/basic-item.tsx" />
</template>

<template #code>
  <vp-demo-code src="./demos/bn-select-item/examples/basic-item/basic-item.tsx" />
</template>

:::

::: vp-demo-container

## 点击选择

通过 trigger="click" 设置点击选择。

<template #render>
  <vp-demo-render src="./demos/bn-select-item/examples/item-click/item-click.tsx" />
</template>

<template #code>
  <vp-demo-code src="./demos/bn-select-item/examples/item-click/item-click.tsx" />
</template>

:::

::: vp-demo-container

## 悬停选择

通过 trigger="hover" 设置悬停选择。

<template #render>
  <vp-demo-render src="./demos/bn-select-item/examples/item-hover/item-hover.tsx" />
</template>

<template #code>
  <vp-demo-code src="./demos/bn-select-item/examples/item-hover/item-hover.tsx" />
</template>

:::

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| trigger | 触发方式 | `'click' \| 'hover'` | `'click'` |
| disabled | 是否禁用 | `boolean` | `false` |

### Slots

| 插槽名 | 说明 |
|--------|------|
| trigger | 触发器内容 |
| default | 下拉内容 |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| show | 显示下拉时触发 | - |
| hide | 隐藏下拉时触发 | - |
