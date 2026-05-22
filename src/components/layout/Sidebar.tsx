import { NavLink } from 'react-router-dom'

const menuItems = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Usuarios', to: '/usermanager' },
  { label: 'Descargas', to: '/downloads' },
  { label: 'Reportes', to: '/dashboard' }
]

const Sidebar = () => {
  return (
    <aside className="w-72 bg-slate-900 text-slate-100 shadow-soft p-5 hidden lg:flex lg:flex-col gap-4">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold">PayTrack ERP</h2>
        <p className="text-sm text-slate-400">Panel de nómina centralizado</p>
      </div>

      <nav className="flex flex-col gap-3">
        {menuItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `rounded-xl px-4 py-3 transition-colors duration-200 ${
                isActive ? 'bg-slate-700 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
