export type ResourceStatus = 'Operativo' | 'Disponible' | 'En uso' | 'Mantención'

export type ClinicalResource = {
  id: string
  name: string
  location: string
  capacity: string
  status: ResourceStatus
}

export type AdminTab =
  | 'Centros y box'
  | 'Profesionales'
  | 'Especialidades'
  | 'Jornadas y bloqueos'