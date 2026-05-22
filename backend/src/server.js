import app from './app.js'
import config from './config/index.js'

const PORT = config.port

const server = app.listen(PORT, () => {
  console.log(`PayTrack backend running on http://localhost:${PORT}`)
})

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Error: el puerto ${PORT} ya está en uso. Detén el servidor que lo ocupa o cambia PORT en el .env.`)
  } else {
    console.error('Error al iniciar el servidor:', error)
  }
  process.exit(1)
})
