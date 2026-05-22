import db from '../config/db.js'

export const findUserByEmail = async (email) => {
  const rows = await db.query('SELECT id, email, password, name, role, is_active AS isActive FROM users WHERE email = ?', [email])
  return rows[0] || null
}

export const findUserById = async (id) => {
  const rows = await db.query('SELECT id, email, name, role, is_active AS isActive FROM users WHERE id = ?', [id])
  return rows[0] || null
}

export const createUser = async ({ name, email, password, role = 'admin' }) => {
  await db.query(
    'INSERT INTO users (name, email, password, role, is_active) VALUES (?, ?, ?, ?, 1)',
    [name, email, password, role]
  )
  return { name, email, role }
}

export const updateUserPasswordByEmail = async (email, password) => {
  await db.query(
    'UPDATE users SET password = ? WHERE email = ?',
    [password, email]
  )
}
