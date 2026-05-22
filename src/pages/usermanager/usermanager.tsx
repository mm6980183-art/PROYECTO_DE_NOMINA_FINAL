import React, { useState } from 'react'
import api from '../../api/axiosConfig'
import './usermanager.css'
import { Link, useNavigate } from 'react-router-dom'
import TitleHeader from '../../components/title'

const UserNamerPage = () => {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const navigate = useNavigate()

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setMessage(null)
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)

    const data = {
      NombreCompleto: formData.get('nombre'),
      Cedula: formData.get('cedula'),
      Telefono: formData.get('telefono'),
      AreadeDesempeño: formData.get('area'),
      Cargo: formData.get('cargo'),
    }

    try {
      setLoading(true)
      await api.post('/users', data)
      setMessage({ type: 'success', text: 'Usuario creado correctamente.' })
      form.reset()
      setTimeout(() => setMessage(null), 4000)
    } catch (err: any) {
      console.error(err)
      const text = err?.response?.data?.message || 'Error al crear usuario.'
      setMessage({ type: 'error', text })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-full mx-auto rounded-[32px] border border-slate-200 bg-white/95 p-6 sm:p-8 shadow-xl shadow-slate-200/40">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-8">
        <div>
          <TitleHeader />
          <p className="mt-2 text-slate-500">Gestiona de forma segura y eficiente los usuarios del sistema.</p>
          <p className="text-slate-500">Crea, edita y administra los usuarios de tú plataforma de nómina.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link to="/list-users" className="inline-flex items-center rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-200">
            Ver usuarios
          </Link>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="inline-flex items-center rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
          >
            Volver al Dashboard
          </button>
        </div>
      </div>

      {message && (
        <div className={`mb-6 rounded-3xl border px-4 py-4 text-sm ${message.type === 'success' ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-rose-200 bg-rose-50 text-rose-700'}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block text-sm text-slate-700">
            Nombre Completo
            <input
              type="text"
              id="nombre"
              name="nombre"
              className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
              placeholder="Ingresa tu nombre"
            />
          </label>
          <label className="block text-sm text-slate-700">
            Cédula
            <input
              type="text"
              id="cedula"
              name="cedula"
              className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
              placeholder="Ingresa tu cédula completo"
            />
          </label>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block text-sm text-slate-700">
            Teléfono
            <input
              type="text"
              id="telefono"
              name="telefono"
              className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
              placeholder="Ingresa tu número de teléfono"
            />
          </label>
          <label className="block text-sm text-slate-700">
            Área de desempeño
            <input
              type="text"
              id="area"
              name="area"
              className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
              placeholder="Área de desempeño"
            />
          </label>
        </div>

        <label className="block text-sm text-slate-700">
          Cargo
          <input
            type="text"
            id="cargo"
            name="cargo"
            className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
            placeholder="Cargo"
          />
        </label>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            className="inline-flex items-center justify-center rounded-3xl bg-sky-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-70"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Creando...' : 'Crear usuario'}
          </button>
          <p className="text-sm text-slate-500">Usa el menú lateral para navegar rápido entre módulos.</p>
        </div>
      </form>
    </div>
  )
}

export default UserNamerPage
