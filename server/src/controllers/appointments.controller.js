import mongoose from 'mongoose'
import { Appointment } from '../models/Appointment.js'

const NOT_FOUND = { error: 'No se encontró la reserva.' }

// Fecha de hoy en Chile, en formato AAAA-MM-DD
function todayInChile() {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Santiago' }).format(new Date())
}

export async function listMyAppointments(req, res) {
  const appointments = await Appointment.find({ patientUser: req.user.sub }).sort({ date: 1, time: 1 })
  res.json(appointments)
}

export async function createAppointment(req, res) {
  const { date, time, center, specialty, doctor, reason } = req.body ?? {}

  if (typeof date === 'string' && date < todayInChile()) {
    return res.status(400).json({ error: 'No puedes reservar una hora en una fecha pasada.' })
  }

  const appointment = await Appointment.create({
    patientUser: req.user.sub, // viene del token, no del formulario
    date,
    time,
    center,
    specialty,
    doctor,
    reason,
  })
  res.status(201).json(appointment)
}

export async function cancelAppointment(req, res) {
  const { id } = req.params
  if (!mongoose.isValidObjectId(id)) return res.status(404).json(NOT_FOUND)

  const appointment = await Appointment.findOneAndUpdate(
    { _id: id, patientUser: req.user.sub, status: 'Confirmada' },
    { status: 'Cancelada' },
    { returnDocument: 'after' },
  )
  if (!appointment) return res.status(404).json(NOT_FOUND)
  res.json(appointment)
}