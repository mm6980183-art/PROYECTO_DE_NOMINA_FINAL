import userService from '../services/userService.js'

const getUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers()
    res.json(users)
  } catch (error) {
    next(error)
  }
}

const createUser = async (req, res, next) => {
  try {
    const newUser = await userService.createUser(req.body)
    res.status(201).json(newUser)
  } catch (error) {
    next(error)
  }
}

export default { getUsers, createUser }