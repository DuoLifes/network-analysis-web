<template>
    <div class="home-container">
        <div class="content-wrapper">
            <!-- 顶部统计卡片 -->
            <div class="statistics-panel">
                <el-card class="stat-card" shadow="hover">
                    <div class="stat-title">累计认证次数</div>
                    <div class="stat-value">25 次</div>
                </el-card>
                <el-card class="stat-card" shadow="hover">
                    <div class="stat-title">今日认证次数</div>
                    <div class="stat-value">3 次</div>
                </el-card>
                <el-card class="stat-card" shadow="hover">
                    <div class="stat-title">在线用户数</div>
                    <div class="stat-value">12 人</div>
                </el-card>
            </div>

            <!-- 认证次数统计图表 -->
            <el-card class="chart-card" shadow="hover">
                <div class="card-header">
                    <span class="card-title">认证次数统计</span>
                    <div class="time-select">
                        <el-radio-group v-model="timeRange" @change="handleTimeRangeChange">
                            <el-radio-button :value="30">最近30天</el-radio-button>
                            <el-radio-button :value="7">最近7天</el-radio-button>
                            <el-radio-button :value="1">最近1天</el-radio-button>
                        </el-radio-group>
                        <el-button :icon="Refresh" circle size="small" @click="refreshChart"></el-button>
                    </div>
                </div>
                <div class="auth-count-chart">
                    <div ref="authCountChart" class="chart"></div>
                    <div class="total-count">
                        总计 <span class="count-num">25</span> 次
                    </div>
                </div>
            </el-card>

            <!-- 认证方式统计图表 -->
            <el-card class="chart-card" shadow="hover">
                <div class="card-title">认证方式统计</div>
                <div class="auth-method-chart">
                    <div class="method-item">
                        <div class="method-info">
                            <span class="method-name">账号认证</span>
                            <span class="method-count">8次</span>
                        </div>
                        <el-progress :percentage="30" :show-text="false" color="#409EFF"></el-progress>
                        <span class="percentage">30%</span>
                    </div>
                    <div class="method-item">
                        <div class="method-info">
                            <span class="method-name">802.1x认证</span>
                            <span class="method-count">6次</span>
                        </div>
                        <el-progress :percentage="23" :show-text="false" color="#409EFF"></el-progress>
                        <span class="percentage">23%</span>
                    </div>
                    <div class="method-item">
                        <div class="method-info">
                            <span class="method-name">短信认证</span>
                            <span class="method-count">4次</span>
                        </div>
                        <el-progress :percentage="15" :show-text="false" color="#409EFF"></el-progress>
                        <span class="percentage">15%</span>
                    </div>
                    <div class="method-item">
                        <div class="method-info">
                            <span class="method-name">二维码认证</span>
                            <span class="method-count">0次</span>
                        </div>
                        <el-progress :percentage="0" :show-text="false" color="#409EFF"></el-progress>
                        <span class="percentage">0%</span>
                    </div>
                </div>
            </el-card>

            <!-- 终端类型统计图表 -->
            <el-card class="chart-card" shadow="hover">
                <div class="card-title">终端类型统计</div>
                <div class="terminal-type-charts">
                    <div class="circle-chart-item">
                        <div ref="terminalChart1" class="circle-chart"></div>
                        <div class="chart-label">
                            <div class="label-title">电脑 12个</div>
                            <div class="label-percent">49%</div>
                        </div>
                    </div>
                    <div class="circle-chart-item">
                        <div ref="terminalChart2" class="circle-chart"></div>
                        <div class="chart-label">
                            <div class="label-title">安卓手机 5个</div>
                            <div class="label-percent">21%</div>
                        </div>
                    </div>
                    <div class="circle-chart-item">
                        <div ref="terminalChart3" class="circle-chart"></div>
                        <div class="chart-label">
                            <div class="label-title">苹果手机 3个</div>
                            <div class="label-percent">14%</div>
                        </div>
                    </div>
                    <div class="circle-chart-item">
                        <div ref="terminalChart4" class="circle-chart"></div>
                        <div class="chart-label">
                            <div class="label-title">其他设备 2个</div>
                            <div class="label-percent">8%</div>
                        </div>
                    </div>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as echarts from 'echarts';
