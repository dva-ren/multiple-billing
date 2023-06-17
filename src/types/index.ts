export type Category = 'food' | 'life' | 'other'

interface CommonField {
  id: string
  createAt: string
}

export interface IUser extends CommonField {
  name: string
  avatar: string
  amount: number
}

export interface IBillItem extends CommonField {
  category: Category
  name?: string
  amount: number
  actor: IUser[]
}

export interface IBillForm {
  category: Category
  name?: string
  amount: number
  actor: string[]
}
