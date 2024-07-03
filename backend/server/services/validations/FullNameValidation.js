const fullNameValidation = (firstName, LastName) => {
  if (!firstName || firstName === '') {
    return 'Enter your full name'
  }

  const maxNameLength = 50
  if (firstName.length + LastName.length > maxNameLength) {
    return `Full name must be ${maxNameLength} characters or fewer`
  }
  return ''
}

module.exports = { fullNameValidation }
