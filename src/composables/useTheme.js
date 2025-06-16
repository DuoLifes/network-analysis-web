import { ref, computed, onMounted, onBeforeUnmount } from 'vue';

/**
 * 主题管理组合式函数
 * 提供主题状态管理和图表颜色配置
 */
export function useTheme() {
  // 主题状态
  const currentTheme = ref('dark');
  
  // 根据主题获取图表颜色配置
  const getChartColors = computed(() => {
    const isLight = currentTheme.value === 'light';
    return {
      backgroundColor: isLight ? '#ffffff' : 'transparent',
      textColor: isLight ? '#333333' : '#ffffff',
      axisLineColor: isLight ? '#d9d9d9' : '#666666',
      axisLabelColor: isLight ? '#666666' : '#a0a0a0',
      splitLineColor: isLight ? '#f0f0f0' : '#404040',
      legendTextColor: isLight ? '#666666' : '#e0e0e0',
      tooltipBgColor: isLight ? 'rgba(255,255,255,0.95)' : 'rgba(50,50,50,0.9)',
      tooltipBorderColor: isLight ? '#e6e6e6' : '#666666',
      tooltipTextColor: isLight ? '#333333' : '#ffffff',
      splitAreaColors: isLight 
        ? ['rgba(0,0,0,0.02)', 'rgba(0,0,0,0.05)'] 
        : ['rgba(255,255,255,0.03)', 'rgba(255,255,255,0.08)']
    };
  });

  // 获取基础图表配置
  const getBaseChartConfig = computed(() => ({
    backgroundColor: getChartColors.value.backgroundColor,
    tooltip: {
      trigger: 'axis',
      backgroundColor: getChartColors.value.tooltipBgColor,
      borderColor: getChartColors.value.tooltipBorderColor,
      textStyle: { color: getChartColors.value.tooltipTextColor }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      axisLine: {
        lineStyle: { color: getChartColors.value.axisLineColor }
      },
      axisLabel: {
        color: getChartColors.value.axisLabelColor
      }
    },
    yAxis: {
      axisLine: {
        lineStyle: { color: getChartColors.value.axisLineColor }
      },
      axisLabel: {
        color: getChartColors.value.axisLabelColor
      },
      splitLine: {
        lineStyle: { color: getChartColors.value.splitLineColor }
      },
      splitArea: {
        show: true,
        areaStyle: {
          color: getChartColors.value.splitAreaColors
        }
      }
    }
  }));

  // 获取图例配置
  const getLegendConfig = (data) => ({
    data,
    top: 10,
    textStyle: { color: getChartColors.value.legendTextColor }
  });

  // 获取饼图标题配置
  const getPieTitleConfig = (text, subtext) => ({
    text,
    subtext,
    left: 'center',
    top: '38%',
    textStyle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: getChartColors.value.textColor
    },
    subtextStyle: {
      fontSize: 10,
      color: getChartColors.value.axisLabelColor
    }
  });

  // 获取柱状图配置
  const getBarChartConfig = (data, categoryData) => ({
    ...getBaseChartConfig.value,
    xAxis: {
      ...getBaseChartConfig.value.xAxis,
      type: 'category',
      data: categoryData,
      splitArea: {
        show: true,
        areaStyle: {
          color: getChartColors.value.splitAreaColors
        }
      }
    },
    yAxis: {
      ...getBaseChartConfig.value.yAxis,
      type: 'value'
    }
  });

  // 获取线图配置
  const getLineChartConfig = (data, categoryData, legendData) => ({
    ...getBaseChartConfig.value,
    xAxis: {
      ...getBaseChartConfig.value.xAxis,
      type: 'category',
      boundaryGap: false,
      data: categoryData
    },
    yAxis: {
      ...getBaseChartConfig.value.yAxis,
      type: 'value'
    },
    legend: getLegendConfig(legendData)
  });

  // 主题初始化和监听
  const initTheme = () => {
    // 从localStorage读取当前主题
    const savedTheme = localStorage.getItem('dashboard-theme') || 'dark';
    currentTheme.value = savedTheme;
    
    // 监听全局主题变化事件
    const handleThemeChange = (event) => {
      currentTheme.value = event.detail;
      console.log('Theme changed to:', event.detail);
    };
    
    window.addEventListener('theme-change', handleThemeChange);
    
    // 返回清理函数
    return () => {
      window.removeEventListener('theme-change', handleThemeChange);
    };
  };

  // 自动初始化主题监听
  onMounted(() => {
    const cleanup = initTheme();
    onBeforeUnmount(cleanup);
  });

  return {
    currentTheme,
    getChartColors,
    getBaseChartConfig,
    getLegendConfig,
    getPieTitleConfig,
    getBarChartConfig,
    getLineChartConfig,
    initTheme
  };
}
