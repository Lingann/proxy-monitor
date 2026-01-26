/**
 * ******************************************************
 * @file                     use-radio-group.ts
 * @description             「RadioGroup 组合式函数」
 * 处理 RadioGroup 的逻辑，包括状态管理和上下文提供
 * @author                  blancnova-web
 * ******************************************************
 */

// import { generateId } from '@blanc-nova/utils' // Assuming a utility for unique IDs
import { computed, provide, ref, type SetupContext, watch } from 'vue' // Removed toRefs as it's not used

import type { RadioGroupProps } from '../props/radio-group-props'
import type { RadioGroupContext, RadioGroupEmit, RadioValueType } from '../types'
// Import Key from types instead of self
import { RADIO_GROUP_KEY } from '../types'

// ==================================================
// #region 工具函数
// ==================================================

/**
 * 生成全局唯一ID
 * @returns 唯一ID字符串
 * @description 使用时间戳、随机数和计数器的组合确保唯一性
 * @complexity O(1) - 常量级操作
 */
let idCounter = 0
const generateId = (): string => {
  const timestamp = Date.now()
  const random = Math.floor(Math.random() * 10000)
  return `bn-radio-${timestamp}-${random}-${idCounter++}`
}

/**
 * 安全比较两个值是否相等
 * @param a 第一个值
 * @param b 第二个值
 * @returns 是否相等
 * @description 安全处理undefined和null情况
 * @complexity O(1) - 直接比较
 */
const safeEqual = (a: RadioValueType | undefined, b: RadioValueType | undefined): boolean => {
  // 处理两者都是undefined或null的情况
  if (a == null && b == null) return true
  // 处理一者为undefined或null，另一者不是的情况
  if (a == null || b == null) return false
  // 使用严格相等比较具体值
  return a === b
}

// #endregion
// ==================================================

// Explicitly define the emit function type
// 直接为 emit 提供具体的函数签名类型，避免 unknown 类型问题
export interface EmitFn {
  (e: 'update:modelValue' | 'change', value: RadioValueType): void
}

export function useRadioGroup(props: RadioGroupProps, emit: EmitFn) {
  // ==================================================
  // #region 状态管理
  // ==================================================
  const internalValue = ref<RadioValueType | undefined>(props.defaultValue)
  // 标记是否已经初始化过，用于优化首次值变化处理
  const isInitialized = ref(!!props.modelValue || !!props.defaultValue)

  // --- 计算属性 ---

  // 最终选中的值 (优先使用受控的 modelValue)
  // @description 确保受控模式优先于非受控模式
  const selectedValue = computed<RadioValueType | undefined>(() => {
    try {
      // 提前返回 - 如果 modelValue 明确定义了，则使用它 (受控)
      if (props.modelValue !== undefined) return props.modelValue
      // 否则，使用内部状态 (非受控)
      return internalValue.value
    } catch (error) {
      console.error('[RadioGroup] Error computing selectedValue:', error)
      return internalValue.value
    }
  })

  // Group 的 name 属性，如果未提供则生成唯一 ID
  // @description 为 input[type="radio"] 提供必要的 name 属性，确保它们属于同一组
  const groupName = computed(() => props.name ?? `bn-radio-group-${generateId()}`)

  // 组是否被禁用
  // @description 简化 boolean prop 的处理
  const isDisabled = computed(() => props.disabled ?? false)

  // 组的尺寸
  const groupSize = computed(() => props.size) // 保持 undefined 或具体值

  // 选项渲染类型
  const groupOptionType = computed(() => props.optionType ?? 'default')

  // 按钮样式
  const groupButtonStyle = computed(() => props.buttonStyle ?? 'outline')

  // #endregion
  // ==================================================

  // ==================================================
  // #region 方法
  // ==================================================

  /**
   * 当子 Radio 触发 change 时，更新 Group 的值
   * @param value - 子 Radio 传递过来的新值
   * @throws 无 - 但会提前返回如果组被禁用
   * @complexity O(1) - 直接赋值和事件触发
   */
  const changeValue = (value: RadioValueType) => {
    // 异常值检查
    if (value === undefined) {
      console.warn('[RadioGroup] Received undefined value in changeValue')
      return
    }

    // 提前返回 - 如果组被禁用，则不响应更改
    if (isDisabled.value) return

    // 避免重复触发相同值
    if (safeEqual(selectedValue.value, value)) return

    try {
      // 仅在非受控模式下更新内部状态
      if (props.modelValue === undefined) {
        internalValue.value = value
      }

      // 触发 v-model 更新 (总是触发，让父组件决定如何处理)
      emit('update:modelValue', value)
      // 触发 change 事件
      emit('change', value)
    } catch (error) {
      console.error('[RadioGroup] Error in changeValue:', error)
    }
  }
  // #endregion
  // ==================================================

  // ==================================================
  // #region 监听器与上下文
  // ==================================================

  // --- 监听外部 v-model 变化 (用于受控组件同步内部状态，但不完全覆盖) ---
  // @description 当外部 modelValue 变化时，如果内部值不同，进行同步
  // @note 这里的同步主要用于确保 selectedValue 计算属性的正确性，
  //       changeValue 中仍然会优先判断 modelValue 是否存在来决定行为。
  watch(
    () => props.modelValue,
    (newValue) => {
      try {
        // 如果是首次初始化且已有默认值，避免覆盖
        if (!isInitialized.value && props.defaultValue !== undefined) {
          isInitialized.value = true
          return
        }

        // 仅在 newValue 明确定义且与内部值不同时更新内部状态
        // 避免在非受控转受控时错误地覆盖 defaultValue
        if (newValue !== undefined && !safeEqual(newValue, internalValue.value)) {
          internalValue.value = newValue
          isInitialized.value = true
        }
      } catch (error) {
        console.error('[RadioGroup] Error in modelValue watcher:', error)
      }
    }
  )

  // --- 提供上下文给子 Radio ---
  // @description 将 Group 的状态和方法通过 provide/inject 传递给子 Radio
  const context: RadioGroupContext = {
    selectedValue,
    disabled: isDisabled,
    name: groupName,
    size: groupSize,
    optionType: groupOptionType,
    buttonStyle: groupButtonStyle,
    changeValue
  }
  provide(RADIO_GROUP_KEY, context)

  // #endregion
  // ==================================================

  return {
    selectedValue,
    changeValue,
    groupName, // 可能在 RadioGroup 组件模板中有用
    isDisabled // 暴露禁用状态以便外部访问
    // 可以根据需要暴露其他状态或方法
  }
}
