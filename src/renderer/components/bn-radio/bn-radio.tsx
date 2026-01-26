/**
 * ******************************************************
 * @file                     radio.tsx
 * @description             「单选框组件」
 * 定义 Radio 组件的实现，可以是标准 Radio 或 Radio Button
 * @author                  blancnova-web
 * ******************************************************
 */

import './styles/index.scss'

import { computed, defineComponent, Fragment, onErrorCaptured, onMounted, ref, watch } from 'vue'

import { useRadio } from './composables'
import type { RadioEmitFn } from './composables/use-radio'
import { createRadioProps, type RadioProps } from './props/radio-props'

/**
 * 单选框组件
 * @description 支持标准 Radio 和 Radio Button 样式
 */
export const BnRadio = defineComponent<RadioProps>({
  name: 'BnRadio',
  inheritAttrs: false, // 避免非 prop 属性渲染到根元素

  props: createRadioProps(),

  // 扩展emits，支持v-model
  emits: ['update:modelValue', 'change', 'focus', 'blur'] as const,

  setup(props, { emit, slots, attrs }) {
    // 错误处理状态
    const hasError = ref(false)
    const errorMessage = ref<string | null>(null)

    // 内部状态，优先使用modelValue，然后是checked，再是defaultChecked
    const innerChecked = ref(props.modelValue ?? props.checked ?? props.defaultChecked ?? false)

    // 监听modelValue变化（v-model双向绑定的关键）
    watch(
      () => props.modelValue,
      (newValue) => {
        if (newValue !== undefined) {
          innerChecked.value = newValue
        }
      }
    )

    // 监听checked变化（兼容旧的props接口）
    watch(
      () => props.checked,
      (newValue) => {
        if (newValue !== undefined) {
          innerChecked.value = newValue
        }
      }
    )

    // 捕获组件内部错误
    onErrorCaptured((err) => {
      console.error('[Radio] Caught internal error:', err)
      hasError.value = true
      errorMessage.value = String(err)
      return false // 阻止错误继续传播
    })

    // 使用组合式函数管理状态
    const {
      radioRef,
      isChecked,
      isDisabled,
      isRadioButton,
      finalName,
      handleChange: originalHandleChange,
      handleFocus,
      handleBlur,
      setupAutoFocus
    } = useRadio(props, emit as RadioEmitFn)

    // 扩展handleChange，支持v-model
    const handleChange = (e: Event) => {
      // 如果禁用，直接返回
      if (isDisabled.value) return

      const target = e.target as HTMLInputElement
      const checked = target.checked

      // 触发v-model更新
      emit('update:modelValue', checked)

      // 调用原始handleChange处理其他逻辑
      originalHandleChange(e)
    }

    // --- 样式计算 ---

    // 组件根元素的类名
    const wrapperClass = computed(() => [
      isRadioButton.value ? 'bn-radio-button' : 'bn-radio',
      isChecked.value && `${isRadioButton.value ? 'bn-radio-button' : 'bn-radio'}--checked`,
      isDisabled.value && `${isRadioButton.value ? 'bn-radio-button' : 'bn-radio'}--disabled`,
      props.size && `${isRadioButton.value ? 'bn-radio-button' : 'bn-radio'}--${props.size}`,
      hasError.value && `${isRadioButton.value ? 'bn-radio-button' : 'bn-radio'}--has-error`
    ])

    // 组件自定义样式
    const wrapperStyle = computed(() => {
      return {}
    })

    // --- 生命周期 ---
    onMounted(() => {
      // 设置自动聚焦
      setupAutoFocus()
    })

    // --- 渲染逻辑 ---

    /**
     * 渲染 Radio 的核心内容 (input 和 label 文本)
     * @returns VNode
     * @complexity O(1) - 结构固定
     */
    const renderContent = () => {
      try {
        // 标准 Radio 和 Radio Button 共用的 input 元素
        const inputElement = (
          <input
            // Standard HTML Attributes (alphabetical)
            {...attrs} // Spread non-prop attributes first
            autofocus={props.autoFocus}
            checked={isChecked.value}
            class={`${isRadioButton.value ? 'bn-radio-button' : 'bn-radio'}__input`}
            disabled={isDisabled.value}
            id={props.id} // Use id from props if provided
            name={finalName.value} // Name from props or group
            ref={radioRef}
            title={props.title}
            type="radio"
            value={props.value} // The value associated with this radio
            // Event Handlers (alphabetical)
            onBlur={handleBlur}
            onChange={handleChange}
            onFocus={handleFocus}
          />
        )

        if (isRadioButton.value) {
          // Radio Button 模式: 只有 input 和 span.label
          return (
            <Fragment>
              {inputElement}
              <span class="bn-radio-button__label">
                {/* 优先使用默认插槽， fallback 到 value */}
                {slots.default ? slots.default() : String(props.value)}
              </span>
            </Fragment>
          )
        } else {
          // Standard Radio 模式: input, span.inner (视觉元素), span.label
          return (
            <Fragment>
              {/* 视觉上的圆圈 */}
              <span class="bn-radio__inner" />
              {inputElement}
              {/* Label 文本 (仅当有默认插槽时渲染) */}
              {slots.default && (
                <span class="bn-radio__label">
                  {slots.default()}
                </span>
              )}
            </Fragment>
          )
        }
      } catch (error) {
        console.error('[Radio] Error rendering content:', error)
        // 发生错误时渲染一个简单的错误指示器
        return <span class="bn-radio__error">加载错误</span>
      }
    }

    /**
     * 渲染错误提示
     * @returns 错误提示或null
     */
    const renderError = () => {
      if (!hasError.value || !errorMessage.value) return null

      return (
        <div class="bn-radio__error-message" role="alert">
          {errorMessage.value}
        </div>
      )
    }

    // 组件渲染
    return () => {
      try {
        return (
          <label
            aria-checked={isChecked.value}
            aria-disabled={isDisabled.value}
            class={wrapperClass.value}
            data-testid="bn-radio"
            style={wrapperStyle.value}
          >
            {renderError()}
            {renderContent()}
          </label>
        )
      } catch (error) {
        console.error('[Radio] Critical render error:', error)
        // 最坏情况下的备用渲染
        return <div class="bn-radio--fallback">组件渲染失败</div>
      }
    }
  }
})
