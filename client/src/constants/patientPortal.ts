import type { PatientAppointment, PatientHistoryEntry } from '../types/patientPortal'

export const INITIAL_PATIENT_APPOINTMENT: PatientAppointment = {
  id: 'appointment-001',
  date: '2025-06-24',
  time: '10:30',
  doctor: 'Dra. Paula Lagos',
  specialty: 'Medicina General',
  center: 'Centro Médico Providencia',
  box: 'Box 04',
  status: 'Confirmada',
}

export const PATIENT_HISTORY: PatientHistoryEntry[] = [
  {
    id: 'history-001',
    title: 'Control cardiológico',
    doctor: 'Dr. Felipe Muñoz',
    specialty: 'Cardiología',
    date: '12 May',
  },
  {
    id: 'history-002',
    title: 'Consulta general',
    doctor: 'Dra. Paula Lagos',
    specialty: 'Medicina General',
    date: '08 Abr',
  },
  {
    id: 'history-003',
    title: 'Evaluación nutricional',
    doctor: 'Nut. Valentina Soto',
    specialty: 'Nutrición',
    date: '19 Mar',
  },
]
