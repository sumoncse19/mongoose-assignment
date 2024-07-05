import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { ProductRoutes } from './app/modules/product/product.routes'
import { OrderRoutes } from './app/modules/order/order.routes'

const app: Application = express()

// parser
app.use(express.json())
app.use(cors())

// application routes
app.use('/api/products', ProductRoutes)
app.use('/api/orders', OrderRoutes)

const getAController = (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message:
      'Your server is running, welcome to simple e-commerce backend application!',
  })
}

app.get('/', getAController)

// Not Found Route Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  })
})

export default app
