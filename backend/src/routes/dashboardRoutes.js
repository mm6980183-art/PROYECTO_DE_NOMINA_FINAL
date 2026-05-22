import { Router } from 'express'
import { authenticate } from '../middlewares/authMiddleware.js'
import { getSummary, getRecentReports, getSystemStats } from '../controllers/dashboardController.js'

const router = Router()

router.use(authenticate)
router.get('/summary', getSummary)
router.get('/reports', getRecentReports)
router.get('/system-stats', getSystemStats)

export default router
