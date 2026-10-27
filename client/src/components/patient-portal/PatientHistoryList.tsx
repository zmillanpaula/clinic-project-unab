import { ArrowRight, ClipboardList } from 'lucide-react'
import type { PatientHistoryEntry } from '../../types/patientPortal'

type PatientHistoryListProps = {
  entries: PatientHistoryEntry[]
  onViewAll?: () => void
}

export function PatientHistoryList({ entries, onViewAll }: PatientHistoryListProps) {
  return (
    <section className="rounded-2xl border border-[#e1e9e6] bg-white shadow-sm">
      <div className="flex items-center justify-between gap-3 border-b border-[#e9efed] px-5 py-4 sm:px-6">
        <div>
          <h2 className="text-base font-bold text-[#293b37]">Historial reciente</h2>
          <p className="mt-1 text-xs text-[#7b8985]">Tus últimas atenciones médicas</p>
        </div>
        {onViewAll && (
          <button
            type="button"
            onClick={onViewAll}
            className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-[#147a72] hover:text-[#0f625a]"
          >
            Ver todo
            <ArrowRight size={14} aria-hidden="true" />
          </button>
        )}
      </div>
      <ul className="divide-y divide-[#edf1ef] px-5 sm:px-6">
        {entries.map((entry) => (
          <li key={entry.id} className="flex items-start gap-3 py-4">
            <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-[#f1f6f4] text-[#5b8c81]">
              <ClipboardList size={17} aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-[#344440]">{entry.title}</p>
              <p className="mt-1 text-xs text-[#7b8985]">
                {entry.doctor} · {entry.specialty}
              </p>
            </div>
            <time className="ml-auto w-20 shrink-0 pt-0.5 text-right text-[11px] text-[#87938f]">
              {entry.date}
            </time>
          </li>
        ))}
      </ul>
    </section>
  )
}
