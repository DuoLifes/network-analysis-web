import router from './index'
import { usePermissionStore } from '@/store/permission'

// 全局路由守卫
router.beforeEach((to, from, next) => {
  // 获取权限 store
  const permissionStore = usePermissionStore()
  
  // 开始权限加载流程，但不等待结果
  // 权限加载会在后台进行，不阻塞路由导航
  if (!permissionStore.loaded && !permissionStore.loading) {
    permissionStore.loadPermissions()
  }
  
  // 直接继续路由导航，不等待权限加载完成
  next()
})

export default router
