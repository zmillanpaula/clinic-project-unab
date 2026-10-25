import {
  ClipboardList,
  Heart,
  ShieldCheck,
  Stethoscope,
  type LucideIcon,
} from 'lucide-react'

export const roles = [
  { id: 'administrador', title: 'Administrador', Icon: ShieldCheck },
  { id: 'recepcionista', title: 'Recepcionista', Icon: ClipboardList },
  { id: 'profesional-salud', title: 'Profesional de salud', Icon: Stethoscope },
  { id: 'paciente', title: 'Paciente', Icon: Heart },
] as const satisfies ReadonlyArray<{
  id: string
  title: string
  Icon: LucideIcon
}>

export type RoleId = (typeof roles)[number]['id']