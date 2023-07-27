import { loginAPI, registerAPI, updateUserInfoAPI } from '@/apis/user'
import type { updatedFormData, userFormData, UserInfo } from '@/types/user'
export const useUserStore = defineStore(
  'user',
  () => {
    const userInfo = ref<UserInfo | null>(null)
    const token = ref<string | null>(null)
    // 定义拼接用户头像 url 的方法
    const concatAvatarUrl = () =>
      userInfo.value?.avatar
        ? (userInfo.value.avatar = 'http://127.0.0.1:8888' + userInfo.value.avatar)
        : null
    // 下方是暴露出去的函数
    const getUserInfo = async (data: userFormData) => {
      const res = await loginAPI(data)
      if (res.code === 4001) {
        ElMessage({
          type: 'error',
          message: res.message
        })
        throw new Error('登录失败')
      }
      userInfo.value = res.data.info
      concatAvatarUrl()
      token.value = res.data.token
    }
    // 账号注册函数
    const userRegister = async (data: userFormData) => {
      const res = await registerAPI(data)
      if (res.code === 4003) {
        ElMessage({
          type: 'error',
          message: res.message
        })
        throw new Error('注册失败')
      }
      userInfo.value = res.data.info
      concatAvatarUrl()
      token.value = res.data.token
    }
    // 更新用户资料的函数
    const updateUserInfo = async (data: updatedFormData) => {
      const res = await updateUserInfoAPI(data)
      if (res.code === 200) {
        ElMessage({
          type: 'success',
          message: '修改成功'
        })
      } else {
        ElMessage({
          type: 'error',
          message: '修改失败'
        })
        throw new Error('修改资料失败')
      }
    }
    // 清空用户数据的函数
    const clearUserInfo = () => {
      userInfo.value = null
      token.value = null
    }
    return {
      userInfo,
      token,
      getUserInfo,
      userRegister,
      updateUserInfo,
      clearUserInfo
    }
  },
  {
    persist: true
  }
)
