import { Router } from 'express'
import {
  createResource,
  deleteResource,
  listResources,
  updateResource,
} from '../controllers/resources.controller.js'
import { requireAuth, requireRole } from '../middleware/auth.js'

const router = Router()

// Todas piden sesión iniciada
router.use(requireAuth)

// Ver: administración y recepción. Modificar: solo administración.
router.get('/', requireRole('administrador', 'recepcionista'), listResources)
router.post('/', requireRole('administrador'), createResource)
router.patch('/:id', requireRole('administrador'), updateResource)
router.delete('/:id', requireRole('administrador'), deleteResource)

export default router