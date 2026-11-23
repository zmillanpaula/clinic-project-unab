import { Router } from 'express'
import {
  createPatient,
  deletePatient,
  listPatients,
  updatePatient,
} from '../controllers/patients.controller.js'
import { requireAuth, requireRole } from '../middleware/auth.js'

const router = Router()

// Todo lo de pacientes: solo administración y recepción
router.use(requireAuth, requireRole('administrador', 'recepcionista'))

router.get('/', listPatients)
router.post('/', createPatient)
router.patch('/:id', updatePatient)
router.delete('/:id', deletePatient)

export default router