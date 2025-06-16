const Layout = import('@/components/layout/index.vue')
import { asyncRoutes } from '@/router/routes'

export const getAsyncRoutes = () => {
    const flatAsyncRoutes = (routes) => {
        const list = routes.reduce((pre, cur) => {
            if (cur?.children?.length) {
                return pre.concat(flatAsyncRoutes(cur.children))
            } else {
                return pre.concat(cur)
            }
        }, [])
        return list
    }
    const layoutRoutes = {
        path: '/',
        component: () => Layout,
        children: flatAsyncRoutes(asyncRoutes)
    }
    return layoutRoutes
}
