const orgNameValidation = (orgName) => {
  if (!orgName) {
    return "Enter your organisation's name"
  }

  const orgNameLength = 160
  if (orgName.length > orgNameLength) {
    return `Organisation name must be ${orgNameLength} characters or fewer`
  }

  // Allowed: A–Z a–z 0–9 space & @ £ $ € ¥ # . , : ; -
  const allowedPattern = /^[A-Za-z0-9 &@£\$€¥#\.\,:;\-]+$/

  if (!allowedPattern.test(orgName)) {
    // Find every character not in the allowed set
    const invalidMatches = orgName.match(/[^A-Za-z0-9 &@£\$€¥#\.\,:;\-]/g) || []
    // Dedupe them
    const invalidChars = Array.from(new Set(invalidMatches))

    // Format invalidChars into form of "X", "X or Y", "X, Y or Z" etc.
    let formattedMsg
    if (invalidChars.length === 1) {
      formattedMsg = invalidChars[0]
    } else if (invalidChars.length === 2) {
      formattedMsg = invalidChars.join(' or ')
    } else {
      const allButLast = invalidChars.slice(0, -1).join(', ')
      const last = invalidChars[invalidChars.length - 1]
      formattedMsg = `${allButLast} or ${last}`
    }

    return `Organisation name must not include ${formattedMsg}`
  }

  return ''
}

module.exports = { orgNameValidation }
