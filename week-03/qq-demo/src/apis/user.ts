import request from '@/utils/request'
import type { userFormData, loginResponseData } from '@/types/user'
// 统一管理接口
enum API {
  LOGIN_URL = '/auth/login',
  REGISTER_URL = '/auth/register'
}

export const loginAPI = (data: userFormData) => {
  return request.post<userFormData, loginResponseData>(API.LOGIN_URL, data)
}

export const registerAPI = (data: userFormData) => {
  return request.post<userFormData, loginResponseData>(API.REGISTER_URL, data)
}
