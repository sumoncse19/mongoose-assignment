import express, { Application, Request, Response } from 'express'
import cors from 'cors'

const app: Application = express()

// parser
app.use(express.json())
app.use(cors())

// application routes

const getAController = (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Your server is running and hit the / route!',
  })
}

app.get('/', getAController)

export default app
