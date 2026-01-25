/**
 * ******************************************************
 * @file                     password-input.tsx
 * @description             「密码输入框组件」
 * 预设密码图标和切换可见性的输入框组件
 * @author                  blancnova-web
 * ******************************************************
 */

import { Eye, EyeOff, Lock } from 'lucide-vue-next'
import { computed, defineComponent, h, ref } from 'vue'

import { useInputEvent } from './composables/use-input-event'
import { BnInput } from './input'
import { passwordInputProps } from './props/password-input-props'

// ==================================================
// #region 组件定义
// ==================================================

export const BnPasswordInput = defineComponent({
  name: 'BnPasswordInput',
  inheritAttrs: false,
  props: passwordInputProps(),
  emits: ['update:modelValue', 'input', 'change', 'focus', 'blur', 'clear'],
  setup(props, { emit, attrs }) {
    // 内部状态
    const visible = ref(false)

    // 计算属性
    const inputType = computed(() => visible.value ? 'text' : 'password')

    // 使用基础事件处理
    const {
      handleInput,
      handleChange,
      handleFocus,
      handleBlur,
      handleClear
    } = useInputEvent(emit)

    // 切换密码可见性
    const toggleVisibility = () => {
      visible.value = !visible.value
    }

    // 渲染函数
    const renderPrefixIcon = () => (
      <span class="bn-input__prefix">
        {h(Lock, { size: 16 })}
      </span>
    )

    const renderSuffixIcon = () => {
      if (!props.visibilityToggle) return null

      return (
        <span class="bn-input__suffix">
          {visible.value ? (
            h(Eye, {
              size: 16,
              class: 'bn-input__visibility-icon',
              onClick: toggleVisibility
            })
          ) : (
            h(EyeOff, {
              size: 16,
              class: 'bn-input__visibility-icon',
              onClick: toggleVisibility
            })
          )}
        </span>
      )
    }

    return () => (
      <BnInput
        {...props}
        {...attrs}
        class={['bn-input-password', attrs.class]}
        type={inputType.value}
        v-slots={{
          prefix: renderPrefixIcon,
          suffix: renderSuffixIcon
        }}
        onBlur={handleBlur}
        onChange={handleChange}
        onClear={handleClear}
        onFocus={handleFocus}
        onUpdate:modelValue={handleInput}
      />
    )
  }
})

// #endregion
// ==================================================

export default BnPasswordInput
