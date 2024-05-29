const Lab = require('@hapi/lab')
const Code = require('@hapi/code')
const { describe, it } = (exports.lab = Lab.script())
const { expect } = Code
const emailValidation = require('../../server/services/validations/EmailValidation')

describe('emailValidation', () => {
  it('should return true for a valid email', () => {
    const result = emailValidation('valid@example.com')
    expect(result).to.be.true()
  })

  it('should return false for an empty string', () => {
    const result = emailValidation('')
    expect(result).to.be.false()
  })

  it('should return false for an invalid email format', () => {
    const result = emailValidation('invalid-email')
    expect(result).to.be.false()
  })

  it('should return false for an email without a domain', () => {
    const result = emailValidation('user@')
    expect(result).to.be.false()
  })

  it('should return false for an email without a username', () => {
    const result = emailValidation('@example.com')
    expect(result).to.be.false()
  })

  it('should return false for an email with spaces', () => {
    const result = emailValidation('user @example.com')
    expect(result).to.be.false()
  })
})
