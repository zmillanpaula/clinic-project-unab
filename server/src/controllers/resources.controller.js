import mongoose from 'mongoose'
import { Resource } from '../models/Resource.js'

const NOT_FOUND = { error: 'No se encontró el recurso.' }

export async function listResources(req, res) {
  const resources = await Resource.find().sort({ createdAt: -1 })
  res.json(resources)
}

export async function createResource(req, res) {
  const { name, location, capacity, status } = req.body ?? {}
  const resource = await Resource.create({ name, location, capacity, status })
  res.status(201).json(resource)
}

export async function updateResource(req, res) {
  const { id } = req.params
  if (!mongoose.isValidObjectId(id)) return res.status(404).json(NOT_FOUND)

  const { name, location, capacity, status } = req.body ?? {}
  const resource = await Resource.findByIdAndUpdate(
    id,
    { name, location, capacity, status },
    { returnDocument: 'after', runValidators: true },
  )

  if (!resource) return res.status(404).json(NOT_FOUND)
  res.json(resource)
}