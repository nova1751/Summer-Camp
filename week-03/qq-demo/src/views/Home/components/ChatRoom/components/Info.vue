<script setup lang="ts">
import { getFriendInfoAPI } from '@/apis/friend'
import { updatefriendInfoAPI } from '@/apis/friend'
import { useContactStore } from '@/stores/contact'
import type { friendInfo } from '@/types/friend'
import { IPAddress } from '@/utils/request'
import { Edit } from '@element-plus/icons-vue'
const concatStore = useContactStore()
const friendInfo = ref()
const getFriendInfo = async () => {
  const res = await getFriendInfoAPI({ group_id: 1, user_id: concatStore.info.id })
  if (res.code === 200) {
    friendInfo.value = res.data
  }
}
watch(concatStore.info, () => {
  getFriendInfo()
})
const saveFriendInfo = async () => {
  const res = await updatefriendInfoAPI({
    new_group_id: 1,
    old_group_id: 1,
    remark: friendInfo.value.remark,
    user_id: friendInfo.value.user_id
  })
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: '修改成功'
    })
    concatStore.getMessageList()
  }
}
</script>
<template>
  <el-card class="box-card" v-if="!concatStore.info.type && friendInfo">
    <template #header>
      <div class="card-header">
        <el-avatar :size="80" :src="friendInfo.avatar ? IPAddress + friendInfo.avatar : null">
          <el-icon :size="24"><IEpUserFilled /></el-icon
        ></el-avatar>
        <div class="info">
          <div class="name">{{ friendInfo.name }}</div>
          <div class="sign">{{ friendInfo.signature }}</div>
        </div>
      </div>
    </template>
    <div class="container">
      <div class="row">
        <div class="prefix">用户名</div>
        <div class="value">{{ friendInfo.username }}</div>
      </div>
      <div class="row">
        <div class="prefix">昵称</div>
        <div class="value">{{ friendInfo.name }}</div>
      </div>
      <div class="row">
        <div class="prefix">备注</div>
        <div class="value">
          <el-input v-model="friendInfo.remark" :suffix-icon="Edit"></el-input>
        </div>
      </div>
      <div class="footer">
        <el-button style="flex: 1" size="large" @click="saveFriendInfo">保存信息</el-button>
        <el-button type="primary" style="flex: 1" size="large">发送消息</el-button>
      </div>
    </div>
  </el-card>
  <el-card class="box-card" v-if="concatStore.info.type && friendInfo">
    <template #header>
      <div class="card-header">
        <el-avatar :size="80"></el-avatar>
        <div class="info">
          <div class="name">nova</div>
          <div class="sign">该用户尚未设置个性签名</div>
        </div>
      </div>
      <el-tabs stretch>
        <el-tab-pane label="首页">
          <div class="container">
            <div class="row">
              <div class="prefix">群介绍</div>
              <div class="value">nova1</div>
            </div>
            <div class="row">
              <div class="prefix">群主</div>
              <div class="value">nova1</div>
            </div>
            <div class="row">
              <div class="prefix">群成员</div>
              <div class="value">nova1</div>
            </div>
            <div class="footer">
              <el-button style="flex: 1">邀请成员</el-button>
              <el-button type="primary" style="flex: 1">发送消息</el-button>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="成员"></el-tab-pane>
      </el-tabs>
    </template>
  </el-card>
</template>
<style scoped lang="scss">
.card-header {
  display: flex;
  align-items: center;
  .info {
    height: 80px;
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .name {
      font-size: 32px;
    }
    .sign {
      color: rgb(127, 127, 127);
    }
  }
}
.container {
  display: flex;
  flex-direction: column;
  height: 100%;
  .row {
    display: flex;
    align-items: center;
    height: 40px;
    padding: 20px;
    .prefix {
      color: rgb(196, 196, 196);
      margin-right: 40px;
      width: 40px;
      white-space: nowrap;
    }
  }
  .footer {
    display: flex;
    margin-top: 200px;
  }
}

.box-card {
  width: min(500px, 50%);
}
</style>
