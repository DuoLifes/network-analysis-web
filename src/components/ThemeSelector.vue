<template>
  <div class="theme-selector">
    <el-select 
      v-model="currentTheme" 
      @change="handleThemeChange"
      size="small"
      style="width: 100px"
    >
      <el-option label="明亮" value="light"></el-option>
      <el-option label="深色" value="dark"></el-option>
    </el-select>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const emit = defineEmits(['update:theme'])
const currentTheme = ref('light')

const handleThemeChange = (theme) => {
  currentTheme.value = theme
  // 只操作 chart-container 的 class
  const chartContainer = document.querySelector('.chart-container')
  if (chartContainer) {
    chartContainer.classList.remove('theme-light', 'theme-dark')
    chartContainer.classList.add(`theme-${theme}`)
  }
  localStorage.setItem('chart-theme', theme)
  window.dispatchEvent(new CustomEvent('theme-change', { detail: theme }))
  emit('update:theme', theme)
}

onMounted(() => {
  const savedTheme = localStorage.getItem('chart-theme') || 'light'
  currentTheme.value = savedTheme
  handleThemeChange(savedTheme)
})
</script>

<style scoped>
.theme-selector {
  display: flex;
  align-items: center;
}

/* 主题选择器样式不受主题影响，保持默认样式 */
:deep(.el-select .el-input .el-input__wrapper) {
  background-color: #ffffff;
  border: 1px solid #dcdfe6;
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

:deep(.el-select .el-input .el-input__inner) {
  color: #606266;
  transition: color 0.3s ease;
}

:deep(.el-select .el-input:hover .el-input__wrapper),
:deep(.el-select .el-input.is-focus .el-input__wrapper) {
  border-color: #409eff;
}

:deep(.el-select .el-input__suffix) {
  color: #c0c4cc;
}
</style>
