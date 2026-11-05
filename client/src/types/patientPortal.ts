export type PatientPortalTab = 'inicio' | 'reservas' | 'historial'

export type PatientAppointmentStatus = 'Confirmada' | 'Cancelada'

export interface PatientAppointment {
  id: string
  date: string
  time: string
  doctor: string
  specialty: string
  center: string
  box: string
  status: PatientAppointmentStatus
}

export interface PatientHistoryEntry {
  id: string
  title: string
  doctor: string
  specialty: string
  date: string
}
