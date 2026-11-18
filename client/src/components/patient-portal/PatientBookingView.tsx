import { useState, type FormEvent } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  Clock3,
  House,
  Search,
  Stethoscope,
  UserRound,
} from 'lucide-react'

export interface AppointmentRequest {
  date: string
  time: string
  specialty: string
  center: string
  doctor: string
  reason: string
}

type PatientBookingViewProps = {
  onBack: () => void
  onConfirm: (request: AppointmentRequest) => void
}

type BookingStep = 1 | 2

const centers = [
  'Centro Médico Providencia',
  'Centro Médico Las Condes',
  'Centro Médico Ñuñoa',
  'Centro Médico La Florida',
]

const specialties = ['Medicina General', 'Cardiología', 'Nutrición', 'Kinesiología']

const professionalsBySpecialty: Record<string, string[]> = {
  'Medicina General': ['Dra. Paula Lagos', 'Dr. Andrés Soto'],
  Cardiología: ['Dr. Javier Moreno', 'Dr. Felipe Muñoz', 'Dra. Sofía Rivas'],
  Nutrición: ['Nut. Valentina Soto', 'Nut. Camila Pérez'],
  Kinesiología: ['Klgo. Martín Vera', 'Klga. Daniela Ruiz'],
}

const availableTimes = [
  { value: '08:30', available: true },
  { value: '09:00', available: true },
  { value: '09:30', available: true },
  { value: '10:00', available: false },
  { value: '10:30', available: true },
  { value: '11:00', available: true },
  { value: '11:30', available: true },
  { value: '12:00', available: true },
  { value: '14:00', available: false },
  { value: '15:00', available: true },
  { value: '15:30', available: true },
  { value: '16:00', available: true },
]

const steps = [
  { number: 1, title: 'Buscar disponibilidad', description: 'Centro y especialidad' },
  { number: 2, title: 'Elegir horario', description: 'Fecha y hora' },
  { number: 3, title: 'Confirmar', description: 'Resumen de reserva' },
] as const

function getTodayDate() {
  const today = new Date()
  const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60_000)
  return localDate.toISOString().slice(0, 10)
}

function formatBookingDate(date: string) {
  if (!date) return ''
  return new Intl.DateTimeFormat('es-CL', {
    dateStyle: 'long',
    timeZone: 'UTC',
  }).format(new Date(`${date}T00:00:00Z`))
}

function getWeekDays(date: string) {
  const selectedDate = new Date(`${date}T00:00:00Z`)
  const mondayOffset = (selectedDate.getUTCDay() + 6) % 7
  selectedDate.setUTCDate(selectedDate.getUTCDate() - mondayOffset)

  return Array.from({ length: 5 }, (_, index) => {
    const day = new Date(selectedDate)
    day.setUTCDate(selectedDate.getUTCDate() + index)
    return {
      value: day.toISOString().slice(0, 10),
      label: new Intl.DateTimeFormat('es-CL', { weekday: 'short', timeZone: 'UTC' })
        .format(day)
        .replace('.', ''),
      dayNumber: new Intl.DateTimeFormat('es-CL', { day: '2-digit', timeZone: 'UTC' })
        .format(day),
    }
  })
}

function getDoctorInitials(doctorName: string) {
  return doctorName
    .replace(/^(Dr\.|Dra\.|Nut\.|Klgo\.|Klga\.)\s*/i, '')
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toLocaleUpperCase('es') ?? '')
    .join('')
}

function getCenterLocation(centerName: string) {
  return centerName.replace(/^Centro Médico\s*/i, '')
}

