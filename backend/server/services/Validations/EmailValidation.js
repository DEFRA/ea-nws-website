const emailValidation = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return email !== '' && emailPattern.test(email)
}

module.exports = emailValidation
