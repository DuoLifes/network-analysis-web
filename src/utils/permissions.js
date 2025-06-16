 /**
 * 系统权限常量配置
 * 集中管理所有权限标识，方便维护和统一调整
 */

// 用户管理权限
export const userPermissions = {
    view: 'aaccess.user',
    operation: 'access.user.operation'
}


// 导出所有权限常量
export default {
    user: userPermissions,
}
