import { ref, watch, onMounted, onUnmounted, Ref, nextTick } from 'vue';
import * as echarts from 'echarts';
import { TrafficHistoryItem } from '../types';
import { useI18n } from 'vue-i18n';

export function useMonitorChart(chartContainer: Ref<HTMLElement | null>, history: Ref<TrafficHistoryItem[]>) {
    const { t } = useI18n();
    let chartInstance: echarts.ECharts | null = null;

    const formatSpeed = (bytesPerSec: number): string => {
        if (!bytesPerSec) return '0 B/s';
        if (bytesPerSec < 1024) return Math.round(bytesPerSec) + ' B/s';
        if (bytesPerSec < 1024 * 1024) return (bytesPerSec / 1024).toFixed(1) + ' KB/s';
        return (bytesPerSec / 1024 / 1024).toFixed(1) + ' MB/s';
    };

    const updateChart = () => {
        if (!chartInstance) return;

        const option = {
            tooltip: {
                trigger: 'axis',
                formatter: (params: any) => {
                    let res = '';
                    if (params[0] && params[0].value && params[0].value[0]) {
                         res = `${params[0].value[0].toLocaleTimeString()}<br/>`;
                    }
                    params.forEach((item: any) => {
                        res += `${item.marker} ${item.seriesName}: ${formatSpeed(item.value[1])}<br/>`;
                    });
                    return res;
                },
                axisPointer: {
                    animation: false
                }
            },
            legend: {
                data: [t('monitor.total_upload'), t('monitor.total_download')],
                top: 0,
                icon: 'circle'
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                top: '12%',
                containLabel: true
            },
            xAxis: {
                type: 'time',
                splitLine: {
                    show: false
                },
                axisLabel: {
                    formatter: '{HH}:{mm}:{ss}'
                }
            },
            yAxis: {
                type: 'value',
                boundaryGap: [0, '100%'],
                splitLine: {
                    show: false
                },
                axisLabel: {
                    formatter: (value: number) => {
                        if (value === 0) return '0';
                        if (value < 1024) return `${value} B/s`;
                        if (value < 1024 * 1024) return `${(value / 1024).toFixed(1)} KB/s`;
                        return `${(value / 1024 / 1024).toFixed(1)} MB/s`;
                    }
                }
            },
            series: [
                {
                    name: t('monitor.total_upload'),
                    type: 'line',
                    showSymbol: false,
                    data: history.value.map(item => [item.time, item.upload]),
                    itemStyle: { color: '#d96a6a' },
                    areaStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: 'rgba(217, 106, 106, 0.5)' },
                            { offset: 1, color: 'rgba(217, 106, 106, 0.1)' }
                        ])
                    }
                },
                {
                    name: t('monitor.total_download'),
                    type: 'line',
                    showSymbol: false,
                    data: history.value.map(item => [item.time, item.download]),
                    itemStyle: { color: '#5d9bc9' },
                    areaStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: 'rgba(93, 155, 201, 0.5)' },
                            { offset: 1, color: 'rgba(93, 155, 201, 0.1)' }
                        ])
                    }
                }
            ]
        };

        chartInstance.setOption(option);
    };

    const initChart = () => {
        if (!chartContainer.value || chartInstance) return;
        chartInstance = echarts.init(chartContainer.value);
        updateChart();
        
        window.addEventListener('resize', handleResize);
    };

    const handleResize = () => {
        chartInstance?.resize();
    };

    watch(() => history.value, () => {
        if (!chartInstance) {
            initChart();
        } else {
            updateChart();
        }
    }, { deep: true });

    onMounted(() => {
        // Delay init to ensure DOM is ready
        nextTick(() => {
            initChart();
        });
    });

    onUnmounted(() => {
        window.removeEventListener('resize', handleResize);
        chartInstance?.dispose();
    });

    return {
        initChart,
        updateChart
    };
}
