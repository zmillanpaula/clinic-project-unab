import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import { initializeMocks } from './mocks/initialize'

async function bootstrap() {
  await initializeMocks()

  const rootElement = document.getElementById('root')
  if (!rootElement) {
    throw new Error('No se encontró el elemento #root en el documento.')
  }

  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}

void bootstrap().catch((error: unknown) => {
  console.error('No se pudo iniciar la aplicación.', error)
})
