import api from './axiosConfig'

export const getDashboardSummary = async () => {
  const response = await api.get('/dashboard/summary')
  return response.data.data
}

export const getRecentReports = async () => {
  const response = await api.get('/dashboard/reports')
  return response.data.data
}

export const getSystemStats = async () => {
  const response = await api.get('/dashboard/system-stats')
  return response.data.data
}

export const getPayrollTrend = async () => {
  const response = await api.get('/dashboard/payroll-trend')
  return response.data.data
}
