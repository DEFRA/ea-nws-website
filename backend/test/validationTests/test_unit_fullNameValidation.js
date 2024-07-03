const Lab = require('@hapi/lab')
const Code = require('@hapi/code')
const { describe, it } = (exports.lab = Lab.script())
const { expect } = Code
const {
  fullNameValidation
} = require('../../server/services/validations/FullNameValidation')

describe('fullNameValidation', () => {
  describe('full name', () => {
    it('should return "Enter your full name" for an empty string in first name and last name', () => {
      const result = fullNameValidation('', '')
      expect(result).to.equal('Enter your full name')
    })

    it('should return "Enter your full name" for an empty string in first name', () => {
      const result = fullNameValidation('', 'last name')
      expect(result).to.equal('Enter your full name')
    })

    it('should return "Full name must be 50 characters or fewer" for a full name greater than 50 characters long', () => {
      const result = fullNameValidation(
        'thefirstNamethefirstName',
        'the last name the last name'
      )
      expect(result).to.equal('Full name must be 50 characters or fewer')
    })

    it('should return an empty string for a valid first name and last name', () => {
      const result = fullNameValidation('FirstName', 'The Last Name')
      expect(result).to.equal('')
    })
  })
})
