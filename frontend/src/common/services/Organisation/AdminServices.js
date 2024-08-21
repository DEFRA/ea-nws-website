const addAdminName = (mainAdministrator, firstname, lastname) => {
  mainAdministrator.firstname = firstname
  mainAdministrator.lastname = lastname

  const updatedProfile = {
    ...mainAdministrator,
    firstname,
    lastname
  }

  return updatedProfile
}

const addAdminEmail = (mainAdministrator, emailAddress) => {
  mainAdministrator.emailAddress = emailAddress

  const updatedProfile = {
    ...mainAdministrator,
    emailAddress
  }

  return updatedProfile
}

module.exports = {
  addAdminName,
  addAdminEmail
}
