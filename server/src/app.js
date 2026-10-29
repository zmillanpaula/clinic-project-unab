import express from 'express'
import accessRoutes from './routes/access.routes.js'

const app = express()
app.use(express.json()) // permite leer el body JSON de los POST

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.use('/api/access', accessRoutes)

export default app