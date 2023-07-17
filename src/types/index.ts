export type Category = 'food' | 'life' | 'other' | 'electric' | 'water' | 'vegetable'

export type IResponseResult<T = any> = Promise<{
  code: number
  data: T
  msg: string
}>

interface CommonField {
  id: string
  createTime: string
  updateTime: string
  isDelete: 0 | 1
}

export interface IUser extends CommonField {
  openid: string
  nickname: string
  avatar: string
}
export interface Activity extends CommonField {
  creatorId: string
  name: string
  participants: Array<ActivityParticipants>
}
export interface ActivityParticipants extends CommonField {
  activityId: string
  creator: IUser
  userId: string
  user: IUser
}

export interface IBillForm {
  activityId: string
  category: Category
  description?: string
  money: number
  date: string
  participantIds: string[]
  remark?: string
}

export interface IBillInfo {
  bills: Array<Bill>
  user: IUser
  totalAmount: number
}

export interface BillParticipants extends CommonField {
  billId: string
  userId: string
  user: IUser
  splitMoney: number
  fixed: 0 | 1
  paid: 0 | 1
  payToUserId: string
  payTo: string
}

export interface Bill extends CommonField {
  money: number
  category: Category
  remark: string
  creatorId: string
  date: string
  creator: IUser
  participantIds: Array<string>
  participant: Array<BillParticipants>
  activityId: string
  description: string
}
