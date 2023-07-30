import type { responseData } from './user'

// 定义返回的消息列表单个的数据类型
export interface groupMessage {
  group_id: number
  avatar: string
  name: string
  room: string
  updated_at: string
  unreadCount: number
  lastMessage: string
  type: string
}

export interface userMessage {
  user_id: number
  name: string
  receiver_username: string
  room: string
  updated_at: string
  unreadCount: number
  lastMessage: string
  type: string
  avatar: string
}
// 定义获取消息列表数据返回类型
export interface messageListData extends responseData {
  data: (groupMessage | userMessage)[]
}
