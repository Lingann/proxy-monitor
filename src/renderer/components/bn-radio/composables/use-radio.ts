/**
 * ******************************************************
 * @file                     use-radio.ts
 * @description             「Radio 组合式函数」
 * 处理单个 Radio 组件的逻辑 (主要用于独立使用或 Group 内的子逻辑)
 * @author                  blancnova-web
 * ******************************************************
 */

import { computed, inject, ref, type SetupContext, watch } from 'vue'

import type { RadioProps } from '../props/radio-props'
// Import Key and Context from types to break cycle
import {
  isValidRadioValue,
  RADIO_GROUP_KEY,
  type RadioChangeEvent,
  type RadioEmit,
  type RadioGroupContext,
  type RadioValueType
} from '../types'

// Explicitly define the emit function type
// 直接为 emit 提供具体的函数签名类型，避免 unknown 类型问题
export interface RadioEmitFn {
  (e: 'update:modelValue', value: boolean): void // 添加v-model支持
  (e: 'change', event: RadioChangeEvent): void
  (e: 'focus' | 'blur', event: FocusEvent): void
}

/**
 * Radio组合式函数
 * @param props 组件属性
 * @param emit 事件发射器
 * @returns Radio状态和方法
 * @description 处理单个Radio的状态管理和事件处理
 * @complexity O(1) - 常量级计算
 */
