// Deja el RUT en un formato único: sin puntos ni espacios y con K mayúscula.
// Ej: "18.245.620-9" → "18245620-9"
export function normalizeRut(rut) {
  return String(rut ?? '').replace(/\./g, '').replace(/\s/g, '').toUpperCase()
}

// Revisa el formato y el dígito verificador (módulo 11).
export function isValidRut(rut) {
  const match = /^(\d{7,8})-([\dK])$/.exec(normalizeRut(rut))
  if (!match) return false

  const [, body, checkDigit] = match
  let multiplier = 2
  let sum = 0
  for (let i = body.length - 1; i >= 0; i -= 1) {
    sum += Number(body[i]) * multiplier
    multiplier = multiplier === 7 ? 2 : multiplier + 1
  }

  const remainder = 11 - (sum % 11)
  const expected = remainder === 11 ? '0' : remainder === 10 ? 'K' : String(remainder)
  return checkDigit === expected
}