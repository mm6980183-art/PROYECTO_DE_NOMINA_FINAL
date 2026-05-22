// Controlador simple en memoria para permitir creación/listado/eliminación rápida desde frontend
let mockUsers = [
  {
    idColaboradores: 1,
    NombreCompleto: 'Administrador PayTrack',
    Cedula: '100000001',
    Telefono: '3000000000',
    Cargo: 'Administrador',
    AreadeDesempeño: 'Administración'
  }
]

let nextId = 2

export const listUsers = (req, res) => {
  res.json(mockUsers)
}

export const getUser = (req, res) => {
  const id = Number(req.params.id)
  const user = mockUsers.find(u => u.idColaboradores === id || u.Cedula === req.params.id)
  if (!user) return res.status(404).json({ status: 'error', message: 'Usuario no encontrado' })
  res.json(user)
}

export const createUser = (req, res) => {
  const { NombreCompleto, Cedula, Telefono, AreadeDesempeño, Cargo } = req.body
  if (!NombreCompleto || !Cedula) return res.status(400).json({ status: 'error', message: 'Faltan datos requeridos' })
  const newUser = { idColaboradores: nextId++, NombreCompleto, Cedula, Telefono, AreadeDesempeño, Cargo }
  mockUsers.push(newUser)
  res.status(201).json({ status: 'success', data: newUser })
}

export const deleteUser = (req, res) => {
  const id = Number(req.params.id)
  const idx = mockUsers.findIndex(u => u.idColaboradores === id)
  if (idx === -1) return res.status(404).json({ status: 'error', message: 'Usuario no encontrado' })
  mockUsers.splice(idx, 1)
  res.json({ status: 'success', message: 'Usuario eliminado' })
}
