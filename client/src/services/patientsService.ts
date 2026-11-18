import type { PatientFormValues, PatientRecord } from '../types/patient'
import { axiosInstance } from './axiosInstance'

export async function fetchPatients() {
  const { data } = await axiosInstance.get<PatientRecord[]>('/api/patients')
  return data
}

export async function createPatient(values: PatientFormValues) {
  const { data } = await axiosInstance.post<PatientRecord>('/api/patients', values)
  return data
}

export async function updatePatient(id: string, values: Partial<PatientFormValues>) {
  const { data } = await axiosInstance.patch<PatientRecord>(`/api/patients/${id}`, values)
  return data
}

export async function deletePatient(id: string) {
  await axiosInstance.delete(`/api/patients/${id}`)
}