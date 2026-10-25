export const ACCOUNT_SEEDS = [
  {
    name: 'maria.lopez',
    email: 'administrador@example.cl',
    password: 'AdminClave123!',
    roleId: 'administrador',
  },
  {
    name: 'maria.lopez',
    email: 'recepcionista@example.cl',
    password: 'RecepcionClave123!',
    roleId: 'recepcionista',
  },
  {
    name: 'maria.lopez',
    email: 'profesional@example.cl',
    password: 'ProfesionalClave123!',
    roleId: 'profesional-salud',
  },
  {
    name: 'maria.lopez',
    email: 'paciente@example.cl',
    password: 'PacienteClave123!',
    roleId: 'paciente',
  },
] as const