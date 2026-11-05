import type { FormEvent } from 'react'
import { Search } from 'lucide-react'

type PatientSearchProps = {
  rut: string
  onRutChange: (rut: string) => void
  onSearch: () => void
}

export function PatientSearch({
  rut,
  onRutChange,
  onSearch,
}: PatientSearchProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onSearch()
  }

  return (
    <section
      aria-label="Buscar paciente"
      className="rounded-xl border border-[#e1e9e6] bg-white p-4 shadow-sm sm:p-5"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
        <div className="flex min-w-0 items-start gap-3">
          <Search
            size={18}
            aria-hidden="true"
            className="mt-0.5 shrink-0 text-[#147a72]"
          />
          <div>
            <p className="text-sm font-semibold text-[#334541]">
              Buscar paciente por RUT
            </p>
            <p className="mt-1 text-xs text-[#778681]">
              Verificaremos el identificador para evitar registros duplicados.
            </p>
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex h-11 w-full min-w-0 items-center overflow-hidden rounded-lg border border-[#d6e0dd] bg-white transition focus-within:border-[#25887b] focus-within:ring-4 focus-within:ring-[#25887b]/10 sm:max-w-[600px] sm:flex-1"
        >
          <div className="relative min-w-0 flex-1">
            <Search
              size={17}
              aria-hidden="true"
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#899590]"
            />
            <input
              id="patient-rut-search"
              type="search"
              value={rut}
              onChange={(event) => onRutChange(event.target.value)}
              placeholder="18.245.620-7"
              aria-label="Buscar paciente por RUT"
              autoComplete="off"
              className="h-11 w-full border-0 bg-transparent pl-10 pr-3.5 text-sm text-[#283432] outline-none placeholder:text-[#9aa5a1] focus:ring-0"
            />
          </div>
          <button
            type="submit"
            className="inline-flex h-full shrink-0 items-center justify-center rounded-r-lg bg-[#147a72] px-4 text-sm font-semibold text-white transition hover:bg-[#0f625a] focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-white sm:px-5"
          >
            Buscar
          </button>
        </form>
      </div>
    </section>
  )
}
