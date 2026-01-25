/**
 * ******************************************************
 * @file                     input.tsx
 * @description             「基础输入框组件」
 * 提供基础的输入框功能，支持字数统计
 * @author                  blancnova-web
 * ******************************************************
 */

import './styles/index.scss'

import { computed, defineComponent } from 'vue'

import { useInputEvent } from './composables/use-input-event'
import { inputProps } from './props/input-props'

// ==================================================
// #region 组件定义
// ==================================================

export const BnInput = defineComponent({
  name: 'BnInput',
  inheritAttrs: false,
  props: inputProps(),
  emits: ['update:modelValue', 'input', 'change', 'focus', 'blur', 'clear'],
  setup(props, { emit, attrs, slots }) {
    const type = computed(() => props.type)

    // 使用事件处理组合式函数
    const {
      focused,
      handleInput,
      handleChange,
      handleFocus,
      handleBlur: baseHandleBlur,
      handleClear
    } = useInputEvent(emit, props.maxLength)

    // 包装 blur 事件处理以支持 trim
    const handleBlur = (event: FocusEvent) => {
      baseHandleBlur(event, props.trim, props.modelValue)
    }

    // 过滤掉class属性，避免传递到input元素
    const { class: _, ...inputAttrs } = attrs

    // 计算当前字数
    const currentLength = computed(() => props.modelValue?.length ?? 0)

    // 计算是否超出最大长度
    const isExceeded = computed(() => {
      if (!props.maxLength) return false
      return currentLength.value > props.maxLength
    })

    // 渲染函数
    return () => (
      <div
        class={[
          'bn-input',
          { 'bn-input--block': props.block },
          { [`bn-input--${props.size}`]: props.size !== 'medium' },
          attrs.class
        ]}
      >
        <div
          class={[
            'bn-input__wrapper',
            {
              'bn-input__wrapper--focused': focused.value,
              'bn-input__wrapper--disabled': props.disabled,
              'bn-input__wrapper--error': props.error
            }
          ]}
        >
          {slots.prefix?.()}
          <input
            class={[
              'bn-input__inner',
              {
                'bn-input__inner--error': props.error,
                'bn-input__inner--disabled': props.disabled,
                'bn-input__inner--readonly': props.readonly
              }
            ]}
            disabled={props.disabled}
            maxlength={props.maxLength}
            placeholder={props.placeholder}
            readonly={props.readonly}
            type={type.value}
            value={props.modelValue}
            onBlur={handleBlur}
            onChange={handleChange}
            onFocus={handleFocus}
            onInput={(e: Event) => handleInput((e.target as HTMLInputElement).value)}
            {...inputAttrs}
          />
          {slots.suffix?.()}
          {props.clearable && props.modelValue && !props.disabled && !props.readonly && (
            <span class="bn-input__clear" onClick={handleClear}>
              <span class="bn-input__clear-icon">
                <svg aria-hidden="true" data-icon="close" fill="currentColor" focusable="false" height="1em" viewBox="64 64 896 896" width="1em">
                  <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z" />
                </svg>
              </span>
            </span>
          )}
        </div>
        {(props.error && props.errorMessage) && (
          <div class="bn-input__error-message">{props.errorMessage}</div>
        )}
        {props.showCount && (
          <div
            class={[
              'bn-input__count',
              { 'bn-input__count--exceeded': isExceeded.value }
            ]}
          >
            {currentLength.value}{props.maxLength ? ` / ${props.maxLength}` : ''}
          </div>
        )}
      </div>
    )
  }
})

// #endregion
// ==================================================

export default BnInput
