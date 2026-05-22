import api from '../../api/axiosConfig';
import TitleHeader from '../../components/title'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

const ListClientsPage = () => {
    const [users, setUsers] = useState([])
    const [userFilter, setUserFilter] = useState<any>(null)
    const [message, setMessage] = useState<{ type: 'success'|'error'; text: string } | null>(null)
    const navigate = useNavigate()

    const getUsersList = () => {
        setUserFilter(null);
        api.get('/users')
            .then(response => {
                setUsers(response.data)
                setMessage({ type: 'success', text: 'Usuarios cargados correctamente.' })
                setTimeout(() => setMessage(null), 3000)
            })
            .catch(error => {
                console.log(error)
                setMessage({ type: 'error', text: 'Error cargando usuarios.' })
                setTimeout(() => setMessage(null), 3000)
            })
    }

    const getUserById = (idColaboradores: number | string) => {
        console.log("ID seleccionado: ", idColaboradores);
        if (idColaboradores === '') {
            getUsersList();
            return
        }

        const maybeId = Number(idColaboradores);
        if (Number.isNaN(maybeId)) {
            if (users && users.length > 0) {
                const filtered = users.filter((u: any) => {
                    return u.NombreCompleto && u.NombreCompleto.toLowerCase().includes(String(idColaboradores).toLowerCase())
                })
                if (filtered.length === 1) {
                    setUserFilter(filtered[0])
                } else {
                    setUserFilter(null)
                    setUsers(filtered)
                }
                return
            }

            api.get('/users')
                .then(response => {
                    const filtered = response.data.filter((u: any) => u.NombreCompleto && u.NombreCompleto.toLowerCase().includes(String(idColaboradores).toLowerCase()))
                    if (filtered.length === 1) {
                        setUserFilter(filtered[0])
                    } else {
                        setUserFilter(null)
                        setUsers(filtered)
                    }
                })
                .catch(error => {
                    console.log(error)
                })

            return
        }

        api.get(`/users/${maybeId}`)
            .then(response => {
                setUserFilter(response.data)
                console.log(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const deleteUserById = (idColaboradores: number | string) => {
        api.delete(`/users/${idColaboradores}`)
            .then(response => {
                setMessage({ type: 'success', text: 'Usuario eliminado.' })
                getUsersList();
                setTimeout(() => setMessage(null), 3000)
            })
            .catch(error => {
                console.log(error)
                setMessage({ type: 'error', text: 'Error al eliminar usuario.' })
                setTimeout(() => setMessage(null), 3000)
            })
    }

    return (
        <div className="max-w-6xl mx-auto space-y-6">
            <div className="rounded-[32px] border border-slate-200 bg-white/95 p-8 shadow-xl shadow-slate-200/40">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-6">
                    <div>
                        <TitleHeader />
                        <p className="mt-2 text-slate-500">Explora y administra usuarios con el mismo diseño limpio del dashboard.</p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <button className="inline-flex items-center rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800" onClick={getUsersList}>
                            Cargar usuarios
                        </button>
                        <button className="inline-flex items-center rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50" onClick={() => navigate('/dashboard')}>Volver al Dashboard</button>
                    </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-[1fr_auto] items-center">
                    <input
                        type="text"
                        id="buscar"
                        onChange={(text) => { getUserById(text.target.value) }}
                        className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                        placeholder="Buscar por nombre o cédula"
                    />
                </div>

                {message && (
                    <div className={`mt-6 rounded-3xl border px-4 py-4 text-sm ${message.type === 'success' ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-rose-200 bg-rose-50 text-rose-700'}`}>
                        {message.text}
                    </div>
                )}
            </div>

            <div className="space-y-4">
                {
                    (!userFilter ? users : [userFilter]).map((valores: any) => {
                        return (
                            <div key={valores.Cedula} onClick={() => { getUserById(valores.idColaboradores) }} className="group relative cursor-pointer rounded-[28px] border border-slate-200 bg-slate-50 p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                                <div className="absolute right-4 top-4">
                                    <button className='inline-flex items-center rounded-2xl bg-rose-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-600' onClick={(e) => { e.stopPropagation(); deleteUserById(valores.idColaboradores) }}>Eliminar</button>
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-lg font-semibold text-slate-900">{valores.NombreCompleto}</h3>
                                    <p className="text-sm text-slate-500">Cédula: {valores.Cedula}</p>
                                    <p className="text-sm text-slate-500">Cargo: {valores.Cargo}</p>
                                    <p className="text-sm text-slate-500">Teléfono: {valores.Telefono}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
export default ListClientsPage
