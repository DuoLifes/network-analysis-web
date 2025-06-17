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
  // 用户统计 - 2.4G/5G用户数折线图
  const userCountOption = ref({
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['2.4G用户', '5G用户'],
      top: 0,
      textStyle: {
        fontSize: 12
      }
    },
    grid: {
      left: '8%',
      right: '8%',
      bottom: '15%',
      top: '25%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '14:00'],
      axisLabel: {
        fontSize: 10
      }
    },
    yAxis: {
      type: 'value',
      max: 350,
      axisLabel: {
        fontSize: 10
      }
    },
    series: [
      {
        name: '2.4G用户',
        type: 'line',
        data: [200, 220, 180, 160, 240, 260, 280],
        smooth: true,
        lineStyle: {
          color: '#409eff'
        },
        itemStyle: {
          color: '#409eff'
        }
      },
      {
        name: '5G用户',
        type: 'line',
        data: [150, 180, 170, 160, 190, 200, 210],
        smooth: true,
        lineStyle: {
          color: '#67c23a'
        },
        itemStyle: {
          color: '#67c23a'
        }
      }
    ]
  })

  // 流量统计 - 上行/下行流量折线图
  const trafficOption = ref({
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['上行流量', '下行流量'],
      top: 0,
      textStyle: {
        fontSize: 12
      }
    },
    grid: {
      left: '8%',
      right: '8%',
      bottom: '15%',
      top: '25%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '14:00'],
      axisLabel: {
        fontSize: 10
      }
    },
    yAxis: {
      type: 'value',
      max: 250,
      axisLabel: {
        fontSize: 10
      }
    },
    series: [
      {
        name: '上行流量',
        type: 'line',
        data: [100, 120, 110, 130, 180, 220, 200],
        smooth: true,
        lineStyle: {
          color: '#909399'
        },
        itemStyle: {
          color: '#909399'
        }
      },
      {
        name: '下行流量',
        type: 'line',
        data: [80, 100, 90, 110, 140, 180, 220],
        smooth: true,
        lineStyle: {
          color: '#e6a23c'
        },
        itemStyle: {
          color: '#e6a23c'
        }
      }
    ]
  })

  // 终端类型TOP5 - 柱状图
  const terminalTypeOption = ref({
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
      top: '10%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['PC', '手机', '平板', '基站本', '手环'],
      axisLabel: {
        fontSize: 12
      }
    },
    yAxis: {
      type: 'value',
      max: 150,
      axisLabel: {
        fontSize: 12
      }
    },
    series: [
      {
        name: '设备数量',
        type: 'bar',
        data: [
          { value: 130, itemStyle: { color: '#409eff' } },
          { value: 100, itemStyle: { color: '#409eff' } },
          { value: 80, itemStyle: { color: '#409eff' } },
          { value: 50, itemStyle: { color: '#409eff' } },
          { value: 30, itemStyle: { color: '#409eff' } }
        ],
        barWidth: 40
      }
    ]
  })

  // 用户事件 - 环形图
  const userEventsOption = ref({
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      show: false
    },
    series: [
      {
        name: '用户事件',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['50%', '60%'],
        avoidLabelOverlap: false,
        label: {
          show: false
        },
        emphasis: {
          label: {
            show: false
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 60, name: '正常事件', itemStyle: { color: '#67c23a' } },
          { value: 25, name: '警告事件', itemStyle: { color: '#e6a23c' } },
          { value: 15, name: '错误事件', itemStyle: { color: '#f56c6c' } }
        ]
      }
    ]
  })

  // 事件表格数据
  const eventTableData = ref([
    {
      time: '10:22:12',
      type: 'MAC',
      level: 'AP1',
      description: 'AP覆盖不足'
    },
    {
      time: '10:22:12',
      type: 'MAC',
      level: 'AP1',
      description: 'AP覆盖不足'
    },
    {
      time: '10:22:12',
      type: 'MAC',
      level: 'AP1',
      description: 'AP覆盖不足'
    },
    {
      time: '10:22:12',
      type: 'MAC',
      level: 'AP1',
      description: 'AP覆盖不足'
    },
    {
      time: '10:22:12',
      type: 'MAC',
      level: 'AP1',
      description: 'AP覆盖不足'
    }
  ])

  // 返回所有的图表配置
  return {
    userCountOption,
    trafficOption,
    terminalTypeOption,
    userEventsOption,
    eventTableData
  }
}
