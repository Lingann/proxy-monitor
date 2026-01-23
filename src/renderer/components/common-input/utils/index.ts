import { h } from 'vue';

/**
 * Helper to render icon
 * @param icon Component or VNode
 */
export const renderIcon = (icon: any) => {
  if (!icon) return null;
  // If it's a component definition (object with render or setup), render it as a component
  if (typeof icon === 'object' && (icon.render || icon.setup || icon.template)) {
    return h(icon);
  }
  // Otherwise assume it's a VNode or something renderable
  return icon;
};
