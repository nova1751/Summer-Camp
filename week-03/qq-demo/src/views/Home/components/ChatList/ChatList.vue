<script setup lang="ts">
import Resize from './components/Resize.vue'
import SearchBar from './components/SearchBar.vue'
import handleResize from '@/utils/resize'
import { useContactStore } from '@/stores/contact'
const concatStore = useContactStore()
const chatList = ref<HTMLDivElement | null>(null)
const keyword = ref('')
onMounted(() => concatStore.getMessageList())
</script>

<template>
  <div class="chat-list" ref="chatList">
    <SearchBar v-model:keyword="keyword" />
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" :keyword="keyword" />
      </keep-alive>
    </router-view>
  </div>

  <Resize @mousedown="handleResize($event, chatList!, true)" />
</template>

<style scoped lang="scss">
.chat-list {
  padding-top: 24px;
  height: 100%;
  width: 390px;
  min-width: 300px;
  max-width: 480px;
  background-color: white;
  display: flex;
  flex-direction: column;
}
</style>
