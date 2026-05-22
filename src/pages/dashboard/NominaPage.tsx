import { useEffect, useMemo, useState } from 'react'
import * as XLSX from 'xlsx'
import DataTable from '../../components/ui/DataTable'
import LoadingSpinner from '../../components/ui/LoadingSpinner'
import StatCard from '../../components/ui/StatCard'
import api from '../../api/axiosConfig'

const defaultSalaryByRole: Record<string, number> = {
    'Desarrollador Frontend': 3600000,
    'Desarrollador Backend': 4200000,
    'Ingeniero DevOps': 4500000,
    'Arquitecto de Software': 5200000,
    'Analista QA': 3200000,
    'Líder de Tecnología': 6200000,
    'Administrador': 7000000
}

const roleOptions = [
    'Todos',
    'Desarrollador Frontend',
    'Desarrollador Backend',
    'Ingeniero DevOps',
    'Arquitecto de Software',
    'Analista QA',
    'Líder de Tecnología'
]

const formatCurrency = (value: number) =>
    new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(value)

const NominaPage = () => {
    const [users, setUsers] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [selectedRole, setSelectedRole] = useState('Todos')
    const [salaryMap, setSalaryMap] = useState<Record<number, number>>({})
    const [deductions, setDeductions] = useState({ salud: 4, pension: 4, fondoSolidaridad: 1, reteFuente: 1.5 })
    const [message, setMessage] = useState('')

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true)
                const response = await api.get('/users')
                setUsers(response.data)
            } catch (err: any) {
                setError('No se pudieron cargar los usuarios para nómina.')
            } finally {
                setLoading(false)
            }
        }

        fetchUsers()
    }, [])

    useEffect(() => {
        if (!users.length) return
        setSalaryMap((current) => {
            const next = { ...current }
            users.forEach((user) => {
                if (!next[user.idColaboradores]) {
                    next[user.idColaboradores] = defaultSalaryByRole[user.Cargo] ?? 3000000
                }
            })
            return next
        })
    }, [users])

    const filteredUsers = useMemo(() => {
        if (selectedRole === 'Todos') return users
        return users.filter((user) => user.Cargo === selectedRole)
    }, [users, selectedRole])

    const payrollRows = useMemo(() => {
        const totalRate = (deductions.salud + deductions.pension + deductions.fondoSolidaridad + deductions.reteFuente) / 100

        return filteredUsers.map((user) => {
            const salary = salaryMap[user.idColaboradores] ?? defaultSalaryByRole[user.Cargo] ?? 3000000
            const deducciones = salary * totalRate
            const salud = salary * (deductions.salud / 100)
            const pension = salary * (deductions.pension / 100)
            const fondoSolidaridad = salary * (deductions.fondoSolidaridad / 100)
            const reteFuente = salary * (deductions.reteFuente / 100)
            const neto = salary - deducciones

            return {
                ...user,
                salary,
                deducciones,
                salud,
                pension,
                fondoSolidaridad,
                reteFuente,
                neto
            }
        })
    }, [filteredUsers, salaryMap, deductions])

    const totals = useMemo(() => {
        return payrollRows.reduce(
            (
                acc,
                row
            ) => ({
                gross: acc.gross + row.salary,
                deduction: acc.deduction + row.deducciones,
                net: acc.net + row.neto
            }),
            { gross: 0, deduction: 0, net: 0 }
        )
    }, [payrollRows])

    const handleSalaryChange = (id: number, value: number) => {
        setSalaryMap((current) => ({ ...current, [id]: Math.max(0, value) }))
    }

    const handleDeductionChange = (field: keyof typeof deductions, value: number) => {
        setDeductions((current) => ({ ...current, [field]: Math.max(0, value) }))
    }

    const applyRoleDefaults = () => {
        const next: Record<number, number> = {}
        users.forEach((user) => {
            next[user.idColaboradores] = defaultSalaryByRole[user.Cargo] ?? 3000000
        })
        setSalaryMap(next)
        setMessage('Salarios aplicados por cargo.')
        setTimeout(() => setMessage(''), 3000)
    }

    const exportPayroll = () => {
        if (!payrollRows.length) {
            setMessage('No hay registros para exportar.')
            return
        }

        const worksheetData = payrollRows.map((row) => ({
            Nombre: row.NombreCompleto,
            Cédula: row.Cedula,
            Cargo: row.Cargo,
            Salario: row.salary,
            Salud: row.salud,
            Pensión: row.pension,
            FondoSolidaridad: row.fondoSolidaridad,
            Retención: row.reteFuente,
            Neto: row.neto
        }))

        const workbook = XLSX.utils.book_new()
        const worksheet = XLSX.utils.json_to_sheet(worksheetData)
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Nomina')
        XLSX.writeFile(workbook, `nomina-${selectedRole.toLowerCase().replace(/\s+/g, '-')}.xlsx`)
        setMessage('Exportando nómina a Excel...')
        setTimeout(() => setMessage(''), 3000)
    }

    if (loading) {
        return <LoadingSpinner />
    }

    return (
        <div className="space-y-6">
            <div className="rounded-[32px] border border-slate-200 bg-white/95 p-8 shadow-xl shadow-slate-200/40">
                <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
                    <div>
                        <h2 className="text-3xl font-semibold text-slate-900 mb-0">Gestión de </h2>
                           <h2 className="text-3xl font-semibold text-slate-900">nómina</h2>
                    </div>
                    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
                        <StatCard title="Salario bruto" value={formatCurrency(totals.gross)} subtitle="Total de salarios" icon="💼" />
                        <StatCard title="Deducciones" value={formatCurrency(totals.deduction)} subtitle="Total de descuentos" icon="📉" />
                        <StatCard title="Pago neto" value={formatCurrency(totals.net)} subtitle="Total a pagar" icon="✅" />
                    </div>
                </div>
            </div>

            <div className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
                <section className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/40">
                    <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Configuración</p>
                            <h3 className="mt-2 text-2xl font-semibold text-slate-900">Ajusta salarios y deducciones legales</h3>
                        </div>
                        <div className="flex flex-col gap-3 sm:flex-row">
                            <button
                                type="button"
                                onClick={applyRoleDefaults}
                                className="rounded-3xl border border-slate-200 bg-slate-50 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
                            >
                                Aplicar salarios por cargo
                            </button>
                            <button
                                type="button"
                                onClick={exportPayroll}
                                className="rounded-3xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                            >
                                Exportar nómina Excel
                            </button>
                        </div>
                    </div>

                    <div className="grid gap-4 lg:grid-cols-2">
                        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                            <p className="text-sm font-semibold text-slate-700">Cargo</p>
                            <select
                                value={selectedRole}
                                onChange={(event) => setSelectedRole(event.target.value)}
                                className="mt-3 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                            >
                                {roleOptions.map((role) => (
                                    <option key={role} value={role}>
                                        {role}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                            <p className="text-sm font-semibold text-slate-700">Deducciones legales (%)</p>
                            <div className="mt-4 space-y-4">
                                {(
                                    [
                                        { label: 'Salud', field: 'salud' as const },
                                        { label: 'Pensión', field: 'pension' as const },
                                        { label: 'Fondo de solidaridad', field: 'fondoSolidaridad' as const },
                                        { label: 'Retención en la fuente', field: 'reteFuente' as const }
                                    ] as const
                                ).map((item) => (
                                    <label key={item.field} className="block text-sm text-slate-700">
                                        {item.label}
                                        <input
                                            type="number"
                                            value={deductions[item.field]}
                                            onChange={(event) => handleDeductionChange(item.field, Number(event.target.value))}
                                            className="mt-2 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                                        />
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    {message && (
                        <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                            {message}
                        </div>
                    )}
                </section>

                <aside className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/40">
                    <div className="space-y-4">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Resumen de nómina</p>
                            <h3 className="mt-3 text-2xl font-semibold text-slate-900">Resultados clave</h3>
                        </div>
                        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                            <p className="text-sm text-slate-500">Usuarios en nómina</p>
                            <p className="mt-2 text-3xl font-semibold text-slate-900">{filteredUsers.length}</p>
                        </div>
                        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                            <p className="text-sm text-slate-500">Deducciones totales</p>
                            <p className="mt-2 text-3xl font-semibold text-slate-900">{formatCurrency(totals.deduction)}</p>
                        </div>
                        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                            <p className="text-sm text-slate-500">Pago neto estimado</p>
                            <p className="mt-2 text-3xl font-semibold text-slate-900">{formatCurrency(totals.net)}</p>
                        </div>
                    </div>
                </aside>
            </div>

            <section className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/40">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h3 className="text-2xl font-semibold text-slate-900">Detalle de nómina</h3>
                        <p className="mt-2 text-slate-500">Ajusta el salario de cada usuario directamente y revisa el impacto en las deducciones.</p>
                    </div>
                    <div className="rounded-3xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
                        Salario base por cargo aplicado como valor predeterminado.
                    </div>
                </div>

                <div className="mt-6 overflow-x-auto">
                    <DataTable
                        title="Usuarios de nómina"
                        columns={[
                            { header: 'Empleado', accessor: 'NombreCompleto' },
                            { header: 'Cargo', accessor: 'Cargo' },
                            {
                                header: 'Salario',
                                accessor: 'salary',
                                render: (row: any) => (
                                    <input
                                        type='number'
                                        value={row.salary}
                                        onChange={(event) => handleSalaryChange(row.idColaboradores, Number(event.target.value))}
                                        className='w-full rounded-3xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100'
                                    />
                                )
                            },
                            { header: 'Salud', accessor: 'salud', render: (row: any) => formatCurrency(row.salud) },
                            { header: 'Pensión', accessor: 'pension', render: (row: any) => formatCurrency(row.pension) },
                            { header: 'Fondo solidaridad', accessor: 'fondoSolidaridad', render: (row: any) => formatCurrency(row.fondoSolidaridad) },
                            { header: 'Retención', accessor: 'reteFuente', render: (row: any) => formatCurrency(row.reteFuente) },
                            { header: 'Neto', accessor: 'neto', render: (row: any) => formatCurrency(row.neto) }
                        ]}
                        rows={payrollRows}
                    />
                </div>
            </section>
        </div>
    )
}

export default NominaPage
