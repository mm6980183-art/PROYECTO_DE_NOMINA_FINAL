import sql from 'mssql'
import fs from 'fs'
import path from 'path'
import config from './src/config/index.js'

const configOptions = {
  user: config.db.user,
  password: config.db.password,
  server: config.db.host,
  database: 'master',
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

async function resetDatabase() {
  try {
    console.log('Conectando a SQL Server...')
    const pool = new sql.ConnectionPool(configOptions)
    await pool.connect()
    console.log('✓ Conectado')

    // Drop database if exists
    console.log('Eliminando base de datos anterior...')
    await pool.request().query(`IF EXISTS (SELECT * FROM sys.databases WHERE name = '${config.db.database}') DROP DATABASE [${config.db.database}]`)
    console.log('✓ Base de datos eliminada')

    // Create database
    console.log('Creando nueva base de datos...')
    await pool.request().query(`CREATE DATABASE [${config.db.database}]`)
    console.log('✓ Base de datos creada')

    await pool.close()

    // Connect to new database
    console.log('Conectando a la nueva base de datos...')
    configOptions.database = config.db.database
    const pool2 = new sql.ConnectionPool(configOptions)
    await pool2.connect()
    console.log('✓ Conectado')

    // Execute schema
    console.log('Ejecutando schema.sql...')
    const schemaPath = path.join(process.cwd(), 'schema.sql')
    const schemaSQL = fs.readFileSync(schemaPath, 'utf8')
    const schemaBatches = schemaSQL.split('GO').filter(b => b.trim())
    
    for (const batch of schemaBatches) {
      if (batch.trim()) {
        await pool2.request().batch(batch)
      }
    }
    console.log('✓ Schema ejecutado')

    // Execute seed
    console.log('Ejecutando seed.sql...')
    const seedPath = path.join(process.cwd(), 'seed.sql')
    const seedSQL = fs.readFileSync(seedPath, 'utf8')
    const seedBatches = seedSQL.split('GO').filter(b => b.trim())
    
    for (const batch of seedBatches) {
      if (batch.trim()) {
        await pool2.request().batch(batch)
      }
    }
    console.log('✓ Seed ejecutado')

    await pool2.close()
    console.log('\n✅ Base de datos reseteada correctamente')
    console.log('Credenciales de prueba:')
    console.log('  Email: admin@paytrack.local')
    console.log('  Password: admin123')
  } catch (err) {
    console.error('❌ Error:', err.message)
    process.exit(1)
  }
}

resetDatabase()
