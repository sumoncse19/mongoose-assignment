import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from '../../config'
import { TUser } from './user.interface'
import { UserModel } from './user.model'

const createUserIntoDB = async (userData: TUser) => {
  const user = new UserModel(userData)
  return await user.save()
}

const authenticateUser = async (email: string, password: string) => {
  const user = await UserModel.findOne({ email, isDeleted: false })

  if (!user) {
    throw new Error('Invalid email or password')
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)

  if (!isPasswordValid) {
    throw new Error('Invalid email or password')
  }

  // Generate JWT token
  const token = jwt.sign(
    { id: user._id, email: user.email, status: user.status },
    config.jwt_secret_key as string,
    // { expiresIn: '1h' },
  )

  return { user, token }
}

export const UserServices = {
  createUserIntoDB,
  authenticateUser,
}
