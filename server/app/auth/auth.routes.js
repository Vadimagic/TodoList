import express from 'express'

import { protectAuthRoot } from '../middleware/auth.middleware.js'

import { authUser, registerUser } from './auth.controller.js'

const router = express.Router()

router.route('/login').post(authUser)
router.route('/register').post(protectAuthRoot, registerUser)

export default router
