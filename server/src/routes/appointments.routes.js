import { Router } from 'express'
import {
  cancelAppointment,
  createAppointment,
  listMyAppointments,
} from '../controllers/appointments.controller.js'
import { requireAuth, requireRole } from '../middleware/auth.js'

const router = Router()

// Reservas: solo pacientes, cada une con sus propias citas
router.use(requireAuth, requireRole('paciente'))

router.get('/mine', listMyAppointments)
router.post('/', createAppointment)
router.patch('/:id/cancel', cancelAppointment)

export default router