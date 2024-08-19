const orgNameValidation = (orgName) => {
  if (!orgName) {
    return "Enter your organisation's name"
  }

  const orgNameLength = 50
  if (orgName.length > orgNameLength) {
    return `Organisation name must be ${orgNameLength} characters or fewer`
  }
  return ''
}

module.exports = { orgNameValidation }
