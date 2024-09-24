const yCoordinateValidation = (yCoordinate) => {
  if (!yCoordinate) {
    return 'Enter a Y coordinate'
  } else if (!/^\d+$/.test(yCoordinate)) {
    return 'Y coordinate must be a whole number'
  } else {
    const number = Number(yCoordinate)
    const min = 0
    const max = 1300000
    if (number < min || number > max) {
      return `Y coordinate must be a whole number between ${min} and ${max}`
    }
  }

  return ''
}

module.exports = { yCoordinateValidation }
