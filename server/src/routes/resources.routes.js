import { Router } from 'express'
import { createResource, listResources, updateResource } from '../controllers/resources.controller.js'

const router = Router()

router.get('/', listResources)
router.post('/', createResource)
router.patch('/:id', updateResource)

export default router