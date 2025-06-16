import { createI18n } from 'vue-i18n'
// import enLocale from 'element-plus/dist/locale/en.mjs'
// import zhLocale from 'element-plus/dist/locale/zh-cn.mjs'
import axios from 'axios'
import { useLangStore } from '../store/lang'
import { getActivePinia } from 'pinia'
import zhCN from './locale/zh-CN.json'
import enUS from './locale/en-US.json'

const i18n = createI18n({
    legacy: false, // 使用 Composition API 模式
    locale: 'zh-cn', // 默认语言
    fallbackLocale: 'zh-cn', // 备用语言
    messages: {
        'zh-cn': zhCN,
        'en': enUS
    }
})

const locale = []

// element 国际化
// const elLang = {
//     'zh-cn': zhLocale,
//     en: enLocale
// }

const languageKeyObj = {
    'zh-CN': 'zh-cn',
    'en-US': 'en'
}

// 临时存储语言，用于在pinia初始化之前
let tempLang = localStorage.getItem('language') || 'zh-CN'

// 设置语言
export async function setLocalLanguage(language) {
    language = top.zteFrameworkCurrentLanguage || language;
    // 先存储在临时变量中
    tempLang = language
    localStorage.setItem('language', language)
    
    // 检查pinia是否已初始化
    if (getActivePinia()) {
        // 如果pinia已经初始化，则使用store
        const langStore = useLangStore()
        langStore.setLang(language) // 更新store中的语言设置
    }
    
    const languageKey = languageKeyObj[language]
    document.title = window.$config.title[language] // 设置标题
    i18n.global.locale.value = languageKey
}

// 获取当前语言
export function getCurrentLanguage() {
    // 检查pinia是否已初始化
    if (getActivePinia()) {
        const langStore = useLangStore()
        return langStore.getCurrentLang
    }
    // 如果pinia未初始化，则返回临时存储的语言
    return tempLang
}

export default i18n
