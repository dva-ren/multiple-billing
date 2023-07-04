export type Category = 'food' | 'life' | 'other' | 'electric' | 'water' | 'vegetable'

export type IResponseResult<T = any> = Promise<{
  code: number
  data: T
  msg: string
}>

interface CommonField {
  _id: string
  createAt: string
}

export interface IUser extends CommonField {
  openid: string
  nickName: string
  avatar: string
}
export interface IUserInfo extends IUser {
  amount: number
  users: IUser[]
}
export interface IBillItem extends CommonField {
  category: Category
  name?: string
  amount: number
  participant: IUser[]
}

export interface IBillForm {
  category: Category
  amount: number | undefined
  participant: string[]
  date: string
  remark?: string
}

export interface IRecord {
  _id: string
  recordId: string
  userId: string
  checked: boolean
  sharedAmount: string
  record: Record
}

export interface Record {
  _id: string
  category: Category
  amount: string
  date: string
  participant: IUser[]
  creatorId: string
  creator: IUser
  remark?: string
  createAt: string
}

export interface ICheckout {
  _id: string
  payTo: IUser
  totalAmount: number
  ids: string[]
}
