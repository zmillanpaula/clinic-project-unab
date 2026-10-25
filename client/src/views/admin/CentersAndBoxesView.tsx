import { useMemo, useState } from 'react'
import { Pagination } from '../../components/admin/Pagination'
import { ResourceTable } from '../../components/admin/ResourceTable'
import { ADMIN_PAGE_SIZE } from '../../constants/admin'
import type { ClinicalResource } from '../../types/admin'

interface CentersAndBoxesViewProps {
  resources: ClinicalResource[]
  onEditResource: (resource: ClinicalResource) => void
  onToggleAvailability: (resource: ClinicalResource) => void
}

export function CentersAndBoxesView({
  resources,
  onEditResource,
  onToggleAvailability,
}: CentersAndBoxesViewProps) {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [openMenuId, setOpenMenuId] = useState<string | null>(null)

  const filteredResources = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase('es')
    return resources.filter((resource) =>
      `${resource.name} ${resource.location} ${resource.status}`.toLocaleLowerCase('es').includes(normalizedSearch),
    )
  }, [resources, search])

  const pageCount = Math.max(1, Math.ceil(filteredResources.length / ADMIN_PAGE_SIZE))
  const currentPage = Math.min(page, pageCount)
  const visibleResources = filteredResources.slice(
    (currentPage - 1) * ADMIN_PAGE_SIZE,
    currentPage * ADMIN_PAGE_SIZE,
  )

  return (
    <section id="centros" aria-label="Centros y box" className="mt-6">
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <div>
            <h2 className="font-semibold text-slate-900">Centros y boxes</h2>
            <p className="mt-1 text-sm text-slate-500">Administra los espacios de atención clínica.</p>
          </div>
          <label className="sr-only" htmlFor="resource-search">Buscar recursos</label>
          <input
            id="resource-search"
            type="search"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value)
              setPage(1)
            }}
            placeholder="Buscar en registros"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-teal-600 sm:max-w-xs"
          />
        </div>
        <ResourceTable
          resources={visibleResources}
          openMenuId={openMenuId}
          onEdit={onEditResource}
          onToggleAvailability={onToggleAvailability}
          onToggleMenu={(resourceId) =>
            setOpenMenuId((currentId) => currentId === resourceId ? null : resourceId)
          }
        />
        <Pagination
          visibleResults={visibleResources.length}
          totalResults={filteredResources.length}
          currentPage={currentPage}
          pageCount={pageCount}
          onPageChange={setPage}
        />
      </div>
    </section>
  )
}
