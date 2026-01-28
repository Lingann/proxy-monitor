/* ****************************************************** */
/* 文件: types.ts */
/* 描述: 选择器组件类型定义 */
/* 定义选择器组件的类型 */
/* 作者: blancnova-web */
/* ****************************************************** */

/* 基础类型 */

/* 选择器尺寸 */
export type SelectSize = 'small' | 'medium' | 'large'

/* 下拉框位置 */
export type DropdownPosition = 'top' | 'bottom'

/* 选项类型 */

/* 选择器选项 */
export interface SelectOption {
  /* 选项标签 */
  label: string

  /* 选项值 */
  value: string | number

  /* 是否禁用 */
  disabled?: boolean
}
