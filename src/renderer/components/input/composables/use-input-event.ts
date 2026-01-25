/**
 * ******************************************************
 * @file                     use-input-event.ts
 * @description             「输入框事件处理组合式函数」
 * 提供输入框的事件处理逻辑
 * @author                  blancnova-web
 * ******************************************************
 */

import { ref } from 'vue'

import type { InputEvents } from '../types'

// ==================================================
// #region 事件处理组合式函数
// ==================================================

/**
 * 基础输入框事件类型
 */
type BaseInputEvents = Pick<InputEvents, 'update:modelValue' | 'input' | 'change' | 'focus' | 'blur' | 'clear'>

/**
 * 创建输入框事件处理函数
 * @param emit - 「事件发射器」用于触发组件事件
 * @param maxLength - 「最大长度」输入框允许的最大字符数
 * @returns 「事件处理函数集合」包含所有输入框相关事件处理函数
 * @complexity O(1) - 常量级函数创建
 */
export const useInputEvent = (
  emit: {
    <K extends keyof BaseInputEvents>(event: K, ...args: BaseInputEvents[K] extends undefined ? [] : [BaseInputEvents[K]]): void
  },
  maxLength?: number
) => {
  // 焦点状态
  const focused = ref(false)

  /**
   * 处理输入事件
   * @param value - 「输入值」用户输入的内容
   * @param currentValue - 「当前值」输入框的当前值
   */
  const handleInput = (value: string, currentValue?: string) => {
    // 如果没有最大长度限制，直接更新
    if (!maxLength) {
      emit('update:modelValue', value)
      emit('input', value)
      return
    }

    // 如果新值长度超过最大长度，截断到最大长度
    if (value.length > maxLength) {
      const truncatedValue = value.slice(0, maxLength)
      emit('update:modelValue', truncatedValue)
      emit('input', truncatedValue)
      return
    }

    // 正常更新
    emit('update:modelValue', value)
    emit('input', value)
  }

  /**
   * 处理变更事件
   * @param event - 「变更事件对象」原生change事件
   */
  const handleChange = (event: Event) => {
    emit('change', event)
  }

  /**
   * 处理焦点事件
   * @param event - 「焦点事件对象」原生focus事件
   */
  const handleFocus = (event: FocusEvent) => {
    focused.value = true
    emit('focus', event)
  }

  /**
   * 处理失焦事件
   * @param event - 「失焦事件对象」原生blur事件
   * @param trim - 「是否去除首尾空格」是否在失焦时自动去除首尾空格
   * @param currentValue - 「当前值」输入框的当前值
   */
  const handleBlur = (event: FocusEvent, trim?: boolean, currentValue?: string) => {
    focused.value = false

    // 如果启用trim，则在失去焦点时去除首尾空格
    if (trim && currentValue) {
      const trimmedValue = currentValue.trim()
      if (trimmedValue !== currentValue) {
        emit('update:modelValue', trimmedValue)
        emit('change', event)
      }
    }

    emit('blur', event)
  }

  /**
   * 处理清除事件
   */
  const handleClear = () => {
    emit('clear')
    emit('update:modelValue', '')
  }

  return {
    focused,
    handleInput,
    handleChange,
    handleFocus,
    handleBlur,
    handleClear
  }
}

// #endregion
// ==================================================
