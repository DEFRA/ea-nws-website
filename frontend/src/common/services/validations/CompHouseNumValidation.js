const compHouseNumberValidation = (companyNumber) => {
  if (!companyNumber) {
    return 'Enter your Companies House number'
  }

  // Normalize input
  companyNumber = companyNumber.toUpperCase().trim()

  // Companies House number regex pattern
  const companyNumberPattern = /^[A-Z0-9]{2}\d{6}$/

  if (companyNumberPattern.test(companyNumber)) {
    return ''
  } else {
    return 'Enter a Companies House number in the correct format, like 01234567 or AB123456'
  }
}

module.exports = { compHouseNumberValidation }
