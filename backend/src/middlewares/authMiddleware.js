import jwt from 'jsonwebtoken'
import ApiError from '../utils/ApiError.js'
import config from '../config/index.js'

export const authenticate = (req, res, next) => {
  const header = req.headers.authorization

  if (!header || !header.startsWith('Bearer ')) {
    return next(new ApiError(401, 'Token de autenticación requerido'))
  }

  const token = header.replace('Bearer ', '').trim()

  try {
    const payload = jwt.verify(token, config.jwtSecret)
    req.user = payload
    next()
  } catch (error) {
    next(new ApiError(401, 'Token inválido o expirado'))
  }
}
