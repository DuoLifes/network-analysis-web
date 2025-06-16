import { defineStore } from 'pinia'
import request from '@/utils/request'

// 权限接口地址
const PERMISSION_API = '/v1/tcf/queryOpt'

export const usePermissionStore = defineStore('permission', {
  state: () => ({
    permissions: [],
    loaded: false,
    loading: false  // 添加loading状态，表示权限正在加载中
  }),
  
  actions: {
    loadPermissions() {
      // 如果已经在加载中，直接返回
      if (this.loading) {
        return Promise.resolve()
      }
      
      // 设置加载状态
      this.loading = true
      
      // 不使用await，让接口请求在后台进行，不阻塞UI渲染
      // request.post(PERMISSION_API)
      //   .then(res => {
      //     if (res.code === 200 && res.data && res.data.operations) {
      //       this.permissions = res.data.operations
      //     }
      //   })
      //   .catch(error => {
      //     console.error('获取权限失败', error)
      //     this.permissions = []
      //   })
      //   .finally(() => {
      //     this.loaded = true
      //     this.loading = false
      //   })
        
      // 直接返回一个已解决的Promise，不阻塞调用方
      return Promise.resolve()
    },
    
    hasPermission(permission) {
      // 如果权限未加载完成，默认不显示需要权限的元素
      if (!this.loaded) {
        return false
      }
      return this.permissions.includes(permission)
    }
  }
})
