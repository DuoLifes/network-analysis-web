import { defineStore } from 'pinia'

// 定义语言存储
export const useLangStore = defineStore('lang', {
    state: () => {
        return {
            // 默认语言
            currentLang: localStorage.getItem('language') || 'zh-CN'
        }
    },
    getters: {
        // 获取当前语言
        getCurrentLang: (state) => {
            return state.currentLang
        }
    },
    actions: {
        // 设置语言
        setLang(lang) {
            this.currentLang = lang
            // 将语言保存到本地存储
            localStorage.setItem('language', lang)
        }
    }
})
