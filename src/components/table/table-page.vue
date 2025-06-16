<template>
    <el-pagination
        :currentPage="currentPage"
        :page-size="pageSize"
        :page-sizes="pageSizes"
        background
        :layout="layout"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
    />
</template>
<script setup>
import { onMounted, ref, toRefs } from 'vue'

const props = defineProps({
    total: {
        type: Number,
        default: 0
    },
    currentPage: {
        type: Number,
        default: 1
    },
    pageSize: {
        type: Number,
        default: 10
    },
    pageSizes: {
        type: Array,
        default: () => [10, 15, 20]
    },
    layout: {
        type: String,
        default: 'total,sizes, prev, pager, next'
    }
})
const emits = defineEmits(['sizeChange', 'currentChange'])
/**
 * 处理当前页码变化
 * @param val 新的页码
 */
const handleCurrentChange = (val) => {
    emits('currentChange', val)
}

/**
 * 处理每页条数变化
 * @param val 新的每页条数
 */

const handleSizeChange = (val) => {
    emits('sizeChange', val)
}
const { total, currentPage, pageSize, pageSizes, layout } = toRefs(props)
</script>
<script>
export default {
    name: 'TablePage'
}
</script>
<style scoped lang="scss"></style>
