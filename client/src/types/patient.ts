export type PatientFormValues = {
  rut: string
  fullName: string
  birthDate: string
  healthPlan: string
  address: string
  commune: string
  email: string
  phone: string
  emergencyContactName: string
  emergencyRelationship: string
  emergencyPhone: string
}

export type PatientStatus = 'Activo' | 'Inactivo'

export type PatientRecord = PatientFormValues & {
  id: string
  initials?: string
  status: PatientStatus
}
