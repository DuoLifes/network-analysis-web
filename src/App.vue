<script setup>
// const el = document.documentElement
// getComputedStyle(el).getPropertyValue(`--el-color-primary`)
// el.style.setProperty('--el-color-primary', '#409eff')
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// console.log(t('login.登录'))
import zhCN from './i18n/locale/zh-CN.json'
let temp = {}
Object.entries(zhCN).forEach(([key, value]) => {
    if (key.includes('common.')) {
        const keyName = key.replace('common.', '')
        temp[keyName] = value
    }
})
</script>

<template>
    <div class="app-content">
        <router-view v-slot="{ Component }">
            <component :is="Component" />
        </router-view>
    </div>
</template>
<!-- https://www.isqqw.com/?t=map3D -->
<style scoped>
.app-content {
    height: 100%;
    color: #666;
    font-size: 14px;
}
</style>
