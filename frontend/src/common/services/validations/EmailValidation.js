const emailValidation = (email) => {
  if (!email) {
    return 'Enter your email address'
  }

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  if (!emailPattern.test(email)) {
    return 'Enter an email address in the correct format, like name@example.com'
  }
  return ''
}

module.exports = { emailValidation }