import { Refresh } from '@element-plus/icons-vue';

// 时间范围选择
const timeRange = ref(30);

// 图表实例
const chartInstances = ref({
    authCount: null,
    terminal1: null,
    terminal2: null,
    terminal3: null,
    terminal4: null
});

// 图表DOM引用
const authCountChart = ref(null);
const terminalChart1 = ref(null);
const terminalChart2 = ref(null);
const terminalChart3 = ref(null);
const terminalChart4 = ref(null);

// 模拟数据 - 认证次数
const authCountData = {
    '30': [
        { date: '01/01', value: 100 },
        { date: '01/05', value: 150 },
        { date: '01/10', value: 220 },
        { date: '01/20', value: 100 },
        { date: '01/30', value: 140 }
    ],
    '7': [
        { date: '01/24', value: 120 },
        { date: '01/25', value: 140 },
        { date: '01/26', value: 160 },
        { date: '01/27', value: 180 },
        { date: '01/28', value: 150 },
        { date: '01/29', value: 130 },
        { date: '01/30', value: 140 }
    ],
    '1': [
        { date: '08:00', value: 20 },
        { date: '10:00', value: 40 },
        { date: '12:00', value: 60 },
        { date: '14:00', value: 50 },
        { date: '16:00', value: 30 },
        { date: '18:00', value: 20 },
        { date: '20:00', value: 10 }
    ]
};

// 重新调整图表大小
const resizeCharts = () => {
    // 短暂延迟确保DOM已经更新
    setTimeout(() => {
        Object.values(chartInstances.value).forEach(chart => {
            chart && chart.resize();
        });
    }, 200);
};

// 初始化认证次数统计图表
const initAuthCountChart = () => {
    const chartDom = authCountChart.value;
    chartInstances.value.authCount = echarts.init(chartDom);
    
    const currentData = authCountData[timeRange.value];
    const xData = currentData.map(item => item.date);
    const yData = currentData.map(item => item.value);
    
    const option = {
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            top: '10%',
            containLabel: true
        },
        tooltip: {
            trigger: 'axis',
            formatter: '{b}: {c}次'
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: xData,
            axisLine: {
                lineStyle: {
                    color: '#EBEEF5'
                }
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                color: '#909399'
            }
        },
        yAxis: {
            type: 'value',
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            splitLine: {
                lineStyle: {
                    color: '#EBEEF5',
                    type: 'dashed'
                }
            },
            axisLabel: {
                color: '#909399'
            },
            min: 0,
            max: 250
        },
        series: [{
            data: yData,
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 6,
            itemStyle: {
                color: '#409EFF'
            },
            lineStyle: {
                width: 3,
                color: '#409EFF'
            },
            areaStyle: {
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0,
                        color: 'rgba(64, 158, 255, 0.2)'
                    }, {
                        offset: 1,
                        color: 'rgba(64, 158, 255, 0)'
                    }]
                }
            }
        }]
    };
    
    chartInstances.value.authCount.setOption(option);
};

// 初始化终端类型统计图表
const initTerminalCharts = () => {
    const charts = [
        { ref: terminalChart1, instance: 'terminal1', percent: 49, color: '#409EFF' },
        { ref: terminalChart2, instance: 'terminal2', percent: 21, color: '#409EFF' },
        { ref: terminalChart3, instance: 'terminal3', percent: 14, color: '#409EFF' },
        { ref: terminalChart4, instance: 'terminal4', percent: 8, color: '#409EFF' }
    ];
    
    charts.forEach(item => {
        const chartDom = item.ref.value;
        chartInstances.value[item.instance] = echarts.init(chartDom);
        
        const option = {
            series: [{
                type: 'pie',
                radius: ['70%', '90%'],
                avoidLabelOverlap: false,
                label: {
                    show: false
                },
                emphasis: {
                    scale: false
                },
                data: [
                    { value: item.percent, name: '已使用', itemStyle: { color: item.color } },
                    { value: 100 - item.percent, name: '未使用', itemStyle: { color: '#EBEEF5' } }
                ],
                animation: false
            }]
        };
        
        chartInstances.value[item.instance].setOption(option);
    });
};

