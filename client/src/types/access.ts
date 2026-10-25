import type { RoleId } from '../config/roles'

export type { RoleId } from '../config/roles'

export type AccountRecord = {
  email: string
  name: string
  passwordHash: string
  passwordSalt: string
  roleId: RoleId
}

export type UserProfile = Pick<AccountRecord, 'email' | 'name' | 'roleId'>

export type LoginCredentials = {
  email: string
  password: string
  roleId: RoleId
}