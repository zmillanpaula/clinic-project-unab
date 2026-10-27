import type { FormEvent } from 'react'
import { X } from 'lucide-react'

export interface AppointmentRequest {
  date: string
  time: string
  specialty: string
}

type PatientBookingDialogProps = {
  isOpen: boolean
  onClose: () => void
  onSubmit: (request: AppointmentRequest) => void
}

export function PatientBookingDialog({
  isOpen,
  onClose,
  onSubmit,
}: PatientBookingDialogProps) {
  if (!isOpen) return null

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const date = String(formData.get('date') ?? '')
    const time = String(formData.get('time') ?? '')
    const specialty = String(formData.get('specialty') ?? '')
    if (!date || !time || !specialty) return
    onSubmit({ date, time, specialty })
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="patient-booking-title"
        className="w-full max-w-md rounded-2xl bg-white p-5 shadow-xl sm:p-6"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id="patient-booking-title" className="text-lg font-bold text-[#293b37]">Reservar una hora</h2>
            <p className="mt-1 text-sm text-[#7b8985]">Elige una especialidad y un horario.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="grid size-8 place-items-center rounded-lg text-[#71807b] hover:bg-[#f2f6f4]"
          >
            <X size={17} aria-hidden="true" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold text-[#52615d]">Especialidad</span>
            <select name="specialty" required defaultValue="" className="h-11 w-full rounded-lg border border-[#d6e0dd] bg-white px-3 text-sm text-[#344440] outline-none focus:border-[#25887b]">
              <option value="" disabled>Selecciona una especialidad</option>
              <option>Medicina General</option>
              <option>Cardiología</option>
              <option>Nutrición</option>
            </select>
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold text-[#52615d]">Fecha</span>
            <input name="date" type="date" required className="h-11 w-full rounded-lg border border-[#d6e0dd] px-3 text-sm text-[#344440] outline-none focus:border-[#25887b]" />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold text-[#52615d]">Hora disponible</span>
            <select name="time" required defaultValue="" className="h-11 w-full rounded-lg border border-[#d6e0dd] bg-white px-3 text-sm text-[#344440] outline-none focus:border-[#25887b]">
              <option value="" disabled>Selecciona un horario</option>
              <option>09:00</option>
              <option>10:30</option>
              <option>12:00</option>
              <option>15:30</option>
            </select>
          </label>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="min-h-10 rounded-lg border border-[#d6e0dd] px-4 text-sm font-semibold text-[#52615d] hover:bg-[#f5f8f7]">
              Volver
            </button>
            <button type="submit" className="min-h-10 rounded-lg bg-[#147a72] px-4 text-sm font-semibold text-white hover:bg-[#0f625a]">
              Confirmar hora
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}
