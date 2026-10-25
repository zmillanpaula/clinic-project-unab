import { ChevronDown } from 'lucide-react'
import { roles, type RoleId } from '../../config/roles'

type RoleSelectorProps = {
  selectedRole: RoleId | ''
  onSelectRole: (roleId: RoleId) => void
}

export function RoleSelector({ selectedRole, onSelectRole }: RoleSelectorProps) {
  return (
    <label className="mt-6 block">
      <span className="mb-2 block text-base font-medium text-slate-800">
        Perfil de acceso
      </span>
      <span className="relative block">
        <select
          className="h-[50px] w-full appearance-none rounded-[10px] border border-[#cbd8dc] bg-white pl-5 pr-12 text-base text-slate-900 outline-none focus:border-[#3f897e] focus:shadow-[0_0_0_3px_rgba(63,137,126,0.12)]"
          name="role"
          value={selectedRole}
          onChange={(event) => onSelectRole(event.currentTarget.value as RoleId)}
          required
        >
          <option value="" disabled>
            Seleccione un perfil
          </option>
          {roles.map(({ id, title }) => (
            <option key={id} value={id}>
              {title}
            </option>
          ))}
        </select>
        <ChevronDown
          size={17}
          aria-hidden="true"
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
        />
      </span>
    </label>
  )
}