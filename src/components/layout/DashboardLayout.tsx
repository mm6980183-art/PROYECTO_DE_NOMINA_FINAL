import Sidebar from './Sidebar'
import Navbar from './Navbar'

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="lg:flex lg:min-h-screen">
        <Sidebar />
        <main className="flex-1 p-6 lg:p-8">
          <Navbar />
          <div className="mt-6">{children}</div>
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
