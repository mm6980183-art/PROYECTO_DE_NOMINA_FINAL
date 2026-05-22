import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import config from '../config/index.js'
import { findUserByEmail, updateUserPasswordByEmail } from '../models/userModel.js'
import ApiError from '../utils/ApiError.js'

const PASSWORD_SALT_ROUNDS = 10

export const authenticateUser = async (email, password) => {
  const user = await findUserByEmail(email)
  if (!user) {
    throw new ApiError(401, 'Credenciales inválidas')
  }

  const passwordMatches = await bcrypt.compare(password, user.password)
  if (!passwordMatches) {
    throw new ApiError(401, 'Credenciales inválidas')
  }

  return user
}

export const signJwtToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role
  }

  return jwt.sign(payload, config.jwtSecret, { expiresIn: config.jwtExpiresIn })
}

export const hashPassword = async (plainPassword) => {
  return bcrypt.hash(plainPassword, PASSWORD_SALT_ROUNDS)
}

export const resetUserPassword = async (email, newPassword, resetToken) => {
  if (resetToken !== config.passwordResetToken) {
    throw new ApiError(401, 'Token de recuperación inválido')
  }

  const user = await findUserByEmail(email)
  if (!user) {
    throw new ApiError(404, 'Usuario no encontrado')
  }

  const hashedPassword = await hashPassword(newPassword)
  await updateUserPasswordByEmail(email, hashedPassword)
}
