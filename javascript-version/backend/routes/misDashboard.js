import express from 'express'
import { getYearlyComp } from '../services/misDashboard.service.js'

const router = express.Router()
router.get('/yearlyComp', getYearlyComp)

export default router
