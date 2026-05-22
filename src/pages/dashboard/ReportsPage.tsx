import { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import DataTable from '../../components/ui/DataTable'
import LoadingSpinner from '../../components/ui/LoadingSpinner'
import { getRecentReports } from '../../api/dashboardApi'

const ReportsPage = () => {
  const [reports, setReports] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let mounted = true
    const load = async () => {
      try {
        const data = await getRecentReports()
        if (mounted) setReports(data)
      } catch (err: any) {
        setError(err.message || 'Error al cargar reportes')
      } finally {
        if (mounted) setLoading(false)
      }
    }

    load()
    return () => {
      mounted = false
    }
  }, [])

  if (loading) return <LoadingSpinner />

  return (
    <DashboardLayout>
      <div className="p-6">
        <DataTable
          title="Reportes recientes"
          columns={[
            { header: 'Reporte', accessor: 'title' },
            { header: 'Módulo', accessor: 'category' },
            { header: 'Estado', accessor: 'status' },
            { header: 'Fecha', accessor: 'createdAt' }
          ]}
          rows={reports}
        />

        {error && (
          <div className="mt-4 rounded-3xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

export default ReportsPage
