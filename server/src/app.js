import express from 'express'

const app = express()
app.use(express.json()) // permite leer el body JSON de los POST

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})

export default app