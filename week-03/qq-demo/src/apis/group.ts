import type { addGroupResData, groupInfo, searchGroupResData } from '@/types/group'
import request from '@/utils/request'
// 搜索好友
export const groupSearchAPI = (params: { name: string }) => {
  return request<any, searchGroupResData>({
    url: '/group/search',
    method: 'get',
    params
  })
}

export const addGroupAPI = (params: { group_id: number }) => {
  return request<any, addGroupResData>({
    url: '/group/join',
    method: 'get',
    params
  })
}
//获取群聊详情
export const getGroupInfoAPI = (params: any) => {
  return request<any, groupInfo>({
    url: '/group/info',
    method: 'get',
    params
  })
}
