/* ****************************************************** */
/* 文件: bn-select.tsx */
/* 描述: 选择器组件 */
/* 提供下拉选择功能 */
/* 作者: blancnova-web */
/* ****************************************************** */

import './styles/index.scss'

import { computed, defineComponent, toRef, watch } from 'vue'

import { useI18n } from 'vue-i18n'

import { ChevronDown, X } from 'lucide-vue-next'

import { useFieldValidation } from '../../shared/validation'
import { selectProps } from './props/select-props'
import { useSelectState } from './composables/use-select-state'
import { useSelectEvent } from './composables/use-select-event'
import { useSelectRender } from './composables/use-select-render'

/* 组件定义 */

export const BnSelect = defineComponent({
  name: 'BnSelect',

  props: selectProps(),

  emits: ['update:modelValue'],

  setup(props, { expose, emit }) {
    /* 国际化 */
    const { t } = useI18n()

    /* 绑定值引用 */
    const modelValueRef = toRef(props, 'modelValue')

    /* 规则引用 */
    const rulesRef = toRef(props, 'rules')

    /* 字段校验 */
    const {
      validateState,
      validateMessage,
      validate,
      clearValidate,
      showError
    } = useFieldValidation({
      fieldValue: modelValueRef,
      rules: rulesRef
    })

    /* 监听值变更触发校验 */
    watch(modelValueRef, () => {
      validate('change')
    })

    /* 组件状态 */
    const {
      containerRef,
      dropdownRef,
      isOpenRef,
      dropdownPositionRef,
      open,
      close,
      toggle
    } = useSelectState(props)

    /* 事件处理 */
    const {
      handleSelect,
      handleClear,
      handleFocus,
      handleBlur
    } = useSelectEvent({
      props,
      close
    }, emit)

    /* 失焦事件校验包装 */
    const handleBlurWithValidation = (event: FocusEvent) => {
      handleBlur(event)

      validate('blur')
    }

    /* 错误状态 */
    const isErrorRef = computed(() => props.error || validateState.value === 'error')

    /* 错误信息 */
    const errorMessageRef = computed(() => props.errorMessage || validateMessage.value)

    /* 是否展示错误信息 */
    const shouldShowErrorMessageRef = computed(() => isErrorRef.value && !!errorMessageRef.value)

    /* 渲染逻辑 */
    const {
      selectedOptionRef,
      containerClassesRef,
      dropdownClassesRef,
      containerStylesRef,
      dropdownStylesRef
    } = useSelectRender(props, isOpenRef, dropdownPositionRef, isErrorRef)

    /* 暴露公共方法 */
    expose({
      open,
      close,
      validate,
      clearValidate,
      showError
    })

    return () => (
      <div
        ref={containerRef}
        class={containerClassesRef.value}
        style={containerStylesRef.value}
      >
        <div
          class="bn-select__trigger"
          onClick={toggle}
          onFocus={handleFocus}
          onBlur={handleBlurWithValidation}
          tabindex={props.disabled ? -1 : 0}
        >
          <span class={['bn-select__value', { 'bn-select__value--placeholder': !selectedOptionRef.value }]}>
            {selectedOptionRef.value ? selectedOptionRef.value.label : props.placeholder || t('common.please_select')}
          </span>

          {props.clearable && selectedOptionRef.value && !props.disabled && (
            <span class="bn-select__clear" onClick={handleClear}>
              <X size={14} />
            </span>
          )}

          <span class="bn-select__arrow">
            <ChevronDown size={16} />
          </span>
        </div>

        <div
          ref={dropdownRef}
          class={dropdownClassesRef.value}
          style={dropdownStylesRef.value}
        >
          {props.options && props.options.length > 0 ? (
            props.options.map(opt => (
              <div
                key={opt.value}
                class={[
                  'bn-select__option',
                  {
                    'bn-select__option--selected': opt.value === props.modelValue,
                    'bn-select__option--disabled': opt.disabled
                  }
                ]}
                onClick={(e) => {
                  e.stopPropagation()
                  handleSelect(opt)
                }}
              >
                {opt.label}
              </div>
            ))
          ) : (
            <div class="bn-select__option bn-select__option--disabled">
              {t('common.no_options')}
            </div>
          )}
        </div>

        {shouldShowErrorMessageRef.value && (
          <div class="bn-select__error">{errorMessageRef.value}</div>
        )}
      </div>
    )
  }
})

export default BnSelect
