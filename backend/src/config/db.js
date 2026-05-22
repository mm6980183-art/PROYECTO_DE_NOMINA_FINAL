import sql from 'mssql'
import config from './index.js'

const configOptions = {
  user: config.db.user,
  password: config.db.password,
  server: config.db.host,
  database: config.db.database,
  options: {
    encrypt: false,
    trustServerCertificate: true,
    connectTimeout: 30000
  }
}

if (config.db.instanceName) {
  configOptions.server = `${config.db.host}\\${config.db.instanceName}`
} else {
  configOptions.port = config.db.port
}

const pool = new sql.ConnectionPool(configOptions)

const poolConnect = pool.connect()

const query = async (queryText, params = []) => {
  await poolConnect

  let index = 0
  const sqlText = queryText.replace(/\?/g, () => `@p${index++}`)
  const request = pool.request()

  params.forEach((value, paramIndex) => {
    request.input(`p${paramIndex}`, value)
  })

  const result = await request.query(sqlText)
  return result.recordset
}

export default { query }
