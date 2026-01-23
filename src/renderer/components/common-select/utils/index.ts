
import { h, Component, VNode } from 'vue';

/* 渲染图标的辅助函数 */
/* @param icon 组件或 VNode */
export const renderIcon = (icon?: Component | VNode | null) => {
  /* 如果没有图标，返回 null */
  if (!icon) {
    return null;
  }

  /* 如果是组件定义（具有 render 或 setup 的对象），则作为组件渲染 */
  if (typeof icon === 'object' && ('render' in icon || 'setup' in icon || 'template' in icon)) {
    return h(icon);
  }

  /* 否则假设它是 VNode 或其他可渲染的内容 */
  return icon;
};
