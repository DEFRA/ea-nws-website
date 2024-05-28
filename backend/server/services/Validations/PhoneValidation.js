const phoneValidation = (number, type) => {
  switch (type) {
    case 'mobile':
      const ukMobileRegex = /^(\+44\s?7\d{3}|\(?07\d{3}\)?)\s?\d{3}\s?\d{3}$/

      // Remove all spaces, hyphens, and brackets for a cleaner validation
      const sanitizedMobile = number.replace(/[\s\-()]/g, '')
      if (number === '' || !ukMobileRegex.test(sanitizedMobile)) {
        return false
      }
      return true

    case 'mobileAndLandline':
      const regex =
        /^(\+44\s?7\d{3}|\(?07\d{3}\)?)\s?\d{3}\s?\d{3}$|^(\+44\s?20|\(?020\)?)\s?\d{4}\s?\d{4}$|^(\+44\s?1\d{2}|\(?01\d{2}\)?)\s?\d{3}\s?\d{4}$|^(\+44\s?\d{4}|\(?0\d{4}\)?)\s?\d{3}\s?\d{3}$/
      const numberPattern = new RegExp(regex)
      if (number === '' || !numberPattern.test(number)) {
        return false
      }
      return true
  }
}

module.exports = phoneValidation
