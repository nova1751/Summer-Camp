import request from '@/utils/request'
import type { userFormData, userResponseData, updatedFormData } from '@/types/user'
// 统一管理接口
enum API {
  LOGIN_URL = '/auth/login',
  REGISTER_URL = '/auth/register',
  UPDATEINFO_URL = '/auth/updateinfo'
}

export const loginAPI = (data: userFormData) => {
  return request.post<userFormData, userResponseData>(API.LOGIN_URL, data)
}

export const registerAPI = (data: userFormData) => {
  return request.post<userFormData, userResponseData>(API.REGISTER_URL, data)
}

export const updateUserInfoAPI = (data: updatedFormData) => {
  return request<updatedFormData, userResponseData>({
    url: API.UPDATEINFO_URL,
    method: 'post',
    data,
    headers: { 'Content-Type': 'multipart/form-data;' }
  })
}
