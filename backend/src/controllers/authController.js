import { authenticateUser, signJwtToken, resetUserPassword } from '../services/authService.js'

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ status: 'fail', message: 'Email y contraseña son obligatorios' })
    }

    const user = await authenticateUser(email, password)
    const token = signJwtToken(user)

    res.json({
      status: 'success',
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        },
        token
      }
    })
  } catch (error) {
    next(error)
  }
}

export const resetPassword = async (req, res, next) => {
  try {
    const { email, newPassword, resetToken } = req.body
    if (!email || !newPassword || !resetToken) {
      return res.status(400).json({ status: 'fail', message: 'Email, nueva contraseña y token son obligatorios' })
    }

    await resetUserPassword(email, newPassword, resetToken)

    res.json({
      status: 'success',
      message: 'Contraseña actualizada correctamente. Ahora puedes iniciar sesión con la nueva clave.'
    })
  } catch (error) {
    next(error)
  }
}
