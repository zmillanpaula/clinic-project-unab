import { Router } from 'express'
import {
  createPatient,
  deletePatient,
  listPatients,
  updatePatient,
} from '../controllers/patients.controller.js'

const router = Router()

router.get('/', listPatients)
router.post('/', createPatient)
router.patch('/:id', updatePatient)
router.delete('/:id', deletePatient)

export default router