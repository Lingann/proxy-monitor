/**
 * ******************************************************
 * @file                     use-checkbox.ts
 * @description             「复选框组合式函数」
 * 处理复选框的状态和事件
 * @author                  blancnova-web
 * ******************************************************
 */

import type { Ref } from 'vue'
import { computed, ref, watch } from 'vue'

import type { CheckboxProps } from '../props'
import type { CheckboxChangeEvent } from '../types'

// ==================================================
// #region 复选框钩子函数 (仅处理独立状态)
// ==================================================

/**
 * 使用复选框状态和事件处理 (用于独立复选框)
 * @param props - 「复选框属性」复选框组件属性 (期望是响应式的原始 props)
 * @param emit - 「事件发射器」组件事件
 * @returns 「复选框状态和处理器」包含独立复选框状态和处理方法
 */
export function useCheckbox(
  props: CheckboxProps,
  emit: {
    (e: 'update:modelValue', value: boolean): void
    (e: 'change', event: CheckboxChangeEvent): void
    (e: 'focus' | 'blur', event: FocusEvent): void
  }
) {
  // 内部选中状态，优先使用 modelValue，然后是 defaultChecked
  const innerChecked: Ref<boolean> = ref(
    props.modelValue ?? props.defaultChecked ?? false
  )

  // 监听 modelValue 属性变化 -> 这是 v-model 的核心
  // 确保 props 是响应式的，这样 watch 才能工作
  watch(
    () => props.modelValue,
    (val) => {
      // console.log('[useCheckbox] props.modelValue changed:', val); // 调试日志
      innerChecked.value = val ?? false
    }
  )

  // 计算是否选中 (基于内部状态)
  const isChecked = computed(() => innerChecked.value)

  // 计算是否禁用 (仅基于自身 props)
  const isDisabled = computed(() => !!props.disabled)

  // 计算样式类 (仅基于自身状态)
  const checkboxClass = computed(() => {
    // Indeterminate 状态优先于 checked 状态显示
    const isActuallyIndeterminate = props.indeterminate && !isChecked.value

    return [
      'bn-checkbox',
      !isActuallyIndeterminate && isChecked.value && 'bn-checkbox--checked',
      isDisabled.value && 'bn-checkbox--disabled',
      isActuallyIndeterminate && 'bn-checkbox--indeterminate',
      props.size && `bn-checkbox--${props.size}`
    ]
  })

  // 处理选中状态变化 (用于独立复选框)
  const handleChange = (e: Event) => {
    if (isDisabled.value) return

    const target = e.target as HTMLInputElement
    const checked = target.checked

    // 对于独立复选框，触发 update:modelValue 来更新 v-model
    // Vue 的 v-model 机制会处理父组件状态更新 -> props.modelValue 变化 -> watch 触发 -> innerChecked 更新
    emit('update:modelValue', checked)

    // 创建并触发 change 事件
    const changeEvent: CheckboxChangeEvent = {
      target: {
        checked,
        value: props.value
      },
      stopPropagation: () => e.stopPropagation(),
      preventDefault: () => e.preventDefault(),
      nativeEvent: e
    }
    emit('change', changeEvent)
  }

  // 处理焦点事件
  const handleFocus = (e: FocusEvent) => {
    emit('focus', e)
  }

  // 处理失去焦点事件
  const handleBlur = (e: FocusEvent) => {
    emit('blur', e)
  }

  return {
    isChecked, // 独立复选框的选中状态 (与 modelValue 同步)
    isDisabled, // 独立复选框的禁用状态
    checkboxClass, // 独立复选框的样式
    handleChange, // 独立复选框的 change 处理器
    handleFocus,
    handleBlur
  }
}

// #endregion
// ==================================================
