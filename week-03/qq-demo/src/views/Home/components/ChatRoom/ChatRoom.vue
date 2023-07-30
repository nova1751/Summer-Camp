<script setup lang="ts"></script>

<template>
  <div class="container">
    <router-view name="chatroom"></router-view>
  </div>
</template>

<style scoped lang="scss">
.container {
  height: 100%;
  flex: 1;
  min-width: 580px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
