import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'

import todosRoutes from './routes/todosRoutes'
import authRoutes from './routes/authRoutes'
import { errorHandler } from './middleware/errorMiddleware'
import { authenticate } from './middleware/authMiddleware'

dotenv.config()

interface UserBasicInfo {
  _id: string;
  name: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: UserBasicInfo | null
    }
  }
}

const app = express()
const port = 4000

const mongoUri = process.env.MONGODB_URI as string

mongoose.connect(mongoUri)
  .then(() => console.log('Mongo connected succsefully'))
  .catch((error) => {
    console.log(error.message)
  })

mongoose.connection.on('error', err => {
 console.log(err)
})

app.use(helmet())
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(express.static('public'))
app.use(morgan('common'))

app.use('/todos', authenticate, todosRoutes)
app.use(authRoutes)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
