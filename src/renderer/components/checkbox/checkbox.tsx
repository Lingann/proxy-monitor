/**
 * ******************************************************
 * @file                     checkbox.tsx
 * @description             「复选框组件」
 * 定义复选框组件的实现
 * @author                  blancnova-web
 * ******************************************************
 */

import './styles/index.scss'

import type { SetupContext } from 'vue'
import { computed, defineComponent, inject } from 'vue'

import { useCheckbox } from './composables'
import { CHECKBOX_GROUP_KEY, type CheckboxGroupContext } from './composables/use-checkbox-group'
import { type CheckboxProps, checkboxProps } from './props'
import type { CheckboxChangeEvent, CheckboxValueType } from './types'

// 定义更精确的 Emit 类型 (合并 focus/blur)
interface CheckboxEmit {
  (e: 'update:modelValue', value: boolean): void
  (e: 'change', event: CheckboxChangeEvent): void
  (e: 'focus' | 'blur', event: FocusEvent): void
}

/**
 * 复选框组件
 * @description 基于 Ant Design 规范实现的复选框组件
 */
export const BnCheckbox = defineComponent({
  name: 'BnCheckbox',

  props: checkboxProps(),

  // 保持 v-model 的事件名称
  emits: ['update:modelValue', 'change', 'focus', 'blur'],

  setup(props: CheckboxProps, { emit, slots }: SetupContext<CheckboxEmit>) {
    // 获取复选框组上下文
    const checkboxGroupContext = inject<CheckboxGroupContext | null>(CHECKBOX_GROUP_KEY, null)
    const isInGroup = computed(() => checkboxGroupContext !== null && props.value !== undefined)

    // 获取独立复选框的逻辑 (传入原始 props 和显式转换的 emit)
    const standalone = useCheckbox(props, emit as CheckboxEmit)

    // --- 状态计算 ---

    // 最终禁用状态：优先考虑 Group 的 disabled
    const finalIsDisabled = computed(() =>
      isInGroup.value
        ? checkboxGroupContext?.disabled?.value || props.disabled // Group 优先，再看自身
        : standalone.isDisabled.value // 独立状态
    )

    // 最终选中状态：优先考虑 Group 的 checkedValue
    const finalIsChecked = computed(() =>
      isInGroup.value
        ? checkboxGroupContext?.checkedValue.value?.includes(props.value as CheckboxValueType) ?? false
        : standalone.isChecked.value // 独立状态，与 props.modelValue 同步
    )

    // 最终尺寸：优先考虑 Group 的 size
    const finalSize = computed(() =>
      isInGroup.value
        ? checkboxGroupContext?.size || props.size // 直接访问 context 的 size
        : props.size // 独立状态
    )

    // 最终 name 属性：仅在 Group 中有意义
    const finalName = computed(() =>
      isInGroup.value ? checkboxGroupContext?.name : undefined // 直接访问 context 的 name
    )

    // --- 样式计算 ---
    const checkboxClass = computed(() => {
      // Indeterminate 状态优先于 checked 状态显示，并且仅在未选中时应用
      const isActuallyIndeterminate = props.indeterminate && !finalIsChecked.value

      return [
        'bn-checkbox',
        !isActuallyIndeterminate && finalIsChecked.value && 'bn-checkbox--checked',
        finalIsDisabled.value && 'bn-checkbox--disabled',
        isActuallyIndeterminate && 'bn-checkbox--indeterminate',
        finalSize.value && `bn-checkbox--${finalSize.value}`
      ]
    })

    // --- 事件处理 ---
    const handleChange = (e: Event) => {
      if (finalIsDisabled.value) return

      const target = e.target as HTMLInputElement
      const checked = target.checked

      // 创建 change 事件对象 (无论是否在 group 中都可能需要)
      const changeEvent: CheckboxChangeEvent = {
        target: {
          checked,
          value: props.value // 使用 props.value
        },
        stopPropagation: () => e.stopPropagation(),
        preventDefault: () => e.preventDefault(),
        nativeEvent: e
      }

      // 在 Group 中且 props.value 有效时，更新 Group 状态
      if (isInGroup.value && checkboxGroupContext && props.value !== undefined) {
        checkboxGroupContext.registerValue(props.value, checked)
        ;(emit as CheckboxEmit)('change', changeEvent) // 使用类型断言调用 emit
      } else {
        // 独立状态：调用 standalone 的 handleChange
        // 它会 emit 'update:modelValue' 和 'change'
        standalone.handleChange(e)
      }
    }

    const handleFocus = (e: FocusEvent) => {
      (emit as CheckboxEmit)('focus', e) // 使用类型断言调用 emit
    }

    const handleBlur = (e: FocusEvent) => {
      (emit as CheckboxEmit)('blur', e) // 使用类型断言调用 emit
    }

    return () => (
      <label class={checkboxClass.value}>
        <span class="bn-checkbox__inner" />
        <input
          // 常规 props (alphabetical)
          autoFocus={props.autoFocus}
          checked={finalIsChecked.value}
          disabled={finalIsDisabled.value}
          name={finalName.value} // 可能为 undefined
          type="checkbox"
          value={props.value as CheckboxValueType}
          // 事件处理函数 (alphabetical)
          onBlur={handleBlur}
          onChange={handleChange}
          onFocus={handleFocus}
        />
        {slots.default && (
          <span class="bn-checkbox__label">
            {slots.default()}
          </span>
        )}
      </label>
    )
  }
})
