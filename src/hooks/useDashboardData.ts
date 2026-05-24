import { useEffect, useState } from 'react'
import { getDashboardSummary, getRecentReports, getSystemStats, getPayrollTrend } from '../api/dashboardApi'

export const useDashboardData = () => {
  const [summary, setSummary] = useState(null)
  const [reports, setReports] = useState([])
  const [stats, setStats] = useState([])
  const [payrollTrend, setPayrollTrend] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const [summaryData, reportData, statsData, trendData] = await Promise.all([
          getDashboardSummary(),
          getRecentReports(),
          getSystemStats(),
          getPayrollTrend()
        ])
        setSummary(summaryData)
        setReports(reportData)
        setStats(statsData)
        setPayrollTrend(trendData)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  return { summary, reports, stats, payrollTrend, loading, error }
}
