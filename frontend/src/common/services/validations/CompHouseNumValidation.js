const compHouseNumberValidation = (companyNumber) => {
  if (!companyNumber) {
    return 'Enter your Companies House number'
  }

  // Normalize input
  companyNumber = companyNumber.toUpperCase().trim()

  const compNumLen = 8
  if (companyNumber.length > compNumLen) {
    return ''
  } else {
    return 'Companies House number must be 8 characters or fewer - it can include numbers or letters'
  }
}

module.exports = { compHouseNumberValidation }
