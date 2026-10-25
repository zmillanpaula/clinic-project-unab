import type {
  LoginCredentials,
  UserProfile,
} from '../types/access'
import { axiosInstance } from './axiosInstance'

type AccessApiPath =
  | 'login'

const postApi = async <T,>(
  path: AccessApiPath,
  payload: unknown,
  acceptedStatuses: number[] = [],
): Promise<Awaited<ReturnType<typeof axiosInstance.post<T>>>> => {
  return axiosInstance.post<T>(`/api/access/${path}`, payload, {
    validateStatus: (status) =>
      (status >= 200 && status < 300) || acceptedStatuses.includes(status),
  })
}

const readSuccess = <T,>(data: unknown): T => {
  if (data == null || typeof data !== 'object') {
    throw new Error('El servicio de acceso devolvió una respuesta vacía o no válida.')
  }
  return data as T
}

export const authenticateAccount = async (
  credentials: LoginCredentials,
): Promise<UserProfile | null> => {
  const response = await postApi<UserProfile>(
    'login',
    {
      ...credentials,
      email: credentials.email.trim().toLowerCase(),
    },
    [401],
  )

  if (response.status === 401) return null
  return readSuccess<UserProfile>(response.data)
}