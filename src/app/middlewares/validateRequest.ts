import { NextFunction, Request, Response } from 'express'
import { AnyZodObject } from 'zod'

// In this validateRequest function we can't pass any parameter but we can use higher order function for pass any parameter.
const validateRequest = (validateSchema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(`I'm from sena bahini for validate your data`, req.body)

      // validation
      await validateSchema.parseAsync({
        body: req.body,
      })

      console.log('After validation')

      next()
    } catch (err) {
      next(err)
    }
  }
}

export default validateRequest
