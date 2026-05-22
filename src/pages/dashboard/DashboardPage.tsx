import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
import { Line } from 'react-chartjs-2'
import DashboardLayout from '../../components/layout/DashboardLayout'
import StatCard from '../../components/ui/StatCard'
import ChartCard from '../../components/ui/ChartCard'
import DataTable from '../../components/ui/DataTable'
import WidgetPanel from '../../components/ui/WidgetPanel'
import LoadingSpinner from '../../components/ui/LoadingSpinner'
import { useDashboardData } from '../../hooks/useDashboardData'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const metrics = {
  labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Nóminas procesadas',
      data: [78, 102, 95, 125, 115, 130],
      borderColor: '#2563eb',
      backgroundColor: 'rgba(37, 99, 235, 0.16)',
      tension: 0.35,
      fill: true
    }
  ]
}

const DashboardPage = () => {
  const { summary, reports, stats, loading, error } = useDashboardData()

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <section className="grid gap-5 xl:grid-cols-4 lg:grid-cols-2">
          <StatCard title="Total empleados" value={summary?.totalEmployees ?? '-'} subtitle="Personal activo en el sistema" icon="👥" />
          <StatCard title="Nóminas procesadas" value={summary?.payrollProcessed ?? '-'} subtitle="Documentos liquidados" icon="💼" />
          <StatCard title="Deducciones" value={`$${summary?.totalDeductions ?? 0}`} subtitle="Total en deducciones" icon="📉" />
          <StatCard title="Prestaciones sociales" value={`$${summary?.totalBenefits ?? 0}`} subtitle="Costos de prestaciones" icon="💰" />
        </section>

        <section className="grid gap-5 lg:grid-cols-3">
          <ChartCard title="Tendencia de nóminas">
            <Line data={metrics} options={{ responsive: true, plugins: { legend: { position: 'bottom' } } }} />
          </ChartCard>

          <WidgetPanel title="Estadísticas generales">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-slate-50 p-4">
                <h4 className="text-sm text-slate-500">Asistencia</h4>
                <p className="mt-2 text-2xl font-semibold text-slate-900">{summary?.attendanceRate?.toFixed(1)}%</p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-4">
                <h4 className="text-sm text-slate-500">Usuarios activos</h4>
                <p className="mt-2 text-2xl font-semibold text-slate-900">{summary?.activeUsers ?? '-'}</p>
              </div>
            </div>
          </WidgetPanel>

          <WidgetPanel title="Acceso rápido">
            <div className="space-y-3">
              <button className="w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800">Ver nóminas</button>
              <button className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50">Administrar empleados</button>
            </div>
          </WidgetPanel>
        </section>

        <section className="grid gap-5 xl:grid-cols-2">
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

          <DataTable
            title="Estado del sistema"
            columns={[
              { header: 'Módulo', accessor: 'module' },
              { header: 'Estado', accessor: 'status' },
              { header: 'Última sincronización', accessor: 'lastSynced' }
            ]}
            rows={stats}
          />
        </section>

        {error && (
          <div className="rounded-3xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            Ocurrió un error al cargar los datos del dashboard. Intenta recargar la página.
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

export default DashboardPage
