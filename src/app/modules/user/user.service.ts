import { TUser } from './user.interface'
import { UserModel } from './user.model'

const createUserIntoDB = async (userData: TUser) => {
  const user = new UserModel(userData)
  return await user.save()
}

export const UserServices = {
  createUserIntoDB,
}
