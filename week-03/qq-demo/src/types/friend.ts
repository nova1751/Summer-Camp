import type { responseData } from './user'

// 定义搜索用户单个数据返回类型
export interface searchFriend {
  name: string
  username: string
  status: boolean
  id: number
}
// 定义查询的返回类型
export interface searchFriendResData extends responseData {
  data: searchFriend[]
}
// 定义添加好友成功的数据返回类型
export interface addFriendRes extends responseData {
  data: {
    room: string
    user_id: number
    name: string
    receiver_name: string
  }
}

export interface friendInfo extends responseData {
  data: {
    user_id: number
    room: string
    username: string
    signature: string
    avatar: string
    name: string
    remark: string
    group_id: number
  }
}
