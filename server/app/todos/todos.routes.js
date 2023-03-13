import express from 'express'

import { protectAuthRoot } from '../middleware/auth.middleware.js'

import { createTodo, getTodos, updateTodo } from './todos.controller.js'

const router = express.Router()

router.route('/').get(getTodos)
router.route('/').post(createTodo)
router.route('/:id').patch(protectAuthRoot, updateTodo)

export default router
