<script setup lang="ts">
import { getFriendInfoAPI } from '@/apis/friend'
import { updatefriendInfoAPI } from '@/apis/friend'
import { useContactStore } from '@/stores/contact'
import type { friendInfo } from '@/types/friend'
import { IPAddress } from '@/utils/request'
import { Edit } from '@element-plus/icons-vue'
import { getGroupInfoAPI } from '@/apis/group'
import { toggleTime2 } from '@/utils/timeFormat'
const concatStore = useContactStore()
const friendInfo = ref()
const groupInfo = ref()
const getGroupInfo = async () => {
  const res = await getGroupInfoAPI({ group_id: concatStore.info.id })
  if (res.code === 200) {
    groupInfo.value = res.data
  }
}
const getFriendInfo = async () => {
  const res = await getFriendInfoAPI({ group_id: 1, user_id: concatStore.info.id })
  if (res.code === 200) {
    friendInfo.value = res.data
  }
}
watch(concatStore.info, (newVal) => {
  if (!newVal.type) {
    getFriendInfo()
  } else {
    getGroupInfo()
  }
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
          <div class="sign">{{ friendInfo.signature || '暂无个性签名' }}</div>
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
  <el-card class="box-card" v-if="concatStore.info.type && groupInfo">
    <div class="card-header">
      <el-avatar :size="80" :src="groupInfo.avatar ? IPAddress + groupInfo.avatar : null">
        <el-icon :size="24"><IEpUserFilled /></el-icon
      ></el-avatar>
      <div class="info">
        <div class="name">{{ groupInfo.name }}</div>
        <div class="sign">{{ groupInfo.annoucement || '暂无公告' }}</div>
      </div>
    </div>
    <el-tabs stretch>
      <el-tab-pane label="首页">
        <el-scrollbar max-height="100%">
          <div class="container">
            <div class="row">
              <div class="prefix">群介绍</div>
              <div class="value">本群创建于{{ toggleTime2(groupInfo.created_at) }}</div>
            </div>
            <div class="row">
              <div class="prefix">群主</div>
              <div class="value">
                {{
                  groupInfo.members.find((item: any) => item.user_id === groupInfo.creator_id).name
                }}
              </div>
            </div>
            <div class="row member">
              <div class="prefix">群成员</div>
              <div class="value" style="display: flex; flex-wrap: wrap">
                <el-tooltip
                  v-for="member in groupInfo.members"
                  :key="member.user_id"
                  effect="dark"
                  :content="member.name"
                  placement="top-start"
                >
                  <el-avatar
                    :src="member.avatar ? IPAddress + member.avatar : null"
                    style="margin: 0 10px 10px 0"
                  >
                    <el-icon><IEpUserFilled /></el-icon
                  ></el-avatar>
                </el-tooltip>
              </div>
            </div></div
        ></el-scrollbar>
      </el-tab-pane>
      <el-tab-pane label="成员">
        <el-table :data="groupInfo.members" style="width: 100%; margin-bottom: 10px" height="350px">
          <el-table-column label="群用户" prop="name" />
          <el-table-column label="群名称" prop="nickname" />
          <el-table-column label="加入时间" prop="created_at" />
          <el-table-column label="最后发言" prop="lastMessageTime" />
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <div class="footer">
      <el-button style="flex: 1" size="large">邀请成员</el-button>
      <el-button type="primary" style="flex: 1" size="large">发送消息</el-button>
    </div>
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
  height: 360px;
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
    &.member {
      height: fit-content;
      align-items: flex-start;
    }
  }
  .footer {
    display: flex;
    margin-top: auto;
  }
}

.box-card {
  width: min(500px, 90%);
}
</style>
