import { ref } from 'vue'
import { use } from 'echarts/core'
import {
  CanvasRenderer
} from 'echarts/renderers'
import {
  PieChart,
  LineChart,
  BarChart
} from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  ToolboxComponent
} from 'echarts/components'

// 注册必要的组件
use([
  CanvasRenderer,
  PieChart,
  LineChart,
  BarChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  ToolboxComponent
])

// 导出用户分析页面的所有数据和配置
export function useUserAnalysis() {
  // 饼图配置 - 用户设备分布
  const pieOption = ref({
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 10,
      data: ['移动端', '桌面端', '平板端', '其他']
    },
    series: [
      {
        name: '设备类型',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '18',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 1048, name: '移动端' },
          { value: 735, name: '桌面端' },
          { value: 580, name: '平板端' },
          { value: 484, name: '其他' }
        ]
      }
    ]
  })

  // 折线图配置 - 用户访问趋势
  const lineOption = ref({
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['访问量', '用户数']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: '访问量',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: [120, 132, 101, 134, 90, 230, 210]
      },
      {
        name: '用户数',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: [220, 182, 191, 234, 290, 330, 310]
      }
    ]
  })

  // 条形图配置 - 页面访问量
  const barOption = ref({
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'value',
        boundaryGap: [0, 0.01]
      }
    ],
    yAxis: [
      {
        type: 'category',
        data: ['首页', '产品页', '关于我们', '联系我们', '新闻页', '用户中心']
      }
    ],
    series: [
      {
        name: '访问量',
        type: 'bar',
        data: [18203, 23489, 29034, 104970, 131744, 630230],
        itemStyle: {
          color: '#409EFF'
        }
      }
    ]
  })

  // 大图表 - 网络流量分析（面积折线图）
  const areaLineOption = ref({
    title: {
      text: '网络流量趋势',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    legend: {
      data: ['上行流量', '下行流量', '总流量'],
      top: 30
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00']
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: '流量(MB)',
        axisLabel: {
          formatter: '{value} MB'
        }
      }
    ],
    series: [
      {
        name: '上行流量',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: [120, 132, 101, 134, 90, 230, 210]
      },
      {
        name: '下行流量',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: [220, 182, 191, 234, 290, 330, 310]
      },
      {
        name: '总流量',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: [150, 232, 201, 154, 190, 330, 410]
      }
    ]
  })

  // 返回所有的图表配置
  return {
    pieOption,
    lineOption,
    barOption,
    areaLineOption
  }
}
