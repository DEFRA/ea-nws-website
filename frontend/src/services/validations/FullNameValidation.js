const fullNameValidation = (fullName) => {
  if (!fullName) {
    return 'Enter your full name'
  }

  const fullNameLength = 50
  if (fullName.length > fullNameLength) {
    return `Full name must be ${fullNameLength} characters or fewer`
  }
  return ''
}

module.exports = { fullNameValidation }
