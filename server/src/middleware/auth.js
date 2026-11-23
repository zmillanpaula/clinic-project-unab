import jwt from 'jsonwebtoken'

// 1. ¿Trae una pulsera válida? → guarda quién es en req.user
export function requireAuth(req, res, next) {
  const [scheme, token] = (req.get('Authorization') ?? '').split(' ')
  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ error: 'Debes iniciar sesión para continuar.' })
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET, { algorithms: ['HS256'] })
    next()
  } catch {
    res.status(401).json({ error: 'Tu sesión expiró o no es válida. Vuelve a iniciar sesión.' })
  }
}

// 2. ¿Su rol tiene permiso? (se usa después de requireAuth)
export function requireRole(...allowedRoles) {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user?.roleId)) {
      return res.status(403).json({ error: 'No tienes permisos para realizar esta acción.' })
    }
    next()
  }
}