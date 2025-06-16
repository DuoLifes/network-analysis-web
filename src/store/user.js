import { defineStore } from 'pinia'

// 第一个参数是应用程序中 store 的唯一 id
export const useUsersStore = defineStore('users', {
    // 其它配置项
    state: () => {
        return {
            name: 'admin',
            age: 25,
            sex: '男'
        }
    },
    getters: {
        getAddAge: (state) => {
            return state.age + 100
        },
        getNameAndAge() {
            return this.name + this.getAddAge // 调用其它getter
        },
        getCountAge: (state) => {
            return (num) => state.age + num
        }
    },
    actions: {
        saveName(name) {
            this.name = name
        }
    }
})
