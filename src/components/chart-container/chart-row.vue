<template>
  <div 
    class="chart-row-container" 
    :style="{ height: computedHeight, marginBottom: marginBottom }"
  >
    <el-row :gutter="gutter">
      <slot />
    </el-row>
  </div>
</template>

<script setup>
import { computed } from 'vue'

defineOptions({
  name: 'ChartRow'
})

const props = defineProps({
  // 行高度，支持数字(px)和字符串
  height: {
    type: [Number, String],
    default: 400
  },
  // 列间距
  gutter: {
    type: Number,
    default: 20
  },
  // 行间距
  marginBottom: {
    type: [Number, String],
    default: '20px'
  }
})

// 计算高度值
const computedHeight = computed(() => {
  if (typeof props.height === 'number') {
    return `${props.height}px`
  }
  return props.height
})
</script>

<style scoped>
/* 样式已移至全局 chart.scss */
</style>
