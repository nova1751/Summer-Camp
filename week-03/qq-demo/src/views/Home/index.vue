<script setup lang="ts">
import SideBar from './components/SideBar/SideBar.vue'
import ChatList from './components/ChatList/ChatList.vue'
</script>

<template>
  <div class="container">
    <SideBar />
    <ChatList />
    <router-view name="chatroom"></router-view>
  </div>
</template>

<style scoped lang="scss">
.container {
  height: 100vh;
  display: flex;
  > div {
    padding-top: 24px;
  }
}
</style>
