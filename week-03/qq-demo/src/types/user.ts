// 定义登录请求数据类型
export interface userFormData {
  username: string
  password: string
}
// 定义用户信息的数据类型
export interface UserInfo {
  id: number
  avatar: string
  username: string
  name: string
  phone: string
  created_at: string
  signature: string
}
// 定义通用接口返回数据的 ts 类型
export interface responseData {
  code: number
  message: string
}

// 定义登录用户返回数据类型
export interface userResponseData extends responseData {
  data: {
    info: UserInfo
    token: string
  }
}
// 定义修改数据用户数据类型
export interface updatedFormData {
  username: string
  name: string
  signature: string
  phone: string
  avatar: File
}
