<template>
  <div class="chart-container">
    <!-- 顶部筛选条件 -->
    <div class="filter-header">
      <div class="left-filters">
        <el-tabs v-model="activeTab" @tab-change="handleTabChange">
          <el-tab-pane label="有线" name="wired"></el-tab-pane>
          <el-tab-pane label="无线" name="wireless"></el-tab-pane>
        </el-tabs>
      </div>
      <div class="right-filters">
        <el-select v-model="selectedLocation" placeholder="场所" style="width: 120px; margin-right: 16px;">
          <el-option label="全部" value="all"></el-option>
          <el-option label="办公区" value="office"></el-option>
          <el-option label="会议室" value="meeting"></el-option>
          <el-option label="休息区" value="rest"></el-option>
        </el-select>
        <el-date-picker
          v-model="selectedDate"
          type="date"
          placeholder="选择日期"
          style="width: 140px; margin-right: 16px;"
        />
        <el-tag type="info" size="small">仅看VIP</el-tag>
      </div>
    </div>

    <!-- 用户统计区域 -->
    <div class="user-stats-section">
      <!-- 网格布局 -->
      <div class="grid-container">
        <!-- 用户统计标题 -->
        <div class="section-title-overlay">用户统计</div>
        
        <!-- 左侧合并容器：跨两行 -->
        <div class="grid-item-merged">
          <div class="merged-section">
            <div class="main-title">XX</div>
            <div class="indicator-text">
              <div>在线用户数/</div>
              <div>用户总数</div>
            </div>
          </div>
          
          <div class="merged-section">
            <div class="main-title">XX</div>
            <div class="indicator-text">
              <div>2.4G用户数/</div>
              <div>5G用户数</div>
            </div>
          </div>
        </div>
        
        <!-- 第一行：3个统计卡片合并 -->
        <div class="grid-item grid-item-1-merged">
          <div class="stats-horizontal">
            <div class="stat-item">
              <div class="stat-header">
                <span class="stat-count">XXX人</span>
                <span class="stat-percent">70%</span>
              </div>
              <div class="stat-label">优秀</div>
              <div class="progress-bar">
                <div class="progress-fill excellent-fill" style="width: 70%"></div>
              </div>
            </div>
            
            <div class="stat-item">
              <div class="stat-header">
                <span class="stat-count">XX人</span>
                <span class="stat-percent">20%</span>
              </div>
              <div class="stat-label">良好</div>
              <div class="progress-bar">
                <div class="progress-fill good-fill" style="width: 20%"></div>
              </div>
            </div>
            
            <div class="stat-item">
              <div class="stat-header">
                <span class="stat-count">XXX人</span>
                <span class="stat-percent">10%</span>
              </div>
              <div class="stat-label">较差</div>
              <div class="progress-bar">
                <div class="progress-fill poor-fill" style="width: 10%"></div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 第二行：图表区域 -->
        <div class="grid-item grid-item-2-2">
          <v-chart :option="userCountOption" autoresize style="height: 100%;" />
        </div>
        
        <div class="grid-item grid-item-2-3">
          <div class="traffic-titles">
            <div class="traffic-title">
              <div class="main-title">XX</div>
              <div class="sub-title">上行累计流量</div>
            </div>
            <div class="traffic-title">
              <div class="main-title">XX</div>
              <div class="sub-title">下行累计流量</div>
            </div>
          </div>
        </div>
        
        <div class="grid-item grid-item-2-4">
          <v-chart :option="trafficOption" autoresize style="height: 100%;" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import VChart from 'vue-echarts'
import { useUserAnalysis } from './userAnalysis.js'

// 筛选条件
const activeTab = ref('wireless')
const selectedLocation = ref('all')
const selectedDate = ref('2025-04-01')

// 从 userAnalysis.js 导入图表配置
const { 
  userCountOption, 
  trafficOption
} = useUserAnalysis()

// 事件处理
const handleTabChange = (tab) => {
  console.log('切换tab:', tab)
}
</script>

<style lang="scss" scoped>
@import './userAnalysis.scss';
</style>
