import { LockKeyhole, UserRound } from 'lucide-react'
import type { PatientRecord } from '../../types/patient'

type PatientListProps = {
  patients: PatientRecord[]
  selectedPatientId: string | null
  onSelectPatient: (patient: PatientRecord) => void
}

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toLocaleUpperCase('es') ?? '')
    .join('')
}

export function PatientList({
  patients,
  selectedPatientId,
  onSelectPatient,
}: PatientListProps) {
  return (
    <section className="overflow-hidden rounded-xl border border-[#e1e9e6] bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-[#e9efed] px-4 py-4 sm:px-5">
        <div className="flex items-center gap-2.5">
          <h2 className="text-xs font-bold tracking-[0.1em] text-[#7b8985]">RESULTADOS</h2>
          <span className="rounded-full bg-[#eef5f3] px-2.5 py-1 text-xs font-semibold text-[#23786d]">
            {patients.length}
          </span>
        </div>
        <div className="flex items-center">
          <span className="text-xs font-medium text-[#147a72]">
            Filtros
          </span>
        </div>
      </div>

      <ul className="max-h-[660px] divide-y divide-[#edf1ef] overflow-y-auto">
        {patients.map((patient) => {
          const isSelected = patient.id === selectedPatientId
          return (
            <li key={patient.id}>
              <button
                type="button"
                onClick={() => onSelectPatient(patient)}
                aria-current={isSelected ? 'true' : undefined}
                className={`flex w-full items-center gap-3 border-l-4 px-3 py-4 text-left transition-colors sm:px-4 ${
                  isSelected
                    ? 'border-[#147a72] bg-[#f0f7f5]'
                    : 'border-transparent hover:bg-[#f8faf9]'
                }`}
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#DCEBED] text-sm font-bold text-[#35616B]">
                  {patient.initials ?? getInitials(patient.fullName)}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold text-[#344440]">
                    {patient.fullName}
                  </span>
                  <span className="mt-1 block text-xs text-[#788681]">{patient.rut}</span>
                </span>
                <span
                  role="img"
                  aria-label={patient.status}
                  className={`size-2 shrink-0 rounded-full ${
                    patient.status === 'Activo' ? 'bg-[#48a36c]' : 'bg-slate-400'
                  }`}
                />
              </button>
            </li>
          )
        })}
        {patients.length === 0 && (
          <li className="px-5 py-10 text-center">
            <span className="mx-auto grid size-10 place-items-center rounded-full bg-[#f1f5f4] text-[#82918c]">
              <UserRound size={19} aria-hidden="true" />
            </span>
            <p className="mt-3 text-sm font-semibold text-[#52615d]">Sin coincidencias</p>
            <p className="mt-1 text-xs text-[#87938f]">Prueba con otro RUT o registra un paciente nuevo.</p>
          </li>
        )}
      </ul>
      <div className="border-t border-[#e9efed] p-3 sm:p-4">
        <div className="flex items-start gap-2 rounded-lg border border-[#e5ebe8] bg-[#fafcfb] px-3 py-2.5 text-xs leading-5 text-[#7b8985]">
          <LockKeyhole size={14} aria-hidden="true" className="mt-0.5 shrink-0" />
          <p>Los registros con historial clínico no pueden eliminarse.</p>
        </div>
      </div>
    </section>
  )
}
