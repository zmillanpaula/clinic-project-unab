import type { FormEvent } from 'react'
import { X } from 'lucide-react'
import type { ClinicalResource, ResourceStatus } from '../../types/admin'

type ResourceFormModalProps = {
  isOpen: boolean
  editingResource: ClinicalResource | null
  onClose: () => void
  onSubmit: (resource: Omit<ClinicalResource, 'id'>) => void
}

const resourceStatuses: ResourceStatus[] = ['Operativo', 'Disponible', 'En uso', 'Mantención']

export function ResourceFormModal({
  isOpen,
  editingResource,
  onClose,
  onSubmit,
}: ResourceFormModalProps) {
  if (!isOpen) return null

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const status = resourceStatuses.find((value) => value === formData.get('status'))

    if (!status) {
      const statusField = event.currentTarget.elements.namedItem('status')
      if (statusField instanceof HTMLSelectElement) {
        statusField.setCustomValidity('Selecciona un estado válido.')
        statusField.reportValidity()
      }
      return
    }

    onSubmit({
      name: String(formData.get('name') ?? '').trim(),
      location: String(formData.get('location') ?? '').trim(),
      capacity: String(formData.get('capacity') ?? '').trim(),
      status: status as ResourceStatus,
    })
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#020201]/40 p-4"
      role="presentation"
      onClick={onClose}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="resource-dialog-title"
        className="w-full max-w-lg rounded-lg border border-[#e0e7e8] bg-white p-5 shadow-[0_20px_60px_rgba(15,45,50,0.18)] sm:p-6"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id="resource-dialog-title" className="text-lg font-semibold text-[#263a37]">
              {editingResource ? 'Editar recurso' : 'Agregar recurso'}
            </h2>
            <p className="mt-1 text-sm text-[#71807d]">Completa los datos del centro o box.</p>
          </div>
          <button
            type="button"
            aria-label="Cerrar ventana"
            onClick={onClose}
            className="grid size-8 place-items-center rounded-text-[#71807d] hover:bg-[#f2f6f4]"
          >
            <X size={17} aria-hidden="true" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="block sm:col-span-2">
            <span className="mb-1.5 block text-xs font-semibold text-[#43514e]">Nombre del recurso</span>
            <input
              type="text"
              name="name"
              required
              defaultValue={editingResource?.name ?? ''}
              className="h-10 w-full rounded-md border border-[#d6e0dd] px-3 text-sm outline-none focus:border-[#3f897e] focus:shadow-[0_0_0_3px_rgba(63,137,126,0.1)]"
            />
          </label>

          <label className="block sm:col-span-2">
            <span className="mb-1.5 block text-xs font-semibold text-[#43514e]">Ubicación</span>
            <input
              type="text"
              name="location"
              required
              defaultValue={editingResource?.location ?? ''}
              className="h-10 w-full rounded-md border border-[#d6e0dd] px-3 text-sm outline-none focus:border-[#3f897e] focus:shadow-[0_0_0_3px_rgba(63,137,126,0.1)]"
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold text-[#43514e]">Capacidad</span>
            <input
              type="text"
              name="capacity"
              required
              defaultValue={editingResource?.capacity ?? ''}
              className="h-10 w-full rounded-md border border-[#d6e0dd] px-3 text-sm outline-none focus:border-[#3f897e] focus:shadow-[0_0_0_3px_rgba(63,137,126,0.1)]"
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold text-[#43514e]">Estado</span>
            <select
              name="status"
              defaultValue={editingResource?.status ?? 'Disponible'}
              onChange={(event) => event.currentTarget.setCustomValidity('')}
              className="h-10 w-full rounded-md border border-[#d6e0dd] bg-white px-3 text-sm outline-none focus:border-[#3f897e] focus:shadow-[0_0_0_3px_rgba(63,137,126,0.1)]"
            >
              {resourceStatuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </label>

          <div className="flex justify-end gap-2 pt-2 sm:col-span-2">
            <button
              type="button"
              onClick={onClose}
              className="min-h-10 rounded-md border border-[#d6e0dd] px-3.5 text-sm font-semibold text-[#52615d] hover:bg-[#f6f8f7]"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="min-h-10 rounded-md bg-[#147e72] px-4 text-sm font-semibold text-white hover:bg-[#0f625a]"
            >
              Guardar
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}