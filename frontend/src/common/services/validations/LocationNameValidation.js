const locationNameValidation = (locationName) => {
  if (!locationName) {
    return 'Enter a location name'
  }

  const locationNameLength = 50
  if (locationName.length > locationNameLength) {
    return `Location name must be ${locationNameLength} characters or fewer`
  }
  return ''
}

module.exports = { locationNameValidation }
