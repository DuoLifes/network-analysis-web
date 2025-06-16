import { createRouter, createWebHashHistory } from 'vue-router'
import { constantRoutes } from './routes'
import { getAsyncRoutes } from '../premission'

const asyncRoutes = getAsyncRoutes()
const router = createRouter({
    history: createWebHashHistory(),
    routes: [...constantRoutes, asyncRoutes]
})

router.beforeEach(async (to, from, next) => {
    next()
})

export default router
