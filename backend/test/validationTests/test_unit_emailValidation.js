const Lab = require('@hapi/lab')
const Code = require('@hapi/code')
const { describe, it } = (exports.lab = Lab.script())
const { expect } = Code
<<<<<<< HEAD
const emailValidation = require('../../server/services/validations/EmailValidation')
=======
const {
  emailValidation
} = require('../../server/services/validations/EmailValidation')
>>>>>>> 1e64384d6c35820315904863825daf7159829fab

describe('emailValidation', () => {
  it('should return true for a valid email', () => {
    const result = emailValidation('valid@example.com')
    expect(result).to.equal('')
  })

  it('should return false for an empty string', () => {
    const result = emailValidation('')
    expect(result).to.equal('Enter your email address')
  })

  it('should return false for an invalid email format', () => {
    const result = emailValidation('invalid-email')
    expect(result).to.equal(
      'Enter an email address in the correct format, like name@example.com'
    )
  })

  it('should return false for an email without a domain', () => {
    const result = emailValidation('user@')
    expect(result).to.equal(
      'Enter an email address in the correct format, like name@example.com'
    )
  })

  it('should return false for an email without a username', () => {
    const result = emailValidation('@example.com')
    expect(result).to.equal(
      'Enter an email address in the correct format, like name@example.com'
    )
  })

  it('should return false for an email with spaces', () => {
    const result = emailValidation('user @example.com')
    expect(result).to.equal(
      'Enter an email address in the correct format, like name@example.com'
    )
  })
})
