const phoneNumberValidation = (number) => {
  if (!number || number === '') {
    return 'Enter a UK landline or mobile telephone number'
  }
  const regex =
    /^(\+44\s?7\d{3}|\(?07\d{3}\)?)\s?\d{3}\s?\d{3}$|^(\+44\s?20|\(?020\)?)\s?\d{4}\s?\d{4}$|^(\+44\s?1\d{2}|\(?01\d{2}\)?)\s?\d{3}\s?\d{4}$|^(\+44\s?\d{4}|\(?0\d{4}\)?)\s?\d{3}\s?\d{3}$/
  const numberPattern = new RegExp(regex)
  if (!numberPattern.test(number)) {
    return 'Enter a UK landline or mobile telephone number, like 01632 960 001 or 07700 900 982'
  }
  return ''
}

module.exports = phoneNumberValidation
