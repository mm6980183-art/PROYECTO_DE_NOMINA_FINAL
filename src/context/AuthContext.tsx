import { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext(null)

const getStoredUser = () => {
  const storedUser = localStorage.getItem('paytrack_user')
  return storedUser ? JSON.parse(storedUser) : null
}

const getStoredToken = () => {
  return localStorage.getItem('paytrack_token')
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => getStoredUser())
  const [token, setToken] = useState(() => getStoredToken())
  const navigate = useNavigate()


  const login = (payload) => {
    localStorage.setItem('paytrack_token', payload.token)
    localStorage.setItem('paytrack_user', JSON.stringify(payload.user))
    setToken(payload.token)
    setUser(payload.user)
    navigate('/dashboard')
  }

  const logout = () => {
    localStorage.removeItem('paytrack_token')
    localStorage.removeItem('paytrack_user')
    setToken(null)
    setUser(null)
    navigate('/')
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: Boolean(token) }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider')
  }
  return context
}