export function PatientBookingView({ onBack, onConfirm }: PatientBookingViewProps) {
  const [step, setStep] = useState<BookingStep>(1)
  const [center, setCenter] = useState('')
  const [specialty, setSpecialty] = useState('')
  const [doctor, setDoctor] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('10:30')
  const [reason, setReason] = useState('')

  const professionals = professionalsBySpecialty[specialty] ?? []
  const weekDays = date ? getWeekDays(date) : []

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStep(2)
  }

  function handleConfirm() {
    onConfirm({ center, specialty, doctor, date, time, reason })
  }

  return (
    <main className="min-h-screen bg-[#f5f8f7] px-4 py-6 text-[#283432] sm:px-8 sm:py-9 lg:px-12">
      <div className="mx-auto max-w-[1080px]">
        <button
          type="button"
          onClick={() => step === 1 ? onBack() : setStep(1)}
          className="inline-flex min-h-9 items-center gap-2 rounded-md text-sm font-medium text-[#52615d] transition hover:text-[#147a72] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#147a72]"
        >
          <ArrowLeft size={17} aria-hidden="true" />
          {step === 1 ? 'Volver al inicio' : 'Modificar búsqueda'}
        </button>

        <header className="mt-7">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#147a72]">AGENDA</p>
          <h1 className="mt-2 text-3xl font-semibold text-[#263a37]">
            {step === 2 ? 'Elige un horario' : 'Reserva tu atención'}
          </h1>
          <p className="mt-2 text-sm text-[#71807b] sm:text-base">
            Encuentra la alternativa que mejor se ajuste a ti.
          </p>
        </header>

        <nav aria-label="Progreso de la reserva" className="my-8">
          <ol className="grid gap-3 sm:grid-cols-3">
            {steps.map(({ number, title, description }, index) => {
              const isComplete = step > number
              const isActive = step === number
              return (
                <li key={number} className="relative">
                  {index < steps.length - 1 && (
                    <span
                      aria-hidden="true"
                      className={`absolute left-5 right-[-20px] top-5 z-0 hidden h-px sm:block ${
                        step > number ? 'bg-[#147a72]' : 'bg-[#dce5e2]'
                      }`}
                    />
                  )}
                  <div className="relative flex items-center gap-3">
                    <span
                      className={`relative z-10 grid size-10 shrink-0 place-items-center rounded-full border text-sm font-semibold ${
                        isActive || isComplete
                          ? 'border-[#147a72] bg-[#147a72] text-white'
                          : 'border-[#d7e0dd] bg-white text-[#82908b]'
                      }`}
                    >
                      {isComplete || (isActive && number === 1)
                        ? <Check size={17} aria-hidden="true" />
                        : number}
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-[#263a37]">
                        {title}
                      </span>
                      <span className="mt-0.5 block text-xs text-[#87938f]">{description}</span>
                    </span>
                  </div>
                </li>
              )
            })}
          </ol>
        </nav>

        {step === 1 && (
          <form
            onSubmit={handleSearch}
            className="overflow-hidden rounded-2xl border border-[#e1e9e6] bg-white shadow-sm"
          >
            <div className="border-b border-[#e9efed] px-5 py-5 sm:px-8 sm:py-6">
              <div className="flex items-start gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#edf6f3] text-[#147a72]">
                  <Search size={19} aria-hidden="true" />
                </span>
                <div>
                  <h2 className="text-lg font-semibold text-[#293b37]">¿Qué atención necesitas?</h2>
                  <p className="mt-1 text-sm text-[#7b8985]">
                    Completa los filtros para buscar horas disponibles.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-x-6 gap-y-5 px-5 py-6 sm:grid-cols-2 sm:px-8 sm:py-7">
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-[#43514e]">Centro médico</span>
                <select
                  required
                  value={center}
                  onChange={(event) => setCenter(event.target.value)}
                  className="h-12 w-full rounded-lg border border-[#d6e0dd] bg-white px-3 text-sm text-[#344440] outline-none focus:border-[#25887b] focus:ring-4 focus:ring-[#25887b]/10"
                >
                  <option value="" disabled>Selecciona un centro médico</option>
                  {centers.map((item) => <option key={item}>{item}</option>)}
                </select>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-[#43514e]">Especialidad</span>
                <select
                  required
                  value={specialty}
                  onChange={(event) => {
                    setSpecialty(event.target.value)
                    setDoctor('')
                  }}
                  className="h-12 w-full rounded-lg border border-[#d6e0dd] bg-white px-3 text-sm text-[#344440] outline-none focus:border-[#25887b] focus:ring-4 focus:ring-[#25887b]/10"
                >
                  <option value="" disabled>Selecciona una especialidad</option>
                  {specialties.map((item) => <option key={item}>{item}</option>)}
                </select>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-[#43514e]">Profesional</span>
                <span className="relative block">
                  <UserRound size={17} aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#82908b]" />
                  <select
                    required
                    value={doctor}
                    onChange={(event) => setDoctor(event.target.value)}
                    disabled={!specialty}
                    className="h-12 w-full rounded-lg border border-[#d6e0dd] bg-white pl-10 pr-3 text-sm text-[#344440] outline-none focus:border-[#25887b] focus:ring-4 focus:ring-[#25887b]/10 disabled:cursor-not-allowed disabled:bg-[#f5f8f7]"
                  >
                    <option value="" disabled>
                      {specialty ? 'Selecciona un profesional' : 'Primero elige una especialidad'}
                    </option>
                    {professionals.map((item) => <option key={item}>{item}</option>)}
                  </select>
                </span>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-[#43514e]">Fecha preferida</span>
                <span className="relative block">
                  <CalendarDays size={17} aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#82908b]" />
                  <input
                    required
                    type="date"
                    min={getTodayDate()}
                    value={date}
                    onChange={(event) => setDate(event.target.value)}
                    className="h-12 w-full rounded-lg border border-[#d6e0dd] bg-white pl-10 pr-3 text-sm text-[#344440] outline-none focus:border-[#25887b] focus:ring-4 focus:ring-[#25887b]/10"
                  />
                </span>
              </label>

              <div className="flex items-start gap-3 rounded-xl border border-[#e5efeb] bg-[#f6faf8] px-4 py-3.5 sm:col-span-2">
                <Check size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-[#25887b]" />
                <p className="text-sm leading-5 text-[#25887b]">
                  Solo mostraremos profesionales con jornada activa y recursos disponibles.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4 border-t border-[#e9efed] bg-[#fbfcfc] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
              <p className="text-sm text-[#7b8985]">Podrás cambiar estos filtros más adelante.</p>
              <button
                type="submit"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#147a72] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0f625a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#147a72]"
              >
                Buscar horas disponibles
                <ArrowRight size={17} aria-hidden="true" />
              </button>
            </div>
          </form>
        )}

        {step === 2 && (
          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3">
            <section className="space-y-5 lg:col-span-2">
              <div className="rounded-2xl border border-[#e1e9e6] bg-white p-5 shadow-sm sm:p-6">
                <div className="grid grid-cols-5 gap-2 sm:gap-3">
                  {weekDays.map((day) => {
                    const isSelected = day.value === date
                    const isPastDate = day.value < getTodayDate()
                    return (
                      <button
                        key={day.value}
                        type="button"
                        disabled={isPastDate}
                        aria-pressed={isSelected}
                        onClick={() => setDate(day.value)}
                        className={`flex min-h-[76px] flex-col items-center justify-center gap-1 rounded-xl border text-sm transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#147a72] ${
                          isSelected
                            ? 'border-[#147a72] bg-[#147a72] font-semibold text-white shadow-sm'
                            : isPastDate
                              ? 'cursor-not-allowed border-[#edf0ef] bg-[#f7f8f8] text-[#b3bcb8]'
                              : 'border-[#e1e9e6] bg-white text-[#52615d] hover:border-[#83b8ae] hover:bg-[#f6faf8]'
                        }`}
                      >
                        <span className="text-xs capitalize">{day.label}</span>
                        <span className="text-lg font-semibold">{day.dayNumber}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              <article className="flex flex-col gap-4 rounded-2xl border border-[#e1e9e6] bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:p-6">
                <span className="grid size-12 shrink-0 place-items-center rounded-full bg-[#e5f1ed] text-sm font-bold text-[#26776c]">
                  {getDoctorInitials(doctor)}
                </span>
                <div className="min-w-0 flex-1">
                  <h2 className="truncate text-sm font-semibold text-[#293b37]">{doctor}</h2>
                  <p className="mt-1 text-sm text-[#71807b]">
                    {specialty} <span aria-hidden="true">•</span> {getCenterLocation(center)}
                  </p>
                </div>
                <span className="inline-flex w-fit rounded-full bg-[#edf7f1] px-3 py-1.5 text-xs font-semibold text-[#328057]">
                  Disponible
                </span>
              </article>

              <section className="rounded-2xl border border-[#e1e9e6] bg-white p-5 shadow-sm sm:p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xs font-bold tracking-[0.12em] text-[#147a72]">HORARIOS DISPONIBLES</h2>
                  <span className="text-xs text-[#7b8985]">{formatBookingDate(date)}</span>
                </div>
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                  {availableTimes.map(({ value, available }) => {
                    const isSelected = time === value
                    return (
                      <button
                        key={value}
                        type="button"
                        disabled={!available}
                        aria-pressed={isSelected}
                        onClick={() => setTime(value)}
                        className={`min-h-11 rounded-lg border text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#147a72] ${
                          !available
                            ? 'cursor-not-allowed border-[#edf0ef] bg-[#f2f4f3] text-[#aeb8b4]'
                            : isSelected
                              ? 'border-[#0f625a] bg-[#0f625a] text-white'
                              : 'border-[#d6e0dd] bg-white text-[#52615d] hover:border-[#83b8ae] hover:bg-[#f6faf8]'
                        }`}
                      >
                        {value}
                      </button>
                    )
                  })}
                </div>
                <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-[#edf1ef] pt-4">
                  <span className="inline-flex items-center gap-2 text-xs text-[#71807b]">
                    <span className="size-3 rounded-sm border border-[#d6e0dd] bg-white" aria-hidden="true" />
                    Disponible
                  </span>
                  <span className="inline-flex items-center gap-2 text-xs text-[#71807b]">
                    <span className="size-3 rounded-sm bg-[#0f625a]" aria-hidden="true" />
                    Seleccionado
                  </span>
                  <span className="inline-flex items-center gap-2 text-xs text-[#71807b]">
                    <span className="size-3 rounded-sm bg-[#e9edeb]" aria-hidden="true" />
                    No disponible
                  </span>
                </div>
              </section>
            </section>

            <aside className="overflow-hidden rounded-2xl border border-[#e1e9e6] bg-white shadow-sm lg:col-span-1">
              <div className="border-b border-[#e9efed] px-5 py-5">
                <h2 className="text-xs font-bold tracking-[0.12em] text-[#147a72]">RESUMEN DE RESERVA</h2>
                <p className="mt-2 text-lg font-semibold capitalize text-[#293b37]">
                  {new Intl.DateTimeFormat('es-CL', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    timeZone: 'UTC',
                  }).format(new Date(`${date}T00:00:00Z`))}
                </p>
              </div>
              <div className="space-y-4 p-5">
                <div className="flex items-start gap-3">
                  <Clock3 size={17} aria-hidden="true" className="mt-0.5 shrink-0 text-[#147a72]" />
                  <div>
                    <p className="text-xs text-[#7b8985]">Horario</p>
                    <p className="mt-0.5 text-sm font-semibold text-[#25887b]">{time} · 45 minutos</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Stethoscope size={17} aria-hidden="true" className="mt-0.5 shrink-0 text-[#147a72]" />
                  <div>
                    <p className="text-xs text-[#7b8985]">Profesional</p>
                    <p className="mt-0.5 text-sm font-semibold text-[#25887b]">{doctor}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <House size={17} aria-hidden="true" className="mt-0.5 shrink-0 text-[#147a72]" />
                  <div>
                    <p className="text-xs text-[#7b8985]">Centro</p>
                    <p className="mt-0.5 text-sm font-semibold text-[#25887b]">
                      {getCenterLocation(center)} · Box 07
                    </p>
                  </div>
                </div>

                <label className="block border-t border-[#edf1ef] pt-4">
                  <span className="mb-2 block text-sm font-semibold text-[#43514e]">Motivo de consulta</span>
                  <input
                    type="text"
                    value={reason}
                    onChange={(event) => setReason(event.target.value)}
                    placeholder="Ej. Control cardiológico anual"
                    className="h-11 w-full rounded-lg border border-[#d6e0dd] px-3 text-sm text-[#25887b] outline-none placeholder:text-[#a0aaa6] focus:border-[#25887b] focus:ring-4 focus:ring-[#25887b]/10"
                  />
                </label>

                <div className="flex items-start gap-2.5 rounded-xl bg-[#edf7f1] px-3.5 py-3 text-xs leading-5 text-[#328057]">
                  <Check size={16} aria-hidden="true" className="mt-0.5 shrink-0" />
                  <p>Disponibilidad validada. Paciente, profesional y box sin conflictos.</p>
                </div>

                <button
                  type="button"
                  disabled={!time}
                  onClick={handleConfirm}
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#147a72] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0f625a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#147a72] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Confirmar reserva
                  <ArrowRight size={17} aria-hidden="true" />
                </button>
              </div>
            </aside>
          </div>
        )}
      </div>
    </main>
  )
}
