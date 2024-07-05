import ProductModel from '../product/product.model'
import { IOrder } from './order.interface'
import { OrderModel } from './order.model'

const createOrderIntoDB = async (orderData: IOrder) => {
  const product = await ProductModel.findById(orderData.productId)

  if (!product) {
    throw new Error('Product is not available in inventory')
  }

  if (product.inventory.quantity < orderData.quantity) {
    throw new Error('Insufficient quantity available in inventory')
  }

  const order = new OrderModel(orderData)
  await order.save()

  product.inventory.quantity -= orderData.quantity
  product.inventory.inStock = product.inventory.quantity > 0
  await product.save()

  return order
}

export const getAllOrdersFromDB = async () => {
  return await OrderModel.find()
}

export const getOrdersByEmailFromDB = async (email: string) => {
  return await OrderModel.find({ email })
}

export const OrderServices = {
  createOrderIntoDB,
  getAllOrdersFromDB,
  getOrdersByEmailFromDB,
}
