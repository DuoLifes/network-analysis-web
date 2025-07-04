﻿const Layout = import('@/components/layout/index.vue')

/**
 * Note: 路由配置项
 *
 * hidden: true                      当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
 * alwaysShow: true                  当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
 *                                   只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
 *                                   若你想不管路由下面的 children 声明的个数都显示你的根路由
 *                                   你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
 * redirect: noRedirect              当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
 * name:'router-name'                设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * query: '{"id": 1, "name": "ry"}'  访问路由的默认传递参数
 * meta : {
    title: 'title'                   设置该路由在侧边栏和面包屑中展示的名字
    icon: 'siderbar-svg-name'                 设置该路由的图标，对应路径src/assets/icons/svg
    activeMenu: '/system/user'       当路由设置了该属性，则会高亮相对应的侧边栏。
  }
 */
export const constantRoutes = [
    {
        path: '/',
        component: () => Layout,
        redirect: '/user-analysis',
        hidden: true
    },
    {
        hidden: true,
        path: '/login',
        component: () => import('../views/login/index.vue'),
        meta: { title: 'menu.登录' }
    }
]
export const asyncRoutes = [
    {
        path: '/network',
        // component: () => Layout,
        id: '1',
        meta: { title: 'app.title' },
        children: [
            {
                path: '/user-analysis',
                component: () => import('@/views/network/userAnalysis.vue'),
                id: '1-1',
                meta: { title: 'menu.用户分析', parentId: '1' }
            }
        ]
    }
]
