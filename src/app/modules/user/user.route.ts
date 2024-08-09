import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { UserValidation } from './user.validation'
import { UserControllers } from './user.controller'

const router = express.Router()

router.post(
  '/create-user',
  validateRequest(UserValidation.createUserValidationSchema),
  UserControllers.createUser,
)

router.post(
  '/login',
  validateRequest(UserValidation.loginValidationSchema), // Create a login validation schema
  UserControllers.loginUser,
)

export const UserRoutes = router
