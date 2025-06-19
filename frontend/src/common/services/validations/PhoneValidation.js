/* eslint-disable default-case */
const phoneValidation = (number, type) => {
  if (!number) {
    return type === 'mobile'
      ? 'Enter a UK mobile telephone number'
      : 'Enter a UK landline or mobile telephone number'
  }

  // Remove all spaces, hyphens, and brackets for a cleaner validation
  const sanitisedNumber = number.replace(/[\s\-()]/g, '')

  // Block premium numbers unless 0800 or 0808 (freephone)
  const isPremium =
    /^09\d{9}$/.test(sanitisedNumber) ||
    (/^08\d{9}$/.test(sanitisedNumber) &&
      !/^0800\d{7}$|^0808\d{6}$/.test(sanitisedNumber))
  if (isPremium) {
    return 'You cannot enter a premium rate number'
  }

  // Allowable mobile regex (07xxx xxxxxx)
  const mobileRegex = /^(\+44\s?7\d{3}|\(?07\d{3}\)?)\s?\d{3}\s?\d{3}$/

  // Allowable landline regex (01 -> 05)
  const landlineRegex =
    /^(\+44\s?[1-5]\d{3}|\(?0[1-5]\d{3}\)?)\s?\d{3}\s?\d{3}$/

  // Allow Typetalk prefix (18002 + valid mobile/landline number)
  const typetalkRegex = /^18002(07\d{9}|01\d{9}|02\d{9}|03\d{9}|05\d{9})$/

  switch (type) {
    case 'mobile': {
      if (
        mobileRegex.test(sanitisedNumber) ||
        typetalkRegex.test(sanitisedNumber)
      ) {
        return ''
      }
      return 'Enter a valid UK mobile telephone number'
    }

    case 'mobileAndLandline': {
      if (
        mobileRegex.test(sanitisedNumber) ||
        landlineRegex.test(sanitisedNumber) ||
        typetalkRegex.test(sanitisedNumber)
      ) {
        return ''
      }
      return 'Enter a UK landline or mobile telephone number in the correct format, like 01632 960001, 07700 900982, or with a 18002 prefix if you use a text relay service'
    }
  }
}

module.exports = { phoneValidation }
