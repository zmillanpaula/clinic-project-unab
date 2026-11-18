import type { ClinicalResource } from '../types/admin'
import { axiosInstance } from './axiosInstance'

type ResourceInput = Omit<ClinicalResource, 'id'>

export async function fetchResources() {
  const { data } = await axiosInstance.get<ClinicalResource[]>('/api/resources')
  return data
}

export async function createResource(input: ResourceInput) {
  const { data } = await axiosInstance.post<ClinicalResource>('/api/resources', input)
  return data
}

export async function updateResource(id: string, changes: Partial<ResourceInput>) {
  const { data } = await axiosInstance.patch<ClinicalResource>(`/api/resources/${id}`, changes)
  return data
}