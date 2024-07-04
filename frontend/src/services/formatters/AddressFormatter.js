const addressFormatter = (address) => {
  //Isolate each part of address
  const parts = address.split(',')

  //ignore last entry (Postcode) we want to keep this all capitalised
  for (let i = 0; i < parts.length - 1; i++) {
    parts[i] = parts[i]
      .trim()
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  return parts.join(', ').trim()
}

module.exports = { addressFormatter }
