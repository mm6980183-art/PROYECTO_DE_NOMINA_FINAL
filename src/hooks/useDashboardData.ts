import { useEffect, useState } from 'react'
import { getDashboardSummary, getRecentReports, getSystemStats } from '../api/dashboardApi'

export const useDashboardData = () => {
  const [summary, setSummary] = useState(null)
  const [reports, setReports] = useState([])
  const [stats, setStats] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const [summaryData, reportData, statsData] = await Promise.all([
          getDashboardSummary(),
          getRecentReports(),
          getSystemStats()
        ])
        setSummary(summaryData)
        setReports(reportData)
        setStats(statsData)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  return { summary, reports, stats, loading, error }
}
