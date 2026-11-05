import { useRef, type FormEvent } from 'react'
import { CalendarDays, CheckCircle2, ClipboardList, Heart, MapPin, UserRound } from 'lucide-react'
import type { PatientFormValues } from '../../types/patient'

type PatientFormProps = {
  values: PatientFormValues
  isIdentifierVerified: boolean
  verificationMessage: string
  onChange: (field: keyof PatientFormValues, value: string) => void
  onSave: () => void
  onDiscard: () => void
}

const inputClassName = 'h-10 w-full rounded-lg border border-[#d6e0dd] bg-white px-3 text-sm text-[#344440] outline-none transition placeholder:text-[#a0aaa6] focus:border-[#25887b] focus:ring-4 focus:ring-[#25887b]/10'
const labelClassName = 'mb-1.5 block text-xs font-semibold text-[#52615d]'

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toLocaleUpperCase('es') ?? '')
    .join('')
}

export function PatientForm({
  values,
  isIdentifierVerified,
  verificationMessage,
  onChange,
  onSave,
  onDiscard,
}: PatientFormProps) {
  const birthDateInputRef = useRef<HTMLInputElement>(null)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onSave()
  }

  function openBirthDatePicker() {
    const birthDateInput = birthDateInputRef.current
    if (!birthDateInput) return

    if (typeof birthDateInput.showPicker === 'function') {
      birthDateInput.showPicker()
      return
    }

    birthDateInput.focus()
  }

  return (
    <form onSubmit={handleSubmit} className="overflow-hidden rounded-xl border border-[#e1e9e6] bg-white shadow-sm">
      <div className="flex flex-col gap-3 border-b border-[#e9efed] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#DCEBED] text-sm font-bold text-[#35616B]">
            {getInitials(values.fullName) || '??'}
          </span>
          <div className="min-w-0">
            <h2 className="truncate text-base font-bold text-[#293b37]">
              {values.fullName || 'Nuevo paciente'}
            </h2>
            <p className="mt-1 text-xs text-[#7b8985]">Paciente desde marzo de 2021</p>
          </div>
        </div>
        <span className={`inline-flex w-fit shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-xs font-semibold ${
          isIdentifierVerified
            ? 'border-[#cce7d6] bg-[#edf7f1] text-[#328057]'
            : 'border-[#e2e6e3] bg-[#f4f5f3] text-[#7b8581]'
        }`}>
          {isIdentifierVerified ? 'Paciente activa' : 'Identificador pendiente'}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-6 p-4 sm:p-6 lg:grid-cols-2">
        <section aria-labelledby="patient-personal-heading">
          <div className="mb-4 flex items-start gap-2 border-b border-[#edf1ef] pb-2.5">
            <UserRound size={16} className="text-[#25887b]" aria-hidden="true" />
            <div>
              <h3 id="patient-personal-heading" className="text-sm font-bold text-[#364743]">Información personal</h3>
              <p className="mt-1 text-xs text-[#7b8985]">Datos de identificación del paciente.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label>
              <span className={labelClassName}>RUT</span>
              <input
                required
                value={values.rut}
                onChange={(event) => onChange('rut', event.target.value)}
                placeholder="12.345.678-5"
                autoComplete="off"
                className={inputClassName}
              />
            </label>
            <label>
              <span className={labelClassName}>Nombre completo</span>
              <input
                required
                value={values.fullName}
                onChange={(event) => onChange('fullName', event.target.value)}
                placeholder="Nombre y apellidos"
                autoComplete="name"
                className={inputClassName}
              />
            </label>
            <label>
              <span className={labelClassName}>Fecha de nacimiento</span>
              <span className="relative block">
                <input
                  ref={birthDateInputRef}
                  type="date"
                  value={values.birthDate}
                  onChange={(event) => onChange('birthDate', event.target.value)}
                  className={`${inputClassName} pr-10 [&::-webkit-calendar-picker-indicator]:opacity-0`}
                />
                <button
                  type="button"
                  aria-label="Seleccionar fecha de nacimiento"
                  onClick={openBirthDatePicker}
                  className="absolute inset-y-0 right-0 grid w-10 place-items-center text-[#71807b]"
                >
                  <CalendarDays size={16} aria-hidden="true" />
                </button>
              </span>
            </label>
            <label>
              <span className={labelClassName}>Previsión de salud</span>
              <select
                value={values.healthPlan}
                onChange={(event) => onChange('healthPlan', event.target.value)}
                className={inputClassName}
              >
                <option value="">Selecciona una previsión</option>
                <option>Fonasa A</option>
                <option>Fonasa B</option>
                <option>Fonasa C</option>
                <option>Fonasa D</option>
                <option>Isapre</option>
                <option>Particular</option>
              </select>
            </label>
          </div>
        </section>

        <section aria-labelledby="patient-contact-heading">
          <div className="mb-4 flex items-start gap-2 border-b border-[#edf1ef] pb-2.5">
            <MapPin size={16} className="text-[#25887b]" aria-hidden="true" />
            <div>
              <h3 id="patient-contact-heading" className="text-sm font-bold text-[#364743]">Contacto y domicilio</h3>
              <p className="mt-1 text-xs text-[#7b8985]">Información para comunicaciones y notificaciones.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="sm:col-span-2">
              <span className={labelClassName}>Dirección</span>
              <input
                value={values.address}
                onChange={(event) => onChange('address', event.target.value)}
                placeholder="Calle, número y departamento"
                autoComplete="street-address"
                className={inputClassName}
              />
            </label>
            <label>
              <span className={labelClassName}>Comuna</span>
              <select
                value={values.commune}
                onChange={(event) => onChange('commune', event.target.value)}
                className={inputClassName}
              >
                <option value="">Selecciona una comuna</option>
                <option>Providencia</option>
                <option>Santiago</option>
                <option>Ñuñoa</option>
                <option>Las Condes</option>
                <option>La Florida</option>
                <option>Maipú</option>
              </select>
            </label>
            <label>
              <span className={labelClassName}>Teléfono principal</span>
              <input
                type="tel"
                value={values.phone}
                onChange={(event) => onChange('phone', event.target.value)}
                placeholder="+56 9 1234 5678"
                autoComplete="tel"
                className={inputClassName}
              />
            </label>
            <label className="sm:col-span-2">
              <span className={labelClassName}>Correo electrónico</span>
              <input
                type="email"
                value={values.email}
                onChange={(event) => onChange('email', event.target.value)}
                placeholder="nombre@correo.cl"
                autoComplete="email"
                className={inputClassName}
              />
            </label>
          </div>
        </section>

        <section aria-labelledby="patient-emergency-heading" className="col-span-full">
          <div className="mb-4 flex items-start gap-2 border-b border-[#edf1ef] pb-2.5">
            <Heart size={16} className="text-[#25887b]" aria-hidden="true" />
            <div>
              <h3 id="patient-emergency-heading" className="text-sm font-bold text-[#364743]">Contacto de emergencia</h3>
              <p className="mt-1 text-xs text-[#7b8985]">Persona a contactar ante una situación clínica.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <label>
              <span className={labelClassName}>Nombre del contacto</span>
              <input
                value={values.emergencyContactName}
                onChange={(event) => onChange('emergencyContactName', event.target.value)}
                placeholder="Nombre y apellidos"
                className={inputClassName}
              />
            </label>
            <label>
              <span className={labelClassName}>Parentesco</span>
              <select
                value={values.emergencyRelationship}
                onChange={(event) => onChange('emergencyRelationship', event.target.value)}
                className={inputClassName}
              >
                <option value="">Selecciona el parentesco</option>
                <option>Hermano/a</option>
                <option>Padre</option>
                <option>Madre</option>
                <option>Cónyuge</option>
                <option>Hijo/a</option>
                <option>Otro</option>
              </select>
            </label>
            <label>
              <span className={labelClassName}>Teléfono de emergencia</span>
              <input
                type="tel"
                value={values.emergencyPhone}
                onChange={(event) => onChange('emergencyPhone', event.target.value)}
                placeholder="+56 9 1234 5678"
                className={inputClassName}
              />
            </label>
          </div>
        </section>
      </div>

      <div className="flex flex-col gap-3 border-t border-[#e9efed] bg-[#fbfcfc] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p aria-live="polite" className={`inline-flex items-center gap-1.5 text-xs font-medium ${
          isIdentifierVerified ? 'text-[#328057]' : 'text-[#7b8581]'
        }`}>
          {isIdentifierVerified && <CheckCircle2 size={15} aria-hidden="true" />}
          {verificationMessage}
        </p>
        <div className="flex flex-col-reverse gap-2 sm:flex-row">
          <button
            type="button"
            onClick={onDiscard}
            className="min-h-10 rounded-lg border border-[#d6e0dd] px-4 text-sm font-semibold text-[#52615d] transition hover:bg-[#f2f6f4] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#147a72]"
          >
            Descartar cambios
          </button>
          <button
            type="submit"
            className="min-h-10 rounded-lg bg-[#147a72] px-4 text-sm font-semibold text-white transition hover:bg-[#0f625a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#147a72]"
          >
            <span className="inline-flex items-center gap-2">
              <ClipboardList size={15} aria-hidden="true" />
              Guardar información
            </span>
          </button>
        </div>
      </div>
    </form>
  )
}
