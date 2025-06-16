<template>
    <div class="sidebar-box">
        <el-scrollbar>
            <el-menu :default-active="defaultActive" router v-if="menuList.length">
                <SidebarItem
                    v-for="(item, index) in menuList"
                    :key="index"
                    :current-sidebar="item"
                />
            </el-menu>
        </el-scrollbar>
    </div>
</template>
<script lang="ts" setup>
import { ref, computed, onMounted, nextTick, watch } from 'vue'
import { asyncRoutes, constantRoutes } from '@/router/routes'
import SidebarItem from './SidebarItem.vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

const route = useRoute()
const menuList = ref([])
const { t, locale } = useI18n()

const defaultActive = computed(() => {
    return route.meta.activeMenu || route.path
})

const generateMenuList = () => {
    const list = [...constantRoutes, ...asyncRoutes].reduce((pre, cur) => {
        if (cur.alwaysShow) {
            pre.push({ ...cur.children[0], label: t(cur.children[0].meta.title) })
        } else if (!cur.hidden) {
            const processedItem = processMenuItems([cur])[0]
            pre.push(processedItem)
        }
        return pre
    }, [])
    menuList.value = list
}

const processMenuItems = (items) => {
    return items.map(item => {
        const processedItem = { ...item, label: t(item.meta.title) }
        if (item.children && item.children.length) {
            const filteredChildren = item.children.filter(child => !child.hidden)
            processedItem.children = processMenuItems(filteredChildren)
        }
        return processedItem
    })
}

// 监听语言变化
watch(() => locale.value, () => {
    generateMenuList()
}, { immediate: true })

onMounted(() => {
    nextTick(() => {
        generateMenuList()
    })
})
const handleSelect = (key, keyPath) => {
    console.log(key, keyPath)
}
</script>
<style lang="scss">
.sidebar-box {
    height: 100%;
    border-right: 1px solid var(--el-menu-border-color);
    background-color: #fff;
    box-sizing: border-box;
    padding-right: 3px;
    .el-menu {
        border-right: none;
        height: 100%;
    }
    .el-menu-item {
        border-right: 3px solid transparent;
        height: 50px;
    }
    .el-menu-item.is-active {
        color: var(--el-color-primary);
        border-right-color: var(--el-color-primary);
        background-color: var(--el-color-primary-light-9);
    }
    .el-sub-menu__title {
        // font-weight: 600;
    }
}
.sub-menu-icon {
    margin-right: 0.5em;
}
</style>
