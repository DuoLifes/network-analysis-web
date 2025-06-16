import { usePermissionStore } from '@/store/permission'
import { watch } from 'vue'

/**
 * 权限控制指令 v-auth
 * 用法: v-auth="access.user.operation"
 */
export const vAuth = {
  mounted(el, binding) {
    const permissionStore = usePermissionStore()
    const checkPermission = () => {
      const hasPermission = permissionStore.hasPermission(binding.value)
      if (!hasPermission) {
        el.style.display = 'none'
      } else {
        el.style.display = ''
      }
    }
    
    // 初次检查权限
    checkPermission()
    
    // 当权限加载状态变化时，重新检查权限
    const stopWatch = watch(
      () => permissionStore.loaded,
      (newValue) => {
        if (newValue) {
          // 权限加载完成，重新检查
          checkPermission()
        }
      }
    )
    
    // 在元素销毁时停止监听
    el._permissionWatcher = stopWatch
  },
  
  unmounted(el) {
    // 清理监听器
    if (el._permissionWatcher) {
      el._permissionWatcher()
      delete el._permissionWatcher
    }
  }
}

// 导出所有指令
export default {
  vAuth
}
