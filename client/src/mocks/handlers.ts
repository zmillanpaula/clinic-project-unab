import { http, HttpResponse } from 'msw'
import { ACCOUNT_SEEDS } from '../constants/accountSeeds'
import { createPasswordSalt, hashPassword } from '../utils/passwordHash'
import type {
  AccountRecord,
  LoginCredentials,
} from '../types/access'

const accounts: AccountRecord[] = []
let seedPromise: Promise<void> | undefined

async function ensureAccounts() {
  if (!seedPromise) {
    seedPromise = Promise.all(
      ACCOUNT_SEEDS.map(async ({ password, ...profile }) => {
        const passwordSalt = createPasswordSalt()
        const passwordHash = await hashPassword(password, passwordSalt)
        return { ...profile, passwordHash, passwordSalt }
      }),
    ).then((seededAccounts) => {
      accounts.push(...seededAccounts)
    })
  }

  await seedPromise
}

export function resetAccounts() {
  accounts.length = 0
  seedPromise = undefined
}

function findAccountByUsername(username: string, roleId: string) {
  const identifier = username.trim().toLowerCase()
  return accounts.find((account) => {
    const emailUsername = account.email.split('@')[0]?.toLowerCase()
    return (
      account.roleId === roleId &&
      (account.email === identifier || emailUsername === identifier ||
        account.name.trim().toLowerCase() === identifier)
    )
  })
}

function toUserProfile(account: AccountRecord) {
  return {
    email: account.email,
    name: account.name,
    roleId: account.roleId,
  }
}

export const handlers = [
  http.post('/api/access/login', async ({ request }) => {
    await ensureAccounts()
    const credentials = (await request.json()) as LoginCredentials
    const email = credentials.email.trim().toLowerCase()
    const account = findAccountByUsername(email, credentials.roleId)

    if (!account) {
      return HttpResponse.json(
        { error: 'No se encontró una cuenta con esos datos.' },
        { status: 401 },
      )
    }

    const passwordHash = await hashPassword(credentials.password, account.passwordSalt)
    if (passwordHash !== account.passwordHash) {
      return HttpResponse.json(
        { error: 'No se encontró una cuenta con esos datos.' },
        { status: 401 },
      )
    }

    return HttpResponse.json(toUserProfile(account))
  }),
]