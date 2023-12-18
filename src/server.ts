import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import todosRoutes from './routes/todosRoutes'

const app = express()
const port = 4000
dotenv.config()

const mongoUri = process.env.MONGODB_URI as string

mongoose.connect(mongoUri)
  .then(() => console.log('Mongo connected succsefully'))
  .catch((error) => {
    console.log(error.message)
  })

mongoose.connection.on('error', err => {
 console.log(err)
})

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static('public'))
app.use(morgan('common'))

app.use('/todos', todosRoutes)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
