import 'dotenv/config'
import app from './app.js'
import { connectDB } from './config/db.js'

const PORT = process.env.PORT ?? 3000

try {
  if (!process.env.JWT_SECRET) throw new Error('Falta JWT_SECRET en el archivo .env')

  await connectDB()
  app.listen(PORT, () => {
    console.log(`API escuchando en http://localhost:${PORT}`)
  })
} catch (error) {
  console.error('No se pudo iniciar el servidor:', error.message)
  process.exit(1)
}