import router from '@/router'
import { useUserStore } from '@/stores/user'
export const IPAddress = 'http://127.0.0.1:8888/api/chat/v1'
const request = axios.create({
  baseURL: IPAddress,
  timeout: 5000
})
// axios请求拦截器
request.interceptors.request.use(
  (config) => {
    const userStore = useUserStore()
    const token = userStore.token
    if (token) {
      config.headers.Authorization = token
    }
    return config
  },
  (e) => Promise.reject(e)
)

// axios响应式拦截器
request.interceptors.response.use(
  (res) => {
    if (res.data.code === 401) {
      ElMessage({
        message: res.data.message,
        type: 'error',
        duration: 1.5 * 1000,
        onClose: () => {
          setTimeout(() => {
            router.push('/login')
          }, 1.5 * 1000)
        }
      })
    }
    return res.data
  },
  (e) => {
    // const userStore = useUserStore()
    if (e.response) {
      ElMessage({
        type: 'error',
        message: e.response.data.msg
      })
    } else {
      ElMessage({
        type: 'error',
        message: '发生错误！'
      })
    }

    // if (e.response.status === 401) {
    //   // userStore.clearUserInfo()
    //   router.push('/login')
    // }
    return Promise.reject(e)
  }
)

export default request
