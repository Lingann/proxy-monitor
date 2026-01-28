/**
 * ******************************************************
 * @file                     types/index.ts
 * @description             「复选框组件类型定义」
 * 定义复选框组件的所有类型和接口
 * @author                  blancnova-web
 * ******************************************************
 */

// ==================================================
// #region 基础类型定义
// ==================================================

/**
 * 复选框尺寸类型
 */
export type CheckboxSize = 'small' | 'medium' | 'large'

/**
 * 复选框状态类型
 */
export type CheckboxState = 'default' | 'hover' | 'active' | 'disabled' | 'focus'

/**
 * 复选框值类型
 */
export type CheckboxValueType = string | number | boolean

/**
 * 复选框选项配置
 */
export interface CheckboxOptionType {

  /** 选项标签 */
  label: string

  /** 选项值 */
  value: CheckboxValueType

  /** 是否禁用 */
  disabled?: boolean
}

// #endregion
// ==================================================

// ==================================================
// #region 事件类型定义
// ==================================================

/**
 * 复选框变更事件类型
 * 遵循防御式编程，确保类型安全
 */
export interface CheckboxChangeEvent {
  target: {
    checked: boolean
    value?: CheckboxValueType
  }
  stopPropagation: () => void
  preventDefault: () => void
  nativeEvent?: Event
}

/**
 * 复选框组件事件接口
 */
export interface CheckboxEvents {

  /** 选中状态变更事件 */
  'update:checked': boolean

  /** 选中状态变更事件 */
  'update:modelValue': boolean

  /** 变更事件 */
  change: CheckboxChangeEvent

  /** 获得焦点事件 */
  focus: FocusEvent

  /** 失去焦点事件 */
  blur: FocusEvent
}

/**
 * 复选框组事件接口
 */
export interface CheckboxGroupEvents {

  /** 选中值更新事件 */
  'update:modelValue': CheckboxValueType[]

  /** 变更事件 */
  change: CheckboxValueType[]
}

// #endregion
// ==================================================

// ==================================================
// #region 属性接口定义
// ==================================================

/**
 * 复选框组件属性接口
 */
export interface CheckboxProps {

  /** 指定当前是否选中 */
  checked?: boolean

  /** 初始是否选中 */
  defaultChecked?: boolean

  /** 是否禁用 */
  disabled?: boolean

  /** 设置 indeterminate 状态，只负责样式控制 */
  indeterminate?: boolean

  /** 值 */
  value?: CheckboxValueType

  /** 尺寸 */
  size?: CheckboxSize

  /** 同 checked，用于 v-model 双向绑定 */
  modelValue?: boolean

  /** 自动获取焦点 */
  autoFocus?: boolean
}

/**
 * 复选框组属性接口
 */
export interface CheckboxGroupProps {

  /** 默认选中的选项 */
  defaultValue?: CheckboxValueType[]

  /** 是否禁用 */
  disabled?: boolean

  /** 指定选中的选项，用于 v-model 绑定 */
  modelValue?: CheckboxValueType[]

  /** 指定可选项 */
  options?: Array<CheckboxOptionType | string | number>

  /** 整体尺寸 */
  size?: CheckboxSize

  /** 用于设置复选框 name 属性 */
  name?: string
}

// #endregion
// ==================================================
