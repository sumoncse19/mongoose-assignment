import { z } from 'zod'

const userValidationSchema = z.object({
  name: z
    .string({
      invalid_type_error: 'Name must be string',
    })
    .max(40, { message: 'Name can not be more than 40 characters' }),
  email: z
    .string({
      invalid_type_error: 'Email must be string',
    })
    .max(40, { message: 'Email can not be more than 40 characters' }),
  password: z
    .string({
      invalid_type_error: 'Password must be string',
    })
    .max(20, { message: 'Password can not be more than 20 characters' }),
})

const createUserValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'Name must be string',
      })
      .max(40, { message: 'Name can not be more than 40 characters' }),
    email: z
      .string({
        invalid_type_error: 'Email must be string',
      })
      .max(40, { message: 'Email can not be more than 40 characters' }),
    password: z
      .string({
        invalid_type_error: 'Password must be string',
      })
      .max(20, { message: 'Password can not be more than 20 characters' }),
  }),
})

const loginValidationSchema = z.object({
  body: z.object({
    email: z
      .string({
        invalid_type_error: 'Email must be string',
      })
      .max(40, { message: 'Email can not be more than 40 characters' }),
    password: z
      .string({
        invalid_type_error: 'Password must be string',
      })
      .max(20, { message: 'Password can not be more than 20 characters' }),
  }),
})

export const UserValidation = {
  userValidationSchema,
  createUserValidationSchema,
  loginValidationSchema,
}