export function useRadio(props: RadioProps, emit: RadioEmitFn) {
  const radioRef = ref<HTMLInputElement | null>(null)

  // --- 从 Group 获取上下文 ---
  const radioGroupContext = inject<RadioGroupContext | null>(RADIO_GROUP_KEY, null)
  const isInGroup = computed(() => radioGroupContext !== null && props.value !== undefined)

  // --- 状态计算 ---

  // 内部维护的选中状态 (仅当非 Group 且非受控时有效)
  // 优先使用modelValue（v-model），然后是checked，最后是defaultChecked
  const internalChecked = ref(props.modelValue ?? props.checked ?? props.defaultChecked ?? false)

  // 最终选中状态
  const isChecked = computed(() => {
    try {
      if (isInGroup.value) {
        // 在 Group 中，选中状态由 Group 的 selectedValue 决定
        const groupValue = radioGroupContext?.selectedValue.value
        const radioValue = props.value

        // 提前返回 - Group值未定义
        if (groupValue === undefined) return false

        // 提前返回 - Radio值未定义
        if (radioValue === undefined) {
          console.warn('[Radio] Radio in group has undefined value')
          return false
        }

        // 处理对象值的比较
        if (typeof groupValue === 'object' && groupValue !== null &&
            typeof radioValue === 'object' && radioValue !== null) {
          // 对象值比较 - 使用id属性
          if ('id' in groupValue && 'id' in radioValue) {
            return groupValue.id === radioValue.id
          }
          return false // 无法比较的对象
        }

        // 基础类型比较
        return groupValue === radioValue
      } else if (props.modelValue !== undefined) {
        // 使用v-model（优先级最高）
        return props.modelValue
      } else if (props.checked !== undefined) {
        // 独立使用且受控
        return props.checked
      } else {
        // 独立使用且非受控
        return internalChecked.value
      }
    } catch (error) {
      console.error('[Radio] Error computing isChecked:', error)
      // 发生错误时默认为未选中状态
      return false
    }
  })

  // 最终禁用状态
  const isDisabled = computed(() => {
    try {
      return isInGroup.value
        ? radioGroupContext?.disabled.value || !!props.disabled
        : !!props.disabled
    } catch (error) {
      console.error('[Radio] Error computing isDisabled:', error)
      // 发生错误时默认为可用状态
      return false
    }
  })

  // 是否是按钮样式
  const isRadioButton = computed(() => {
    try {
      // 在 Group 中且 optionType 为 button 时，渲染为 RadioButton
      return isInGroup.value && radioGroupContext?.optionType.value === 'button'
    } catch (error) {
      console.error('[Radio] Error computing isRadioButton:', error)
      // 发生错误时默认为标准Radio
      return false
    }
  })

  // 最终尺寸
  const finalSize = computed(() => {
    try {
      return isInGroup.value
        ? radioGroupContext?.size?.value ?? props.size
        : props.size
    } catch (error) {
      console.error('[Radio] Error computing finalSize:', error)
      // 发生错误时回退到默认尺寸
      return 'medium'
    }
  })

  // 最终 name
  const finalName = computed(() => {
    try {
      return isInGroup.value ? radioGroupContext?.name?.value : props.name
    } catch (error) {
      console.error('[Radio] Error computing finalName:', error)
      return undefined
    }
  })

  // --- 事件处理 ---
  const handleChange = (event: Event) => {
    // 确保事件目标是HTMLInputElement
    if (!(event.target instanceof HTMLInputElement)) {
      console.warn('[Radio] Change event target is not an input element')
      return
    }

    // 禁用状态检查
    if (isDisabled.value) {
      event.preventDefault()
      return
    }

    const target = event.target
    const checked = target.checked

    // 异常检查 - Radio通常不会自己取消选中
    if (!checked) {
      console.warn('[Radio] Unexpected unchecked state in change handler')
      return
    }

    try {
      const currentValue = props.value as RadioValueType

      // 类型安全检查
      if (!isValidRadioValue(currentValue)) {
        console.warn('[Radio] Invalid radio value type:', currentValue)
        return
      }

      if (isInGroup.value) {
        // 在 Group 中，通知 Group 更新值
        radioGroupContext?.changeValue(currentValue)
      } else {
        // 独立使用
        if (props.modelValue === undefined && props.checked === undefined) {
          // 非受控，更新内部状态
          internalChecked.value = true
        }

        // 构建安全的事件对象
        const changeEvent: RadioChangeEvent = {
          target: {
            checked: true,
            value: currentValue
          },
          stopPropagation: () => event.stopPropagation(),
          preventDefault: () => event.preventDefault(),
          nativeEvent: event
        }

        // 触发事件
        emit('change', changeEvent)

        // 触发v-model更新（仅在独立使用且受控模式时）
        if (!isInGroup.value && props.modelValue !== undefined) {
          emit('update:modelValue', true)
        }
      }
    } catch (error) {
      console.error('[Radio] Error in change handler:', error)
    }
  }

  const handleFocus = (event: FocusEvent) => {
    try {
      emit('focus', event)
    } catch (error) {
      console.error('[Radio] Error in focus handler:', error)
    }
  }

  const handleBlur = (event: FocusEvent) => {
    try {
      emit('blur', event)
    } catch (error) {
      console.error('[Radio] Error in blur handler:', error)
    }
  }

  // --- 监听外部受控变化 ---

  // 监听modelValue变化（v-model支持）
  watch(
    () => props.modelValue,
    (newChecked) => {
      try {
        if (!isInGroup.value && newChecked !== undefined && newChecked !== internalChecked.value) {
          internalChecked.value = newChecked
        }
      } catch (error) {
        console.error('[Radio] Error in modelValue watcher:', error)
      }
    }
  )

  // 监听checked变化（兼容旧接口）
  watch(
    () => props.checked,
    (newChecked) => {
      try {
        if (!isInGroup.value && newChecked !== undefined && newChecked !== internalChecked.value) {
          internalChecked.value = newChecked
        }
      } catch (error) {
        console.error('[Radio] Error in checked watcher:', error)
      }
    }
  )

  // 自动聚焦
  const setupAutoFocus = () => {
    try {
      if (props.autoFocus && radioRef.value) {
        // 自动聚焦延迟执行，确保DOM已经准备好
        setTimeout(() => {
          radioRef.value?.focus()
        }, 0)
      }
    } catch (error) {
      console.error('[Radio] Error setting up autofocus:', error)
    }
  }

  return {
    radioRef,
    isChecked,
    isDisabled,
    isRadioButton, // 暴露按钮模式状态
    finalName,
    finalSize, // 暴露最终尺寸
    handleChange,
    handleFocus,
    handleBlur,
    setupAutoFocus
  }
}
