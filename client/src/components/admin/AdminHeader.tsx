import { ChevronDown, MapPin, ShieldCheck } from 'lucide-react'

type AdminHeaderProps = {
  roleTitle: 'Administrador' | 'Recepcionista'
}

export function AdminHeader({ roleTitle }: AdminHeaderProps) {
  return (
    <header className="flex min-h-[68px] flex-col justify-center gap-3 border-b border-[#e4ebe9] bg-white px-5 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
      <button
        type="button"
        className="flex w-fit items-center gap-2.5 rounded-md text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#147e72]"
      >
        <span className="grid size-9 place-items-center rounded-md bg-[#edf5f3] text-[#147e72]">
          <MapPin size={17} aria-hidden="true" />
        </span>
        <span>
          <span className="block text-[10px] font-medium tracking-wide text-slate-500">
            centro actual
          </span>
          <span className="mt-0.5 flex items-center gap-1 text-sm font-semibold text-[#263a37]">
            Centro Médico Providencia
            <ChevronDown size={14} className="text-slate-500" aria-hidden="true" />
          </span>
        </span>
      </button>

      <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#dce9e5] bg-[#f5faf8] px-3 py-1.5 text-xs font-semibold text-[#176b5f]">
        <ShieldCheck size={14} aria-hidden="true" />
        {roleTitle}
      </span>
    </header>
  )
}