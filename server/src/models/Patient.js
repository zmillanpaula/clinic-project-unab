import mongoose from 'mongoose'
import { isValidRut, normalizeRut } from '../utils/rut.js'

export const PATIENT_STATUSES = ['Activo', 'Inactivo']

const optionalText = () => ({ type: String, trim: true, default: '' })

const patientSchema = new mongoose.Schema(
  {
    rut: {
      type: String,
      required: true,
      unique: true,
      set: normalizeRut,
      validate: { validator: isValidRut, message: 'El RUT no es válido.' },
    },
    fullName: { type: String, required: true, trim: true },
    birthDate: optionalText(),
    healthPlan: optionalText(),
    address: optionalText(),
    commune: optionalText(),
    email: { ...optionalText(), lowercase: true },
    phone: optionalText(),
    emergencyContactName: optionalText(),
    emergencyRelationship: optionalText(),
    emergencyPhone: optionalText(),
    initials: optionalText(),
    status: { type: String, enum: PATIENT_STATUSES, default: 'Activo' },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: (doc, ret) => {
        delete ret._id
        return ret
      },
    },
  },
)

export const Patient = mongoose.model('Patient', patientSchema)