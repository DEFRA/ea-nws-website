const authCodeValidation = (code) => {
  if (!code) {
    return 'Enter code'
  }

  const checkLengthAndIsNumber = new RegExp(`^[0-9]{${6}}$`)
  if (!checkLengthAndIsNumber.test(code)) {
    return 'Enter code'
  }
  return ''
}

module.exports = { authCodeValidation }
