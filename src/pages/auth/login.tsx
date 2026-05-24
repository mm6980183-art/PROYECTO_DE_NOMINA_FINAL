import { useState } from 'react'
import { Link } from 'react-router-dom'
import './login.css'
import ConnectionTest from '../../components/ConnectionTest'
import { login as loginRequest } from '../../api/authApi'
import { useAuth } from '../../context/AuthContext'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [connectionStatus, setConnectionStatus] = useState('Pendiente')
  const { login } = useAuth()

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError(null)

    try {
      const response = await loginRequest({ email, password })
      login(response)
    } catch (err) {
      const message = err.response?.data?.message || 'Credenciales inválidas'
      setError(message)
    }
  }

  return (
    <div className="container">
      <div className="right">
        <ConnectionTest onStatusChange={setConnectionStatus} />
        <div className="login-box">
          <h1>Pay<span style={{ color: '#3b82f6' }}>Track</span></h1>
          <p>Bienvenido de vuelta</p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Correo electrónico</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="email"
                placeholder="Ingresa tu email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                id="password"
                placeholder="Ingresa tu contraseña"
                required
              />
            </div>

            {error && <p className="error-message">{error}</p>}
          {connectionStatus !== '✅ Conectado' && (
            <p className="error-message" style={{ marginTop: '10px' }}>
              No hay conexión con el servidor. Espera un momento y vuelve a intentar.
            </p>
          )}

          <button className="btn" type="submit" disabled={connectionStatus !== '✅ Conectado'}>
            Iniciar sesión
          </button>
        </form>

          <div className="social-login">
            <p>O inicia sesión con:</p>
            <a href="#" className="social-btn">Facebook</a>
            <a href="#" className="social-btn">Google</a>
          </div>

          <div className="links">
            <p>¿Olvidaste tu contraseña? <Link to="/forgot-password">Recupérala aquí</Link></p>
            <p>¿No tienes una cuenta? <a href="#">Crea una ahora</a></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
 