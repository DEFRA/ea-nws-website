// Takes a unix timestamp and converts it to readable string
// e.g. 1734003781 --> "12 Dec 2024 at 11.43am"
const formatDateTime = (timestamp) => {
  const dateObj = new Date(timestamp * 1000)
  const datePart = dateObj.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })
  const timeString = dateObj
    .toLocaleTimeString('en-GB', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
    .toLowerCase()
  const timePart = timeString.replace(':', '.').replace(' ', '')
  return `${datePart} at ${timePart}`
}

module.exports = { formatDateTime }
