import { Request, Response } from 'express'
import { ERROR, SUCCESS } from '../shared/api.response.types'
import { orderSchema } from './order.schema'
import { OrderServices } from './order.service'
import { IOrder } from './order.interface'

const createOrder = async (req: Request, res: Response) => {
  const validationResult = orderSchema.safeParse(req.body)
  if (!validationResult.success) {
    ERROR(
      res,
      'Failed to validate Order data, please provide correct data',
      [validationResult.error.errors],
      400,
    )
  }

  try {
    const order = await OrderServices.createOrderIntoDB(
      validationResult.data as IOrder,
    )
    SUCCESS(res, 'Order created successfully!', order)
  } catch (error: unknown) {
    ERROR(
      res,
      error instanceof Error ? error.message : 'Failed to create Order!',
      error,
      500,
    )
  }
}

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const email = req.query.email
    if (email) {
      const orders = await OrderServices.getOrdersByEmailFromDB(email as string)
      if (orders.length === 0) {
        ERROR(res, 'Order not found', '', 404)
        return
      }
      SUCCESS(res, `Orders fetched successfully for user ${email}`, orders)
    } else {
      const orders = await OrderServices.getAllOrdersFromDB()
      SUCCESS(res, 'Orders fetched successfully!', orders)
    }
  } catch (error: unknown) {
    ERROR(
      res,
      error instanceof Error ? error.message : 'Failed to get Order!',
      error,
      500,
    )
  }
}

export const OrderControllers = {
  createOrder,
  getAllOrders,
}
