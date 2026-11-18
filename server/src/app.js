import express from 'express'
import accessRoutes from './routes/access.routes.js'
import resourceRoutes from './routes/resources.routes.js'
import patientRoutes from './routes/patients.routes.js'

const app = express()
app.use(express.json())

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.use('/api/access', accessRoutes)
app.use('/api/resources', resourceRoutes)
app.use('/api/patients', patientRoutes)

// Manejador de errores: siempre al final
app.use((err, req, res, next) => {
  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: 'Datos inválidos: revisa los campos del formulario.' })
  }
  if (err.code === 11000) {
    return res.status(409).json({ error: 'Ya existe un paciente registrado con ese RUT.' })
  }
  console.error(err)
  res.status(500).json({ error: 'Error interno del servidor.' })
})

export default app