import ApiError from '../utils/ApiError.js'

export const notFoundHandler = (req, res, next) => {
  next(new ApiError(404, `Ruta ${req.originalUrl} no encontrada`))
}

export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500
  const message = err.message || 'Error interno del servidor'
  const errorResponse = {
    status: 'error',
    message,
    ...(err.details ? { details: err.details } : {})
  }

  if (process.env.NODE_ENV !== 'production') {
    errorResponse.stack = err.stack
  }

  res.status(statusCode).json(errorResponse)
}
