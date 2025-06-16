<template>
  <div class="chart-layout-container">
    <slot />
  </div>
</template>

<script setup>
defineOptions({
  name: 'ChartLayout'
})
</script>

<style scoped>
/* 样式已移至全局 chart.scss */
</style>
