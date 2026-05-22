import './App.css'
import LoginPage from './pages/auth/login'
import ForgotPasswordPage from './pages/auth/forgotPassword'
import DownloadsPage from './pages/downloads/downloads'
import { Route, Routes, Navigate } from 'react-router-dom'
import UserNamerPage from './pages/usermanager/usermanager'
import ListClientsPage from './pages/usermanager/ListClients'
import DashboardPage from './pages/dashboard/DashboardPage'
import NominaPage from './pages/dashboard/NominaPage'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/layout/ProtectedRoute'
import DashboardLayout from './components/layout/DashboardLayout'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/forgot-password' element={<ForgotPasswordPage />} />
        <Route path='/dashboard' element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path='/dashboard/nomina' element={<ProtectedRoute><DashboardLayout><NominaPage /></DashboardLayout></ProtectedRoute>} />
        <Route path='/list-users' element={<ProtectedRoute><DashboardLayout><ListClientsPage /></DashboardLayout></ProtectedRoute>} />
        <Route path='/usermanager' element={<ProtectedRoute><DashboardLayout><UserNamerPage /></DashboardLayout></ProtectedRoute>} />
        <Route path='/downloads' element={<ProtectedRoute><DashboardLayout><DownloadsPage /></DashboardLayout></ProtectedRoute>} />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </AuthProvider>
  )
}

export default App