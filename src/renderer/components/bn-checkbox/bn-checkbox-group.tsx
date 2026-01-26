/**
 * ******************************************************
 * @file                     checkbox-group.tsx
 * @description             「复选框组组件」
 * 定义复选框组组件的实现
 * @author                  blancnova-web
 * ******************************************************
 */

import { defineComponent } from 'vue'

import { BnCheckbox } from './bn-checkbox'
import { useCheckboxGroup } from './composables'
import { checkboxGroupProps } from './props'

/**
 * 复选框组组件
 * @description 基于 Ant Design 规范实现的复选框组组件
 */
export const BnCheckboxGroup = defineComponent({
  name: 'BnCheckboxGroup',

  props: checkboxGroupProps(),

  setup(props, { slots }) {
    /* 使用复选框组逻辑 */
    const {
      checkedValue,
      isDisabled,
      normalizedOptions,
      checkboxGroupClass
    } = useCheckboxGroup(props)

    return () => (
      <div class={checkboxGroupClass.value}>
        {/* 渲染子节点 */}
        {slots.default?.()}

        {/* 渲染选项 */}
        {normalizedOptions.value.map((option) => (
          <BnCheckbox
            disabled={option.disabled || isDisabled.value}
            key={option.value.toString()}
            value={option.value}
          >
            {option.label}
          </BnCheckbox>
        ))}
      </div>
    )
  }
})
