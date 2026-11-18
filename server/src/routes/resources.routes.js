import { Router } from 'express'
import { createResource, deleteResource, listResources, updateResource } from '../controllers/resources.controller.js'

const router = Router()

router.get('/', listResources)
router.post('/', createResource)
router.patch('/:id', updateResource)
router.delete('/:id', deleteResource)

export default router