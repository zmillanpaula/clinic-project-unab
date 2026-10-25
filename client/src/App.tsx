import { useState } from 'react'
import { BrandPanel } from './components/access/BrandPanel'
import { AdminView } from './views/AdminView'
import { AccessView } from './views/AccessView'
import type { UserProfile } from './types/access'

function App() {
  const [authenticatedUser, setAuthenticatedUser] = useState<UserProfile | null>(null)

  if (authenticatedUser?.roleId === 'administrador') {
    return (
      <AdminView
        administrator={authenticatedUser}
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