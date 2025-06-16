<template>
    <div :class="['layout-page', isIframe ? 'is-iframe' : '']">
        <el-config-provider :locale="elLocale">
            <div class="header" v-if="!isIframe">
                <Header />
            </div>
            <div class="layout-container">
                <div class="sidebar" v-if="!isIframe">
                    <Sidebar />
                </div>
                <div class="layout-content">
                    <div v-if="!isIframe">
                        <Tabs />
                    </div>
                    <router-view v-slot="{ Component }">
                        <transition name="move" mode="out-in">
                            <component :is="Component" />
                        </transition>
                    </router-view>
                </div>
            </div>
        </el-config-provider>
    </div>
</template>
<script setup>
import { onMounted, ref, computed } from 'vue'
import Header from './Header.vue'
import Sidebar from './Sidebar/Index.vue'
import Tabs from '@/components/Tabs'

import { useI18n } from 'vue-i18n'
import enLocale from 'element-plus/dist/locale/en.mjs'
import zhLocale from 'element-plus/dist/locale/zh-cn.mjs'
const { locale, t, messages } = useI18n()
// element 国际化
const elLang = {
    'zh-cn': zhLocale,
    en: enLocale
}
const elLocale = computed(() => {
    return elLang[locale.value] || {}
})

//如果当前环境是prod生产环境，项目改为iframe嵌入的模式
const { nodeEnv } = window.$config
const { VITE_APP_NODE_ENV } = import.meta.env
const isIframe = computed(() => {
    return VITE_APP_NODE_ENV === 'prod'
})

onMounted(() => {})
</script>
<script>
export default {
    name: 'layoutPage'
}
</script>
<style lang="scss">
.layout-page {
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    .header {
        height: 60px;
        border-bottom: 1px $main-border-color solid;
        box-sizing: border-box;
        margin-bottom: 10px;
        flex-shrink: 0;
    }
    .layout-container {
        flex: 1;
        min-height: calc(100vh - 70px);
        display: flex;
        .sidebar {
            width: 200px;
            flex-shrink: 0;
        }
        .layout-content {
            flex: 1;
            min-height: 100%;
            overflow-x: hidden;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
        }
    }

    //iframe嵌套样式调整
    &.is-iframe {
        .layout-container {
            min-height: 100vh;
            .main-page {
                min-height: 100%;
            }
        }
    }
}
</style>
