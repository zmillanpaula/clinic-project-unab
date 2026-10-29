import 'dotenv/config'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import { connectDB } from '../config/db.js'
import { User } from '../models/User.js'
import { Resource } from '../models/Resource.js'
import { INITIAL_CLINICAL_RESOURCES } from '../data/clinicalResources.js'

const DEMO_ACCOUNTS = [
  { name: 'maria.lopez', email: 'administrador@example.cl', password: 'AdminClave123!', roleId: 'administrador' },
  { name: 'maria.lopez', email: 'recepcionista@example.cl', password: 'RecepcionClave123!', roleId: 'recepcionista' },
  { name: 'maria.lopez', email: 'profesional@example.cl', password: 'ProfesionalClave123!', roleId: 'profesional-salud' },
  { name: 'maria.lopez', email: 'paciente@example.cl', password: 'PacienteClave123!', roleId: 'paciente' },
]

try {
  await connectDB()

  // 1. Cuentas de prueba
  for (const { password, ...profile } of DEMO_ACCOUNTS) {
    const passwordHash = await bcrypt.hash(password, 10)
    await User.findOneAndUpdate(
      { email: profile.email },
      { ...profile, passwordHash },
      { upsert: true, runValidators: true },
    )
    console.log(`✔ ${profile.email}`)
  }

  // 2. Centros y box
  for (const { id, ...resource } of INITIAL_CLINICAL_RESOURCES) {
    await Resource.findOneAndUpdate(
      { name: resource.name, location: resource.location },
      resource,
      { upsert: true, runValidators: true },
    )
  }
  console.log(`✔ ${INITIAL_CLINICAL_RESOURCES.length} centros y box`)

  console.log('Datos de prueba cargados')
} catch (error) {
  console.error('Error al cargar datos:', error.message)
  process.exitCode = 1
} finally {
  await mongoose.disconnect()
}