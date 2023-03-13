import { hash, verify } from 'argon2'
import asyncHandler from 'express-async-handler'

import { prisma } from '../prisma.js'
import { UserFields } from '../utils/users.utils.js'

import { generateToken } from './generate-token.js'

/*
	@desc 		Auth user
	@route 		POST /api/auth/login
	@access 	public
*/
export const authUser = asyncHandler(async (req, res) => {
	const { name, password } = req.body
	const user = await prisma.user.findUnique({
		where: { name }
	})

	if (!user) {
		res.status(404)
		throw new Error('User not found')
	}

	const isValidPassword = await verify(user.password, password)

	if (user && isValidPassword) {
		const token = generateToken(user.id)
		res.json({ token })
	} else {
		res.status(400)
		throw new Error('Email or password are not correct')
	}
})

/*
	@desc 		Register user
	@route 		POST /api/auth/register
	@access 	private | root
*/
export const registerUser = asyncHandler(async (req, res) => {
	const { name, password, role } = req.body

	const isHaveUser = await prisma.user.findUnique({
		where: { name }
	})

	if (isHaveUser) {
		res.status(400)
		throw new Error('User already exists')
	}

	const user = await prisma.user.create({
		data: {
			name,
			password: await hash(password),
			role
		},
		select: UserFields
	})

	const token = generateToken(user.id)

	res.json({ user, token })
})
