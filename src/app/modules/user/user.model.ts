import { model, Schema } from 'mongoose'
import { IUserModel, TUser } from './user.interface'
import bcrypt from 'bcrypt'
import config from '../../config'

const userSchema = new Schema<TUser, IUserModel>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    status: {
      type: String,
      enum: ['active', 'blocked'],
      default: 'active',
      required: true,
    },
    isDeleted: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true, // for generate createdAt and updatedAt by default
  },
)

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this

  // Hashing password and save into DB
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  )

  next()
})

userSchema.post('save', function (doc, next) {
  doc.password = ''

  next()
})

userSchema.statics.isUserExists = async function (email: string) {
  const existingUser = await UserModel.findOne({ email })

  console.log(existingUser, 'finded user')

  throw new Error('User is already exist')

  return existingUser
}

export const UserModel = model<TUser, IUserModel>('User', userSchema)
