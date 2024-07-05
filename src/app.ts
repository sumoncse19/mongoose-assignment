import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { ProductRoutes } from './app/modules/product/product.routes'

const app: Application = express()

// parser
app.use(express.json())
app.use(cors())

// application routes
app.use('/api/products', ProductRoutes)

const getAController = (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Your server is running and hit the / route!',
  })
}

app.get('/', getAController)

export default app
