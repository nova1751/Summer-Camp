<script setup lang="ts">
const router = useRouter()
import { User, Lock, Check } from '@element-plus/icons-vue'
import type { FormInstance, FormRules } from 'element-plus'
import VueImgVerify from '@/components/VueImgVerify.vue'
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
const ruleFormRef = ref<FormInstance>()
// 定义验证码
const verifyCode1 = ref<string>('')
const getIdentifyCode = (identifyCode: string) => {
  verifyCode1.value = identifyCode
}
const ruleForm = reactive({
  username: '',
  password: '',
  checkPass: '',
  verifyCode: ''
})

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else {
    if (ruleForm.checkPass !== '') {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateField('checkPass', () => null)
    }
    callback()
  }
}
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== ruleForm.password) {
    callback(new Error('两次输入的密码不一致'))
  } else {
    callback()
  }
}
const verfiyCode = (rule: any, value: any, callback: any) => {
  if (value.length !== 4) {
    callback(new Error('请输入4位验证码！'))
  } else if (value !== verifyCode1.value) {
    callback(new Error('验证码错误，请重新输入！'))
  } else {
    callback()
  }
}
const rules = reactive<FormRules<typeof ruleForm>>({
  username: [
    {
      required: true,
      message: '请输入用户名',
      trigger: 'blur'
    },
    {
      max: 20,
      message: '用户名过长',
      trigger: 'blur'
    }
  ],

  password: [
    {
      min: 6,
      max: 20,
      message: '密码长度必须在6~20之间',
      trigger: 'blur'
    },
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur'
    },
    {
      validator: validatePass,
      trigger: 'blur'
    }
  ],
  checkPass: [
    {
      min: 6,
      max: 20,
      message: '密码长度必须在6~20之间',
      trigger: 'blur'
    },
    {
      required: true,
      message: '请再次输入密码',
      trigger: 'blur'
    },
    {
      validator: validatePass2,
      trigger: 'blur'
    }
  ],
  verifyCode: [
    {
      required: true,
      message: '请输入验证码',
      trigger: 'blur'
    },
    {
      validator: verfiyCode,
      trigger: 'blur'
    }
  ]
})
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid) => {
    if (valid) {
      await userStore.userRegister({ username: ruleForm.username, password: ruleForm.password })
      ElMessage({ type: 'success', message: '注册成功！请登录' })
      router.push('/login')
    }
  })
}
const clearForm = (formEl: FormInstance | undefined) => {
  formEl?.resetFields()
}
</script>

<template>
  <div class="common-center-layout">
    <div class="register-layout">
      <div class="welcome-title">
        <div class="avatar">
          <img src="../../assets/images/logo.svg" alt="" />
        </div>
        <h1>欢迎注册 WebChat</h1>
      </div>
      <div class="register-box">
        <div class="register-form">
          <el-form
            ref="ruleFormRef"
            :model="ruleForm"
            status-icon
            label-position="top"
            :rules="rules"
          >
            <el-form-item label="用户名" prop="username">
              <el-input
                v-model="ruleForm.username"
                :prefix-icon="User"
                class="icon-size"
                size="large"
              />
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input
                v-model="ruleForm.password"
                type="password"
                :prefix-icon="Lock"
                autocomplete="off"
                class="icon-size"
                size="large"
              />
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
              <el-input
                v-model="ruleForm.checkPass"
                :prefix-icon="Lock"
                type="password"
                class="icon-size"
                autocomplete="off"
                size="large"
              />
            </el-form-item>
            <el-form-item label="验证码" prop="verifyCode" class="verify">
              <el-input
                v-model="ruleForm.verifyCode"
                :prefix-icon="Check"
                type="text"
                class="icon-size"
                autocomplete="off"
                size="large"
              />
              <vue-img-verify
                :content-width="120"
                :content-height="40"
                @get-identify-code="getIdentifyCode"
                class="verify-code"
              ></vue-img-verify>
            </el-form-item>
            <el-form-item class="bottom">
              <el-button
                size="large"
                type="primary"
                class="panel-bottom"
                auto-insert-space
                @click="submitForm(ruleFormRef)"
              >
                注册
              </el-button>
              <el-button
                size="large"
                class="panel-bottom"
                @click="clearForm(ruleFormRef)"
                auto-insert-space
                >清除</el-button
              >
            </el-form-item>
            <div class="login-tip-box">
              已有账号？<router-link to="/login">点击此处登录</router-link>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.common-center-layout {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
}

.register-layout {
  padding: 32px 24px;
  width: min(90%, 480px);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.6);
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.08);
}

.welcome-title {
  text-align: center;
  font-size: 32px;
  position: relative;
  top: 0;
  margin-bottom: 32px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  .avatar {
    width: 72px;
    height: 72px;
    border-radius: 50%;
    flex-shrink: 0;
    img {
      width: 100%;
      height: 100%;
    }
  }
}

.register-box {
  display: flex;
  justify-content: center;

  .register-form {
    width: 100%;
    height: auto;
    .icon-size {
      font-size: 16px;
    }
    .bottom {
      margin-top: 20px;
    }
    .verify:deep(div.el-form-item__content) {
      align-items: center;
      flex-wrap: nowrap;
    }
    .verify-code {
      cursor: pointer;
      user-select: none;
    }
  }
}

.login-tip-box {
  color: #999;
  position: relative;
  text-align: center;
}
el-form-item:last-child {
  display: flex;
}
.panel-bottom {
  flex: 1;
}
</style>
