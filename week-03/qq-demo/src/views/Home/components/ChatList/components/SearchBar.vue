<script setup lang="ts">
import { Search, Plus, User, ChatDotRound, Picture } from '@element-plus/icons-vue'
import { friendSearchAPI, addFriendAPI } from '@/apis/friend'
import { groupSearchAPI, addGroupAPI } from '@/apis/group'
import type { searchFriend } from '@/types/friend'
import { getMessageListAPI } from '@/apis/message'
import type { searchGroupInfo } from '@/types/group'
import { useContactStore } from '@/stores/contact'
const concactStore = useContactStore()
const keyWord = ref('')
const emit = defineEmits(['update:keyword'])
// 定义展示工具栏二级菜单的按钮
// 定义二级菜单，点击消除按钮
const menu = ref<HTMLDivElement>()
const menuShow = ref(false)
const closeMenu = () => {
  menuShow.value = false
}
onClickOutside(menu, closeMenu)
// 处理添加好友的逻辑
const centerDialogVisible = ref(false)
const addContact = () => {
  centerDialogVisible.value = true
  menuShow.value = false
}
// 定义好友搜索结果的渲染
const friendsList = ref<searchFriend[]>([])
const friendkeyword = ref('')
const searchFriends = async () => {
  if (!friendkeyword.value.length) {
    ElMessage({
      type: 'warning',
      message: '请输入关键字'
    })
    return
  }
  const res = await friendSearchAPI({ username: friendkeyword.value })
  if (res.code === 200) {
    friendsList.value = res.data
    ElMessage({
      type: 'success',
      message: '查询成功'
    })
  }
}
// 定义添加好友的逻辑
const addFriend = async (data: any) => {
  const res = await addFriendAPI(data)
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: '添加成功'
    })
    concactStore.getMessageList()
    centerDialogVisible.value = false
  } else {
    ElMessage({
      type: 'error',
      message: '添加失败'
    })
  }
}
// 定义群聊结果搜索结果的渲染
const groupsList = ref<searchGroupInfo[]>([])
const groupkeyword = ref('')
const searchGroups = async () => {
  if (!groupkeyword.value.length) {
    ElMessage({
      type: 'warning',
      message: '请输入关键字'
    })
    return
  }
  const res = await groupSearchAPI({ name: groupkeyword.value })
  if (res.code === 200) {
    groupsList.value = res.data
    ElMessage({
      type: 'success',
      message: '查询成功'
    })
  }
}
const addGroup = async (data: any) => {
  const res = await addGroupAPI(data)
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: '添加成功'
    })
    concactStore.getMessageList()
    centerDialogVisible.value = false
  } else {
    ElMessage({
      type: 'error',
      message: '添加失败'
    })
  }
}
const centerDialogVisible1 = ref(false)
// 收集创建群聊的信息
const groupInfo = reactive({
  avatar: '',
  name: '',
  annoucement: '',
  members: []
})
// 定义处理图片上传的逻辑
let file: File | undefined
const imgUp = ref<HTMLInputElement | null>()
const handleImgUpload = () => {
  imgUp.value?.click()
}
const fileUpload = () => {
  file = imgUp.value?.files?.[0]
  const url = file && URL.createObjectURL(file)
  if (url) {
    groupInfo.avatar = url
    // console.log(updatedUserInfo.avatar, userStore.userInfo?.avatar)
  }
}
</script>
<template>
  <div class="search-bar">
    <el-input
      :prefix-icon="Search"
      class="input"
      placeholder="搜索"
      v-model="keyWord"
      @input="$emit('update:keyword', keyWord)"
    ></el-input
    ><el-button
      class="btn"
      :icon="Plus"
      color="rgb(245, 245, 245)"
      @click="menuShow = !menuShow"
    ></el-button>
    <div class="menu" ref="menu" v-if="menuShow">
      <div class="row" @click="centerDialogVisible1 = true">发起群聊</div>
      <div class="row" @click="addContact">加好友/群</div>
    </div>

    <el-dialog v-model="centerDialogVisible" title="加好友/群" width="640px" center>
      <el-tabs type="border-card" stretch>
        <el-tab-pane label="找好友">
          <div class="contact-search">
            <el-input
              :prefix-icon="Search"
              placeholder="请输入好友名称"
              v-model="friendkeyword"
            ></el-input>
            <el-button type="primary" class="btn" @click="searchFriends">查找</el-button>
          </div>
          <div class="friends-list">
            <el-card v-for="friend in friendsList" :key="friend.id"
              ><el-avatar :icon="User"></el-avatar>
              <div class="user-info">
                <div class="name">昵称：{{ friend.name }}</div>
                <div class="username">用户名：{{ friend.username }}</div>
              </div>
              <el-button
                type="primary"
                round
                style="margin-left: 5px"
                :disabled="friend.status"
                @click="addFriend({ username: friend.username, id: friend.id })"
                >{{ friend.status ? '已添加' : '加好友' }}</el-button
              >
            </el-card>
          </div>
        </el-tab-pane>
        <el-tab-pane label="找群">
          <div class="contact-search">
            <el-input
              :prefix-icon="Search"
              placeholder="请输入群聊名称"
              v-model="groupkeyword"
            ></el-input
            ><el-button type="primary" class="btn" @click="searchGroups">查找</el-button>
          </div>
          <div class="groups-list">
            <el-card v-for="group in groupsList" :key="group.group_id"
              ><el-avatar :icon="ChatDotRound"></el-avatar>
              <div class="user-info">
                <div class="name">{{ group.name }}</div>
                <div class="number">{{ group.number }}人</div>
              </div>
              <el-button
                type="primary"
                round
                style="margin-left: 5px"
                :disabled="group.status"
                @click="addGroup({ group_id: group.group_id })"
                >{{ group.status ? '已加入' : '加入群聊' }}</el-button
              >
            </el-card>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
    <!-- <el-dialog v-model="centerDialogVisible1" title="编辑资料" width="480px" align-center>
      <div class="container">
        <div class="avatar" @click="handleImgUpload">
          <el-avatar :icon="Picture" :size="120"></el-avatar>
          <div class="modal">
            <i class="iconfont icon-camera"></i>
          </div>
          <input
            type="file"
            accept="image/*"
            ref="imgUp"
            style="display: none"
            @change="fileUpload"
          />
        </div>
        <el-form
          :model="updatedUserInfo"
          :rules="rules"
          label-width="72px"
          label-position="left"
          ref="formRef"
        >
          <el-form-item label="用户名">
            <el-input v-model="updatedUserInfo.username" disabled></el-input>
          </el-form-item>
          <el-form-item label="昵称">
            <el-input
              v-model="updatedUserInfo.name"
              maxlength="36"
              type="text"
              show-word-limit
              placeholder="暂无昵称"
            ></el-input>
          </el-form-item>
          <el-form-item label="个签">
            <el-input
              v-model="updatedUserInfo.signature"
              maxlength="80"
              type="text"
              placeholder="暂无个性签名"
              show-word-limit
            ></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="phone">
            <el-input
              v-model="updatedUserInfo.phone"
              type="tel"
              placeholder="暂无电话号码"
            ></el-input>
          </el-form-item>
          <el-form-item label="创建时间">
            <el-input v-model="updatedUserInfo.created_at" disabled></el-input>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="centerDialogVisible1 = false">取消</el-button>
          <el-button type="primary" @click="confirmChange">保存</el-button>
        </span>
      </template>
    </el-dialog> -->
  </div>
