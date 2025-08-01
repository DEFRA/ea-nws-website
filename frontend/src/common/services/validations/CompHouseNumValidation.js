const compHouseNumberValidation = (companyNumber) => {
  if (!companyNumber) {
    return 'Enter your Companies House number'
  }

  // Normalize input
  companyNumber = companyNumber.toUpperCase().trim()

  const compNumLen = 8
  const specialCharPattern = /[^a-zA-Z0-9]/
  if (companyNumber.length > compNumLen) {
    return `Companies House number must be ${compNumLen} characters or fewer - it can include numbers or letters`
  } else if (specialCharPattern.test(companyNumber)) {
    return 'Companies House number can only include numbers or letters - no special characters'
  } else {
    return ''
  }
}

module.exports = { compHouseNumberValidation }
