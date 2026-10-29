import bcrypt from 'bcryptjs'
import { User, ROLES } from '../models/User.js'

const INVALID_CREDENTIALS = { error: 'No se encontró una cuenta con esos datos.' }

export async function login(req, res) {
  const { email, password, roleId } = req.body ?? {}

  if (typeof email !== 'string' || typeof password !== 'string' || !ROLES.includes(roleId)) {
    return res.status(400).json({ error: 'Faltan datos de acceso o el perfil no es válido.' })
  }

  const identifier = email.trim().toLowerCase()
  const user = await User.findOne({
    roleId,
    $or: [{ email: identifier }, { name: identifier }],
  })

  if (!user) return res.status(401).json(INVALID_CREDENTIALS)

  const passwordOk = await bcrypt.compare(password, user.passwordHash)
  if (!passwordOk) return res.status(401).json(INVALID_CREDENTIALS)

  res.json({ email: user.email, name: user.name, roleId: user.roleId })
}