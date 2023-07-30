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
