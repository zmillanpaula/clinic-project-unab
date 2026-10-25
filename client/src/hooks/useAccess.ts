import { useState, type FormEvent } from 'react'
import { roles, type RoleId } from '../config/roles'
import { authenticateAccount } from '../services/accessService'
import type { UserProfile } from '../types/access'

type FeedbackTone = 'info' | 'error' | 'success'
type Feedback = { message: string; tone: FeedbackTone }

export function useAccess() {
  const [selectedRole, setSelectedRole] = useState<RoleId | ''>('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [feedback, setFeedback] = useState<Feedback>({ message: '', tone: 'info' })
  const [authenticatedUser, setAuthenticatedUser] = useState<UserProfile | null>(null)
  const role = roles.find((item) => item.id === selectedRole)

  function showFeedback(message: string, tone: FeedbackTone = 'info') {
    setFeedback({ message, tone })
  }

  function selectRole(roleId: RoleId) {
    setSelectedRole(roleId)
    showFeedback('')
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!role) {
      showFeedback('Selecciona un perfil para continuar.', 'error')
      return
    }

    const formData = new FormData(event.currentTarget)
    const email = String(formData.get('email') ?? '').trim().toLowerCase()
    const password = String(formData.get('password') ?? '')

    setIsSubmitting(true)

    try {
      const account = await authenticateAccount({
        email,
        password,
        roleId: role.id,
      })

      if (!account) {
        showFeedback(
          'Tus datos no coinciden. Revísalos y vuelve a ingresarlos',
          'error',
        )
        return
      }

      if (account.roleId !== 'administrador') {
        showFeedback(
          `Vista en desarrollo. El acceso para el perfil ${role.title} estará disponible próximamente en este prototipo.`,
          'info',
        )
        return
      }

      setAuthenticatedUser(account)
      showFeedback(`Acceso iniciado para ${account.name} (${role.title}).`, 'success')
    } catch (error) {
      showFeedback(
        error instanceof Error
          ? error.message
          : 'No se pudo conectar con el servicio de acceso. Inténtalo nuevamente.',
        'error',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    feedback,
    handleSubmit,
    isSubmitting,
    authenticatedUser,
    role,
    selectedRole,
    selectRole,
  }
}