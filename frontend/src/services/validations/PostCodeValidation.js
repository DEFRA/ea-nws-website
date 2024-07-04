const postCodeValidation = (postcode) => {
  if (!postcode) {
    return 'Enter a postcode in England'
  }

  // Normalize input: remove any non-alphanumeric characters and extra spaces
  postcode = postcode
    .replace(/[^a-zA-Z0-9]/g, '')
    .toUpperCase()
    .trim()

  // UK postcode regex pattern
  const postcodePattern = /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i
  const partialPostcodePattern =
    /^[a-z](\d\d?|[a-z]\d[a-z\d]?|[a-z]?\d?\d \d[a-z]{2}|[a-z]\d [a-z] \d[a-z]{2})$/i

  if (postcodePattern.test(postcode)) {
    return ''
  } else if (partialPostcodePattern.test(postcode)) {
    return 'Enter a full postcode in England'
  } else {
    return 'Enter a postcode in the correct format , like KT3 3QQ'
  }
}

module.exports = { postCodeValidation }
