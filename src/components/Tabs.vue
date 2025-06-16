<template>
    <div class="tabs">
        <div class="breadcrumb-title">
            <el-breadcrumb separator="/">
                <!-- 二级菜单结构 -->
                <el-breadcrumb-item>{{ parentMenu?.meta?.title ? t(parentMenu.meta.title) : t('menu.首页') }}</el-breadcrumb-item>
                <el-breadcrumb-item>{{ t(route.meta.title) }}</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="page-title-wrapper">
                <div class="page-title">{{ t(route.meta.title) }}</div>
                <ThemeSelector />
                <!-- <el-button v-if="route.meta?.parentPath" @click="handleBack">返回</el-button> -->
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { asyncRoutes } from '@/router/routes'
import ThemeSelector from './ThemeSelector.vue'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const parentMenu = computed(() => {
    const { parentId } = route.meta
    const parent = asyncRoutes.find((item) => item.id == parentId) || {}
    return parent
})
</script>

<style scoped>
.tabs {
    height: 80px;
    background: #fff;
    display: flex;
    align-items: center;
    margin: 0 20px;
    padding: 0 20px;
}

.breadcrumb-title {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 8px;
    width: 100%;
}

.page-title-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}

.page-title {
    font-size: 20px;
    font-weight: 600;
    color: #1f2f3d;
}

:deep(.el-breadcrumb) {
    font-size: 13px;
}

/* 所有面包屑项默认样式 */
:deep(.el-breadcrumb__item .el-breadcrumb__inner) {
    font-weight: 400;
    color: #909399;
}

/* 最后一个面包屑项样式 */
:deep(.el-breadcrumb__item:last-child .el-breadcrumb__inner) {
    font-weight: 600;
    color: #606266;
}
</style>
