import type { Access, FieldAccess } from 'payload'

// Check if user is admin
export const isAdmin: Access = ({ req: { user } }) => {
  return user?.role === 'admin'
}

// Check if user is admin or editor
export const isAdminOrEditor: Access = ({ req: { user } }) => {
  return ['admin', 'editor'].includes(user?.role || '')
}

// Check if user is logged in
export const isLoggedIn: Access = ({ req: { user } }) => {
  return Boolean(user)
}

// Allow public read access
export const publicRead: Access = () => true

// Allow public create (for lead submissions)
export const publicCreate: Access = () => true

// Admin-only field access
export const adminFieldAccess: FieldAccess = ({ req: { user } }) => {
  return user?.role === 'admin'
}

// Users can only read their own data (or admin can read all)
export const selfOrAdmin: Access = ({ req: { user } }) => {
  if (user?.role === 'admin') return true
  if (user) {
    return {
      id: {
        equals: user.id,
      },
    }
  }
  return false
}
