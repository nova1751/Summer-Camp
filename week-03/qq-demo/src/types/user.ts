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
interface responseData {
  code: number
  message: string
}

// 定义登录用户返回数据类型
export interface loginResponseData extends responseData {
  data: {
    info: UserInfo
    token: string
  }
}
