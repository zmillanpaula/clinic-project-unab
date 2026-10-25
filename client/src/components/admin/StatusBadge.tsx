import type { ResourceStatus } from '../../types/admin'

const statusStyles: Record<ResourceStatus, string> = {
  Operativo: 'bg-emerald-50 text-emerald-800 ring-emerald-700/20',
  Disponible: 'bg-[#de7f4f1] text-[#147e72] ring-[#147e72]/10',
  'En uso': 'bg-sky-50 text-sky-800 ring-sky-700/10',
  Mantención: 'bg-amber-50 text-amber-800 ring-amber-700/20',
}

type StatusBadgeProps = {
  status: ResourceStatus
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ring-inset ${statusStyles[status]}`}>
      {status}
    </span>
  )
}