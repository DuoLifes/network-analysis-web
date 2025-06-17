<template>
  <div class="chart-container">
    <ChartLayout>
      <!-- 第一行：三个小图表 -->
      <ChartRow :height="'auto'" :gutter="16" margin-bottom="20px">
        <!-- 饼图 - 用户设备分布 -->
        <ChartColumn 
          :span="8" 
          :xs="24" 
          :sm="12" 
          :md="8" 
          title="用户设备分布" 
          :height="350"
        >
          <v-chart :option="pieOption" autoresize />
        </ChartColumn>

        <!-- 折线图 - 用户访问趋势 -->
        <ChartColumn 
          :span="8" 
          :xs="24" 
          :sm="12" 
          :md="8" 
          title="用户访问趋势" 
          :height="350"
        >
          <v-chart :option="lineOption" autoresize />
        </ChartColumn>

        <!-- 条形图 - 页面访问量 -->
        <ChartColumn 
          :span="8" 
          :xs="24" 
          :sm="24" 
          :md="8" 
          title="页面访问量排名" 
          :height="350"
        >
          <v-chart :option="barOption" autoresize />
        </ChartColumn>
      </ChartRow>

      <!-- 第二行：大图表 -->
      <ChartRow :height="'auto'" :gutter="16">
        <ChartColumn :span="24" title="网络流量分析" :height="400">
          <template #actions>
            <div class="chart-toolbar">
              <div class="toolbar-item">
                <el-icon><Download /></el-icon>
                导出
              </div>
              <div class="toolbar-item">
                <el-icon><Refresh /></el-icon>
                刷新
              </div>
            </div>
          </template>
          <v-chart :option="areaLineOption" autoresize />
        </ChartColumn>
      </ChartRow>
    </ChartLayout>
  </div>
</template>

<script setup>
import VChart from 'vue-echarts'
import { Download, Refresh } from '@element-plus/icons-vue'
import { ChartLayout, ChartRow, ChartColumn } from '@/components/chart-container'
import { useUserAnalysis } from './userAnalysis.js'

// 从 userAnalysis.js 导入所有图表配置
const { pieOption, lineOption, barOption, areaLineOption } = useUserAnalysis()
</script>

<style scoped>
/* 样式已移至全局 chart.scss */
</style>
