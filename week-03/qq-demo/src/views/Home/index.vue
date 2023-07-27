<script setup lang="ts">
import SideBar from './components/SideBar.vue'
import ChatList from './components/ChatList.vue'
import ChatRoom from './components/ChatRoom.vue'
</script>

<template>
  <div class="container">
    <SideBar />
    <ChatList />
    <ChatRoom />
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
