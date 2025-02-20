const Lab = require('@hapi/lab')
const Code = require('@hapi/code')
const { describe, it } = (exports.lab = Lab.script())
const { expect } = Code
const {
  authCodeValidation
} = require('../../server/services/validations/AuthCodeValidation')

describe('authCodeValidation', () => {
  it('should return the code and no errors for a valid code of correct length', () => {
    const result = authCodeValidation('123456')
    expect(result.code).to.equal('123456')
  })

  it('should return "Enter code" for an empty string', () => {
    const result = authCodeValidation('')
    expect(result.error).to.equal('Enter code')
  })

  it('should return "Enter code" for a code that is too short', () => {
    const result = authCodeValidation('12345')
    expect(result.error).to.equal('Code must be 6 numbers')
  })

  it('should return "Enter code" for a code that is too long', () => {
    const result = authCodeValidation('1234567')
    expect(result.error).to.equal('Code must be 6 numbers')
  })

  it('should return "Enter code" for a code with non-numeric characters', () => {
    const result = authCodeValidation('12a456')
    expect(result.error).to.equal('Code must be 6 numbers')
  })
})
