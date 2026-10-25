const { TextDecoder, TextEncoder } = require('node:util')
const { ReadableStream, TransformStream, WritableStream } = require('node:stream/web')
const { BroadcastChannel, MessageChannel, MessagePort } = require('node:worker_threads')

Object.assign(globalThis, {
  TextDecoder,
  TextEncoder,
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
