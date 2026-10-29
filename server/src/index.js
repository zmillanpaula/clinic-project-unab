import 'dotenv/config'
import app from './app.js'
import { connectDB } from './config/db.js'

const PORT = process.env.PORT ?? 3000

try {
  await connectDB()
  app.listen(PORT, () => {
    console.log(`API escuchando en http://localhost:${PORT}`)
  })
} catch (error) {
  console.error('No se pudo conectar a MongoDB:', error.message)
  process.exit(1)
}