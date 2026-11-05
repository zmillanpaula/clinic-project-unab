import { expect, test } from '@jest/globals'
import { server } from './server'
import { authenticateAccount } from '../services/accessService'

test('registers the access handlers for tests', () => {
  expect(server.listHandlers()).toHaveLength(1)
})

test('allows the patient demo account to sign in with its documented username', async () => {
  await expect(
    authenticateAccount({
      email: 'maria.lopez',
      password: 'PacienteClave123!',
      roleId: 'paciente',
    }),
  ).resolves.toEqual({
    email: 'paciente@example.cl',
    name: 'Camila Morales',
    roleId: 'paciente',
  })
})
