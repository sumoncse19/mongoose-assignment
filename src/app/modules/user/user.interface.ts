import { Model } from 'mongoose'

export type TUser = {
  name: string
  email: string
  password: string
  status: 'active' | 'blocked'
  isDeleted: boolean
}

export interface IUserModel extends Model<TUser> {
  // eslint-disable-next-line no-unused-vars
  isUserExists(email: string): Promise<TUser>
}
