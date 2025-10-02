import UserType from '../enums/UserType'

export const getRole = (currentContact) => {
  if (currentContact?.role) {
    return UserType.Admin
  }
  if (currentContact?.pendingRole) {
    return UserType.PendingAdmin
  }
  return UserType.Contact
}
