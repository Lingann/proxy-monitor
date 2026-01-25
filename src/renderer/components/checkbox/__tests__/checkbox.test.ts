/**
 * ******************************************************
 * @file                     checkbox.test.ts
 * @description             「复选框组件测试」
 * 复选框组件的单元测试
 * @author                  blancnova-web
 * ******************************************************
 */

import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import { BnCheckbox, BnCheckboxGroup } from '..'

describe('BnCheckbox', () => {
  // 基本渲染测试
  it('should render correctly', () => {
    const wrapper = mount(BnCheckbox, {
      slots: {
        default: '测试复选框'
      }
    })

    expect(wrapper.find('.bn-checkbox').exists()).toBe(true)
    expect(wrapper.find('.bn-checkbox__inner').exists()).toBe(true)
    expect(wrapper.find('input[type="checkbox"]').exists()).toBe(true)
    expect(wrapper.find('.bn-checkbox__label').text()).toBe('测试复选框')
  })

  // 默认未选中状态测试
  it('should be unchecked by default', () => {
    const wrapper = mount(BnCheckbox)
    const input = wrapper.find('input[type="checkbox"]')

    expect((input.element as HTMLInputElement).checked).toBe(false)
    expect(wrapper.classes()).not.toContain('bn-checkbox--checked')
  })

  // 默认选中状态测试
  it('should be checked when defaultChecked is true', () => {
    const wrapper = mount(BnCheckbox, {
      props: {
        defaultChecked: true
      }
    })

    const input = wrapper.find('input[type="checkbox"]')
    expect((input.element as HTMLInputElement).checked).toBe(true)
    expect(wrapper.classes()).toContain('bn-checkbox--checked')
  })

  // 受控模式测试
  it('should support controlled mode', async () => {
    const wrapper = mount(BnCheckbox, {
      props: {
        checked: false
      }
    })

    expect((wrapper.find('input[type="checkbox"]').element as HTMLInputElement).checked).toBe(false)

    await wrapper.setProps({ checked: true })
    expect((wrapper.find('input[type="checkbox"]').element as HTMLInputElement).checked).toBe(true)
  })

  // 禁用状态测试
  it('should support disabled state', () => {
    const wrapper = mount(BnCheckbox, {
      props: {
        disabled: true
      }
    })

    expect((wrapper.find('input[type="checkbox"]').element as HTMLInputElement).disabled).toBe(true)
    expect(wrapper.classes()).toContain('bn-checkbox--disabled')
  })

  // 半选状态测试
  it('should support indeterminate state', () => {
    const wrapper = mount(BnCheckbox, {
      props: {
        indeterminate: true
      }
    })

    expect(wrapper.classes()).toContain('bn-checkbox--indeterminate')
  })
})

describe('BnCheckboxGroup', () => {
  // 基本渲染测试
  it('should render correctly', () => {
    const wrapper = mount(BnCheckboxGroup, {
      props: {
        options: ['选项1', '选项2', '选项3']
      }
    })

    expect(wrapper.find('.bn-checkbox-group').exists()).toBe(true)
    expect(wrapper.findAll('.bn-checkbox').length).toBe(3)
  })

  // 默认选中值测试
  it('should support default values', () => {
    const wrapper = mount(BnCheckboxGroup, {
      props: {
        options: ['选项1', '选项2', '选项3'],
        defaultValue: ['选项1', '选项3']
      }
    })

    const checkboxes = wrapper.findAll('input[type="checkbox"]')
    expect((checkboxes[0].element as HTMLInputElement).checked).toBe(true)
    expect((checkboxes[1].element as HTMLInputElement).checked).toBe(false)
    expect((checkboxes[2].element as HTMLInputElement).checked).toBe(true)
  })

  // 禁用整组测试
  it('should support disabled group', () => {
    const wrapper = mount(BnCheckboxGroup, {
      props: {
        options: ['选项1', '选项2', '选项3'],
        disabled: true
      }
    })

    expect(wrapper.classes()).toContain('bn-checkbox-group--disabled')

    const checkboxes = wrapper.findAll('.bn-checkbox')
    checkboxes.forEach(checkbox => {
      expect(checkbox.classes()).toContain('bn-checkbox--disabled')
    })

    const inputs = wrapper.findAll('input[type="checkbox"]')
    inputs.forEach(input => {
      expect((input.element as HTMLInputElement).disabled).toBe(true)
    })
  })

  // 自定义选项测试
  it('should support custom options', () => {
    const options = [
      { label: '选项A', value: 'A' },
      { label: '选项B', value: 'B', disabled: true },
      { label: '选项C', value: 'C' }
    ]

    const wrapper = mount(BnCheckboxGroup, {
      props: { options }
    })

    const checkboxLabels = wrapper.findAll('.bn-checkbox__label')
    expect(checkboxLabels[0].text()).toBe('选项A')
    expect(checkboxLabels[1].text()).toBe('选项B')
    expect(checkboxLabels[2].text()).toBe('选项C')

    const checkboxes = wrapper.findAll('.bn-checkbox')
    expect(checkboxes[1].classes()).toContain('bn-checkbox--disabled')
  })
})
