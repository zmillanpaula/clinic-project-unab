import { afterAll, afterEach, beforeAll } from '@jest/globals'
import { resetAccounts } from './handlers'
import { server } from './server'

beforeAll(() => {
  server.listen({ onUnhandledFrame: 'error' })
})

afterEach(() => {
  server.resetHandlers()
  resetAccounts()
})

afterAll(() => {
  server.close()
})
