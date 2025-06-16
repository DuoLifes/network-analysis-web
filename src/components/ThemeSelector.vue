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
const currentTheme = ref('dark')

const handleThemeChange = (theme) => {
  currentTheme.value = theme
  // 只操作 dashboard-container 的 class
  const dashboard = document.querySelector('.dashboard-container')
  if (dashboard) {
    dashboard.classList.remove('theme-light', 'theme-dark')
    dashboard.classList.add(`theme-${theme}`)
  }
  localStorage.setItem('dashboard-theme', theme)
  window.dispatchEvent(new CustomEvent('theme-change', { detail: theme }))
  emit('update:theme', theme)
}

onMounted(() => {
  const savedTheme = localStorage.getItem('dashboard-theme') || 'dark'
  currentTheme.value = savedTheme
  handleThemeChange(savedTheme)
})
</script>

<style scoped>
.theme-selector {
  display: flex;
  align-items: center;
}
:deep(.el-select .el-input .el-input__wrapper) {
  background-color: var(--bg-primary);
  border: 1px solid var(--border-color);
  transition: background-color 0.3s ease, border-color 0.3s ease;
}
:deep(.el-select .el-input .el-input__inner) {
  color: var(--text-primary);
  transition: color 0.3s ease;
}
:deep(.el-select .el-input:hover .el-input__wrapper),
:deep(.el-select .el-input.is-focus .el-input__wrapper) {
  border-color: #409eff;
}
</style>
