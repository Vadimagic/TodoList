import express from 'express'
import { body } from 'express-validator'

import userController from '../controllers/user.controller.js'

const router = express.Router()

router
	.route('/register')
	.post(body('password').isLength({ min: 5, max: 32 }), userController.register)
router.route('/login').post(userController.login)
router.route('/logout').get(userController.logout)
router.route('/refresh').get(userController.refresh)

export default router
