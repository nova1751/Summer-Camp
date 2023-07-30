import type { addGroupResData, searchGroupResData } from '@/types/group'
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
