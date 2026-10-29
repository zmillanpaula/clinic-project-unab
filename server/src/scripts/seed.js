import 'dotenv/config'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import { connectDB } from '../config/db.js'
import { User } from '../models/User.js'

const DEMO_ACCOUNTS = [
  { name: 'maria.lopez', email: 'administrador@example.cl', password: 'AdminClave123!', roleId: 'administrador' },
  { name: 'maria.lopez', email: 'recepcionista@example.cl', password: 'RecepcionClave123!', roleId: 'recepcionista' },
  { name: 'maria.lopez', email: 'profesional@example.cl', password: 'ProfesionalClave123!', roleId: 'profesional-salud' },
  { name: 'maria.lopez', email: 'paciente@example.cl', password: 'PacienteClave123!', roleId: 'paciente' },
]

try {
  await connectDB()

  for (const { password, ...profile } of DEMO_ACCOUNTS) {
    const passwordHash = await bcrypt.hash(password, 10)
    await User.findOneAndUpdate(
      { email: profile.email },
      { ...profile, passwordHash },
      { upsert: true, runValidators: true },
    )
    console.log(`✔ ${profile.email}`)
  }

  console.log('Cuentas de prueba cargadas')
} catch (error) {
  console.error('Error al cargar cuentas:', error.message)
  process.exitCode = 1
} finally {
  await mongoose.disconnect()
}