import { House, LayoutGrid, MoreHorizontal, Pencil } from 'lucide-react'
import { StatusBadge } from './StatusBadge'
import type { ClinicalResource } from '../../types/admin'

type ResourceTableProps = {
  resources: ClinicalResource[]
  openMenuId: string | null
  onEdit: (resource: ClinicalResource) => void
  onToggleAvailability: (resource: ClinicalResource) => void
  onToggleMenu: (resourceId: string) => void
}

export function ResourceTable({
  resources,
  openMenuId,
  onEdit,
  onToggleAvailability,
  onToggleMenu,
}: ResourceTableProps) {
  return (
    <table className="w-full min-w-[820px] border-collapse text-left">
      <thead className="bg-[#f7f9f8]">
        <tr className="border-b border-[#e8eeec]">
          <th scope="col" className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-[0.04em] text-[#73817d]">
            Centro / recurso
          </th>
          <th scope="col" className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-[0.04em] text-[#73817d]">
            Ubicación / tipo
          </th>
          <th scope="col" className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-[0.04em] text-[#73817d]">
            Capacidad
          </th>
          <th scope="col" className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-[0.04em] text-[#73817d]">
            Estado
          </th>
          <th scope="col" className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-[0.04em] text-[#73817d]">
            Acciones
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-[#edf1ef]">
        {resources.map((resource) => {
          const ResourceIcon = resource.name.startsWith('Centro') ? House : LayoutGrid

          return (
            <tr key={resource.id} className="transition-colors hover:bg-[#fbfcfc]">
              <td className="px-5 py-4">
                <span className="flex items-center gap-2.5 text-[13px] font-medium text-[#2c3d39]">
                  <ResourceIcon size={16} className="shrink-0 text-[#57817a]" aria-hidden="true" />
                  <span>{resource.name}</span>
                </span>
              </td>
              <td className="px-5 py-4">
                <span className="block text-[13px] text-[#43514e]">{resource.location}</span>
              </td>
              <td className="px-5 py-4 text-[13px] text-[#43514e]">
                {resource.capacity}
              </td>
              <td className="px-5 py-4">
                <StatusBadge status={resource.status} />
              </td>
              <td className="px-5 py-4">
                <div className="relative flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => onEdit(resource)}
                    className="inline-flex min-h-8 items-center gap-1.5 rounded px-2 text-xs font-semibold text-[#26776c] transition-colors hover:bg-[#fdf6f3] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#147e72]"
                  >
                    <Pencil size={14} aria-hidden="true" />
                    Editar
                  </button>
                  <button
                    type="button"
                    aria-label={`Más opciones para ${resource.name}`}
                    aria-expanded={openMenuId === resource.id}
                    onClick={() => onToggleMenu(resource.id)}
                    className="grid size-8 place-items-center rounded text-[#73817d] transition-colors hover:bg-[#f0f4f2] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#147e72]"
                  >
                    <MoreHorizontal size={17} aria-hidden="true" />
                  </button>
                  {openMenuId === resource.id && (
                    <div className="absolute right-0 top-9 z-20 w-44 rounded-md border border-[#e8eeec] bg-white p-1 shadow-lg">
                      <button
                        type="button"
                        onClick={() => onEdit(resource)}
                        className="w-full rounded px-3 py-2 text-left text-xs font-medium text-[#354541] hover:bg-[#f4f8f6]"
                      >
                        Editar recurso
                      </button>
                      <button
                        type="button"
                        onClick={() => onToggleAvailability(resource)}
                        className="w-full rounded px-3 py-2 text-left text-xs font-medium text-[#354541] hover:bg-[#f4f8f6]"
                      >
                        {resource.status === 'Disponible' ? 'Marcar en uso' : 'Marcar disponible'}
                      </button>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          )
        })}

        {resources.length === 0 && (
          <tr>
            <td colSpan={5} className="px-5 py-12 text-center text-sm text-[#74817e]">
              No hay registros que coincidan con la búsqueda.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  )
}