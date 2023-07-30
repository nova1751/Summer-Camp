import type { groupMessage, userMessage } from '@/types/message'
import { getMessageListAPI } from '@/apis/message'

export const useContactStore = defineStore('contact', () => {
  const messageList = ref<(groupMessage | userMessage)[]>([])
  const friendList = ref<userMessage[]>([])
  const groupList = ref<groupMessage[]>([])
  const info = ref<{ type: null | number; id: number | null }>({
    type: null,
    id: null
  })
  const getMessageList = async () => {
    const res = await getMessageListAPI()
    if (res.code === 200) {
      messageList.value = res.data
      friendList.value = messageList.value.filter(
        (item) => !item.hasOwnProperty('group_id')
      ) as userMessage[]
      groupList.value = messageList.value.filter((item) =>
        item.hasOwnProperty('group_id')
      ) as groupMessage[]
    }
  }
  return {
    info,
    messageList,
    friendList,
    groupList,
    getMessageList
  }
})
