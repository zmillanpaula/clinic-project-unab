import { Heart, LogOut } from 'lucide-react'
import type { PatientPortalTab } from '../../types/patientPortal'

type PatientPortalHeaderProps = {
  patientName: string
  activeTab: PatientPortalTab
  onSelectTab: (tab: PatientPortalTab) => void
  onLogout: () => void
}

const navigation: Array<{ id: PatientPortalTab; label: string }> = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'reservas', label: 'Mis reservas' },
  { id: 'historial', label: 'Historial' },
]

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toLocaleUpperCase('es') ?? '')
    .join('')
}

export function PatientPortalHeader({
  patientName,
  activeTab,
  onSelectTab,
  onLogout,
}: PatientPortalHeaderProps) {
  return (
    <header className="border-b border-[#e4ebe9] bg-white">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-5 py-4 sm:px-8 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:px-10">
        <div className="flex items-center gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#147a72] text-white">
            <Heart size={20} aria-hidden="true" />
          </span>
          <span className="text-base font-semibold text-[#263a37]">
            Salud <strong className="text-[#147a72]">Integral</strong>
          </span>
        </div>

        <nav aria-label="Navegación del portal" className="flex gap-1 overflow-x-auto lg:justify-self-center">
          {navigation.map(({ id, label }) => {
            const isActive = activeTab === id
            return (
              <button
                key={id}
                type="button"
                aria-current={isActive ? 'page' : undefined}
                onClick={() => onSelectTab(id)}
                className={`inline-flex min-h-10 shrink-0 items-center rounded-lg px-3 text-sm font-medium transition ${
                  isActive
                    ? 'bg-[#edf6f3] text-[#147a72]'
                    : 'text-[#6e7d79] hover:bg-[#f5f8f7] hover:text-[#344440]'
                }`}
              >
                {label}
              </button>
            )
          })}
        </nav>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3 lg:justify-self-end">
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#DCEBED] text-xs font-bold text-[#35616B]">
              {getInitials(patientName)}
            </span>
            <span className="min-w-0">
              <span className="block max-w-[150px] truncate text-xs font-semibold text-[#344440]">
                {patientName}
              </span>
              <span className="block text-[11px] text-[#7b8985]">Paciente</span>
            </span>
          </div>
          <button
            type="button"
            onClick={onLogout}
            aria-label="Cerrar sesión"
            title="Cerrar sesión"
            className="grid size-9 place-items-center rounded-lg text-[#71807b] transition hover:bg-[#f5f8f7] hover:text-[#344440] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#147a72]"
          >
            <LogOut size={16} aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  )
}
