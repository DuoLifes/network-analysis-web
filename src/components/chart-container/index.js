// 图表布局组件统一导出
import ChartLayout from './chart-layout.vue'
import ChartRow from './chart-row.vue'
import ChartColumn from './chart-column.vue'

// 组件列表
const components = [
  ChartLayout,
  ChartRow,
  ChartColumn
]

// 定义安装函数
const install = (app) => {
  components.forEach(component => {
    app.component(component.name || component.__name, component)
  })
}

// 单独导出组件
export {
  ChartLayout,
  ChartRow,
  ChartColumn
}

// 默认导出安装函数
export default {
  install,
  ChartLayout,
  ChartRow,
  ChartColumn
}
