<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import type { FormInstance } from 'element-plus'
import { useUserStore } from '@/stores/user'
import type { userFormData } from '@/types/user'
const userStore = useUserStore()
const router = useRouter()
const userInfo = ref<userFormData>({
  username: userStore.userInfo?.username!,
  password: ''
})
// 定义头像
const avatarUrl = userStore.userInfo?.avatar
  ? 'http://127.0.0.1:8888' + userStore.userInfo.avatar
  : null
// 准备数据对象
const rules = {
  username: [
    {
      required: true,
      message: '用户名不能为空',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '密码不能为空',
      trigger: 'blur'
    },
    {
      min: 6,
      max: 14,
      message: '密码长度要求6-14个字符',
      trigger: 'blur'
    }
  ]
}
const formRef = ref<FormInstance>()
const doLogin = () => {
  formRef.value!.validate(async (valid) => {
    if (valid) {
      await userStore.getUserInfo(userInfo.value)
      ElMessage({ type: 'success', message: '登录成功' })
      router.replace('/')
    }
  })
}
const resetForm = () => {
  formRef.value!.resetFields()
}
</script>

<template>
  <div class="login-right-layout">
    <div class="login-box">
      <div class="welcome-title">
        <div class="avatar" v-if="avatarUrl">
          <img :src="avatarUrl" alt="" />
        </div>
        <h1>登录到 WebChat</h1>
      </div>
      <div class="login-form">
        <el-form
          :model="userInfo"
          :rules="rules"
          ref="formRef"
          label-position="top"
          label-width="60px"
          status-icon
        >
          <el-form-item label="用户名" prop="username">
            <el-input
              class="icon-size"
              v-model="userInfo.username"
              :prefix-icon="User"
              size="large"
            />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              class="icon-size"
              v-model="userInfo.password"
              :prefix-icon="Lock"
              show-password
              size="large"
            />
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="doLogin"
              size="large"
              class="confirm"
              auto-insert-space
              >登录</el-button
            >
            <el-button @click="resetForm" size="large" class="confirm" auto-insert-space
              >清除</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <div class="register-tip-box">
        还没有账号？<router-link to="/register">点击此处注册</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.login-right-layout {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .welcome-title {
    font-size: 32px;
    font-weight: 600;
    color: #222;
    line-height: 36px;
    margin-bottom: 32px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: space-around;
    .avatar {
      width: 72px;
      height: 72px;
      border-radius: 50%;
      overflow: hidden;
      flex-shrink: 0;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .login-box {
    width: min(90%, 450px);
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.6);
    color: #eaeaea;
    line-height: 1;
    padding: 32px 24px 24px;
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.08);
    .login-form {
      width: 100%;
      .icon-size {
        font-size: 16px;
      }
      .confirm {
        flex: 1;
      }
    }
    .register-tip-box {
      text-align: center;
      line-height: 20px;
      font-size: 14px;
      margin-top: 24px;
      color: #999;
    }
  }
}
</style>
