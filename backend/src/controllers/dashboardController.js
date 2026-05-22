import { fetchDashboardSummary, fetchRecentReports, fetchSystemStats } from '../services/dashboardService.js'

export const getSummary = async (req, res, next) => {
  try {
    const summary = await fetchDashboardSummary()
    res.json({ status: 'success', data: summary })
  } catch (error) {
    next(error)
  }
}

export const getRecentReports = async (req, res, next) => {
  try {
    const reports = await fetchRecentReports()
    res.json({ status: 'success', data: reports })
  } catch (error) {
    next(error)
  }
}

export const getSystemStats = async (req, res, next) => {
  try {
    const stats = await fetchSystemStats()
    res.json({ status: 'success', data: stats })
  } catch (error) {
    next(error)
  }
}
