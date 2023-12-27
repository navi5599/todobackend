import { Request, Response, NextFunction } from 'express'
import { isValidObjectId } from 'mongoose'
import { ITodo } from '../models/Todo'

const Models = require('../models/Todo')
const Todos = Models.Todos

declare global {
  namespace Express {
    interface Request {
      todo?: ITodo
    }
  }
}

export const validateTodoId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const todoId = req.params.id

  try {
    if (!isValidObjectId(todoId)) {
      return res.status(400).json({ error: 'Invalid todo ID' })
    }

    const todo: ITodo | null = await Todos.findById(todoId)

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' })
    }

    req.todo = todo

    next()
  } catch (err) {
    return res.status(500).json({ message: err })
  }
}

export const validateBody = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const body: ITodo = req.body

  if (!body) {
    res.status(400).json({ message: 'Body is missing'})
  }

  const emptyValues = Object.values(body).filter((value) => value === '')

  if (emptyValues.length > 0) {
    const errorMsg = 'Please provide values for all fields.'

    res.status(400).json({ message: errorMsg })
    return
  }

  next()
}