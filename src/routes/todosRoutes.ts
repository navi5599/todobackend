import express, { Router } from 'express'
import { ITodo } from '../models'
import { validateBody, validateTodoId } from '../middleware/middleware'

const Models = require('../models.ts')
const Todos = Models.Todos

const router = Router()

// GET TODOS
router.get('/', async (req, res) => {
 try {
  const todos: ITodo[] = await Todos.find()
  res.status(200).json(todos)
 } catch(err) {
  res.status(500).json({ error: err })
 }
})

// GET SINGLE TODO
router.get('/:id', validateTodoId, async (req, res) => {
  try {
    const todo: ITodo | undefined = req.todo;
    res.status(200).json(todo)
  } catch (err) {
    res.status(500).json({ error: err })
  }
})

// CREATE TODO
router.post('/', validateBody, async (req, res) => {
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
})

// UPDATE TODO
router.patch('/:id', validateTodoId, async (req, res) => {
  try {
    const todoId = req.params.id;
    const updatedTodoData: ITodo = req.body;

    const updatedTodo: ITodo | null = await Todos.findByIdAndUpdate(
      todoId,
      updatedTodoData,
      { new: true } 
    );

    if (!updatedTodo) {
      res.status(404).json({ error: 'Todo not found' });
    } else {
      res.status(200).json(updatedTodo);
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// DELETE TODO
router.delete('/:id', validateTodoId, async (req, res) => {
  try {
    const todo: ITodo | undefined = req.todo
    const deletedTodo: ITodo | null = await Todos.delete(todo)
    if (deletedTodo) {
      res.status(200).json({ message: 'Todo deleted successfully' })
    }
  } catch (err) {
    res.status(500).json({ error: err })
  }
})

export default router