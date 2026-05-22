import { Router } from 'express'
import { login, resetPassword } from '../controllers/authController.js'

const router = Router()

router.post('/login', login)
router.post('/reset-password', resetPassword)

export default router
