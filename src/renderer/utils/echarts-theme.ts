// @ts-ignore
const echarts = (window as any).echarts;

const notionTheme = {
  color: [
    '#2eaadc', // Blue
    '#e03e3e', // Red
    '#0f7b6c', // Teal
    '#d9730d', // Orange
    '#64473a', // Brown
    '#9b9a97', // Gray
    '#dfab01', // Yellow
    '#9065b0', // Purple
    '#c14c8a', // Pink
  ],
  backgroundColor: 'transparent',
  textStyle: {
    fontFamily: 'ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol"',
    color: '#37352f',
  },
  title: {
    textStyle: {
      color: '#37352f',
      fontWeight: 600,
    },
  },
  line: {
    smooth: true,
    symbol: 'circle',
    symbolSize: 8,
    lineStyle: {
      width: 2,
    },
  },
  grid: {
    containLabel: true,
    left: 10,
    right: 10,
    top: 40,
    bottom: 10,
  },
  tooltip: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderColor: '#e5e5e5',
    textStyle: {
      color: '#37352f',
    },
    extraCssText: 'box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); border-radius: 4px;',
  },
  categoryAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: '#e5e5e5',
      },
    },
    axisTick: {
      show: false,
    },
    axisLabel: {
      color: '#9b9a97',
    },
    splitLine: {
      show: false,
    },
  },
  valueAxis: {
    axisLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
    axisLabel: {
      color: '#9b9a97',
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: '#f0f0f0',
        type: 'dashed',
      },
    },
  },
};

export const initChart = (dom: HTMLElement) => {
  echarts.registerTheme('notion', notionTheme);
  return echarts.init(dom, 'notion');
};
