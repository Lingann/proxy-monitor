/**
 * ******************************************************
 * @file                     radio-group.tsx
 * @description             「单选框组组件」
 * 管理一组 Radio 或 Radio Button
 * @author                  blancnova-web
 * ******************************************************
 */

import './styles/index.scss' // Ensure styles are imported

import { computed, defineComponent, onErrorCaptured, ref, type SetupContext } from 'vue'

import { useRadioGroup } from './composables'
// 从 composables 目录导入 EmitFn 类型
import type { EmitFn } from './composables/use-radio-group'
import { createRadioGroupProps } from './props' // Removed type import as props are inferred
import { BnRadio } from './radio' // Import BnRadio
import type {
  RadioGroupEmit,
  RadioOptionType,
  RadioValueType
} from './types'

/**
 * 单选框组
 * @description 用于包裹多个 Radio 或 Radio Button，实现单选逻辑
 */
export const BnRadioGroup = defineComponent({
  name: 'BnRadioGroup',

  props: createRadioGroupProps(),

  // Use a simple array for emits, type checking happens in setup context
  emits: ['update:modelValue', 'change'] as const,

  setup(props, { emit, slots }: SetupContext<RadioGroupEmit>) {
    // 错误处理状态
    const hasError = ref(false)
    const errorMessage = ref<string | null>(null)

    // 捕获组件内部错误
    onErrorCaptured((err) => {
      console.error('[RadioGroup] Caught internal error:', err)
      hasError.value = true
      errorMessage.value = String(err)
      return false // 阻止错误继续传播
    })

    // Initialize composable for state management and context providing
    const { groupName, isDisabled } = useRadioGroup(props, emit as EmitFn)

    // --- 样式计算 ---
    // @description 根据 Props 计算组件根元素的 CSS 类
    // @complexity O(1) - 固定的条件判断
    const groupClass = computed(() => [
      'bn-radio-group',
      `bn-radio-group--${props.optionType ?? 'default'}`,
      // 根据 buttonStyle 添加类 (仅当 optionType 为 button 时)
      props.optionType === 'button' && `bn-radio-group--button-${props.buttonStyle ?? 'outline'}`,
      props.size && `bn-radio-group--${props.size}`,
      props.block && props.optionType === 'button' && 'bn-radio-group--block',
      // 使用组合式函数提供的isDisabled，而不是直接使用props.disabled
      isDisabled.value && 'bn-radio-group--disabled', // 添加禁用状态类
      hasError.value && 'bn-radio-group--has-error' // 添加错误状态类
    ])

    // --- 渲染逻辑 ---

    /**
     * 规范化 options 数组
     * @description 将 string/number 类型的 option 转换为 RadioOptionType 对象
     * @param options - 原始 options 数组
     * @returns 规范化后的 RadioOptionType 数组
     * @complexity O(n) - n 为 options 长度
     */
    const normalizeOptions = (options: Array<RadioOptionType | string | number>): RadioOptionType[] => {
      // 提前返回 - 如果 options 为空或非数组，返回空数组
      if (!Array.isArray(options)) return []

      return options.map((option): RadioOptionType => {
        // 提前返回 - 处理 null 或 undefined
        if (option == null) {
          console.warn('[RadioGroup] Received null/undefined option in options array')
          return { label: '无效选项', value: '' }
        }

        // 卫语句 - 处理 string 或 number 类型
        if (typeof option === 'string' || typeof option === 'number') {
          return { label: String(option), value: option }
        }

        // 确保 option 对象有 value 和 label
        if (!('value' in option) || option.value === undefined) {
          console.warn('[RadioGroup] Option missing required "value" property:', option)
          return {
            ...option,
            label: option.label || '未命名选项',
            value: option.value || ''
          }
        }

        // 确保 label 存在
        if (!('label' in option) || !option.label) {
          return { ...option, label: String(option.value) }
        }

        // 如果已经是有效对象，直接返回
        return option
      })
    }

    /**
     * 渲染通过 options prop 定义的 Radio
     * @returns VNode 数组或 null
     * @complexity O(n) - n 为 options 长度
     */
    const renderOptions = () => {
      try {
        // 提前返回 - 如果 options 不存在或为空
        if (!props.options || props.options.length === 0) return null

        const normalized = normalizeOptions(props.options)
        return normalized.map((option: RadioOptionType) => (
          <BnRadio
            // 优先使用 option 的 disabled，其次是 group 的 disabled
            disabled={option.disabled ?? isDisabled.value ?? false}
            id={option.id} // 如果 options 里提供了 id
            key={String(option.value)} // Ensure key is string or number
            name={groupName.value} // 使用从useRadioGroup获取的groupName
            style={option.style} // 如果 options 里提供了 style
            title={option.title} // 如果 options 里提供了 title
            value={option.value}
          >
            {/* 优先使用 option 插槽，其次是 label */}
            {slots.option ? slots.option({ option }) : option.label}
          </BnRadio>
        ))
      } catch (error) {
        console.error('[RadioGroup] Error in renderOptions:', error)
        return <div class="bn-radio-group__error">渲染选项时出错</div>
      }
    }

    /**
     * 渲染错误提示
     * @returns 错误提示或null
     */
    const renderError = () => {
      if (!hasError.value || !errorMessage.value) return null

      return (
        <div class="bn-radio-group__error-message" role="alert">
          {errorMessage.value}
        </div>
      )
    }

    return () => (
      <div
        aria-disabled={isDisabled.value}
        aria-invalid={hasError.value}
        aria-required={false} // 可根据实际需求设置
        class={groupClass.value}
        data-testid="bn-radio-group" // 添加测试ID
        name={groupName.value} // 使用从useRadioGroup获取的groupName
        role="radiogroup"
      >
        {/* 错误提示 */}
        {renderError()}

        {/* 优先渲染 options，否则渲染默认插槽 */}
        {props.options ? renderOptions() : slots.default?.()}
      </div>
    )
  }
})
