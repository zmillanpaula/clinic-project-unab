import mongoose from 'mongoose'

export const ROLES = ['administrador', 'recepcionista', 'profesional-salud', 'paciente']

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    roleId: { type: String, required: true, enum: ROLES },
  },
  { timestamps: true },
)

export const User = mongoose.model('User', userSchema)