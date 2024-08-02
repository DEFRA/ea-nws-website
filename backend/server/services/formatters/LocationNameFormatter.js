const locationNameFormatter = (location) => {
  // Isolate each part of address

  const name = location.NAME1
  const postCodeDistrict = location.POSTCODE_DISTRICT
  const place = location?.POPULATED_PLACE

  const parts = [name, postCodeDistrict]

  if (place) {
    parts.push(place)
  }

  return parts.join(', ').trim()
}

module.exports = { locationNameFormatter }
