import { useState } from 'react'
import { BrandPanel } from './components/access/BrandPanel'
import { AdminView } from './views/AdminView'
import { AccessView } from './views/AccessView'
import { PatientPortalView } from './views/PatientPortalView'
import type { UserProfile } from './types/access'

function App() {
  const [authenticatedUser, setAuthenticatedUser] = useState<UserProfile | null>(null)

  if (
    authenticatedUser?.roleId === 'administrador' ||
    authenticatedUser?.roleId === 'recepcionista'
  ) {
    return (
      <AdminView
        administrator={authenticatedUser}
        onLogout={() => setAuthenticatedUser(null)}
      />
    )
  }

  if (authenticatedUser?.roleId === 'paciente') {
    return (
      <PatientPortalView
        patient={authenticatedUser}
        onLogout={() => setAuthenticatedUser(null)}
      />
    )
  }

  return (
    <main className="min-h-screen bg-[#f3f6fa] text-slate-900">
      <div
        id="inicio"
        className="grid min-h-screen grid-cols-1 min-[890px]:grid-cols-[minmax(392px,44fr)_minmax(498px,56fr)]"
      >
        <BrandPanel />
        <AccessView onAuthenticatedUser={setAuthenticatedUser} />
      </div>
    </main>
  )
}

export default App