type PasswordRecoveryModalProps = {
  isOpen: boolean
  onClose: () => void
}

export function PasswordRecoveryModal({ isOpen, onClose }: PasswordRecoveryModalProps) {
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#020201]/40 p-4"
      role="presentation"
      onClick={onClose}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="password-notice-title"
        className="w-full max-w-md rounded-xl border border-[#e0e7e8] bg-white p-6 shadow-[0_20px_60px_rgba(15,45,50,0.18)]"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id="password-notice-title" className="text-lg font-semibold text-[#233633]">
          ¿Necesitas recuperar tu acceso?
        </h2>
        <p className="mt-3 text-sm leading-6 text-[#52615d]">
          Contacta con la administración de tu centro para solicitar el restablecimiento de tu contraseña.
        </p>
        <button
          type="button"
          onClick={onClose}
          className="mt-5 flex min-h-11 w-full items-center justify-center rounded-md bg-[#147E72] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#0F625A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#147E72]"
        >
          Entendido
        </button>
      </section>
    </div>
  )
}