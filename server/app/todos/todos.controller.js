import asyncHandler from 'express-async-handler'

import { prisma } from '../prisma.js'

/*
	@desc 		create Todo
	@route 		POST /api/todos
	@access 	public
*/
export const createTodo = asyncHandler(async (req, res) => {
	const { name, email, text } = req.body

	const todo = await prisma.todo.create({
		data: {
			name,
			email,
			text
		}
	})

	res.json({
		todo
	})
})

/*
	@desc 		Update Todo by id
	@route 		POST /api/todos/:id
	@access 	private | root
*/
export const updateTodo = asyncHandler(async (req, res) => {
	const { name, email, text } = req.body

	try {
		const todo = await prisma.todo.update({
			where: {
				id: +req.params.id
			},
			data: {
				name,
				email,
				text
			}
		})

		res.json({ todo })
	} catch (e) {
		res.status('404')
		res.json({
			message: 'Todo not found'
		})
	}
})

/*
	@desc 		Get Todos
	@route 		GET /api/todos
	@access 	public
*/
export const getTodos = asyncHandler(async (req, res) => {
	const paginationCount = 3
	const { page, orderBy } = req.body

	const todosCount = await prisma.todo.count()
	const pagesCount = Math.ceil(todosCount / paginationCount) || 1
	const currentPage = pagesCount > page ? page : pagesCount
	const skip = (currentPage - 1) * paginationCount

	const todos = await prisma.todo.findMany({
		orderBy,
		skip,
		take: paginationCount
	})

	res.json({
		todos,
		currentPage,
		pagesCount
	})
})
