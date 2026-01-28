/* ****************************************************** */
/* @file                     use-badge-model-value.ts */
/* @description             「徽章组件双向绑定处理」 */
/* 管理徽章的双向绑定值与内部状态同步 */
/* @author                  blancnova-web */
/* ****************************************************** */

import { computed, ref, watch } from 'vue'

import type { BadgeProps } from '../props'
import type { BadgeCountValue, BadgeEmitFn } from '../types'

/* 使用徽章双向绑定 */
export function useBadgeModelValue(props: BadgeProps, emit: BadgeEmitFn) {
  /* 内部计数值 */
  const innerCount = ref<BadgeCountValue | undefined>(props.modelValue ?? props.count)

  /* 监听 v-model 变化 */
  watch(() => props.modelValue, (nextValue) => {
    if (nextValue === undefined) return

    innerCount.value = nextValue
  })

  /* 监听旧 count 变化 */
  watch(() => props.count, (nextValue) => {
    if (props.modelValue !== undefined) return

    innerCount.value = nextValue
  })

  /* 当前计数值 */
  const countValue = computed(() => innerCount.value)

  /* 同步计数值到外部 */
  const syncModelValue = (nextValue: BadgeCountValue | undefined) => {
    if (nextValue === undefined) return

    innerCount.value = nextValue

    if (props.modelValue !== undefined) emit('update:modelValue', nextValue)

    if (props.modelValue === undefined) emit('update:count', nextValue)
  }

  return {
    countValue,
    syncModelValue
  }
}
