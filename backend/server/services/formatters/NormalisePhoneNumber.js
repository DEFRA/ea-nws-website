const normalisePhoneNumber = (phoneNumber) => {
  // Remove non-numeric characters
  let normalizedNumber = phoneNumber.replace(/\D/g, '')

  // Check if the number starts with '44' or '0' and adjust accordingly
  if (normalizedNumber.startsWith('44')) {
    normalizedNumber = '+' + normalizedNumber
  } else if (normalizedNumber.startsWith('0')) {
    normalizedNumber = '+44' + normalizedNumber.slice(1)
  }

  return normalizedNumber
}

module.exports = { normalisePhoneNumber }