// 刷新图表
const refreshChart = () => {
    const currentData = authCountData[timeRange.value];
    const xData = currentData.map(item => item.date);
    const yData = currentData.map(item => item.value);
    
    chartInstances.value.authCount.setOption({
        xAxis: {
            data: xData
        },
        series: [{
            data: yData
        }]
    });
};

// 监听时间范围变化
const watchTimeRange = () => {
    refreshChart();
};

const handleTimeRangeChange = () => {

};

onMounted(() => {
    initAuthCountChart();
    initTerminalCharts();
    
    // 监听窗口大小变化，重新调整图表大小
    window.addEventListener('resize', resizeCharts);
    
    // 监听时间范围变化
    watchTimeRange();
});

onBeforeUnmount(() => {
    // 组件销毁前移除事件监听
    window.removeEventListener('resize', resizeCharts);
    
    // 销毁图表实例
    Object.values(chartInstances.value).forEach(chart => {
        chart && chart.dispose();
    });
});
</script>

<style lang="scss" scoped>
.home-container {
    margin: 10px 20px 5px 20px;
    padding: 20px;
    height: calc(100% - 140px);
    background: #fff;
    position: relative;
    overflow: hidden;
    
    .content-wrapper {
        height: 100%;
        overflow-y: auto;
        padding-right: 6px;
        
        &::-webkit-scrollbar {
            width: 6px;
        }
        
        &::-webkit-scrollbar-thumb {
            background-color: #dcdfe6;
            border-radius: 3px;
        }
        
        &::-webkit-scrollbar-track {
            background-color: #f5f7fa;
        }
    }
    
    .statistics-panel {
        display: flex;
        margin-bottom: 16px;
        
        .stat-card {
            flex: 1;
            margin-right: 16px;
            cursor: default;
            
            &:last-child {
                margin-right: 0;
            }
            
            .stat-title {
                font-size: 14px;
                color: #606266;
                margin-bottom: 8px;
            }
            
            .stat-value {
                font-size: 24px;
                font-weight: bold;
                color: #303133;
            }
        }
    }
    
    .chart-card {
        margin-bottom: 16px;
        
        .card-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 16px;
        }
        
        .card-title {
            font-size: 16px;
            font-weight: bold;
            color: #303133;
            position: relative;
            padding-left: 12px;
            margin-bottom: 16px;
            
            &::before {
                content: "";
                position: absolute;
                left: 0;
                top: 50%;
                transform: translateY(-50%);
                width: 4px;
                height: 16px;
                background-color: #409EFF;
                border-radius: 2px;
            }
        }
        
        .time-select {
            display: flex;
            align-items: center;
            
            .el-button {
                margin-left: 8px;
            }
        }
    }
    
    .auth-count-chart {
        position: relative;
        
        .chart {
            height: 200px;
        }
        
        .total-count {
            position: absolute;
            top: 0;
            left: 0;
            color: #606266;
            font-size: 14px;
            
            .count-num {
                font-size: 24px;
                font-weight: bold;
                color: #409EFF;
            }
        }
    }
    
    .auth-method-chart {
        padding: 0 16px;
        
        .method-item {
            margin-bottom: 16px;
            
            .method-info {
                display: flex;
                justify-content: space-between;
                margin-bottom: 8px;
                
                .method-name {
                    color: #606266;
                }
                
                .method-count {
                    color: #303133;
                    font-weight: bold;
                }
            }
            
            .percentage {
                display: block;
                text-align: right;
                margin-top: 4px;
                color: #909399;
                font-size: 12px;
            }
        }
    }
    
    .terminal-type-charts {
        display: flex;
        justify-content: space-between;
        margin-top: 24px;
        flex-wrap: wrap;
        
        .circle-chart-item {
            text-align: center;
            margin-bottom: 20px;
            
            .circle-chart {
                width: 100px;
                height: 100px;
                margin: 0 auto;
            }
            
            .chart-label {
                margin-top: 10px;
                
                .label-title {
                    font-size: 14px;
                    color: #606266;
                }
                
                .label-percent {
                    font-size: 16px;
                    font-weight: bold;
                    color: #303133;
                }
            }
        }
    }
}
</style>
