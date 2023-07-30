import type { messageListData } from '@/types/message'
import request from '@/utils/request'

export const getMessageListAPI = () => {
  return request<any, messageListData>({
    url: '/message/list',
    method: 'get'
  })
}
