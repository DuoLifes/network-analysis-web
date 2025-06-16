<template>
  <el-col :span="span" :xs="xs" :sm="sm" :md="md" :lg="lg" :xl="xl">
    <el-card 
      class="chart-column-card" 
      :body-style="{ padding: cardPadding, height: '100%' }"
    >
      <!-- 图表标题 -->
      <template #header v-if="title">
        <div class="chart-header">
          <span class="chart-title">{{ title }}</span>
          <div class="chart-actions" v-if="$slots.actions">
            <slot name="actions" />
          </div>
        </div>
      </template>
      
      <!-- 图表内容 -->
      <div class="chart-content" :style="{ height: chartHeight }">
        <slot />
      </div>
    </el-card>
  </el-col>
</template>

<script setup>
import { computed } from 'vue'

defineOptions({
  name: 'ChartColumn'
})

const props = defineProps({
  // 栅格占据的列数 (24栅格系统)
  span: {
    type: Number,
    default: 8  // 默认一行3列
  },
  // 响应式栅格
  xs: Number,  // <768px
  sm: Number,  // ≥768px
  md: Number,  // ≥992px
  lg: Number,  // ≥1200px
  xl: Number,  // ≥1920px
  
  // 图表标题
  title: {
    type: String,
    default: ''
  },
  
  // 卡片内边距
  cardPadding: {
    type: String,
    default: '20px'
  },
  
  // 图表内容高度
  height: {
    type: [Number, String],
    default: 'auto'
  }
})

// 计算图表内容高度
const chartHeight = computed(() => {
  if (props.height === 'auto') {
    return 'auto'
  }
  if (typeof props.height === 'number') {
    return `${props.height}px`
  }
  return props.height
})
</script>

<style scoped>
/* 样式已移至全局 chart.scss */
</style>
