import type { AppointmentRequest } from '../components/patient-portal/PatientBookingView'
import type { PatientAppointment } from '../types/patientPortal'
import { axiosInstance } from './axiosInstance'

export async function fetchMyAppointments() {
  const { data } = await axiosInstance.get<PatientAppointment[]>('/api/appointments/mine')
  return data
}

export async function createAppointment(request: AppointmentRequest) {
  const { data } = await axiosInstance.post<PatientAppointment>('/api/appointments', request)
  return data
}

export async function cancelAppointment(id: string) {
  const { data } = await axiosInstance.patch<PatientAppointment>(`/api/appointments/${id}/cancel`)
  return data
}