/**
 * ******************************************************
 * @file                     index.ts
 * @description             「徽章组件导出」
 * 导出徽章组件相关内容
 * @author                  blancnova-web
 * ******************************************************
 */

import { BnBadge } from './badge'
import type { BadgeProps } from './props'
import type { BadgeColor, BadgeShape, BadgeSize, BadgeStatus } from './types'

export { BnBadge }
export type {
  BadgeProps,
  BadgeColor,
  BadgeSize,
  BadgeShape,
  BadgeStatus
}

export default BnBadge
