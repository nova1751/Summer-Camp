<script setup lang="ts">
import SideBar from './components/SideBar/SideBar.vue'
import ChatList from './components/ChatList/ChatList.vue'
import ChatRoom from './components/ChatRoom/ChatRoom.vue'
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
