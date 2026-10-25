function toHex(bytes: Uint8Array) {
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('')
}

export function createPasswordSalt() {
  return toHex(globalThis.crypto.getRandomValues(new Uint8Array(16)))
}

export async function hashPassword(password: string, salt: string) {
  const input = new TextEncoder().encode(`${salt}:${password}`)
  const digest = await globalThis.crypto.subtle.digest('SHA-256', input)
  return toHex(new Uint8Array(digest))
}
