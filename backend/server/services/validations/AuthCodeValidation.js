const authCodeValidation = (code) => {
  if (!code || code === '') {
    return { error: 'Enter code' }
  }
  const formattedCode = code.replace(/\s+/g, '')
  const numberPattern = new RegExp(`^[0-9]{${6}}$`)
  if (!numberPattern.test(formattedCode)) {
    return { error: 'Code must be 6 numbers' }
  }
  return { code: formattedCode }
}

module.exports = { authCodeValidation }
