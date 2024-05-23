const Lab = require('@hapi/lab')
const Code = require('@hapi/code')
const { describe, it } = (exports.lab = Lab.script())
const { expect } = Code
const codeValidation = require('../../server/services/Validations/CodeValidation')

describe('codeValidation', () => {
  it('should return true for a valid code of correct length', () => {
    const result = codeValidation('123456', 6)
    expect(result).to.be.true()
  })

  it('should return false for an empty string', () => {
    const result = codeValidation('', 6)
    expect(result).to.be.false()
  })

  it('should return false for a code that is too short', () => {
    const result = codeValidation('12345', 6)
    expect(result).to.be.false()
  })

  it('should return false for a code that is too long', () => {
    const result = codeValidation('1234567', 6)
    expect(result).to.be.false()
  })

  it('should return false for a code with non-numeric characters', () => {
    const result = codeValidation('12a456', 6)
    expect(result).to.be.false()
  })

  it('should return true for a valid code of different length', () => {
    const result = codeValidation('1234', 4)
    expect(result).to.be.true()
  })
})
