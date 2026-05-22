import { useEffect, useMemo, useState } from 'react'
import * as XLSX from 'xlsx'
import api from '../../api/axiosConfig'
import TitleHeader from '../../components/title'

const roleOptions = [
  { label: 'Todos', value: 'Todos' },
  { label: 'Desarrollador Frontend', value: 'Desarrollador Frontend' },
  { label: 'Desarrollador Backend', value: 'Desarrollador Backend' },
  { label: 'Ingeniero DevOps', value: 'Ingeniero DevOps' },
  { label: 'Arquitecto de Software', value: 'Arquitecto de Software' },
  { label: 'Analista QA', value: 'Analista QA' },
  { label: 'Líder de Tecnología', value: 'Líder de Tecnología' }
]

const DownloadsPage = () => {
  const [users, setUsers] = useState<any[]>([])
  const [selectedRole, setSelectedRole] = useState('Todos')
  const [message, setMessage] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true)
        const response = await api.get('/users')
        setUsers(response.data)
      } catch (err: any) {
        setError('No se pudieron cargar los usuarios para descarga.')
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  const filteredUsers = useMemo(() => {
    if (selectedRole === 'Todos') return users
    return users.filter((user: any) => user.Cargo === selectedRole)
  }, [users, selectedRole])

  const downloadExcel = (role: string) => {
    const exportUsers = role === 'Todos' ? users : users.filter((user: any) => user.Cargo === role)

    if (exportUsers.length === 0) {
      setMessage(`No hay usuarios para el cargo "${role}".`)
      return
    }

    const worksheetData = exportUsers.map((user: any) => ({
      Nombre: user.NombreCompleto,
      Cédula: user.Cedula,
      Teléfono: user.Telefono,
      Cargo: user.Cargo,
      'Área de desempeño': user.AreadeDesempeño
    }))

    const workbook = XLSX.utils.book_new()
    const worksheet = XLSX.utils.json_to_sheet(worksheetData)
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Usuarios')

    const fileName = `usuarios-${role.toLowerCase().replace(/\s+/g, '-')}.xlsx`
    XLSX.writeFile(workbook, fileName)
    setMessage(`Descargando archivo Excel para ${role}.`)
  }

  return (
    <div className="space-y-6">
      <div className="rounded-[32px] border border-slate-200 bg-white/95 p-8 shadow-xl shadow-slate-200/40">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <TitleHeader />
            <p className="mt-2 text-slate-500">Descarga listas de usuarios en Excel según el cargo de tecnología seleccionado.</p>
            <p className="mt-1 text-sm text-slate-400">Los archivos incluyen nombre, cédula, teléfono, cargo y área de desempeño.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Total usuarios</p>
              <p className="mt-2 text-3xl font-semibold text-slate-900">{users.length}</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Usuarios filtrados</p>
              <p className="mt-2 text-3xl font-semibold text-slate-900">{filteredUsers.length}</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Cargo seleccionado</p>
              <p className="mt-2 text-3xl font-semibold text-slate-900">{selectedRole}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.5fr_0.9fr]">
        <section className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/40">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">Opciones de descarga</h2>
              <p className="mt-2 text-slate-500">Selecciona el cargo para descargar un archivo Excel con los usuarios correspondientes.</p>
            </div>
            <div>
              <button
                type="button"
                onClick={() => downloadExcel(selectedRole)}
                className="inline-flex items-center justify-center rounded-3xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Descargar {selectedRole === 'Todos' ? 'todos los usuarios' : selectedRole}
              </button>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {roleOptions.map((role) => {
              const count = role.value === 'Todos' ? users.length : users.filter((user: any) => user.Cargo === role.value).length
              return (
                <button
                  key={role.value}
                  type="button"
                  onClick={() => setSelectedRole(role.value)}
                  className={`rounded-3xl border px-5 py-6 text-left transition ${selectedRole === role.value ? 'border-sky-500 bg-sky-50' : 'border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-slate-100'}`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{role.label}</p>
                      <p className="mt-2 text-sm text-slate-500">{count} usuario{count === 1 ? '' : 's'}</p>
                    </div>
                    <div className="rounded-full bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm">
                      Seleccionar
                    </div>
                  </div>
                </button>
              )
            })}
          </div>

          {message && (
            <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
              {message}
            </div>
          )}
          {error && (
            <div className="mt-6 rounded-3xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
              {error}
            </div>
          )}
        </section>

        <aside className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/40">
          <div className="space-y-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Resumen rápido</p>
              <h3 className="mt-3 text-2xl font-semibold text-slate-900">Descargas por categoría</h3>
            </div>
            <div className="grid gap-3">
              {roleOptions.map((role) => {
                const count = role.value === 'Todos' ? users.length : users.filter((user: any) => user.Cargo === role.value).length
                return (
                  <div key={role.value} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-sm text-slate-500">{role.label}</p>
                    <p className="mt-2 text-2xl font-semibold text-slate-900">{count}</p>
                  </div>
                )
              })}
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
              <p className="font-semibold text-slate-900">¿Cómo funciona?</p>
              <p className="mt-2 text-slate-500">Selecciona una categoría, luego presiona descargar para generar un archivo Excel con los usuarios de ese cargo.</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
export default DownloadsPage