<template>
    <div class="table-toolbar">
        <div class="left-area">
            <slot name="left"></slot>
        </div>
        <div class="right-btns">
            <!-- 刷新按钮 -->
            <div v-if="showRefresh" class="toolbar-icon refresh-icon" @click="handleRefresh" :title="t('common.刷新数据')">
                <el-tooltip :content="t('common.刷新数据')" placement="top" :effect="'light'">
                    <el-icon :size="16" class="refresh-icon-inner"><Refresh /></el-icon>
                </el-tooltip>
            </div>
            <!-- 预留其他按钮位置 -->
            <slot name="buttons"></slot>
        </div>
    </div>
</template>

<script setup>
import { Refresh } from '@element-plus/icons-vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// 定义组件属性
const props = defineProps({
    // 是否显示刷新按钮
    showRefresh: {
        type: Boolean,
        default: true
    }
})

// 定义事件
const emit = defineEmits(['refresh'])

// 处理刷新
const handleRefresh = () => {
    emit('refresh')
}
</script>

<style scoped lang="scss">
.table-toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px 0px 10px;
    
    .left-area {
        display: flex;
        align-items: center;
    }
    
    .right-btns {
        display: flex;
        gap: 10px;
        
        .toolbar-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 32px;
            height: 32px;
            background-color: #f7f9fc;
            border-radius: 4px;
            cursor: pointer;
            transition: all 0.3s;
            border: 1px solid #dcdfe6;
            
            &:hover {
                background-color: #edf2fc;
                color: var(--el-color-primary);
                border-color: #c0c4cc;
                transform: scale(1.05);
            }
            
            &:active {
                transform: scale(0.95);
            }
        }
        
        .refresh-icon {
            &:hover {
                .refresh-icon-inner {
                    animation: spin 0.8s linear;
                }
            }
        }
        
        @keyframes spin {
            from {
                transform: rotate(0deg);
            }
            to {
                transform: rotate(360deg);
            }
        }
    }
}
</style>
