const emailValidation = (email) => {
  if (!email || email === '') {
    return 'Enter your email address'
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailPattern.test(email)){
    return 'Enter an email address in the correct format, like name@example.com'
  }
  return ''
}

module.exports = emailValidation
