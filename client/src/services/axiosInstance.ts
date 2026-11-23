import axios from 'axios'

const baseURL = typeof window === 'undefined' ? 'http://localhost' : window.location.origin

export const axiosInstance = axios.create({
  baseURL,
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Guarda (o borra) el token de sesión: desde aquí, cada pedido lo envía solo
export function setAuthToken(token: string | null) {
  if (token) {
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`
  } else {
    delete axiosInstance.defaults.headers.common.Authorization
  }
}

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (!axios.isAxiosError(error)) return Promise.reject(error)

    const responseData = error.response?.data as { error?: unknown } | undefined
    if (typeof responseData?.error === 'string') {
      return Promise.reject(new Error(responseData.error))
    }

    if (error.response) {
      return Promise.reject(
        new Error(
          `El servicio de acceso respondió con HTTP ${error.response.status} y un cuerpo vacío o no válido.`,
        ),
      )
    }

    return Promise.reject(new Error('No se pudo conectar con el servicio. Inténtalo nuevamente.'))
  },
)