import { useState } from 'react'
import { Eye, EyeOff, LockKeyhole, UserRound } from 'lucide-react'
import { USERNAME_PLACEHOLDER } from '../../constants/access'

export function AccessForm() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="mt-6 space-y-4">
      <label className="block">
        <span className="mb-2 block text-base font-medium text-slate-800">
          Usuario
        </span>
        <span className="relative block">
          <UserRound
            size={17}
            aria-hidden="true"
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
          />
          <input
            type="text"
            name="email"
            autoComplete="username"
            placeholder={USERNAME_PLACEHOLDER}
            required
            className="h-[50px] w-full rounded-[10px] border border-[#cbd8dc] bg-white pl-11 pr-5 text-base text-slate-900 outline-none placeholder:text-slate-500 focus:border-[#d1f897e] focus:shadow-[0_0_0_3px_rgba(63,137,126,0.12)]"
          />
        </span>
      </label>

      <label className="block">
        <span className="mb-2 block text-base font-medium text-slate-800">Contraseña</span>
        <span className="relative block">
          <LockKeyhole
            size={17}
            aria-hidden="true"
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
          />
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            autoComplete="current-password"
            placeholder="Introduce tu contraseña"
            required
            className="h-[50px] w-full rounded-[10px] border border-[#cbd8dc] bg-white pl-11 pr-12 text-base text-slate-900 outline-none placeholder:text-slate-500 focus:border-[#d1f897e] focus:shadow-[0_0_0_3px_rgba(63,137,126,0.12)]"
          />
          <button
            type="button"
            aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            aria-pressed={showPassword}
            onClick={() => setShowPassword((visible) => !visible)}
            className="absolute right-2 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded text-emerald-900 transition-colors hover:bg-emerald-100 focus-visible:outline focus-visible:outline-offset-1 focus-visible:outline-emerald-700"
          >
            {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
          </button>
        </span>
      </label>
    </div>
  )
}