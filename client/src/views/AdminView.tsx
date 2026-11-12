import { useEffect, useState } from 'react'
import { Plus } from 'lucide-react'
import { AdminHeader } from '../components/admin/AdminHeader'
import { AdminSidebar } from '../components/admin/AdminSidebar'
import { AdminTabs } from '../components/admin/AdminTabs'
import { ResourceFormModal } from '../components/admin/ResourceFormModal'
import { createResource, fetchResources, updateResource } from '../services/resourcesService'
import type { UserProfile } from '../types/access'
import type { AdminTab, ClinicalResource } from '../types/admin'
import { CentersAndBoxesView } from './admin/CentersAndBoxesView'

interface AdminViewProps {
  administrator: UserProfile
  onLogout: () => void
}

export function AdminView({ administrator, onLogout }: AdminViewProps) {
  const [activeTab, setActiveTab] = useState<AdminTab>('Centros y box')
  const [resources, setResources] = useState<ClinicalResource[]>([])
  const [loadError, setLoadError] = useState<string | null>(null)
  const [editingResource, setEditingResource] = useState<ClinicalResource | null>(null)
  const [isEditorOpen, setIsEditorOpen] = useState(false)

  useEffect(() => {
    fetchResources()
      .then(setResources)
      .catch((error: Error) => setLoadError(error.message))
  }, [])

  function closeEditor() {
    setIsEditorOpen(false)
    setEditingResource(null)
  }

  function openCreatingDialog() {
    setEditingResource(null)
    setIsEditorOpen(true)
  }

  function openEditingDialog(resource: ClinicalResource) {
    setEditingResource(resource)
    setIsEditorOpen(true)
  }

  async function handleSubmitResource(resourceData: Omit<ClinicalResource, 'id'>) {
    try {
      if (editingResource) {
        const updated = await updateResource(editingResource.id, resourceData)
        setResources((current) => current.map((item) => (item.id === updated.id ? updated : item)))
      } else {
        const created = await createResource(resourceData)
        setResources((current) => [created, ...current])
      }
      closeEditor()
    } catch (error) {
      alert((error as Error).message)
    }
  }

  async function toggleAvailability(resource: ClinicalResource) {
    const status = resource.status === 'Disponible' ? 'En uso' : 'Disponible'
    try {
      const updated = await updateResource(resource.id, { status })
      setResources((current) => current.map((item) => (item.id === updated.id ? updated : item)))
    } catch (error) {
      alert((error as Error).message)
    }
  }

  return (
    <div className="min-h-screen bg-[#f3f6fa] text-[#283432] lg:pl-[280px]">
      <AdminSidebar administrator={administrator} onLogout={onLogout} />

      <div className="min-h-screen">
        <AdminHeader />

        <main className="mx-auto max-w-[1440px] px-5 py-7 sm:px-9 sm:py-8 lg:px-10 lg:py-9">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold tracking-[0.13em] text-[#147a72]">
                ADMINISTRACIÓN
              </p>
              <h1 className="mt-1 text-2xl font-normal leading-tight text-[#283432] sm:text-[32px]">
                Estructura clínica
              </h1>
              <p className="mt-2 text-sm text-[#4d5867]">
                Gestiona centros, recursos y equipos profesionales.
              </p>
            </div>

            {activeTab === 'Centros y box' && (
              <button
                type="button"
                onClick={openCreatingDialog}
                className="inline-flex min-h-[41px] shrink-0 items-center justify-center gap-2 rounded-md bg-[#147a72] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#0f625a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#147a72]"
              >
                <Plus size={17} aria-hidden="true" />
                Agregar recurso
              </button>
            )}
          </div>

          <AdminTabs activeTab={activeTab} onSelectTab={setActiveTab} />

          {loadError && (
            <p className="mt-6 rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {loadError}
            </p>
          )}

          {activeTab === 'Centros y box' && (
            <CentersAndBoxesView
              key={resources.length}
              resources={resources}
              onEditResource={openEditingDialog}
              onToggleAvailability={toggleAvailability}
            />
          )}

          {activeTab !== 'Centros y box' && (
            <section className="relative mt-6 rounded-lg border border-[#deded5] bg-white px-5 py-12 text-center">
              <p className="text-sm font-medium text-[#4d5730]">
                Módulo en desarrollo
              </p>
            </section>
          )}
        </main>
      </div>

      <ResourceFormModal
        isOpen={isEditorOpen}
        editingResource={editingResource}
        onClose={closeEditor}
        onSubmit={handleSubmitResource}
      />
    </div>
  )
}