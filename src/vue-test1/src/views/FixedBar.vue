<script setup lang="ts">
import useScroll from '@/utils/useScroll'
const { y } = useScroll(window)
</script>

<template>
  <div class="container">
    <div class="topbar"></div>
    <div class="fixbar" :class="{ show: y > 98 }"></div>
  </div>
  <div class="panel">{{ y }}</div>
</template>

<style scoped lang="scss">
.container {
  height: 3000px;
  .topbar {
    background-color: skyblue;
    height: 200px;
  }
  .fixbar {
    width: 100%;
    height: 100px;
    background-color: skyblue;
    position: fixed;
    top: 0;
    left: 0;
    transform: translateY(-100%);
    opacity: 0;
    &.show {
      transition: 0.3s;
      transform: none;
      opacity: 1;
    }
  }
}
.panel {
  position: fixed;
  top: 0;
  width: 0;
}
</style>
