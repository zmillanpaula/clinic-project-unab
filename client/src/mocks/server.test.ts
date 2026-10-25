import { expect, test } from '@jest/globals'
import { server } from './server'

test('registers the access handlers for tests', () => {
  expect(server.listHandlers()).toHaveLength(1)
})
