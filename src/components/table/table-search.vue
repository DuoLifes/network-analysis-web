<template>
    <div class="search-container">
        <el-form ref="searchRef" :model="query" :inline="true">
            <div class="form-items" :style="{ '--form-items-per-row': layout }">
                <el-form-item
                    :label="t(item.label)"
                    :prop="item.prop"
                    v-for="item in options"
                    :label-width="item.labelWidth || '120px'"
                    :key="item.prop"
                >
                    <el-input
                        v-if="item.type === 'input'"
                        v-model="query[item.prop]"
                        :disabled="item.disabled"
                        :placeholder="t(item.placeholder || 'common.请输入')"
                        clearable
                    ></el-input>
                    <el-input
                        v-if="item.type === 'input_number'"
                        v-model="query[item.prop]"
                        class="custom-number-input"
                        :disabled="item.disabled"
                        type="number"
                        :min="item.min"
                        :placeholder="t(item.placeholder || 'common.请输入')"
                        clearable
                    ></el-input>
                    <el-select
                        v-else-if="item.type === 'select'"
                        v-model="query[item.prop]"
                        :disabled="item.disabled"
                        :placeholder="t(item.placeholder || 'common.请选择')"
                        clearable
                        filterable
                    >
                        <template #prefix>
                            <el-icon><Search /></el-icon>
                        </template>
                        <el-option
                            v-for="opt in item.opts"
                            :key="opt[item.valueKey ? item.valueKey : 'code']"
                            :label="opt[item.labelKey ? item.labelKey : 'label']"
                            :value="opt[item.valueKey ? item.valueKey : 'code']"
                        ></el-option>
                    </el-select>
                    <el-date-picker
                        v-else-if="item.type === 'date'"
                        type="date"
                        v-model="query[item.prop]"
                        :value-format="item.format"
                        :placeholder="t(item.placeholder || 'common.请选择')"
                    ></el-date-picker>
                    <el-date-picker
                        v-model="query[item.prop]"
                        style="width: 100%"
                        type="datetimerange"
                        value-format="YYYY-MM-DD HH:mm:ss"
                        :start-placeholder="t(item.startPlaceholder || 'common.开始时间')"
                        :end-placeholder="t(item.endPlaceholder || 'common.结束时间')"
                        v-else-if="item.type === 'datetimerange'"
                    />
                </el-form-item>
                <div class="button-wrapper">
                    <div class="button-group">
                        <el-button type="primary" :icon="Search" @click="search">{{
                            t('common.查询')
                        }}</el-button>
                        <el-button :icon="Refresh" @click="resetForm(searchRef)">{{
                            t('common.重置')
                        }}</el-button>
                    </div>
                </div>
            </div>
        </el-form>
    </div>
</template>

<script setup>
import { Search, Refresh } from '@element-plus/icons-vue'
import { ref, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

const props = defineProps({
    query: {
        type: Object,
        required: true
    },
    options: {
        type: Array,
        required: true
    },
    search: {
        type: Function,
        default: () => {}
    },
    reset: {
        type: Function,
        default: () => {}
    },
    layout: {
        type: Number,
        default: 3
    },
    fixedButtons: {
        type: Boolean,
        default: false
    }
})

const processOptions = (options) => {
    if (!Array.isArray(options)) {
        return [];
    }
    return options.map(option => {
        try {
            return {
                ...option,
                label: typeof option.label === 'string' ? t(option.label) || option.label : option.label
            };
        } catch (error) {
            return { ...option, label: option.label }; // 回退到原始 label
        }
    });
};

const inputList = ref([])

// 初始化和更新选项
const updateInputList = () => {
    inputList.value = processOptions(props.options)
}

// 监听语言变化
watch(() => locale.value, () => {
    updateInputList()
}, { immediate: true })

// 监听options变化
watch(() => props.options, () => {
    updateInputList()
}, { deep: true })

const searchRef = ref()
const resetForm = (formEl) => {
    if (!formEl) return
    formEl.resetFields()
    props.reset()
}

// 防抖函数实现
const debounce = (fn, delay = 300) => {
    let timer = null
    return function(...args) {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            fn.apply(this, args)
            timer = null
        }, delay)
    }
}

// 使用防抖包装search函数
const search = debounce(() => {
    props.search()
}, 100)
</script>
<style lang="scss" scoped>
.search-container {
    background-color: #fff;
    margin-bottom: 10px;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    border-radius: 5px;
    padding: 16px;
}

:deep(.el-form) {
    display: flex;
    flex-wrap: wrap;
    padding-right: 30px;
    .custom-number-input input::-webkit-outer-spin-button,
    .custom-number-input input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    
    /* 隐藏 Firefox 中的箭头 */
    .custom-number-input input[type="number"] {
        -moz-appearance: textfield;
    }
}

.form-items {
    flex: 1;
    display: grid;
    grid-template-columns: repeat(var(--form-items-per-row), 1fr);
    gap: 20px;
    align-items: start;
    padding-top: 10px;
    padding-bottom: 10px;
}

:deep(.el-form-item) {
    margin: 0;
    width: 100%;
    display: flex;
    align-items: center;
    min-height: 32px;
}

:deep(.el-form-item__label) {
    text-align: right;
    flex-shrink: 0;
    line-height: 32px;
    padding-right: 12px;
}

:deep(.el-form-item__content) {
    flex: 1;
            margin-left: 0;
    line-height: 32px;
}

:deep(.el-input),
:deep(.el-select),
:deep(.el-date-picker) {
    width: 100%;
}

:deep(.el-input__wrapper),
:deep(.el-select__wrapper) {
    line-height: 32px;
}

.button-wrapper {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    min-height: 32px;
    grid-column: -2 / -1;
}

.button-group {
    display: flex;
    gap: 10px;
    padding-left: 100px;
}
</style>
