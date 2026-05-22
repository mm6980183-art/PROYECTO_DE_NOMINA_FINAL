import { Router } from 'express'
import authRoutes from './authRoutes.js'
import dashboardRoutes from './dashboardRoutes.js'
import usersRoutes from './usersRoutes.js'

const router = Router()

router.use('/auth', authRoutes)
router.use('/dashboard', dashboardRoutes)
router.use('/users', usersRoutes)

router.get('/', (req, res) => {
  res.json({ status: 'success', message: 'PayTrack API está viva', version: '1.0.0' })
})

export default router
