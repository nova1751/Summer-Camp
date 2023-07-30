<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import type { FormInstance } from 'element-plus'
import { onClickOutside } from '@vueuse/core'
import { UserFilled } from '@element-plus/icons-vue'
// 定义编程时路由导航
const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
// 维护图标名称的数组
const iconTopList = ['icon-chat', 'icon-user']
const routes = ['/', '/friends']
const iconBottomList = ['icon-gengduo']
// 定义顶部当前激活图标索引

const curIndex = ref(routes.indexOf(route.path))
const topClickHandler = (i: number) => {
  curIndex.value = i
  router.push(routes[i])
}
const centerDialogVisible = ref(false)
// 定义一个新的对象收集表单数据
const updatedUserInfo = reactive({
  ...userStore.userInfo!
})
// 定义电话号码的校验规则
const rules = {
  phone: [
    { pattern: /[0-9]{11}/, message: '请输入正确的电话号码', trigger: 'blur' },
    { max: 11, min: 11, message: '请输入11位的电话号码', trigger: 'blur' }
  ]
}
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
    updatedUserInfo.avatar = url
    // console.log(updatedUserInfo.avatar, userStore.userInfo?.avatar)
  }
}
// 处理修改信息后的校验逻辑
const formRef = ref<FormInstance>()
const confirmChange = () => {
  formRef.value?.validate(async (valid) => {
    if (valid) {
      const avatarUrl = await userStore.updateUserInfo({
        username: updatedUserInfo.username,
        name: updatedUserInfo.name,
        signature: updatedUserInfo.signature,
        phone: updatedUserInfo.phone,
        avatar: file!
      })
      userStore.userInfo = { ...updatedUserInfo }
      userStore.userInfo.avatar = avatarUrl
      userStore.concatAvatarUrl()
      centerDialogVisible.value = false
    }
  })
}
// 定义退出登录的逻辑
const exit = () => {
  userStore.clearUserInfo()
  ElMessage({
    type: 'success',
    message: '退出登录成功'
  })
  router.replace('/login')
}
// 定义展示工具栏二级菜单的按钮
// 定义二级菜单，点击消除按钮
const menu = ref<HTMLDivElement>()
const menuShow = ref(false)
const closeMenu = () => {
  setTimeout(() => {
    menuShow.value = false
  })
}
onClickOutside(menu, closeMenu)
</script>

<template>
  <div class="tool-bar">
    <div class="top">
      <div class="tool">
        <div class="avatar" @click="centerDialogVisible = true">
          <el-avatar :size="55" :src="userStore.userInfo?.avatar">
            <el-icon :size="24"><UserFilled /></el-icon
          ></el-avatar>
          <div class="dot">
            <div class="state"></div>
          </div>
        </div>
      </div>
      <div class="tool" v-for="(item, i) in iconTopList" :key="i">
        <div class="outline" @click="topClickHandler(i)" :class="{ active: i === curIndex }">
          <i class="iconfont" :class="item"></i>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="tool" v-for="(item, i) in iconBottomList" :key="i">
        <div class="outline">
          <i class="iconfont" :class="item" @click="menuShow = true"></i>
        </div>
      </div>
      <div class="menu" ref="menu" v-if="menuShow">
        <div class="row" @click="exit">退出</div>
      </div>
    </div>
    <el-dialog v-model="centerDialogVisible" title="编辑资料" width="480px" align-center>
      <div class="container">
        <div class="avatar" @click="handleImgUpload">
          <el-avatar :src="updatedUserInfo.avatar" :size="120"></el-avatar>
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
          <el-button @click="centerDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmChange">保存</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.tool-bar {
  width: 72px;
  background-color: rgb(236, 236, 236);
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  user-select: none;
  // 顶部图标
  .top {
    .tool {
      width: 72px;
      height: 80px;
      position: relative;
      .avatar {
        width: 55px;
        height: 55px;
        overflow: hidden;
        position: relative;
        left: 0;
        right: 0;
        margin: auto;
        cursor: pointer;
        transition: 0.3s;
        img {
          width: 100%;
          height: 100%;
          border-radius: 27.5px;
        }
        &:hover {
          transform: scale(1.05);
        }
      }
      .dot {
        width: 20px;
        height: 20px;
        position: absolute;
        background-color: rgb(236, 236, 236);
        border-radius: 50%;
        right: 0;
        bottom: 0;
        .state {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: rgb(37, 230, 138);
          @include alignment();
        }
      }

      .outline {
        width: 55px;
        height: 55px;
        background-color: rgba(220, 220, 220, 0);
        border-radius: 10px;
        transition: 0.5s;
        @include alignment();
        .iconfont {
          font-size: 40px;
          display: block;
          color: black;
          cursor: pointer;
          @include alignment();
          transition: 0.3s;
        }

        &:hover {
          background-color: rgba(220, 220, 220, 1);
        }
        &:active .iconfont {
          color: $qq-blue;
        }
        &.active {
          .iconfont {
            color: $qq-blue;
          }
          background-color: rgba(220, 220, 220, 1);
        }
      }
    }
  }
  //
  .bottom {
    position: relative;
    .tool {
      width: 72px;
      height: 65px;
      position: relative;
      .iconfont {
        font-size: 30px;
        display: block;
        color: black;
        @include alignment();
        cursor: pointer;
        transition: 0.3s;
        &:hover {
          color: $qq-blue;
        }
      }
      &:last-of-type .iconfont {
        font-size: 30px;
      }
    }
    .menu {
      width: 100px;
      padding: 5px;
      border-radius: 5px;
      background-color: white;
      position: absolute;
      left: 72px;
      bottom: 10px;
      cursor: pointer;
      user-select: none;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      z-index: 1000;
      .row {
        border-radius: 5px;
        text-align: center;
        white-space: nowrap;
        margin-bottom: 5px;
        height: 30px;
        line-height: 30px;
        width: 100%;
        &:hover {
          background-color: rgb(245, 245, 245);
        }
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
  :deep(.el-overlay-dialog) {
    .el-dialog {
      background-color: rgb(242, 242, 242);
    }
    .el-dialog__header {
      text-align: center;
    }
    .el-dialog__body {
      border-top: 1px solid rgb(233, 233, 233);
      padding: 30px 30px;
    }
    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      .avatar {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        background-color: skyblue;
        position: relative;
        cursor: pointer;
        .modal {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          position: absolute;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          color: white;
          left: 0;
          top: 0;
          opacity: 0;
          transition: 0.3s;
          .iconfont {
            font-size: 40px;
          }
          &:hover {
            opacity: 1;
          }
        }
      }
      .input {
        height: 50px;
        margin-top: 20px;
      }
      .el-form {
        width: 100%;
        margin-top: 30px;
      }
    }
  }
}
</style>
