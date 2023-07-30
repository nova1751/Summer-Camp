<script setup lang="ts">
import { useContactStore } from '@/stores/contact'
import type { groupMessage, userMessage } from '@/types/message'
import { IPAddress } from '@/utils/request'
const props = defineProps(['keyword'])
const contactStore = useContactStore()
const friendList = computed(() =>
  contactStore.friendList.filter((item) => item.name.includes(props.keyword))
)
const groupList = computed(() =>
  contactStore.groupList.filter((item) => item.name.includes(props.keyword))
)
// 调整不同的点击状态的显示
// 保存目前的聊天窗口
const curIndex = ref()
const friendHandleClick = (i: userMessage) => {
  curIndex.value = i.room
  contactStore.info.type = 0
  contactStore.info.id = i.user_id
}
const groupHandleClick = (i: groupMessage) => {
  curIndex.value = i.room
  contactStore.info.type = 1
  contactStore.info.id = i.group_id
}
</script>
<template>
  <div class="friends-list">
    <el-tabs stretch>
      <el-tab-pane label="好友">
        <div class="list">
          <div
            class="item"
            v-for="(message, i) in friendList"
            :key="message.room"
            :class="{ active: message.room === curIndex }"
            @click="friendHandleClick(message)"
          >
            <div class="avatar">
              <el-avatar :size="60" :src="message.avatar ? IPAddress + message.avatar : null">
                <el-icon :size="24"><IEpUserFilled /></el-icon
              ></el-avatar>
            </div>
            <div class="info">
              <div class="name">{{ message.name }}</div>
            </div>
          </div>
        </div></el-tab-pane
      >
      <el-tab-pane label="群聊">
        <div class="list">
          <div
            class="item"
            v-for="(message, i) in groupList"
            :key="message.room"
            :class="{ active: message.room === curIndex }"
            @click="groupHandleClick(message)"
          >
            <div class="avatar">
              <el-avatar :size="60" :src="message.avatar ? IPAddress + message.avatar : null">
                <el-icon :size="24"><IEpUserFilled /></el-icon
              ></el-avatar>
            </div>
            <div class="info">
              <div class="name">{{ message.name }}</div>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<style scoped lang="scss">
.friends-list {
  .list {
    // background-color: skyblue;
    height: calc(100vh - 140px);
    overflow: auto;
    user-select: none;
    @include scroll-bar();
    .item {
      height: 100px;
      padding: 20px;
      display: flex;
      align-items: center;
      cursor: pointer;
      .avatar {
        width: 60px;
        height: 60px;
        border-radius: 30px;
        overflow: hidden;
        flex-shrink: 0;
        margin-right: 10px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .info {
        overflow: hidden;
        flex: 1;
        display: flex;
        height: 100%;
        flex-direction: column;
        justify-content: space-around;
        .name {
          @include flex-ellipsis();
          font-size: 24px;
        }
        .msg {
          @include flex-ellipsis();
          font-size: 18px;
          color: rgb(174, 174, 174);
        }
      }
      &:hover {
        background-color: rgb(245, 245, 245);
      }
      &.active {
        color: white;
        background-color: $qq-blue;
        .msg,
        .time {
          color: white;
        }
      }
    }
  }
}
</style>
