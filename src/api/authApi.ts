import api from './axiosConfig'

export const login = async (credentials) => {
  const response = await api.post('/auth/login', credentials)
  return response.data.data
}

export const resetPassword = async (payload) => {
  const response = await api.post('/auth/reset-password', payload)
  return response.data
}
