import { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { AccessForm } from '../components/access/AccessForm'
import { PasswordRecoveryModal } from '../components/access/PasswordRecoveryModal'
import { RoleSelector } from '../components/access/RoleSelector'
import { useAccess } from '../hooks/useAccess'
import type { UserProfile } from '../types/access'

type AccessViewProps = {
  onAuthenticatedUser: (user: UserProfile) => void
}

export function AccessView({ onAuthenticatedUser }: AccessViewProps) {
  const {
    feedback,
    handleSubmit,
    isSubmitting,
    authenticatedUser,
    role,
    selectedRole,
    selectRole,
  } = useAccess()
  const [showPasswordNotice, setShowPasswordNotice] = useState(false)

  useEffect(() => {
    if (authenticatedUser) onAuthenticatedUser(authenticatedUser)
  }, [authenticatedUser, onAuthenticatedUser])

  return (
    <section className="flex min-h-screen items-center justify-center bg-[#f9fbfa] px-5 py-10 sm:px-8 lg:px-10 xl:px-14">
      <div className="w-full max-w-[540px] rounded-[12px] border border-[#e0e7e8] bg-white px-6 pt-8 pb-5 shadow-[0_10px_23px_0_#213e4410] sm:px-8 sm:pt-10 sm:pb-7 lg:px-10 lg:pt-12 lg:pb-8">
        <div className="mb-7">
          <p className="mb-4 text-sm font-semibold text-[#258c7e]">BIENVENIDO</p>
          <h2 className="text-2xl font-medium text-slate-900 sm:text-3xl">
            Ingresa a tu cuenta
          </h2>
          <p className="mt-3 text-base leading-6 text-slate-600">
            Utiliza tus credenciales de Salud Integral.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <AccessForm />
          <RoleSelector selectedRole={selectedRole} onSelectRole={selectRole} />

          <button
            type="submit"
            disabled={isSubmitting || !role}
            aria-busy={isSubmitting}
            className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-md bg-[#147e72] px-4 text-base font-semibold text-white shadow-sm shadow-emerald-950/15 transition-colors hover:bg-[#0f625a] hover:shadow-md focus-visible:outline-2 focus-visible:outline-emerald-800 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <span>
              {isSubmitting
                ? 'Ingresando...'
                : role
                ? `Ingresar como ${role.title}`
                : 'Selecciona un perfil'}
            </span>
            <ArrowRight size={17} aria-hidden="true" />
          </button>

          <div className="mt-3 text-center">
            <button
              type="button"
              onClick={() => setShowPasswordNotice(true)}
              className="rounded px-1.5 py-1 text-sm font-semibold text-[#25887b] underline-offset-4 transition-colors hover:bg-emerald-50 hover:text-emerald-950 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25887b]"
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>

          {feedback.message && (
            <p
              aria-live="polite"
              role="status"
              className={`mt-3 text-center ${
                feedback.tone === 'error' ? 'text-red-700' : 'text-emerald-900'
              }`}
            >
              {feedback.message}
            </p>
          )}
        </form>
      </div>

      <PasswordRecoveryModal
        isOpen={showPasswordNotice}
        onClose={() => setShowPasswordNotice(false)}
      />
    </section>
  )
}