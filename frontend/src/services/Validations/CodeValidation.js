const codeValidation = (code, length) => {
  if (!code || code === '') {
    return 'Enter code'
  }

  if (code === '999999'){
    return 'Invalid Code'
  }

  const numberPattern = new RegExp(`^[0-9]{${length}}$`)
  if (!numberPattern.test(code)) {
    return 'Code must be 6 numbers'
  }
  return ''
}

module.exports = codeValidation
