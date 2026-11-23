import express from 'express'
import accessRoutes from './routes/access.routes.js'
import resourceRoutes from './routes/resources.routes.js'
import patientRoutes from './routes/patients.routes.js'
import appointmentRoutes from './routes/appointments.routes.js'

const app = express()
app.use(express.json())

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.use('/api/access', accessRoutes)
app.use('/api/resources', resourceRoutes)
app.use('/api/patients', patientRoutes)
app.use('/api/appointments', appointmentRoutes)

// Manejador de errores: siempre al final
app.use((err, req, res, next) => {
  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: 'Datos inválidos: revisa los campos del formulario.' })
  }
  if (err.code === 11000) {
    const message = err.keyPattern?.rut
      ? 'Ya existe un paciente registrado con ese RUT.'
      : 'Ese horario ya fue reservado. Por favor elige otro.'
    return res.status(409).json({ error: message })
  }
  console.error(err)
  res.status(500).json({ error: 'Error interno del servidor.' })
})

export default app