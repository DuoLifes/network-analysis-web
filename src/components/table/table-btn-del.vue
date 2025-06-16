<template>
    <el-popconfirm
        :title="t('common.确认要删除此条数据吗？')"
        :confirm-button-text="$t('common.确定')"
        :cancel-button-text="$t('common.取消')"
        @confirm="changeConfirm"
        width="280"
    >
        <template #reference>
            <el-button v-auth="permission" type="danger" plain size="small" :icon="Delete">{{
                $t('common.删除')
            }}</el-button>
        </template>
    </el-popconfirm>
</template>
<script setup>
import { Delete } from '@element-plus/icons-vue'
import { toRefs } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps({
    title: {
        type: String,
        default: ''
    },
    permission: {
        type: String,
        default: ''
    }
})
const { title } = toRefs(props)

const emits = defineEmits(['changeDel'])
const changeConfirm = () => {
    emits('changeDel')
}
</script>
<script>
export default {
    name: 'TableBtnDel'
}
</script>
<style scoped lang="scss"></style>
