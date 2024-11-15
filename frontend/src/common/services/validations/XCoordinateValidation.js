// Validate x-coordinate to ensure it is in range for EPSG:27700.
const xCoordinateValidation = (xCoordinate) => {
  if (!xCoordinate) {
    return 'Enter an X coordinate'
  } else if (!/^\d+$/.test(xCoordinate)) {
    return 'X coordinate must be a whole number'
  } else {
    const number = Number(xCoordinate)
    const min = 0
    const max = 700000
    if (number < min || number > max) {
      return `X coordinate must be a whole number between ${min} and ${max}`
    }
  }

  return ''
}

module.exports = { xCoordinateValidation }
