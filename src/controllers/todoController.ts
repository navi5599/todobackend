import { Request, Response } from "express"
import { ITodo } from "../models/Todo"

const Models = require('../models/Todo')
const Todos = Models.Todos

const getTodos = async (req: Request, res: Response) => {
  try {
   const todos: ITodo[] = await Todos.find()
   res.status(200).json(todos)
  } catch(err) {
   res.status(500).json({ error: err })
  }
 }

 const getTodo = async (req: Request, res: Response) => {
  try {
    const todo: ITodo | undefined = req.todo
    res.status(200).json(todo)
  } catch (err) {
    res.status(500).json({ error: err })
  }
}

const createTodo = async (req: Request, res: Response) => {
  try {
    const { title, description, startingAt, endingAt, isCompleted, isScheduled } = req.body
    
    const newTodo: ITodo = await Todos.create({
      title,
      description,
      startingAt,
      endingAt,
      isCompleted,
      isScheduled,
    })

    res.status(201).json(newTodo)
  } catch (err) {
    res.status(500).json({ error: err })
  }
}

const updateTodo = async (req: Request, res: Response) => {
  try {
    const todoId = req.params.id
    const updatedTodoData: ITodo = req.body

    const updatedTodo: ITodo | null = await Todos.findByIdAndUpdate(
      todoId,
      updatedTodoData,
      { new: true } 
    )

    if (!updatedTodo) {
      res.status(404).json({ error: 'Todo not found' })
    } else {
      res.status(200).json(updatedTodo)
    }
  } catch (err) {
    res.status(500).json({ error: err })
  }
}

const deleteTodo = async (req: Request, res: Response) => {
  const todoId = req.params.id

  try {
    await Todos.findByIdAndDelete(todoId)
    res.status(200).json({ message: 'Todo deleted successfully.' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'An error occurred.' })
  }
}

export { getTodos, getTodo, createTodo, updateTodo, deleteTodo }