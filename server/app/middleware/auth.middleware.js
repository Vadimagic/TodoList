import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'

import { prisma } from '../prisma.js'
import { UserFields } from '../utils/users.utils.js'

const protect = async (req, res, next, callback) => {
	let token

	if (req.headers.authorization?.startsWith('Bearer')) {
		token = req.headers.authorization.split(' ')[1]

		const decoded = jwt.verify(token, process.env.JWT_SECRET)

		const userFound = await prisma.user.findUnique({
			where: {
				id: decoded.userId
			},
			select: UserFields
		})

		if (userFound) {
			req.user = userFound
			if (callback) {
				callback(userFound)
			} else {
				next()
			}
		} else {
			res.status(401)
			throw new Error('Not authorized, token failed')
		}
	}

	if (!token) {
		res.status(401)
		throw new Error('Not authorized, I do not have a token')
	}
}

export const protectAuth = asyncHandler(async (req, res, next) =>
	protect(req, res, next)
)

export const protectAuthRoot = asyncHandler(async (req, res, next) =>
	protect(req, res, next, user => {
		if (user.role === 'admin') {
			next()
		} else {
			res.status(403)
			throw new Error('Not admin')
		}
	})
)
