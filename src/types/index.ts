export type Category = 'food' | 'life' | 'other' | 'electric' | 'water'

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

export interface IBillItem extends CommonField {
  category: Category
  name?: string
  amount: number
  actor: IUser[]
}

export interface IBillForm {
  category: Category
  amount: number
  actor: string[]
  date: string
  remark?: string
}
