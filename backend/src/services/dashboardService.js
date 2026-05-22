import { getSummaryMetrics, getRecentReports, getSystemStats } from '../models/dashboardModel.js'

export const fetchDashboardSummary = async () => {
  return getSummaryMetrics()
}

export const fetchRecentReports = async () => {
  return getRecentReports()
}

export const fetchSystemStats = async () => {
  return getSystemStats()
}