</template>
<style scoped lang="scss">
.search-bar {
  flex-shrink: 0;
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  padding: 0 12px;
  position: relative;
  height: 60px;
  :deep(.el-input__wrapper) {
    background-color: rgb(245, 245, 245);
    box-shadow: none;
    &.is-focus {
      box-shadow: 0 0 0 1px rgb(64, 158, 255) inset;
    }
  }
  .btn {
    margin-left: 10px;
    width: 30px;
    height: 30px;
  }
  .menu {
    width: 100px;
    padding: 10px;
    border-radius: 5px;
    background-color: white;
    position: absolute;
    right: -70px;
    top: 30px;
    cursor: pointer;
    user-select: none;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    z-index: 1000;
    .row {
      border-radius: 5px;
      text-align: center;
      height: 30px;
      line-height: 30px;
      width: 100%;
      margin-bottom: 5px;
      white-space: nowrap;
      &:hover {
        background-color: rgb(245, 245, 245);
      }
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
  :deep(.el-overlay-dialog) {
    .contact-search {
      display: flex;
      .btn {
        margin-left: 10px;
        width: 80px;
      }
    }
    .friends-list {
      display: flex;
      flex-wrap: wrap;
      max-height: 400px;
      overflow: auto;
      @include scroll-bar;
      .el-card {
        margin: 10px 10px 0 0;
      }
      .el-card__body {
        display: flex;
        align-items: center;
      }
      .user-info {
        margin-left: 5px;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
    }
    .groups-list {
      display: flex;
      flex-wrap: wrap;
      max-height: 400px;
      overflow: auto;
      @include scroll-bar;
      .el-card {
        margin: 10px 10px 0 0;
      }
      .el-card__body {
        display: flex;
        align-items: center;
      }
      .user-info {
        margin-left: 5px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .number {
          color: rgb(103, 194, 58);
          align-self: center;
        }
      }
    }
  }
}
</style>
