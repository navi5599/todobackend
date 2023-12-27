import express, { Router } from 'express'
import { validateBody, validateTodoId } from '../middleware/todoMiddleware'
import { createTodo, deleteTodo, getTodo, getTodos, updateTodo } from '../controllers/todoController'

const router = Router()

// GET TODOS
router.get('/', getTodos)

// GET SINGLE TODO
router.get('/:id', validateTodoId, getTodo)

// CREATE TODO
router.post('/', validateBody, createTodo)

// UPDATE TODO
router.patch('/:id', validateTodoId, updateTodo)

// DELETE TODO
router.delete('/:id', validateTodoId, deleteTodo)

export default router