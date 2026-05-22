import userModel from '../models/userModel.js'

const userService = {
  getAllUsers: async () => {
    return await userModel.findAll()
  },
  createUser: async (userData) => {
    // Aquí podrías añadir validaciones de negocio adicionales
    return await userModel.create(userData)
  }
}

export default userService