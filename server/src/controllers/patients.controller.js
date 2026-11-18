import mongoose from 'mongoose'
import { Patient } from '../models/Patient.js'

const NOT_FOUND = { error: 'No se encontró el paciente.' }

const EDITABLE_FIELDS = [
  'rut', 'fullName', 'birthDate', 'healthPlan', 'address', 'commune',
  'email', 'phone', 'emergencyContactName', 'emergencyRelationship',
  'emergencyPhone', 'status',
]

// Toma solo los campos permitidos del body (evita "mass assignment")
function pickPatientFields(body) {
  const data = {}
  for (const field of EDITABLE_FIELDS) {
    if (body?.[field] !== undefined) data[field] = body[field]
  }
  return data
}

export async function listPatients(req, res) {
  const patients = await Patient.find().sort({ fullName: 1 })
  res.json(patients)
}

export async function createPatient(req, res) {
  const patient = await Patient.create(pickPatientFields(req.body))
  res.status(201).json(patient)
}

export async function updatePatient(req, res) {
  const { id } = req.params
  if (!mongoose.isValidObjectId(id)) return res.status(404).json(NOT_FOUND)

  const patient = await Patient.findByIdAndUpdate(id, pickPatientFields(req.body), {
    returnDocument: 'after',
    runValidators: true,
  })
  if (!patient) return res.status(404).json(NOT_FOUND)
  res.json(patient)
}

export async function deletePatient(req, res) {
  const { id } = req.params
  if (!mongoose.isValidObjectId(id)) return res.status(404).json(NOT_FOUND)

  const patient = await Patient.findByIdAndDelete(id)
  if (!patient) return res.status(404).json(NOT_FOUND)
  res.status(204).end()
}