const authCodeValidation = (code) => {
  if (!code) {
    return 'Enter code'
  }
  const numberPattern = new RegExp(`^[0-9]{${6}}$`)
  if (!numberPattern.test(code)) {
    return 'Code must be 6 numbers'
  }
  return ''
}

module.exports = { authCodeValidation }
