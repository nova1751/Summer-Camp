<script setup lang="ts">
import Info from './components/Info.vue'
</script>

<template>
  <div class="container">
    <Info></Info>
  </div>
</template>

<style scoped lang="scss">
.container {
  height: 100%;
  width: 100%;
  flex: 1;
  min-width: 580px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
