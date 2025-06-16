<template>
    <template v-if="currentSidebar">
        <template v-if="!currentSidebar?.children?.length">
            <el-menu-item :index="currentSidebar.path">
                <template #title>{{ t(currentSidebar.meta?.title || '') }}</template>
            </el-menu-item>
        </template>

        <el-sub-menu
            v-else
            ref="subMenu"
            :index="currentSidebar.path || currentSidebar.meta?.id"
            popper-append-to-body
        >
            <template v-slot:title>{{ t(currentSidebar.meta?.title || '') }}</template>
            <sidebar-item
                v-for="child in currentSidebar.children"
                :key="child.path"
                :currentSidebar="child"
                class="nest-menu"
            />
        </el-sub-menu>
    </template>
    <div v-else>{{ '--' }}</div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue'
import { asyncRoutes, constantRoutes } from '@/router/routes'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const props = defineProps({
    currentSidebar: {
        type: Object,
        default: () => ({})
    }
})
onMounted(() => {})
const menuList = computed(() => {
    const list = [...asyncRoutes, ...constantRoutes]
})
const handleSelect = (key, keyPath) => {
    console.log(key, keyPath)
}
</script>
<script>
export default {
    inheritAttrs: false,
    name: 'SiderItem'
}
</script>
<style lang="scss">
.sidebar-box {
    height: 100%;
}
.sub-menu-icon {
    margin-right: 0.5em;
}
</style>
