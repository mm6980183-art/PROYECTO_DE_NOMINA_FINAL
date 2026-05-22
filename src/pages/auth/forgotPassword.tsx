import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './login.css'
import { resetPassword as resetPasswordRequest } from '../../api/authApi'

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [resetToken, setResetToken] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = async (event: any) => {
    event.preventDefault()
    setError(null)
    setMessage('')

    try {
      const response = await resetPasswordRequest({ email, newPassword, resetToken })
      setMessage(response.message || 'Contraseña actualizada correctamente.')
      setTimeout(() => navigate('/'), 2000)
    } catch (err: any) {
      const message = err.response?.data?.message || err.message || 'Error al intentar recuperar la contraseña'
      setError(message)
    }
  }

  return (
    <div className="container">
      <div className="right">
        <div className="login-box">
          <h1>Recuperar contraseña</h1>
          <p>Ingresa tu correo, la nueva contraseña y el token de recuperación.</p>

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
              <label htmlFor="newPassword">Nueva contraseña</label>
              <input
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                type="password"
                id="newPassword"
                placeholder="Ingresa la nueva contraseña"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="resetToken">Token de recuperación</label>
              <input
                value={resetToken}
                onChange={(e) => setResetToken(e.target.value)}
                type="text"
                id="resetToken"
                placeholder="Ingresa el token de recuperación"
                required
              />
            </div>

            {error && <p className="error-message">{error}</p>}
            {message && <p className="success-message">{message}</p>}

            <button className="btn" type="submit">Actualizar contraseña</button>
          </form>

          <div className="links">
            <p>¿Ya tienes cuenta? <Link to="/">Inicia sesión</Link></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPasswordPage
