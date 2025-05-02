const orgNameValidation = (orgName) => {
  if (!orgName) {
    return "Enter your organisation's name"
  }

  const orgNameLength = 160
  if (orgName.length > orgNameLength) {
    return `Organisation name must be ${orgNameLength} characters or fewer`
  }

  // Only letters, digits, spaces, and any of . , : ; # -
  const validPattern = /^[A-za-z0-9 .,:;#-]+$/
  if (!validPattern.test(orgName)) {
    return `Organisation name can only contain letters, numbers, hyphens and colons`
  }

  return ''
}

module.exports = { orgNameValidation }
