import db from './src/config/db.js'

try {
  const result = await db.query('SELECT 1 AS result')
  console.log('DB QUERY OK', result)
} catch (err) {
  console.error('DB QUERY ERROR', err)
  process.exit(1)
}
