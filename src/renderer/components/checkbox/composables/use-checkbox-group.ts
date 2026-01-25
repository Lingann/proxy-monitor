/**
 * ******************************************************
 * @file                     use-checkbox-group.ts
 * @description             「复选框组组合式函数」
 * 处理复选框组的状态和事件
 * @author                  blancnova-web
 * ******************************************************
 */

import type { ComputedRef, Ref } from 'vue'
import { computed, provide, ref, watch } from 'vue'

import type { CheckboxGroupProps } from '../props'
import type { CheckboxOptionType, CheckboxValueType } from '../types'

// 复选框组上下文键
export const CHECKBOX_GROUP_KEY = Symbol('bn-checkbox-group')

// 复选框组上下文类型
export interface CheckboxGroupContext {
  name?: string
  checkedValue: ComputedRef<CheckboxValueType[]>
  disabled: ComputedRef<boolean>
  size?: string
  registerValue: (value: CheckboxValueType, checked: boolean) => void
}

// ==================================================
// #region 复选框组钩子函数
// ==================================================

/**
 * 使用复选框组状态和事件处理
 * @param props - 「复选框组属性」复选框组组件属性
 * @returns 「复选框组状态和处理器」包含复选框组状态和处理方法
 */
export function useCheckboxGroup(
  props: CheckboxGroupProps
) {
  /* 内部选中值 */
  const innerValue: Ref<CheckboxValueType[]> = ref(
    props.modelValue !== undefined ? [...props.modelValue] : [...(props.defaultValue || [])]
  )

  /* 监听属性变化更新内部状态 */
  watch(
    () => props.modelValue,
    (val) => {
      if (val !== undefined) {
        innerValue.value = [...val]
      }
    },
    { deep: true }
  )

  /* 计算选中的值 */
  const checkedValue = computed(() => innerValue.value)

  /* 计算是否禁用 */
  const isDisabled = computed(() => !!props.disabled)

  /* 格式化选项 */
  const normalizedOptions = computed(() => {
    if (!props.options) return []

    return props.options.map((option) => {
      if (typeof option === 'string' || typeof option === 'number') {
        return {
          label: String(option),
          value: option
        }
      }
      return option as CheckboxOptionType
    })
  })

  /* 处理选中值变化 */
  const handleChange = (value: CheckboxValueType, checked: boolean) => {
    /* 复制当前值以避免直接修改 */
    const currentValue = [...innerValue.value]

    if (checked) {
      /* 添加值（如果不存在） */
      if (!currentValue.includes(value)) {
        currentValue.push(value)
      }
    } else {
      /* 移除值（如果存在） */
      const index = currentValue.indexOf(value)

      if (index !== -1) {
        currentValue.splice(index, 1)
      }
    }

    /* 更新内部状态 */
    innerValue.value = currentValue

    /* 调用 Props 中的回调函数 */
    props.onUpdateModelValue?.(currentValue)
    props.onChange?.(currentValue)
  }

  /* 计算复选框组样式类 */
  const checkboxGroupClass = computed(() => {
    return [
      'bn-checkbox-group',
      props.size && `bn-checkbox-group--${props.size}`,
      isDisabled.value && 'bn-checkbox-group--disabled'
    ]
  })

  /* 提供上下文给子组件 */
  provide(CHECKBOX_GROUP_KEY, {
    name: props.name,
    checkedValue,
    disabled: isDisabled,
    size: props.size,
    registerValue: handleChange
  } as CheckboxGroupContext)

  return {
    checkedValue,
    isDisabled,
    normalizedOptions,
    checkboxGroupClass,
    handleChange
  }
}

// #endregion
// ==================================================
