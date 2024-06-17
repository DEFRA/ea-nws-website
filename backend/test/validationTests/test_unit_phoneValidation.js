const Lab = require('@hapi/lab')
const Code = require('@hapi/code')
const { describe, it } = (exports.lab = Lab.script())
const { expect } = Code
const {
  phoneValidation
} = require('../../server/services/validations/PhoneValidation')

describe('phoneValidation', () => {
  describe('mobile type', () => {
    it('should return "Enter a UK mobile telephone number" for an empty string', () => {
      const result = phoneValidation('', 'mobile')
      expect(result).to.equal('Enter a UK mobile telephone number')
    })

    it('should return "Enter a valid UK mobile telephone number" for an invalid mobile number', () => {
      const result = phoneValidation('12345', 'mobile')
      expect(result).to.equal('Enter a valid UK mobile telephone number')
    })

    it('should return an empty string for a valid mobile number', () => {
      const result = phoneValidation('07700 900 982', 'mobile')
      expect(result).to.equal('')
    })

    it('should return an empty string for a valid mobile number with country code', () => {
      const result = phoneValidation('+44 7700 900 982', 'mobile')
      expect(result).to.equal('')
    })
  })

  describe('mobileAndLandline type', () => {
    it('should return "Enter a UK landline or mobile telephone number" for an empty string', () => {
      const result = phoneValidation('', 'mobileAndLandline')
      expect(result).to.equal('Enter a UK landline or mobile telephone number')
    })

    it('should return "Enter a UK landline or mobile telephone number, like 01632 960 001 or 07700 900 982" for an invalid number', () => {
      const result = phoneValidation('12345', 'mobileAndLandline')
      expect(result).to.equal(
        'Enter a UK landline or mobile telephone number, like 01632 960 001 or 07700 900 982'
      )
    })

    it('should return an empty string for a valid mobile number', () => {
      const result = phoneValidation('07700 900 982', 'mobileAndLandline')
      expect(result).to.equal('')
    })

    it('should return an empty string for a valid landline number', () => {
      const result = phoneValidation('020 7946 0958', 'mobileAndLandline')
      expect(result).to.equal('')
    })

    it('should return an empty string for a valid landline number with country code', () => {
      const result = phoneValidation('+44 20 7946 0958', 'mobileAndLandline')
      expect(result).to.equal('')
    })

    it('should return an empty string for a valid mobile number with country code', () => {
      const result = phoneValidation('+44 7700 900 982', 'mobileAndLandline')
      expect(result).to.equal('')
    })
  })
})
