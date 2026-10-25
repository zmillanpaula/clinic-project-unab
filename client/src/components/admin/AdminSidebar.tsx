import {
  Activity,
  Calendar,
  Heart,
  House,
  LayoutGrid,
  LogOut,
  Settings,
  Stethoscope,
  UsersRound,
} from 'lucide-react'
import type { UserProfile } from '../../types/access'

type AdminSidebarProps = {
  administrator: UserProfile
  onLogout: () => void
}

const clinicalNavigation = [
  { label: 'Inicio', Icon: House },
  { label: 'Agenda', Icon: Calendar },
  { label: 'Pacientes', Icon: UsersRound },
  { label: 'Profesionales', Icon: Stethoscope },
  { label: 'Centros y box', Icon: LayoutGrid },
  { label: 'Reportes', Icon: Activity },
]

function normalizedName(name: string) {
  return name.trim().replace(/[._]+/g, ' ').replace(/\s+/g, ' ')
}

function initials(name: string) {
  return normalizedName(name)
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}

function displayUserName(name: string) {
  return normalizedName(name).toUpperCase()
}

export function AdminSidebar({ administrator, onLogout }: AdminSidebarProps) {
  return (
    <aside className="flex flex-col bg-[#073b36] px-4 py-4 text-white lg:fixed lg:inset-y-0 lg:left-0 lg:w-[260px] lg:px-4 lg:py-5">
      <div className="flex items-center gap-3 px-3 pb-4 lg:border-b lg:border-white/10 lg:pb-5">
        <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-white/12 text-[#8ee2d2]">
          <Heart size={21} aria-hidden="true" />
        </span>
        <span className="min-w-0">
          <span className="block text-base leading-5">
            Salud <strong className="font-bold text-[#8ee2d2]">Integral</strong>
          </span>
          <span className="block text-[11px] text-white/60">Gestión clínica</span>
        </span>
      </div>

      <nav aria-label="Navegación administrativa" className="mt-4 lg:mt-6 lg:flex-1">
        <span className="hidden px-3 text-[10px] font-bold uppercase tracking-[0.12em] text-white/45 lg:block">
          Gestión clínica
        </span>
        <div className="mt-2 grid grid-cols-2 gap-1 sm:grid-cols-3 lg:flex lg:flex-col">
          {clinicalNavigation.map(({ label, Icon }) => {
            const isActive = label === 'Centros y box'
            return (
              <button
                key={label}
                type="button"
                aria-current={isActive ? 'page' : undefined}
                className={`flex min-h-10 items-center gap-3 rounded-md px-3 text-left text-[13px] font-medium transition-colors ${
                  isActive
                    ? 'bg-white/12 text-white'
                    : 'text-white/70 hover:bg-white/8 hover:text-white'
                }`}
              >
                <Icon size={17} strokeWidth={1.8} aria-hidden="true" />
                <span>{label}</span>
              </button>
            )
          })}
        </div>

        <span className="mt-4 hidden px-3 text-[10px] font-bold uppercase tracking-[0.12em] text-white/45 lg:block">
          Sistema
        </span>
        <div className="mt-2 grid grid-cols-2 gap-1 sm:grid-cols-3 lg:flex lg:flex-col">
          <button
            type="button"
            className="flex min-h-10 items-center gap-3 rounded-md px-3 text-left text-[13px] font-medium text-white/70 transition-colors hover:bg-white/8 hover:text-white"
          >
            <Settings size={17} strokeWidth={1.8} aria-hidden="true" />
            <span>Configuración</span>
          </button>
        </div>
      </nav>

      <div className="mt-4 flex gap-3 border-t border-white/10 pt-4 lg:mt-5">
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white/12 text-sm font-semibold text-[#8ee2d2]">
          {initials(administrator.name)}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[13px] font-semibold">
            {displayUserName(administrator.name)}
          </span>
          <span className="block text-xs text-white/55">Administrador</span>
        </span>
        <button
          type="button"
          onClick={onLogout}
          aria-label="Cerrar sesión"
          title="Cerrar sesión"
          className="grid size-9 shrink-0 place-items-center rounded-md text-white/65 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8ee2d2]"
        >
          <LogOut size={16} aria-hidden="true" />
        </button>
      </div>
    </aside>
  )
}