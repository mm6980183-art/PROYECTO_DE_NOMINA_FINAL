import { getSummaryMetrics, getRecentReports, getSystemStats, getPayrollTrend } from '../models/dashboardModel.js'

export const fetchDashboardSummary = async () => {
  return getSummaryMetrics()
}

export const fetchRecentReports = async () => {
  return getRecentReports()
}

export const fetchSystemStats = async () => {
  return getSystemStats()
}

export const fetchPayrollTrend = async () => {
  return getPayrollTrend()
}
