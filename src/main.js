import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router/index'
import { NetworkError } from './utils/request'
import { vAuth } from './utils/directives'
import { usePermissionStore } from '@/store/permission'

//ElementPlus
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import { SelfElMessage } from './utils/utils'
import i18n, { setLocalLanguage } from './i18n'

// 获取保存的语言或默认为中文
const savedLanguage = localStorage.getItem('language') || 'zh-CN'

const pinia = createPinia()
const app = createApp(App)

//注册icon
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

// 注册权限指令
app.directive('auth', vAuth)

// 按顺序初始化插件
app.use(pinia)
   .use(router)
   .use(i18n)
   .use(ElementPlus, {
       i18n: i18n.global.t
   })

;(async function () {
    // 设置语言 (现在pinia已初始化)
    await setLocalLanguage(savedLanguage)
    
    // 初始化权限，但不等待其完成
    const permissionStore = usePermissionStore()
    permissionStore.loadPermissions() // 不使用await，权限会在后台加载
    
    // 立即挂载应用，不等待权限加载完成
    app.mount('#app')
})()

// 全局监听promise.reject 未经catch处理的异常
window.addEventListener('unhandledrejection', function browserRejectionHandler(event) {
    if (event.reason instanceof NetworkError) {
        if (event) {
            event.preventDefault()
        }
        const { message } = event.reason
        SelfElMessage({ message: message.message || message })
    }
})
