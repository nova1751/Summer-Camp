import { loginAPI, registerAPI } from '@/apis/user'
import type { userFormData, UserInfo } from '@/types/user'
export const useUserStore = defineStore(
  'user',
  () => {
    const userInfo = ref<UserInfo | null>(null)
    const token = ref<string | null>(null)
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
      token.value = res.data.token
    }
    return {
      userInfo,
      token,
      getUserInfo,
      userRegister
    }
  },
  {
    persist: true
  }
)
