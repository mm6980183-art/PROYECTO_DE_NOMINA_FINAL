import { useAuth } from '../../context/AuthContext'
import { useLocation } from 'react-router-dom'

const Navbar = () => {
  const { user, logout } = useAuth()
  const location = useLocation()

  const routeTitles: Record<string, string> = {
    '/dashboard': 'Dashboard de nómina',
    '/usermanager': 'Gestión de usuarios',
    '/list-users': 'Listado de usuarios',
    '/downloads': 'Descargas'
  }

  const title = routeTitles[location.pathname] || 'Dashboard de nómina'

  return (
    <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between bg-white/80 backdrop-blur border border-slate-200 px-6 py-4 shadow-sm rounded-[28px] sticky top-0 z-20">
      <div>
        <h1 className="text-xl font-semibold text-slate-900">{title}</h1>
        <p className="text-sm text-slate-500">Bienvenido{user ? `, ${user.name}` : ''} a la gestión empresarial</p>
      </div>

      <div className="flex items-center gap-3">
        <button
          className="rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-sm text-slate-700 hover:bg-slate-200"
          onClick={logout}
        >
          Cerrar sesión
        </button>
      </div>
    </header>
  )
}

export default Navbar

