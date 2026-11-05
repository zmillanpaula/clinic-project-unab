import { MapPin } from 'lucide-react'
import type { PatientAppointment } from '../../types/patientPortal'

type PatientAppointmentCardProps = {
  appointment: PatientAppointment
  onReschedule: () => void
  onCancel: () => void
}

function getDoctorInitials(doctor: string) {
  return doctor
    .replace(/^(Dr\.|Dra\.|Nut\.)\s*/i, '')
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toLocaleUpperCase('es') ?? '')
    .join('')
}

export function PatientAppointmentCard({
  appointment,
  onReschedule,
  onCancel,
}: PatientAppointmentCardProps) {
  const isConfirmed = appointment.status === 'Confirmada'
  const appointmentDate = new Date(`${appointment.date}T12:00:00`)
  const weekday = new Intl.DateTimeFormat('es-CL', { weekday: 'long' }).format(appointmentDate)
  const day = new Intl.DateTimeFormat('es-CL', { day: '2-digit' }).format(appointmentDate)
  const month = new Intl.DateTimeFormat('es-CL', { month: 'short' })
    .format(appointmentDate)
    .replace('.', '')
    .toLocaleUpperCase('es')

  return (
    <article className="overflow-hidden rounded-2xl border border-[#dce9e5] bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-[#e9efed] px-5 py-4 sm:px-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#71807b]">
            Próxima atención
          </p>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
          isConfirmed ? 'bg-[#edf7f1] text-[#328057]' : 'bg-[#f3f4f3] text-[#7b8581]'
        }`}>
          {appointment.status}
        </span>
      </div>

      <div className="p-5 sm:p-6">
        <div className="flex items-center gap-4">
          <span className="flex size-16 shrink-0 flex-col items-center justify-center rounded-xl bg-[#edf6f3] text-[#147a72]">
            <span className="text-2xl font-bold leading-none">{day}</span>
            <span className="mt-1 text-[10px] font-bold tracking-[0.1em]">{month}</span>
          </span>
          <div className="min-w-0">
            <p className="text-sm font-medium capitalize text-[#7b8985]">{weekday}</p>
            <p className="mt-1 text-2xl font-bold leading-tight text-[#293b37]">
              {appointment.time} <span className="text-base font-semibold">hrs</span>
            </p>
          </div>
        </div>

        <div className="mt-6 divide-y divide-gray-100 border-t border-gray-100">
          <div className="flex items-start gap-3 py-4">
            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#DCEBED] text-xs font-bold text-[#35616B]">
              {getDoctorInitials(appointment.doctor)}
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-[#52615d]">{appointment.doctor}</p>
              <p className="mt-0.5 truncate text-xs text-[#7b8985]">{appointment.specialty}</p>
            </div>
          </div>
          <div className="flex items-start gap-3 py-4">
            <MapPin size={17} className="mt-0.5 shrink-0 text-[#82918c]" aria-hidden="true" />
            <div>
              <p className="text-sm font-semibold text-[#344440]">
                {appointment.center} - {appointment.box}
              </p>
            </div>
          </div>
        </div>

        {isConfirmed && (
          <div className="mt-2 flex flex-wrap items-center justify-start gap-3 border-t border-gray-100 pt-4">
            <button
              type="button"
              onClick={onReschedule}
              className="inline-flex min-h-10 min-w-32 items-center justify-center rounded-lg border border-[#d6e0dd] px-3 text-sm font-semibold text-[#52615d] transition hover:bg-[#f5f8f7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#147a72]"
            >
              Reagendar
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="inline-flex min-h-10 min-w-32 items-center justify-center rounded-lg px-3 text-sm font-semibold text-[#a94d4d] transition hover:bg-[#fff5f5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a94d4d]"
            >
              Cancelar hora
            </button>
          </div>
        )}
      </div>
    </article>
  )
}
