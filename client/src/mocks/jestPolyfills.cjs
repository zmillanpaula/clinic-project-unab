const { TextDecoder, TextEncoder } = require('node:util')
const { webcrypto } = require('node:crypto')
const { clearImmediate, setImmediate } = require('node:timers')
const { ReadableStream, TransformStream, WritableStream } = require('node:stream/web')
const { BroadcastChannel, MessageChannel, MessagePort } = require('node:worker_threads')

Object.defineProperty(globalThis, 'crypto', {
  configurable: true,
  value: webcrypto,
})

Object.assign(globalThis, {
  TextDecoder,
  TextEncoder,
  clearImmediate,
  setImmediate,
  ReadableStream,
  TransformStream,
  WritableStream,
  BroadcastChannel,
  MessageChannel,
  MessagePort,
})

const { fetch, Headers, Request, Response } = require('undici')

Object.assign(globalThis, {
  fetch,
  Headers,
  Request,
  Response,
})
