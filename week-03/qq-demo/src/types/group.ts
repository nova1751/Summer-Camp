import type { responseData } from './user'
export interface searchGroupInfo {
  name: string
  number: number
  status: boolean
  group_id: number
}
export interface searchGroupResData extends responseData {
  data: searchGroupInfo[]
}
export interface addGroupResData extends responseData {
  data: {
    group_id: string
    room: string
  }
}
export interface groupMember {
  user_id: string
  avatar: string
  name: string
  nickname: string
  created_at: string
  lastMessageTime: string
}
export interface groupInfo extends responseData {
  data: {
    id: number
    name: string
    creator_id: number
    avatar: string
    announcement: string
    room: string
    created_at: string
    members: groupMember[]
  }
}
