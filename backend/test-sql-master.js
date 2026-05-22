import sql from 'mssql'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.resolve(__dirname, '../.env') })

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: `${process.env.DB_HOST}\\${process.env.DB_INSTANCE}`,
  database: 'master',
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
}

try {
  const pool = await new sql.ConnectionPool(config).connect()
  console.log('CONNECT MASTER OK')
  await pool.close()
} catch (err) {
  console.error('CONNECT MASTER ERROR', err)
  process.exit(1)
}
