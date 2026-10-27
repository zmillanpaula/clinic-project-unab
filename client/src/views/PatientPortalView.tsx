import { useState } from 'react'
import { CalendarCheck2, CalendarDays, HeartPulse, LockKeyhole, Plus } from 'lucide-react'
import { INITIAL_PATIENT_APPOINTMENT, PATIENT_HISTORY } from '../constants/patientPortal'
import { PatientAppointmentCard } from '../components/patient-portal/PatientAppointmentCard'
import { PatientBookingDialog, type AppointmentRequest } from '../components/patient-portal/PatientBookingDialog'
import { PatientHistoryList } from '../components/patient-portal/PatientHistoryList'
import { PatientPortalHeader } from '../components/patient-portal/PatientPortalHeader'
import type { PatientAppointment, PatientPortalTab } from '../types/patientPortal'
import type { UserProfile } from '../types/access'

type PatientPortalViewProps = {
  patient: UserProfile
  onLogout: () => void
}

export function PatientPortalView({ patient, onLogout }: PatientPortalViewProps) {
  const [activeTab, setActiveTab] = useState<PatientPortalTab>('inicio')
  const [appointment, setAppointment] = useState(INITIAL_PATIENT_APPOINTMENT)
  const [isBookingOpen, setIsBookingOpen] = useState(false)

  const patientName = patient.name.replace(/[._]+/g, ' ').trim()
  const firstName = patientName.split(/\s+/)[0] ?? 'Paciente'

  function handleBookingSubmit(request: AppointmentRequest) {
    const newAppointment: PatientAppointment = {
      ...appointment,
      id: `appointment-${Date.now()}`,
      date: request.date,
      time: request.time,
      specialty: request.specialty,
      status: 'Confirmada',
    }
    setAppointment(newAppointment)
    setIsBookingOpen(false)
    setActiveTab('reservas')
  }

  function handleCancelAppointment() {
    if (window.confirm('¿Quieres cancelar esta hora médica?')) {
      setAppointment((currentAppointment) => ({ ...currentAppointment, status: 'Cancelada' }))
    }
  }

  return (
    <div className="min-h-screen bg-[#f1f5f4] px-3 py-4 text-[#283432] sm:px-6 sm:py-7 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-2rem)] max-w-[1440px] flex-col overflow-hidden rounded-2xl border border-[#e4ebe9] bg-white shadow-[0_18px_55px_rgba(27,57,51,0.08)] sm:min-h-[calc(100vh-3.5rem)]">
        <PatientPortalHeader
          patientName={patientName}
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          onLogout={onLogout}
        />

      <main className="mx-auto w-full max-w-[1280px] flex-1 px-5 py-7 sm:px-8 sm:py-9 lg:px-10">
        {activeTab === 'inicio' && (
          <>
            <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-col justify-center">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#0f625a]">MI SALUD</p>
                <h1 className="mt-1 text-3xl font-bold leading-tight text-[#263a37] sm:text-4xl">
                  Hola, {firstName}
                </h1>
                <p className="mt-2 text-sm text-[#71807b]">Todo listo para tu próxima atención.</p>
              </div>
              <button
                type="button"
                onClick={() => setIsBookingOpen(true)}
                className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 self-start rounded-lg bg-[#147a72] px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0f625a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#147a72] sm:self-auto"
              >
                <CalendarDays size={17} aria-hidden="true" />
                + Reservar una hora
              </button>
            </div>

            <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
              <PatientAppointmentCard
                appointment={appointment}
                onReschedule={() => setIsBookingOpen(true)}
                onCancel={handleCancelAppointment}
              />
              <div className="space-y-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <article className="flex items-center gap-3 rounded-2xl border border-[#e1e9e6] bg-white p-4 shadow-sm">
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-[#edf6f3] text-[#147a72]">
                      <CalendarCheck2 size={20} aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-xl font-bold text-[#293b37]">12</p>
                      <p className="text-xs text-[#71807b]">Atenciones realizadas</p>
                    </div>
                  </article>
                  <article className="flex items-center gap-3 rounded-2xl border border-[#e1e9e6] bg-white p-4 shadow-sm">
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-[#f8eff1] text-[#b05d70]">
                      <HeartPulse size={20} aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-xl font-bold text-[#293b37]">3</p>
                      <p className="text-xs text-[#71807b]">Especialidades</p>
                    </div>
                  </article>
                </div>
                <PatientHistoryList
                  entries={PATIENT_HISTORY}
                  onViewAll={() => setActiveTab('historial')}
                />
              </div>
            </div>
          </>
        )}

        {activeTab === 'reservas' && (
          <section>
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.13em] text-[#147a72]">AGENDA</p>
                <h1 className="mt-1 text-3xl font-semibold text-[#263a37]">Mis reservas</h1>
                <p className="mt-2 text-sm text-[#71807b]">Consulta y administra tus próximas atenciones.</p>
              </div>
              <button
                type="button"
                onClick={() => setIsBookingOpen(true)}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#147a72] px-4 text-sm font-semibold text-white hover:bg-[#0f625a]"
              >
                <Plus size={17} aria-hidden="true" />
                Reservar una hora
              </button>
            </div>
            <div className="max-w-2xl">
              <PatientAppointmentCard
                appointment={appointment}
                onReschedule={() => setIsBookingOpen(true)}
                onCancel={handleCancelAppointment}
              />
            </div>
          </section>
        )}

        {activeTab === 'historial' && (
          <section>
            <div className="mb-6">
              <p className="text-xs font-bold uppercase tracking-[0.13em] text-[#147a72]">ATENCIONES</p>
              <h1 className="mt-1 text-3xl font-semibold text-[#263a37]">Historial médico</h1>
              <p className="mt-2 text-sm text-[#71807b]">Revisa tus consultas y controles anteriores.</p>
            </div>
            <PatientHistoryList entries={PATIENT_HISTORY} />
          </section>
        )}
      </main>

      <footer className="mx-auto w-full max-w-[1280px] px-5 pb-6 text-center text-xs text-[#8a9692] sm:px-8 lg:px-10">
        <span className="inline-flex items-center gap-1.5">
          <LockKeyhole size={13} aria-hidden="true" />
          Tu información de salud está protegida.
        </span>
      </footer>
      </div>

      <PatientBookingDialog
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        onSubmit={handleBookingSubmit}
      />
    </div>
  )
}
