import catchAsync from '../../../utils/catchAsync'
import sendResponse from '../../../utils/sendResponse'
import httpStatus from 'http-status'
import { UserServices } from './user.service'

const createUser = catchAsync(async (req, res) => {
  const result = await UserServices.createUserIntoDB(req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created successfully!',
    data: result,
  })
})

const loginUser = catchAsync(async (req, res) => {
  const { email, password } = req.body
  const { user, token } = await UserServices.authenticateUser(email, password)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully!',
    data: { user, token },
  })
})

export const UserControllers = {
  createUser,
  loginUser,
}
