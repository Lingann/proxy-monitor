/**
 * ******************************************************
 * @file                     bn-input-password.tsx
 * @description             「密码输入框组件」
 * 预设密码图标和切换可见性的输入框组件
 * @author                  blancnova-web
 * ******************************************************
 */

import { Eye, EyeOff, Lock } from 'lucide-vue-next'
import { computed, defineComponent, h, onUnmounted, ref } from 'vue'

import { useInputEvent } from '../../composables/use-input-event'
import { BnInput } from '../../input'
import { inputPasswordProps } from './props/input-password-props'

/* ================================================== */
/* 区域：组件定义 */
/* ================================================== */

export const BnInputPassword = defineComponent({
  name: 'BnInputPassword',
  inheritAttrs: false,
  emits: ['update:modelValue'],
  props: inputPasswordProps(),
  setup(props, { attrs, emit }) {
    /* 内部状态 */
    const visibleRef = ref(false)

    /* 计算属性 */
    const inputTypeRef = computed(() => visibleRef.value ? 'text' : 'password')

    /* 使用基础事件处理 */
    const {
      handleInput,
      handleChange,
      handleFocus,
      handleBlur,
      handleClear
    } = useInputEvent(props, emit)

    /* 切换密码可见性 */
    const toggleVisibility = () => {
      visibleRef.value = !visibleRef.value
    }

    /* 资源清理 */
    onUnmounted(() => {
      visibleRef.value = false
    })

    /* 渲染函数 */
    const renderPrefixIcon = () => (
      <span class="bn-input__prefix">
        {h(Lock, { size: 16 })}
      </span>
    )

    const renderSuffixIcon = () => {
      if (!props.visibilityToggle) return null

      return (
        <span class="bn-input__suffix">
          {visibleRef.value ? (
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
        type={inputTypeRef.value}
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

/* ================================================== */
/* 区域结束：组件定义 */
/* ================================================== */

export default BnInputPassword
